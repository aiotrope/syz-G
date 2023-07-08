import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'

import { useAuth } from '../../contexts/authContext'
import { authService } from '../../services/auth'

const AuthTopNav = () => {
  const { setAuthenticatedUser, setAuthenticated, authenticatedUser } = useAuth()

  const navigate = useNavigate()
  const logout = async () => {
    await authService.logout(authenticatedUser?.id)
    setAuthenticated(false)
    setAuthenticatedUser(null)
    await authService.clearLocalStorage()
    toast.info(`${authenticatedUser?.username} logged out`)
    navigate('/')
  }
  return (
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
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/doc">
                <Nav.Link>Documentation</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to="/account">
                <Nav.Link>{authenticatedUser?.username}</Nav.Link>
              </LinkContainer>
              <Nav.Item>
                <Button onClick={() => logout()} variant="warning">
                  Logout
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default AuthTopNav
