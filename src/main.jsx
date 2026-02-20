import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Error Catcher (अगर कोई असली एरर हो तो दिखाए)
window.onerror = function(message, source, lineno, colno, error) {
  const loader = document.getElementById('initial-loader');
  if (loader) loader.style.display = 'none'; // Loader hatao

  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:black;color:red;z-index:99999;padding:20px;overflow:auto;';
  errorDiv.innerHTML = `<h3>CRASH: ${message}</h3><p>${source}:${lineno}</p>`;
  document.body.appendChild(errorDiv);
};

// 2. Remove Loader Helper
const removeLoader = () => {
  const loader = document.getElementById('initial-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500); // 0.5s baad gayab
  }
};

// 3. Initialize App
const root = ReactDOM.createRoot(document.getElementById('root'));

// App render hone ke baad loader hatao
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Call immediately after render attempt
removeLoader();
