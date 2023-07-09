import { LinkContainer } from 'react-router-bootstrap'
import Stack from 'react-bootstrap/Stack'
import Nav from 'react-bootstrap/Nav'

export const Footer = () => {
  return (
    <Stack className="my-5">
      <Nav className="justify-content-center">
        <Nav.Item>
          <LinkContainer to="/">
            <Nav.Link className="text-secondary">Home</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/privacy">
            <Nav.Link className="text-secondary">Privacy Terms</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="https://github.com/aiotrope/xzymous"
            target="_blank"
            rel="noreferrer"
            className="text-secondary"
          >
            Code
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Stack>
  )
}

