import React, { useRef, useEffect } from 'react';

declare global {
  interface Window {
    monaco: any;
    require: any;
  }
}

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: string;
  height?: number;
}

export function CodeEditor({ 
  value, 
  onChange, 
  language = 'html', 
  theme = 'vs-dark',
  height = 400 
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const initializeMonaco = () => {
      if (window.monaco) {
        // Monaco is already loaded
        createEditor();
      } else if (window.require) {
        // Load Monaco dynamically
        window.require.config({ 
          paths: { 
            'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' 
          } 
        });
        
        window.require(['vs/editor/editor.main'], () => {
          createEditor();
        });
      } else {
        // Load Monaco via script tag
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js';
        script.onload = () => {
          if (window.require) {
            window.require.config({ 
              paths: { 
                'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' 
              } 
            });
            
            window.require(['vs/editor/editor.main'], () => {
              createEditor();
            });
          }
        };
        document.head.appendChild(script);
      }
    };

    const createEditor = () => {
      if (!containerRef.current || !window.monaco) return;

      // Define cyberpunk theme - Darker
      window.monaco.editor.defineTheme('cyberpunk', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '#666666', fontStyle: 'italic' },
          { token: 'keyword', foreground: '#00E6E6' },
          { token: 'string', foreground: '#00E600' },
          { token: 'number', foreground: '#FF8C00' },
          { token: 'tag', foreground: '#CC00FF' },
          { token: 'attribute.name', foreground: '#00E6E6' },
          { token: 'attribute.value', foreground: '#00E600' },
        ],
        colors: {
          'editor.background': '#020202',
          'editor.foreground': '#F0F0F0',
          'editorLineNumber.foreground': '#555555',
          'editorLineNumber.activeForeground': '#00E6E6',
          'editor.selectionBackground': '#CC00FF22',
          'editor.lineHighlightBackground': '#0A0A0A',
          'editor.inactiveSelectionBackground': '#333333',
          'editorCursor.foreground': '#00E6E6',
        }
      });

      editorRef.current = window.monaco.editor.create(containerRef.current, {
        value,
        language,
        theme: 'cyberpunk',
        fontSize: 14,
        fontFamily: 'Source Code Pro, monospace',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 10, bottom: 10 },
      });

      editorRef.current.onDidChangeModelContent(() => {
        const newValue = editorRef.current.getValue();
        onChange(newValue);
      });
    };

    initializeMonaco();

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && editorRef.current.getValue() !== value) {
      editorRef.current.setValue(value);
    }
  }, [value]);

  return (
    <div 
      ref={containerRef} 
      style={{ height: `${height}px` }}
      className="border border-cyber-cyan/30 bg-cyber-dark"
      data-testid="code-editor"
    />
  );
}
