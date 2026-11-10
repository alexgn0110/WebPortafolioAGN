/** Resolves a file in /public against Vite's base path (the site lives under /WebPortafolioAGN/). */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
