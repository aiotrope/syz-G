import { useAuth } from '../../contexts/authContext'

export const Home = () => {
  const { authenticated } = useAuth()
  console.log(authenticated)
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  )
}

