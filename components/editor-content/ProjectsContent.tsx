'use client';

import { useState } from 'react';
import { CodeLine, K, S, C, V, Cl, P } from '@/components/ui/CodeLine';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  name: string;
  description: string;
  tech: string[];
  status: string;
  statusEmoji: string;
}

const projects: Project[] = [
  {
    name: 'AI Chatbot',
    description: 'An intelligent chatbot powered by OpenAI API with context-aware responses and conversation memory.',
    tech: ['Python', 'OpenAI', 'Flask'],
    status: 'Completed',
    statusEmoji: '✅',
  },
  {
    name: 'Fraud Detection',
    description: 'ML-based fraud detection system using ensemble methods to identify suspicious transactions.',
    tech: ['Python', 'Scikit-learn', 'Pandas'],
    status: 'In Progress',
    statusEmoji: '🔄',
  },
  {
    name: 'Portfolio IDE',
    description: 'This VS Code-inspired portfolio website built with modern web technologies.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    status: 'Live',
    statusEmoji: '🟢',
  },
  {
    name: 'Recommender System',
    description: 'Collaborative filtering-based recommendation engine for personalized content suggestions.',
    tech: ['Python', 'NumPy', 'Flask'],
    status: 'Completed',
    statusEmoji: '✅',
  },
];

function ProjectPreview({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute right-0 top-0 bottom-0 w-[320px] overflow-auto p-4"
      style={{
        background: 'var(--bg-sidebar)',
        borderLeft: '1px solid var(--border-primary)',
        zIndex: 10,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold" style={{ color: 'var(--text-active)' }}>
          Preview: {project.name}
        </span>
        <button
          onClick={onClose}
          className="text-xs px-2 py-0.5 rounded"
          style={{ background: 'var(--bg-hover)', color: 'var(--text-muted)' }}
        >
          ✕
        </button>
      </div>
      <div className="space-y-3 text-sm">
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Status: </span>
          <span>{project.statusEmoji} {project.status}</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Description:</span>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Tech Stack:</span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-xs"
                style={{ background: 'var(--bg-selection)', color: 'var(--syntax-class)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  let lineNum = 0;
  const line = () => ++lineNum;

  return (
    <div className="py-2 font-mono text-[13px] relative" style={{ color: 'var(--text-primary)' }}>
      <CodeLine lineNumber={line()}><C>{'// projects.tsx'}</C></CodeLine>
      <CodeLine lineNumber={line()}><C>{'// Click on a project name to see the preview panel →'}</C></CodeLine>
      <CodeLine lineNumber={line()}>{''}</CodeLine>
      <CodeLine lineNumber={line()}>
        <K>{'import '}</K><P>{'{ '}</P><Cl>{'Project'}</Cl><P>{' } '}</P><K>{'from '}</K><S>{'"@/types"'}</S><P>{';'}</P>
      </CodeLine>
      <CodeLine lineNumber={line()}>{''}</CodeLine>
      <CodeLine lineNumber={line()}>
        <K>{'export const '}</K><V>{'projects'}</V><P>{': '}</P><Cl>{'Project'}</Cl><P>{'[] = ['}</P>
      </CodeLine>

      {projects.map((project, idx) => (
        <div key={project.name}>
          <CodeLine lineNumber={line()}>{'  {'}</CodeLine>
          <CodeLine lineNumber={line()}>
            {'    '}<V>{'name'}</V><P>{': '}</P>
            <span
              className="cursor-pointer underline decoration-dotted hover:opacity-80"
              style={{ color: 'var(--syntax-string)', transition: 'opacity var(--transition-fast)' }}
              onClick={() => setSelectedProject(project)}
            >
              {`"${project.name}"`}
            </span>
            <P>{','}</P>
          </CodeLine>
          <CodeLine lineNumber={line()}>
            {'    '}<V>{'tech'}</V><P>{': ['}</P>
            {project.tech.map((t, i) => (
              <span key={t}>
                <S>{`"${t}"`}</S>
                {i < project.tech.length - 1 && <P>{', '}</P>}
              </span>
            ))}
            <P>{'],'}</P>
          </CodeLine>
          <CodeLine lineNumber={line()}>
            {'    '}<V>{'status'}</V><P>{': '}</P><S>{`"${project.statusEmoji} ${project.status}"`}</S><P>{','}</P>
          </CodeLine>
          <CodeLine lineNumber={line()}>
            {'    '}<V>{'description'}</V><P>{': '}</P><S>{`"${project.description}"`}</S><P>{','}</P>
          </CodeLine>
          <CodeLine lineNumber={line()}>
            {'  '}<P>{'}'}</P>{idx < projects.length - 1 ? <P>{','}</P> : null}
          </CodeLine>
        </div>
      ))}

      <CodeLine lineNumber={line()}><P>{'];'}</P></CodeLine>
      <CodeLine lineNumber={line()}>{''}</CodeLine>
      <CodeLine lineNumber={line()}><K>{'export default '}</K><V>{'projects'}</V><P>{';'}</P></CodeLine>

      {Array.from({ length: 10 }, (_, i) => (
        <CodeLine key={`empty-${i}`} lineNumber={line()}>{''}</CodeLine>
      ))}

      <AnimatePresence>
        {selectedProject && (
          <ProjectPreview project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
