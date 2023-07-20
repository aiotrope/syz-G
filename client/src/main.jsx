import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'

import './sass/_index.scss'
export const App = lazy(() => import('./App'))
const Loader = lazy(() => import('./components/misc/loader'))

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

if (import.meta.env.MODE !== 'production') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000)
    root.render(
      <React.StrictMode>
        <Suspense fallback={<Loader />}>
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </RecoilRoot>
          </QueryClientProvider>
        </Suspense>
      </React.StrictMode>
    )
  })
} else {
  root.render(
    <React.StrictMode>
      <Suspense fallback={<Loader />}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </RecoilRoot>
        </QueryClientProvider>
      </Suspense>
    </React.StrictMode>
  )
}
