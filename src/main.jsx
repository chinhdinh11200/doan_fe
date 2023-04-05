import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ReactQueryProvider } from './context/reactQuery';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <Router>
        <App />
      </Router>
    </ReactQueryProvider>
  </React.StrictMode>
);
