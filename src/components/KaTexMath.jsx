import React, { useEffect, useRef, useState } from 'react';

export default function KaTexMath({ math, block = false }) {
  const containerRef = useRef(null);
  const [katexLoaded, setKatexLoaded] = useState(!!window.katex);

  useEffect(() => {
    if (!katexLoaded) {
      const interval = setInterval(() => {
        if (window.katex) {
          setKatexLoaded(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [katexLoaded]);

  useEffect(() => {
    if (containerRef.current && window.katex) {
      try {
        window.katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false
        });
      } catch (e) {
        console.error("KaTeX render error for formula: ", math, e);
      }
    }
  }, [math, block, katexLoaded]);

  // Fallback to monospace text if KaTeX fails to load
  if (!katexLoaded) {
    return (
      <code 
        ref={containerRef} 
        className={block ? "math-block" : "math-inline"} 
        style={{ 
          fontFamily: 'var(--font-code)', 
          whiteSpace: 'pre-wrap',
          display: block ? 'block' : 'inline-block',
          padding: block ? '1rem' : '0.1rem 0.3rem',
          textAlign: block ? 'center' : 'left'
        }}
      >
        {math}
      </code>
    );
  }

  return (
    <span 
      ref={containerRef} 
      style={{ 
        display: block ? 'block' : 'inline-block',
        margin: block ? '1rem 0' : '0'
      }} 
    />
  );
}
