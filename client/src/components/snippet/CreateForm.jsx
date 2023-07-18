import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

function CreateForm({
  handleSubmit, onSubmit, register, errors, handleClickLang, postMutation, resetForm, tag, tagValue,
}) {
  return (
    <Form className="mt-2" spellCheck="false" noValidate onSubmit={handleSubmit(onSubmit)}>
      <FloatingLabel label="Tag your post" className="mb-2">
        <Form.Control
          type="text"
          {...register('lang')}
          placeholder="What programming language is your code related to?"
          style={{ height: '2rem' }}
          aria-invalid={errors.lang?.message ? 'true' : 'false'}
          id="lang"
          className={`${errors.lang?.message ? 'is-invalid' : ''} `} />
        {errors.lang?.message && (
          <Form.Control.Feedback type="invalid">{errors.lang?.message}</Form.Control.Feedback>
        )}
        <Form.Text muted>
          Particular topics? programming languages involve? Can enter one or more tags.
        </Form.Text>
        <div className="mb-2">
          <Button type="button" size="sm" variant="outline-secondary" onClick={handleClickLang}>
            ADD TAG
          </Button>
          <br />
          {tag ? tagValue : null}
        </div>
      </FloatingLabel>
      <FloatingLabel label="Snippet title" className="mb-2">
        <Form.Control
          as="textarea"
          {...register('title')}
          placeholder="Give your code snippet a title."
          style={{ height: '1rem' }}
          aria-invalid={errors.title?.message ? 'true' : 'false'}
          id="title"
          className={`${errors.title?.message ? 'is-invalid' : ''} `} />
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
          className={`${errors.description?.message ? 'is-invalid' : ''} `} />
        {errors.description?.message && (
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        )}
        <Form.Text muted>Application and use cases of your posts.</Form.Text>
      </FloatingLabel>
      <FloatingLabel label="Enter your snippet" className="mb-3">
        <Form.Control
          as="textarea"
          {...register('entry')}
          placeholder="Enter your snippet"
          style={{ height: '15rem' }}
          aria-invalid={errors.entry?.message ? 'true' : 'false'}
          id="entry"
          className={`${errors.entry?.message ? 'is-invalid' : ''} `} />
        {errors.entry?.message && (
          <Form.Control.Feedback type="invalid">{errors.entry?.message}</Form.Control.Feedback>
        )}
        <Form.Text muted>Code that you want to share or questions that you want to ask.</Form.Text>
      </FloatingLabel>
      <FormGroup className="my-5">
        <Row>
          <Col>
            <Button variant="info" size="lg" type="submit" onClick={() => postMutation.reset()}>
              SUBMIT POST
            </Button>
          </Col>
          <Col>
            <Button variant="light" size="lg" type="button" onClick={() => resetForm()}>
              RESET FORM
            </Button>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  )
}

export default CreateForm
