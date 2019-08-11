import gql from 'graphql-tag';

export default gql`
  type Vault {
    id: ID!
    x: Int!
    y: Int!
    missions: [Mission]
    resources: Resources
    facilities: Facilities
    user: User
  }

  type Query {
    vaults: [Vault!]!
  }
`;
