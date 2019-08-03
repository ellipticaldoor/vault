import gql from 'graphql-tag';

export default gql`
  type Resource {
    id: ID!
    dwellers: Int!
    iron: Int!
  }

  input CreateResourceInput {
    dwellers: Int!
    iron: Int!
  }
`;
