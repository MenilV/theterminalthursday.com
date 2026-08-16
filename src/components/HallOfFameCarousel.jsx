import React, { useState, useEffect } from 'react';

const maintainers = [
  {
    name: 'Linus Torvalds',
    alias: 'torvalds',
    projects: [{ name: 'Linux', url: 'https://github.com/torvalds/linux' }, { name: 'Git', url: 'https://github.com/git/git' }],
    desc: 'Chief architect of the Linux kernel and creator of Git.',
    id: '001',
    img: 'https://github.com/torvalds.png',
    revealDate: '2020-01-01T00:00:00Z' // Always visible
  },
  {
    name: 'Daniel Stenberg',
    alias: 'bagder',
    projects: [{ name: 'cURL', url: 'https://github.com/curl/curl' }],
    desc: 'Maintains the client-side URL transfer library used in billions of devices.',
    id: '002',
    img: 'https://github.com/bagder.png',
    revealDate: '2020-01-01T00:00:00Z'
  },
  {
    name: 'Fabrice Bellard',
    alias: 'bellard',
    projects: [{ name: 'FFmpeg', url: 'https://github.com/FFmpeg/FFmpeg' }, { name: 'QEMU', url: 'https://github.com/qemu/qemu' }],
    desc: 'Prolific programmer responsible for modern media processing and hardware virtualization.',
    id: '003',
    img: '/bellard.png',
    revealDate: '2020-01-01T00:00:00Z'
  },
  {
    name: 'Evan You',
    alias: 'yyx990803',
    projects: [{ name: 'Vue.js', url: 'https://github.com/vuejs/vue' }, { name: 'Vite', url: 'https://github.com/vitejs/vite' }],
    desc: 'Redefined frontend developer experience with unopinionated web tooling.',
    id: '004',
    img: 'https://github.com/yyx990803.png',
    revealDate: '2020-01-01T00:00:00Z'
  },
  {
    name: 'Guido van Rossum',
    alias: 'gvanrossum',
    projects: [{ name: 'Python', url: 'https://github.com/python/cpython' }],
    desc: 'Creator of the Python programming language and its benevolent dictator for life.',
    id: '005',
    img: 'https://github.com/gvanrossum.png',
    revealDate: '2026-08-14T00:00:00Z' // Unlocks Aug 14
  },
  {
    name: 'Ryan Dahl',
    alias: 'ry',
    projects: [{ name: 'Node.js', url: 'https://github.com/nodejs/node' }, { name: 'Deno', url: 'https://github.com/denoland/deno' }],
    desc: 'Brought JavaScript to the server, fundamentally changing full-stack engineering.',
    id: '006',
    img: 'https://github.com/ry.png',
    revealDate: '2026-08-15T00:00:00Z' // Unlocks Aug 15
  },
  {
    name: 'TJ Holowaychuk',
    alias: 'tj',
    projects: [{ name: 'Express', url: 'https://github.com/expressjs/express' }, { name: 'Koa', url: 'https://github.com/koajs/koa' }],
    desc: 'Extremely prolific builder behind early Node.js web frameworks and CLI utilities.',
    id: '007',
    img: 'https://github.com/tj.png',
    revealDate: '2026-08-16T00:00:00Z' // Unlocks Aug 16
  },
  {
    name: 'Sindre Sorhus',
    alias: 'sindresorhus',
    projects: [{ name: 'chalk', url: 'https://github.com/chalk/chalk' }, { name: 'execa', url: 'https://github.com/sindresorhus/execa' }],
    desc: 'Full-time open-source maintainer with thousands of ubiquitous npm modules.',
    id: '008',
    img: 'https://github.com/sindresorhus.png',
    revealDate: '2026-08-17T00:00:00Z' // Unlocks Aug 17
  },
  {
    name: 'Rich Harris',
    alias: 'Rich-Harris',
    projects: [{ name: 'Svelte', url: 'https://github.com/sveltejs/svelte' }, { name: 'Rollup', url: 'https://github.com/rollup/rollup' }],
    desc: 'Architect of compiler-first reactive UI and JavaScript module bundling.',
    id: '009',
    img: 'https://github.com/Rich-Harris.png',
    revealDate: '2026-08-18T00:00:00Z' // Unlocks Aug 18
  },
  {
    name: 'Guillermo Rauch',
    alias: 'rauchg',
    projects: [{ name: 'Socket.io', url: 'https://github.com/socketio/socket.io' }, { name: 'Next.js', url: 'https://github.com/vercel/next.js' }],
    desc: 'Pioneered real-time web communications and modern serverless frontend architecture.',
    id: '010',
    img: 'https://github.com/rauchg.png',
    revealDate: '2026-08-19T00:00:00Z' // Unlocks Aug 19
  },
  {
    name: 'Brendan Eich',
    alias: 'BrendanEich',
    projects: [{ name: 'JavaScript', url: 'https://github.com/tc39/ecma262' }, { name: 'Brave', url: 'https://github.com/brave/brave-browser' }],
    desc: 'Created JavaScript in 10 days at Netscape, laying the programming language foundation for the web.',
    id: '011',
    img: 'https://github.com/BrendanEich.png',
    revealDate: '2026-08-20T00:00:00Z' // Unlocks Aug 20 (Launch Day!)
  },
  {
    name: 'David Heinemeier Hansson',
    alias: 'dhh',
    projects: [{ name: 'Ruby on Rails', url: 'https://github.com/rails/rails' }],
    desc: 'Creator of Ruby on Rails, establishing the paradigm for modern MVC web frameworks.',
    id: '012',
    img: 'https://github.com/dhh.png',
    revealDate: '2026-08-21T00:00:00Z' // Unlocks Aug 21
  }
];

