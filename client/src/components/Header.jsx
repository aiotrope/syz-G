import { lazy } from 'react'
import { useRecoilValue } from 'recoil'
import { jwt_atom } from '../recoil/auth'

const AuthTopNav = lazy(() => import('./AuthTopNav'))

const UnauthTopNav = lazy(() => import('./UnauthTopNav'))

const Header = () => {
  const jwt = useRecoilValue(jwt_atom)

  if (jwt) return <AuthTopNav />

  return <UnauthTopNav />
}

export default Header
