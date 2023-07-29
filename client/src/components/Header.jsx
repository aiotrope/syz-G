import { lazy } from 'react'
import { useRecoilValue } from 'recoil'
import { jwt_atom } from '../recoil/auth'

const AuthTopNav = lazy(() => import('./AuthTopNav'))

const UnauthTopNav = lazy(() => import('./UnauthTopNav'))

// Header top nav component
const Header = () => {
  const jwt = useRecoilValue(jwt_atom)

  // presence of jwt access token will render <AuthTopNav />
  if (jwt) return <AuthTopNav />

  return <UnauthTopNav />
}

export default Header
