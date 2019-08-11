import gql from 'graphql-tag';

export default gql`
  type Facilities {
    id: ID!
    ironMine: Int!
  }

  enum FacilityKind {
    ironMine
  }

  input UpgradeMyFacilityLevelInput {
    facilityKind: FacilityKind!
  }

  type Mutation {
    upgradeMyFacilityLevel(data: UpgradeMyFacilityLevelInput!): Facilities!
  }
`;
