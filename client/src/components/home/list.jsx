import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import moment from 'moment'
import Image from 'react-bootstrap/Image'
import { FaHourglassStart } from 'react-icons/fa6'
import { FaEdit } from 'react-icons/fa'
//import { ImArrowUp, ImArrowDown } from 'react-icons/im'

export const List = ({ post }) => {
  return (
    <>
      <Row>
        <Col>
          <p className="post-title">
            <Link to={`/snippet/${post?.id}`} className="post-title">
              {post?.title}
            </Link>
          </p>
          <p>{post?.description}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          {post?.tags.map((tag, indx) => (
            <Badge key={indx} className="mx-1">
              {tag}
            </Badge>
          ))}
        </Col>
      </Row>
      <Row className="justify-content-md-end">
        <Col sm={2} className="align-self-end bg-light p-1 my-2">
          <strong>
            <Link to={`/user/${post?.user?.id}`} className="text-primary">
              <Image
                src={post?.user?.avatar}
                alt={`Profile photo of ${post?.user?.username}`}
                rounded
                height={23}
                width={23}
                className="mx-1 mb-1 mt-1"
              />{' '}
              {post?.user?.username}
            </Link>
          </strong>
          <br />

          <small>
            <FaHourglassStart /> {moment(post?.createdAt).format('DD.MM.YYYY, h:mm:ss a')}
          </small>
          <br />
          <small>
            <FaEdit /> {moment(post?.updatedAt).format('DD.MM.YYYY, h:mm:ss a')}
          </small>
        </Col>
      </Row>
      <Row>
        <Col>
          <Badge bg="primary">Comment</Badge>
        </Col>
        <Col sm={8}>
        <Badge bg="info">UP VOTE</Badge>
          {'  '}
          <Badge bg="danger">DOWN VOTE</Badge>
        </Col>
      </Row>
    </>
  )
}
