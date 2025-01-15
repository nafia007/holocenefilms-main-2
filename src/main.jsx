import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Get the current origin for dynamic validation
const CURRENT_ORIGIN = window.location.origin;

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

  let lastUrlChange = 0;
  const URL_CHANGE_THROTTLE = 100; // Minimum time between URL changes in ms

  // Handle messages from parent
  window.addEventListener('message', (event) => {
    try {
      const { type, payload } = event.data;
      console.log('Received message:', { type, payload });
      
      if (type === 'URL_CHANGE' && payload) {
        const now = Date.now();
        if (now - lastUrlChange >= URL_CHANGE_THROTTLE) {
          console.log('Updating URL to:', payload);
          window.history.pushState({}, '', payload);
          window.dispatchEvent(new PopStateEvent('popstate'));
          lastUrlChange = now;
        } else {
          console.log('URL change throttled');
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  let urlChangeTimeout = null;
  const DEBOUNCE_TIME = 50; // Debounce time in ms

  function notifyUrlChange() {
    if (urlChangeTimeout) {
      clearTimeout(urlChangeTimeout);
    }

    urlChangeTimeout = setTimeout(() => {
      window.parent.postMessage({
        type: 'URL_CHANGED',
        payload: {
          path: window.location.pathname
        }
      }, '*');
    }, DEBOUNCE_TIME);
  }

  // Monitor URL changes
  const originalPushState = window.history.pushState;
  window.history.pushState = function() {
    originalPushState.apply(this, arguments);
    notifyUrlChange();
  };

  const originalReplaceState = window.history.replaceState;
  window.history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    notifyUrlChange();
  };

  window.addEventListener('popstate', notifyUrlChange);
}

// Create root and render application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);