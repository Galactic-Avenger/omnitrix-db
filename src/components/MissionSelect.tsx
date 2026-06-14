import { MISSIONS, TOTAL_MISSIONS } from '../missions/missions';
import { useGameState } from '../hooks/useGameState';
import { ProgressBar } from './ProgressBar';

const DIFFICULTY_LABELS = {
  beginner: 'BEGINNER',
  intermediate: 'INTERMEDIATE',
  advanced: 'ADVANCED',
} as const;

export function MissionSelect() {
  const { gameState, progressPercent, isMissionUnlocked, isMissionCompleted, openMission } =
    useGameState();

  const allComplete = gameState.completedMissions.length === TOTAL_MISSIONS;

  return (
    <div className="mission-select">
      <ProgressBar
        percent={progressPercent}
        completed={gameState.completedMissions.length}
        total={TOTAL_MISSIONS}
      />

      <div className="mission-select-intro">
        <h2 className="section-title">Available Missions</h2>
        <p className="section-desc">
          Select a mission to access the alien database. Write SQL queries to complete each objective
          and unlock the next protocol.
        </p>
      </div>

      <div className="mission-grid">
        {MISSIONS.map((mission) => {
          const unlocked = isMissionUnlocked(mission.id);
          const completed = isMissionCompleted(mission.id);

          return (
            <button
              key={mission.id}
              type="button"
              className={`mission-card ${unlocked ? 'unlocked' : 'locked'} ${completed ? 'completed' : ''}`}
              onClick={() => openMission(mission.id)}
              disabled={!unlocked}
              aria-label={`${mission.title}${!unlocked ? ' (locked)' : ''}${completed ? ' (completed)' : ''}`}
            >
              <div className="card-corner card-corner-tl" aria-hidden="true" />
              <div className="card-corner card-corner-tr" aria-hidden="true" />
              <div className="card-corner card-corner-bl" aria-hidden="true" />
              <div className="card-corner card-corner-br" aria-hidden="true" />

              <div className="mission-card-header">
                <span className="mission-number">M-{String(mission.id).padStart(2, '0')}</span>
                <span className={`mission-difficulty difficulty-${mission.difficulty}`}>
                  {DIFFICULTY_LABELS[mission.difficulty]}
                </span>
              </div>

              <h3 className="mission-card-title">{mission.title}</h3>
              <p className="mission-card-goal">{mission.goal}</p>

              <div className="mission-card-footer">
                {completed && <span className="mission-badge badge-complete">✓ COMPLETE</span>}
                {!unlocked && <span className="mission-badge badge-locked">🔒 LOCKED</span>}
                {unlocked && !completed && <span className="mission-badge badge-active">READY</span>}
              </div>
            </button>
          );
        })}
      </div>

      {allComplete && (
        <div className="all-complete-banner">
          <div className="banner-pulse" aria-hidden="true" />
          <h3>All Missions Complete</h3>
          <p>You have mastered the Omnitrix database protocols. The galaxy is in good hands.</p>
        </div>
      )}
    </div>
  );
}
