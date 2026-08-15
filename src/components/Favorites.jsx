import React from 'react';

const FEATURED_FAVORITES = [
  {
    name: 'Raycast',
    category: 'LAUNCHER',
    url: 'https://raycast.com',
    img: 'https://github.com/raycast.png',
    desc: 'The keyboard-driven command center replacing Spotlight. Essential for custom scripts, clipboard history, and window management.'
  },
  {
    name: 'n8n',
    category: 'AUTOMATION',
    url: 'https://n8n.io',
    img: 'https://github.com/n8n-io.png',
    desc: 'Fair-code workflow automation engine powering backend triggers, scrapers, and automated content pipelines.'
  },
  {
    name: 'Excalidraw',
    category: 'DIAGRAMS',
    url: 'https://excalidraw.com',
    img: 'https://github.com/excalidraw.png',
    desc: 'Virtual hand-drawn whiteboard for sketching architecture diagrams, wireframes, and open-source visual ideas.'
  }
];

const QUICK_LIST = [
  { name: 'yt-dlp', url: 'https://github.com/yt-dlp/yt-dlp' },
  { name: 'Tailscale', url: 'https://tailscale.com' },
  { name: 'Stats (macOS)', url: 'https://github.com/exelban/stats' },
  { name: 'ngrok', url: 'https://ngrok.com' },
  { name: 'Sublime Text', url: 'https://www.sublimetext.com' },
  { name: 'iTerm2 (macOS)', url: 'https://iterm2.com' },
  { name: 'aerc', url: 'https://aerc-mail.org' }
];

const Favorites = ({ theme }) => {
  return (
    <section id="favorites" style={{ width: '100%' }}>
      <div className="window-panel animate-pop-in">
        <div className="window-header">
          <span>{theme === 'windows' ? 'FAVORITES.CFG' : 'cat ~/.favorites'}</span>
          <div className="window-controls">
            <span className="window-btn"></span>
            <span className="window-btn"></span>
            <span className="window-btn"></span>
          </div>
        </div>

        <div className="window-content" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div>
            <div className="highlight-box" style={{ padding: '4px 8px', marginBottom: '12px', fontWeight: 'bold', display: 'inline-block' }}>
              DAILY DRIVERS & ESSENTIAL STACK
            </div>
            <h2 style={{ fontSize: '2rem', textTransform: 'uppercase', margin: 0 }}>
              {theme === 'windows' ? 'MY CURRENT FAVORITES' : 'curated_tools.log'}
            </h2>
            <p style={{ marginTop: '8px', opacity: 0.8, fontSize: '0.95rem', fontWeight: '600', maxWidth: '700px' }}>
              A hand-picked collection of software, CLI utilities, and open-source tools I rely on daily.
            </p>
          </div>

          {/* 4 Elements Side-by-Side in the Same Row */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', 
            gap: '20px',
            alignItems: 'stretch'
          }}>
            
            {/* 3 Featured Cards */}
            {FEATURED_FAVORITES.map((tool) => (
              <div 
                key={tool.name}
                style={{
                  border: 'var(--border-width) var(--border-style) var(--border-color)',
                  background: 'var(--input-bg)',
                  color: 'var(--text-color)',
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  boxShadow: 'var(--shadow-hover) var(--shadow-hover) 0 var(--shadow-color)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <a href={tool.url} target="_blank" rel="noreferrer" style={{ flexShrink: 0, textDecoration: 'none' }}>
                      <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        border: 'var(--border-width) var(--border-style) var(--border-color)',
                        backgroundColor: 'var(--panel-bg)',
                        overflow: 'hidden'
                      }}>
                        <img src={tool.img} alt={tool.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </a>

                    {/* Stacked Title & Tag matching image height (50px) */}
                    <div style={{ flex: 1, height: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <a href={tool.url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-color)', textDecoration: 'none', lineHeight: '1.1' }}>
                        <span style={{ 
                          fontFamily: 'var(--font-mono)', 
                          fontWeight: 'bold', 
                          fontSize: '1.2rem',
                          textTransform: 'uppercase'
                        }}>
                          {tool.name}
                        </span>
                      </a>
                      <span style={{
                        background: 'var(--accent-bg)',
                        color: 'var(--accent-text)',
                        padding: '1px 5px',
                        fontSize: '0.65rem',
                        fontWeight: 'bold',
                        letterSpacing: '0.5px',
                        border: 'var(--border-width) var(--border-style) var(--border-color)'
                      }}>
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.5', opacity: 0.9, fontWeight: '500' }}>
                    {tool.desc}
                  </p>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px dashed var(--border-color)' }}>
                  <a 
                    href={tool.url} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 'bold', 
                      color: 'var(--text-color)',
                      textDecoration: 'none'
                    }}
                  >
                    {theme === 'windows' ? 'LAUNCH_TOOL.EXE ↗' : './launch.sh ↗'}
                  </a>
                </div>
              </div>
            ))}

            {/* 4th Compact Quick List Column */}
            <div style={{
              border: 'var(--border-width) var(--border-style) var(--border-color)',
              background: 'var(--input-bg)',
              color: 'var(--text-color)',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-hover) var(--shadow-hover) 0 var(--shadow-color)'
            }}>
              <h3 style={{ 
                fontSize: '0.88rem', 
                textTransform: 'uppercase', 
                marginBottom: '12px', 
                paddingBottom: '8px',
                borderBottom: 'var(--border-width) var(--border-style) var(--border-color)',
                opacity: 0.9,
                fontWeight: 'bold'
              }}>
                {theme === 'windows' ? 'QUICK_STACK.LST' : './quick_links.txt'}
              </h3>

              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {QUICK_LIST.map((item) => (
                  <li key={item.name} style={{ fontSize: '0.85rem' }}>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ 
                        fontWeight: 'bold', 
                        color: 'var(--text-color)', 
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      ► <span translate="no" className="notranslate" style={{ fontFamily: "'JetBrains Mono', 'Courier New', Courier, monospace" }}>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Favorites;
