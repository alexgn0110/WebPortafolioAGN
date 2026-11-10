import { experience, projects, sections } from './profile';

const toDate = (label: string) => (label === 'Present' ? new Date() : new Date(`1 ${label}`));

describe('profile data', () => {
  it('lists experience newest first, with valid date ranges', () => {
    for (const [i, job] of experience.entries()) {
      expect(toDate(job.start).getTime()).toBeLessThanOrEqual(toDate(job.end).getTime());
      const next = experience[i + 1];
      if (next) expect(toDate(job.start).getTime()).toBeGreaterThan(toDate(next.start).getTime());
    }
  });

  it('only links projects over https', () => {
    for (const project of projects) {
      expect(project.code).toMatch(/^https:\/\//);
      if (project.live) expect(project.live).toMatch(/^https:\/\//);
    }
  });

  it('uses unique section ids', () => {
    const ids = sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
