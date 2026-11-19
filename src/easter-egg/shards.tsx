import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import styles from './shards.module.css';

/**
 * A small hidden easter egg: three faint triangles live in the hero, the skills
 * section and the footer. Hovering each one lights it up; once all three are
 * found they assemble into a single golden triangle of three next to the footer
 * copyright. Decorative only, so it stays out of the tab order and the
 * accessibility tree.
 */

export type ShardId = 'hero' | 'skills' | 'footer';
const ALL: ShardId[] = ['hero', 'skills', 'footer'];

interface ShardsState {
  found: ReadonlySet<ShardId>;
  find: (id: ShardId) => void;
  complete: boolean;
}

const ShardsContext = createContext<ShardsState | null>(null);

export function ShardsProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<ReadonlySet<ShardId>>(() => new Set());

  const find = useCallback((id: ShardId) => {
    setFound((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev).add(id);
      if (next.size === ALL.length) {
        console.info(
          '%c▲ All three pieces found. Courage, wisdom and power — thanks for exploring.',
          'color: #e9b949; font-weight: 600',
        );
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ found, find, complete: found.size === ALL.length }),
    [found, find],
  );
  return <ShardsContext.Provider value={value}>{children}</ShardsContext.Provider>;
}

function useShards(): ShardsState {
  const ctx = useContext(ShardsContext);
  if (!ctx) throw new Error('useShards must be used inside <ShardsProvider>');
  return ctx;
}

const Triangle = () => (
  <svg viewBox="0 0 10 9" aria-hidden="true" focusable="false">
    <polygon points="5,0 10,9 0,9" />
  </svg>
);

/** The three pieces assembled: each one flies in from its own side, then a soft glow. */
const AssembledSet = () => (
  <svg className={styles.set} viewBox="0 0 20 18" data-triforce="complete" focusable="false">
    <polygon className={styles.top} points="10,0 15,9 5,9" />
    <polygon className={styles.left} points="5,9 10,18 0,18" />
    <polygon className={styles.right} points="15,9 20,18 10,18" />
  </svg>
);

/**
 * One hidden piece. Lights up (and stays lit) the first time the pointer passes over it.
 * Once all three are found, every piece transforms into the assembled set in place.
 */
export function Shard({ id, className = '' }: { id: ShardId; className?: string | undefined }) {
  const { found, find, complete } = useShards();
  return (
    <span
      className={`${styles.shard} ${className}`}
      data-shard={id}
      data-found={found.has(id)}
      data-complete={complete}
      aria-hidden="true"
      onPointerEnter={() => find(id)}
    >
      {complete ? <AssembledSet /> : <Triangle />}
    </span>
  );
}

/** Footer slot: the piece sits inline, right after the copyright line. */
export function FooterShard() {
  return <Shard id="footer" className={styles.inline} />;
}
