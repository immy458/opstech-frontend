import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { ProvideAuth } from './hooks/useAuth.tsx'
import { store } from './store/index.ts'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ProvideAuth>
          <App />
        </ProvideAuth>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
