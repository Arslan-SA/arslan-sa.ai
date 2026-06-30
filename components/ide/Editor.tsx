'use client';

import { useIDE } from '@/hooks/useIDEState';
import { VscChevronRight } from 'react-icons/vsc';
import ReadmeContent from '../editor-content/ReadmeContent';
import SkillsContent from '../editor-content/SkillsContent';
import ProjectsContent from '../editor-content/ProjectsContent';
import EducationContent from '../editor-content/EducationContent';
import ContactContent from '../editor-content/ContactContent';
import ExperienceContent from '../editor-content/ExperienceContent';

function getEditorContent(content?: string) {
  switch (content) {
    case 'readme': return <ReadmeContent />;
    case 'skills': return <SkillsContent />;
    case 'projects': return <ProjectsContent />;
    case 'education': return <EducationContent />;
    case 'contact': return <ContactContent />;
    case 'experience': return <ExperienceContent />;
    default: return <ReadmeContent />;
  }
}

export default function Editor() {
  const { state } = useIDE();
  const { tabs, activeTabId } = state;

  const activeTab = tabs.find((t) => t.id === activeTabId);

  if (!activeTab) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-4"
        style={{ color: 'var(--text-muted)' }}
      >
        <div className="text-6xl opacity-10 font-bold select-none">{'{ }'}</div>
        <p className="text-sm">No file is open</p>
        <p className="text-xs opacity-60">
          Open a file from the explorer or press{' '}
          <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-primary)' }}>
            Ctrl+P
          </kbd>
        </p>
      </div>
    );
  }

  // Build breadcrumb from path
  const pathParts = activeTab.path.split('/');

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div
        className="flex items-center gap-1 px-4 py-1 text-xs flex-shrink-0 overflow-x-auto no-scrollbar"
        style={{
          background: 'var(--bg-breadcrumb)',
          color: 'var(--text-muted)',
          borderBottom: '1px solid var(--border-primary)',
        }}
      >
        {pathParts.map((part, i) => (
          <span key={i} className="flex items-center gap-1 whitespace-nowrap">
            {i > 0 && <VscChevronRight size={12} />}
            <span
              className="hover:text-[var(--text-primary)] cursor-pointer"
              style={{ transition: 'color var(--transition-fast)' }}
            >
              {part}
            </span>
          </span>
        ))}
      </div>

      {/* Editor content */}
      <div className="flex-1 overflow-auto" style={{ background: 'var(--bg-editor)' }}>
        {getEditorContent(activeTab.content)}
      </div>
    </div>
  );
}
