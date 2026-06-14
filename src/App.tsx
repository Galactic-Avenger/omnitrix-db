import { Header } from './components/Header';
import { MissionSelect } from './components/MissionSelect';
import { MissionView } from './components/MissionView';
import { DatabaseProvider } from './hooks/DatabaseProvider';
import { useDatabase } from './hooks/useDatabase';
import { GameProvider } from './hooks/GameProvider';
import { useGameState } from './hooks/useGameState';

function AppContent() {
  const { gameState } = useGameState();
  const { isLoading, error } = useDatabase();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" aria-hidden="true" />
        <p className="loading-text">Initializing Omnitrix Database...</p>
        <p className="loading-subtext">Loading SQLite WASM module</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>Database Initialization Failed</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="app-main">
        {gameState.screen === 'select' ? (
          <MissionSelect />
        ) : (
          <MissionView key={gameState.activeMissionId} />
        )}
      </main>
    </>
  );
}

function App() {
  return (
    <DatabaseProvider>
      <GameProvider>
        <div className="app">
          <div className="scanlines" aria-hidden="true" />
          <div className="grid-overlay" aria-hidden="true" />
          <AppContent />
        </div>
      </GameProvider>
    </DatabaseProvider>
  );
}

export default App;
