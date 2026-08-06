import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <section id="subscribe" style={{ paddingBottom: '60px' }}>
      <div className="container">
        <div className="window-panel animate-pop-in delay-1" style={{ maxWidth: '700px', margin: '0 auto' }}>
          
          <div className="window-header">
            <span>NETWORK_CONFIG.SYS</span>
            <div className="window-controls">
              <span className="window-btn"></span>
              <span className="window-btn"></span>
              <span className="window-btn"></span>
            </div>
          </div>

          <div className="window-content" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px', textDecoration: 'underline' }}>JOIN THE NETWORK</h2>
            <p style={{ marginBottom: '32px', fontWeight: '600' }}>
              Get the latest issue delivered straight to your inbox every Thursday. No spam, just pure homage.
            </p>
            
            {status === 'success' ? (
              <div className="highlight-box" style={{ padding: '20px', fontWeight: '800', textAlign: 'center' }}>
                &gt; CONNECTION ESTABLISHED. WELCOME.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' }}>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER_EMAIL_ADDRESS" 
                    className="input" 
                    required
                    disabled={status === 'loading'}
                    style={{ flex: '1 1 300px' }}
                  />
                  <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                    {status === 'loading' ? 'EXECUTING...' : 'INITIATE'}
                  </button>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>
                  // POWERED_BY: LOOPS.SO
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
