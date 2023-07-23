import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import moment from 'moment'
import Image from 'react-bootstrap/Image'

const List = ({ post, setSearchText }) => {
  //console.log(post)
  return (
    <>
      <Row>
        <Col>
          <Link to={`/snippet/${post?.id}`} className="post-title">
            {post?.title}
          </Link>
          <br />
          <small>{post?.description}</small>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm={12}>
          {post?.tags.map((tag, indx) => (
            <small key={indx}>
              <Badge bg="info" onClick={() => setSearchText(tag)}>
                {tag}
              </Badge>{' '}
            </small>
          ))}
        </Col>
      </Row>
      <Row className="justify-content-md-end">
        <Col sm={5} className="align-self-end">
          <Link to={`/user/${post?.user?.id}`}>{post?.user?.username}</Link>{' '}
          <Link to={`/user/${post?.user?.id}`}>
            <Image
              src={post?.user?.avatar}
              alt={`Profile photo of ${post?.user?.username}`}
              rounded
              height={20}
              width={20}
            />
          </Link>{' '}
          <small>posted {moment(post?.createdAt).fromNow()}</small>
        </Col>
      </Row>
      <Row className="justify-content-md-end">
        <Col sm={5} className="align-self-end">
          <small>Modified {moment(post?.updatedAt).fromNow()}</small>
        </Col>
      </Row>
      <div className="my-1">
        <Row>
          <Col>
            <Link to={`/create-comment/${post?.id}`}>
              <Badge bg="light" text="primary">
                Add a comment
              </Badge>
            </Link>
          </Col>
          <Col sm={5}>
            <Link to={`/snippet/${post?.id}`}>
              <small>
                {post?.comments?.length <= 1
                  ? `${post?.comments?.length} comment`
                  : `${post?.comments?.length} comments`}
              </small>
            </Link>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default List
