import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Highlighter from './misc/highlighter'

// none-persist component that renders the created post snippet after creation
const CreatedSnippet = ({ post }) => {
  //console.log(post)
  return (
    <div>
      <Row className="my-3">
        <Col>
          <p>
            Title:{' '}
            <Link to={`/snippet/${post?.id}`} className="post-title">
              {post?.title}
            </Link>
          </p>
          <p>Description: {post?.description}</p>
          <div>
            Tags:{' '}
            {post?.tags?.map((tag, indx) => (
              <small key={indx}>
                <Badge className="mx-1">{tag}</Badge>{' '}
              </small>
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Posted by:{' '}
            <Link to={`/user/${post?.user?.id}`} className="text-primary">
              {post?.user?.username}
            </Link>
          </p>
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]} components={Highlighter}>
            {post?.entry}
          </ReactMarkdown>
        </Col>
      </Row>
    </div>
  )
}

export default CreatedSnippet
