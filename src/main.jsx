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
  }, CURRENT_ORIGIN);

  let lastUrlChange = Date.now();
  const URL_CHANGE_THROTTLE = 500; // Further increased minimum time between URL changes
  let isProcessingUrlChange = false;

  // Handle messages from parent
  window.addEventListener('message', (event) => {
    try {
      // Verify the origin of the message
      if (event.origin !== CURRENT_ORIGIN) {
        console.warn('Received message from unauthorized origin:', event.origin);
        return;
      }

      const { type, payload } = event.data;
      console.log('Received message:', { type, payload });
      
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

  // URL change notification with increased stability measures
  let urlChangeTimeout = null;
  const DEBOUNCE_TIME = 400; // Increased debounce time
  let lastNotifiedPath = null;

  function notifyUrlChange() {
    if (urlChangeTimeout) {
      clearTimeout(urlChangeTimeout);
    }

    urlChangeTimeout = setTimeout(() => {
      const currentPath = window.location.pathname;
      
      // Only notify if the path has actually changed
      if (currentPath !== lastNotifiedPath) {
        console.log('Notifying parent of URL change:', currentPath);
        
        window.parent.postMessage({
          type: 'URL_CHANGED',
          payload: {
            path: currentPath
          }
        }, CURRENT_ORIGIN);
        
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