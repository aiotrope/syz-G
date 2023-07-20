import { useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//import Badge from 'react-bootstrap/Badge'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Highlighter from './misc/highlighter'
import pkg from 'lodash'

import { users_atom } from '../recoil/auth'

const { find } = pkg

const CreatedComment = ({ comment }) => {

  const users = useRecoilValue(users_atom)

  const user = find(users, { id: comment?.commentOn?.user })?.username
  console.log(user)
  return (
    <div>
      <Row className="my-3">
        <Col>
          <p>
            Comment On:{' '}
            <Link to={`/snippet/${comment?.commentOn.id}`} className="post-title">
              {comment?.commentOn.title}
            </Link>{' '}
            by{' '}
            <Link to={`/user/${comment?.commentOn?.user}`}>
              {user}
            </Link>
          </p>
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

export default CreatedComment
