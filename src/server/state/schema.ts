import gql from 'graphql-tag';

export default gql`
  type GameState {
    id: Int!
    ticks: Int!
    resources: [Resource!]!
    vaults: [Vault!]!
    facilities: [Facility!]!
    missions: [Mission!]!
  }

  type Query {
    gameState: GameState!
  }

  type Mutation {
    resetGameState: GameState!
  }
`;
