import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
//import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useCommon } from '../../contexts/common'
import { authService } from '../../services/auth'
//import { useAuth } from '../../contexts/authContext'

import { jwt_atom } from '../../recoil/auth'

export const Dashboard = () => {
  const { mounted } = useCommon()

  /* eslint-disable-next-line no-unused-vars */
  const [_, setJWT] = useRecoilState(jwt_atom)
  /* eslint-enable-next-line no-unused-vars */

  const _jwt = useRecoilValue(jwt_atom)

  useEffect(() => {
    const prepare = async () => {
      try {
        const response = await authService.getGoogleUserAccessToken()

        if (response && mounted) {
          setJWT(response.access)
          toast.success(response.message)
        }
      } catch (err) {
        toast.error(err.response)
      }
    }
    prepare()
  }, [mounted, setJWT])

  console.log(_jwt)

  return <div>Thanks for loggin in!</div>
}
