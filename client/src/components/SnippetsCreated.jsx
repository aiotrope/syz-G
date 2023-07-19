import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

const SnippetsCreated = ({ user }) => {
  return (
    <>
      {user?.posts ? (
        <>
          {' '}
          <Card border="light">
            <Card.Header>Latest Snippets</Card.Header>
            <ListGroup as="ul">
              {user?.posts?.map(({ id, title }) => (
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
