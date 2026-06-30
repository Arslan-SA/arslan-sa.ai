'use client';

import { useState } from 'react';
import { useIDE } from '@/hooks/useIDEState';
import { fileTree, getFileIcon, FileNode } from '@/lib/fileTree';
import { VscChevronDown, VscChevronRight, VscNewFile, VscCollapseAll, VscEllipsis } from 'react-icons/vsc';
import { 
  VscMarkdown, VscJson, VscCode, VscDatabase, VscFile, VscNotebook,
  VscSymbolMisc
} from 'react-icons/vsc';
import { motion, AnimatePresence } from 'framer-motion';

function FileIconComponent({ extension }: { extension?: string }) {
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
  return <Icon size={16} style={{ color, flexShrink: 0 }} />;
}

function TreeNode({ node, depth = 0, path = '' }: { node: FileNode; depth?: number; path?: string }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const { openFile } = useIDE();
  const currentPath = path ? `${path}/${node.name}` : node.name;

  if (node.type === 'file') {
    return (
      <motion.button
        className="flex items-center gap-1.5 w-full px-2 py-0.5 text-left group"
        style={{
          paddingLeft: `${depth * 16 + 22}px`,
          color: 'var(--text-primary)',
          fontSize: '13px',
        }}
        onClick={() =>
          openFile({
            name: node.name,
            path: currentPath,
            extension: node.extension,
            content: node.content,
          })
        }
        whileHover={{
          backgroundColor: 'var(--bg-hover)',
        }}
      >
        <FileIconComponent extension={node.extension} />
        <span className="truncate">{node.name}</span>
      </motion.button>
    );
  }

  return (
    <div>
      <motion.button
        className="flex items-center gap-1 w-full px-2 py-0.5 text-left font-semibold group"
        style={{
          paddingLeft: `${depth * 16 + 4}px`,
          color: 'var(--text-primary)',
          fontSize: '13px',
        }}
        onClick={() => setExpanded(!expanded)}
        whileHover={{
          backgroundColor: 'var(--bg-hover)',
        }}
      >
        {expanded ? <VscChevronDown size={16} /> : <VscChevronRight size={16} />}
        <span className="truncate uppercase tracking-wide" style={{ fontSize: depth === 0 ? '11px' : '13px' }}>
          {node.name}
        </span>
      </motion.button>

      <AnimatePresence initial={false}>
        {expanded && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            {node.children.map((child) => (
              <TreeNode
                key={child.name}
                node={child}
                depth={depth + 1}
                path={currentPath}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col" style={{ minWidth: 200 }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 text-xs uppercase tracking-wider flex-shrink-0"
        style={{ color: 'var(--text-muted)' }}
      >
        <span>Explorer</span>
        <div className="flex items-center gap-1">
          <button className="p-0.5 rounded hover:bg-[var(--bg-hover)]" title="New File" aria-label="New File">
            <VscNewFile size={16} />
          </button>
          <button className="p-0.5 rounded hover:bg-[var(--bg-hover)]" title="Collapse All" aria-label="Collapse All">
            <VscCollapseAll size={16} />
          </button>
          <button className="p-0.5 rounded hover:bg-[var(--bg-hover)]" title="More Actions" aria-label="More Actions">
            <VscEllipsis size={16} />
          </button>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-auto py-1 no-scrollbar">
        <TreeNode node={fileTree} depth={0} />
      </div>

      {/* Outline section */}
      <div style={{ borderTop: '1px solid var(--border-primary)' }}>
        <div
          className="flex items-center gap-1 px-4 py-2 text-xs uppercase tracking-wider cursor-pointer"
          style={{ color: 'var(--text-muted)' }}
        >
          <VscChevronRight size={14} />
          <span>Outline</span>
        </div>
      </div>

      {/* Timeline section */}
      <div style={{ borderTop: '1px solid var(--border-primary)' }}>
        <div
          className="flex items-center gap-1 px-4 py-2 text-xs uppercase tracking-wider cursor-pointer"
          style={{ color: 'var(--text-muted)' }}
        >
          <VscChevronRight size={14} />
          <span>Timeline</span>
        </div>
      </div>
    </div>
  );
}
