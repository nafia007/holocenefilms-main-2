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
      }, window.parent.origin || '*');
      
      console.log('Initialization message sent to parent:', window.parent.origin);
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
  if (window.parent !== window) {
    try {
      window.parent.postMessage({
        type: 'IFRAME_ERROR',
        payload: {
          error: error.message,
          timestamp: new Date().toISOString()
        }
      }, window.parent.origin || '*');
    } catch (postMessageError) {
      console.error('Failed to send error to parent:', postMessageError);
    }
  }
}