import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'

// child component from Signup component rendering the signup form
const SignupForm = ({ handleSubmit, onSubmit, register, errors, reset }) => {
  return (
    <Form className="mt-2" spellCheck="false" noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormGroup className="mb-3">
        <FormLabel htmlFor="username">
          Username<span className="text-danger">*</span>
        </FormLabel>
        <FormControl
          type="text"
          placeholder="Four characters in length"
          {...register('username')}
          aria-invalid={errors.username?.message ? 'true' : 'false'}
          className={`${errors.username?.message ? 'is-invalid' : ''} `}
          id="username"
          size="lg"
        />
        {errors.username?.message && (
          <FormControl.Feedback type="invalid">{errors.username?.message}</FormControl.Feedback>
        )}
        <Form.Text muted>Contains only letters, numbers, and symbols.</Form.Text>
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
          placeholder="Eight characters long"
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
          1 small & capital letters, numbers and special characters.
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
        <Button variant="primary" size="lg" type="submit" id="signup-btn" onClick={() => reset()}>
          Submit Registration
        </Button>
      </FormGroup>
    </Form>
  )
}

export default SignupForm
