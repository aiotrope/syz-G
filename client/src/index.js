import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'

import { App } from './App'
import './sass/_index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000)
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </QueryClientProvider>
      </React.StrictMode>
    )
  })
} else {
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </QueryClientProvider>
    </React.StrictMode>
  )
}
