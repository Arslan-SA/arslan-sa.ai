'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { processCommand, TerminalOutput } from '@/lib/terminalCommands';
import { VscClose, VscChevronDown, VscTerminal, VscAdd, VscTrash, VscSplitHorizontal } from 'react-icons/vsc';
import { useIDE } from '@/hooks/useIDEState';

export default function Terminal() {
  const { toggleTerminal } = useIDE();
  const [history, setHistory] = useState<TerminalOutput[]>([
    {
      type: 'system',
      content: 'Welcome to Arslan\'s Portfolio Terminal v1.0.0\nType "help" for available commands.\n',
    },
    { type: 'command', content: 'arslan@portfolio:~$ ' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && input === '') {
      setHistory((prev) => [
        ...prev.slice(0, -1),
        { type: 'command', content: `arslan@portfolio:~$ ` },
        { type: 'command', content: 'arslan@portfolio:~$ ' },
      ]);
      return;
    }

    const results = processCommand(input);

    if (results.length === 1 && results[0].type === 'system' && results[0].content === '__CLEAR__') {
      setHistory([{ type: 'command', content: 'arslan@portfolio:~$ ' }]);
      setInput('');
      return;
    }

    setCommandHistory((prev) => [input, ...prev]);
    setHistoryIndex(-1);

    setHistory((prev) => [
      ...prev.slice(0, -1), // Remove the empty prompt
      ...results,
      { type: 'command', content: 'arslan@portfolio:~$ ' },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: 'var(--bg-terminal)' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header */}
      <div
        className="flex items-center justify-between px-3 py-1 flex-shrink-0"
        style={{
          background: 'var(--bg-titlebar)',
          borderBottom: '1px solid var(--border-primary)',
        }}
      >
        <div className="flex items-center gap-4">
          <span
            className="text-xs uppercase tracking-wider flex items-center gap-1.5 px-2 py-0.5"
            style={{
              color: 'var(--text-primary)',
              borderBottom: '1px solid var(--text-primary)',
            }}
          >
            <VscTerminal size={14} />
            Terminal
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-0.5 rounded hover:bg-[var(--bg-hover)]"
            style={{ color: 'var(--text-muted)' }}
            title="New Terminal"
            aria-label="New Terminal"
          >
            <VscAdd size={14} />
          </button>
          <button
            className="p-0.5 rounded hover:bg-[var(--bg-hover)]"
            style={{ color: 'var(--text-muted)' }}
            title="Split Terminal"
            aria-label="Split Terminal"
          >
            <VscSplitHorizontal size={14} />
          </button>
          <button
            className="p-0.5 rounded hover:bg-[var(--bg-hover)]"
            style={{ color: 'var(--text-muted)' }}
            title="Kill Terminal"
            aria-label="Kill Terminal"
          >
            <VscTrash size={14} />
          </button>
          <button
            className="p-0.5 rounded hover:bg-[var(--bg-hover)]"
            style={{ color: 'var(--text-muted)' }}
            title="Close Panel"
            aria-label="Close Panel"
            onClick={toggleTerminal}
          >
            <VscClose size={14} />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-3 font-mono text-[13px]">
        {history.map((entry, i) => {
          const isLastPrompt = i === history.length - 1 && entry.type === 'command';

          if (isLastPrompt) {
            return (
              <form key={i} onSubmit={handleSubmit} className="flex">
                <span>
                  <span style={{ color: 'var(--terminal-green)' }}>arslan</span>
                  <span style={{ color: 'var(--text-muted)' }}>@</span>
                  <span style={{ color: 'var(--terminal-blue)' }}>portfolio</span>
                  <span style={{ color: 'var(--text-muted)' }}>:</span>
                  <span style={{ color: 'var(--terminal-yellow)' }}>~</span>
                  <span style={{ color: 'var(--text-muted)' }}>$ </span>
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none"
                  style={{ color: 'var(--text-primary)', caretColor: 'var(--text-primary)' }}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </form>
            );
          }

          if (entry.type === 'command') {
            return (
              <div key={i}>
                <span style={{ color: 'var(--terminal-green)' }}>arslan</span>
                <span style={{ color: 'var(--text-muted)' }}>@</span>
                <span style={{ color: 'var(--terminal-blue)' }}>portfolio</span>
                <span style={{ color: 'var(--text-muted)' }}>:</span>
                <span style={{ color: 'var(--terminal-yellow)' }}>~</span>
                <span style={{ color: 'var(--text-muted)' }}>$ </span>
                <span style={{ color: 'var(--text-primary)' }}>
                  {entry.content.replace('arslan@portfolio:~$ ', '')}
                </span>
              </div>
            );
          }

          if (entry.type === 'error') {
            return (
              <pre key={i} className="whitespace-pre-wrap" style={{ color: 'var(--terminal-red)' }}>
                {entry.content}
              </pre>
            );
          }

          if (entry.type === 'system') {
            return (
              <pre key={i} className="whitespace-pre-wrap" style={{ color: 'var(--terminal-cyan)' }}>
                {entry.content}
              </pre>
            );
          }

          return (
            <pre key={i} className="whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
              {entry.content}
            </pre>
          );
        })}
      </div>
    </div>
  );
}
