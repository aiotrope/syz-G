import { lazy } from 'react'
import { useRecoilValue } from 'recoil'

//import { authService } from '../services/auth'
import { jwt_atom } from '../recoil/auth'

const AuthTopNav = lazy(() => import('./headers/AuthTopNav'))

const UnauthTopNav = lazy(() => import('./headers/UnauthTopNav'))

const Header = () => {
  //const access = authService.getAccessToken()

  const jwt = useRecoilValue(jwt_atom)

  if (jwt) return <AuthTopNav />

  return <UnauthTopNav />
}

export default Header
