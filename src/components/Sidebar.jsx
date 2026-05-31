import React, { useState } from 'react';

export default function Sidebar({ 
  modules, 
  activeModuleId, 
  onSelectModule, 
  progress, 
  currentView, 
  setCurrentView,
  isSidebarOpen,
  setIsSidebarOpen,
  theme,
  toggleTheme
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModules = modules.filter(m => {
    if (!searchQuery) return true;
    return (
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getStatusBadgeClass = (status) => {
    if (status === 'mastered') return 'badge-mastered';
    if (status === 'reading') return 'badge-reading';
    return 'badge-unread';
  };

  const masteredCount = Object.values(progress).filter(p => p === 'mastered').length;

  return (
    <>
      {/* Mobile Sidebar Toggle Overlay */}
      <div 
        className={`mobile-nav-header ${isSidebarOpen ? 'active' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          zIndex: 1000,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.25rem' }}>🎓</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>AIF-C01 Portal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '1.2rem',
              cursor: 'pointer'
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: '0.4rem 0.8rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {isSidebarOpen ? '✕ Close' : '☰ Menu'}
        </button>
      </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mobile-nav-header {
            display: flex !important;
          }
          .sidebar-container {
            transform: translateX(-100%);
            z-index: 999;
            top: 60px !important;
            height: calc(100vh - 60px) !important;
          }
          .sidebar-container.open {
            transform: translateX(0);
          }
        }
        
        /* Premium Sidebar UI Styling */
        .sidebar-topic-item {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 1px solid var(--bg-hover);
        }
        .sidebar-topic-item:hover {
          background: var(--bg-callout) !important;
          padding-left: 1.75rem !important;
        }
        .sidebar-nav-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sidebar-nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <div 
        className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}
        style={{
          width: '320px',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Brand Header */}
        <div style={{ padding: '2rem 1.5rem 1.5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div 
              onClick={() => { setCurrentView('dashboard'); setIsSidebarOpen(false); }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '2rem' }}>🎓</span>
              <div>
                <h1 style={{ fontSize: '1.25rem', margin: 0, background: 'none', WebkitTextFillColor: 'initial', color: 'var(--text-primary)' }}>AIF-C01 Guide</h1>
                <p style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>AWS AI Practitioner</p>
              </div>
            </div>
            <button 
              onClick={toggleTheme}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '0.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                transition: 'all 0.2s ease'
              }}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
          
          {/* Progress Tracker Strip */}
          <div style={{ background: 'var(--bg-primary)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Mastered Modules</span>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{masteredCount} / {modules.length}</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${(masteredCount / modules.length) * 100}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-emerald))',
                  transition: 'width 0.4s ease'
                }} 
              />
            </div>
          </div>
        </div>

        {/* Global Navigation Shortcut Buttons */}
        <div style={{ padding: '1rem 1.5rem', display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => { setCurrentView('dashboard'); setIsSidebarOpen(false); }}
            className="sidebar-nav-btn"
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              border: currentView === 'dashboard' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
              background: currentView === 'dashboard' ? 'var(--accent-cyan-glow)' : 'transparent',
              color: currentView === 'dashboard' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem'
            }}
          >
            <span>📊</span>
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => { setCurrentView('quiz'); setIsSidebarOpen(false); }}
            className="sidebar-nav-btn"
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              border: currentView === 'quiz' ? '1px solid var(--accent-violet)' : '1px solid var(--border-color)',
              background: currentView === 'quiz' ? 'var(--accent-violet-glow)' : 'transparent',
              color: currentView === 'quiz' ? 'var(--accent-violet)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem'
            }}
          >
            <span>📝</span>
            <span>Practice Exam</span>
          </button>
        </div>

        {/* Search input */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search concepts & gotchas..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.5rem 2rem 0.5rem 0.75rem',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Study Blueprint Header */}
        <div style={{ padding: '1.25rem 1.5rem 0.5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <span style={{ 
            fontSize: '0.65rem', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            color: 'var(--text-muted)', 
            letterSpacing: '0.12em' 
          }}>
            Study blueprint modules
          </span>
        </div>

        {/* Nav list of sequential flat modules */}
        <div style={{ flex: 1, padding: '0.25rem 0 2rem 0' }}>
          {filteredModules.map((m) => {
            const isActive = currentView === 'study' && activeModuleId === m.id;
            const status = progress[m.id] || 'unread';

            return (
              <div 
                key={m.id}
                onClick={() => {
                  onSelectModule(m.id);
                  setIsSidebarOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 1.5rem',
                  background: isActive ? 'var(--bg-tertiary)' : 'transparent',
                  borderLeft: `3px solid ${isActive ? 'var(--accent-cyan)' : 'transparent'}`,
                  cursor: 'pointer',
                }}
                className="sidebar-topic-item"
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', maxWidth: '80%' }}>
                  <span 
                    style={{ 
                      fontSize: '0.82rem', 
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {m.id.toString().padStart(2, '0')}. {m.title}
                  </span>
                </div>
                <span className={`badge ${getStatusBadgeClass(status)}`} style={{ fontSize: '0.55rem', padding: '0.1rem 0.35rem', scale: '0.9' }}>
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
