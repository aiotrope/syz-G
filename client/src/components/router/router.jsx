import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { Home } from '../Home/Home'
import { About } from '../About/About'
import { CreateSnippet } from '../Snippet/Create'
import { FetchSnippet } from '../Snippet/FetchSnippet'
import { UpdateSnippet } from '../Snippet/UpdateSnippet'
import { Signup } from '../Signup/Signup'
import { Login } from '../Login/Login'
import { NotFound } from '../NotFound/NotFound'
import { Me } from '../Me/Me'
import { User } from '../Me/User'
import { Dashboard } from '../Dashboard/Dashboard'
import { Privacy } from '../Privacy/Privacy'

import { jwt_atom } from '../../recoil/auth'

export const Router = () => {
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
