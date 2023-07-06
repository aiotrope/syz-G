import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useCommon } from '../../contexts/common'
import { authService } from '../../services/auth'
import { useAuth } from '../../contexts/authContext'

const Dashboard = () => {
  const { mounted } = useCommon()

  const { setAuthenticatedUser, setAuthenticated } = useAuth()

  useEffect(() => {
    const prepare = async () => {
      try {
        const response = await authService.getGoogleUser()
        if (response && mounted) {
          setAuthenticated(true)
          setAuthenticatedUser(response?.googleUser)
          localStorage.setItem('googleUser', JSON.stringify(response?.googleUser))
        }
      } catch (err) {
        toast.error(err.response)
      }
    }
    prepare()
  }, [mounted, setAuthenticated, setAuthenticatedUser])

  return <div>Thanks for loggin in!</div>
}

export default Dashboard