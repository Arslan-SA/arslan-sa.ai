'use client';

import React from 'react';

/* ===== Shared Code Line Component ===== */
interface CodeLineProps {
  lineNumber: number;
  children: React.ReactNode;
  indent?: number;
  isActive?: boolean;
}

export function CodeLine({ lineNumber, children, indent = 0, isActive }: CodeLineProps) {
  return (
    <div
      className="flex"
      style={{
        background: isActive ? 'var(--bg-line-highlight)' : 'transparent',
        minHeight: '20px',
        lineHeight: '20px',
      }}
    >
      <span
        className="inline-block text-right pr-6 select-none flex-shrink-0"
        style={{
          width: '60px',
          minWidth: '60px',
          color: isActive ? 'var(--line-number-active)' : 'var(--line-number)',
          fontSize: '13px',
        }}
      >
        {lineNumber}
      </span>
      <span style={{ paddingLeft: indent ? `${indent * 16}px` : undefined }}>
        {children}
      </span>
    </div>
  );
}

/* ===== Syntax Highlighting Tokens ===== */
export const K = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-keyword)' }}>{children}</span>
);

export const S = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-string)' }}>{children}</span>
);

export const C = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-comment)' }}>{children}</span>
);

export const F = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-function)' }}>{children}</span>
);

export const Cl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-class)' }}>{children}</span>
);

export const V = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-variable)' }}>{children}</span>
);

export const N = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-number)' }}>{children}</span>
);

export const P = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--syntax-punctuation)' }}>{children}</span>
);

export const H = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--md-heading)', fontWeight: 'bold' }}>{children}</span>
);

export const Lk = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--md-link)' }}>{children}</span>
);

/* ===== Blinking Cursor ===== */
export function BlinkingCursor() {
  return (
    <span
      className="cursor-blink inline-block"
      style={{
        width: '2px',
        height: '15px',
        background: 'var(--text-primary)',
        verticalAlign: 'text-bottom',
        marginLeft: '1px',
      }}
    />
  );
}
