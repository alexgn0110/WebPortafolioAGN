import type { ReactNode } from 'react';
import type { SectionId } from '../../data/profile';

interface SectionProps {
  id: SectionId;
  index: number;
  title: string;
  children: ReactNode;
}

/** Numbered, labelled landmark used by every content section. */
export function Section({ id, index, title, children }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <div className="container" data-reveal>
        <h2 id={headingId} className="section-heading">
          <span className="section-index" aria-hidden="true">
            {String(index).padStart(2, '0')}.
          </span>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
