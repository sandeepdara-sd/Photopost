import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import store from '../app/store';
import '../styles/globals.css';


interface ErrorBoundaryProps {
  children: ReactNode; 
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
   
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Provider>
  );
}

export default MyApp;
