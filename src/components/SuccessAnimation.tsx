interface SuccessAnimationProps {
  missionTitle: string;
  onDismiss: () => void;
}

export function SuccessAnimation({ missionTitle, onDismiss }: SuccessAnimationProps) {
  return (
    <div className="success-overlay" role="dialog" aria-labelledby="success-title">
      <div className="success-modal">
        <div className="success-rings" aria-hidden="true">
          <span className="ring ring-1" />
          <span className="ring ring-2" />
          <span className="ring ring-3" />
        </div>
        <div className="success-icon" aria-hidden="true">✦</div>
        <h2 id="success-title" className="success-title">Mission Complete</h2>
        <p className="success-subtitle">{missionTitle}</p>
        <p className="success-message">Query validated. Next protocol unlocked.</p>
        <button type="button" className="success-button" onClick={onDismiss}>
          Return to Missions
        </button>
      </div>
    </div>
  );
}
