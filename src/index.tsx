import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ServiceCategoryProvider } from './contexts/ServiceCategoryContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ServiceCategoryProvider>
      <App />
    </ServiceCategoryProvider>
  </React.StrictMode>
);
