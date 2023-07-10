import { Routes, Route, Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Home } from '../home/home'
import { About } from '../about/about'
import { Documentation } from '../docs/docs'
import { Signup } from '../signup/signup'
import { Login } from '../login/login'
import { NotFound } from '../404/404'
import { Account } from '../account/account'
import { Dashboard } from '../dashboard/dashboard'
import { Privacy } from '../privacy/privacy'

import { jwt_atom } from '../../recoil/auth'

export const Router = () => {
  const _jwt = useRecoilValue(jwt_atom)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/doc" element={<Documentation />} />
      <Route path="/signup" element={_jwt ? <Navigate to="/dashboard" /> : <Signup />} />
      <Route path="/login" element={_jwt ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={_jwt ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/account" element={_jwt ? <Account /> : <Navigate to="/login" />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
