import React from 'react';

// One line under each signup form, linking to the /privacy page
const PrivacyNote = ({ theme, style }) => (
  <p style={{ fontSize: '0.8rem', fontWeight: '600', opacity: 0.85, margin: 0, ...style }}>
    We only use your email to send the newsletter.{' '}
    <a href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>
      {theme === 'windows' ? 'PRIVACY.TXT' : 'privacy.txt'}
    </a>
  </p>
);

export default PrivacyNote;
