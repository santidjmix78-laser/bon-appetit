import type { AccentColor, AppearancePrefs, ThemePreference } from '../types';

export const ACCENT_OPTIONS: {
  id: AccentColor;
  label: string;
  hex: string;
}[] = [
  { id: 'lime', label: 'Verde lima', hex: '#b8e06a' },
  { id: 'blue', label: 'Azul', hex: '#6ab0e0' },
  { id: 'purple', label: 'Morado', hex: '#b08ae0' },
  { id: 'orange', label: 'Naranja', hex: '#e0a06a' },
  { id: 'pink', label: 'Rosa', hex: '#e08ab0' },
  { id: 'turquoise', label: 'Turquesa', hex: '#6ad0c0' },
];

export const THEME_OPTIONS: { id: ThemePreference; label: string }[] = [
  { id: 'dark', label: 'Oscuro' },
  { id: 'light', label: 'Claro' },
  { id: 'system', label: 'Sistema' },
];

export const DEFAULT_APPEARANCE: AppearancePrefs = {
  theme: 'dark',
  accent: 'lime',
};

export function resolveTheme(pref: ThemePreference): 'dark' | 'light' {
  if (pref === 'system') {
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
  return pref;
}

export function applyAppearance(appearance: AppearancePrefs): void {
  const root = document.documentElement;
  const theme = resolveTheme(appearance.theme);
  root.dataset.theme = theme;
  root.dataset.accent = appearance.accent;

  const accent = ACCENT_OPTIONS.find((a) => a.id === appearance.accent);
  if (accent) {
    root.style.setProperty('--accent', accent.hex);
    // Soft background derived from accent
    root.style.setProperty('--accent-soft', `${accent.hex}29`);
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'light' ? '#f4f7f1' : '#0f1410');
  }
}
