import React from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

export const SnippetsCreated = ({ user }) => {
  return (
    <>
      {user?.posts ? (
        <>
          {' '}
          <ListGroup as="ul">
            {user?.posts?.map(({ id, title }) => (
              <ListGroup.Item as="li" key={id}>
                <Link to={`/snippet/${id}`} className="post-title">
                  {title}
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : null}
    </>
  )
}
