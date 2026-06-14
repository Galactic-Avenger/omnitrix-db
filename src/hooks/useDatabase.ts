import { createContext, useContext } from 'react';
import type { Database } from 'sql.js';

export interface DatabaseContextValue {
  db: Database | null;
  isLoading: boolean;
  error: string | null;
}

export const DatabaseContext = createContext<DatabaseContextValue | null>(null);

export function useDatabase(): DatabaseContextValue {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
