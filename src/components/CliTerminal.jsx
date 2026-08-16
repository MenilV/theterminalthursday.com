import React, { useState, useRef, useEffect } from 'react';

const CliTerminal = ({ theme }) => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'TERMINAL THURSDAY OS v1.0.0' },
    { type: 'output', text: 'Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when history changes without scrolling the main window
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Echo input
    setHistory(prev => [...prev, { type: 'input', text: `> ${trimmed}` }]);
    
    const args = trimmed.split(' ').filter(Boolean);
    const command = args[0].toLowerCase();

    const addOutput = (text, type = 'output') => {
      setHistory(prev => [...prev, { type, text }]);
    };

    switch (command) {
      case 'help':
        addOutput('Available commands:');
        addOutput('  about       - Learn about The Terminal Thursday');
        addOutput('  subscribe   - Subscribe to the newsletter (usage: subscribe [email])');
        addOutput('  ping        - Ping the server');
        addOutput('  whoami      - Display current user');
        addOutput('  sudo        - Execute a command as superuser');
        addOutput('  clear       - Clear the terminal output');
        break;
      
      case 'about':
        addOutput('The Terminal Thursday is a weekly homage to open-source legends and retro aesthetics.');
        break;

      case 'ping':
        addOutput('PONG. Latency: 23ms.');
        break;

      case 'whoami':
        addOutput('guest_user_99');
        break;

      case 'sudo':
        addOutput('Permission denied. This incident will be reported.', 'error');
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'subscribe':
        if (args.length < 2) {
          addOutput('Error: Missing email address. Usage: subscribe [email]', 'error');
        } else {
          const email = args[1];
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            addOutput('Error: Invalid email format.', 'error');
            break;
          }
          
          setIsProcessing(true);
          addOutput(`Initiating subscription protocol for ${email}...`);
          
          try {
            const formBody = new URLSearchParams({ email }).toString();
            const response = await fetch('https://app.loops.so/api/newsletter-form/cmpfndk7a027p0jvsdr9a4bud', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: formBody
            });
            
            if (response.ok) {
              addOutput('SUCCESS: Subscription confirmed. Welcome to the network.', 'success');
            } else {
              addOutput('ERROR: Subscription failed. The mainframe rejected the request.', 'error');
            }
          } catch (error) {
            addOutput('ERROR: Network failure.', 'error');
          }
          setIsProcessing(false);
        }
        break;

      default:
        addOutput(`Command not found: ${command}. Type "help" for available commands.`, 'error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isProcessing) return;
    handleCommand(input);
    setInput('');
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Determine specific colors to ensure it always looks like a terminal, regardless of global theme
  const termBg = '#050505';
  const termText = theme === 'windows' ? '#c0c0c0' : '#33ff33';
  const errorText = '#ff5f56';
  const successText = '#27c93f';

  return (
    <div className="window-panel animate-pop-in delay-3" style={{ width: '100%', marginBottom: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div className="window-header" style={{ backgroundColor: theme === 'windows' ? '#0000a8' : '#000000', color: theme === 'windows' ? '#ffffff' : '#33ff33', borderBottomColor: theme === 'unix' ? '#33ff33' : undefined }}>
        <span>{theme === 'windows' ? 'C:\\WINDOWS\\SYSTEM32\\CMD.EXE' : 'guest@ttt: ~'}</span>
        <div className="window-controls">
          <span className="window-btn"></span>
          <span className="window-btn"></span>
          <span className="window-btn"></span>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="window-content" 
        onClick={focusInput}
        style={{ 
          backgroundColor: termBg, 
          color: termText, 
          padding: '16px', 
          height: '250px', 
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          cursor: 'text',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ flex: 1 }}>
          {history.map((line, i) => (
            <div 
              key={i} 
              style={{ 
                marginBottom: '4px',
                color: line.type === 'error' ? errorText : (line.type === 'success' ? successText : termText),
                lineHeight: '1.4',
                wordBreak: 'break-all'
              }}
            >
              {line.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '8px' }}>
          <span style={{ marginRight: '8px', color: termText }}>{'>'}</span>
          <input 
            ref={inputRef}
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            autoComplete="off"
            spellCheck="false"
            autoFocus
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: termText,
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              flex: 1,
              outline: 'none',
              padding: 0
            }} 
          />
        </form>
      </div>
    </div>
  );
};

export default CliTerminal;
