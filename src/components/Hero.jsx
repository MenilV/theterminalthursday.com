import React from 'react';

const Hero = ({ theme }) => {
  return (
    <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '90%' }}>
        
        <div className="window-panel animate-pop-in">
          <div className="window-header">
            <span>{theme === 'windows' ? 'TTT_SETUP.EXE' : 'ttt_setup.sh'}</span>
            <div className="window-controls">
              <span className="window-btn"></span>
              <span className="window-btn"></span>
              <span className="window-btn"></span>
            </div>
          </div>
          
          <div className="window-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '60px 20px' }}>
            
            <div className="highlight-box" style={{ padding: '4px 8px', marginBottom: '24px', fontWeight: 'bold' }}>
              INSTALLATION IN PROGRESS...
            </div>
            
            <h1 className="highlight-box" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '24px', padding: '0 20px' }}>
              THE TERMINAL<br/>THURSDAY
            </h1>
            
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', maxWidth: '600px', marginBottom: '40px', fontWeight: '600' }}>
              A serial homage to the open-source projects, tools, and maintainers that form the bedrock of the modern web. Delivered every Thursday.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="#subscribe" className="btn btn-primary">
                {theme === 'windows' ? 'SUBSCRIBE.BAT' : './subscribe.sh'}
              </a>
              <a href="#archive" className="btn">
                {theme === 'windows' ? 'READ_ARCHIVE.TXT' : 'cat archive.txt'}
              </a>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
