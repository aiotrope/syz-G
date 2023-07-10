import { useRecoilValue, useRecoilState } from 'recoil'
import jwt_decode from 'jwt-decode'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'

import { jwt_atom } from '../../recoil/auth'
import { authService } from '../../services/auth'

export const AuthTopNav = () => {
  /* eslint-disable-next-line no-unused-vars */
  const [_, setJWT] = useRecoilState(jwt_atom)
  /* eslint-enable-next-line no-unused-vars */

  const token = useRecoilValue(jwt_atom)

  const decoded = jwt_decode(token)

  const logout = async () => {
    setJWT('')
    authService.clearJWTLocalStorage()
    toast.info(`${decoded.username} logged out`)
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
                <Nav.Link>{decoded?.username}</Nav.Link>
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
