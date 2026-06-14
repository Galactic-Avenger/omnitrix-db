import { useCallback, useState } from 'react';
import type { MissionRunState } from '../types';
import { executeQuery } from '../db/database';
import { useDatabase } from '../hooks/useDatabase';
import { useGameState } from '../hooks/useGameState';
import { getMissionById } from '../missions/missions';
import { isSelectQuery, resultsMatch } from '../missions/validator';
import { SqlEditor } from './SqlEditor';
import { ResultTable } from './ResultTable';
import { SchemaPanel } from './SchemaPanel';
import { SuccessAnimation } from './SuccessAnimation';

const INITIAL_RUN_STATE: MissionRunState = {
  status: 'idle',
  result: null,
  errorMessage: null,
  feedbackMessage: null,
  showSuccessAnimation: false,
};

export function MissionView() {
  const { gameState, returnToSelect, completeMission } = useGameState();
  const { db } = useDatabase();
  const mission = gameState.activeMissionId
    ? getMissionById(gameState.activeMissionId)
    : undefined;

  const [sql, setSql] = useState(mission?.starterSql ?? '');
  const [runState, setRunState] = useState<MissionRunState>(INITIAL_RUN_STATE);

  const handleRun = useCallback(() => {
    if (!db || !mission) {
      return;
    }

    if (!isSelectQuery(sql)) {
      setRunState({
        status: 'error',
        result: null,
        errorMessage: 'Only SELECT queries are allowed in training missions.',
        feedbackMessage: null,
        showSuccessAnimation: false,
      });
      return;
    }

    setRunState((prev) => ({ ...prev, status: 'running' }));

    try {
      const playerResult = executeQuery(db, sql);
      const expectedResult = executeQuery(db, mission.validationSql);
      const isCorrect = resultsMatch(playerResult, expectedResult);

      if (isCorrect) {
        completeMission(mission.id);
        setRunState({
          status: 'success',
          result: playerResult,
          errorMessage: null,
          feedbackMessage: 'Correct! Mission objective achieved.',
          showSuccessAnimation: true,
        });
      } else {
        setRunState({
          status: 'incorrect',
          result: playerResult,
          errorMessage: null,
          feedbackMessage: mission.hint,
          showSuccessAnimation: false,
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setRunState({
        status: 'error',
        result: null,
        errorMessage: message,
        feedbackMessage: null,
        showSuccessAnimation: false,
      });
    }
  }, [db, mission, sql, completeMission]);

  const handleDismissSuccess = useCallback(() => {
    setRunState((prev) => ({ ...prev, showSuccessAnimation: false }));
    returnToSelect();
  }, [returnToSelect]);

  if (!mission) {
    return null;
  }

  return (
    <div className="mission-view">
      <button type="button" className="back-button" onClick={returnToSelect}>
        ← Back to Missions
      </button>

      <div className="mission-brief">
        <div className="brief-header">
          <span className="mission-tag">M-{String(mission.id).padStart(2, '0')}</span>
          <h2 className="mission-title">{mission.title}</h2>
        </div>
        <p className="mission-story">{mission.storyBrief}</p>
        <div className="mission-objective">
          <span className="objective-label">OBJECTIVE</span>
          <p className="objective-text">{mission.goal}</p>
        </div>
      </div>

      <SchemaPanel relevantTables={mission.relevantTables} />

      <SqlEditor
        value={sql}
        onChange={setSql}
        onRun={handleRun}
        isRunning={runState.status === 'running'}
      />

      {runState.feedbackMessage && (
        <div
          className={`feedback-banner ${runState.status === 'success' ? 'feedback-success' : 'feedback-hint'}`}
        >
          <span className="feedback-icon" aria-hidden="true">
            {runState.status === 'success' ? '✓' : '◈'}
          </span>
          {runState.feedbackMessage}
        </div>
      )}

      <ResultTable result={runState.result} error={runState.errorMessage} />

      {runState.showSuccessAnimation && (
        <SuccessAnimation missionTitle={mission.title} onDismiss={handleDismissSuccess} />
      )}
    </div>
  );
}
