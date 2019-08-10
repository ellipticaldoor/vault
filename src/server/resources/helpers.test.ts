import cases from 'jest-in-case';
import { updateResource } from '~/server/resources';

cases(
  'updateResource',
  ({ prepare, expected }) => {
    try {
      const finalResource = updateResource(
        prepare.initialResource,
        prepare.resourcesToUpdate,
      );

      if (expected.throwsError) {
        fail('A resource should not be updated with negative values');
      }

      expect(finalResource).toEqual(expected.resources);
    } catch (error) {
      expect(error.message).toMatch('Not enough resources to update');
    }
  },
  {
    'decreases the resources of a vault': {
      prepare: {
        initialResource: {
          id: 'resource-id',
          iron: 1000,
          dwellers: 3,
        },
        resourcesToUpdate: {
          iron: -300,
          dwellers: 0,
        },
      },
      expected: {
        resources: {
          id: 'resource-id',
          iron: 700,
          dwellers: 3,
        },
      },
    },
    'decreases the resources of a vault - 2': {
      prepare: {
        initialResource: {
          id: 'resource-id',
          iron: 1200,
          dwellers: 50,
        },
        resourcesToUpdate: {
          iron: 0,
          dwellers: -24,
        },
      },
      expected: {
        resources: {
          id: 'resource-id',
          iron: 1200,
          dwellers: 26,
        },
      },
    },
    'increases the resources of a vault': {
      prepare: {
        initialResource: {
          id: 'resource-id',
          iron: 1000,
          dwellers: 100,
        },
        resourcesToUpdate: {
          iron: 300,
          dwellers: 100,
        },
      },
      expected: {
        resources: {
          id: 'resource-id',
          iron: 1300,
          dwellers: 200,
        },
      },
    },
    'throws an error when trying to remove resources that are not available': {
      prepare: {
        initialResource: {
          id: 'resource-id',
          iron: 1000,
          dwellers: 100,
        },
        resourcesToUpdate: {
          iron: -1001,
          dwellers: -101,
        },
      },
      expected: {
        throwsError: true,
        resources: {
          id: 'resource-id',
          iron: -1,
          dwellers: -1,
        },
      },
    },
  },
);
