import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { ToastContainer } from 'react-toastify'

import UnAuthTopNav from './components/header/unauthTopNav'
import AuthTopNav from './components/header/authTopNav'
import Router from './components/router/router'

import { useAuth } from './contexts/authContext'

import './utils/sass/_App.scss'

const App = () => {
  const { authenticated } = useAuth()

  return (
    <BrowserRouter>
      {authenticated ? <AuthTopNav /> : <UnAuthTopNav />}
      <main className="my-5">
        <Container>
          <ToastContainer />
          <Router />
        </Container>
      </main>
    </BrowserRouter>
  )
}

export default App
