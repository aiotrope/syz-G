import { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import Stack from 'react-bootstrap/Stack'
import Loader from '../loader'
import { toast } from 'react-toastify'
import { authService } from '../../services/auth'

import { jwt_atom } from '../../recoil/auth'

const schema = yup
  .object({
    email: yup.string().trim().email().required('Enter your registered email'),
    password: yup.string().trim().required(),
  })
  .required()

export const Login = () => {
  /* eslint-disable-next-line no-unused-vars */
  const [_, setJWT] = useRecoilState(jwt_atom)
  /* eslint-enable-next-line no-unused-vars */

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const _jwt = useRecoilValue(jwt_atom)

  const { isLoading, reset, mutateAsync } = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users', 'user'],
      })
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
        toast.success(result.message)
        setJWT(result.access)
      }
    } catch (err) {
      //console.error(err.response.data.error)
      toast.error(err.response.data.error)
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

  return (
    <Stack className="col-md-5 mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Login to your account</h2>
          <div>
            <p>
              New to XZYMOUS? <Link to={'/signup'}>Create an account</Link>
            </p>
          </div>
          <Form className="mt-2" spellCheck="false" noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className="mb-2">
              <FormLabel htmlFor="email">
                Email<span className="text-danger">*</span>
              </FormLabel>
              <FormControl
                type="email"
                placeholder="Email"
                {...register('email')}
                aria-invalid={errors.email?.message ? 'true' : 'false'}
                className={`${errors.email?.message ? 'is-invalid' : ''} `}
                id="email"
                size="lg"
              />
              {errors.email?.message && (
                <FormControl.Feedback type="invalid">{errors.email?.message}</FormControl.Feedback>
              )}
            </FormGroup>

            <FormGroup className="mb-4">
              <FormLabel htmlFor="password">
                Password<span className="text-danger">*</span>
              </FormLabel>
              <FormControl
                type="password"
                placeholder="Password"
                {...register('password')}
                aria-invalid={errors.password?.message ? 'true' : 'false'}
                className={`${errors.password?.message ? 'is-invalid' : ''} `}
                id="password"
                size="lg"
              />
              {errors.password?.message && (
                <FormControl.Feedback type="invalid">
                  {errors.password?.message}
                </FormControl.Feedback>
              )}
            </FormGroup>

            <FormGroup className="d-grid mt-3">
              <Button variant="primary" size="lg" type="submit" onClick={() => reset()}>
                Submit
              </Button>
            </FormGroup>
          </Form>
        </>
      )}
    </Stack>
  )
}
