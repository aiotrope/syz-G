import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../home/home'
import About from '../about/about'
import Documentation from '../docs/docs'
import Signup from '../signup/signup'
import Login from '../login/login'
import NotFound from '../404/404'
import Account from '../account/account'
import LoginSuccess from '../login/loginSuccess'

//import { useAuth } from '../../contexts/authContext'

const Router = () => {
  //const { authenticated } = useAuth()

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/doc" element={<Documentation />} />
      {/* <Route exact path="/signup" element={authenticated ? <Navigate to="/" /> : <Signup />} /> */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/success" element={<LoginSuccess />} />
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
