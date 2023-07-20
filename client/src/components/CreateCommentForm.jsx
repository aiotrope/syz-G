import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

const CreateSnippetForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  commentMutation,
  reset,
}) => {
  return (
    <Form className="mt-2" spellCheck="false" noValidate onSubmit={handleSubmit(onSubmit)}>
      <FloatingLabel label="Comment" className="mb-3">
        <Form.Control
          as="textarea"
          {...register('commentary')}
          placeholder="Enter your comment"
          style={{ height: '15rem' }}
          aria-invalid={errors.commentary?.message ? 'true' : 'false'}
          id="entry"
          className={`${errors.commentary?.message ? 'is-invalid' : ''} `}
        />
        {errors.commentary?.message && (
          <Form.Control.Feedback type="invalid">{errors.commentary?.message}</Form.Control.Feedback>
        )}
      </FloatingLabel>
      <FormGroup className="my-5">
        <Row>
          <Col>
            <Button
              variant="info
            "
              size="lg"
              type="submit"
              onClick={() => commentMutation.reset()}
            >
              CREATE COMMENT
            </Button>
          </Col>
          <Col>
            <Button variant="light" size="lg" type="button" onClick={() => reset()}>
              RESET FORM
            </Button>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  )
}

export default CreateSnippetForm
