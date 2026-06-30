'use client';

import { CodeLine, H, C, Cl } from '@/components/ui/CodeLine';

export default function EducationContent() {
  return (
    <div className="py-2 font-mono text-[13px]" style={{ color: 'var(--text-primary)' }}>
      <CodeLine lineNumber={1}><C>{'---'}</C></CodeLine>
      <CodeLine lineNumber={2}><C>{'title: Education'}</C></CodeLine>
      <CodeLine lineNumber={3}><C>{'author: Arslan'}</C></CodeLine>
      <CodeLine lineNumber={4}><C>{'---'}</C></CodeLine>
      <CodeLine lineNumber={5}>{''}</CodeLine>
      <CodeLine lineNumber={6}><H>{'# 🎓 Education'}</H></CodeLine>
      <CodeLine lineNumber={7}>{''}</CodeLine>
      <CodeLine lineNumber={8}><H>{'## BS in Data Science'}</H></CodeLine>
      <CodeLine lineNumber={9}>{''}</CodeLine>
      <CodeLine lineNumber={10}><Cl>{'Indian Institute of Technology Madras'}</Cl></CodeLine>
      <CodeLine lineNumber={11}>{''}</CodeLine>
      <CodeLine lineNumber={12}>
        <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
          {"One of India's premier institutions for technology and science."}
        </span>
      </CodeLine>
      <CodeLine lineNumber={13}>{''}</CodeLine>
      <CodeLine lineNumber={14}><H>{'## 📚 Relevant Coursework'}</H></CodeLine>
      <CodeLine lineNumber={15}>{''}</CodeLine>
      <CodeLine lineNumber={16}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>🐍 Python Programming
      </CodeLine>
      <CodeLine lineNumber={17}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>📊 Statistics &amp; Probability
      </CodeLine>
      <CodeLine lineNumber={18}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>🤖 Machine Learning
      </CodeLine>
      <CodeLine lineNumber={19}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>🗄️ Database Management Systems
      </CodeLine>
      <CodeLine lineNumber={20}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>🧮 Data Structures &amp; Algorithms
      </CodeLine>
      <CodeLine lineNumber={21}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>📐 Linear Algebra
      </CodeLine>
      <CodeLine lineNumber={22}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>🧠 Deep Learning
      </CodeLine>
      <CodeLine lineNumber={23}>{''}</CodeLine>
      <CodeLine lineNumber={24}><H>{'## 🏆 Achievements'}</H></CodeLine>
      <CodeLine lineNumber={25}>{''}</CodeLine>
      <CodeLine lineNumber={26}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>Active contributor to open-source projects
      </CodeLine>
      <CodeLine lineNumber={27}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>Building real-world AI/ML applications
      </CodeLine>
      <CodeLine lineNumber={28}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>Competitive programming practice on LeetCode
      </CodeLine>
      {Array.from({ length: 15 }, (_, i) => (
        <CodeLine key={i + 29} lineNumber={i + 29}>{''}</CodeLine>
      ))}
    </div>
  );
}
