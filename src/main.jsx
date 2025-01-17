import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize communication when running in iframe
if (window.parent !== window) {
  console.log('Running in iframe mode');
  
  // Send initial ready message with more flexible origin handling
  window.parent.postMessage({
    type: 'IFRAME_READY',
    payload: {
      origin: window.location.origin,
      path: window.location.pathname
    }
  }, '*');

  let lastUrlChange = Date.now();
  const URL_CHANGE_THROTTLE = 500;
  let isProcessingUrlChange = false;

  // Handle messages from parent
  window.addEventListener('message', (event) => {
    try {
      // Log incoming message details for debugging
      console.log('Received message from origin:', event.origin);
      console.log('Current origin:', window.location.origin);
      
      const { type, payload } = event.data;
      console.log('Processing message:', { type, payload });
      
      if (type === 'URL_CHANGE' && payload && !isProcessingUrlChange) {
        const now = Date.now();
        const timeSinceLastChange = now - lastUrlChange;
        
        if (timeSinceLastChange >= URL_CHANGE_THROTTLE) {
          isProcessingUrlChange = true;
          console.log('Processing URL update to:', payload);
          
          try {
            window.history.pushState({}, '', payload);
            window.dispatchEvent(new PopStateEvent('popstate'));
            lastUrlChange = now;
          } catch (error) {
            console.error('Error updating URL:', error);
          } finally {
            isProcessingUrlChange = false;
          }
        } else {
          console.log(`URL change throttled. Time since last change: ${timeSinceLastChange}ms`);
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
      isProcessingUrlChange = false;
    }
  });

  // URL change notification
  let urlChangeTimeout = null;
  const DEBOUNCE_TIME = 400;
  let lastNotifiedPath = null;

  function notifyUrlChange() {
    if (urlChangeTimeout) {
      clearTimeout(urlChangeTimeout);
    }

    urlChangeTimeout = setTimeout(() => {
      const currentPath = window.location.pathname;
      
      if (currentPath !== lastNotifiedPath) {
        console.log('Notifying parent of URL change:', currentPath);
        
        window.parent.postMessage({
          type: 'URL_CHANGED',
          payload: {
            path: currentPath
          }
        }, '*');
        
        lastNotifiedPath = currentPath;
      }
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