import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Node 25+ ships an experimental global `localStorage` that shadows jsdom's and is unusable
// without a backing file, so tests get a small in-memory Storage instead.
class MemoryStorage implements Storage {
  #data = new Map<string, string>();
  get length() {
    return this.#data.size;
  }
  clear() {
    this.#data.clear();
  }
  getItem(key: string) {
    return this.#data.get(key) ?? null;
  }
  key(index: number) {
    return [...this.#data.keys()][index] ?? null;
  }
  removeItem(key: string) {
    this.#data.delete(key);
  }
  setItem(key: string, value: string) {
    this.#data.set(key, String(value));
  }
}
Object.defineProperty(globalThis, 'localStorage', {
  value: new MemoryStorage(),
  configurable: true,
  writable: true,
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.dataset.theme = 'dark';
});

// jsdom does not implement these browser APIs.
Element.prototype.scrollIntoView = vi.fn();

window.matchMedia ??= ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})) as unknown as typeof window.matchMedia;

window.requestAnimationFrame = (cb: FrameRequestCallback) => {
  cb(0);
  return 0;
};
