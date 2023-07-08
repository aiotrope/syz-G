import { useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
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

const password_regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~?/`!@#$%^&*()\-_=+{};:,<.>])(?=.{8,})/

const username_regex = /^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-{}€"'ÄöäÖØÆ`~_]{2,}$/

const schema = yup
  .object({
    username: yup.string().trim().matches(username_regex).required(),
    email: yup.string().email().required(),
    password: yup.string().trim().matches(password_regex).required(),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
  })
  .required()

const Signup = () => {
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

  const { addSignedEmail } = useCommon()

  const onSubmit = async (userData) => {
    //console.log(userData)
    try {
      const result = await mutateAsync(userData)
      addSignedEmail(userData.email)
      if (result) {
        //console.log(result)

        toast.success(result.message)

        navigate('/login')
      }
    } catch (err) {
      toast.error(err.response.data.error)
    }
  }

  if (isLoading) {
    return (
      <Spinner animation="border" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }
  return (
    <Stack className="col-md-5 mx-auto">
      <h2>Create an account</h2>
      <div>
        <p>
          Already have an account? <Link to={'/login'}>Login to XZYMOUS</Link>
        </p>
      </div>
      <Form className="mt-2" spellCheck="false" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="username">
            Username<span className="text-danger">*</span>
          </FormLabel>
          <FormControl
            type="text"
            placeholder="Enter username"
            {...register('username')}
            aria-invalid={errors.username?.message ? 'true' : 'false'}
            className={`${errors.username?.message ? 'is-invalid' : ''} `}
            id="username"
            size="lg"
          />
          {errors.username?.message && (
            <FormControl.Feedback type="invalid">{errors.username?.message}</FormControl.Feedback>
          )}
          <Form.Text muted>
            Username may contain only letters, numbers, and @/./+/-/_ characters.
          </Form.Text>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="email">
            Email<span className="text-danger">*</span>
          </FormLabel>
          <FormControl
            type="email"
            placeholder="Enter your email"
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
        <FormGroup className="mb-3">
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
          <Form.Text id="passwordHelpBlock" muted>
            8 characters long with small & capital letters, numbers and special characters.
          </Form.Text>
        </FormGroup>
        <FormGroup className="mb-5">
          <FormLabel htmlFor="confirm">
            Password Confirmation<span className="text-danger">*</span>
          </FormLabel>
          <FormControl
            type="password"
            placeholder="Re-enter your password"
            {...register('confirm')}
            aria-invalid={errors.confirm?.message ? 'true' : 'false'}
            className={`${errors.confirm?.message ? 'is-invalid' : ''} `}
            id="confirm"
            size="lg"
          />
          {errors.confirm?.message && (
            <FormControl.Feedback type="invalid">{errors.confirm?.message}</FormControl.Feedback>
          )}
        </FormGroup>
        <FormGroup className="d-grid mt-3">
          <Button variant="primary" size="lg" type="submit" onClick={() => reset()}>
            Submit Registration
          </Button>
        </FormGroup>
      </Form>
      <div className="text-center mt-2">
        <strong>OR</strong>
      </div>
    </Stack>
  )
}

export default Signup