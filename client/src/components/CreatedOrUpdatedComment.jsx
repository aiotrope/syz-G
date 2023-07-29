import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Highlighter from './misc/highlighter'

// component for updating and deleting component
const CreatedOrUpdatedComment = ({ comment }) => {
  return (
    <div>
      <Row className="my-3">
        <Col>
          <p>
            Comment on snippet:{' '}
            <Link to={`/snippet/${comment?.commentOn.id}`} className="post-title">
              {comment?.commentOn.title}
            </Link>
          </p>
          <p>Commenter: {comment?.commenter?.username}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]} components={Highlighter}>
            {comment?.commentary}
          </ReactMarkdown>
        </Col>
      </Row>
    </div>
  )
}

export default CreatedOrUpdatedComment
