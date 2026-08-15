import React, { useState } from 'react';

const Newsletter = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    try {
      const formBody = new URLSearchParams({ email: email }).toString();
      
      const response = await fetch('https://app.loops.so/api/newsletter-form/cmpfndk7a027p0jvsdr9a4bud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody
      });
      
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const errorData = await response.text();
        setStatus('error');
        console.error('Subscription failed:', response.status, errorData);
      }
    } catch (error) {
      setStatus('error');
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ flex: '1 1 400px', maxWidth: '700px', display: 'flex', flexDirection: 'column' }}>
        <div className="window-panel animate-pop-in delay-1" style={{ 
          height: '100%', display: 'flex', flexDirection: 'column',
          backgroundColor: theme === 'windows' ? '#ffffff' : '#1a0f00',
          color: theme === 'windows' ? '#000000' : '#ffb000',
          borderColor: theme === 'unix' ? '#ffb000' : undefined
        }}>
          
          <div className="window-header" style={{
            backgroundColor: theme === 'windows' ? '#0000a8' : '#ffb000',
            color: theme === 'windows' ? '#ffffff' : '#1a0f00',
            borderBottomColor: theme === 'unix' ? '#ffb000' : undefined
          }}>
            <span>{theme === 'windows' ? 'NETWORK_CONFIG.SYS' : '/etc/resolv.conf'}</span>
            <div className="window-controls">
              <span className="window-btn"></span>
              <span className="window-btn"></span>
              <span className="window-btn"></span>
            </div>
          </div>

          <div className="window-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '28px 24px', flex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', textDecoration: 'underline' }}>JOIN THE NETWORK</h2>
            <p style={{ marginBottom: '32px', fontWeight: '600', fontSize: '1.2rem' }}>
              Get the latest issue delivered straight to your inbox every Thursday. No spam, just pure homage.
            </p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
              <input 
                type="email" 
                name="email"
                id="newsletter-email"
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
                className="btn btn-primary" 
                disabled={status === 'loading' || status === 'success'}
                style={{ width: '100%' }}
              >
                {status === 'loading' ? 'EXECUTING...' : (status === 'success' ? 'SUBSCRIBED' : (theme === 'windows' ? 'INITIATE.EXE' : './initiate.sh'))}
              </button>
              <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>
                // POWERED_BY: <a href="https://loops.so" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>LOOPS.SO</a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {status === 'success' && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', 
          alignItems: 'center', zIndex: 9999 
        }}>
          <div className="window-panel animate-pop-in" style={{ maxWidth: '450px', width: '90%', padding: '0', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <div className="window-header">
              <span>{theme === 'windows' ? 'SUCCESS.LOG' : 'cat success.log'}</span>
              <div className="window-controls">
                <span className="window-btn" onClick={() => setStatus('idle')} style={{ cursor: 'pointer', backgroundColor: '#ff5f56' }}></span>
              </div>
            </div>
            <div className="window-content" style={{ padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ marginBottom: '16px', fontSize: '1.8rem', color: 'var(--accent-color)' }}>
                VERIFICATION REQUIRED
              </h3>
              <p style={{ fontWeight: '600', marginBottom: '32px' }}>
                We've sent a secure link to your inbox. Please click it to verify your email and join the network.
              </p>
              <button className="btn btn-primary" onClick={() => setStatus('idle')} style={{ width: '100%' }}>
                {theme === 'windows' ? 'ACKNOWLEDGE.EXE' : './acknowledge.sh'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Newsletter;
