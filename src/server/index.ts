import { createGame } from 'server/game';
import { createServer } from 'server/apollo';
import { API_PORT, API_ENDPOINT, NODE_ENV } from 'server/env';

const startMessage = `📡 vault server ready at ${API_ENDPOINT} in ${NODE_ENV}`;

async function main() {
  const gameState = createGame();
  const server = createServer(gameState);

  server.listen({ port: API_PORT }, () => {
    // eslint-disable-next-line no-console
    console.log(startMessage);
  });
}

main()
  // eslint-disable-next-line no-console
  .catch((e) => console.error(e));
