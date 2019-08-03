import { Mission } from 'server/missions';
import { ERROR } from 'server/language';
import {
  findOneState,
  queryState,
  setArrayState,
  addToArrayState,
} from 'server/state';

export const createMissions = () => {
  const missions: Mission[] = [];

  return {
    missions: () => missions,
    findOneMission: findOneState(missions, ERROR.MISSION_NOT_FOUND),
    queryMissions: queryState(missions),
    setMissions: setArrayState(missions),
    addMission: addToArrayState(missions),
  };
};
