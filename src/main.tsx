import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './styles/global.css';
import App from './App';
import { profile } from './data/profile';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// A small hello for anyone who opens DevTools.
console.info(
  `%c👋 Hi, fellow developer!%c\nThis site is React 19 + TypeScript (strict) + Vite, tested with Vitest & React Testing Library.\nSource: ${profile.sourceCode}\nLet's talk: ${profile.email}`,
  'font: 600 14px system-ui; color: #7aa2ff',
  'font: 12px ui-monospace, monospace; line-height: 1.6',
);