const HallOfFameCarousel = ({ theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Filter maintainers based on the current date compared to their revealDate
  const visibleMaintainers = maintainers.filter(m => new Date() >= new Date(m.revealDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % visibleMaintainers.length);
    }, 20000); // 20 seconds autoplay
    return () => clearInterval(timer);
  }, [visibleMaintainers.length]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + visibleMaintainers.length) % visibleMaintainers.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % visibleMaintainers.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 40) {
      handleNext();
    } else if (distance < -40) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Safe fallback if currentIndex goes out of bounds when list updates
  const m = visibleMaintainers[currentIndex] || visibleMaintainers[0];

  return (
    <div style={{ flex: '1 1 350px', maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>
      <div className="window-panel animate-pop-in delay-2" style={{ 
        height: '100%', display: 'flex', flexDirection: 'column',
        backgroundColor: theme === 'windows' ? '#ffffe1' : '#300a24'
      }}>
        <div className="window-header" style={{
          backgroundColor: theme === 'windows' ? '#808080' : undefined,
          color: theme === 'windows' ? '#d4d0c8' : undefined
        }}>
          <span>{theme === 'windows' ? 'SYSADMIN_DB.EXE' : 'cat /etc/sudoers'}</span>
          <div className="window-controls">
            <span className="window-btn"></span>
            <span className="window-btn"></span>
            <span className="window-btn"></span>
          </div>
        </div>
        
        <div className="window-content" style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="highlight-box" style={{ padding: '4px 8px', marginBottom: '20px', fontWeight: 'bold', display: 'inline-block', alignSelf: 'flex-start' }}>
            MOST_WANTED (<span style={{ fontFamily: "'JetBrains Mono', 'Courier New', Courier, monospace", fontVariantNumeric: 'normal' }}>{visibleMaintainers.length}</span>/<span style={{ fontFamily: "'JetBrains Mono', 'Courier New', Courier, monospace", fontVariantNumeric: 'normal' }}>{maintainers.length}</span> UNLOCKED)
          </div>
          
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              border: 'var(--border-width) var(--border-style) var(--border-color)', 
              background: 'var(--input-bg)', 
              color: 'var(--text-color)',
              padding: '20px',
              boxShadow: 'var(--shadow-hover) var(--shadow-hover) 0 var(--shadow-color)',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              touchAction: 'pan-y'
            }}
          >
            <div style={{ display: 'flex', width: '100%', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', border: 'var(--border-width) var(--border-style) var(--border-color)', flexShrink: 0, backgroundColor: 'var(--panel-bg)' }}>
                <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                     onError={(e) => { e.target.src = 'https://github.com/ghost.png'; }} />
              </div>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', opacity: 0.8 }}>ID NO: {m.id}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{m.name}</span>
                </div>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 'bold' }}>@{m.alias}</span>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', opacity: 0.8 }}>Key Projects:</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                  {m.projects.map(p => (
                    <a key={p.name} href={p.url} target="_blank" rel="noreferrer" style={{ 
                      background: 'var(--accent-bg)', 
                      color: 'var(--accent-text)', 
                      padding: '4px 8px', 
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      border: 'var(--border-width) var(--border-style) var(--border-color)',
                      textDecoration: 'none'
                    }}>
                      {p.name}
                    </a>
                  ))}
                </div>
              </div>
              
              <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', opacity: 0.8 }}>Remarks:</span>
                <p style={{ 
                  fontSize: '0.95rem', 
                  fontWeight: '600', 
                  lineHeight: '1.4', 
                  margin: '4px 0 0 0',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minHeight: '2.8em'
                }}>
                  {m.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Dot Indicators + Carets */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={handlePrev} 
              aria-label="Previous"
              className="btn" 
              style={{ padding: '2px 10px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ◄
            </button>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              {visibleMaintainers.map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setCurrentIndex(i)} 
                  className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext} 
              aria-label="Next"
              className="btn" 
              style={{ padding: '2px 10px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ►
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallOfFameCarousel;
