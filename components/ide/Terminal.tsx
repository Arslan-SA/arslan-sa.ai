'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { processCommand, TerminalOutput } from '@/lib/terminalCommands';
import { VscClose, VscChevronDown, VscTerminal, VscAdd, VscTrash, VscSplitHorizontal } from 'react-icons/vsc';
import { useIDE } from '@/hooks/useIDEState';

interface BootLine {
  text: string;
  color?: string;
  delay: number;
  typeSpeed?: number;
}

const bootSequence: BootLine[] = [
  { text: '$ booting developer profile...', color: 'var(--terminal-green)', delay: 300, typeSpeed: 30 },
  { text: '✓ Loading portfolio...', color: 'var(--terminal-cyan)', delay: 400, typeSpeed: 25 },
  { text: '✓ Initializing projects...', color: 'var(--terminal-cyan)', delay: 350, typeSpeed: 25 },
  { text: '✓ Loading AI/ML environment...', color: 'var(--terminal-cyan)', delay: 450, typeSpeed: 25 },
  { text: '✓ Connecting GitHub...', color: 'var(--terminal-cyan)', delay: 300, typeSpeed: 25 },
  { text: '✓ Connecting LinkedIn...', color: 'var(--terminal-cyan)', delay: 300, typeSpeed: 25 },
  { text: '✓ Starting portfolio...', color: 'var(--terminal-cyan)', delay: 400, typeSpeed: 25 },
  { text: '✓ Ready.', color: 'var(--terminal-green)', delay: 500, typeSpeed: 30 },
  { text: '', color: 'transparent', delay: 200, typeSpeed: 0 },
  { text: "Welcome, I'm Arslan.", color: 'var(--text-active)', delay: 300, typeSpeed: 40 },
  { text: 'Data Science Student | AI & ML Enthusiast', color: 'var(--text-muted)', delay: 200, typeSpeed: 20 },
  { text: '', color: 'transparent', delay: 200, typeSpeed: 0 },
  { text: 'Type "help" to begin.', color: 'var(--terminal-yellow)', delay: 100, typeSpeed: 35 },
];

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<{ text: string; color: string; complete: boolean }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, currentCharIndex]);

  // Typing effect
  useEffect(() => {
    if (currentLineIndex >= bootSequence.length) {
      // Done with boot sequence
      const timer = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(timer);
    }

    const line = bootSequence[currentLineIndex];

    // If this is a new line, add it
    if (currentCharIndex === 0) {
      const delay = currentLineIndex === 0 ? line.delay : line.delay;
      const timer = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { text: '', color: line.color || 'var(--text-primary)', complete: false },
        ]);
        if (line.text === '') {
          // Empty line, move to next immediately
          setLines((prev) => {
            const updated = [...prev];
            updated[updated.length - 1].complete = true;
            return updated;
          });
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        } else {
          setCurrentCharIndex(1);
        }
      }, delay);
      return () => clearTimeout(timer);
    }

    if (currentCharIndex <= line.text.length) {
      const timer = setTimeout(() => {
        setLines((prev) => {
          const updated = [...prev];
          const lastLine = updated[updated.length - 1];
          lastLine.text = line.text.slice(0, currentCharIndex);
          if (currentCharIndex === line.text.length) {
            lastLine.complete = true;
          }
          return updated;
        });

        if (currentCharIndex === line.text.length) {
          // Move to next line
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        } else {
          setCurrentCharIndex((prev) => prev + 1);
        }
      }, line.typeSpeed || 30);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex, onComplete]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-auto p-3 font-mono text-[13px]">
      {lines.map((line, i) => (
        <div key={i} className="leading-relaxed" style={{ minHeight: line.text === '' && line.complete ? '1.2em' : undefined }}>
          <span style={{ color: line.color }}>{line.text}</span>
          {/* Show cursor on the current line */}
          {i === lines.length - 1 && !line.complete && (
            <span
              style={{
                display: 'inline-block',
                width: '7px',
                height: '14px',
                background: showCursor ? 'var(--text-primary)' : 'transparent',
                marginLeft: '1px',
                verticalAlign: 'text-bottom',
                transition: 'background 0ms',
              }}
            />
          )}
        </div>
      ))}
      {/* Show cursor at the end after all lines are complete but before transitioning */}
      {lines.length > 0 && lines[lines.length - 1]?.complete && currentLineIndex < bootSequence.length && (
        <div>
          <span
            style={{
              display: 'inline-block',
              width: '7px',
              height: '14px',
              background: showCursor ? 'var(--text-primary)' : 'transparent',
              verticalAlign: 'text-bottom',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function Terminal() {
  const { toggleTerminal } = useIDE();
  const [bootComplete, setBootComplete] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);
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

  // Check if boot has already happened this session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const booted = sessionStorage.getItem('portfolio-booted');
      if (booted) {
        setBootComplete(true);
        setHasBooted(true);
      }
    }
  }, []);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
    setHasBooted(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio-booted', 'true');
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    if (bootComplete) {
      inputRef.current?.focus();
    }
  }, [bootComplete]);

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
      onClick={() => bootComplete && inputRef.current?.focus()}
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
      {!bootComplete && !hasBooted ? (
        <BootSequence onComplete={handleBootComplete} />
      ) : (
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
      )}
    </div>
  );
}
