'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useIDE } from '@/hooks/useIDEState';
import { flattenFiles, fileTree } from '@/lib/fileTree';
import { motion } from 'framer-motion';
import {
  VscFile, VscSettingsGear, VscColorMode, VscDesktopDownload,
  VscInfo, VscCode, VscProject, VscMortarBoard, VscMail
} from 'react-icons/vsc';

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export default function CommandPalette() {
  const { toggleCommandPalette, openFile, toggleTheme } = useIDE();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const files = useMemo(() => flattenFiles(fileTree), []);

  const commands: CommandItem[] = useMemo(
    () => [
      ...files.map((f) => ({
        id: `file-${f.path}`,
        label: f.name,
        icon: <VscFile size={16} style={{ color: 'var(--text-muted)' }} />,
        action: () => {
          openFile(f);
          toggleCommandPalette();
        },
        category: 'Files',
      })),
      {
        id: 'cmd-about',
        label: 'Open About (README.md)',
        icon: <VscInfo size={16} style={{ color: 'var(--syntax-keyword)' }} />,
        action: () => {
          openFile({ name: 'README.md', path: 'ARSLAN/about/README.md', extension: 'md', content: 'readme' });
          toggleCommandPalette();
        },
        category: 'Commands',
      },
      {
        id: 'cmd-skills',
        label: 'Open Skills',
        icon: <VscCode size={16} style={{ color: 'var(--syntax-class)' }} />,
        action: () => {
          openFile({ name: 'python.json', path: 'ARSLAN/skills/python.json', extension: 'json', content: 'skills' });
          toggleCommandPalette();
        },
        category: 'Commands',
      },
      {
        id: 'cmd-projects',
        label: 'Open Projects',
        icon: <VscProject size={16} style={{ color: 'var(--syntax-function)' }} />,
        action: () => {
          openFile({ name: 'portfolio.tsx', path: 'ARSLAN/projects/portfolio.tsx', extension: 'tsx', content: 'projects' });
          toggleCommandPalette();
        },
        category: 'Commands',
      },
      {
        id: 'cmd-education',
        label: 'Open Education',
        icon: <VscMortarBoard size={16} style={{ color: 'var(--syntax-string)' }} />,
        action: () => {
          openFile({ name: 'iitm.md', path: 'ARSLAN/education/iitm.md', extension: 'md', content: 'education' });
          toggleCommandPalette();
        },
        category: 'Commands',
      },
      {
        id: 'cmd-contact',
        label: 'Open Contact',
        icon: <VscMail size={16} style={{ color: 'var(--syntax-variable)' }} />,
        action: () => {
          openFile({ name: 'social.ts', path: 'ARSLAN/contact/social.ts', extension: 'ts', content: 'contact' });
          toggleCommandPalette();
        },
        category: 'Commands',
      },
      {
        id: 'cmd-theme',
        label: 'Toggle Theme (Dark/Light)',
        icon: <VscColorMode size={16} style={{ color: 'var(--syntax-keyword)' }} />,
        action: () => {
          toggleTheme();
          toggleCommandPalette();
        },
        category: 'Commands',
      },
      {
        id: 'cmd-resume',
        label: 'Download Resume',
        icon: <VscDesktopDownload size={16} style={{ color: 'var(--syntax-class)' }} />,
        action: () => {
          toggleCommandPalette();
          // Placeholder - would trigger download
        },
        category: 'Commands',
      },
    ],
    [files, openFile, toggleCommandPalette, toggleTheme]
  );

  const filtered = useMemo(() => {
    if (!query) return commands;
    const q = query.toLowerCase();
    return commands.filter((cmd) => cmd.label.toLowerCase().includes(q));
  }, [query, commands]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected into view
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;
    const selectedEl = listEl.children[selectedIndex] as HTMLElement;
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      toggleCommandPalette();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100]"
        style={{ background: 'rgba(0,0,0,0.4)' }}
        onClick={toggleCommandPalette}
      />

      {/* Palette */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] z-[101] rounded-md overflow-hidden shadow-2xl"
        style={{
          background: 'var(--bg-command-palette)',
          border: '1px solid var(--border-primary)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Input */}
        <div style={{ borderBottom: '1px solid var(--border-primary)' }}>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search files..."
            className="w-full px-4 py-2.5 bg-transparent border-none outline-none text-sm"
            style={{ color: 'var(--text-primary)' }}
            autoComplete="off"
            spellCheck={false}
            aria-label="Command palette search"
          />
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[300px] overflow-auto py-1">
          {filtered.length === 0 && (
            <div className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>
              No results found
            </div>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              className="flex items-center gap-2.5 w-full px-4 py-1.5 text-left text-sm"
              style={{
                background: i === selectedIndex ? 'var(--bg-selection)' : 'transparent',
                color: 'var(--text-primary)',
              }}
              onClick={cmd.action}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              {cmd.icon}
              <span className="truncate">{cmd.label}</span>
              <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
                {cmd.category}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
