import React from 'react';

const ARCHIVE_POSTS = [
  { id: '003', date: '08-01-2026', title: 'THE_MAGIC_OF_SQLITE', description: 'Why the most deployed database engine in the world is a masterclass in C programming.', category: 'DB' },
  { id: '002', date: '07-25-2026', title: 'TAILSCALE_ZERO_CONFIG', description: 'How Tailscale uses WireGuard to make complex networking disappear completely.', category: 'NET' },
  { id: '001', date: '07-18-2026', title: 'CURL_INTERNET_BACKBONE', description: 'A deep dive into Daniel Stenberg\'s ubiquitous tool that powers the modern web.', category: 'CLI' }
];

const Archive = ({ theme }) => {
  return (
    <section id="archive">
      <div className="container">
        
        <div className="window-panel animate-pop-in delay-2">
          
          <div className="window-header">
            <span>{theme === 'windows' ? 'FILE_EXPLORER.EXE - C:\\TTT\\ARCHIVE' : '~/ttt $ ls -la ./archive'}</span>
            <div className="window-controls">
              <span className="window-btn"></span>
              <span className="window-btn"></span>
              <span className="window-btn"></span>
            </div>
          </div>

          <div className="window-content">
            <h2 style={{ fontSize: '2rem', marginBottom: '32px', paddingBottom: '16px', borderBottom: 'var(--border-width) var(--border-style) var(--border-color)' }}>
              PREVIOUS_SERIALS
            </h2>

            <div style={{ display: 'grid', gap: '24px' }}>
              {ARCHIVE_POSTS.map((post) => (
                <article 
                  key={post.id} 
                  className="highlight-box"
                  style={{ 
                    padding: '24px', 
                    boxShadow: 'var(--shadow-size) var(--shadow-size) 0px var(--shadow-color)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px dashed var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
                    <span style={{ fontWeight: '700' }}>VOL_{post.id}</span>
                    <span style={{ fontWeight: '600' }}>{post.date}</span>
                  </div>
                  
                  <h3 className="accent-box" style={{ fontSize: '1.5rem', marginBottom: '12px', display: 'inline-block', padding: '4px 8px' }}>
                    {post.title}
                  </h3>
                  
                  <p style={{ fontWeight: '600', marginBottom: '24px' }}>
                    {post.description}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ border: '2px solid var(--border-color)', padding: '2px 8px', fontWeight: '700' }}>
                      TYPE: {post.category}
                    </span>
                    <a href={`/archive/${post.id}`} className="btn" style={{ padding: '6px 16px', fontSize: '0.9rem' }}>
                      {theme === 'windows' ? 'READ.EXE' : './read.sh'}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Archive;
