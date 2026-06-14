export function Header() {
  return (
    <header className="app-header">
      <div className="header-glow" aria-hidden="true" />
      <div className="header-content">
        <div className="header-brand">
          <div className="brand-icon" aria-hidden="true">
            <span className="brand-ring" />
            <span className="brand-core" />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">Omnitrix DB</h1>
            <p className="brand-subtitle">Alien Data Interface · SQL Training Protocol</p>
          </div>
        </div>
        <div className="header-status">
          <span className="status-dot" />
          <span className="status-label">SYSTEM ONLINE</span>
        </div>
      </div>
    </header>
  );
}
