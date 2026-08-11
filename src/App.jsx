import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Newsletter from './components/Newsletter';
import Archive from './components/Archive';
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

  const toggleTheme = () => {
    setTheme(prev => prev === 'windows' ? 'unix' : 'windows');
  };

  return (
    <div className="app">
      {/* Taskbar / Navbar */}
      <nav style={{ background: 'var(--panel-bg)', borderBottom: 'var(--border-width) var(--border-style) var(--border-color)', padding: '10px 0', position: 'sticky', top: 0, zIndex: 100, transition: 'all 0.3s ease' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              style={{ background: 'var(--panel-header-bg)', color: 'var(--panel-header-text)', padding: '4px 12px', fontWeight: '800', border: 'var(--border-width) var(--border-style) var(--border-color)', textDecoration: 'none' }}
            >
              {theme === 'windows' ? 'C:\\TTT' : '~/ttt $'}
            </a>
          </div>
          <div style={{ display: 'flex', gap: '24px', fontSize: '1rem', alignItems: 'center' }}>
            <a href="#archive">Archive</a>
            <a href="https://twitter.com/MenilVukovic" target="_blank" rel="noreferrer">X (Twitter)</a>
            <button onClick={toggleTheme} className="btn" style={{ padding: '4px 8px', fontSize: '0.85rem' }}>
              {theme === 'windows' ? 'SWITCH TO UNIX' : 'SWITCH TO WIN95'}
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Background Icons (Visible on large screens) */}
      <DesktopIcons theme={theme} />

      {/* Main Content */}
      <main style={{ padding: '60px 0' }}>
        <Hero theme={theme} />
        <Newsletter theme={theme} />
        <Archive theme={theme} />
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--panel-bg)', borderTop: 'var(--border-width) var(--border-style) var(--border-color)', padding: '40px 0', textAlign: 'center', fontWeight: '600', transition: 'all 0.3s ease' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center', fontSize: '1.1rem', fontWeight: '700' }}>
            <a href="mailto:hello@theterminalthursday.com">
              {theme === 'windows' ? 'CONTACT.BAT' : './contact.sh'}
            </a>
            <a href="https://github.com/MenilV/theterminalthursday.com" target="_blank" rel="noreferrer">
              {theme === 'windows' ? 'SOURCE_CODE.EXE' : 'cat source.c'}
            </a>
            <a href="#">
              {theme === 'windows' ? 'RSS_FEED.XML' : 'rss.xml'}
            </a>
          </div>
          
          <p style={{ marginTop: '24px', fontWeight: '800', opacity: 0.8 }}>
            SYSTEM HALTED. © {new Date().getFullYear()} THE TERMINAL THURSDAY.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
