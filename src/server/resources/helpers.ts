import { Resource, ResourceUpdate } from '~/server/resources';
import { mapKeys } from 'remeda';
import { ERROR } from '~/server/language';

const EXCLUDED_RESOURCE_KEYS = ['id'];

export const updateResource = (
  resource: Resource,
  resourceUpdate: ResourceUpdate,
): Resource => {
  const updatedResource = { ...resource };

  mapKeys(resourceUpdate, (key, value) => {
    if (!value) return;
    if (EXCLUDED_RESOURCE_KEYS.includes(key)) return;
    if (typeof value !== 'number') {
      throw new Error(ERROR.RESOURCE_MUST_BE_NUMBER);
    }

    const newResouceValue = updatedResource[key] + value;

    if (newResouceValue < 0) {
      throw new Error(ERROR.NOT_ENOUGH_RESOURCES_TO_UPDATE);
    }

    updatedResource[key] = newResouceValue;
  });

  return updatedResource;
};

export const hasEnoughResources = (
  resource: Resource,
  resourceUpdate: ResourceUpdate,
): boolean => {
  let resourceHasEnoughResources = true;

  mapKeys(resourceUpdate, (key, value) => {
    if (!value) return;
    if (EXCLUDED_RESOURCE_KEYS.includes(key)) return;
    if (typeof value !== 'number') {
      throw new Error(ERROR.RESOURCE_MUST_BE_NUMBER);
    }

    if (value > resource[key]) {
      resourceHasEnoughResources = false;
    }
  });

  return resourceHasEnoughResources;
};
