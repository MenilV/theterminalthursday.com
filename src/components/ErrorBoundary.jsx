import React from 'react';
import { setTag, trackEvent } from '../utils/analytics';

// Catches render errors anywhere in the app so a single broken component
// shows a recovery screen instead of blanking the whole page.
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Flag the session in Clarity so crashes can be found and replayed
  componentDidCatch(error) {
    setTag('crash', String(error?.message || error).slice(0, 120));
    trackEvent('render_crash');
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div role="alert" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div className="window-panel" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="window-header">
            <span>FATAL_EXCEPTION.LOG</span>
          </div>
          <div className="window-content" style={{ padding: '30px', fontFamily: 'var(--font-mono)' }}>
            <h2 style={{ marginBottom: '16px' }}>SYSTEM HALTED</h2>
            <p style={{ marginBottom: '24px' }}>
              Something on this page crashed. Rebooting usually fixes it.
            </p>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                REBOOT.EXE
              </button>
              <a href="/" className="btn">
                ◄ BACK_TO_ROOT.EXE
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
