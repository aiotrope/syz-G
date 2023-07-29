import Spinner from 'react-bootstrap/Spinner'

// loader component
const Loader = () => {
  return (
    <Spinner animation="grow" className="spinner">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default Loader
