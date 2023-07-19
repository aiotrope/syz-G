import { lazy } from 'react'
import Container from 'react-bootstrap/Container'
import { ToastContainer } from 'react-toastify'

import './sass/_App.scss'

const Header = lazy(() => import('./components/Header'))
const RouterList = lazy(() => import('./components/RouterList'))

const App = () => {
  return (
    <>
      <Header />
      <main className="my-5">
        <Container style={{ minHeight: '50px' }}>
          <ToastContainer theme="colored" />
          <RouterList />
        </Container>
      </main>
    </>
  )
}

export default App
