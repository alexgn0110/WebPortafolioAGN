import { cleanField, normalize } from './clean';

describe("Postel's law helpers", () => {
  it('cleans emails: trims, removes inner spaces and lowercases', () => {
    expect(cleanField('email', '  Alex@Example.COM ')).toBe('alex@example.com');
    expect(cleanField('email', 'alex @ example.com')).toBe('alex@example.com');
  });

  it('collapses repeated spaces in other fields but keeps their case', () => {
    expect(cleanField('name', '  Alejandro    Gutierrez  ')).toBe('Alejandro Gutierrez');
  });

  it('keeps line breaks in multi-line messages', () => {
    expect(cleanField('message', 'Hi  there\nSecond line ')).toBe('Hi there\nSecond line');
  });

  it('normalizes search text: case and accents are ignored', () => {
    expect(normalize('  Contácto ')).toBe('contacto');
    expect(normalize('TECNOLOGÍAS')).toBe('tecnologias');
  });
});
