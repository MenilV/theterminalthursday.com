import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Newsletter from './components/Newsletter';
import Archive from './components/Archive';
import HallOfFameCarousel from './components/HallOfFameCarousel';
import DesktopIcons from './components/DesktopIcons';
import './index.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ttt_theme') || 'windows';
  });
  const [showCredits, setShowCredits] = useState(false);

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
          <section id="subscribe" style={{ paddingBottom: '60px' }}>
            <div className="container" style={{ maxWidth: '90%', display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'stretch' }}>
              <Newsletter theme={theme} />
              <HallOfFameCarousel theme={theme} />
            </div>
          </section>
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
            <a href="#" onClick={(e) => { e.preventDefault(); setShowCredits(true); }}>
              {theme === 'windows' ? 'OPEN_SOURCE.TXT' : 'cat opensource.txt'}
            </a>
          </div>
          
          <p style={{ marginTop: '24px', fontWeight: '800', opacity: 0.8 }}>
            SYSTEM HALTED. © {new Date().getFullYear()} THE TERMINAL THURSDAY.
          </p>

          <div style={{ marginTop: '16px', fontSize: '0.8rem', opacity: 0.5, fontFamily: 'monospace' }}>
            v{import.meta.env.VITE_APP_VERSION || '0.0.0'}
          </div>
        </div>
      </footer>

      {/* Credits Modal */}
      {showCredits && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', 
          alignItems: 'center', zIndex: 9999 
        }}>
          <div className="window-panel animate-pop-in" style={{ maxWidth: '600px', width: '90%', padding: '0', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <div className="window-header">
              <span>{theme === 'windows' ? 'OPEN_SOURCE.TXT' : 'cat opensource.txt'}</span>
              <div className="window-controls">
                <span className="window-btn" onClick={() => setShowCredits(false)} style={{ cursor: 'pointer', backgroundColor: '#ff5f56' }}></span>
              </div>
            </div>
            <div className="window-content" style={{ padding: '30px 40px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '24px', fontSize: '1.8rem', textTransform: 'uppercase', borderBottom: 'var(--border-width) var(--border-style) var(--border-color)', paddingBottom: '10px' }}>
                System Dependencies
              </h3>
              
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li>
                  <a href="https://react.dev" target="_blank" rel="noreferrer" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-color)', textDecoration: 'none' }}>► React (react / react-dom)</a>
                  <p style={{ margin: '4px 0 0 20px', opacity: 0.8, fontSize: '0.95rem' }}>The library for web and native user interfaces.</p>
                </li>
                <li>
                  <a href="https://vitejs.dev" target="_blank" rel="noreferrer" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-color)', textDecoration: 'none' }}>► Vite (@vitejs/plugin-react)</a>
                  <p style={{ margin: '4px 0 0 20px', opacity: 0.8, fontSize: '0.95rem' }}>Next generation frontend tooling for lightning fast HMR.</p>
                </li>
                <li>
                  <a href="https://oxc.rs/docs/guide/usage/linter.html" target="_blank" rel="noreferrer" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-color)', textDecoration: 'none' }}>► Oxlint</a>
                  <p style={{ margin: '4px 0 0 20px', opacity: 0.8, fontSize: '0.95rem' }}>A suite of high-performance tools for JavaScript and TypeScript.</p>
                </li>
                <li>
                  <a href="https://github.com/JetBrains/JetBrainsMono" target="_blank" rel="noreferrer" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-color)', textDecoration: 'none' }}>► JetBrains Mono</a>
                  <p style={{ margin: '4px 0 0 20px', opacity: 0.8, fontSize: '0.95rem' }}>A typeface made for developers, powering our retro aesthetic.</p>
                </li>
                <li>
                  <a href="https://loops.so" target="_blank" rel="noreferrer" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-color)', textDecoration: 'none' }}>► Loops</a>
                  <p style={{ margin: '4px 0 0 20px', opacity: 0.8, fontSize: '0.95rem' }}>The email API and delivery infrastructure powering our network.</p>
                </li>
              </ul>

              <button className="btn btn-primary" onClick={() => setShowCredits(false)} style={{ width: '100%', marginTop: '32px' }}>
                {theme === 'windows' ? 'CLOSE_WINDOW.EXE' : './exit.sh'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
