import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Principles } from './Principles';
import { principles } from '../../data/principles';

const animation = principles.filter((p) => p.group === 'animation');
const ux = principles.filter((p) => p.group === 'ux');

describe('Principles section', () => {
  it('covers all 20 principles, chunked into two groups', () => {
    expect(principles).toHaveLength(20);
    expect(animation).toHaveLength(12);
    expect(ux).toHaveLength(8);
    for (const p of principles) expect(p.onSite.length).toBeGreaterThan(10);
  });

  it('shows the animation principles first, each with a definition', () => {
    render(<Principles />);
    const panel = screen.getByRole('tabpanel');
    expect(within(panel).getAllByRole('article')).toHaveLength(animation.length);
    expect(within(panel).getByRole('heading', { name: 'Squash & stretch' })).toBeInTheDocument();
    expect(within(panel).getByText(/squish on impact/i)).toBeInTheDocument();
  });

  it('switches groups with the tabs, including arrow-key navigation', async () => {
    const user = userEvent.setup();
    render(<Principles />);

    const [animationTab, uxTab] = screen.getAllByRole('tab');
    expect(animationTab).toHaveAttribute('aria-selected', 'true');

    if (!animationTab) throw new Error('Animation tab not found');
    await user.click(animationTab);
    await user.keyboard('{ArrowRight}');

    expect(uxTab).toHaveAttribute('aria-selected', 'true');
    expect(uxTab).toHaveFocus();
    expect(within(screen.getByRole('tabpanel')).getAllByRole('article')).toHaveLength(ux.length);
    expect(screen.getByRole('heading', { name: 'Fitts’s law' })).toBeInTheDocument();
  });

  it('lets keyboard and touch users play a demo', async () => {
    const user = userEvent.setup();
    render(<Principles />);
    const play = screen.getByRole('button', { name: /play the squash & stretch demo/i });

    await user.click(play);

    expect(screen.getByRole('button', { name: /stop the squash & stretch demo/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it("demonstrates Postel's law with a live input", async () => {
    const user = userEvent.setup();
    render(<Principles />);
    await user.click(screen.getByRole('tab', { name: /ux laws/i }));

    const input = screen.getByRole('textbox', { name: /messy input/i });
    await user.clear(input);
    await user.type(input, '  Hi@Mail.COM ');

    expect(screen.getByText('hi@mail.com')).toBeInTheDocument();
  });
});
