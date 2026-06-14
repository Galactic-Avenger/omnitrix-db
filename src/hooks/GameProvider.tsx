import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { AppScreen, GameState } from '../types';
import { TOTAL_MISSIONS } from '../missions/missions';
import { GameContext } from './useGameState';

const INITIAL_UNLOCKED = [1];

function createInitialState(): GameState {
  return {
    screen: 'select',
    activeMissionId: null,
    completedMissions: [],
    unlockedMissions: [...INITIAL_UNLOCKED],
  };
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(createInitialState);

  const progressPercent = useMemo(
    () => Math.round((gameState.completedMissions.length / TOTAL_MISSIONS) * 100),
    [gameState.completedMissions.length],
  );

  const isMissionUnlocked = useCallback(
    (missionId: number) => gameState.unlockedMissions.includes(missionId),
    [gameState.unlockedMissions],
  );

  const isMissionCompleted = useCallback(
    (missionId: number) => gameState.completedMissions.includes(missionId),
    [gameState.completedMissions],
  );

  const openMission = useCallback((missionId: number) => {
    setGameState((prev) => {
      if (!prev.unlockedMissions.includes(missionId)) {
        return prev;
      }
      return {
        ...prev,
        screen: 'mission' as AppScreen,
        activeMissionId: missionId,
      };
    });
  }, []);

  const returnToSelect = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      screen: 'select',
      activeMissionId: null,
    }));
  }, []);

  const completeMission = useCallback((missionId: number) => {
    setGameState((prev) => {
      if (prev.completedMissions.includes(missionId)) {
        return prev;
      }

      const completedMissions = [...prev.completedMissions, missionId];
      const nextMissionId = missionId + 1;
      const unlockedMissions =
        nextMissionId <= TOTAL_MISSIONS && !prev.unlockedMissions.includes(nextMissionId)
          ? [...prev.unlockedMissions, nextMissionId]
          : prev.unlockedMissions;

      return {
        ...prev,
        completedMissions,
        unlockedMissions,
      };
    });
  }, []);

  const value = useMemo(
    () => ({
      gameState,
      progressPercent,
      isMissionUnlocked,
      isMissionCompleted,
      openMission,
      returnToSelect,
      completeMission,
    }),
    [
      gameState,
      progressPercent,
      isMissionUnlocked,
      isMissionCompleted,
      openMission,
      returnToSelect,
      completeMission,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
