import { useEffect, useState, type ReactNode } from 'react';
import { initDatabase } from '../db/database';
import { DatabaseContext } from './useDatabase';

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<Awaited<ReturnType<typeof initDatabase>> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    initDatabase()
      .then((database) => {
        if (!cancelled) {
          setDb(database);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to initialize database';
          setError(message);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DatabaseContext.Provider value={{ db, isLoading, error }}>
      {children}
    </DatabaseContext.Provider>
  );
}
