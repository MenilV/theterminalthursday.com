import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Newsletter from './components/Newsletter';
import Archive from './components/Archive';
import './index.css';

function App() {
  const [theme, setTheme] = useState('windows');

  useEffect(() => {
    // Switch CSS theme variables
    document.documentElement.setAttribute('data-theme', theme);
    
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
            <div style={{ background: 'var(--panel-header-bg)', color: 'var(--panel-header-text)', padding: '4px 12px', fontWeight: '800', border: 'var(--border-width) var(--border-style) var(--border-color)' }}>
              {theme === 'windows' ? 'C:\\TTT' : '~/ttt $'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px', fontSize: '1rem', alignItems: 'center' }}>
            <a href="#archive">Archive</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">X</a>
            <button onClick={toggleTheme} className="btn" style={{ padding: '4px 8px', fontSize: '0.85rem' }}>
              {theme === 'windows' ? 'SWITCH TO UNIX' : 'SWITCH TO WIN95'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '60px 0' }}>
        <Hero theme={theme} />
        <Newsletter theme={theme} />
        <Archive theme={theme} />
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--panel-bg)', borderTop: 'var(--border-width) var(--border-style) var(--border-color)', padding: '24px 0', textAlign: 'center', fontWeight: '700', transition: 'all 0.3s ease' }}>
        <div className="container">
          <p>SYSTEM HALTED. © {new Date().getFullYear()} The Terminal Thursday.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
