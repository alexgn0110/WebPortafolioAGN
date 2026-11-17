import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { FiPlay, FiSquare } from 'react-icons/fi';
import { principleGroups, principles, type PrincipleGroup } from '../../data/principles';
import { Section } from '../Section/Section';
import { Demo } from './demos';
import styles from './Principles.module.css';

export function Principles() {
  const [group, setGroup] = useState<PrincipleGroup>('animation');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const visible = principles.filter((p) => p.group === group);
  const startIndex = principles.findIndex((p) => p.group === group);

  // WAI-ARIA tabs pattern: arrow keys move between tabs, Home/End jump to the ends.
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = principleGroups.length - 1;
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % principleGroups.length
        : event.key === 'ArrowLeft'
          ? (index - 1 + principleGroups.length) % principleGroups.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    const target = principleGroups[next];
    if (!target) return;
    setGroup(target.id);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="principles" index={5} title="Motion & UX principles">
      <p className={styles.intro}>
        The motion and interaction rules this site is built on. Hover or tap a card to play its demo
        — each one notes where you’ll find it on this page.
      </p>

      <div role="tablist" aria-label="Principle groups" className={styles.tabs}>
        {principleGroups.map((g, index) => {
          const selected = g.id === group;
          const count = principles.filter((p) => p.group === g.id).length;
          return (
            <button
              key={g.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${g.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              onClick={() => setGroup(g.id)}
              onKeyDown={(e) => onTabKeyDown(e, index)}
            >
              {g.label} <span className={styles.count}>{count}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${group}`}
        className={styles.grid}
      >
        {visible.map((principle, i) => (
          <PrincipleCard
            key={principle.id}
            number={startIndex + i + 1}
            id={principle.id}
            name={principle.name}
            definition={principle.definition}
            onSite={principle.onSite}
          />
        ))}
      </div>
    </Section>
  );
}

interface PrincipleCardProps {
  number: number;
  id: string;
  name: string;
  definition: string;
  onSite: string;
}

function PrincipleCard({ number, id, name, definition, onSite }: PrincipleCardProps) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className={`card ${styles.card}`} data-playing={playing} aria-labelledby={`p-${id}`}>
      <header className={styles.cardHead}>
        <span className={styles.number} aria-hidden="true">
          {String(number).padStart(2, '0')}
        </span>
        <h3 id={`p-${id}`} className={styles.name}>
          {name}
        </h3>
        <button
          type="button"
          className={`icon-btn ${styles.play}`}
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={playing}
          aria-label={`${playing ? 'Stop' : 'Play'} the ${name} demo`}
        >
          {playing ? <FiSquare aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
        </button>
      </header>
      <Demo id={id} />
      <p className={styles.definition}>{definition}</p>
      <p className={styles.onSite}>
        <span className={styles.onSiteLabel}>On this site</span> {onSite}
      </p>
    </article>
  );
}
