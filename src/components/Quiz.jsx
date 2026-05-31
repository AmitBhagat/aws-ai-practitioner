import React, { useState } from 'react';
import { practiceQuestions } from '../data/quizData';
import KaTexMath from './KaTexMath';

// Custom LaTeX rendering parser for questions, choices, and explanations
function QuizText({ text }) {
  if (!text) return null;

  const parts = [];
  let lastIndex = 0;
  
  // Find all $...$ inline occurrences
  const matches = [...text.matchAll(/\$([^\$]+)\$/g)];
  
  if (matches.length === 0) {
    return <>{text}</>;
  }

  matches.forEach((m, mIdx) => {
    if (m.index > lastIndex) {
      parts.push(text.substring(lastIndex, m.index));
    }
    const cleanInline = m[1].replace(/\\\\/g, '\\');
    parts.push(<KaTexMath key={mIdx} math={cleanInline} block={false} />);
    lastIndex = m.index + m[0].length;
  });

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <>
      {parts.map((p, idx) => (
        <React.Fragment key={idx}>{p}</React.Fragment>
      ))}
    </>
  );
}

// Utility to shuffle questions for dynamic practice runs
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function Quiz() {
  const [selectedMode, setSelectedMode] = useState(null); // null, 'sprint', 'marathon', 'mock', 'explorer'
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [scoreHistory, setScoreHistory] = useState([]); // booleans for current run
  const [showResults, setShowResults] = useState(false);

  // Initialize practice session based on mode
  const startQuizMode = (mode) => {
    try {
      console.log("startQuizMode triggered for mode:", mode);
      
      if (!practiceQuestions || practiceQuestions.length === 0) {
        throw new Error("Questions database (practiceQuestions) is empty or failed to load.");
      }

      setSelectedMode(mode);
      setCurrentIdx(0);
      setSelectedOptions([]);
      setHasSubmitted(false);
      setScoreHistory([]);
      setShowResults(false);

      let selectedQuestions = [];
      if (mode === 'sprint') {
        selectedQuestions = shuffleArray(practiceQuestions).slice(0, 10);
      } else if (mode === 'marathon') {
        selectedQuestions = shuffleArray(practiceQuestions).slice(0, 25);
      } else if (mode === 'mock') {
        selectedQuestions = shuffleArray(practiceQuestions).slice(0, 65);
      } else {
        selectedQuestions = practiceQuestions;
      }
      
      console.log("Successfully prepared questions for mode: " + mode + ", count: " + selectedQuestions.length);
      setQuestions(selectedQuestions);
    } catch (e) {
      console.error("Error in startQuizMode:", e);
      alert("Error starting quiz mode: " + e.message);
    }
  };

  const handleSelectOption = (optIdx) => {
    if (hasSubmitted) return;
    setSelectedOptions([optIdx]);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptions.length === 0) return;
    setHasSubmitted(true);

    const q = questions[currentIdx];
    const isCorrect = selectedOptions[0] === q.answer;
    setScoreHistory([...scoreHistory, isCorrect]);
  };

  const handleNextQuestion = () => {
    setHasSubmitted(false);
    setSelectedOptions([]);
    
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleSkipToQuestion = (targetIdx) => {
    if (targetIdx >= 0 && targetIdx < questions.length) {
      setHasSubmitted(false);
      setSelectedOptions([]);
      setCurrentIdx(targetIdx);
    }
  };

  const handleExitQuiz = () => {
    setSelectedMode(null);
    setQuestions([]);
    setCurrentIdx(0);
    setSelectedOptions([]);
    setHasSubmitted(false);
    setScoreHistory([]);
    setShowResults(false);
  };

  const correctCount = scoreHistory.filter(h => h).length;
  const scorePercent = questions.length > 0 ? Math.round((correctCount / scoreHistory.length) * 100) : 0;

  // Group performance diagnostics by domain
  const domainPerformance = {};
  questions.forEach((q, idx) => {
    if (idx >= scoreHistory.length) return; // only evaluate answered ones
    if (!domainPerformance[q.domain]) {
      domainPerformance[q.domain] = { total: 0, correct: 0 };
    }
    domainPerformance[q.domain].total += 1;
    if (scoreHistory[idx]) {
      domainPerformance[q.domain].correct += 1;
    }
  });

  const getOptionClass = (optIdx) => {
    if (!hasSubmitted) {
      return selectedOptions.includes(optIdx) ? 'selected' : '';
    }
    const correctAns = questions[currentIdx].answer;
    const isSel = selectedOptions[0] === optIdx;

    if (optIdx === correctAns) return 'correct';
    if (isSel && optIdx !== correctAns) return 'incorrect';
    return '';
  };

  // View 1: Quiz Mode Selection Dashboard
  if (selectedMode === null) {
    return (
      <div className="animate-fade-in" style={{ paddingBottom: '4rem', width: '100%' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="badge badge-mastered" style={{ fontSize: '0.65rem', marginBottom: '0.5rem', background: 'var(--accent-violet-glow)', color: 'var(--accent-violet)', border: '1px solid var(--accent-violet)' }}>
            Practice Engine
          </span>
          <h1 style={{ fontSize: '1.65rem', marginBottom: '0.4rem', background: 'linear-gradient(135deg, #ffffff 40%, var(--accent-violet) 100%)', WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}>
            AIF-C01 Practice Simulator
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Choose a training mode to drill against <strong>{practiceQuestions.length} practice questions</strong> parsed from the technical database.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Quick Sprint */}
          <div 
            onClick={() => startQuizMode('sprint')} 
            className="glass-card" 
            style={{ margin: 0, cursor: 'pointer', border: '1px solid var(--border-color)', background: 'rgba(6, 182, 212, 0.02)' }}
          >
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>⚡</span>
            <h3 style={{ color: 'var(--accent-cyan)' }}>Quick Sprint</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: '1.5' }}>
              Drill <strong>10 random questions</strong>. Perfect for a fast active-recall check on the go.
            </p>
          </div>

          {/* Half Marathon */}
          <div 
            onClick={() => startQuizMode('marathon')} 
            className="glass-card" 
            style={{ margin: 0, cursor: 'pointer', border: '1px solid var(--border-color)', background: 'rgba(139, 92, 246, 0.02)' }}
          >
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🏃</span>
            <h3 style={{ color: 'var(--accent-violet)' }}>Half Marathon</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: '1.5' }}>
              Drill <strong>25 random questions</strong>. A robust, medium-length workout across all blueprint areas.
            </p>
          </div>

          {/* Pearson VUE mock */}
          <div 
            onClick={() => startQuizMode('mock')} 
            className="glass-card" 
            style={{ margin: 0, cursor: 'pointer', border: '1px solid var(--border-color)', background: 'rgba(244, 63, 94, 0.02)' }}
          >
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🏢</span>
            <h3 style={{ color: 'var(--accent-rose)' }}>Pearson VUE Simulator</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: '1.5' }}>
              Drill <strong>65 random questions</strong> mimicking the official exam parameters. Pass threshold: 70%.
            </p>
          </div>

          {/* Explorer mode */}
          <div 
            onClick={() => startQuizMode('explorer')} 
            className="glass-card" 
            style={{ margin: 0, cursor: 'pointer', border: '1px solid var(--border-color)', background: 'rgba(245, 158, 11, 0.02)' }}
          >
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🔍</span>
            <h3 style={{ color: 'var(--accent-amber)' }}>Database Explorer</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: '1.5' }}>
              Browse the entire <strong>{practiceQuestions.length} questions sequential bank</strong>. Jump to any question and study at your own pace.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  // View 2: Quiz Scoreboard Summary
  if (showResults) {
    return (
      <div className="glass-card quiz-results-card animate-fade-in">
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🏆</span>
        <h2 style={{ border: 'none', padding: 0, margin: 0, fontSize: '1.35rem', color: 'var(--text-primary)' }}>
          Exam Session Complete
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
          Mode: {selectedMode.toUpperCase()} ({questions.length} Questions)
        </p>

        <div style={{ margin: '2rem 0' }}>
          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: scorePercent >= 70 ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontFamily: 'var(--font-heading)' }}>
            {scorePercent}%
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            You scored {correctCount} out of {questions.length} correct decisions.
          </p>
          <span 
            className={`badge ${scorePercent >= 70 ? 'badge-mastered' : 'badge-caution'}`} 
            style={{ 
              marginTop: '0.75rem', 
              fontSize: '0.8rem',
              padding: '0.4rem 1rem',
              background: scorePercent >= 70 ? 'var(--accent-emerald-glow)' : 'var(--accent-rose-glow)',
              color: scorePercent >= 70 ? 'var(--accent-emerald)' : 'var(--accent-rose)',
              border: `1px solid ${scorePercent >= 70 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`
            }}
          >
            {scorePercent >= 70 ? 'PASSED (PASSING THRESHOLD: 70%)' : 'FAIL (PASSING THRESHOLD: 70%)'}
          </span>
        </div>

        {/* Diagnostics */}
        <div style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'left' }}>
          <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            Blueprint Domain Performance
          </h3>
          {Object.entries(domainPerformance).map(([domainName, data]) => {
            const domPercent = Math.round((data.correct / data.total) * 100);
            return (
              <div key={domainName} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{domainName}</span>
                  <span style={{ color: domPercent >= 70 ? 'var(--accent-emerald)' : 'var(--accent-amber)', fontWeight: 700 }}>
                    {data.correct} / {data.total} ({domPercent}%)
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'var(--bg-primary)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <div 
                    style={{ 
                      width: `${domPercent}%`, 
                      height: '100%', 
                      background: domPercent >= 70 ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                      borderRadius: '3px'
                    }} 
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <button
            onClick={() => startQuizMode(selectedMode)}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--accent-violet)',
              color: '#ffffff',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 4px 12px var(--accent-violet-glow)'
            }}
          >
            Retake Mode
          </button>
          <button
            onClick={handleExitQuiz}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.9rem'
            }}
          >
            Change Mode / Exit
          </button>
        </div>
      </div>
    );
  }

  // Safeguard in case questions array is empty
  if (!currentQuestion) return null;

  // View 3: Active Question Runner
  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem', width: '100%' }}>
      
      {/* Top Header controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-mastered" style={{ fontSize: '0.6rem', background: 'var(--accent-violet-glow)', color: 'var(--accent-violet)', border: '1px solid var(--accent-violet)' }}>
            SIMULATOR: {selectedMode.toUpperCase()}
          </span>
          <h1 style={{ fontSize: '1.35rem', margin: '0.3rem 0 0 0', background: 'none', WebkitTextFillColor: 'initial', color: 'var(--text-primary)' }}>
            Practice Session
          </h1>
        </div>
        
        {/* Explorer Jump Bar */}
        {selectedMode === 'explorer' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Jump to Question:</span>
            <select
              value={currentIdx}
              onChange={(e) => handleSkipToQuestion(parseInt(e.target.value))}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '0.3rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                outline: 'none',
                maxWidth: '120px'
              }}
            >
              {questions.map((_, qIdx) => (
                <option key={qIdx} value={qIdx}>
                  Q {qIdx + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        <button 
          onClick={handleExitQuiz}
          style={{
            background: 'transparent',
            border: '1px solid var(--accent-rose)',
            color: 'var(--accent-rose)',
            padding: '0.4rem 0.8rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600
          }}
        >
          ✕ Exit Session
        </button>
      </div>

      {/* Main Question Panel */}
      <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 600 }}>
          <span>QUESTION {currentIdx + 1} OF {questions.length} (ID: #{currentQuestion.id})</span>
          <span style={{ color: 'var(--accent-violet)' }}>{currentQuestion.domain}</span>
        </div>

        <h2 style={{ border: 'none', padding: 0, margin: '0 0 1.25rem 0', color: 'var(--text-primary)', fontSize: '1.1rem', lineHeight: '1.5', fontWeight: 500 }}>
          <QuizText text={currentQuestion.question} />
        </h2>

        {/* Options */}
        <div>
          {currentQuestion.options.map((opt, idx) => (
            <div 
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`quiz-option ${getOptionClass(idx)}`}
            >
              <div className="quiz-indicator">
                {String.fromCharCode(65 + idx)}
              </div>
              <span style={{ color: 'var(--text-primary)' }}><QuizText text={opt} /></span>
            </div>
          ))}
        </div>

        {/* Action button bar */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {/* Display progress stats during explorer sessions */}
            {selectedMode === 'explorer' && scoreHistory.length > 0 && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Accuracy: <strong style={{ color: 'var(--accent-emerald)' }}>{correctCount}/{scoreHistory.length}</strong> ({scorePercent}%)
              </span>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {!hasSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOptions.length === 0}
                style={{
                  padding: '0.65rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: selectedOptions.length > 0 ? 'var(--accent-violet)' : 'var(--bg-tertiary)',
                  color: selectedOptions.length > 0 ? '#ffffff' : 'var(--text-muted)',
                  cursor: selectedOptions.length > 0 ? 'pointer' : 'not-allowed',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  boxShadow: selectedOptions.length > 0 ? '0 4px 12px var(--accent-violet-glow)' : 'none'
                }}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                style={{
                  padding: '0.65rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'var(--accent-cyan)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  boxShadow: '0 4px 12px var(--accent-cyan-glow)'
                }}
              >
                {currentIdx + 1 < questions.length ? 'Next Question →' : 'Finish & View Summary'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Explanations reveals */}
      {hasSubmitted && (
        <div className="glass-card quiz-explanation-card animate-fade-in">
          <h3 style={{ 
            margin: '0 0 0.5rem 0', 
            color: scoreHistory[scoreHistory.length - 1] ? 'var(--accent-emerald)' : 'var(--accent-rose)',
            fontSize: '0.95rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {scoreHistory[scoreHistory.length - 1] ? '✓ Correct Choice' : '✗ Incorrect Choice'}
          </h3>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <QuizText text={currentQuestion.explanation} />
          </p>
        </div>
      )}

    </div>
  );
}
