import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
// Text and meta are shared with scripts/generate_static_pages.js, which pre-renders /privacy
import privacyText from '../content/privacy.md?raw';
import PRIVACY_META from '../content/privacy.json';
import { updatePageMeta } from '../utils/seo';

const markdownComponents = {
  h1: ({ node, ...props }) => <h1 style={{ fontSize: '2rem', marginBottom: '8px' }} {...props} />,
  h2: ({ node, ...props }) => <h2 style={{ fontSize: '1.3rem', marginTop: '32px', marginBottom: '12px', borderBottom: '2px dashed var(--border-color)', paddingBottom: '6px' }} {...props} />,
  p: ({ node, ...props }) => <p style={{ marginBottom: '12px' }} {...props} />,
  ul: ({ node, ...props }) => <ul style={{ paddingLeft: '20px', margin: '0 0 12px', display: 'flex', flexDirection: 'column', gap: '8px' }} {...props} />,
  a: ({ node, href, ...props }) => {
    const external = /^https?:/.test(href);
    return <a href={href} style={{ color: 'var(--text-color)', textDecoration: 'underline' }} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...props} />;
  }
};

const Privacy = ({ theme }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    updatePageMeta(PRIVACY_META);
    return () => updatePageMeta();
  }, []);

  return (
    <section id="privacy" style={{ padding: '0 0 20px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '20px' }}>
          <a href="/" className="btn">
            {theme === 'windows' ? '◄ BACK_TO_ROOT.EXE' : 'cd ..'}
          </a>
        </div>
        <div className="window-panel animate-pop-in">
          <div className="window-header">
            <span>{theme === 'windows' ? 'NOTEPAD.EXE - PRIVACY.TXT' : 'less privacy.txt'}</span>
            <div className="window-controls">
              <span className="window-btn"></span>
              <span className="window-btn"></span>
              <span className="window-btn"></span>
            </div>
          </div>
          <div className="window-content" style={{ textAlign: 'left', padding: 'clamp(20px, 5vw, 40px)' }}>
            <div className="markdown-body" style={{ fontFamily: 'var(--font-mono)', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
              <ReactMarkdown components={markdownComponents}>{privacyText}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
