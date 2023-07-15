import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import moment from 'moment'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import { FaHourglassStart } from 'react-icons/fa6'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { FaEdit } from 'react-icons/fa'
import { postService } from '../../services/post'
import { Highlighter } from '../misc/highlighter'

export const SnippetPost = () => {
  const { id } = useParams()

  const postQuery = useQuery([`post-${id}`, id], () => postService.getPostById(id))

  console.log(postQuery.data)
  return (
    <Container className="col-md-11 mx-auto" fluid>
      <Row>
        <Col>
          <h2 className="post-title-single">{postQuery?.data?.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {postQuery?.data?.tags.map((tag, indx) => (
            <Badge key={indx} className="mx-1">
              {tag}
            </Badge>
          ))}
        </Col>
      </Row>
      <Row className="justify-content-md-end">
        <Col sm={3} className="align-self-end bg-light py-2">
          <strong>
            <Link to={`/user/${postQuery?.data?.user?.id}`} className="text-primary">
              <Image
                src={postQuery?.data?.user?.avatar}
                alt={`Profile photo of ${postQuery?.data?.user?.username}`}
                rounded
                height={23}
                width={23}
                className="mx-1 mb-1 mt-1"
              />{' '}
              {postQuery?.data?.user?.username}
            </Link>
          </strong>
          <br />
          <small>
            <FaHourglassStart />{' '}
            {moment(postQuery?.data?.createdAt).format('DD.MM.YYYY, h:mm:ss a')}
          </small>
          <br />
          <small>
            <FaEdit /> {moment(postQuery?.data?.updatedAt).format('DD.MM.YYYY, h:mm:ss a')}
          </small>
        </Col>
      </Row>
      <Row>
        <Col>
          <Badge bg="primary">Comment</Badge>
        </Col>
        <Col sm={8}>
          <ImArrowUp />
          {'  '}
          <ImArrowDown />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]} components={Highlighter}>
            {postQuery?.data?.entry}
          </ReactMarkdown>
        </Col>
      </Row>
    </Container>
  )
}
