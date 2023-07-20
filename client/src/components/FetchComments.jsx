import { Link } from 'react-router-dom'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import moment from 'moment'

const FetchComments = ({ comments, pkg, ReactMarkdown, rehypeRaw, gfm, Highlighter }) => {
  const { orderBy } = pkg

  const sortedComments = orderBy(comments, ['updatedAt'], ['desc'])

  //console.log(comments)
  return (
    <Stack>
      <strong>
        {comments.length >= 2 ? `${comments.length} comments` : `${comments.length} comment`}
      </strong>
      {sortedComments &&
        sortedComments?.map((comment) => (
          <div key={comment?.id} className="mb-2">
            <Row>
              <Col>
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[gfm]}
                  components={Highlighter}
                >
                  {comment?.commentary}
                </ReactMarkdown>
              </Col>
            </Row>
            <Row className="justify-content-sm-end">
              <Col sm={4} className="align-self-end">
                <Card bg="light" border="light">
                  <Card.Header>Created {moment(comment?.createdAt).fromNow()}</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Link to={`/user/${comment?.commenter?.id}`}>
                        <Image
                          src={comment?.commenter?.avatar}
                          alt={`Profile photo of ${comment?.commenter?.username}`}
                          rounded
                          height={23}
                          width={23}
                        />
                      </Link>{' '}
                      <Link to={`/user/${comment?.commenter?.id}`}>
                        {comment?.commenter?.username}
                      </Link>{' '}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Updated {moment(comment?.updatedAt).format('DD.MM.YYYY, h:mm')}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <hr />
          </div>
        ))}
    </Stack>
  )
}

export default FetchComments
