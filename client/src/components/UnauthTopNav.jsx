import { useState, lazy } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Badge from 'react-bootstrap/Badge'

const LoginNotification = lazy(() => import('./misc/loginNotification'))

// non-authenticated top nav component; child component of Header
const UnAuthTopNav = () => {
  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <header role="banner">
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container>
            <LinkContainer to="/" className="title">
              <Navbar.Brand as={'h1'}>XZYMOUS</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/docs">
                  <Nav.Link>Documentation</Nav.Link>
                </LinkContainer>
                <Nav.Link>
                  <Badge bg="secondary" onClick={() => setModalShow(true)}>
                    Create Snippet
                  </Badge>
                </Nav.Link>
              </Nav>
              <Nav>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <LoginNotification show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}

export default UnAuthTopNav
