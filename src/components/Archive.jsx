import React, { useState } from 'react';
import ARCHIVE_POSTS from '../data/posts.json';
import SEARCH_INDEX from '../data/search_index.json';

const Archive = ({ theme }) => {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = searchQuery 
    ? SEARCH_INDEX.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.includes(searchQuery.toLowerCase())
      )
    : ARCHIVE_POSTS;

  const displayPosts = (searchQuery || showAll) ? filteredPosts : filteredPosts.slice(0, 3);

  return (
    <section id="archive" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '90%' }}>
        
        <div className="window-panel animate-pop-in delay-2" style={{ backgroundColor: theme === 'windows' ? '#ffffe1' : '#002200' }}>
          
          <div className="window-header">
            <span>{theme === 'windows' ? 'FILE_EXPLORER.EXE - C:\\TTT\\ARCHIVE' : '~/ttt $ ls -la ./archive'}</span>
            <div className="window-controls">
              <span className="window-btn"></span>
              <span className="window-btn"></span>
              <span className="window-btn"></span>
            </div>
          </div>

          <div className="window-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: 'var(--border-width) var(--border-style) var(--border-color)', paddingBottom: '16px', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>
                PREVIOUS_SERIALS
              </h2>
              
              <div style={{ display: 'flex', alignItems: 'center', flex: '1 1 300px', maxWidth: '500px' }}>
                <span style={{ marginRight: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  {theme === 'windows' ? 'FIND_FILE.EXE >' : '~/ttt $ grep -i'}
                </span>
                <input 
                  type="text" 
                  placeholder={theme === 'windows' ? "Search tools, issues..." : '"search..." ./archive'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: 'var(--border-width) var(--border-style) var(--border-color)',
                    backgroundColor: 'var(--input-bg)',
                    color: 'var(--text-color)',
                    fontFamily: 'var(--font-mono)',
                    outline: 'none',
                    boxShadow: theme === 'windows' ? 'inset 2px 2px 0px rgba(0,0,0,0.2)' : 'none',
                    minWidth: 0
                  }}
                />
              </div>
            </div>

            {displayPosts.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', fontWeight: 'bold' }}>
                {theme === 'windows' ? 'NO MATCHING FILES FOUND IN DIRECTORY.' : 'grep: no match found'}
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '24px' }}>
                {displayPosts.map((post) => (
                  <article 
                    key={post.id} 
                    className="highlight-box"
                    style={{ 
                      backgroundColor: theme === 'windows' ? 'var(--panel-bg)' : '#000000',
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
            )}

            {!searchQuery && !showAll && ARCHIVE_POSTS.length > 3 && (
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
