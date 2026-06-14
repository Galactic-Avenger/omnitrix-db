import Editor, { type OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

interface SqlEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  isRunning: boolean;
}

const editorOptions: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  fontSize: 14,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  tabSize: 2,
  automaticLayout: true,
  padding: { top: 12, bottom: 12 },
  renderLineHighlight: 'line',
  cursorBlinking: 'smooth',
  smoothScrolling: true,
};

const handleEditorMount: OnMount = (_editor, monaco) => {
  monaco.editor.defineTheme('omnitrix-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: '00ff88', fontStyle: 'bold' },
      { token: 'string', foreground: '39ffb0' },
      { token: 'number', foreground: 'ffaa33' },
      { token: 'comment', foreground: '4a7a62', fontStyle: 'italic' },
      { token: 'operator', foreground: '8fcfaf' },
    ],
    colors: {
      'editor.background': '#050a08',
      'editor.foreground': '#e8fff4',
      'editorLineNumber.foreground': '#4a7a62',
      'editorLineNumber.activeForeground': '#00ff88',
      'editor.selectionBackground': '#1a3d2e88',
      'editor.lineHighlightBackground': '#0f1f18',
      'editorCursor.foreground': '#00ff88',
    },
  });
  monaco.editor.setTheme('omnitrix-dark');
};

export function SqlEditor({ value, onChange, onRun, isRunning }: SqlEditorProps) {
  return (
    <div className="sql-editor-panel">
      <div className="panel-toolbar">
        <span className="panel-label">
          <span className="panel-icon" aria-hidden="true">◈</span>
          SQL Terminal
        </span>
        <button
          type="button"
          className="run-button"
          onClick={onRun}
          disabled={isRunning}
        >
          <span className="run-icon" aria-hidden="true">▶</span>
          {isRunning ? 'Executing...' : 'Run Query'}
        </button>
      </div>
      <div className="editor-container">
        <Editor
          height="220px"
          language="sql"
          theme="omnitrix-dark"
          value={value}
          onChange={(newValue) => onChange(newValue ?? '')}
          options={editorOptions}
          onMount={handleEditorMount}
        />
      </div>
    </div>
  );
}
