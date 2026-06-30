'use client';

import { useIDE } from '@/hooks/useIDEState';
import { getFileIcon } from '@/lib/fileTree';
import { VscClose, VscCircleFilled } from 'react-icons/vsc';
import { VscMarkdown, VscJson, VscCode, VscDatabase, VscFile, VscNotebook, VscSymbolMisc } from 'react-icons/vsc';
import { motion, AnimatePresence } from 'framer-motion';

function TabIcon({ extension }: { extension?: string }) {
  const { color } = getFileIcon(extension);
  const iconMap: Record<string, React.ComponentType<{ size: number; style: React.CSSProperties }>> = {
    md: VscMarkdown,
    json: VscJson,
    py: VscCode,
    ts: VscCode,
    tsx: VscCode,
    sql: VscDatabase,
    yml: VscSymbolMisc,
    yaml: VscSymbolMisc,
    ipynb: VscNotebook,
  };
  const Icon = (extension && iconMap[extension]) || VscFile;
  return <Icon size={14} style={{ color, flexShrink: 0 }} />;
}

export default function TabBar() {
  const { state, setActiveTab, closeTab } = useIDE();
  const { tabs, activeTabId } = state;

  if (tabs.length === 0) return null;

  return (
    <div
      className="flex items-end overflow-x-auto no-scrollbar flex-shrink-0"
      style={{
        background: 'var(--bg-tab-inactive)',
        borderBottom: '1px solid var(--border-primary)',
        minHeight: 35,
      }}
    >
      <AnimatePresence initial={false}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <motion.div
              key={tab.id}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-shrink-0"
            >
              <button
                className="flex items-center gap-1.5 px-3 h-[35px] text-xs group relative"
                style={{
                  background: isActive ? 'var(--bg-tab-active)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  borderRight: '1px solid var(--border-primary)',
                  borderBottom: isActive ? 'none' : '1px solid var(--border-primary)',
                  marginBottom: isActive ? -1 : 0,
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                {/* Active top border */}
                {isActive && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{ background: 'var(--border-active)' }}
                  />
                )}
                <TabIcon extension={tab.extension} />
                <span className="whitespace-nowrap">{tab.name}</span>
                <span
                  className="ml-1 p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-[var(--bg-hover)]"
                  style={{ transition: 'opacity var(--transition-fast)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  role="button"
                  aria-label={`Close ${tab.name}`}
                >
                  <VscClose size={14} />
                </span>
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
