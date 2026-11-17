export type PrincipleGroup = 'animation' | 'ux';

export interface Principle {
  id: string;
  name: string;
  group: PrincipleGroup;
  definition: string;
  /** Where the principle is applied on this site. */
  onSite: string;
}

export const principleGroups: { id: PrincipleGroup; label: string }[] = [
  { id: 'animation', label: 'Animation' },
  { id: 'ux', label: 'UX laws' },
];

export const principles: Principle[] = [
  {
    id: 'squash-stretch',
    name: 'Squash & stretch',
    group: 'animation',
    definition: 'Things squish on impact and stretch in motion, which gives them weight.',
    onSite: 'Buttons compress slightly when pressed.',
  },
  {
    id: 'anticipation',
    name: 'Anticipation wind-up',
    group: 'animation',
    definition: 'A small pull back before the big move, so people see it coming.',
    onSite: 'The “Get in touch” arrow and “Download CV” icon pull back before they move.',
  },
  {
    id: 'staging',
    name: 'Staging the focus',
    group: 'animation',
    definition: 'Direct the eye to one thing at a time.',
    onSite:
      'Sections reveal one at a time; only the active nav item and menu option get the accent.',
  },
  {
    id: 'pose-to-pose',
    name: 'Pose to pose',
    group: 'animation',
    definition: 'Set the key poses and let the browser fill in the frames between.',
    onSite: 'The hero settles in key poses: status, name, role, summary, then actions.',
  },
  {
    id: 'follow-through',
    name: 'Follow through',
    group: 'animation',
    definition: 'Parts keep moving after the main body stops, then settle.',
    onSite: 'The theme icon and the command menu overshoot slightly, then settle.',
  },
  {
    id: 'slow-in-out',
    name: 'Slow in & slow out',
    group: 'animation',
    definition: 'Speed up and slow down; never move at a constant speed.',
    onSite: 'Every transition uses ease-out or ease-in-out curves. Nothing is linear.',
  },
  {
    id: 'arcs',
    name: 'Moving in arcs',
    group: 'animation',
    definition: 'Move along curves, not straight lines.',
    onSite: 'The theme icon rotates in, and the photo’s orbit swings around it on hover.',
  },
  {
    id: 'secondary-action',
    name: 'Secondary action',
    group: 'animation',
    definition: 'A small flourish that backs up the main action.',
    onSite: 'Copying the email shows a “Copied” bubble next to the check mark.',
  },
  {
    id: 'snappy-timing',
    name: 'Snappy timing',
    group: 'animation',
    definition: 'Duration sets the feel, so keep UI animations under 300ms.',
    onSite: 'Interface transitions run between 100 and 300ms, defined once as design tokens.',
  },
  {
    id: 'exaggerated-feedback',
    name: 'Exaggerated feedback',
    group: 'animation',
    definition: 'Push it past real so the moment lands.',
    onSite: 'The copy check pops past full size; an invalid form gives a short shake.',
  },
  {
    id: 'solid-drawing',
    name: 'Solid drawing in 3D',
    group: 'animation',
    definition: 'Give flat things depth and volume.',
    onSite: 'Project cards tilt toward your pointer.',
  },
  {
    id: 'appeal',
    name: 'Overall appeal',
    group: 'animation',
    definition: 'The sum of every detail, done with care.',
    onSite: 'All of the above, tuned so the site feels like one system.',
  },
  {
    id: 'fitts',
    name: 'Fitts’s law',
    group: 'ux',
    definition: 'Bigger, closer targets are faster to hit.',
    onSite: 'Primary actions are large and close at hand; ⌘K puts everything one shortcut away.',
  },
  {
    id: 'hit-areas',
    name: 'Bigger hit areas',
    group: 'ux',
    definition: 'The clickable area can be bigger than it looks.',
    onSite: 'Icon buttons and project links respond beyond their visible edges.',
  },
  {
    id: 'hick',
    name: 'Hick’s law',
    group: 'ux',
    definition: 'More choices mean slower decisions.',
    onSite: 'Six nav items; the command menu groups actions into three short lists.',
  },
  {
    id: 'miller',
    name: 'Miller’s law',
    group: 'ux',
    definition: 'We hold about 7 things in mind at once, so chunk information.',
    onSite: 'Skills come in groups of six or fewer, and these principles are split into two tabs.',
  },
  {
    id: 'doherty',
    name: 'Doherty threshold',
    group: 'ux',
    definition: 'Respond within 400ms or it feels slow.',
    onSite: 'Buttons react on the same frame; the form shows “Sending…” instantly.',
  },
  {
    id: 'postel',
    name: 'Postel’s law',
    group: 'ux',
    definition: 'Accept messy input, give back clean output.',
    onSite:
      'The form trims spaces and lowercases emails; ⌘K search ignores accents and knows Spanish.',
  },
  {
    id: 'jakob',
    name: 'Jakob’s law',
    group: 'ux',
    definition: 'People expect your app to work like the apps they already use.',
    onSite: 'Logo top-left goes home, ⌘K opens search, and the form follows a standard layout.',
  },
  {
    id: 'frequency',
    name: 'Frequency of use',
    group: 'ux',
    definition: 'The more often something is used, the less it should animate.',
    onSite: 'The command menu drops its entrance animation after the first time you open it.',
  },
];
