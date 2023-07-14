import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import moment from 'moment'

import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import { postService } from '../../services/post'
import { Highlighter } from '../misc/highlighter'

export const SnippetPost = () => {
  const { id } = useParams()

  const postQuery = useQuery([`post-${id}`, id], () => postService.getPostById(id))

  console.log(postQuery.data)
  return (
    <Stack>
      <Row>
        <Col>
          <h2 className="post-title-single">{postQuery?.data?.title}</h2>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <Badge bg="secondary">{postQuery?.data?.tag}</Badge>
        </Col>
        <Col>
          <strong>
            Snippet by:{' '}
            <Link to={`/user/${postQuery?.data?.user?.id}`} className="text-primary">
              {postQuery?.data?.user?.username}
            </Link>
          </strong>
        </Col>
        <Col>
          <small>
            Created: {moment(postQuery?.data?.createdAt).format('DD.MM.YYYY, h:mm:ss a')}
          </small>
          <br />
          <small>
            Updated: {moment(postQuery?.data?.updatedAt).format('DD.MM.YYYY, h:mm:ss a')}
          </small>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]} components={Highlighter}>
            {postQuery?.data?.entry}
          </ReactMarkdown>
        </Col>
      </Row>
    </Stack>
  )
}
