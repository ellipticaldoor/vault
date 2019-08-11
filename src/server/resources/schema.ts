import gql from 'graphql-tag';

export default gql`
  type Resources {
    id: ID!
    dwellers: Int!
    iron: Int!
  }

  input CreateResourceInput {
    dwellers: Int!
    iron: Int!
  }
`;
