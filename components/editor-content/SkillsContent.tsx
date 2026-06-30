'use client';

import { CodeLine, K, S, C, Cl, V, F, P } from '@/components/ui/CodeLine';

export default function SkillsContent() {
  return (
    <div className="py-2 font-mono text-[13px]" style={{ color: 'var(--text-primary)' }}>
      <CodeLine lineNumber={1}><C>{'# -*- coding: utf-8 -*-'}</C></CodeLine>
      <CodeLine lineNumber={2}><C>{'"""'}</C></CodeLine>
      <CodeLine lineNumber={3}><C>{'    Skills & Technical Proficiency'}</C></CodeLine>
      <CodeLine lineNumber={4}><C>{'    Author: Arslan'}</C></CodeLine>
      <CodeLine lineNumber={5}><C>{'"""'}</C></CodeLine>
      <CodeLine lineNumber={6}>{''}</CodeLine>
      <CodeLine lineNumber={7}>
        <K>{'class '}</K><Cl>{'Skills'}</Cl><P>{'():'}</P>
      </CodeLine>
      <CodeLine lineNumber={8}>
        {'    '}<C>{'"""A comprehensive collection of technical skills."""'}</C>
      </CodeLine>
      <CodeLine lineNumber={9}>{''}</CodeLine>
      <CodeLine lineNumber={10}>{'    '}<V>{'languages'}</V>{' = ['}</CodeLine>
      <CodeLine lineNumber={11}>{'        '}<S>{'"Python"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={12}>{'        '}<S>{'"SQL"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={13}>{'        '}<S>{'"JavaScript"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={14}>{'        '}<S>{'"TypeScript"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={15}>{'    ]'}</CodeLine>
      <CodeLine lineNumber={16}>{''}</CodeLine>
      <CodeLine lineNumber={17}>{'    '}<V>{'frameworks'}</V>{' = ['}</CodeLine>
      <CodeLine lineNumber={18}>{'        '}<S>{'"Flask"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={19}>{'        '}<S>{'"Pandas"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={20}>{'        '}<S>{'"NumPy"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={21}>{'        '}<S>{'"Scikit-learn"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={22}>{'        '}<S>{'"TensorFlow"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={23}>{'        '}<S>{'"Next.js"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={24}>{'    ]'}</CodeLine>
      <CodeLine lineNumber={25}>{''}</CodeLine>
      <CodeLine lineNumber={26}>{'    '}<V>{'cloud'}</V>{' = ['}</CodeLine>
      <CodeLine lineNumber={27}>{'        '}<S>{'"AWS"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={28}>{'        '}<S>{'"Docker"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={29}>{'        '}<S>{'"GitHub Actions"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={30}>{'    ]'}</CodeLine>
      <CodeLine lineNumber={31}>{''}</CodeLine>
      <CodeLine lineNumber={32}>{'    '}<V>{'databases'}</V>{' = ['}</CodeLine>
      <CodeLine lineNumber={33}>{'        '}<S>{'"PostgreSQL"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={34}>{'        '}<S>{'"MongoDB"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={35}>{'        '}<S>{'"Redis"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={36}>{'    ]'}</CodeLine>
      <CodeLine lineNumber={37}>{''}</CodeLine>
      <CodeLine lineNumber={38}>{'    '}<V>{'tools'}</V>{' = ['}</CodeLine>
      <CodeLine lineNumber={39}>{'        '}<S>{'"Git"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={40}>{'        '}<S>{'"VS Code"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={41}>{'        '}<S>{'"Jupyter Notebook"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={42}>{'        '}<S>{'"Linux"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={43}>{'    ]'}</CodeLine>
      <CodeLine lineNumber={44}>{''}</CodeLine>
      <CodeLine lineNumber={45}>
        {'    '}<K>{'def '}</K><F>{'get_proficiency'}</F><P>{'('}</P><V>{'self'}</V><P>{', '}</P><V>{'skill'}</V><P>{'):'}</P>
      </CodeLine>
      <CodeLine lineNumber={46}>{'        '}<V>{'levels'}</V>{' = {'}</CodeLine>
      <CodeLine lineNumber={47}>{'            '}<S>{'"Python"'}</S>{': '}<S>{'"████████████████████ 90%"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={48}>{'            '}<S>{'"SQL"'}</S>{': '}<S>{'"████████████████░░░░ 80%"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={49}>{'            '}<S>{'"JavaScript"'}</S>{': '}<S>{'"████████████░░░░░░░░ 60%"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={50}>{'            '}<S>{'"Machine Learning"'}</S>{': '}<S>{'"██████████████████░░ 85%"'}</S><P>{','}</P></CodeLine>
      <CodeLine lineNumber={51}>{'        }'}</CodeLine>
      <CodeLine lineNumber={52}>{'        '}<K>{'return '}</K><V>{'levels'}</V>{'.'}<F>{'get'}</F>{'('}<V>{'skill'}</V>{', '}<S>{'"Not found"'}</S>{')'}</CodeLine>
      <CodeLine lineNumber={53}>{''}</CodeLine>
      <CodeLine lineNumber={54}>{''}</CodeLine>
      <CodeLine lineNumber={55}><C>{'# Initialize skills'}</C></CodeLine>
      <CodeLine lineNumber={56}><V>{'my_skills'}</V>{' = '}<Cl>{'Skills'}</Cl>{'()'}</CodeLine>
      {Array.from({ length: 15 }, (_, i) => (
        <CodeLine key={i + 57} lineNumber={i + 57}>{''}</CodeLine>
      ))}
    </div>
  );
}
