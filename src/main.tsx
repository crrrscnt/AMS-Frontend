import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foot from "./components/views/Foot";
import {NavBar} from "./components/views/NavBar";
import { Provider } from 'react-redux';
import { store } from "./toolkit/store";
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter basename="/AMS-Frontend">
        <NavBar />
        <App />
        <Foot />
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
