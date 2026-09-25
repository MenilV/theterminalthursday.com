import React, { useState } from 'react';

const InlineSubscribe = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    try {
      const formBody = new URLSearchParams({ email: email, source: 'inline_reader' }).toString();
      
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
    <div className="highlight-box" style={{ 
      margin: '40px 0', 
      padding: '24px', 
      backgroundColor: theme === 'windows' ? 'var(--panel-bg)' : '#1a0f00',
      color: theme === 'windows' ? 'var(--text-color)' : '#ffb000',
      border: `2px dashed ${theme === 'unix' ? '#ffb000' : 'var(--border-color)'}`,
      boxShadow: 'var(--shadow-size) var(--shadow-size) 0px var(--shadow-color)',
      position: 'relative'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '1.4rem', textDecoration: 'underline' }}>
        ENJOYING THE TERMINAL?
      </h3>
      <p style={{ fontWeight: '600', marginBottom: '20px' }}>
        Get the next issue dispatched directly to your inbox every Thursday.
      </p>
      
      {status === 'success' ? (
        <div style={{ padding: '16px', backgroundColor: theme === 'windows' ? '#0000a8' : '#ffb000', color: theme === 'windows' ? '#fff' : '#000', textAlign: 'center', fontWeight: 'bold' }}>
          VERIFICATION SENT TO INBOX.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER_EMAIL" 
            required
            disabled={status === 'loading'}
            style={{ 
              flex: '1 1 200px', 
              padding: '8px 12px', 
              border: '2px solid',
              borderColor: theme === 'unix' ? '#ffb000' : 'var(--border-color)',
              background: theme === 'unix' ? '#000' : '#fff',
              color: theme === 'unix' ? '#ffb000' : '#000',
              fontFamily: 'var(--font-mono)',
              outline: 'none'
            }}
          />
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={status === 'loading'}
            style={{ flex: '0 1 auto', whiteSpace: 'nowrap' }}
          >
            {status === 'loading' ? 'EXECUTING...' : (theme === 'windows' ? 'SUBSCRIBE.EXE' : './subscribe.sh')}
          </button>
        </form>
      )}
    </div>
  );
};

export default InlineSubscribe;
