import gql from 'graphql-tag';

export default gql`
  type AuthPayload {
    user: User!
    token: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input SignupInput {
    username: String!
    password: String!
  }

  type Mutation {
    login(data: LoginInput!): AuthPayload!
    signup(data: SignupInput!): AuthPayload!
  }
`;
