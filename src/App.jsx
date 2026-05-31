import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudyReader from './components/StudyReader';
import Quiz from './components/Quiz';
import { modules } from './data/topicsData';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'study', 'quiz'
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [progress, setProgress] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('aif_theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('aif_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('aif_study_progress');
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      } else {
        // Initialize empty progress for all modules
        const initial = {};
        modules.forEach(m => {
          initial[m.id] = 'unread';
        });
        setProgress(initial);
      }
    } catch (e) {
      console.error("Failed to load progress from local storage", e);
    }
  }, []);

  const handleToggleProgress = (moduleId, status) => {
    const updated = { ...progress, [moduleId]: status };
    setProgress(updated);
    try {
      localStorage.setItem('aif_study_progress', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save progress to local storage", e);
    }
  };

  const handleSelectModule = (moduleId) => {
    setActiveModuleId(moduleId);
    setCurrentView('study');
  };

  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];

  const handleNextModule = () => {
    if (activeModuleId < modules.length) {
      setActiveModuleId(activeModuleId + 1);
    }
  };

  const handlePrevModule = () => {
    if (activeModuleId > 1) {
      setActiveModuleId(activeModuleId - 1);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        modules={modules}
        activeModuleId={activeModuleId}
        onSelectModule={handleSelectModule}
        progress={progress}
        currentView={currentView}
        setCurrentView={setCurrentView}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Viewport Content area */}
      <main className="main-content">
        {currentView === 'dashboard' && (
          <Dashboard 
            modules={modules}
            progress={progress}
            onSelectModule={handleSelectModule}
            setCurrentView={setCurrentView}
          />
        )}
        
        {currentView === 'study' && (
          <StudyReader 
            module={activeModule}
            progress={progress}
            onToggleProgress={handleToggleProgress}
            onNext={handleNextModule}
            onPrev={handlePrevModule}
            hasPrev={activeModuleId > 1}
            hasNext={activeModuleId < modules.length}
          />
        )}

        {currentView === 'quiz' && (
          <Quiz />
        )}
      </main>
    </div>
  );
}
