'use client';

import { useIDE } from '@/hooks/useIDEState';
import { getLanguageName } from '@/lib/fileTree';
import {
  VscSourceControl, VscError, VscWarning, VscBell, VscFeedback,
  VscRemote, VscCheck, VscSync
} from 'react-icons/vsc';

export default function StatusBar() {
  const { state, toggleTerminal } = useIDE();
  const { tabs, activeTabId } = state;
  const activeTab = tabs.find((t) => t.id === activeTabId);
  const language = getLanguageName(activeTab?.extension);

  return (
    <div
      className="flex items-center justify-between px-2 flex-shrink-0 select-none"
      style={{
        height: '22px',
        background: 'var(--bg-statusbar)',
        color: 'var(--text-statusbar)',
        fontSize: '12px',
      }}
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Remote indicator */}
        <button
          className="flex items-center gap-1 hover:bg-white/10 px-1 rounded"
          title="Remote"
        >
          <VscRemote size={14} />
        </button>

        {/* Git branch */}
        <button className="flex items-center gap-1 hover:bg-white/10 px-1 rounded">
          <VscSourceControl size={14} />
          <span>main</span>
          <VscSync size={12} />
        </button>

        {/* Errors & Warnings */}
        <button className="flex items-center gap-2 hover:bg-white/10 px-1 rounded">
          <span className="flex items-center gap-0.5">
            <VscError size={14} />
            <span>0</span>
          </span>
          <span className="flex items-center gap-0.5">
            <VscWarning size={14} />
            <span>0</span>
          </span>
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Terminal toggle */}
        <button
          className="flex items-center gap-1 hover:bg-white/10 px-1 rounded"
          onClick={toggleTerminal}
          title="Toggle Terminal (Ctrl+`)"
        >
          <span>Terminal</span>
        </button>

        {/* Line & Column */}
        <button className="hover:bg-white/10 px-1 rounded">
          Ln 1, Col 1
        </button>

        {/* Spaces */}
        <button className="hover:bg-white/10 px-1 rounded">
          Spaces: 2
        </button>

        {/* Encoding */}
        <button className="hover:bg-white/10 px-1 rounded">
          UTF-8
        </button>

        {/* Language */}
        <button className="hover:bg-white/10 px-1 rounded">
          {language}
        </button>

        {/* Git Connected */}
        <span className="flex items-center gap-1">
          <VscCheck size={12} />
          <span>Git</span>
        </span>

        {/* AWS Ready */}
        <span className="hidden sm:inline">AWS Ready</span>

        {/* Open to Work */}
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full glow-pulse" style={{ background: '#4EC9B0' }} />
          <span className="hidden sm:inline">Open to Work</span>
        </span>

        {/* Notifications */}
        <button className="hover:bg-white/10 px-1 rounded" title="Notifications">
          <VscBell size={14} />
        </button>
      </div>
    </div>
  );
}
