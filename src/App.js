import React from 'react'
import Routes from './routes/Router'
import { Router } from 'react-router'
import { IntlProvider } from 'react-intl'
import { ROUTES_CONFIG } from './routes/config'
import { getIntlConfig } from './dictionary/config'
import * as serviceWorker from './serviceWorker'
import AuthProvider from './context/Auth'
import ErrorProvider from './context/Error'
import history from './routes/history'
import ChatProvider from './context/Chat'

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <Router history={history}>
          <IntlProvider { ...getIntlConfig() } >
            <ChatProvider>
                <Routes routes={ROUTES_CONFIG} />
              </ChatProvider>
          </IntlProvider>
        </Router>
      </AuthProvider>
    </ErrorProvider>
  )
}

export default App

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()