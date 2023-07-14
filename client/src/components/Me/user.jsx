import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Stack from 'react-bootstrap/Stack'
import moment from 'moment'

import { userService } from '../../services/user'

export const User = () => {
  const { id } = useParams()

  const userQuery = useQuery([`user-${id}`, id], () => userService.getUserById(id))

  return (
    <Stack className="col-sm-8 mx-auto">
      <h2>{userQuery?.data?.username} Profile</h2>
      <Row>
        <Col>
          <p>Username: {userQuery?.data?.username}</p>
          <p>Email: {userQuery?.data?.email}</p>
          <small>
            Date joined: {moment(userQuery?.data?.createdAt).format('DD.MM.YYYY, h:mm:ss a')}
          </small>
          <br />
          <small>
            Profile updated: {moment(userQuery?.data?.createdAt).format('DD.MM.YYYY, h:mm:ss a')}
          </small>
        </Col>
        <Col>
          <Image
            src={userQuery?.data?.avatar}
            alt={`Profile photo of ${userQuery?.data?.username}`}
            rounded
            height={100}
            width={100}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <p>{userQuery?.data?.bio}</p>
        </Col>
      </Row>
    </Stack>
  )
}
