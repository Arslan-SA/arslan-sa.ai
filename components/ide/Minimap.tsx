'use client';

import { useEffect, useRef, useState } from 'react';

export default function Minimap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportTop, setViewportTop] = useState(0);

  // Generate fake minimap lines
  const lines = Array.from({ length: 60 }, (_, i) => {
    const width = Math.random() * 70 + 10;
    const indent = Math.random() > 0.7 ? Math.random() * 20 + 5 : 0;
    const opacity = Math.random() * 0.4 + 0.2;
    const isHighlight = Math.random() > 0.85;
    return { width, indent, opacity, isHighlight };
  });

  return (
    <div
      ref={containerRef}
      className="h-full relative cursor-pointer"
      style={{ background: 'var(--minimap-bg)', borderLeft: '1px solid var(--border-primary)' }}
    >
      {/* Viewport indicator */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: `${viewportTop}%`,
          height: '30%',
          background: 'var(--bg-hover)',
          opacity: 0.5,
          transition: 'top 0.1s ease',
        }}
      />

      {/* Minimap lines */}
      <div className="p-1.5 pt-2">
        {lines.map((line, i) => (
          <div
            key={i}
            className="mb-[1px]"
            style={{
              height: '2px',
              width: `${line.width}%`,
              marginLeft: `${line.indent}%`,
              background: line.isHighlight
                ? 'var(--syntax-keyword)'
                : 'var(--text-primary)',
              opacity: line.opacity,
              borderRadius: '1px',
            }}
          />
        ))}
      </div>
    </div>
  );
}
