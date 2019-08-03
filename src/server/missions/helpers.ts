import { Mission, MissionKind, MISSION_STATS } from 'server/missions';
import { ID } from 'server/game/types';
import { ResourceUpdate, hasEnoughResources } from 'server/resources';
import { ticksToTravel } from 'server/ticks';
import { simulateCombat, applyCombatSimulation } from 'server/combats';
import { GameState } from 'server/state';
import { createId } from 'server/helpers';
import { ERROR } from 'server/language';

type CreateMissionArgs = {
  kind: MissionKind;
  fromId: ID;
  toId: ID;
  initialResources: ResourceUpdate;
};

export const validateCreateMissionArgs = (
  gameState: GameState,
  args: CreateMissionArgs,
) => {
  if (args.fromId === args.toId) {
    throw new Error(ERROR.MISSION_DESTINATION_CANT_BE_EQUAL_TO_DEPARTURE);
  }

  const fromVault = gameState.findVault({ id: args.fromId });
  const fromVaultResource = gameState.findResource({
    id: fromVault.resourceId,
  });
  const vaultHasEnoughResources = hasEnoughResources(
    fromVaultResource,
    args.initialResources,
  );
  if (!vaultHasEnoughResources) {
    throw new Error(ERROR.NOT_ENOUGH_RESOURCES_TO_CREATE_THE_MISSION);
  }
};

export const createMission = (
  gameState: GameState,
  args: CreateMissionArgs,
): Mission => {
  const { kind, fromId, toId, initialResources } = args;

  const baseVelocity = MISSION_STATS.dwellersVelocity;
  const fromVault = gameState.findVault({ id: fromId });
  const toVault = gameState.findVault({ id: toId });

  validateCreateMissionArgs(gameState, args);

  const ticksBetween = ticksToTravel({
    from: fromVault,
    to: toVault,
    velocity: baseVelocity,
  });

  const createdAtTick = gameState.ticks();
  const arrivalTick = ticksBetween + createdAtTick;
  const comebackTick = ticksBetween * 2 + createdAtTick;

  const resource = gameState.addResource({
    id: createId(),
    iron: initialResources.iron ? initialResources.iron : 0,
    dwellers: initialResources.dwellers ? initialResources.dwellers : 0,
  });

  const resourcesToRemoveFromVault = {
    iron: resource.iron * -1,
    dwellers: resource.dwellers * -1,
  };

  gameState.updateResource(fromVault.resourceId, resourcesToRemoveFromVault);

  const newMission = gameState.addMission({
    id: createId(),
    resourceId: resource.id,
    kind,
    fromId,
    toId,
    createdAtTick,
    arrivalTick,
    comebackTick,
  });

  return newMission;
};

export const missionOnArrival = (
  gameState: GameState,
  mission: Mission,
): Mission => {
  if (mission.kind === 'attack') {
    const attacker = mission;
    const defendant = gameState.findVault({ id: mission.toId });
    const combatSimulation = simulateCombat(gameState, attacker, defendant);

    applyCombatSimulation(gameState, {
      attackerId: mission.id,
      defendantId: mission.toId,
      combatSimulation,
    });
  }

  return gameState.findOneMission({ id: mission.id });
};

export const missionOnComeback = (
  gameState: GameState,
  mission: Mission,
): Mission => {
  const from = gameState.findVault({ id: mission.fromId });
  const missionResource = gameState.findResource({ id: mission.resourceId });

  gameState.updateResource(from.resourceId, missionResource);

  const resourcesToRemoveFromMission = {
    iron: missionResource.iron * -1,
    dwellers: missionResource.dwellers * -1,
  };

  gameState.updateResource(mission.resourceId, resourcesToRemoveFromMission);

  return gameState.findOneMission({ id: mission.id });
};

export const triggerMissionEvents = (gameState: GameState) => {
  const ticks = gameState.ticks();
  const missions = gameState.missions();

  missions.forEach((mission) => {
    if (mission.arrivalTick === ticks) {
      missionOnArrival(gameState, mission);
    }

    if (mission.comebackTick === ticks) {
      missionOnComeback(gameState, mission);
    }
  });

  return gameState.missions();
};
