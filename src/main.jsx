import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Store trusted origins
const TRUSTED_ORIGINS = [
  window.location.origin,
  'https://holocenefilms.dev',
  'https://*.holocenefilms.com'
];

// Helper function to validate origin
const isOriginTrusted = (origin) => {
  return TRUSTED_ORIGINS.some(trusted => {
    if (trusted.includes('*')) {
      const pattern = trusted.replace('*', '.*');
      return new RegExp(pattern).test(origin);
    }
    return trusted === origin;
  });
};

// Initialize communication with parent if running in iframe
if (window.parent !== window) {
  console.log('Running in iframe, initializing communication');
  try {
    window.parent.postMessage({
      type: 'INIT',
      timestamp: new Date().toISOString(),
      origin: window.location.origin
    }, '*');
  } catch (error) {
    console.error('Failed to send INIT message:', error);
  }
}

// Message handler with origin validation
window.addEventListener('message', (event) => {
  // Log received message origin for debugging
  console.log('Received message from:', event.origin);
  
  // Validate message origin
  if (!isOriginTrusted(event.origin)) {
    console.error('Message received from untrusted origin:', event.origin);
    return;
  }

  // Handle different message types
  try {
    const message = event.data;
    
    switch (message.type) {
      case 'READY':
        console.log('Parent window is ready');
        break;
      // Add more message type handlers as needed
      default:
        console.log('Received message:', message);
    }
  } catch (error) {
    console.error('Error processing message:', error);
  }
});

// Render the application
try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Error rendering application:", error);
  
  // If running in iframe, try to send error to parent
  if (window.parent !== window) {
    try {
      window.parent.postMessage({
        type: 'ERROR',
        error: error.message,
        timestamp: new Date().toISOString(),
        origin: window.location.origin
      }, '*');
    } catch (postMessageError) {
      console.error('Failed to send error to parent:', postMessageError);
      // Fallback to showing error UI
    }
  }
}