import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { applyAppearance } from './utils/appearance';
import { loadState } from './utils/storage';
import './index.css';

try {
  applyAppearance(loadState().appearance);
} catch {
  /* ignore */
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
