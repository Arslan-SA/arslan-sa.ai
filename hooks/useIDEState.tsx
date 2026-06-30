'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';

export interface Tab {
  id: string;
  name: string;
  path: string;
  extension?: string;
  content?: string;
}

interface IDEState {
  tabs: Tab[];
  activeTabId: string | null;
  sidebarVisible: boolean;
  terminalVisible: boolean;
  commandPaletteVisible: boolean;
  theme: 'dark' | 'light';
  explorerWidth: number;
  terminalHeight: number;
  activeSidebarIcon: string;
}

type IDEAction =
  | { type: 'OPEN_FILE'; payload: Tab }
  | { type: 'CLOSE_TAB'; payload: string }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_TERMINAL' }
  | { type: 'TOGGLE_COMMAND_PALETTE' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_SIDEBAR_ICON'; payload: string }
  | { type: 'SET_TERMINAL_HEIGHT'; payload: number }
  | { type: 'SET_EXPLORER_WIDTH'; payload: number };

const initialState: IDEState = {
  tabs: [
    {
      id: 'about/README.md',
      name: 'README.md',
      path: 'ARSLAN/about/README.md',
      extension: 'md',
      content: 'readme',
    },
  ],
  activeTabId: 'about/README.md',
  sidebarVisible: true,
  terminalVisible: false,
  commandPaletteVisible: false,
  theme: 'dark',
  explorerWidth: 250,
  terminalHeight: 200,
  activeSidebarIcon: 'explorer',
};

function ideReducer(state: IDEState, action: IDEAction): IDEState {
  switch (action.type) {
    case 'OPEN_FILE': {
      const exists = state.tabs.find(t => t.id === action.payload.id);
      if (exists) {
        return { ...state, activeTabId: action.payload.id };
      }
      return {
        ...state,
        tabs: [...state.tabs, action.payload],
        activeTabId: action.payload.id,
      };
    }
    case 'CLOSE_TAB': {
      const newTabs = state.tabs.filter(t => t.id !== action.payload);
      let newActiveId = state.activeTabId;
      if (state.activeTabId === action.payload) {
        const idx = state.tabs.findIndex(t => t.id === action.payload);
        if (newTabs.length > 0) {
          newActiveId = newTabs[Math.min(idx, newTabs.length - 1)].id;
        } else {
          newActiveId = null;
        }
      }
      return { ...state, tabs: newTabs, activeTabId: newActiveId };
    }
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTabId: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarVisible: !state.sidebarVisible };
    case 'TOGGLE_TERMINAL':
      return { ...state, terminalVisible: !state.terminalVisible };
    case 'TOGGLE_COMMAND_PALETTE':
      return { ...state, commandPaletteVisible: !state.commandPaletteVisible };
    case 'TOGGLE_THEME': {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', newTheme);
      }
      return { ...state, theme: newTheme };
    }
    case 'SET_SIDEBAR_ICON':
      return {
        ...state,
        activeSidebarIcon: action.payload,
        sidebarVisible: state.activeSidebarIcon === action.payload && state.sidebarVisible
          ? false
          : true,
      };
    case 'SET_TERMINAL_HEIGHT':
      return { ...state, terminalHeight: action.payload };
    case 'SET_EXPLORER_WIDTH':
      return { ...state, explorerWidth: action.payload };
    default:
      return state;
  }
}

interface IDEContextType {
  state: IDEState;
  dispatch: React.Dispatch<IDEAction>;
  openFile: (file: { name: string; path: string; extension?: string; content?: string }) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  toggleSidebar: () => void;
  toggleTerminal: () => void;
  toggleCommandPalette: () => void;
  toggleTheme: () => void;
  setSidebarIcon: (icon: string) => void;
}

const IDEContext = createContext<IDEContextType | null>(null);

export function IDEProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(ideReducer, initialState);

  const openFile = useCallback((file: { name: string; path: string; extension?: string; content?: string }) => {
    const id = file.path.replace('ARSLAN/', '');
    dispatch({
      type: 'OPEN_FILE',
      payload: { id, name: file.name, path: file.path, extension: file.extension, content: file.content },
    });
  }, []);

  const closeTab = useCallback((id: string) => {
    dispatch({ type: 'CLOSE_TAB', payload: id });
  }, []);

  const setActiveTab = useCallback((id: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: id });
  }, []);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, []);

  const toggleTerminal = useCallback(() => {
    dispatch({ type: 'TOGGLE_TERMINAL' });
  }, []);

  const toggleCommandPalette = useCallback(() => {
    dispatch({ type: 'TOGGLE_COMMAND_PALETTE' });
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, []);

  const setSidebarIcon = useCallback((icon: string) => {
    dispatch({ type: 'SET_SIDEBAR_ICON', payload: icon });
  }, []);

  return (
    <IDEContext.Provider
      value={{
        state,
        dispatch,
        openFile,
        closeTab,
        setActiveTab,
        toggleSidebar,
        toggleTerminal,
        toggleCommandPalette,
        toggleTheme,
        setSidebarIcon,
      }}
    >
      {children}
    </IDEContext.Provider>
  );
}

export function useIDE() {
  const context = useContext(IDEContext);
  if (!context) {
    throw new Error('useIDE must be used within an IDEProvider');
  }
  return context;
}
