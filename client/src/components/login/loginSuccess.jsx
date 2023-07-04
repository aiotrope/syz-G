import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCommon } from '../../contexts/common'
import { authService } from '../../services/auth'

const LoginSuccess = () => {
  const { mounted } = useCommon()

  useEffect(() => {
    const prepare = async () => {
      try {
        const response = await authService.getGoogleUserToken()
        if (response && mounted) {
          localStorage.setItem('access', response?.access)
          toast.success(response.message)
        }
      } catch (err) {
        toast.error(err.response.data.error)
      }
    }
    prepare()
  }, [mounted])

  return <div>Thanks for loggin in!</div>
}

export default LoginSuccess
