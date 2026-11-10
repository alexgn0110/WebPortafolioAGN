import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { experience, profile, sections } from './data/profile';

describe('App', () => {
  it('renders the hero with name, role and a downloadable CV', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument();
    expect(screen.getByText(profile.role)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /download cv/i })).toHaveAttribute(
      'href',
      `/WebPortafolioAGN/${profile.resumeFile}`,
    );
  });

  it('exposes every section as a labelled landmark reachable from the primary nav', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: /primary/i });
    for (const { id, label } of sections) {
      expect(within(nav).getByRole('link', { name: label })).toHaveAttribute('href', `#${id}`);
      expect(screen.getByRole('region', { name: new RegExp(label, 'i') })).toHaveAttribute(
        'id',
        id,
      );
    }
  });

  it('lists every job from the CV in the experience timeline', () => {
    render(<App />);
    const timeline = screen.getByRole('region', { name: /experience/i });
    for (const job of experience) {
      expect(within(timeline).getByText(job.company)).toBeInTheDocument();
    }
  });

  it('provides a skip link to the main content', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main');
  });

  it('toggles and persists the colour theme', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /switch to light theme/i }));

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(screen.getByRole('button', { name: /switch to dark theme/i })).toBeInTheDocument();
  });

  it('opens external links safely in a new tab', () => {
    render(<App />);
    const external = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('target') === '_blank');
    expect(external.length).toBeGreaterThan(0);
    for (const link of external) {
      expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
    }
  });
});
