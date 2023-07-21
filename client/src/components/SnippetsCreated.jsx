import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import pkg from 'lodash'
import moment from 'moment'

const SnippetsCreated = ({ user }) => {
  const { orderBy } = pkg
  const sortedPosts = orderBy(user.posts, ['updatedAt'], ['desc'])
  return (
    <>
      {user?.posts ? (
        <>
          {' '}
          <Card>
            <Card.Header>
              {sortedPosts?.length >= 2
                ? `${sortedPosts?.length} snippets created`
                : `${sortedPosts?.length} snippet created`}
            </Card.Header>
            <ListGroup as="ul">
              {sortedPosts &&
                sortedPosts?.map(({ id, title, createdAt }) => (
                  <ListGroup.Item as="li" key={id}>
                    <Link to={`/snippet/${id}`} className="post-title">
                      {title}
                    </Link>{' '}
                    posted {moment(createdAt).fromNow()}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Card>
        </>
      ) : null}
    </>
  )
}

export default SnippetsCreated
