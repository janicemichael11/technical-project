// ============================================================
// main.jsx — React application entry point
// ============================================================
// This is the very first file that runs in the browser.
// It mounts the React app onto the <div id="root"> element
// that exists in index.html.
//
// React.StrictMode is a development helper that:
//   - Highlights potential problems in the app
//   - Intentionally double-invokes some functions to detect side effects
//   - Has no effect in production builds

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Global Tailwind CSS styles

// Find the #root div in index.html and hand it to React
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
