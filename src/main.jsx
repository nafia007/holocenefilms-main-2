import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Get the current origin for dynamic validation
const CURRENT_ORIGIN = window.location.origin;

// Store trusted origins with exact domains
const TRUSTED_ORIGINS = [
  CURRENT_ORIGIN,
  'https://holocenefilms.dev',
  'https://app.holocenefilms.dev',
  'https://admin.holocenefilms.dev',
  'http://localhost:3000',
  'http://localhost:5173'
];

// Enhanced origin validation
const isOriginTrusted = (origin) => {
  if (!origin) return false;
  return TRUSTED_ORIGINS.includes(origin);
};

// Initialize communication when running in iframe
if (window.parent !== window) {
  console.log('Running in iframe, establishing secure communication channel');
  
  window.addEventListener('message', (event) => {
    // Validate origin
    if (!isOriginTrusted(event.origin)) {
      console.warn('Message rejected - untrusted origin:', event.origin);
      return;
    }

    try {
      const { type, payload } = event.data;
      console.log('Received message:', { type, payload });
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });
}

// Render application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);