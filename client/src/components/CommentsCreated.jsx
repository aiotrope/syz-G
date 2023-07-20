import { Link } from 'react-router-dom'
//import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import pkg from 'lodash'
import moment from 'moment'

const { orderBy } = pkg

const CommentsCreated = ({ user }) => {
  const sortedComments = orderBy(user.comments, ['updatedAt'], ['desc'])

  return (
    <>
      {user?.comments ? (
        <>
          {' '}
          <Card>
            <Card.Header>
              {sortedComments?.length >= 2
                ? `${sortedComments?.length} comments created`
                : `${sortedComments?.length} comment created`}
            </Card.Header>
            <ListGroup as="ul">
              {sortedComments &&
                sortedComments?.map(({ id, createdAt, commentOn }) => (
                  <ListGroup.Item as="li" key={id}>
                    <Link to={`/snippet/${commentOn}`} className="post-title">
                      comment posted {moment(createdAt).fromNow()}
                    </Link>{' '}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Card>
        </>
      ) : null}
    </>
  )
}

export default CommentsCreated
