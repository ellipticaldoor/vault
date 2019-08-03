import { ID } from 'server/game';
import { Vault } from 'server/vaults';
import { Resource, ResourceUpdate } from 'server/resources';
import { OFFENSIVE_STATS, CombatStats, Winner } from 'server/combats';
import { randomPercentage } from 'server/helpers';
import { Mission } from 'server/missions';
import { GameState } from 'server/state';

export const getCombatStats = (resources: Resource): CombatStats => {
  return {
    attack: resources.dwellers * OFFENSIVE_STATS.dweller.attack,
    defense: resources.dwellers * OFFENSIVE_STATS.dweller.defense,
  };
};

export const getAttackerChanceToWin = (
  attackerStats: CombatStats,
  defendantStats: CombatStats,
): number => {
  const attackerPowerAfterDefensePhase =
    attackerStats.attack - defendantStats.defense;

  const totalPowerAttack =
    attackerPowerAfterDefensePhase + defendantStats.attack;

  if (totalPowerAttack === 0 || attackerPowerAfterDefensePhase <= 0) {
    return 0;
  }

  const attackerChanceToWin =
    (attackerPowerAfterDefensePhase * 100) / totalPowerAttack;

  const roundAttackerChanceToWin =
    attackerChanceToWin > 50
      ? Math.ceil(attackerChanceToWin)
      : Math.floor(attackerChanceToWin);

  return roundAttackerChanceToWin;
};

export const decideWinner = (attackerChanceToWin: number): Winner => {
  const attackerDidWon = attackerChanceToWin > randomPercentage();

  return attackerDidWon ? 'attacker' : 'defendant';
};

export const calculateLostDwellersInCombat = ({
  totalDwellers,
  percentageToLoose,
}: {
  totalDwellers: number;
  percentageToLoose: number;
}): number => {
  return Math.floor((totalDwellers * percentageToLoose) / 100) * -1;
};

type CombatSimulation = {
  winner: Winner;
  attacker: { resourceUpdate: ResourceUpdate };
  defendant: { resourceUpdate: ResourceUpdate };
};

type CalculateWinningsAndLosses = {
  attacker: Mission;
  defendant: Vault;
  winner: Winner;
  attackerChanceToWin: number;
};

export const calculateWinningsAndLosses = (
  gameState: GameState,
  args: CalculateWinningsAndLosses,
): CombatSimulation => {
  const attackerResourceUpdate: ResourceUpdate = {
    iron: 0,
    dwellers: 0,
  };

  const defendantResourceUpdate: ResourceUpdate = {
    iron: 0,
    dwellers: 0,
  };

  const defendantResource = gameState.findResource({
    id: args.defendant.resourceId,
  });

  // Iron
  if (args.winner === 'attacker') {
    const attackerWonIron =
      (defendantResource.iron * args.attackerChanceToWin) / 100;

    attackerResourceUpdate.iron = attackerWonIron;
    defendantResourceUpdate.iron = attackerWonIron * -1;
  }

  // Dwellers
  const defendantChanceToWin = 100 - args.attackerChanceToWin;

  const attackerResource = gameState.findResource({
    id: args.attacker.resourceId,
  });

  attackerResourceUpdate.dwellers = calculateLostDwellersInCombat({
    totalDwellers: attackerResource.dwellers,
    percentageToLoose: defendantChanceToWin,
  });

  defendantResourceUpdate.dwellers = calculateLostDwellersInCombat({
    totalDwellers: defendantResource.dwellers,
    percentageToLoose: args.attackerChanceToWin,
  });

  return {
    winner: args.winner,
    attacker: {
      resourceUpdate: attackerResourceUpdate,
    },
    defendant: {
      resourceUpdate: defendantResourceUpdate,
    },
  };
};

export const simulateCombat = (
  gameState: GameState,
  attacker: Mission,
  defendant: Vault,
): CombatSimulation => {
  const attackerResource = gameState.findResource({
    id: attacker.resourceId,
  });
  const defendantResource = gameState.findResource({
    id: defendant.resourceId,
  });

  const attackerStats = getCombatStats(attackerResource);
  const defendantStats = getCombatStats(defendantResource);

  const attackerChanceToWin = getAttackerChanceToWin(
    attackerStats,
    defendantStats,
  );
  const winner = decideWinner(attackerChanceToWin);

  const combatSimulation = calculateWinningsAndLosses(gameState, {
    attacker,
    defendant,
    winner,
    attackerChanceToWin,
  });

  return combatSimulation;
};

type ApplyCombatSimulation = {
  attackerId: ID;
  defendantId: ID;
  combatSimulation: CombatSimulation;
};

export const applyCombatSimulation = (
  gameState: GameState,
  { attackerId, defendantId, combatSimulation }: ApplyCombatSimulation,
) => {
  gameState.updateResource(
    gameState.findOneMission({ id: attackerId }).resourceId,
    combatSimulation.attacker.resourceUpdate,
  );

  gameState.updateResource(
    gameState.findVault({ id: defendantId }).resourceId,
    combatSimulation.defendant.resourceUpdate,
  );

  return {
    attacker: gameState.findOneMission({ id: attackerId }),
    defendant: gameState.findVault({ id: defendantId }),
  };
};
