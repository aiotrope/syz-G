import { lazy, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { jwt_atom } from '../recoil/auth'
const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))
const CreateSnippet = lazy(() => import('./CreateSnippet'))
const FetchSnippet = lazy(() => import('./FetchSnippet'))
const UpdateSnippet = lazy(() => import('./UpdateSnippet'))
const Signup = lazy(() => import('./Signup'))
const Login = lazy(() => import('./Login'))
const NotFound = lazy(() => import('./NotFound'))
const Me = lazy(() => import('./Me'))
const User = lazy(() => import('./User'))
const Dashboard = lazy(() => import('./Dashboard'))
const Privacy = lazy(() => import('./Privacy'))
const CreateComment = lazy(() => import('./CreateComment'))
const UpdateComment = lazy(() => import('./UpdateComment'))

const RouterList = () => {
  const [searchText, setSearchText] = useState('')

  const _jwt = useRecoilValue(jwt_atom)

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Home searchText={searchText} setSearchText={setSearchText} />}
      />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={_jwt ? <Navigate to="/dashboard" /> : <Signup />} />
      <Route path="/login" element={_jwt ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={_jwt ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/me" element={_jwt ? <Me /> : <Navigate to="/login" />} />
      <Route exact path="/user/:id" element={<User />} />
      <Route path="/create-snippet" element={_jwt ? <CreateSnippet /> : <Navigate to="/login" />} />
      <Route
        exact
        path="/snippet/:id"
        element={<FetchSnippet searchText={searchText} setSearchText={setSearchText} />}
      />
      <Route
        path="/snippet/update/:id"
        element={_jwt ? <UpdateSnippet /> : <Navigate to="/login" />}
      />
      <Route
        path="/create-comment/:postId"
        element={_jwt ? <CreateComment /> : <Navigate to="/login" />}
      />
      <Route
        path="/comment/update/:id"
        element={_jwt ? <UpdateComment /> : <Navigate to="/login" />}
      />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default RouterList
