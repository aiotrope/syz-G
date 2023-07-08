import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import { CommonProvider } from './contexts/common'
import { AuthProvider } from './contexts/authContext'
import './sass/_index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

if (import.meta.env.MODE !== 'production') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000)
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <CommonProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
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
          <AuthProvider>
            <App />
          </AuthProvider>
        </CommonProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
}