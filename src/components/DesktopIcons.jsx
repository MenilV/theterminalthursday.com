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

      {/* 2. Inbox -> Scrolls to Newsletter */}
      <a href="#subscribe" className="desktop-icon" style={{ textDecoration: 'none' }}>
        {theme === 'windows' ? (
          <div className="icon-graphic">
            <svg viewBox="0 0 32 32" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
               {/* Inbox Tray */}
               <polygon points="6,16 26,16 22,26 10,26" fill="var(--panel-bg)" stroke="var(--border-color)" strokeWidth="2"/>
               {/* Envelope inside */}
               <rect x="10" y="8" width="12" height="10" fill="#fff" stroke="var(--border-color)" strokeWidth="2"/>
               <path d="M 10 8 L 16 13 L 22 8" fill="none" stroke="var(--border-color)" strokeWidth="2"/>
               {/* Front lip of tray to overlap envelope */}
               <polygon points="6,20 26,20 22,26 10,26" fill="var(--panel-bg)" stroke="var(--border-color)" strokeWidth="2"/>
            </svg>
          </div>
        ) : (
          <div className="icon-graphic">
            <svg viewBox="0 0 32 32" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="10" width="24" height="14" fill="none" stroke="var(--border-color)" strokeWidth="2"/>
              <path d="M 4 10 L 16 18 L 28 10" fill="none" stroke="var(--border-color)" strokeWidth="2"/>
            </svg>
          </div>
        )}
        <span className="icon-label">{theme === 'windows' ? 'Inbox' : '/var/mail'}</span>
      </a>

      {/* 3. System Architects -> Scrolls to Carousel */}
      <a href="#subscribe" className="desktop-icon" style={{ textDecoration: 'none' }}>
        {theme === 'windows' ? (
          <div className="icon-graphic">
            <svg viewBox="0 0 32 32" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="24" height="20" fill="var(--panel-bg)" stroke="var(--border-color)" strokeWidth="2"/>
              <rect x="7" y="9" width="8" height="8" fill="#0000a8" stroke="var(--border-color)" strokeWidth="1"/>
              <line x1="17" y1="11" x2="24" y2="11" stroke="var(--border-color)" strokeWidth="2"/>
              <line x1="17" y1="15" x2="24" y2="15" stroke="var(--border-color)" strokeWidth="2"/>
              <line x1="7" y1="21" x2="24" y2="21" stroke="var(--border-color)" strokeWidth="2"/>
            </svg>
          </div>
        ) : (
          <div className="icon-graphic">
            <svg viewBox="0 0 32 32" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
              <text x="2" y="20" fontFamily="monospace" fontSize="11" fill="var(--border-color)" fontWeight="bold">passwd</text>
            </svg>
          </div>
        )}
        <span className="icon-label">{theme === 'windows' ? 'Architects' : '/etc/passwd'}</span>
      </a>

    </div>
  );
};

export default DesktopIcons;
