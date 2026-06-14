import { createContext, useContext } from 'react';
import type { GameState } from '../types';

export interface GameContextValue {
  gameState: GameState;
  progressPercent: number;
  isMissionUnlocked: (missionId: number) => boolean;
  isMissionCompleted: (missionId: number) => boolean;
  openMission: (missionId: number) => void;
  returnToSelect: () => void;
  completeMission: (missionId: number) => void;
}

export const GameContext = createContext<GameContextValue | null>(null);

export function useGameState(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}
