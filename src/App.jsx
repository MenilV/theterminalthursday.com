import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Newsletter from './components/Newsletter';
import Archive from './components/Archive';
import HallOfFame from './components/HallOfFame';
import DesktopIcons from './components/DesktopIcons';
import './index.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ttt_theme') || 'windows';
  });

  useEffect(() => {
    // Switch CSS theme variables
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ttt_theme', theme);
    
    // Switch Favicon dynamically
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = theme === 'windows' ? '/favicon-win.svg' : '/favicon-unix.svg';
    }
  }, [theme]);

  // Intercept anchor clicks to scroll manually without updating URL hash
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      
      // Handle # section links
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } 
      // Handle root logo click
      else if (href === '/') {
        if (window.location.pathname === '/') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          history.replaceState(null, '', '/');
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'windows' ? 'unix' : 'windows');
  };

  return (
    <div className="app">
      {/* Taskbar / Navbar */}
      <nav className="navbar">
        <div className="container nav-container">
          <div className="nav-brand">
            <a href="/">
              {theme === 'windows' ? 'C:\\TTT' : '~/ttt $'}
            </a>
          </div>
          <div className="nav-links">
            <a href="https://linkedin.com/in/menilv" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://twitter.com/MenilVukovic" target="_blank" rel="noreferrer">X(Twitter)</a>
            <button onClick={toggleTheme} className="btn">
              <span className="hide-mobile">SWITCH TO&nbsp;</span>
              {theme === 'windows' ? 'UNIX' : 'WIN95'}
            </button>
          </div>
        </div>
      </nav>

      {/* App Layout */}
      <div style={{ display: 'flex', maxWidth: '100%', margin: '0 auto', padding: '60px 0' }}>
        
        {/* Left Sidebar for Desktop Icons */}
        <aside className="desktop-sidebar" style={{ width: '120px', flexShrink: 0, paddingLeft: '20px' }}>
          <DesktopIcons theme={theme} />
        </aside>

        {/* Main Content Windows */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <Hero theme={theme} />
          <Newsletter theme={theme} />
          <HallOfFame theme={theme} />
          {/* <Archive theme={theme} /> */}
        </main>
        
        {/* Right Sidebar to balance layout visually */}
        <aside className="desktop-sidebar" style={{ width: '120px', flexShrink: 0 }}></aside>
        
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--panel-bg)', borderTop: 'var(--border-width) var(--border-style) var(--border-color)', padding: '40px 0', textAlign: 'center', fontWeight: '600', transition: 'all 0.3s ease' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          
          <div className="footer-links">
            <a href="mailto:hello@theterminalthursday.com">
              {theme === 'windows' ? 'CONTACT.BAT' : './contact.sh'}
            </a>
            <a href="https://github.com/MenilV/theterminalthursday.com" target="_blank" rel="noreferrer">
              {theme === 'windows' ? 'SOURCE_CODE.EXE' : 'cat source.c'}
            </a>
            <a href="/rss.xml">
              {theme === 'windows' ? 'RSS_FEED.XML' : 'rss.xml'}
            </a>
          </div>
          
          <p style={{ marginTop: '24px', fontWeight: '800', opacity: 0.8 }}>
            SYSTEM HALTED. © {new Date().getFullYear()} THE TERMINAL THURSDAY.
          </p>
          <div style={{ marginTop: '8px', fontSize: '0.8rem', opacity: 0.5, fontFamily: 'monospace' }}>
            v{import.meta.env.VITE_APP_VERSION || '0.0.0'}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
