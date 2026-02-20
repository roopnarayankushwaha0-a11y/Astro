import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 👇👇 ERROR CATCHER FOR MOBILE 👇👇
window.onerror = function(message, source, lineno, colno, error) {
  // Loader hatao
  const loader = document.getElementById('initial-loader');
  if (loader) loader.style.display = 'none';

  // Error dikhao
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#ff5555;z-index:99999;padding:20px;font-family:monospace;overflow:auto;font-size:14px;';
  errorDiv.innerHTML = `
    <h2 style="color:white">⚠️ CRASH DETECTED</h2>
    <p style="font-weight:bold">${message}</p>
    <p>File: ${source}</p>
    <p>Line: ${lineno}</p>
    <pre style="background:#222;padding:10px;border-radius:5px;white-space:pre-wrap;">${error?.stack || 'No stack trace'}</pre>
    <button onclick="window.location.reload()" style="padding:10px 20px;margin-top:20px;background:white;color:black;border:none;border-radius:5px;">RELOAD APP</button>
  `;
  document.body.appendChild(errorDiv);
};

// Initialize the application
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
