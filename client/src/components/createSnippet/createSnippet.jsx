//import { useForm } from 'react-hook-form'
//import * as yup from 'yup'
//import { yupResolver } from '@hookform/resolvers/yup'
import Form from 'react-bootstrap/Form'
//import FormControl from 'react-bootstrap/FormControl'
//import FormGroup from 'react-bootstrap/FormGroup'
//import FormLabel from 'react-bootstrap/FormLabel'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Stack from 'react-bootstrap/Stack'
//import Button from 'react-bootstrap/Button'

export const CreateSnippet = () => {
  return (
    <Stack className="col-md-9 mx-auto">
      <h2>Create Snippet</h2>
      <Form>
        <FloatingLabel label="Your snippet title" className="mb-3">
          <Form.Control as="textarea" placeholder="username" style={{ height: '3rem' }} />

          <Form.Text muted>Contains only letters, numbers, and symbols.</Form.Text>
        </FloatingLabel>

        <FloatingLabel label="Password">
          <Form.Control as="textarea" placeholder="Password" />
        </FloatingLabel>
      </Form>
    </Stack>
  )
}
