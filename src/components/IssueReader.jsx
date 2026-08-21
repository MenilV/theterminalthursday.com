import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const IssueReader = ({ theme, issueId, onBack }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    setLoading(true);
    fetch(`/archive/${issueId}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Issue not found');
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        setContent('# ERROR: 404\n\nThe requested archive file could not be found or has been corrupted.');
        setLoading(false);
      });
  }, [issueId]);

  return (
    <section id="issue-reader" style={{ height: '100%', padding: 0 }}>
      <div className="container">
        
        <div style={{ marginBottom: '20px' }}>
          <button onClick={onBack} className="btn">
            {theme === 'windows' ? '◄ BACK_TO_ROOT.EXE' : 'cd ..'}
          </button>
        </div>

        <div className="window-panel animate-pop-in">
          <div className="window-header">
            <span>{theme === 'windows' ? `NOTEPAD.EXE - ${issueId}.MD` : `vi ./archive/${issueId}.md`}</span>
            <div className="window-controls">
              <span className="window-btn" onClick={onBack} style={{ cursor: 'pointer', backgroundColor: '#ff5f56' }}></span>
              <span className="window-btn"></span>
              <span className="window-btn"></span>
            </div>
          </div>

          <div className="window-content hero-content" style={{ textAlign: 'left', padding: '40px' }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                LOADING DATA FROM TAPE DRIVE...
              </div>
            ) : (
              <div className="markdown-body" style={{ 
                fontFamily: 'var(--font-mono)', 
                lineHeight: '1.6',
                maxWidth: '800px',
                margin: '0 auto',
              }}>
                <ReactMarkdown
                  components={{
                    img: ({node, ...props}) => (
                      <img style={{ maxWidth: '100%', height: 'auto', border: '2px solid var(--border-color)', margin: '20px 0' }} {...props} />
                    ),
                    h1: ({node, ...props}) => <h1 style={{ fontSize: '2rem', marginBottom: '20px', borderBottom: '2px dashed var(--border-color)', paddingBottom: '10px' }} {...props} />,
                    h2: ({node, ...props}) => <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '15px' }} {...props} />,
                    h3: ({node, ...props}) => <h3 style={{ fontSize: '1.2rem', marginTop: '30px', marginBottom: '10px' }} {...props} />,
                    a: ({node, ...props}) => <a style={{ color: 'var(--text-color)', textDecoration: 'underline' }} target="_blank" rel="noreferrer" {...props} />
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IssueReader;
