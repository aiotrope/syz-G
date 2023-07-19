import { lazy, Suspense } from 'react'
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

const HomeComponent = () => (
  <Suspense
    fallback={
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    }
  >
    <Home />
  </Suspense>
)
const MeComponent = () => (
  <Suspense
    fallback={
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    }
  >
    <Me />
  </Suspense>
)
const FetchSnippetComponent = () => (
  <Suspense
    fallback={
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    }
  >
    <FetchSnippet />
  </Suspense>
)

const RouterList = () => {
  const _jwt = useRecoilValue(jwt_atom)

  return (
    <Routes>
      <Route path="/" element={<HomeComponent />} />
      <Route path="/about" element={<About />} />
      <Route path="/create-snippet" element={_jwt ? <CreateSnippet /> : <Navigate to="/login" />} />
      <Route path="/snippet/:id" element={<FetchSnippetComponent />} />
      <Route
        path="/snippet/update/:id"
        element={_jwt ? <UpdateSnippet /> : <Navigate to="/login" />}
      />
      <Route path="/signup" element={_jwt ? <Navigate to="/dashboard" /> : <Signup />} />
      <Route path="/login" element={_jwt ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={_jwt ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/me" element={_jwt ? <MeComponent /> : <Navigate to="/login" />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default RouterList
