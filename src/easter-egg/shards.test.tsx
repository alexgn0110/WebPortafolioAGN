import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const shard = (container: HTMLElement, id: string) => {
  const el = container.querySelector<HTMLElement>(`[data-shard="${id}"]`);
  if (!el) throw new Error(`Shard "${id}" not rendered`);
  return el;
};

describe('hidden three-piece easter egg', () => {
  it('lights each piece when the pointer finds it, then assembles the set in the footer', async () => {
    const user = userEvent.setup();
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    const { container } = render(<App />);

    expect(container.querySelector('[data-triforce]')).toBeNull();

    await user.hover(shard(container, 'hero'));
    expect(shard(container, 'hero')).toHaveAttribute('data-found', 'true');
    expect(shard(container, 'skills')).toHaveAttribute('data-found', 'false');

    await user.hover(shard(container, 'skills'));
    await user.hover(shard(container, 'footer'));

    expect(container.querySelector('[data-triforce="complete"]')).not.toBeNull();
    expect(container.querySelector('[data-shard="footer"]')).toBeNull();
    expect(info).toHaveBeenCalledWith(
      expect.stringContaining('All three pieces found'),
      expect.any(String),
    );
    info.mockRestore();
  });

  it('stays out of the accessibility tree and the tab order', () => {
    const { container } = render(<App />);
    for (const el of container.querySelectorAll('[data-shard]')) {
      expect(el).toHaveAttribute('aria-hidden', 'true');
      expect(el).not.toHaveAttribute('tabindex');
    }
  });
});
