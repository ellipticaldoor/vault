import gql from 'graphql-tag';

export default gql`
  type Vault {
    id: ID!
    x: Int!
    y: Int!
    resource: Resource!
    facility: Facility!
    user: User
    missions: [Mission!]!
  }

  type Query {
    vaults: [Vault!]!
  }
`;
