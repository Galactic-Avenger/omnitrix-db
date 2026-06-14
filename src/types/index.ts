export type SqlValue = string | number | null;

export interface QueryResult {
  columns: string[];
  rows: SqlValue[][];
}

export type MissionDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Mission {
  id: number;
  title: string;
  storyBrief: string;
  goal: string;
  difficulty: MissionDifficulty;
  hint: string;
  starterSql: string;
  relevantTables: string[];
  validationSql: string;
}

export type AppScreen = 'select' | 'mission';

export interface GameState {
  screen: AppScreen;
  activeMissionId: number | null;
  completedMissions: number[];
  unlockedMissions: number[];
}

export interface TableSchema {
  name: string;
  columns: { name: string; type: string; description: string }[];
}

export type QueryRunStatus = 'idle' | 'running' | 'success' | 'error' | 'incorrect';

export interface MissionRunState {
  status: QueryRunStatus;
  result: QueryResult | null;
  errorMessage: string | null;
  feedbackMessage: string | null;
  showSuccessAnimation: boolean;
}
