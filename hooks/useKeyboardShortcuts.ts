'use client';

import { useEffect } from 'react';
import { useIDE } from './useIDEState';

export function useKeyboardShortcuts() {
  const { toggleSidebar, toggleTerminal, toggleCommandPalette } = useIDE();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const mod = isMac ? e.metaKey : e.ctrlKey;

      // Ctrl/Cmd + Shift + P → Command Palette
      if (mod && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }

      // Ctrl/Cmd + P → Command Palette in file mode
      if (mod && e.key === 'p') {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }

      // Ctrl/Cmd + B → Toggle Sidebar
      if (mod && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      // Ctrl/Cmd + ` → Toggle Terminal
      if (mod && e.key === '`') {
        e.preventDefault();
        toggleTerminal();
        return;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar, toggleTerminal, toggleCommandPalette]);
}
