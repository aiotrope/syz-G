import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import pkg from 'lodash'

const SnippetsCreated = ({ user }) => {
  const { orderBy } = pkg

  const sortedPosts = orderBy(user.posts, ['updatedAt'], ['desc'])

  return (
    <>
      {user?.posts ? (
        <>
          {' '}
          <Card border="light">
            <Card.Header>Latest Snippets</Card.Header>
            <ListGroup as="ul">
              {sortedPosts &&
                sortedPosts?.map(({ id, title }) => (
                  <ListGroup.Item as="li" key={id}>
                    <Link to={`/snippet/${id}`} className="post-title">
                      {title}
                    </Link>
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
