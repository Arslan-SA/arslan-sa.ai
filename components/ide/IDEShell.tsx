'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useIDE } from '@/hooks/useIDEState';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import ActivityBar from './ActivityBar';
import Sidebar from './Sidebar';
import TabBar from './TabBar';
import Editor from './Editor';
import Minimap from './Minimap';
import StatusBar from './StatusBar';
import Terminal from './Terminal';
import CommandPalette from './CommandPalette';
import MenuBar from './MenuBar';
import { AnimatePresence, motion } from 'framer-motion';

export default function IDEShell() {
  useKeyboardShortcuts();
  const { state, setTerminalVisible } = useIDE();
  const { sidebarVisible, terminalVisible, commandPaletteVisible } = state;

  // Auto-open terminal on first load for boot animation
  const [autoOpened, setAutoOpened] = useState(false);
  useEffect(() => {
    if (!autoOpened) {
      const timer = setTimeout(() => {
        setTerminalVisible(true);
        setAutoOpened(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoOpened, setTerminalVisible]);

  // Resizable terminal state
  const [terminalHeight, setTerminalHeight] = useState(220);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(220);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    startY.current = e.clientY;
    startHeight.current = terminalHeight;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  }, [terminalHeight]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = startY.current - e.clientY;
      const newHeight = Math.max(100, Math.min(600, startHeight.current + delta));
      setTerminalHeight(newHeight);
    };

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden" style={{ background: 'var(--bg-editor)' }}>
      {/* Menu Bar */}
      <MenuBar />

      {/* Main content area */}
      <div className="flex flex-1 min-h-0">
        {/* Activity Bar */}
        <ActivityBar />

        {/* Sidebar */}
        <AnimatePresence>
          {sidebarVisible && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex-shrink-0 overflow-hidden hidden md:block"
              style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-primary)' }}
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarVisible && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40 md:hidden"
                onClick={() => state.sidebarVisible && state.activeSidebarIcon}
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="fixed left-12 top-0 bottom-0 w-[260px] z-50 md:hidden overflow-auto"
                style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-primary)' }}
              >
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Editor area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Tabs */}
          <TabBar />

          {/* Editor + Minimap */}
          <div className="flex flex-1 min-h-0">
            <div className="flex-1 min-w-0 overflow-auto">
              <Editor />
            </div>

            {/* Minimap */}
            <div className="hidden md:block flex-shrink-0" style={{ width: 64 }}>
              <Minimap />
            </div>
          </div>

          {/* Terminal */}
          <AnimatePresence>
            {terminalVisible && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: terminalHeight }}
                exit={{ height: 0 }}
                transition={isDragging.current ? { duration: 0 } : { duration: 0.2, ease: 'easeInOut' }}
                className="flex-shrink-0 overflow-hidden relative"
                style={{
                  borderTop: '1px solid var(--border-primary)',
                  height: terminalHeight,
                }}
              >
                {/* Resize handle */}
                <div
                  onMouseDown={handleMouseDown}
                  className="absolute top-0 left-0 right-0 z-10"
                  style={{
                    height: 4,
                    cursor: 'row-resize',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--border-active)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isDragging.current) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }
                  }}
                />
                <Terminal />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar />

      {/* Command Palette */}
      <AnimatePresence>
        {commandPaletteVisible && <CommandPalette />}
      </AnimatePresence>
    </div>
  );
}
