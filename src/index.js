// src\index.js {update of context/NotificationContext}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotificationProvider } from './context/NotificationContext';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
      <NotificationProvider>
        <App />
    </NotificationProvider>,
  </React.StrictMode>,
  rootElement
);

reportWebVitals();
