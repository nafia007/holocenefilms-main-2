import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Store trusted origins with exact domains
const TRUSTED_ORIGINS = [
  window.location.origin,
  'https://holocenefilms.dev',
  'https://*.holocenefilms.com',
  'https://localhost:3000',
  'https://localhost:5173'
];

// Enhanced origin validation with wildcard support
const isOriginTrusted = (origin) => {
  if (!origin) return false;
  
  return TRUSTED_ORIGINS.some(trusted => {
    if (trusted.includes('*')) {
      const pattern = trusted.replace('*', '[^.]+');
      const regex = new RegExp(`^${pattern.replace(/[.]/g, '\\.')}$`);
      return regex.test(origin);
    }
    return trusted === origin;
  });
};

// Initialize communication when running in iframe
if (window.parent !== window) {
  console.log('Running in iframe, establishing secure communication channel');
  
  // Send initial handshake
  const initializeIframe = () => {
    try {
      window.parent.postMessage({
        type: 'IFRAME_INIT',
        payload: {
          timestamp: new Date().toISOString(),
          origin: window.location.origin,
          status: 'ready'
        }
      }, '*');
      console.log('Initialization message sent successfully');
    } catch (error) {
      console.error('Failed to send initialization message:', error);
    }
  };

  // Attempt initialization
  initializeIframe();
  
  // Retry initialization if needed
  let retryCount = 0;
  const maxRetries = 3;
  
  const retryInitialization = setInterval(() => {
    if (retryCount >= maxRetries) {
      clearInterval(retryInitialization);
      console.error('Failed to establish communication after maximum retries');
      return;
    }
    
    if (!window.__IFRAME_READY) {
      console.log(`Retrying initialization (attempt ${retryCount + 1}/${maxRetries})`);
      initializeIframe();
      retryCount++;
    } else {
      clearInterval(retryInitialization);
    }
  }, 2000);
}

// Enhanced message handler
window.addEventListener('message', (event) => {
  // Log received message for debugging
  console.log('Received message from:', event.origin);
  console.log('Message data:', event.data);
  
  // Validate origin
  if (!isOriginTrusted(event.origin)) {
    console.error('Message rejected - untrusted origin:', event.origin);
    return;
  }

  // Process message
  try {
    const { type, payload } = event.data;
    
    switch (type) {
      case 'PARENT_READY':
        console.log('Parent window acknowledged connection');
        window.__IFRAME_READY = true;
        break;
        
      case 'PARENT_COMMAND':
        console.log('Received command from parent:', payload);
        // Handle specific commands here
        break;
        
      default:
        console.log('Unhandled message type:', type);
    }
  } catch (error) {
    console.error('Error processing message:', error);
  }
});

// Render application with error boundary
try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error rendering application:', error);
  
  if (window.parent !== window) {
    try {
      window.parent.postMessage({
        type: 'IFRAME_ERROR',
        payload: {
          error: error.message,
          timestamp: new Date().toISOString(),
          origin: window.location.origin
        }
      }, '*');
    } catch (postMessageError) {
      console.error('Failed to send error to parent:', postMessageError);
    }
  }
}