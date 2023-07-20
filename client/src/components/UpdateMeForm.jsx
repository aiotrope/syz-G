import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import Button from 'react-bootstrap/Button'

const UpdateMeForm = ({ handleSubmit, onSubmit, register, errors, user }) => {
  return (
    <Form className="mt-2 mb-4" spellCheck="false" noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormGroup className="mb-2">
        <FormLabel htmlFor="username">Username</FormLabel>
        <FormControl
          type="text"
          placeholder={user.username}
          {...register('username')}
          aria-invalid={errors.username?.message ? 'true' : 'false'}
          className={`${errors.username?.message ? 'is-invalid' : ''} `}
          size="lg"
        />
        {errors.username?.message && (
          <FormControl.Feedback type="invalid">{errors.username?.message}</FormControl.Feedback>
        )}
        <Form.Text muted>Contains only letters, numbers, and symbols.</Form.Text>
      </FormGroup>
      <FormGroup className="mb-2">
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormControl
          type="email"
          placeholder={user.email}
          {...register('email')}
          aria-invalid={errors.email?.message ? 'true' : 'false'}
          className={`${errors.email?.message ? 'is-invalid' : ''} `}
          size="lg"
        />
        {errors.email?.message && (
          <FormControl.Feedback type="invalid">{errors.email?.message}</FormControl.Feedback>
        )}
      </FormGroup>
      <FormGroup className="mb-2">
        <FormLabel htmlFor="bio">Bio</FormLabel>
        <FormControl
          as="textarea"
          rows={4}
          placeholder={user.bio}
          {...register('bio')}
          aria-invalid={errors.bio?.message ? 'true' : 'false'}
          className={`${errors.bio?.message ? 'is-invalid' : ''} `}
          size="lg"
        />
        {errors.bio?.message && (
          <FormControl.Feedback type="invalid">{errors.bio?.message}</FormControl.Feedback>
        )}
      </FormGroup>
      <FormGroup className="d-grid mt-3">
        <Button variant="light" size="lg" type="submit">
          UPDATE PROFILE
        </Button>
      </FormGroup>
    </Form>
  )
}

export default UpdateMeForm
