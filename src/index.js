import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js'; // Import your main App component

const rootElement = document.getElementById('root');

// Use createRoot to render the app
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App /> {/* Render your main App component */}
  </React.StrictMode>
);




