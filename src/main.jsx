
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Create root with error handling
const container = document.getElementById('root');
if (!container) {
  console.error('Failed to find root element');
  throw new Error('Failed to find root element');
}

const root = ReactDOM.createRoot(container);

// Simple error boundary component
const ErrorDisplay = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1F2C] via-[#403E43] to-[#221F26]">
    <div className="text-white text-center p-4 max-w-md">
      <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
      <p className="mb-4">Please try refreshing the page</p>
      <details className="text-left bg-black/30 p-2 rounded text-xs overflow-auto">
        <summary className="cursor-pointer">Error details</summary>
        <pre className="mt-2 whitespace-pre-wrap">{error?.message || 'Unknown error'}</pre>
      </details>
    </div>
  </div>
);

const LoadingDisplay = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-center">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-purple-500">Loading application...</p>
    </div>
  </div>
);

// Use a basic error handling approach
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Render with basic error handling
try {
  console.log('Attempting to render application...');
  
  root.render(
    <React.StrictMode>
      <React.Suspense fallback={<LoadingDisplay />}>
        <App />
      </React.Suspense>
    </React.StrictMode>
  );
  
  console.log('Render call completed');
} catch (error) {
  console.error('Fatal error during initial render:', error);
  root.render(<ErrorDisplay error={error} />);
}
