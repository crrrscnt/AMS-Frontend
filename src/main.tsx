import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Start from './Start';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Start />
  </StrictMode>
);