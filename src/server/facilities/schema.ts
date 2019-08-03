import gql from 'graphql-tag';

export default gql`
  type Facility {
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
    upgradeMyFacilityLevel(data: UpgradeMyFacilityLevelInput!): Facility!
  }
`;
