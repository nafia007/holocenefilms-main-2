
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      retryCount: 0
    };
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      errorInfo: errorInfo
    });
    // Log to an error reporting service here if needed
  }

  resetError() {
    const { retryCount } = this.state;
    if (retryCount < 3) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: retryCount + 1
      });
    } else {
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        this.props.fallback(this.state.error)
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1F2C] via-[#403E43] to-[#221F26] p-4">
          <div className="text-white text-center max-w-md">
            <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-4">The application encountered an error. {this.state.retryCount < 3 ? 'We\'ll try to recover automatically.' : 'Please try refreshing the page.'}</p>
            {this.state.error && (
              <div className="mb-4 text-sm bg-black/30 p-4 rounded text-left">
                <p className="text-red-400 font-medium">Error: {this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-purple-400">Stack trace</summary>
                    <pre className="mt-2 text-xs overflow-auto whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}
            <button 
              onClick={this.resetError} 
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              {this.state.retryCount < 3 ? 'Try Again' : 'Refresh Page'}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
