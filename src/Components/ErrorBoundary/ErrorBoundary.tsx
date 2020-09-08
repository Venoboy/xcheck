import React from 'react';
import Error from '../Error/Error';

class ErrorBoundary extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state: any = {
    error: false,
    errorInfo: [],
  };

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error: true,
      errorInfo: [error, errorInfo],
    });
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.error) {
      // eslint-disable-next-line react/destructuring-assignment
      return <Error error={this.state.errorInfo} />;
    }
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;
