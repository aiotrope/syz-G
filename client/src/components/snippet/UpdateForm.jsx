import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const UpdateForm = ({ handleSubmit, onSubmit, register, errors, updateMutation, reset }) => {
  return (
    <Form className="mt-2" spellCheck="false" noValidate onSubmit={handleSubmit(onSubmit)}>
      <FloatingLabel label="Snippet title" className="mb-2">
        <Form.Control
          as="textarea"
          {...register('title')}
          placeholder="Give your code snippet a title."
          style={{ height: '1rem' }}
          aria-invalid={errors.title?.message ? 'true' : 'false'}
          id="title"
          className={`${errors.title?.message ? 'is-invalid' : ''} `}
        />
        {errors.title?.message && (
          <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
        )}
      </FloatingLabel>
      <FloatingLabel label="Description" className="mb-2">
        <Form.Control
          as="textarea"
          {...register('description')}
          placeholder="Description"
          style={{ height: '2rem' }}
          aria-invalid={errors.description?.message ? 'true' : 'false'}
          id="description"
          className={`${errors.description?.message ? 'is-invalid' : ''} `}
        />
        {errors.description?.message && (
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        )}
        <Form.Text muted>
          What are the use cases of your snippet? Any particular application/s?
        </Form.Text>
      </FloatingLabel>
      <FloatingLabel label="Enter your snippet" className="mb-3">
        <Form.Control
          as="textarea"
          {...register('entry')}
          placeholder="Enter your snippet"
          style={{ height: '15rem' }}
          aria-invalid={errors.entry?.message ? 'true' : 'false'}
          id="entry"
          className={`${errors.entry?.message ? 'is-invalid' : ''} `}
        />
        {errors.entry?.message && (
          <Form.Control.Feedback type="invalid">{errors.entry?.message}</Form.Control.Feedback>
        )}
        <Form.Text muted>
          Code that you want to share or questions that you want to ask. Write in markdown/text
          form.
        </Form.Text>
      </FloatingLabel>
      <FormGroup className="my-5">
        <Row>
          <Col>
            <Button variant="info" size="lg" type="submit" onClick={() => updateMutation.reset()}>
              UPDATE POST
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

export default UpdateForm
