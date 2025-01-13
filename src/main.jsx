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
  'http://localhost:5173'
];

// Enhanced origin validation
const isOriginTrusted = (origin) => {
  if (!origin) return false;
  return TRUSTED_ORIGINS.includes(origin);
};

// Initialize communication when running in iframe
if (window.parent !== window) {
  console.log('Running in iframe, establishing secure communication channel');
  
  const sendInitMessage = () => {
    try {
      // Send initial handshake to parent with current origin
      window.parent.postMessage({
        type: 'IFRAME_INIT',
        payload: {
          timestamp: new Date().toISOString(),
          origin: CURRENT_ORIGIN
        }
      }, '*'); // Using * initially for handshake only
      
      console.log('Initialization message sent to parent');
    } catch (error) {
      console.error('Failed to send initialization message:', error);
    }
  };

  // Send initial message
  sendInitMessage();

  // Set up message listener
  window.addEventListener('message', (event) => {
    // Log received message details for debugging
    console.log('Received message:', {
      origin: event.origin,
      data: event.data,
      isTrusted: isOriginTrusted(event.origin)
    });

    // Validate origin
    if (!isOriginTrusted(event.origin)) {
      console.warn('Message rejected - untrusted origin:', event.origin);
      return;
    }

    try {
      const { type, payload } = event.data;
      
      switch (type) {
        case 'PARENT_READY':
          console.log('Parent window acknowledged connection');
          window.__IFRAME_READY = true;
          // Now we can use the validated origin for future communications
          window.__PARENT_ORIGIN = event.origin;
          break;
          
        case 'PARENT_COMMAND':
          console.log('Received command from parent:', payload);
          // Handle specific commands here using the validated origin
          if (window.__PARENT_ORIGIN) {
            window.parent.postMessage({
              type: 'COMMAND_RESPONSE',
              payload: { status: 'success' }
            }, window.__PARENT_ORIGIN);
          }
          break;
          
        default:
          console.log('Unhandled message type:', type);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      // Report error to parent if we have a validated origin
      if (window.__PARENT_ORIGIN) {
        window.parent.postMessage({
          type: 'ERROR',
          payload: { error: error.message }
        }, window.__PARENT_ORIGIN);
      }
    }
  });
}

// Render application with error boundary
try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error rendering application:', error);
  
  // Report error to parent if running in iframe
  if (window.parent !== window && window.__PARENT_ORIGIN) {
    window.parent.postMessage({
      type: 'IFRAME_ERROR',
      payload: {
        error: error.message,
        timestamp: new Date().toISOString()
      }
    }, window.__PARENT_ORIGIN);
  }
}