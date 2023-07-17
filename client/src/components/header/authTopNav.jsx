import { useRecoilValue, useResetRecoilState } from 'recoil'
import jwtDecode from 'jwt-decode'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Image from 'react-bootstrap/Image'
import { toast } from 'react-toastify'

import { jwt_atom, user_atom } from '../../recoil/auth'

export const AuthTopNav = () => {
  const resetJWTAtom = useResetRecoilState(jwt_atom)
  const token = useRecoilValue(jwt_atom)

  const userState = useRecoilValue(user_atom)

  const decoded = jwtDecode(token)

  const logout = async () => {
    resetJWTAtom()
    toast.info(`${decoded.username} logged out`)
  }

  //console.log(userState)
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
              <LinkContainer to="/create-snippet">
                <Nav.Link>
                  <Badge bg="primary">Create Snippet</Badge>
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              {userState.avatar ? (
                <LinkContainer to="/me">
                  <Image
                    src={userState.avatar}
                    alt={`Profile photo of ${userState.username}`}
                    rounded
                    height={30}
                    width={30}
                    className="mx-1 mb-1 mt-1"
                  />
                </LinkContainer>
              ) : (
                <>
                  <LinkContainer to="/me" className="username text-danger">
                    <Nav.Link>{decoded.username}</Nav.Link>
                  </LinkContainer>
                </>
              )}

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
