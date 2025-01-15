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
  'https://*.lovableproject.com'
];

// Enhanced origin validation with wildcard support
const isOriginTrusted = (origin) => {
  if (!origin) return false;
  return TRUSTED_ORIGINS.some(trusted => {
    if (trusted.includes('*')) {
      const pattern = trusted.replace('*', '.*');
      return new RegExp(pattern).test(origin);
    }
    return trusted === origin;
  });
};

// Handle URL changes
const handleUrlChange = (newUrl) => {
  if (window.history && window.history.pushState) {
    window.history.pushState({}, '', newUrl);
    // Dispatch a custom event to notify the application of URL change
    window.dispatchEvent(new CustomEvent('locationchange', { detail: newUrl }));
  }
};

// Initialize communication when running in iframe
if (window.parent !== window) {
  console.log('Running in iframe, initializing communication');
  
  // Immediately notify parent that iframe is ready
  window.parent.postMessage({
    type: 'IFRAME_READY',
    payload: { 
      origin: CURRENT_ORIGIN,
      currentPath: window.location.pathname 
    }
  }, '*');

  // Listen for messages from parent
  window.addEventListener('message', (event) => {
    if (!isOriginTrusted(event.origin)) {
      console.warn('Message rejected - untrusted origin:', event.origin);
      return;
    }

    try {
      const { type, payload } = event.data;
      console.log('Received message:', { type, payload });

      switch(type) {
        case 'PARENT_READY':
          console.log('Parent acknowledged connection');
          break;
        case 'URL_CHANGE':
          if (payload && typeof payload === 'string') {
            handleUrlChange(payload);
          }
          break;
        default:
          console.log('Unhandled message type:', type);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  // Listen for browser navigation events
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