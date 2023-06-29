import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'
import { CommonProvider } from './contexts/common.jsx'

import './assets/scss/_index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

/* root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <CommonProvider>
    <App />
    </CommonProvider>
    </QueryClientProvider>
  </React.StrictMode>
) */

if (import.meta.env !== 'production') {
  import('react-axe').then((axe) => {
    axe.default(React, ReactDOM, 1000)
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <CommonProvider>
            <App />
          </CommonProvider>
        </QueryClientProvider>
      </React.StrictMode>
    )
  })
} else {
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <CommonProvider>
          <App />
        </CommonProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
}
