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

const K = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-keyword)' }}>{children}</span>
);
const S = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-string)' }}>{children}</span>
);
const V = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-variable)' }}>{children}</span>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-punctuation)' }}>{children}</span>
);
const C = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-comment)' }}>{children}</span>
);
const Cl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-class)' }}>{children}</span>
);

export default function ContactContent() {
  return (
    <div className="py-2 font-mono text-[13px]" style={{ color: 'var(--text-primary)' }}>
      <CodeLine lineNumber={1}>
        <C>{'// contact.json'}</C>
      </CodeLine>
      <CodeLine lineNumber={2}>
        <C>{'// Feel free to reach out! 📬'}</C>
      </CodeLine>
      <CodeLine lineNumber={3}>{''}</CodeLine>
      <CodeLine lineNumber={4}>
        <P>{'{'}</P>
      </CodeLine>
      <CodeLine lineNumber={5}>
        {'  '}<V>{'"name"'}</V><P>{': '}</P><S>{'"Arslan"'}</S><P>{','}</P>
      </CodeLine>
      <CodeLine lineNumber={6}>{''}</CodeLine>
      <CodeLine lineNumber={7}>
        {'  '}<V>{'"socials"'}</V><P>{': {'}</P>
      </CodeLine>
      <CodeLine lineNumber={8}>
        {'    '}<V>{'"github"'}</V><P>{': '}</P>
        <a
          href="https://github.com/Arslan-SA"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted hover:opacity-80"
          style={{ color: 'var(--syntax-string)', transition: 'opacity var(--transition-fast)' }}
        >
          {'"https://github.com/Arslan-SA"'}
        </a>
        <P>{','}</P>
      </CodeLine>
      <CodeLine lineNumber={9}>
        {'    '}<V>{'"linkedin"'}</V><P>{': '}</P>
        <a
          href="https://linkedin.com/in/arslansa"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted hover:opacity-80"
          style={{ color: 'var(--syntax-string)', transition: 'opacity var(--transition-fast)' }}
        >
          {'"https://linkedin.com/in/arslansa"'}
        </a>
        <P>{','}</P>
      </CodeLine>
      <CodeLine lineNumber={10}>
        {'    '}<V>{'"email"'}</V><P>{': '}</P>
        <a
          href="mailto:arslan@example.com"
          className="underline decoration-dotted hover:opacity-80"
          style={{ color: 'var(--syntax-string)', transition: 'opacity var(--transition-fast)' }}
        >
          {'"arslan@example.com"'}
        </a>
        <P>{','}</P>
      </CodeLine>
      <CodeLine lineNumber={11}>
        {'    '}<V>{'"leetcode"'}</V><P>{': '}</P>
        <a
          href="https://leetcode.com/arslansa"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted hover:opacity-80"
          style={{ color: 'var(--syntax-string)', transition: 'opacity var(--transition-fast)' }}
        >
          {'"https://leetcode.com/arslansa"'}
        </a>
      </CodeLine>
      <CodeLine lineNumber={12}>
        {'  '}<P>{'}'}</P><P>{','}</P>
      </CodeLine>
      <CodeLine lineNumber={13}>{''}</CodeLine>
      <CodeLine lineNumber={14}>
        {'  '}<V>{'"availability"'}</V><P>{': '}</P><S>{'"Open to Work 🟢"'}</S><P>{','}</P>
      </CodeLine>
      <CodeLine lineNumber={15}>
        {'  '}<V>{'"interests"'}</V><P>{': ['}</P>
      </CodeLine>
      <CodeLine lineNumber={16}>
        {'    '}<S>{'"Machine Learning Engineering"'}</S><P>{','}</P>
      </CodeLine>
      <CodeLine lineNumber={17}>
        {'    '}<S>{'"Data Science"'}</S><P>{','}</P>
      </CodeLine>
      <CodeLine lineNumber={18}>
        {'    '}<S>{'"Full-Stack Development"'}</S><P>{','}</P>
      </CodeLine>
      <CodeLine lineNumber={19}>
        {'    '}<S>{'"Open Source"'}</S>
      </CodeLine>
      <CodeLine lineNumber={20}>
        {'  '}<P>{']'}</P><P>{','}</P>
      </CodeLine>
      <CodeLine lineNumber={21}>{''}</CodeLine>
      <CodeLine lineNumber={22}>
        {'  '}<V>{'"location"'}</V><P>{': '}</P><S>{'"India 🇮🇳"'}</S>
      </CodeLine>
      <CodeLine lineNumber={23}>
        <P>{'}'}</P>
      </CodeLine>
      {Array.from({ length: 15 }, (_, i) => (
        <CodeLine key={i + 24} lineNumber={i + 24}>{''}</CodeLine>
      ))}
    </div>
  );
}
