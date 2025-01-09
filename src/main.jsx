import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Store trusted origins
const TRUSTED_ORIGINS = [
  window.location.origin,
  'https://lovable.dev',
  'https://*.lovableproject.com'
];

// Helper function to check if an origin is trusted
const isTrustedOrigin = (origin) => {
  return TRUSTED_ORIGINS.some(trusted => {
    if (trusted.includes('*')) {
      const pattern = trusted.replace('*', '.*');
      return new RegExp(pattern).test(origin);
    }
    return trusted === origin;
  });
};

// Initialize communication with parent if in iframe
if (window.parent !== window) {
  console.log('Running in iframe, initializing communication...');
  try {
    window.parent.postMessage({
      type: 'INIT',
      origin: window.location.origin
    }, '*');
  } catch (error) {
    console.error('Failed to send init message:', error);
  }
}

// Message handler with origin validation
window.addEventListener('message', (event) => {
  // Log received message origin for debugging
  console.log('Received message from:', event.origin);
  
  // Validate message origin
  if (!isTrustedOrigin(event.origin)) {
    console.warn('Message received from untrusted origin:', event.origin);
    return;
  }

  // Validate message structure
  if (!event.data || typeof event.data !== 'object') {
    console.warn('Invalid message format received');
    return;
  }

  // Handle different message types
  switch (event.data.type) {
    case 'INIT':
      console.log('Initialization request received');
      event.source?.postMessage({
        type: 'READY',
        origin: window.location.origin,
        timestamp: new Date().toISOString()
      }, event.origin);
      break;
      
    case 'READY':
      console.log('Ready confirmation received');
      break;
      
    default:
      console.log('Unhandled message type:', event.data.type);
  }
});

try {
  root.render(
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
      root.render(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1F2C] to-[#221F26] text-white p-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">Unable to Load Application</h1>
            <p className="text-gray-300 mb-4">We're experiencing technical difficulties. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
  }
}