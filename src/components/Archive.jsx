import React, { useState } from 'react';
import ARCHIVE_POSTS from '../data/posts.json';

const Archive = ({ theme }) => {
  const [showAll, setShowAll] = useState(false);
  const displayPosts = showAll ? ARCHIVE_POSTS : ARCHIVE_POSTS.slice(0, 3);

  return (
    <section id="archive" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '90%' }}>
        
        <div className="window-panel animate-pop-in delay-2" style={{ backgroundColor: 'var(--input-bg)' }}>
          
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
              {displayPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="highlight-box"
                  style={{ 
                    backgroundColor: 'var(--panel-bg)',
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
                    <a href={`#archive/${post.id}`} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.9rem' }}>
                      {theme === 'windows' ? 'READ.EXE' : './read.sh'}
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {!showAll && ARCHIVE_POSTS.length > 3 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                <button onClick={() => setShowAll(true)} className="btn">
                  {theme === 'windows' ? 'LOAD_MORE.BAT' : './load_more.sh'}
                </button>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default Archive;
