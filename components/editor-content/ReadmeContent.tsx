'use client';

import { useState } from 'react';
import { CodeLine, C, H, Cl, BlinkingCursor } from '@/components/ui/CodeLine';

export default function ReadmeContent() {
  const [cursorLine] = useState(3);

  return (
    <div className="py-2 font-mono text-[13px]" style={{ color: 'var(--text-primary)' }}>
      <CodeLine lineNumber={1} isActive={cursorLine === 1}>
        <C>{'/**'}</C>
      </CodeLine>
      <CodeLine lineNumber={2} isActive={cursorLine === 2}>
        <C>{' * ──────────────────────────────────────────────'}</C>
      </CodeLine>
      <CodeLine lineNumber={3} isActive={cursorLine === 3}>
        <C>{' * @name      '}</C><Cl>Arslan</Cl>
        {cursorLine === 3 && <BlinkingCursor />}
      </CodeLine>
      <CodeLine lineNumber={4} isActive={cursorLine === 4}>
        <C>{' * @role      '}</C><span style={{ color: 'var(--syntax-string)' }}>Data Science Student</span>
      </CodeLine>
      <CodeLine lineNumber={5} isActive={cursorLine === 5}>
        <C>{' * @focus     '}</C><span style={{ color: 'var(--syntax-string)' }}>Machine Learning · Python · AI</span>
      </CodeLine>
      <CodeLine lineNumber={6} isActive={cursorLine === 6}>
        <C>{' * ──────────────────────────────────────────────'}</C>
      </CodeLine>
      <CodeLine lineNumber={7} isActive={cursorLine === 7}>
        <C>{' */'}</C>
      </CodeLine>
      <CodeLine lineNumber={8}>{''}</CodeLine>
      <CodeLine lineNumber={9}>
        <H>{'# Hi, I\'m Arslan 👋'}</H>
      </CodeLine>
      <CodeLine lineNumber={10}>{''}</CodeLine>
      <CodeLine lineNumber={11}>
        <span style={{ color: 'var(--syntax-string)', fontStyle: 'italic' }}>{'> Data Science Student | Machine Learning Enthusiast | Python Developer'}</span>
      </CodeLine>
      <CodeLine lineNumber={12}>{''}</CodeLine>
      <CodeLine lineNumber={13}>
        Building AI products that solve real-world problems.
      </CodeLine>
      <CodeLine lineNumber={14}>{''}</CodeLine>
      <CodeLine lineNumber={15}>
        <H>{'## 🎯 Current Focus'}</H>
      </CodeLine>
      <CodeLine lineNumber={16}>{''}</CodeLine>
      <CodeLine lineNumber={17}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>
        📊 Data Structures &amp; Algorithms
      </CodeLine>
      <CodeLine lineNumber={18}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>
        🤖 Machine Learning &amp; Deep Learning
      </CodeLine>
      <CodeLine lineNumber={19}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>
        ☁️ AWS Cloud Services
      </CodeLine>
      <CodeLine lineNumber={20}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>
        🐳 Docker &amp; DevOps
      </CodeLine>
      <CodeLine lineNumber={21}>
        <span style={{ color: 'var(--md-list)' }}>{'- '}</span>
        🌐 Open Source Contributions
      </CodeLine>
      <CodeLine lineNumber={22}>{''}</CodeLine>
      <CodeLine lineNumber={23}>
        <H>{'## 🎓 Currently Studying'}</H>
      </CodeLine>
      <CodeLine lineNumber={24}>{''}</CodeLine>
      <CodeLine lineNumber={25}>
        <span style={{ fontWeight: 'bold' }}>BS in Data Science</span>
      </CodeLine>
      <CodeLine lineNumber={26}>
        <Cl>Indian Institute of Technology Madras</Cl>
      </CodeLine>
      <CodeLine lineNumber={27}>{''}</CodeLine>
      <CodeLine lineNumber={28}>
        <H>{'## 🤝 Open to Collaborations'}</H>
      </CodeLine>
      <CodeLine lineNumber={29}>{''}</CodeLine>
      <CodeLine lineNumber={30}>
        {"I'm always interested in working on innovative AI/ML projects."}
      </CodeLine>
      <CodeLine lineNumber={31}>
        Feel free to reach out!
      </CodeLine>
      <CodeLine lineNumber={32}>{''}</CodeLine>
      <CodeLine lineNumber={33}>
        <C>{'// ---'}</C>
      </CodeLine>
      <CodeLine lineNumber={34}>
        <C>{'// 📬 Connect: github.com/Arslan-SA'}</C>
      </CodeLine>
      <CodeLine lineNumber={35}>
        <C>{'// 🔗 LinkedIn: linkedin.com/in/arslansa'}</C>
      </CodeLine>
      {Array.from({ length: 20 }, (_, i) => (
        <CodeLine key={i + 36} lineNumber={i + 36}>{''}</CodeLine>
      ))}
    </div>
  );
}
