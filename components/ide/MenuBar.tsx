'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useIDE } from '@/hooks/useIDEState';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  label: string;
  shortcut?: string;
  divider?: boolean;
  disabled?: boolean;
  action?: () => void;
}

interface MenuDefinition {
  label: string;
  items: MenuItem[];
}

export default function MenuBar() {
  const { toggleTerminal, toggleCommandPalette, toggleSidebar, toggleTheme } = useIDE();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);

  const menus: MenuDefinition[] = [
    {
      label: 'File',
      items: [
        { label: 'New File', shortcut: '⌘N' },
        { label: 'New Window', shortcut: '⇧⌘N' },
        { label: '', divider: true },
        { label: 'Open File...', shortcut: '⌘O' },
        { label: 'Open Folder...', shortcut: '⌘K ⌘O' },
        { label: 'Open Recent', shortcut: '→' },
        { label: '', divider: true },
        { label: 'Save', shortcut: '⌘S' },
        { label: 'Save As...', shortcut: '⇧⌘S' },
        { label: 'Save All', shortcut: '⌥⌘S' },
        { label: '', divider: true },
        { label: 'Auto Save', shortcut: '' },
        { label: 'Preferences', shortcut: '' },
        { label: '', divider: true },
        { label: 'Close Editor', shortcut: '⌘W' },
        { label: 'Close Window', shortcut: '⇧⌘W' },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: '⌘Z' },
        { label: 'Redo', shortcut: '⇧⌘Z' },
        { label: '', divider: true },
        { label: 'Cut', shortcut: '⌘X' },
        { label: 'Copy', shortcut: '⌘C' },
        { label: 'Paste', shortcut: '⌘V' },
        { label: '', divider: true },
        { label: 'Find', shortcut: '⌘F', action: toggleCommandPalette },
        { label: 'Replace', shortcut: '⌥⌘F' },
        { label: '', divider: true },
        { label: 'Find in Files', shortcut: '⇧⌘F' },
        { label: 'Replace in Files', shortcut: '⇧⌘H' },
      ],
    },
    {
      label: 'Selection',
      items: [
        { label: 'Select All', shortcut: '⌘A' },
        { label: 'Expand Selection', shortcut: '⇧⌘→' },
        { label: 'Shrink Selection', shortcut: '⇧⌘←' },
        { label: '', divider: true },
        { label: 'Copy Line Up', shortcut: '⇧⌥↑' },
        { label: 'Copy Line Down', shortcut: '⇧⌥↓' },
        { label: 'Move Line Up', shortcut: '⌥↑' },
        { label: 'Move Line Down', shortcut: '⌥↓' },
        { label: '', divider: true },
        { label: 'Add Cursor Above', shortcut: '⌥⌘↑' },
        { label: 'Add Cursor Below', shortcut: '⌥⌘↓' },
        { label: 'Add Cursors to Line Ends', shortcut: '⇧⌥I' },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Command Palette...', shortcut: '⇧⌘P', action: toggleCommandPalette },
        { label: 'Open View...', shortcut: '' },
        { label: '', divider: true },
        { label: 'Explorer', shortcut: '⇧⌘E', action: toggleSidebar },
        { label: 'Search', shortcut: '⇧⌘F' },
        { label: 'Source Control', shortcut: '⌃⇧G' },
        { label: 'Extensions', shortcut: '⇧⌘X' },
        { label: '', divider: true },
        { label: 'Terminal', shortcut: '⌃`', action: toggleTerminal },
        { label: 'Problems', shortcut: '⇧⌘M' },
        { label: 'Output', shortcut: '⇧⌘U' },
        { label: '', divider: true },
        { label: 'Appearance', shortcut: '→' },
        { label: 'Toggle Theme', shortcut: '', action: toggleTheme },
      ],
    },
    {
      label: 'Go',
      items: [
        { label: 'Back', shortcut: '⌃-' },
        { label: 'Forward', shortcut: '⌃⇧-' },
        { label: '', divider: true },
        { label: 'Go to File...', shortcut: '⌘P', action: toggleCommandPalette },
        { label: 'Go to Symbol...', shortcut: '⌘⇧O' },
        { label: '', divider: true },
        { label: 'Go to Line...', shortcut: '⌃G' },
        { label: 'Go to Definition', shortcut: 'F12' },
        { label: 'Go to Type Definition', shortcut: '' },
        { label: 'Go to References', shortcut: '⇧F12' },
        { label: '', divider: true },
        { label: 'Next Problem', shortcut: 'F8' },
        { label: 'Previous Problem', shortcut: '⇧F8' },
      ],
    },
    {
      label: 'Run',
      items: [
        { label: 'Start Debugging', shortcut: 'F5' },
        { label: 'Run Without Debugging', shortcut: '⌃F5' },
        { label: 'Stop Debugging', shortcut: '⇧F5', disabled: true },
        { label: 'Restart Debugging', shortcut: '⇧⌘F5', disabled: true },
        { label: '', divider: true },
        { label: 'Toggle Breakpoint', shortcut: 'F9' },
        { label: 'New Breakpoint', shortcut: '' },
        { label: '', divider: true },
        { label: 'Step Over', shortcut: 'F10', disabled: true },
        { label: 'Step Into', shortcut: 'F11', disabled: true },
        { label: 'Step Out', shortcut: '⇧F11', disabled: true },
      ],
    },
    {
      label: 'Terminal',
      items: [
        { label: 'New Terminal', shortcut: '⌃⇧`', action: toggleTerminal },
        { label: 'Split Terminal', shortcut: '⌘\\' },
        { label: '', divider: true },
        { label: 'Run Task...', shortcut: '' },
        { label: 'Run Build Task...', shortcut: '⇧⌘B' },
        { label: 'Run Active File', shortcut: '' },
        { label: '', divider: true },
        { label: 'Configure Tasks...', shortcut: '' },
        { label: 'Configure Default Build Task...', shortcut: '' },
      ],
    },
    {
      label: 'Help',
      items: [
        { label: 'Welcome', shortcut: '' },
        { label: 'Show All Commands', shortcut: '⇧⌘P', action: toggleCommandPalette },
        { label: 'Documentation', shortcut: '' },
        { label: 'Release Notes', shortcut: '' },
        { label: '', divider: true },
        { label: 'Report Issue', shortcut: '' },
        { label: '', divider: true },
        { label: 'View License', shortcut: '' },
        { label: 'Privacy Statement', shortcut: '' },
        { label: '', divider: true },
        { label: 'About', shortcut: '' },
      ],
    },
  ];

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
      }
    },
    []
  );

  useEffect(() => {
    if (activeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMenu, handleClickOutside, handleKeyDown]);

  const handleMenuClick = (label: string) => {
    setActiveMenu((prev) => (prev === label ? null : label));
  };

  const handleMenuHover = (label: string) => {
    if (activeMenu) {
      setActiveMenu(label);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled || item.divider) return;
    setActiveMenu(null);
    item.action?.();
  };

  return (
    <div
      ref={menuBarRef}
      className="flex items-center flex-shrink-0 select-none relative"
      style={{
        height: 30,
        background: 'var(--bg-titlebar)',
        borderBottom: '1px solid var(--border-primary)',
        zIndex: 200,
      }}
    >
      {/* macOS-style traffic lights */}
      <div className="flex items-center gap-2 px-3 flex-shrink-0">
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: '#FF5F57', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.12)' }}
        />
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: '#FEBC2E', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.12)' }}
        />
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: '#28C840', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.12)' }}
        />
      </div>

      {/* Menu items */}
      <div className="flex items-center gap-1">
        {menus.map((menu) => (
          <div key={menu.label} className="relative">
            <button
              className="px-3 py-1 text-xs rounded-sm font-semibold"
              style={{
                color: activeMenu === menu.label ? 'var(--text-active)' : 'var(--text-secondary)',
                background: activeMenu === menu.label ? 'var(--bg-hover)' : 'transparent',
                transition: 'background 100ms ease, color 100ms ease',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={() => handleMenuHover(menu.label)}
              onMouseDown={(e) => {
                e.preventDefault();
                handleMenuClick(menu.label);
              }}
            >
              {menu.label}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {activeMenu === menu.label && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.12, ease: 'easeOut' }}
                  className="absolute left-0 top-full mt-px rounded-md overflow-hidden shadow-2xl"
                  style={{
                    background: 'var(--bg-dropdown)',
                    border: '1px solid var(--border-primary)',
                    minWidth: 220,
                    backdropFilter: 'blur(16px)',
                    zIndex: 210,
                  }}
                >
                  <div className="py-1">
                    {menu.items.map((item, idx) => {
                      if (item.divider) {
                        return (
                          <div
                            key={`divider-${idx}`}
                            className="my-1"
                            style={{ height: 1, background: 'var(--border-primary)' }}
                          />
                        );
                      }
                      return (
                        <button
                          key={`${menu.label}-${item.label}-${idx}`}
                          className="flex items-center justify-between w-full px-3 py-1 text-xs text-left"
                          style={{
                            color: item.disabled ? 'var(--text-muted)' : 'var(--text-primary)',
                            cursor: item.disabled ? 'default' : 'pointer',
                            opacity: item.disabled ? 0.5 : 1,
                          }}
                          onMouseEnter={(e) => {
                            if (!item.disabled) {
                              (e.currentTarget as HTMLElement).style.background = 'var(--bg-selection)';
                              (e.currentTarget as HTMLElement).style.color = 'var(--text-active)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.color = item.disabled
                              ? 'var(--text-muted)'
                              : 'var(--text-primary)';
                          }}
                          onClick={() => handleItemClick(item)}
                        >
                          <span>{item.label}</span>
                          {item.shortcut && (
                            <span
                              className="ml-6"
                              style={{ color: 'var(--text-muted)', fontSize: 11 }}
                            >
                              {item.shortcut}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Spacer + Title */}
      <div className="flex-1 flex justify-center">
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Arslan SA — Portfolio
        </span>
      </div>

      {/* Right side window controls placeholder (for balance) */}
      <div className="w-16 flex-shrink-0" />
    </div>
  );
}
