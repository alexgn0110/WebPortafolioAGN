import type { CSSProperties } from 'react';
import { skills } from '../../data/profile';
import { Section } from '../Section/Section';
import { Shard } from '../../easter-egg/shards';
import styles from './Skills.module.css';

/** Index variables drive the staggered entrance in CSS (no JS animation). */
const order = (name: '--g' | '--i', value: number) => ({ [name]: value }) as CSSProperties;

export function Skills() {
  return (
    <Section id="skills" index={3} title="Skills">
      <div className={styles.grid}>
        {skills.map((group, g) => (
          <section
            key={group.title}
            className={`card ${styles.group}`}
            aria-label={group.title}
            style={order('--g', g)}
          >
            <h3 className={styles.title}>{group.title}</h3>
            <ul role="list" className={styles.list}>
              {group.items.map((item, i) => (
                <li key={item} style={order('--i', i)}>
                  <span className={styles.chip}>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <Shard id="skills" className={styles.shard} />
      </div>
    </Section>
  );
}
