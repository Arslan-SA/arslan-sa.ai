'use client';

import { useIDE } from '@/hooks/useIDEState';
import { VscFiles, VscSearch, VscSourceControl, VscExtensions, VscMail, VscSettingsGear, VscAccount } from 'react-icons/vsc';
import { motion } from 'framer-motion';

const sidebarIcons = [
  { id: 'explorer', icon: VscFiles, label: 'Explorer' },
  { id: 'search', icon: VscSearch, label: 'Search' },
  { id: 'git', icon: VscSourceControl, label: 'Source Control' },
  { id: 'projects', icon: VscExtensions, label: 'Extensions' },
  { id: 'contact', icon: VscMail, label: 'Contact' },
];

const bottomIcons = [
  { id: 'account', icon: VscAccount, label: 'Account' },
  { id: 'settings', icon: VscSettingsGear, label: 'Settings' },
];

export default function ActivityBar() {
  const { state, setSidebarIcon } = useIDE();
  const { activeSidebarIcon, sidebarVisible } = state;

  return (
    <div
      className="flex flex-col items-center justify-between py-1 flex-shrink-0 w-12"
      style={{
        background: 'var(--bg-activitybar)',
        borderRight: '1px solid var(--border-primary)',
      }}
    >
      {/* Top icons */}
      <div className="flex flex-col items-center gap-0.5">
        {sidebarIcons.map(({ id, icon: Icon, label }) => {
          const isActive = activeSidebarIcon === id && sidebarVisible;
          return (
            <motion.button
              key={id}
              onClick={() => setSidebarIcon(id)}
              className="relative w-12 h-12 flex items-center justify-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={label}
              aria-label={label}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r"
                  style={{ background: 'var(--text-active)' }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <Icon
                size={24}
                style={{
                  color: isActive ? 'var(--text-active)' : 'var(--text-muted)',
                  transition: 'color var(--transition-fast)',
                }}
                className="group-hover:!text-white"
              />
              {/* Tooltip */}
              <div
                className="absolute left-14 px-2 py-1 text-xs whitespace-nowrap rounded opacity-0 group-hover:opacity-100 pointer-events-none z-50"
                style={{
                  background: 'var(--bg-dropdown)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)',
                  transition: 'opacity var(--transition-fast)',
                }}
              >
                {label}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-0.5">
        {bottomIcons.map(({ id, icon: Icon, label }) => (
          <motion.button
            key={id}
            className="w-12 h-12 flex items-center justify-center group relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={label}
            aria-label={label}
          >
            <Icon
              size={24}
              style={{ color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}
              className="group-hover:!text-white"
            />
            <div
              className="absolute left-14 px-2 py-1 text-xs whitespace-nowrap rounded opacity-0 group-hover:opacity-100 pointer-events-none z-50"
              style={{
                background: 'var(--bg-dropdown)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
                transition: 'opacity var(--transition-fast)',
              }}
            >
              {label}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
