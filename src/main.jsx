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
  'http://localhost:5173',
  'https://*.lovableproject.com'  // Add wildcard for lovable domains
];

// Enhanced origin validation with wildcard support
const isOriginTrusted = (origin) => {
  if (!origin) return false;
  
  // Check exact matches first
  if (TRUSTED_ORIGINS.includes(origin)) return true;
  
  // Check wildcard matches
  return TRUSTED_ORIGINS.some(trusted => {
    if (trusted.includes('*')) {
      const pattern = trusted.replace('*', '.*');
      const regex = new RegExp(pattern);
      return regex.test(origin);
    }
    return false;
  });
};

// Initialize communication when running in iframe
if (window.parent !== window) {
  console.log('Running in iframe, initializing communication');
  
  // Send ready message to parent
  window.parent.postMessage({ 
    type: 'IFRAME_READY',
    payload: { origin: CURRENT_ORIGIN }
  }, '*');
  
  window.addEventListener('message', (event) => {
    // Validate origin
    if (!isOriginTrusted(event.origin)) {
      console.warn('Message rejected - untrusted origin:', event.origin);
      return;
    }

    try {
      const { type, payload } = event.data;
      console.log('Received message:', { type, payload });
      
      // Handle specific message types
      switch(type) {
        case 'PARENT_READY':
          console.log('Parent acknowledged connection');
          break;
        case 'URL_CHANGE':
          console.log('URL change requested:', payload);
          break;
        default:
          console.log('Unhandled message type:', type);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });
}

// Render application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);