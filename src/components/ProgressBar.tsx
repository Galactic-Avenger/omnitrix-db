interface ProgressBarProps {
  percent: number;
  completed: number;
  total: number;
}

export function ProgressBar({ percent, completed, total }: ProgressBarProps) {
  return (
    <div className="progress-section">
      <div className="progress-header">
        <span className="progress-label">Mission Progress</span>
        <span className="progress-count">
          {completed} / {total} complete
        </span>
      </div>
      <div className="progress-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${percent}%` }}>
          <div className="progress-glow" />
        </div>
      </div>
      <span className="progress-percent">{percent}%</span>
    </div>
  );
}
