import React, { useEffect } from 'react';

const NotFound = ({ theme }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goHome = () => {
    window.location.href = '/';
  };

  if (theme === 'windows') {
    return (
      <div 
        onClick={goHome}
        style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#0000a8',
        color: '#ffffff',
        fontFamily: "'Courier New', Courier, monospace",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        textAlign: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        cursor: 'pointer'
      }}>
        <div style={{ maxWidth: '800px', textAlign: 'left' }}>
          <div style={{ 
            backgroundColor: '#aaaaaa', 
            color: '#0000a8', 
            display: 'inline-block',
            padding: '2px 8px',
            fontWeight: 'bold',
            marginBottom: '40px',
            fontSize: '1.2rem'
          }}>
            Windows
          </div>
          
          <p style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: '1.5' }}>
            A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +<br/>
            00010E36. The current route could not be found.
          </p>

          <p style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: '1.5' }}>
            * Press any key to terminate the current application.<br/>
            * Press CTRL+ALT+DEL again to restart your computer. You will<br/>
            &nbsp;&nbsp;lose any unsaved information in all applications.
          </p>

          <p style={{ fontSize: '1.2rem', textAlign: 'center', marginTop: '60px', cursor: 'pointer' }} onClick={goHome}>
            Press anywhere to continue <span className="blink">_</span>
          </p>
        </div>
      </div>
    );
  }

  // UNIX Kernel Panic
  return (
    <div 
      onClick={goHome}
      style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#000000',
      color: '#00ff00',
      fontFamily: "var(--font-mono)",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '40px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 99999,
      overflow: 'auto',
      cursor: 'pointer'
    }}>
      <div style={{ maxWidth: '800px', textAlign: 'left', lineHeight: '1.5' }}>
        <p>VFS: Cannot open root device "hda1" or unknown-block(0,0)</p>
        <p>Please append a correct "root=" boot option; here are the available partitions:</p>
        <p>Kernel panic - not syncing: VFS: Unable to mount root fs on unknown-block(0,0)</p>
        <br/>
        <p>[    1.123456] Call Trace:</p>
        <p>[    1.123478]  [{"<ffffffff81534567>"}] panic+0xc4/0x1d0</p>
        <p>[    1.123512]  [{"<ffffffff81823456>"}] mount_block_root+0x234/0x2c0</p>
        <p>[    1.123545]  [{"<ffffffff81823567>"}] prepare_namespace+0x134/0x170</p>
        <p>[    1.123578]  [{"<ffffffff81822345>"}] kernel_init_freeable+0x1f0/0x210</p>
        <br/>
        <p style={{ color: '#ff0000' }}>ERROR 404: DIRECTORY NOT FOUND.</p>
        <p>root@tty1:~# <span onClick={goHome} style={{ cursor: 'pointer', textDecoration: 'underline' }}>cd /</span><span className="blink">_</span></p>
      </div>
    </div>
  );
};

export default NotFound;
