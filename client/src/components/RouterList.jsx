import { Routes, Route, Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import Home from './Home'
import { About } from './About'
import { CreateSnippet } from './CreateSnippet'
import { FetchSnippet } from './FetchSnippet'
import { UpdateSnippet } from './UpdateSnippet'
import { Signup } from './Signup'
import { Login } from './Login'
import { NotFound } from './NotFound'
import { Me } from './Me'
import { User } from './User'
import { Dashboard } from './Dashboard'
import { Privacy } from './Privacy'

import { jwt_atom } from '../recoil/auth'

export const RouterList = () => {
  const _jwt = useRecoilValue(jwt_atom)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/create-snippet" element={_jwt ? <CreateSnippet /> : <Navigate to="/login" />} />
      <Route path="/snippet/:id" element={<FetchSnippet />} />
      <Route
        path="/snippet/update/:id"
        element={_jwt ? <UpdateSnippet /> : <Navigate to="/login" />}
      />
      <Route path="/signup" element={_jwt ? <Navigate to="/dashboard" /> : <Signup />} />
      <Route path="/login" element={_jwt ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={_jwt ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/me" element={_jwt ? <Me /> : <Navigate to="/login" />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
