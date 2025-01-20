import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize communication when running in iframe
if (window.parent !== window) {
  console.log('[Iframe] Initializing iframe mode');
  console.log('[Iframe] Current origin:', window.location.origin);
  console.log('[Iframe] Current path:', window.location.pathname);
  
  // Send initial ready message with origin validation
  const sendMessage = (type, payload) => {
    try {
      const targetOrigin = '*'; // Allow cross-origin communication
      window.parent.postMessage({ type, payload }, targetOrigin);
      console.log('[Iframe] Message sent:', { type, payload });
    } catch (error) {
      console.error('[Iframe] Error sending message:', error);
    }
  };

  // Send ready message immediately
  sendMessage('IFRAME_READY', {
    origin: window.location.origin,
    path: window.location.pathname,
    timestamp: Date.now()
  });

  // Enhanced rate limiting configuration with logging
  const URL_CHANGE_THROTTLE = 1000; // 1 second
  const DEBOUNCE_TIME = 800; // 800ms
  let lastUrlChange = Date.now();
  let isProcessingUrlChange = false;
  let urlChangeTimeout = null;
  let lastNotifiedPath = window.location.pathname;

  // Handle messages from parent with improved logging and error handling
  window.addEventListener('message', (event) => {
    console.log('[Iframe] Received message:', event.data);
    
    try {
      const { type, payload } = event.data;
      
      if (type === 'URL_CHANGE' && payload) {
        console.log('[Iframe] Processing URL change request:', payload);
        
        if (isProcessingUrlChange) {
          console.log('[Iframe] Already processing a URL change, skipping');
          return;
        }

        const now = Date.now();
        const timeSinceLastChange = now - lastUrlChange;
        
        if (timeSinceLastChange >= URL_CHANGE_THROTTLE) {
          isProcessingUrlChange = true;
          
          try {
            window.history.pushState({}, '', payload);
            window.dispatchEvent(new PopStateEvent('popstate'));
            lastUrlChange = now;
            console.log('[Iframe] URL successfully updated to:', payload);
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

  // Debounced URL change notification with improved logging
  function notifyUrlChange() {
    if (urlChangeTimeout) {
      clearTimeout(urlChangeTimeout);
    }

    urlChangeTimeout = setTimeout(() => {
      const currentPath = window.location.pathname;
      
      if (currentPath !== lastNotifiedPath) {
        console.log('[Iframe] Notifying parent of URL change:', currentPath);
        sendMessage('URL_CHANGED', { 
          path: currentPath,
          timestamp: Date.now()
        });
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

// Create root and render application with error boundary
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);