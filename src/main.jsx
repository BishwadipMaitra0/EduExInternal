import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Correct import path assuming App.jsx is in the same directory

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
