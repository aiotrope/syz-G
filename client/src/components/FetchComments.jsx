import { Link } from 'react-router-dom'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import { FaEdit, FaUserAstronaut, FaHourglassStart } from 'react-icons/fa'
import ListGroup from 'react-bootstrap/ListGroup'
import moment from 'moment'

const FetchComments = ({ comments, pkg, ReactMarkdown, rehypeRaw, gfm, Highlighter }) => {
  const { orderBy } = pkg

  const sortedComments = orderBy(comments, ['updatedAt'], ['desc'])

  console.log(comments)
  return (
    <Stack>
      <p>{comments.length} Comments</p>
      {sortedComments &&
        sortedComments?.map((comment) => (
          <>
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
                <Col sm={3} className="align-self-end">
                  <Card bg="light" border="light">
                    <Card.Header>
                      <FaHourglassStart title="Comment created date" aria-label="Comment created date" />{' '}
                      {moment(comment?.createdAt).fromNow()}
                    </Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <FaUserAstronaut
                          title={`Snippet created by ${comment?.commenter?.username}`}
                          aria-label={`Snippet created by ${comment?.commenter?.username}`}
                        />{' '}
                        <Link to={`/user/${comment?.commenter?.id}`}>{comment?.commenter?.username}</Link>{' '}
                        <Link to={`/user/${comment?.commenter?.id}`}>
                          <Image
                            src={comment?.commenter?.avatar}
                            alt={`Profile photo of ${comment?.commenter?.username}`}
                            rounded
                            height={25}
                            width={25}
                          />
                        </Link>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <FaEdit title="Comment updated date" aria-label="Comment updated date" />{' '}
                        {moment(comment?.updatedAt).format('DD.MM.YYYY, h:mm')}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </div>
            <hr />
          </>
        ))}
    </Stack>
  )
}

export default FetchComments
