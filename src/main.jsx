import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App'
import { ErrorMessage } from './components/ErrorMessage'

const WrappedApp = () => (
  <ChakraProvider>
    <Router>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <App />
      </ErrorBoundary>
    </Router>
  </ChakraProvider>
)

ReactDOM.render(<WrappedApp />, document.getElementById('root'))
