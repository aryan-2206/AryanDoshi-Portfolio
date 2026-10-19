import { useEffect } from 'react';

export function useKeyboardShortcuts(shortcuts = {}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isTyping = 
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) ||
        document.activeElement.isContentEditable;

      if (isTyping) return;

      Object.entries(shortcuts).forEach(([key, handler]) => {
        if (key === 'ctrl+k' && (e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          handler();
        } else if (key === 'escape' && e.key === 'Escape') {
          e.preventDefault();
          handler();
        } else if (key === 'd' && e.key.toLowerCase() === 'd') {
          e.preventDefault();
          handler();
        } else if (key === '?' && e.key === '?') {
          e.preventDefault();
          handler();
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
