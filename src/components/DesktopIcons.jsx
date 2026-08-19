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
              {/* User Silhouette */}
              <circle cx="16" cy="10" r="5" fill="none" stroke="var(--border-color)" strokeWidth="2"/>
              <path d="M 7 24 C 7 18, 25 18, 25 24" fill="none" stroke="var(--border-color)" strokeWidth="2"/>
              {/* Root # Badge */}
              <text x="21" y="13" fontFamily="monospace" fontSize="11" fill="var(--border-color)" fontWeight="bold">#</text>
            </svg>
          </div>
        )}
        <span className="icon-label">{theme === 'windows' ? 'Architects' : 'sudoers'}</span>
      </a>

      {/* 4. Terminal -> Scrolls to Terminal */}
      <a href="#terminal" className="desktop-icon" style={{ textDecoration: 'none' }}>
        {theme === 'windows' ? (
          <div className="icon-graphic">
            <svg viewBox="0 0 32 32" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="24" height="20" fill="#000" stroke="var(--border-color)" strokeWidth="2"/>
              <rect x="4" y="6" width="24" height="4" fill="#0000a8" stroke="var(--border-color)" strokeWidth="1"/>
              <text x="6" y="18" fontFamily="monospace" fontSize="10" fill="#fff" fontWeight="bold">&gt;_</text>
            </svg>
          </div>
        ) : (
          <div className="icon-graphic">
            <svg viewBox="0 0 32 32" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="24" height="20" fill="none" stroke="var(--border-color)" strokeWidth="2"/>
              <line x1="4" y1="10" x2="28" y2="10" stroke="var(--border-color)" strokeWidth="2"/>
              <text x="6" y="22" fontFamily="monospace" fontSize="12" fill="var(--border-color)" fontWeight="bold">$_</text>
            </svg>
          </div>
        )}
        <span className="icon-label">{theme === 'windows' ? 'MS-DOS Prompt' : '/bin/bash'}</span>
      </a>

      {/* 5. Favorites -> Scrolls to Favorites */}
      <a href="#favorites" className="desktop-icon" style={{ textDecoration: 'none' }}>
        {theme === 'windows' ? (
          <div className="icon-graphic">
            <svg viewBox="0 0 32 32" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
              {/* Folder */}
              <polygon points="4,10 12,10 14,13 28,13 28,26 4,26" fill="#ffff00" stroke="var(--border-color)" strokeWidth="2"/>
              {/* Star inside */}
              <polygon points="16,14 17.5,17.5 21,17.5 18,19.5 19,23 16,21 13,23 14,19.5 11,17.5 14.5,17.5" fill="var(--border-color)"/>
            </svg>
          </div>
        ) : (
          <div className="icon-graphic">
            <svg viewBox="0 0 32 32" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
              <polygon points="16,6 18.5,13.5 26,13.5 20,18 22,25 16,21 10,25 12,18 6,13.5 13.5,13.5" fill="none" stroke="var(--border-color)" strokeWidth="2"/>
            </svg>
          </div>
        )}
        <span className="icon-label">{theme === 'windows' ? 'Favorites' : '.bookmarks'}</span>
      </a>

      

    </div>
  );
};

export default DesktopIcons;
