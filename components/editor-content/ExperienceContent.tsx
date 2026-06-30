'use client';

interface CodeLineProps {
  lineNumber: number;
  children: React.ReactNode;
}

function CodeLine({ lineNumber, children }: CodeLineProps) {
  return (
    <div className="flex" style={{ minHeight: '20px', lineHeight: '20px' }}>
      <span
        className="inline-block text-right pr-4 select-none flex-shrink-0"
        style={{ width: '50px', color: 'var(--line-number)', fontSize: '13px' }}
      >
        {lineNumber}
      </span>
      <span>{children}</span>
    </div>
  );
}

const H = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--md-heading)', fontWeight: 'bold' }}>{children}</span>
);
const C = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-comment)' }}>{children}</span>
);
const Cl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-class)' }}>{children}</span>
);

export default function ExperienceContent() {
  return (
    <div className="py-2 font-mono text-[13px]" style={{ color: 'var(--text-primary)' }}>
      <CodeLine lineNumber={1}>
        <C>{'---'}</C>
      </CodeLine>
      <CodeLine lineNumber={2}>
        <C>{'title: Experience & Internships'}</C>
      </CodeLine>
      <CodeLine lineNumber={3}>
        <C>{'---'}</C>
      </CodeLine>
      <CodeLine lineNumber={4}>{''}</CodeLine>
      <CodeLine lineNumber={5}>
        <H>{'# 💼 Experience'}</H>
      </CodeLine>
      <CodeLine lineNumber={6}>{''}</CodeLine>
      <CodeLine lineNumber={7}>
        <H>{'## Open to Opportunities'}</H>
      </CodeLine>
      <CodeLine lineNumber={8}>{''}</CodeLine>
      <CodeLine lineNumber={9}>
        <span>{'Currently seeking internships and collaboration opportunities'}</span>
      </CodeLine>
      <CodeLine lineNumber={10}>
        <span>{'in Machine Learning, Data Science, and Software Engineering.'}</span>
      </CodeLine>
      <CodeLine lineNumber={11}>{''}</CodeLine>
      <CodeLine lineNumber={12}>
        <H>{'## 🛠️ What I Bring'}</H>
      </CodeLine>
      <CodeLine lineNumber={13}>{''}</CodeLine>
      <CodeLine lineNumber={14}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>
        <span>{'Strong foundation in Python and Data Science'}</span>
      </CodeLine>
      <CodeLine lineNumber={15}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>
        <span>{'Experience building ML models and data pipelines'}</span>
      </CodeLine>
      <CodeLine lineNumber={16}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>
        <span>{'Full-stack web development with modern frameworks'}</span>
      </CodeLine>
      <CodeLine lineNumber={17}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>
        <span>{'Cloud services and containerization experience'}</span>
      </CodeLine>
      <CodeLine lineNumber={18}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>
        <span>{'Passion for clean code and best practices'}</span>
      </CodeLine>
      <CodeLine lineNumber={19}>{''}</CodeLine>
      <CodeLine lineNumber={20}>
        <H>{'## 🚀 Projects as Experience'}</H>
      </CodeLine>
      <CodeLine lineNumber={21}>{''}</CodeLine>
      <CodeLine lineNumber={22}>
        <span>{'My real-world project portfolio demonstrates practical skills:'}</span>
      </CodeLine>
      <CodeLine lineNumber={23}>{''}</CodeLine>
      <CodeLine lineNumber={24}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>
        <span style={{ color: 'var(--md-bold)', fontWeight: 'bold' }}>{'AI Chatbot'}</span>
        <span>{' — End-to-end ML deployment with Flask API'}</span>
      </CodeLine>
      <CodeLine lineNumber={25}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>
        <span style={{ color: 'var(--md-bold)', fontWeight: 'bold' }}>{'Fraud Detection'}</span>
        <span>{' — Data pipeline + model training + evaluation'}</span>
      </CodeLine>
      <CodeLine lineNumber={26}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>
        <span style={{ color: 'var(--md-bold)', fontWeight: 'bold' }}>{'Recommender System'}</span>
        <span>{' — Collaborative filtering at scale'}</span>
      </CodeLine>
      {Array.from({ length: 15 }, (_, i) => (
        <CodeLine key={i + 27} lineNumber={i + 27}>{''}</CodeLine>
      ))}
    </div>
  );
}
