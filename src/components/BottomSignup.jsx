import React, { useState } from 'react';

const BottomSignup = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    try {
      const formBody = new URLSearchParams({ email }).toString();
      const response = await fetch('https://app.loops.so/api/newsletter-form/cmpfndk7a027p0jvsdr9a4bud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody
      });
      
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="window-panel animate-pop-in hide-on-desktop" style={{ width: '100%', marginBottom: 0 }}>
      <div className="window-header">
        <span>{theme === 'windows' ? 'QUICK_SUBSCRIBE.EXE' : 'cat >> /etc/subscribers'}</span>
        <div className="window-controls">
          <span className="window-btn"></span>
          <span className="window-btn"></span>
          <span className="window-btn"></span>
        </div>
      </div>

      <div className="window-content" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '500px', alignItems: 'center' }}>
          <input 
            type="email" 
            name="email"
            id="bottom-newsletter-email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            translate="no"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER_EMAIL_ADDRESS" 
            className="input notranslate" 
            required
            disabled={status === 'loading' || status === 'success'}
            style={{ width: '100%', textAlign: 'center' }}
          />
          <button 
            type="submit" 
            className="btn btn-primary mobile-full-width-btn" 
            disabled={status === 'loading' || status === 'success'}
            style={{ minWidth: '180px' }}
          >
            {status === 'loading' ? 'EXECUTING...' : (status === 'success' ? 'SUBSCRIBED' : (theme === 'windows' ? 'INITIATE.EXE' : './initiate.sh'))}
          </button>
        </form>

        {status === 'success' && (
          <div style={{ marginTop: '16px', fontWeight: 'bold', color: theme === 'unix' ? '#33ff33' : '#008000', fontSize: '0.9rem', textAlign: 'center' }}>
            ► SUCCESS: SUBSCRIBED TO THE TERMINAL THURSDAY.
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomSignup;
