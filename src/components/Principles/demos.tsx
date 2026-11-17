import { useRef, useState, type CSSProperties } from 'react';
import { FiCheck, FiHeart, FiLoader } from 'react-icons/fi';
import { cleanField } from '../../lib/clean';
import styles from './Principles.module.css';

/**
 * One small demo per principle. Decorative demos are CSS-only and aria-hidden;
 * they play while the card is hovered or its Play button is pressed.
 * Interactive demos (Doherty, Postel, frequency of use) are real, labelled controls.
 */
export function Demo({ id }: { id: string }) {
  switch (id) {
    case 'doherty':
      return <DohertyDemo />;
    case 'postel':
      return <PostelDemo />;
    case 'frequency':
      return <FrequencyDemo />;
    default:
      return (
        <div className={`${styles.stage} ${styles[id] ?? ''}`} aria-hidden="true">
          <StaticDemo id={id} />
        </div>
      );
  }
}

function StaticDemo({ id }: { id: string }) {
  switch (id) {
    case 'squash-stretch':
      return (
        <>
          <span className={styles.ball} />
          <span className={styles.floor} />
        </>
      );
    case 'anticipation':
    case 'slow-in-out':
      return id === 'anticipation' ? (
        <span className={styles.box} />
      ) : (
        <>
          <span className={styles.lane}>
            <span className={`${styles.dot} ${styles.linear}`} />
            <small>linear</small>
          </span>
          <span className={styles.lane}>
            <span className={`${styles.dot} ${styles.eased}`} />
            <small>ease-in-out</small>
          </span>
        </>
      );
    case 'staging':
      return (
        <div className={styles.row}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      );
    case 'pose-to-pose':
      return (
        <>
          <span className={`${styles.ghost} ${styles.g1}`} />
          <span className={`${styles.ghost} ${styles.g2}`} />
          <span className={`${styles.ghost} ${styles.g3}`} />
          <span className={styles.box} />
        </>
      );
    case 'follow-through':
      return (
        <span className={styles.body}>
          <span className={styles.tail} />
        </span>
      );
    case 'arcs':
      return (
        <>
          <svg className={styles.path} viewBox="0 0 220 100" preserveAspectRatio="none">
            <path d="M 10 90 Q 110 -20 210 90" />
          </svg>
          <span className={styles.arcTrack}>
            <span className={styles.dot} />
          </span>
        </>
      );
    case 'secondary-action':
      return (
        <span className={styles.pressWrap}>
          <span className={styles.press}>Save</span>
          <span className={`${styles.spark} ${styles.s1}`} />
          <span className={`${styles.spark} ${styles.s2}`} />
          <span className={`${styles.spark} ${styles.s3}`} />
          <span className={`${styles.spark} ${styles.s4}`} />
        </span>
      );
    case 'snappy-timing':
      return (
        <>
          <span className={styles.timing}>
            <small>200ms</small>
            <span className={`${styles.bar} ${styles.fast}`} />
          </span>
          <span className={styles.timing}>
            <small>800ms</small>
            <span className={`${styles.bar} ${styles.slow}`} />
          </span>
        </>
      );
    case 'exaggerated-feedback':
      return (
        <span className={styles.heart}>
          <FiHeart />
        </span>
      );
    case 'solid-drawing':
      return (
        <span className={styles.slab}>
          <span />
          <span />
        </span>
      );
    case 'appeal':
      return (
        <span className={styles.toast}>
          <span className={styles.toastIcon}>
            <FiCheck />
          </span>
          Changes saved
          <span className={styles.toastBar} />
        </span>
      );
    case 'fitts':
      return (
        <>
          <span className={`${styles.target} ${styles.big}`} />
          <span className={`${styles.target} ${styles.small}`} />
          <span className={styles.cursor} />
        </>
      );
    case 'hit-areas':
      return (
        <span className={styles.hitDemo}>
          <span className={styles.hitZone} />
          <FiHeart />
        </span>
      );
    case 'hick':
      return (
        <div className={styles.hickCols}>
          <span className={styles.hickList}>
            {Array.from({ length: 2 }, (_, i) => (
              <span key={i} />
            ))}
          </span>
          <span className={`${styles.hickList} ${styles.many}`}>
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} />
            ))}
          </span>
        </div>
      );
    case 'miller':
      return (
        <span className={styles.digits}>
          <span>555</span>
          <span>123</span>
          <span>4567</span>
        </span>
      );
    case 'jakob':
      return (
        <span className={styles.browser}>
          <span className={styles.chrome}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.nav}>
            <b />
            <span>
              <em />
              <em />
              <em />
            </span>
          </span>
          <span className={styles.content} />
        </span>
      );
    default:
      return null;
  }
}

/** Doherty threshold: compare feedback that lands instantly with feedback that lags. */
function DohertyDemo() {
  const [fast, setFast] = useState(false);
  const [slow, setSlow] = useState<'idle' | 'waiting' | 'done'>('idle');
  const timers = useRef<number[]>([]);

  const reset = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  return (
    <div className={`${styles.stage} ${styles.interactive}`}>
      <button
        type="button"
        className={styles.miniBtn}
        onClick={() => {
          setFast(true);
          reset(() => setFast(false), 1200);
        }}
      >
        {fast ? <FiCheck aria-hidden="true" /> : null} Instant
      </button>
      <button
        type="button"
        className={styles.miniBtn}
        onClick={() => {
          if (slow !== 'idle') return;
          setSlow('waiting');
          reset(() => setSlow('done'), 1200);
          reset(() => setSlow('idle'), 2400);
        }}
      >
        {slow === 'waiting' ? (
          <FiLoader aria-hidden="true" className={styles.spin} />
        ) : slow === 'done' ? (
          <FiCheck aria-hidden="true" />
        ) : null}{' '}
        1.2s lag
      </button>
    </div>
  );
}

/** Postel's law: type messy input and see the cleaned value the form actually sends. */
function PostelDemo() {
  const [value, setValue] = useState('  Alex@Example.COM ');
  return (
    <div className={`${styles.stage} ${styles.interactive} ${styles.postel}`}>
      <label className={styles.postelField}>
        <span>Messy input</span>
        <input value={value} onChange={(e) => setValue(e.target.value)} spellCheck={false} />
      </label>
      <p className={styles.postelOut} aria-live="polite">
        → <code>{cleanField('email', value) || '…'}</code>
      </p>
    </div>
  );
}

/** Frequency of use: the more you press, the calmer the animation gets. */
function FrequencyDemo() {
  const [presses, setPresses] = useState(0);
  const intensity = Math.max(0, 1 - presses / 5);
  return (
    <div className={`${styles.stage} ${styles.interactive}`}>
      <button
        type="button"
        key={presses}
        className={`${styles.miniBtn} ${presses > 0 ? styles.bump : ''}`}
        style={{ '--bump': 1 + 0.35 * intensity } as CSSProperties}
        onClick={() => setPresses((n) => n + 1)}
      >
        <FiHeart aria-hidden="true" /> Like · {presses}
      </button>
      <small className={styles.hint}>
        {presses >= 5 ? 'Used often: no animation' : 'Press repeatedly'}
      </small>
    </div>
  );
}
