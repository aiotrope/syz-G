import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'

import './sass/_index.scss'

export const App = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

if (import.meta.env.MODE !== 'production') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000)
    root.render(
      <React.StrictMode>
        <Suspense
          fallback={
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          }
        >
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>
              <App />
            </RecoilRoot>
          </QueryClientProvider>
        </Suspense>
      </React.StrictMode>
    )
  })
} else {
  root.render(
    <React.StrictMode>
      <Suspense
        fallback={
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        }
      >
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </QueryClientProvider>
      </Suspense>
    </React.StrictMode>
  )
}
