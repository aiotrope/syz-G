import { lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { ToastContainer } from 'react-toastify'

import './sass/_App.scss'

const Header = lazy(() => import('./components/Header'))
const Footer = lazy(() => import('./components/Footer'))
const RouterList = lazy(() => import('./components/RouterList'))

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="my-5">
        <Container style={{ minHeight: '50px' }}>
          <ToastContainer theme="colored" />
          <RouterList />
        </Container>
        <footer>
          <Footer />
        </footer>
      </main>
    </BrowserRouter>
  )
}

export default App
