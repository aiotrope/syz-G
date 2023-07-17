import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Stack from 'react-bootstrap/Stack'
import moment from 'moment'

import { SnippetsCreated } from './me/snippetsCreated'
import { userService } from '../services/user'
import { user_atom } from '../recoil/auth'
import { userKeys } from '../services/queryKeyFactory'
import Loader from './misc/loader'

export const User = () => {
  const { id } = useParams()

  const userQuery = useQuery([userKeys.detail(id), id], () => userService.getUserById(id))

  const setUser = useSetRecoilState(user_atom)

  const user = useRecoilValue(user_atom)

  useEffect(() => {
    let mounted = true

    const prepareUser = async () => {
      if (userQuery.data && mounted) {
        setUser({
          ...userQuery.data,
        })
      }
    }
    prepareUser()

    return () => {
      mounted = false
    }
  }, [setUser, userQuery.data])

  if (userQuery.isLoading || userQuery.isFetching || userQuery.isInitialLoading) {
    return <Loader />
  }

  return (
    <Stack className="col-sm-8 mx-auto">
      <h2>{user?.username} Profile</h2>
      <Row>
        <Col>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
          <small>Date joined: {moment(user?.createdAt).format('DD.MM.YYYY, h:mm:ss a')}</small>
          <br />
          <small>Profile updated: {moment(user?.createdAt).format('DD.MM.YYYY, h:mm:ss a')}</small>
        </Col>
        <Col sm={2} className="align-self-end">
          <Image
            src={user?.avatar}
            alt={`Profile photo of ${user?.username}`}
            rounded
            height={100}
            width={100}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <p>{user?.bio}</p>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <h3>Snippets created by {user?.username}</h3>
          <SnippetsCreated user={user} />
        </Col>
      </Row>
    </Stack>
  )
}
