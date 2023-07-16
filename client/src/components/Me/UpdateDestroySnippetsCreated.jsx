import React from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

export const UpdateDestroySnippetsCreated = ({ user }) => {
  return (
    <>
      <ListGroup as="ul">
        {user?.posts?.map(({ id, title }) => (
          <div key={id}>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  <Link to={`/snippet/${id}`} className="text-primary">
                    {title}
                  </Link>
                </div>
                <Badge bg="warning">
                  <Link to={`/snippet/update/${id}`}>UPDATE</Link>
                </Badge>
              </div>
              <Badge bg="danger">
                <Link to={`/snippet/update/${id}`}>DELETE</Link>
              </Badge>
            </ListGroup.Item>
          </div>
        ))}
      </ListGroup>
    </>
  )
}
