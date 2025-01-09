import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Add event listener for message events
window.addEventListener('message', (event) => {
  // Verify the origin of the message
  if (event.origin !== window.location.origin) {
    console.warn('Received message from unexpected origin:', event.origin);
    return;
  }
  // Handle the message
  console.log('Received message:', event.data);
});

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Error rendering application:", error);
  // Send error information to parent if in iframe
  if (window.parent !== window) {
    try {
      window.parent.postMessage({
        type: 'ERROR',
        error: error.message
      }, window.location.origin);
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