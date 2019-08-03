import { ID } from 'server/game';
import {
  Resource,
  ResourceUpdate,
  updateResource as updateResourceHelper,
} from 'server/resources';
import {
  updateBy,
  findOneState,
  setArrayState,
  addToArrayState,
} from 'server/state';
import { ERROR } from 'server/language';

export const createResources = () => {
  const resources: Resource[] = [];

  const findResource = findOneState(resources, ERROR.RESOURCE_NOT_FOUND);

  const setResources = setArrayState(resources);

  const updateResource = (
    resourceId: ID,
    resourceUpdate: ResourceUpdate,
  ): Resource => {
    const resource = findResource({ id: resourceId });
    const resoucesToUpdate = updateResourceHelper(resource, resourceUpdate);

    updateBy('id', resources, {
      ...resoucesToUpdate,
      id: resourceId,
    });

    return findResource({ id: resourceId });
  };

  return {
    resources: () => resources,
    findResource,
    setResources,
    addResource: addToArrayState(resources),
    updateResource,
  };
};
