import React from 'react'
/* import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'
import { authService } from '../services/auth'
import { useCommon } from './common' */

const AuthContext = React.createContext({
  authenticated: null,
  authenticatedUser: null,
  setAuthenticated: () => {},
})

export const useAuth = () => React.useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = React.useState(null)
  const [authenticatedUser, setAuthenticatedUser] = React.useState(null)

  //const { mounted } = useCommon()

  //const accessToken = authService.getAccessToken()

 /*  React.useEffect(() => {
    const isAuthenticated = async () => {
      try {
        if (accessToken && mounted) {
          const decoded = jwt_decode(accessToken)
          let response = await authService.getUserById(decoded.id)
          console.log(response)
          setAuthenticated(true)
          setAuthenticatedUser(response)
        }
      } catch (err) {
        console.error(err.message)
        toast.error(err.message)
        setAuthenticated(false)
        setAuthenticatedUser(null)
      }
    }
    isAuthenticated()
  }, [accessToken, mounted]) */

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, authenticatedUser, setAuthenticatedUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
