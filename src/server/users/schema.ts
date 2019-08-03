import gql from 'graphql-tag';

export default gql`
  type User {
    id: ID!
    username: String!
    vault: Vault!
  }

  type Query {
    my: User!
  }
`;
