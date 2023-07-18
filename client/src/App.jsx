import { lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Container from 'react-bootstrap/Container'
import { ToastContainer } from 'react-toastify'

//import { UnAuthTopNav } from './components/UnauthTopNav'

//import { AuthTopNav } from './components/AuthTopNav'
//import { Footer } from './components/Footer'
//import { RouterList } from './components/RouterList'

import { jwt_atom } from './recoil/auth'

import './sass/_App.scss'

const UnAuthTopNav = lazy(() => import('./components/UnauthTopNav'))
const AuthTopNav = lazy(() => import('./components/AuthTopNav'))
const Footer = lazy(() => import('./components/Footer'))
const RouterList = lazy(() => import('./components/RouterList'))

const App = () => {
  const _jwt = useRecoilValue(jwt_atom)
  return (
    <BrowserRouter>
      {_jwt ? <AuthTopNav /> : <UnAuthTopNav />}
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
