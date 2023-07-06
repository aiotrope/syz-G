import React from 'react'
import { useAuth } from '../../contexts/authContext'

const Home = () => {
  const { authenticated } = useAuth()
  console.log(authenticated)
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  )
}

export default Home