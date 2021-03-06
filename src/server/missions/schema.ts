import gql from 'graphql-tag';

export default gql`
  enum MissionKind {
    attack
  }

  type Mission {
    id: ID!
    kind: MissionKind!
    from: Vault!
    to: Vault!
    resources: Resources
    createdAtTick: Int!
    arrivalTick: Int!
    comebackTick: Int!
  }

  input CreateMissionInput {
    toId: ID!
    kind: MissionKind!
    initialResources: CreateResourceInput!
  }

  type Mutation {
    createMission(data: CreateMissionInput!): Mission!
  }
`;
