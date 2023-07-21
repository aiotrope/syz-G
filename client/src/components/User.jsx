import { useEffect, lazy } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import moment from 'moment'
import { FaEnvelopeSquare, FaUserAstronaut, FaBirthdayCake, FaEdit, FaLeaf } from 'react-icons/fa'

import { userService } from '../services/user'
import { user_atom } from '../recoil/auth'
import { userKeys } from '../services/queryKeyFactory'

const Loader = lazy(() => import('./misc/loader'))
const CommentsCreated = lazy(() => import('./CommentsCreated'))
const SnippetsCreated = lazy(() => import('./SnippetsCreated'))

const User = () => {
  const { id } = useParams()

  const userQuery = useQuery([userKeys?.detail(id), id], () => userService?.getUserById(id))

  const setUser = useSetRecoilState(user_atom)

  const user = useRecoilValue(user_atom)

  useEffect(() => {
    let mounted = true

    const prepareUser = async () => {
      if (userQuery?.data && mounted) {
        setUser({
          ...userQuery?.data,
        })
      }
    }
    prepareUser()

    return () => {
      mounted = false
    }
  }, [setUser, userQuery?.data])

  if (userQuery.isLoading || userQuery.isFetching || userQuery.isInitialLoading) {
    return <Loader />
  }

  return (
    <Stack className="col-sm-8 mx-auto">
      <h2>Profile</h2>
      <Row>
        <Col>
          <Image
            src={user?.avatar}
            alt={`Profile photo of ${user?.username}`}
            rounded
            height={100}
            width={100}
          />
          <span className="mx-3 profile-user">{user?.username}</span>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <Card bg="info">
            <Card.Header>Info</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <FaUserAstronaut title={user?.username} aria-label={user?.username} />{' '}
                {user?.username}
              </ListGroup.Item>
              <ListGroup.Item>
                <FaEnvelopeSquare title={user?.email} aria-label={user?.email} /> {user?.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <FaLeaf title={`${user?.username} bio`} aria-label={`${user?.username} bio`} />{' '}
                {user?.bio}
              </ListGroup.Item>
              <ListGroup.Item>
                <FaBirthdayCake title="Profile created date" aria-label="Profile created date" />{' '}
                {moment(user?.createdAt).fromNow()}
              </ListGroup.Item>
              <ListGroup.Item>
                <FaEdit title="Profile updated date" aria-label="Profile updated date" />{' '}
                {moment(user?.updatedAt).fromNow()}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <SnippetsCreated user={user} />
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <CommentsCreated user={user} userQuery={userQuery} />
        </Col>
      </Row>
    </Stack>
  )
}

export default User
