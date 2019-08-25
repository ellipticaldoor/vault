import gql from 'graphql-tag';

export default gql`
  type Resources {
    dwellers: Int!
    iron: Int!
  }

  input CreateResourceInput {
    dwellers: Int!
    iron: Int!
  }
`;
