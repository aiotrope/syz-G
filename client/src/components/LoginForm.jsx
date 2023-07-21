import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'

const LoginForm = ({ handleSubmit, onSubmit, register, errors, reset }) => {
  return (
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
          <FormControl.Feedback type="invalid">{errors.password?.message}</FormControl.Feedback>
        )}
      </FormGroup>
      <FormGroup className="d-grid mt-3">
        <Button variant="primary" size="lg" type="submit" onClick={() => reset()}>
          LOGIN
        </Button>
      </FormGroup>
    </Form>
  )
}

export default LoginForm
