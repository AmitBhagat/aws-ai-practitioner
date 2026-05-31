import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// We will initialize mermaid dynamically before each render to support Light/Dark mode toggling

let idCounter = 0;

export default function MermaidDiagram({ code }) {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');
  
  // Use a stable ID for the lifetime of this component
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');
  const [id] = useState(() => `mermaid-diagram-${Date.now()}-${idCounter++}`);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const renderDiagram = async () => {
      try {
        const isLight = theme === 'light';
        
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          fontFamily: 'var(--font-body)',
          securityLevel: 'loose',
          themeVariables: {
            primaryColor: isLight ? '#f8fafc' : '#090b11',
            primaryTextColor: isLight ? '#0f172a' : '#f3f4f6',
            primaryBorderColor: isLight ? '#0891b2' : '#06b6d4',
            lineColor: isLight ? '#64748b' : '#6b7280',
            secondaryColor: isLight ? '#ffffff' : '#101424',
            tertiaryColor: isLight ? '#f1f5f9' : '#161c33',
            edgeLabelBackground: isLight ? '#f8fafc' : '#090b11',
            nodeBorder: isLight ? '#0891b2' : '#06b6d4',
            clusterBkg: isLight ? '#f1f5f9' : '#161c33',
            clusterBorder: isLight ? '#e2e8f0' : '#242f53',
            defaultLinkColor: isLight ? '#64748b' : '#6b7280',
            titleColor: isLight ? '#0f172a' : '#f3f4f6',
            mainBkg: isLight ? '#ffffff' : '#101424',
            nodeTextColor: isLight ? '#0f172a' : '#f3f4f6',
            textColor: isLight ? '#0f172a' : '#f3f4f6',
            fontColor: isLight ? '#0f172a' : '#f3f4f6'
          },
          flowchart: { useMaxWidth: false },
          sequence: { useMaxWidth: false },
          journey: { useMaxWidth: false },
          gantt: { useMaxWidth: false }
        });
        // Natively inject a default classDef into the diagram so Mermaid handles it without CSS hacks
        let processedCode = code;
        if (processedCode.includes('graph ') || processedCode.includes('flowchart ')) {
          const defaultFill = isLight ? '#f1f5f9' : '#161c33';
          const defaultStroke = isLight ? '#0891b2' : '#06b6d4';
          const defaultColor = isLight ? '#0f172a' : '#f3f4f6';
          const injectionString = `\n    classDef default fill:${defaultFill},stroke:${defaultStroke},stroke-width:2px,color:${defaultColor};\n`;
          // Inject after the first line (e.g. 'graph TD')
          processedCode = processedCode.replace(/^(graph\s+\w+|flowchart\s+\w+)([^\n]*)\n/i, `$1$2${injectionString}`);
        }

        let { svg: renderedSvg } = await mermaid.render(id, processedCode);
        
        if (isMounted) {
          setSvg(renderedSvg);
        }
      } catch (e) {
        console.error("Mermaid parsing error:", e);
        if (isMounted) {
          setSvg(`<div style="color: var(--accent-rose); padding: 1rem; border: 1px solid var(--accent-rose); border-radius: 8px;">Failed to render diagram.<br><br><code>${e.message}</code></div>`);
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [code, id, theme]);

  return (
    <div 
      ref={containerRef}
      className="mermaid-container" 
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        padding: '2rem 1.5rem',
        margin: '1.5rem 0',
        overflowX: 'auto'
      }}
      dangerouslySetInnerHTML={{ __html: svg || '<div style="color: var(--text-secondary); text-align: center; padding: 2rem;">Rendering diagram...</div>' }} 
    />
  );
}
