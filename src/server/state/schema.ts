import gql from 'graphql-tag';

export default gql`
  type GameState {
    id: Int!
    ticks: Int!
    resources: [Resources!]!
    vaults: [Vault!]!
    facilities: [Facilities!]!
    missions: [Mission!]!
  }

  type Query {
    gameState: GameState!
  }

  type Mutation {
    resetGameState: GameState!
  }
`;
