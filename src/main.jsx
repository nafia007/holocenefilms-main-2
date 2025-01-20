import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize communication when running in iframe
if (window.parent !== window) {
  console.log('[Iframe] Running in iframe mode');
  
  // Send initial ready message with origin validation
  const sendMessage = (type, payload) => {
    const targetOrigin = '*'; // Allow cross-origin communication
    window.parent.postMessage({ type, payload }, targetOrigin);
  };

  // Send ready message
  sendMessage('IFRAME_READY', {
    origin: window.location.origin,
    path: window.location.pathname
  });

  // Enhanced rate limiting configuration
  const URL_CHANGE_THROTTLE = 1000; // Increased to 1 second
  const DEBOUNCE_TIME = 800; // Increased to 800ms
  let lastUrlChange = Date.now();
  let isProcessingUrlChange = false;
  let urlChangeTimeout = null;
  let lastNotifiedPath = window.location.pathname;

  // Handle messages from parent with improved logging
  window.addEventListener('message', (event) => {
    try {
      // Log incoming message details
      console.log('[Iframe] Message received:', {
        type: event.data.type,
        origin: event.origin,
        currentOrigin: window.location.origin
      });
      
      const { type, payload } = event.data;
      
      if (type === 'URL_CHANGE' && payload && !isProcessingUrlChange) {
        const now = Date.now();
        const timeSinceLastChange = now - lastUrlChange;
        
        if (timeSinceLastChange >= URL_CHANGE_THROTTLE) {
          isProcessingUrlChange = true;
          console.log('[Iframe] Processing URL update:', payload);
          
          try {
            window.history.pushState({}, '', payload);
            window.dispatchEvent(new PopStateEvent('popstate'));
            lastUrlChange = now;
          } catch (error) {
            console.error('[Iframe] Error updating URL:', error);
          } finally {
            isProcessingUrlChange = false;
          }
        } else {
          console.log(`[Iframe] URL change throttled. Wait time: ${timeSinceLastChange}ms`);
        }
      }
    } catch (error) {
      console.error('[Iframe] Error processing message:', error);
      isProcessingUrlChange = false;
    }
  });

  // Debounced URL change notification
  function notifyUrlChange() {
    if (urlChangeTimeout) {
      clearTimeout(urlChangeTimeout);
    }

    urlChangeTimeout = setTimeout(() => {
      const currentPath = window.location.pathname;
      
      if (currentPath !== lastNotifiedPath) {
        console.log('[Iframe] Notifying parent of URL change:', currentPath);
        sendMessage('URL_CHANGED', { path: currentPath });
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