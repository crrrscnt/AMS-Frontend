import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './toolkit/store';
import { NavBar } from './components/views/NavBar';
import App from './App';
import Foot from './components/views/Foot';

const Start: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <NavBar />
        <App />
        <Foot />
      </BrowserRouter>
    </Provider>
  );
};

export default Start;