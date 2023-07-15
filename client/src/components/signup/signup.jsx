import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Stack from 'react-bootstrap/Stack'
import { toast } from 'react-toastify'

import Loader from '../Misc/Loader'
import { SignupForm } from './SignupForm'

import { authService } from '../../services/auth'

const password_regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~?/`!@#$%^&*()\-_=+{};:,<.>])(?=.{8,})/

const username_regex = /^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-{}€"'ÄöäÖØÆ`~_]{4,}$/

const schema = yup
  .object({
    username: yup.string().trim().matches(username_regex).required(),
    email: yup.string().email().required(),
    password: yup.string().trim().matches(password_regex).required(),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
  })
  .required()

export const Signup = () => {
  const queryClient = useQueryClient()
  const { isLoading, reset, mutateAsync } = useMutation({
    mutationFn: authService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-account'],
      })
    },
  })

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const onSubmit = async (userData) => {
    //console.log(userData)
    try {
      const result = await mutateAsync(userData)
      if (result) {
        //console.log(result)
        toast.success(result.message, { theme: 'colored' })

        navigate('/login')
      }
    } catch (err) {
      toast.error(err.response.data.error, { theme: 'colored' })
    }
  }

  return (
    <Stack className="col-md-5 mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Create an account</h2>
          <div>
            <p>
              Already have an account? <Link to={'/login'}>Login to XZYMOUS</Link>
            </p>
          </div>
          <SignupForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            reset={reset}
            errors={errors}
          />
        </>
      )}
    </Stack>
  )
}
