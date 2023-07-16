import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default function Loader() {
  return (
    <Spinner animation="grow" className="spinner">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}
