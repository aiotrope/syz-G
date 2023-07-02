import React, { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import Spinner from 'react-bootstrap/Spinner'
import { toast } from 'react-toastify'
import { authService } from '../../services/auth'
import { useCommon } from '../../contexts/common'

const schema = yup
  .object({
    email: yup.string().trim().email().required('Enter your registered email'),
    password: yup.string().trim().required(),
  })
  .required()

const Login = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { mounted } = useCommon()

  const accessToken = authService.getAccessToken()

  const { isLoading, reset, mutateAsync } = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-account'],
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
        navigate('/')
        toast.success(result.message)
        let timer
        setTimeout(() => {
          window.location.reload()
          clearTimeout(timer)
        }, 6000)
      }
    } catch (err) {
      console.error(err.response.data.error)
      toast.error(err.response.data.error)
    }
  }

  useEffect(() => {
    const prepare = async () => {
      if (accessToken && mounted) {
        navigate('/')
      }
    }
    prepare()
  }, [accessToken, mounted, navigate])

  /* const handleGoogleLogin = async () => {
    let timer
    const googleLoginURL = 'http://localhost:8080/api/google/login'
    const newWindow = window.open(googleLoginURL, '_self')

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          authService.getGoogleUser()
          if (timer) clearInterval(timer)
        }
      }, 500)
    }
  } */

  if (isLoading) {
    return (
      <Spinner animation="grow" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <Stack className="col-md-5 mx-auto">
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
          {errors.username?.message && (
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
            <FormControl.Feedback type="invalid">{errors.password?.message}</FormControl.Feedback>
          )}
        </FormGroup>

        <FormGroup className="d-grid mt-3">
          <Button variant="primary" size="lg" type="submit" onClick={() => reset()}>
            Submit
          </Button>
        </FormGroup>
      </Form>
      <div className="text-center mt-4">
        <strong>OR</strong>
      </div>
      <div className="d-grid my-3">
        <Button variant="light" size="lg" href="http://localhost:8080/api/google">
          Login via Gmail
        </Button>
      </div>
    </Stack>
  )
}

export default Login
