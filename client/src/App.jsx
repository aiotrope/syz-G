import { BrowserRouter } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Container from 'react-bootstrap/Container'
import { ToastContainer } from 'react-toastify'

import { UnAuthTopNav } from './components/unauthTopNav'
import { AuthTopNav } from './components/authTopNav'
import { Footer } from './components/footer/footer'
import { Router } from './components/router/router'

import { jwt_atom } from './recoil/auth'

import './sass/_App.scss'

const App = () => {
  const _jwt = useRecoilValue(jwt_atom)
  return (
    <BrowserRouter>
      {_jwt ? <AuthTopNav /> : <UnAuthTopNav />}
      <main className="my-5">
        <Container style={{ minHeight: '50px' }}>
          <ToastContainer theme="colored" />
          <Router />
        </Container>
        <footer>
          <Footer />
        </footer>
      </main>
    </BrowserRouter>
  )
}

export default App
