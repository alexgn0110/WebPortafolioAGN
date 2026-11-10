import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

const openWithShortcut = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.keyboard('{Control>}k{/Control}');
  return screen.getByRole('dialog', { name: /command menu/i });
};

describe('CommandPalette', () => {
  it('opens with Ctrl+K, focuses the search and closes with Escape', async () => {
    const user = userEvent.setup();
    render(<App />);

    await openWithShortcut(user);
    expect(screen.getByRole('combobox', { name: /search commands/i })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('filters commands as you type and shows an empty state', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openWithShortcut(user);

    await user.type(screen.getByRole('combobox'), 'proj');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('option', { name: 'Projects' })).toBeInTheDocument();

    await user.clear(screen.getByRole('combobox'));
    await user.type(screen.getByRole('combobox'), 'zzz');
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it('moves the active option with the arrow keys and runs it with Enter', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openWithShortcut(user);

    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowDown}');
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-activedescendant',
      screen.getAllByRole('option')[1]?.id,
    );

    await user.type(screen.getByRole('combobox'), 'light');
    await user.keyboard('{Enter}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('returns focus to the trigger button after closing', async () => {
    const user = userEvent.setup();
    render(<App />);
    const trigger = screen.getByRole('button', { name: /open command menu/i });

    await user.click(trigger);
    await user.keyboard('{Escape}');

    expect(trigger).toHaveFocus();
  });
});
