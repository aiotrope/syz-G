import { Routes, Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Documentation from '../docs'
import Signup from '../signup'
import Login from '../login'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/doc" element={<Documentation />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default Router
