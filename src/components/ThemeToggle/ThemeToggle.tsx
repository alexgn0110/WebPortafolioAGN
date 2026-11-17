import { FiMoon, FiSun } from 'react-icons/fi';
import type { Theme } from '../../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={onToggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {/* Keyed by theme so the swap animation (arc + follow through) replays on every toggle */}
      <span key={theme} className="swap-in" aria-hidden="true">
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </span>
    </button>
  );
}
