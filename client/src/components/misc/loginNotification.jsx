import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Stack from 'react-bootstrap/Stack'

export const LoginNotification = (props) => {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Join Xzymous!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Login or signup to the platform to post a snippet, make comment or vote.</h5>
        <Stack gap={3} className="col-md-5 mx-auto">
          <Link to="/signup">
            <Button variant="outline-secondary" size="lg">
              Need an account?
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline-secondary" size="lg">
              Already have an account?
            </Button>
          </Link>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
