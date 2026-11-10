import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { FiCornerDownLeft, FiSearch } from 'react-icons/fi';
import styles from './CommandPalette.module.css';

export interface Command {
  id: string;
  label: string;
  group: string;
  icon: ReactNode;
  keywords?: string;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  commands: Command[];
}

const matches = (command: Command, query: string) => {
  const haystack = `${command.label} ${command.group} ${command.keywords ?? ''}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
};

export function CommandPalette({ open, onClose, commands }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const listId = useId();

  const results = useMemo(() => commands.filter((c) => matches(c, query)), [commands, query]);

  // Open: remember focus, lock scroll, focus the input. Close: restore everything.
  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      returnFocusRef.current?.focus();
      setQuery('');
      setActiveIndex(0);
    };
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  if (!open) return null;

  const runCommand = (command: Command | undefined) => {
    if (!command) return;
    onClose();
    // Let the dialog unmount (and focus return) before the command scrolls or navigates.
    requestAnimationFrame(() => command.run());
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
        break;
      case 'Enter':
        event.preventDefault();
        runCommand(results[activeIndex]);
        break;
      case 'Escape':
        event.preventDefault();
        onClose();
        break;
      case 'Tab':
        // Focus stays on the search field while the modal is open.
        event.preventDefault();
        break;
    }
  };

  let lastGroup = '';
  const optionId = (index: number) => `${listId}-option-${index}`;

  return (
    // Clicking the backdrop closes the menu; keyboard users close it with Escape.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={styles.overlay} onMouseDown={onClose}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className={styles.dialog}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className={styles.search}>
          <FiSearch aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={results.length ? optionId(activeIndex) : undefined}
            aria-label="Search commands"
            placeholder="Jump to a section, copy email, switch theme…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
          <kbd>Esc</kbd>
        </div>

        <ul id={listId} ref={listRef} role="listbox" aria-label="Commands" className={styles.list}>
          {results.length === 0 && (
            <li role="presentation" className={styles.empty}>
              No results for “{query}”
            </li>
          )}
          {results.map((command, index) => {
            const header = command.group !== lastGroup ? command.group : null;
            lastGroup = command.group;
            return (
              <li key={command.id} role="presentation">
                {header && (
                  <p className={styles.group} aria-hidden="true">
                    {header}
                  </p>
                )}
                {/* Keyboard selection is handled by the combobox input (aria-activedescendant). */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                <div
                  id={optionId(index)}
                  role="option"
                  aria-selected={index === activeIndex}
                  data-index={index}
                  className={styles.option}
                  onMouseMove={() => setActiveIndex(index)}
                  onClick={() => runCommand(command)}
                  tabIndex={-1}
                >
                  <span className={styles.icon} aria-hidden="true">
                    {command.icon}
                  </span>
                  {command.label}
                  {index === activeIndex && (
                    <FiCornerDownLeft className={styles.enter} aria-hidden="true" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <p className={styles.footer} aria-hidden="true">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
        </p>
      </div>
    </div>
  );
}
