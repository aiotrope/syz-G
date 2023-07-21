import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import pkg from 'lodash'
import moment from 'moment'

const { orderBy } = pkg

const CommentsCreated = ({ user, userQuery }) => {
  const userComments = userQuery?.data?.comments

  const sortedComments = orderBy(userComments, ['updatedAt'], ['desc'])
  //console.log(sortedComments)
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
                    Commented on{' '}
                    <Link to={`/snippet/${commentOn?.id}`} className="post-title">
                      {commentOn?.title}
                    </Link>{' '}
                    by <Link to={`/user/${commentOn?.user?.id}`}>{commentOn?.user?.username}</Link>{' '}
                    {moment(createdAt).fromNow()}
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
