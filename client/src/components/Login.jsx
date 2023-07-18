import { useEffect, lazy } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Stack from 'react-bootstrap/Stack'
import { toast } from 'react-toastify'
import { authService } from '../services/auth'

import { jwt_atom } from '../recoil/auth'
import { userKeys, postKeys } from '../services/queryKeyFactory'

const LoginForm = lazy(() => import('./login/loginForm'))
const Loader = lazy(() => import('./misc/loader'))

const schema = yup
  .object({
    email: yup.string().trim().email().required('Enter your registered email'),
    password: yup.string().trim().required(),
  })
  .required()

const Login = () => {
  /* eslint-disable-next-line no-unused-vars */
  const [_, setJWT] = useRecoilState(jwt_atom)
  /* eslint-enable-next-line no-unused-vars */

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const _jwt = useRecoilValue(jwt_atom)

  const { isLoading, reset, mutateAsync } = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.details() })
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      queryClient.invalidateQueries({ queryKey: postKeys.details() })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const onSubmit = async (formData) => {
    try {
      const result = await mutateAsync(formData)
      if (result) {
        navigate('/dashboard')
        toast.success(result?.message, { theme: 'colored' })
        setJWT(result?.access)
      }
    } catch (err) {
      //console.error(err.response.data.error)
      toast.error(err?.response?.data?.error, { theme: 'colored' })
    }
  }

  useEffect(() => {
    let mounted = true
    const prepare = async () => {
      if (_jwt && mounted) {
        navigate('/dashboard')
      }
    }
    prepare()

    return () => {
      mounted = false
    }
  }, [_jwt, navigate])

  if (isLoading) {
    return <Loader />
  }

  return (
    <Stack className="col-md-5 mx-auto">
      <h2>Login to your account</h2>
      <div>
        <p>
          New to XZYMOUS? <Link to={'/signup'}>Create an account</Link>
        </p>
      </div>
      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
        errors={errors}
      />
    </Stack>
  )
}

export default Login
