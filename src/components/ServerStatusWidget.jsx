import React, { useState, useEffect } from 'react';

const ServerStatusWidget = ({ theme }) => {
  const [ping, setPing] = useState(23);
  const [uptimeStr, setUptimeStr] = useState('');
  
  // Calculate fake uptime (from an arbitrary past date to now)
  // Or just a standard running counter
  useEffect(() => {
    // The date of the very first commit to this repository
    const startDate = new Date('2026-08-03T14:13:08Z').getTime();
    
    const updateUptime = () => {
      const now = new Date().getTime();
      const diff = now - startDate;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      
      setUptimeStr(`${days}d ${hours}h ${mins}m ${secs}s`);
    };

    updateUptime();
    const interval = setInterval(updateUptime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fluctuate ping every few seconds
  useEffect(() => {
    const pingInterval = setInterval(() => {
      // Fluctuate by -5 to +5 around 25ms
      const newPing = 20 + Math.floor(Math.random() * 10);
      setPing(newPing);
    }, 3500);
    return () => clearInterval(pingInterval);
  }, []);

  return (
    <div className="window-panel animate-pop-in delay-2" style={{ width: '100%', marginBottom: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="window-header">
        <span>{theme === 'windows' ? 'SYSMON.EXE' : 'top -d 1'}</span>
        <div className="window-controls">
          <span className="window-btn"></span>
          <span className="window-btn"></span>
          <span className="window-btn"></span>
        </div>
      </div>
      
      <div className="window-content" style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '16px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '4px' }}>
          <span style={{ fontWeight: 'bold' }}>SYSTEM:</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>TTT_OS v0.5.1</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '4px' }}>
          <span style={{ fontWeight: 'bold' }}>UPTIME:</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>{uptimeStr}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '4px' }}>
          <span style={{ fontWeight: 'bold' }}>MEMORY:</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>640K (OK)</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '4px' }}>
          <span style={{ fontWeight: 'bold' }}>NETWORK:</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>14.4k BAUD</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
          <span style={{ fontWeight: 'bold' }}>LAST PING:</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: ping > 25 ? (theme === 'windows' ? '#800000' : '#ffb000') : 'inherit' }}>
            {ping} ms
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServerStatusWidget;
