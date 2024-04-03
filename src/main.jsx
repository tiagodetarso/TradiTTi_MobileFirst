import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/index.jsx'
import { CookiesProvider } from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </CookiesProvider>
)
