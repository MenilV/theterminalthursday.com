import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Newsletter from './components/Newsletter';
import Archive from './components/Archive';
import HallOfFameCarousel from './components/HallOfFameCarousel';
import Favorites from './components/Favorites';
import BottomSignup from './components/BottomSignup';
import DesktopIcons from './components/DesktopIcons';
import CliTerminal from './components/CliTerminal';
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
    
    // Switch Favicon & Mobile Safari Address Bar Theme Color dynamically
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = theme === 'windows' ? '/favicon-win.svg' : '/favicon-unix.svg';
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = theme === 'windows' ? '#c0c0c0' : '#000000';
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
        <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <Hero theme={theme} />
          <section id="subscribe">
            <div className="container" style={{ maxWidth: '90%', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'stretch' }}>
              <Newsletter theme={theme} />
              <HallOfFameCarousel theme={theme} />
            </div>
          </section>
          <section id="terminal" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="container" style={{ maxWidth: '90%' }}>
              <CliTerminal theme={theme} />
            </div>
          </section>
          {new Date() >= new Date('2026-08-20T00:00:00Z') && <Archive theme={theme} />}
        </main>
        
        {/* Right Sidebar to balance layout visually */}
        <aside className="desktop-sidebar" style={{ width: '120px', flexShrink: 0 }}></aside>
        
      </div>

      {/* Full-width Favorites Section & Bottom Signup before Footer */}
      <section style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="container" style={{ maxWidth: '96%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <Favorites theme={theme} />
          <BottomSignup theme={theme} />
        </div>
      </section>

      {/* Footer */}
      <footer>
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
              {theme === 'windows' ? 'OPEN_SOURCE.TXT' : 'opensource.txt'}
            </a>
          </div>
          
          <p style={{ marginTop: '24px', fontWeight: '700', opacity: 0.8 }}>
            SYSTEM HALTED. © <span translate="no" className="notranslate" style={{ fontFamily: "'JetBrains Mono', 'Courier New', Courier, monospace", fontWeight: '700', fontVariantNumeric: 'normal' }}>2026</span> THE TERMINAL THURSDAY.
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
              <span>{theme === 'windows' ? 'OPEN_SOURCE.TXT' : 'opensource.txt'}</span>
              <div className="window-controls">
                <span className="window-btn" onClick={() => setShowCredits(false)} style={{ cursor: 'pointer', backgroundColor: '#ff5f56' }}></span>
              </div>
            </div>
            <div className="window-content" style={{ padding: '30px 40px', display: 'flex', flexDirection: 'column', maxHeight: '80vh', overflowY: 'auto' }}>
              <h3 style={{ marginBottom: '24px', fontSize: '1.8rem', textTransform: 'uppercase', borderBottom: 'var(--border-width) var(--border-style) var(--border-color)', paddingBottom: '10px' }}>
                System Dependencies
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {[
                  {
                    category: "Website & Hosting",
                    items: [
                      { name: "React", url: "https://react.dev", desc: "The foundational library powering the UI." },
                      { name: "Vite", url: "https://vitejs.dev", desc: "Next-generation frontend tooling." },
                      { name: "Cloudflare Pages", url: "https://pages.cloudflare.com", desc: "Global edge network hosting the static assets." },
                      { name: "GitHub", url: "https://github.com", desc: "Version control and continuous deployment." }
                    ]
                  },
                  {
                    category: "Infrastructure",
                    items: [
                      { name: "Porkbun", url: "https://porkbun.com", desc: "The domain registrar keeping us online." },
                      { name: "Cloudflare", url: "https://cloudflare.com", desc: "DNS, CDN, and DDoS protection." },
                      { name: "Loops.so", url: "https://loops.so", desc: "Email API and newsletter delivery." }
                    ]
                  },
                  {
                    category: "Engine & APIs",
                    items: [
                      { name: "n8n", url: "https://n8n.io", desc: "The workflow automation engine driving content pipelines." },
                      { name: "X API", url: "https://developer.x.com", desc: "Social distribution network endpoints." },
                      { name: "LinkedIn API", url: "https://developer.linkedin.com", desc: "Professional network distribution endpoints." }
                    ]
                  },
                  {
                    category: "Design & Environment",
                    items: [
                      { name: "Windows 95 & UNIX", url: "#", desc: "The architectural design and aesthetic inspiration." },
                      { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", desc: "The primary scripting language of the terminal." },
                      { name: "JetBrains Mono", url: "https://github.com/JetBrains/JetBrainsMono", desc: "The developer typeface powering the retro aesthetic." },
                      { name: "Oxlint", url: "https://oxc.rs", desc: "High-performance JavaScript linter." }
                    ]
                  }
                ].map((section, idx) => (
                  <div key={idx}>
                    <h4 style={{ fontSize: '1.1rem', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8, borderBottom: '1px solid var(--border-color)', display: 'inline-block' }}>
                      {section.category}
                    </h4>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {section.items.map((item, i) => (
                        <li key={i}>
                          <a href={item.url} target={item.url !== '#' ? '_blank' : '_self'} rel="noreferrer" style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-color)', textDecoration: 'none' }}>
                            ► {item.name}
                          </a>
                          <p style={{ margin: '2px 0 0 20px', opacity: 0.8, fontSize: '0.9rem' }}>{item.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

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
