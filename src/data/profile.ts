/**
 * Single source of truth for the portfolio content.
 * Every section renders from this typed data, so updating the CV means editing one file.
 */

export interface SocialLinks {
  github: string;
  linkedin: string;
  whatsapp: string;
}

export interface Profile {
  name: string;
  role: string;
  summary: string;
  location: string;
  timeZone: string;
  utcOffsetLabel: string;
  availability: string;
  email: string;
  resumeFile: string;
  sourceCode: string;
  links: SocialLinks;
}

export interface Experience {
  company: string;
  companyNote?: string;
  role: string;
  start: string;
  end: string;
  location: string;
  highlights: string[];
  stack: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Project {
  title: string;
  year: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  code: string;
  live?: string;
  featured?: boolean;
}

export interface Stat {
  value: string;
  label: string;
}

export const profile: Profile = {
  name: 'Alejandro Gutierrez Novo',
  role: 'Senior Frontend Engineer',
  summary:
    'I build fast, accessible and well-tested web applications with React and TypeScript. 7+ years shipping production UIs for enterprise clients and US-based SaaS teams.',
  location: 'Monterrey, Mexico',
  timeZone: 'America/Monterrey',
  utcOffsetLabel: 'UTC-6',
  availability: 'Open to remote & hybrid roles',
  email: 'alex_guno0110@hotmail.com',
  resumeFile: 'Alejandro-Gutierrez-Novo-Resume.pdf',
  sourceCode: 'https://github.com/alexgn0110/WebPortafolioAGN',
  links: {
    github: 'https://github.com/alexgn0110',
    linkedin: 'https://www.linkedin.com/in/alexgtznovo/',
    whatsapp: 'https://api.whatsapp.com/send?phone=528120022542',
  },
};

export const about: string[] = [
  'I’m a frontend engineer from Monterrey, Mexico. I started with React in 2019 and have been building production interfaces ever since — from browser extensions for a US retail analytics SaaS to rebuilding legacy systems as modern React and TypeScript applications.',
  'I care about the details users never think about: predictable state, components that are easy to reuse, accessibility, and tests that let a team ship with confidence. I use GitHub Copilot and AI assistants daily to move faster, and I review every line they produce.',
];

export const stats: Stat[] = [
  { value: '7+', label: 'years building with React' },
  { value: '80–90%', label: 'unit test coverage on current team' },
  { value: 'UTC-6', label: 'full overlap with US business hours' },
];

export const experience: Experience[] = [
  {
    company: 'Tata Consultancy Services',
    role: 'Frontend Developer',
    start: 'Mar 2023',
    end: 'Present',
    location: 'Monterrey, MX',
    highlights: [
      'Rebuilt a legacy system as a modern React and TypeScript application for US-based clients.',
      'Designed global state with Redux and Redux-Saga for async data fetching, side effects and error states.',
      'Maintained 80–90% unit test coverage with Jest and React Testing Library.',
      'Use GitHub Copilot and AI assistants daily for coding, refactoring and tests, reviewing all generated code.',
    ],
    stack: ['React', 'TypeScript', 'Redux-Saga', 'Jest', 'RTL', 'Node.js'],
  },
  {
    company: 'Wiser Solutions',
    companyNote: 'US-based retail analytics SaaS',
    role: 'Frontend Developer',
    start: 'Mar 2020',
    end: 'Mar 2023',
    location: 'Monterrey, MX',
    highlights: [
      'Enhanced and maintained a cross-browser (Chrome and Firefox) extension built with React.',
      'Created a shared library of reusable React components to keep the UI consistent across products.',
      'Integrated REST APIs and built responsive, interactive interfaces.',
    ],
    stack: ['React', 'Browser Extensions', 'React Router', 'Bootstrap', 'REST APIs'],
  },
  {
    company: 'CTE Consultores en Teleinformática Empresarial',
    role: 'React Developer Jr.',
    start: 'Sep 2019',
    end: 'Feb 2020',
    location: 'Monterrey, MX',
    highlights: [
      'Built client websites in React, defining look, layout and UI/UX requirements with clients.',
      'Debugged and resolved production issues using React DevTools.',
    ],
    stack: ['React', 'JavaScript', 'CSS'],
  },
  {
    company: 'Accenture',
    role: 'Frontend Developer Intern',
    start: 'Apr 2019',
    end: 'Sep 2019',
    location: 'Monterrey, MX',
    highlights: [
      'Built mobile-first, responsive pages with React from UI/UX wireframes, preserving design fidelity.',
    ],
    stack: ['React', 'JavaScript', 'HTML5', 'CSS3'],
  },
];

export const earlierExperience =
  'Data Center Operations & IT Support at SISAMEX (2017–2019): servers, MySQL and Oracle EBS.';

export const skills: SkillGroup[] = [
  { title: 'Languages', items: ['TypeScript', 'JavaScript (ES2022+)', 'HTML5', 'CSS3 / SCSS'] },
  {
    title: 'Frameworks & state',
    items: ['React', 'React Hooks', 'Redux', 'Redux-Saga', 'React Router', 'Bootstrap'],
  },
  { title: 'Testing & quality', items: ['Jest', 'React Testing Library', 'Vitest', 'ESLint'] },
  { title: 'Tooling', items: ['Git', 'npm', 'Vite', 'Jira', 'Postman', 'Chrome DevTools'] },
  { title: 'Backend & data', items: ['Node.js', 'REST APIs', 'MySQL', 'MongoDB'] },
  { title: 'AI-assisted development', items: ['GitHub Copilot', 'AI coding assistants'] },
];

export const projects: Project[] = [
  {
    title: 'This portfolio',
    year: '2022 · rebuilt 2026',
    description:
      'Migrated from Create React App to Vite, React 19 and strict TypeScript. Tested with Vitest and React Testing Library, linted with accessibility rules, checked in CI on every push, with a ⌘K command palette and a no-flash theme toggle.',
    image: 'images/projects/portfolio.webp',
    imageAlt: 'Social preview card of this portfolio',
    tags: ['React 19', 'TypeScript', 'Vite', 'Vitest', 'CSS Modules', 'GitHub Actions'],
    code: 'https://github.com/alexgn0110/WebPortafolioAGN',
    live: 'https://alexgn0110.github.io/WebPortafolioAGN/',
    featured: true,
  },
  {
    title: 'DBank — DeFi DApp',
    year: '2022',
    description:
      'Decentralized banking app on the Internet Computer: a canister stores the balance while a JavaScript frontend handles top-ups and withdrawals.',
    image: 'images/projects/dbank.webp',
    imageAlt: 'DBank interface showing the current balance and top-up and withdraw fields',
    tags: ['JavaScript', 'Internet Computer', 'Webpack'],
    code: 'https://github.com/alexgn0110/DBank',
  },
  {
    title: 'Keeper App',
    year: '2022',
    description:
      'Note-taking app built entirely with React components and state: add and delete notes.',
    image: 'images/projects/keeper.webp',
    imageAlt: 'Keeper App with a note composer and three sample notes',
    tags: ['React', 'JavaScript', 'CSS'],
    code: 'https://github.com/alexgn0110/Keeper-App--TodoList-',
    live: 'https://alexgn0110.github.io/Keeper-App--TodoList-/',
  },
  {
    title: 'React Calculator',
    year: '2022',
    description: 'Calculator built with React hooks, with clear and backspace actions.',
    image: 'images/projects/calculator.webp',
    imageAlt: 'Dark calculator keypad on a gradient background',
    tags: ['React', 'JavaScript', 'CSS'],
    code: 'https://github.com/alexgn0110/Cal-App',
    live: 'https://alexgn0110.github.io/Cal-App/',
  },
];

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof sections)[number]['id'];
