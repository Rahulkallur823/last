import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';  // Global styles
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS
import 'antd/dist/reset.css';  // Ant Design CSS
import 'react-toastify/dist/ReactToastify.css';  // React Toastify CSS

// Providers
import { AuthProvider } from './store/Auth.jsx';
import { SearchProvider } from './store/Search.jsx';
import { ToastContainer } from 'react-toastify';

// Render application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <AuthProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
