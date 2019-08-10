import { ID } from '~/server/game';
import { Facility, FacilityKind } from '~/server/facilities';
import { ERROR } from '~/server/language';
import { findOneState, setArrayState, addToArrayState } from '~/server/state';

export const createFacilities = () => {
  const facilities: Facility[] = [];

  const findFacility = findOneState(facilities, ERROR.FACILITY_NOT_FOUND);

  const setFacilities = setArrayState(facilities);

  const increaseFacilityLevel = (
    facilityId: ID,
    facilityKind: FacilityKind,
  ): Facility => {
    const facility = findFacility({ id: facilityId });

    facility[facilityKind] += 1;

    return facility;
  };

  return {
    facilities: () => facilities,
    findFacility,
    setFacilities,
    addFacility: addToArrayState(facilities),
    increaseFacilityLevel,
  };
};
