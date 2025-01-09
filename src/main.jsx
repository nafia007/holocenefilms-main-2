import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Log the current origin for debugging
console.log('Current window origin:', window.location.origin);

// Add event listener for message events with improved origin handling
window.addEventListener('message', (event) => {
  // Log received message and origin for debugging
  console.log('Received message from origin:', event.origin);
  console.log('Message data:', event.data);
  
  // Handle the message - we accept messages from any origin but validate the content
  if (event.data && typeof event.data === 'object') {
    // Process the message based on its type
    switch (event.data.type) {
      case 'INIT':
        console.log('Initialization message received');
        // Respond to confirm initialization
        event.source?.postMessage({
          type: 'READY',
          origin: window.location.origin
        }, '*');
        break;
      default:
        console.log('Unhandled message type:', event.data.type);
    }
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
  
  // Send error information to parent if in iframe, using '*' for development
  if (window.parent !== window) {
    try {
      // Log the error details for debugging
      console.log('Sending error to parent:', error.message);
      
      window.parent.postMessage({
        type: 'ERROR',
        error: error.message,
        timestamp: new Date().toISOString(),
        origin: window.location.origin
      }, '*');
    } catch (postMessageError) {
      console.error('Failed to send error to parent:', postMessageError);
    }
  }
  
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