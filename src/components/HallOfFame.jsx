import React from 'react';

const maintainers = [
  {
    name: 'Linus Torvalds',
    alias: 'torvalds',
    projects: ['Linux', 'Git'],
    desc: 'The chief architect of the Linux kernel and creator of the distributed version control system that runs the world.',
    id: '001'
  },
  {
    name: 'Daniel Stenberg',
    alias: 'bagder',
    projects: ['cURL', 'libcurl'],
    desc: 'Maintains the client-side URL transfer library operating silently in billions of devices globally.',
    id: '002'
  },
  {
    name: 'Fabrice Bellard',
    alias: 'bellard',
    projects: ['FFmpeg', 'QEMU'],
    desc: 'A prolific programmer responsible for the backbone of modern media processing and hardware virtualization.',
    id: '003'
  },
  {
    name: 'Evan You',
    alias: 'yyx990803',
    projects: ['Vue.js', 'Vite'],
    desc: 'Redefined frontend developer experience with lightning-fast, unopinionated web tooling.',
    id: '004'
  }
];

const HallOfFame = ({ theme }) => {
  return (
    <section id="hall-of-fame" style={{ padding: '20px 0 60px 0', display: 'flex', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '90%' }}>
        <div className="window-panel animate-pop-in">
          <div className="window-header">
            <span>{theme === 'windows' ? 'SYSADMIN_DB.EXE' : 'cat /etc/passwd'}</span>
            <div className="window-controls">
              <span className="window-btn"></span>
              <span className="window-btn"></span>
              <span className="window-btn"></span>
            </div>
          </div>
          <div className="window-content" style={{ padding: '40px 30px' }}>
            <div className="highlight-box" style={{ padding: '4px 8px', marginBottom: '24px', fontWeight: 'bold', display: 'inline-block' }}>
              QUERY: MOST_WANTED
            </div>
            
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px', textTransform: 'uppercase', color: 'var(--text-color)' }}>
              System Architects
            </h2>
            <p style={{ fontWeight: '600', marginBottom: '40px', fontSize: '1.1rem', maxWidth: '600px' }}>
              The open-source maintainers silently holding the internet together.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {maintainers.map(m => (
                <div key={m.id} style={{ 
                  border: 'var(--border-width) var(--border-style) var(--border-color)', 
                  background: 'var(--input-bg)', 
                  color: 'var(--text-color)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-hover) var(--shadow-hover) 0 var(--shadow-color)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ 
                      background: 'var(--panel-bg)',
                      color: 'var(--text-color)',
                      padding: '4px 8px',
                      fontWeight: '800',
                      border: '2px solid var(--border-color)',
                      fontSize: '0.85rem'
                    }}>
                      ID: {m.id}
                    </div>
                  </div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1.4rem', fontFamily: 'var(--font-mono)' }}>{m.name}</h3>
                  <div style={{ fontSize: '0.9rem', marginBottom: '16px', opacity: 0.7, fontWeight: 'bold' }}>@{m.alias}</div>
                  
                  <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {m.projects.map(p => (
                      <span key={p} style={{ 
                        background: 'var(--accent-bg)', 
                        color: 'var(--accent-text)', 
                        padding: '4px 8px', 
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        border: 'var(--border-width) solid var(--border-color)'
                      }}>
                        {p}
                      </span>
                    ))}
                  </div>
                  
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', fontWeight: '600', margin: 0, marginTop: 'auto' }}>
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HallOfFame;
