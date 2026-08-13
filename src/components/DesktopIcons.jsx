import React from 'react';

const DesktopIcons = ({ theme }) => {
  return (
    <div className="desktop-icons" style={{
      position: 'sticky',
      top: '120px',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      zIndex: 10,
    }}>
      
      {/* 1. My Computer -> Scrolls to Top */}
      <a href="/" className="desktop-icon" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ textDecoration: 'none' }}>
        {theme === 'windows' ? (
          <div className="icon-graphic">
            <svg viewBox="0 0 32 32" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="24" height="16" fill="var(--panel-bg)" stroke="var(--border-color)" strokeWidth="2"/>
              <rect x="6" y="8" width="20" height="12" fill="#008080" stroke="var(--border-color)" strokeWidth="2"/>
              <rect x="14" y="22" width="4" height="4" fill="var(--panel-bg)" stroke="var(--border-color)" strokeWidth="2"/>
              <rect x="8" y="26" width="16" height="2" fill="var(--border-color)"/>
            </svg>
          </div>
        ) : (
          <div className="icon-graphic">
            <svg viewBox="0 0 32 32" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
              <text x="4" y="22" fontFamily="monospace" fontSize="14" fill="var(--border-color)" fontWeight="bold">~/</text>
            </svg>
          </div>
        )}
        <span className="icon-label">{theme === 'windows' ? 'My Computer' : 'root'}</span>
      </a>

      {/* 2. Inbox -> Scrolls to Newsletter (HIDDEN FOR NOW) */}
      {/* 
      <a href="#subscribe" className="desktop-icon" style={{ textDecoration: 'none' }}>
        ...
      </a>
      */}

      {/* 3. Network -> Scrolls to Archive (HIDDEN FOR NOW) */}
      {/* 
      <a href="#archive" className="desktop-icon" style={{ textDecoration: 'none' }}>
        ...
      </a>
      */}

    </div>
  );
};

export default DesktopIcons;
