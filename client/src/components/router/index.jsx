import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Documentation from '../docs'
import Signup from '../signup'
import Login from '../login'
import NotFound from '../404'
import Account from '../account'

import { useAuth } from '../../contexts/authContext'

const Router = () => {
  const { authenticated } = useAuth()

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/doc" element={<Documentation />} />
      <Route exact path="/signup" element={authenticated ? <Navigate to="/" /> : <Signup />} />
      <Route exact path="/login" element={authenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/account" element={authenticated ? <Account /> : <Navigate to='/login' />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
