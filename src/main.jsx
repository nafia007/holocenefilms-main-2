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
  'https://*.lovableproject.com',
  '*' // Allow all origins temporarily for debugging
];

// Enhanced origin validation
const isOriginTrusted = (origin) => {
  if (!origin) return false;
  if (TRUSTED_ORIGINS.includes('*')) return true;
  
  return TRUSTED_ORIGINS.some(trusted => {
    if (trusted.includes('*')) {
      const pattern = trusted.replace('*', '.*');
      return new RegExp(pattern).test(origin);
    }
    return trusted === origin;
  });
};

// Initialize communication when running in iframe
if (window.parent !== window) {
  console.log('Running in iframe mode');
  
  // Send initial ready message
  window.parent.postMessage({
    type: 'IFRAME_READY',
    payload: {
      origin: CURRENT_ORIGIN,
      path: window.location.pathname
    }
  }, '*');

  // Handle URL changes from parent
  window.addEventListener('message', (event) => {
    console.log('Received message:', event.data);
    
    try {
      const { type, payload } = event.data;
      
      switch(type) {
        case 'URL_CHANGE':
          if (payload && typeof payload === 'string') {
            console.log('Updating URL to:', payload);
            window.history.pushState({}, '', payload);
            window.dispatchEvent(new PopStateEvent('popstate'));
          }
          break;
          
        case 'PARENT_READY':
          console.log('Parent connection established');
          break;
          
        default:
          console.log('Unhandled message type:', type);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  // Report URL changes back to parent
  ['pushState', 'replaceState'].forEach(method => {
    const original = window.history[method];
    window.history[method] = function(...args) {
      original.apply(this, args);
      window.parent.postMessage({
        type: 'URL_CHANGED',
        payload: { path: window.location.pathname }
      }, '*');
    };
  });

  window.addEventListener('popstate', () => {
    window.parent.postMessage({
      type: 'URL_CHANGED',
      payload: { path: window.location.pathname }
    }, '*');
  });
}

// Create root and render application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);