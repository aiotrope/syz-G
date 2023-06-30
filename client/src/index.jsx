import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './utils/sass/_index.scss'
import App from './App'
import { CommonProvider } from './contexts/common.jsx'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

if (process.env !== 'production') {
  const axe = require('@axe-core/react')
  axe(React, ReactDOM, 1000)
}

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CommonProvider>
        <App />
      </CommonProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
reportWebVitals()
