import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';

import './index.scss';
import { PomodoroContextProvider } from './context/PomodoroContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <PomodoroContextProvider>
      <App />
    </PomodoroContextProvider>
  </React.StrictMode>
);