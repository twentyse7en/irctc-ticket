import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  copyErrorToClipboard = () => {
    const errorText = `Error: ${this.state.error?.toString()}\n\nComponent Stack: ${this.state.errorInfo?.componentStack}`;
    navigator.clipboard.writeText(errorText)
      .then(() => {
        alert('Error copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy error: ', err);
      });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h2>Something went wrong</h2>
            <p>We apologize for the inconvenience. Please try again later.</p>
            <button className="retry-button" onClick={() => window.location.reload()}>
              Retry
            </button>
            <button className="copy-button" onClick={this.copyErrorToClipboard}>
              Copy Error Details
            </button>
            <button 
              className="retry-button" 
              onClick={() => {
                localStorage.removeItem('tickets');
              }}
            >
              Clear Tickets Data
            </button>
            {this.props.showDetails && (
              <details className="error-details">
                <summary>Error Details</summary>
                <pre>{this.state.error?.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;