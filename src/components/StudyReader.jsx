import React, { useState, useEffect } from 'react';
import KaTexMath from './KaTexMath';
import MermaidDiagram from './MermaidDiagram';

// Custom lightweight high-fidelity Markdown parser for AIF-C01 notes
function parseMarkdown(mdText) {
  if (!mdText) return [];

  const lines = mdText.replace(/\r/g, '').split('\n');
  const elements = [];
  
  let currentTable = null;
  let inCodeBlock = false;
  let codeLanguage = '';
  let codeLines = [];
  let inMathBlock = false;
  let mathLines = [];
  
  let inCallout = false;
  let calloutType = ''; // note, tip, warning, caution
  let calloutLines = [];
  
  let currentList = null; // { type: 'ul'|'ol', items: [] }

  const flushList = () => {
    if (currentList) {
      elements.push({
        type: 'list',
        listType: currentList.type,
        items: [...currentList.items]
      });
      currentList = null;
    }
  };

  const flushTable = () => {
    if (currentTable) {
      elements.push({
        type: 'table',
        headers: currentTable.headers,
        rows: currentTable.rows
      });
      currentTable = null;
    }
  };

  const flushCode = () => {
    if (inCodeBlock) {
      elements.push({
        type: 'code',
        language: codeLanguage,
        code: codeLines.join('\n')
      });
      codeLines = [];
      inCodeBlock = false;
    }
  };

  const flushMath = () => {
    if (inMathBlock) {
      elements.push({
        type: 'math',
        math: mathLines.join('\n')
      });
      mathLines = [];
      inMathBlock = false;
    }
  };

  const flushCallout = () => {
    if (inCallout) {
      elements.push({
        type: 'callout',
        calloutType: calloutType,
        content: calloutLines.join('\n')
      });
      calloutLines = [];
      inCallout = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Check for Math/Code Block Closing FIRST if we are inside one
    if (inMathBlock) {
      if (trimmed.startsWith('```') || trimmed.startsWith('$$')) {
        flushMath();
        const markerLen = trimmed.startsWith('$$') ? 2 : 3;
        let remainder = trimmed.substring(markerLen).trim();
        // If remainder starts with 'math', that was just the closing ```math tag, ignore 'math'
        if (trimmed.startsWith('```') && remainder.startsWith('math')) {
          remainder = remainder.substring(4).trim();
        }
        if (remainder) lines.splice(i + 1, 0, remainder);
      } else {
        mathLines.push(line);
      }
      continue;
    }

    if (inCodeBlock) {
      if (trimmed.startsWith('```')) {
        flushCode();
        const remainder = trimmed.substring(3).trim();
        if (remainder) lines.splice(i + 1, 0, remainder);
      } else {
        codeLines.push(line);
      }
      continue;
    }

    // 2. Math Block Open (```math or $$)
    if (trimmed.startsWith('```math') || trimmed === '$$') {
      flushList();
      flushTable();
      flushCallout();
      inMathBlock = true;
      const markerLen = trimmed.startsWith('$$') ? 2 : 7;
      const remainder = trimmed.substring(markerLen).trim();
      if (remainder) lines.splice(i + 1, 0, remainder);
      continue;
    }

    // 3. Code Block Open
    if (trimmed.startsWith('```')) {
      flushList();
      flushTable();
      flushCallout();
      inCodeBlock = true;
      codeLanguage = trimmed.substring(3).trim() || 'javascript';
      continue;
    }

    // 3. Callout Block (> [!NOTE] etc.)
    if (trimmed.startsWith('>') && (trimmed.includes('[!NOTE]') || trimmed.includes('[!TIP]') || trimmed.includes('[!WARNING]') || trimmed.includes('[!CAUTION]') || trimmed.includes('[!IMPORTANT]'))) {
      flushList();
      flushTable();
      flushCallout();
      inCallout = true;
      const typeMatch = trimmed.match(/\[!(NOTE|TIP|WARNING|CAUTION|IMPORTANT)\]/i);
      calloutType = typeMatch ? typeMatch[1].toLowerCase() : 'note';
      continue;
    }

    if (inCallout) {
      if (trimmed.startsWith('>')) {
        // Strip the > prefix and one space
        let cLine = line.substring(line.indexOf('>') + 1);
        if (cLine.startsWith(' ')) cLine = cLine.substring(1);
        calloutLines.push(cLine);
        continue;
      } else {
        flushCallout();
      }
    }

    // 4. Headers
    if (trimmed.startsWith('#') && !inCodeBlock && !inMathBlock) {
      flushList();
      flushTable();
      
      const level = trimmed.match(/^#+/)[0].length;
      let text = trimmed.substring(level).trim();
      
      // Clean emojis from heading titles if needed
      elements.push({
        type: 'heading',
        level: level,
        text: text
      });
      continue;
    }

    // 5. Divider
    if (trimmed === '---' || trimmed === '***') {
      flushList();
      flushTable();
      elements.push({ type: 'divider' });
      continue;
    }

    // 6. Tables (| col | col |)
    if (trimmed.startsWith('|')) {
      flushList();
      
      const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      
      // Check if it is a divider row (contains only dashes, colons, etc.)
      const isDividerRow = cells.every(c => /^:?-+:?$/.test(c));
      
      if (isDividerRow) {
        continue;
      }

      if (!currentTable) {
        currentTable = { headers: cells, rows: [] };
      } else {
        currentTable.rows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    // 7. Lists (* item, - item, 1. item)
    const ulMatch = line.match(/^(\s*)([*+-])\s+(.+)$/);
    const olMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);

    if (ulMatch) {
      const indent = ulMatch[1].length;
      const itemText = ulMatch[3];
      if (!currentList) {
        currentList = { type: 'ul', items: [{ text: itemText, indent }] };
      } else {
        currentList.items.push({ text: itemText, indent });
      }
      continue;
    } else if (olMatch) {
      const indent = olMatch[1].length;
      const itemText = olMatch[3];
      if (!currentList) {
        currentList = { type: 'ol', items: [{ text: itemText, indent }] };
      } else {
        currentList.items.push({ text: itemText, indent });
      }
      continue;
    } else {
      if (trimmed === '') {
        // Blank line flushes lists
        flushList();
      } else if (currentList) {
        // Continue list item if indented
        if (line.startsWith('  ') || line.startsWith('\t')) {
          const lastItem = currentList.items[currentList.items.length - 1];
          if (typeof lastItem === 'string') {
            currentList.items[currentList.items.length - 1] += ' ' + trimmed;
          } else {
            lastItem.text += ' ' + trimmed;
          }
          continue;
        } else {
          flushList();
        }
      }
    }

    // 8. Plain Paragraphs
    if (trimmed !== '') {
      elements.push({
        type: 'paragraph',
        text: line
      });
    }
  }

  // Flush remaining blocks
  flushList();
  flushTable();
  flushCode();
  flushMath();
  flushCallout();

  return elements;
}

function splitParts(parts, regex, matchType, allowedContainerTypes) {
  let newParts = [];
  parts.forEach(p => {
    if (!allowedContainerTypes.includes(p.type)) {
      newParts.push(p);
      return;
    }
    const matches = [...p.text.matchAll(regex)];
    if (matches.length === 0) {
      newParts.push(p);
      return;
    }
    let lastIndex = 0;
    matches.forEach(m => {
      if (m.index > lastIndex) {
        newParts.push({ text: p.text.substring(lastIndex, m.index), type: p.type });
      }
      newParts.push({ text: m[1], type: matchType });
      lastIndex = m.index + m[0].length;
    });
    if (lastIndex < p.text.length) {
      newParts.push({ text: p.text.substring(lastIndex), type: p.type });
    }
  });
  return newParts;
}

// React component helper to render parsed tokens
function FormattedText({ text }) {
  if (!text) return null;

  // Process formatting sequentially, splitting allowed container types while preserving their types
  let parts = [{ text: text, type: 'text' }];

  // 1. Bold text (**...**)
  parts = splitParts(parts, /(?<!\\)\*\*([\s\S]+?)(?<!\\)\*\*/g, 'bold', ['text']);

  // 2. Italic text (*...*)
  parts = splitParts(parts, /(?<!\\)\*([^\*]+?)(?<!\\)\*/g, 'italic', ['text', 'bold']);

  // 3. Inline code (`...`)
  parts = splitParts(parts, /(?<!\\)`([\s\S]+?)`/g, 'code', ['text', 'bold', 'italic']);

  // 4. Double dollar math formulas ($$...$$)
  parts = splitParts(parts, /(?<!\\)\$\$([\s\S]+?)(?<!\\)\$\$/g, 'math', ['text', 'bold', 'italic']);

  // 5. Single dollar math formulas ($...$)
  parts = splitParts(parts, /(?<!\\)\$([\s\S]+?)(?<!\\)\$/g, 'math', ['text', 'bold', 'italic']);

  return (
    <>
      {parts.map((p, idx) => {
        if (p.type === 'bold') return <strong key={idx} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{p.text}</strong>;
        if (p.type === 'italic') return <em key={idx} style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>{p.text}</em>;
        if (p.type === 'code') return <code key={idx} className="math-inline" style={{ fontSize: '0.85em', verticalAlign: 'middle' }}>{p.text}</code>;
        if (p.type === 'math') return <KaTexMath key={idx} math={p.text} block={false} />;
        
        // Handle HTML line breaks <br /> or <br> inside plain text parts
        const cleanText = p.text.replace(/\\([$*`>])/g, '$1');
        const subparts = cleanText.split(/<br\s*\/?>/gi);
        return (
          <React.Fragment key={idx}>
            {subparts.map((sub, subidx) => (
              <React.Fragment key={subidx}>
                {subidx > 0 && <br />}
                {sub}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })}
    </>
  );
}

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-container">
      <div className="code-header">
        <span>{language.toUpperCase()}</span>
        <button onClick={handleCopy} className="copy-btn">
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <div className="code-body">
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
}

export default function StudyReader({ 
  module, 
  progress, 
  onToggleProgress, 
  onNext, 
  onPrev,
  hasPrev,
  hasNext
}) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Scroll to top of content on active module changes
    window.scrollTo(0, 0);
    if (module && module.content) {
      setElements(parseMarkdown(module.content));
    }
  }, [module]);

  const currentStatus = progress[module.id] || 'unread';

  // Render parsed nodes
  const renderElement = (el, index) => {
    switch (el.type) {
      case 'heading':
        if (el.level === 1) return null; // Skip rendering level 1 heading inside card as it is already rendered outside as the main title!
        if (el.level === 2) return <h2 key={index} id={`heading-${index}`} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginTop: '1.5rem', fontSize: '1.25rem' }}><FormattedText text={el.text} /></h2>;
        if (el.level === 3) return <h3 key={index} style={{ marginTop: '1.25rem', fontSize: '1.05rem' }}><FormattedText text={el.text} /></h3>;
        return <h4 key={index} style={{ marginTop: '1rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}><FormattedText text={el.text} /></h4>;
      
      case 'paragraph':
        return <p key={index} style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.85' }}><FormattedText text={el.text} /></p>;
      
      case 'list':
        const Tag = el.listType;
        return (
          <Tag key={index} style={{ marginLeft: '1.75rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
            {el.items.map((item, itemIdx) => {
              const text = typeof item === 'string' ? item : item.text;
              const indent = typeof item === 'string' ? 0 : item.indent;
              const marginLeft = indent > 0 ? `${(indent / 2) * 1.0}rem` : '0';
              const listStyleType = indent > 0 ? (Tag === 'ul' ? 'circle' : 'lower-alpha') : (Tag === 'ul' ? 'disc' : 'decimal');
              return (
                <li key={itemIdx} style={{ marginBottom: '0.75rem', fontSize: '1.05rem', lineHeight: '1.8', marginLeft, listStyleType }}>
                  <FormattedText text={text} />
                </li>
              );
            })}
          </Tag>
        );

      case 'code':
        if (el.language && el.language.toLowerCase() === 'mermaid') {
          return <MermaidDiagram key={index} code={el.code} />;
        }
        return <CodeBlock key={index} code={el.code} language={el.language} />;

      case 'math':
        return <KaTexMath key={index} math={el.math} block={true} />;

      case 'callout':
        const icon = el.calloutType === 'note' ? 'ℹ️' :
                     el.calloutType === 'tip' ? '💡' :
                     el.calloutType === 'important' ? '🟣' :
                     el.calloutType === 'warning' ? '⚠️' : '🚨';
        return (
          <div key={index} className={`callout callout-${el.calloutType}`}>
            <div className="callout-title">
              <span>{icon}</span>
              <span>{el.calloutType}</span>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: '1.7' }}>
              <FormattedText text={el.content} />
            </p>
          </div>
        );

      case 'table':
        return (
          <div key={index} className="table-container">
            <table>
              <thead>
                <tr>
                  {el.headers.map((h, hIdx) => <th key={hIdx}><FormattedText text={h} /></th>)}
                </tr>
              </thead>
              <tbody>
                {el.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => <td key={cIdx}><FormattedText text={cell} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'divider':
        return <hr key={index} style={{ border: 'none', height: '1px', background: 'var(--border-color)', margin: '2rem 0' }} />;

      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem', maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
      
      {/* Category Domain Badge and Title Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="badge badge-reading" style={{ fontSize: '0.65rem', marginBottom: '0.5rem', background: 'var(--accent-cyan-glow)', color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)' }}>
          {module.domain}
        </span>
        <h1 style={{ fontSize: '1.65rem', marginBottom: '0.4rem', backgroundImage: 'linear-gradient(135deg, var(--text-primary) 40%, var(--accent-cyan) 100%)', color: 'transparent', WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
          {module.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.85rem' }}>
          {module.summary}
        </p>
      </div>

      {/* Main parsed markdown block */}
      <div className="glass-card">
        {elements.map((el, idx) => renderElement(el, idx))}
      </div>

      {/* cost gotchas section inside study session */}
      {module.gotchas && module.gotchas.length > 0 && (
        <div className="glass-card gotcha-box" style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--accent-rose)', margin: '0 0 1rem 0', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            🚨 Exam Pipeline Gotcha
          </h3>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            {module.gotchas.map((gt, idx) => (
              <li key={idx} style={{ marginBottom: '0.75rem', lineHeight: '1.7' }}><FormattedText text={gt} /></li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation and Completion triggers footer */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '1.5rem', 
          padding: '1.5rem', 
          background: 'var(--bg-secondary)', 
          border: '1px solid var(--border-color)', 
          borderRadius: '12px' 
        }}
      >
        {/* Navigation toggles */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={onPrev}
            disabled={!hasPrev}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: hasPrev ? 'var(--text-primary)' : 'var(--text-muted)',
              cursor: hasPrev ? 'pointer' : 'not-allowed',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            ← Previous
          </button>
          <button 
            onClick={onNext}
            disabled={!hasNext}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: hasNext ? 'var(--text-primary)' : 'var(--text-muted)',
              cursor: hasNext ? 'pointer' : 'not-allowed',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            Next →
          </button>
        </div>

        {/* Progress Mastery switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mastery:</span>
          <div style={{ display: 'inline-flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <button 
              onClick={() => onToggleProgress(module.id, 'unread')}
              style={{
                padding: '0.4rem 0.75rem',
                border: 'none',
                background: currentStatus === 'unread' ? 'var(--border-color)' : 'transparent',
                color: currentStatus === 'unread' ? 'var(--text-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              Unread
            </button>
            <button 
              onClick={() => onToggleProgress(module.id, 'reading')}
              style={{
                padding: '0.4rem 0.75rem',
                border: 'none',
                background: currentStatus === 'reading' ? 'var(--accent-amber-glow)' : 'transparent',
                color: currentStatus === 'reading' ? 'var(--accent-amber)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              Reading
            </button>
            <button 
              onClick={() => onToggleProgress(module.id, 'mastered')}
              style={{
                padding: '0.4rem 0.75rem',
                border: 'none',
                background: currentStatus === 'mastered' ? 'var(--accent-emerald-glow)' : 'transparent',
                color: currentStatus === 'mastered' ? 'var(--accent-emerald)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              Mastered
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
