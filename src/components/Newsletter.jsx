import React, { useState } from 'react';

const Newsletter = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
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
    <section id="subscribe" style={{ paddingBottom: '60px' }}>
      <div className="container" style={{ maxWidth: '90%' }}>
        <div className="window-panel animate-pop-in delay-1">
          
          <div className="window-header">
            <span>{theme === 'windows' ? 'NETWORK_CONFIG.SYS' : '/etc/resolv.conf'}</span>
            <div className="window-controls">
              <span className="window-btn"></span>
              <span className="window-btn"></span>
              <span className="window-btn"></span>
            </div>
          </div>

          <div className="window-content" style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center', justifyContent: 'center', padding: '60px 8vw' }}>
            
            <div style={{ display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
              {/* Windows 95 'My Computer' Icon */}
              <svg className="win-icon" viewBox="0 0 64 64" width="100%" height="100%" style={{ maxWidth: '180px' }} xmlns="http://www.w3.org/2000/svg">
                {/* Desktop Case (horizontal) */}
                <rect x="4" y="46" width="56" height="14" fill="var(--panel-bg)" stroke="var(--border-color)" strokeWidth="2"/>
                <rect x="10" y="50" width="16" height="4" fill="var(--border-color)"/> {/* floppy drive */}
                <rect x="46" y="52" width="4" height="2" fill="var(--border-color)"/> {/* button */}
                {/* Monitor */}
                <rect x="14" y="6" width="36" height="32" fill="var(--panel-bg)" stroke="var(--border-color)" strokeWidth="2"/>
                <rect x="18" y="10" width="28" height="24" fill="#008080" stroke="var(--border-color)" strokeWidth="2"/>
                <rect x="22" y="14" width="4" height="4" fill="#ffffff"/> {/* glare */}
                {/* Stand */}
                <rect x="28" y="38" width="8" height="8" fill="var(--panel-bg)" stroke="var(--border-color)" strokeWidth="2"/>
              </svg>

              {/* Unix Terminal Icon */}
              <svg className="unix-icon" viewBox="0 0 64 64" width="100%" height="100%" style={{ maxWidth: '180px' }} xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="56" height="48" fill="#000000" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="4,2"/>
                <text x="10" y="24" fontFamily="monospace" fontSize="10" fill="var(--border-color)" fontWeight="bold">root@ttt:~#</text>
                <text x="10" y="38" fontFamily="monospace" fontSize="10" fill="var(--border-color)" fontWeight="bold">./init</text>
                <rect x="46" y="30" width="6" height="10" fill="var(--border-color)">
                  <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
                </rect>
              </svg>
            </div>

            <div style={{ flex: '1 1 400px', maxWidth: '700px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', textDecoration: 'underline' }}>JOIN THE NETWORK</h2>
              <p style={{ marginBottom: '32px', fontWeight: '600', fontSize: '1.2rem' }}>
                Get the latest issue delivered straight to your inbox every Thursday. No spam, just pure homage.
              </p>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' }}>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER_EMAIL_ADDRESS" 
                    className="input" 
                    required
                    disabled={status === 'loading' || status === 'success'}
                    style={{ flex: '1 1 300px' }}
                  />
                  <button type="submit" className="btn btn-primary" disabled={status === 'loading' || status === 'success'}>
                    {status === 'loading' ? 'EXECUTING...' : (status === 'success' ? 'SUBSCRIBED' : (theme === 'windows' ? 'INITIATE.EXE' : './initiate.sh'))}
                  </button>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>
                  // POWERED_BY: LOOPS.SO
                </div>
              </form>
            </div>
            
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
                CONNECTION ESTABLISHED
              </h3>
              <p style={{ fontWeight: '600', marginBottom: '32px' }}>
                Welcome to the network. You will receive the next issue of The Terminal Thursday directly in your inbox.
              </p>
              <button className="btn btn-primary" onClick={() => setStatus('idle')} style={{ width: '100%' }}>
                {theme === 'windows' ? 'ACKNOWLEDGE.EXE' : './acknowledge.sh'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Newsletter;
