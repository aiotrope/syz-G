import { useEffect, lazy } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import moment from 'moment'
import pkg from 'lodash'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

import { FaEdit, FaUserAstronaut, FaHourglassStart } from 'react-icons/fa'
import Highlighter from './misc/highlighter'

import { postService } from '../services/post'
import { commentService } from '../services/comment'
import { post_atom } from '../recoil/post'
import { comments_atom } from '../recoil/comment'
import { commentKeys, postKeys } from '../services/queryKeyFactory'

const Loader = lazy(() => import('./misc/loader'))
const FetchComments = lazy(() => import('./FetchComments'))

const FetchSnippet = () => {
  const { id } = useParams()

  const postQuery = useQuery([postKeys.detail(id), id], () => postService?.getPostById(id))

  const setPost = useSetRecoilState(post_atom)

  const post = useRecoilValue(post_atom)

  const setComments = useSetRecoilState(comments_atom)

  const comments = useRecoilValue(comments_atom)

  const commentsQuery = useQuery([commentKeys.detail(id), id], () =>
    commentService?.getCommentsByPostId(id)
  )

  useEffect(() => {
    let mounted = true

    const preparePost = async () => {
      if (postQuery?.data && mounted) {
        setPost({
          ...postQuery?.data,
        })
      }
    }
    preparePost()

    return () => {
      mounted = false
    }
  }, [postQuery.data, setPost])

  useEffect(() => {
    let mounted = true

    const prepareComments = async () => {
      if (commentsQuery?.data && mounted) {
        setComments(commentsQuery?.data)
      }
    }
    prepareComments()

    return () => {
      mounted = false
    }
  }, [commentsQuery?.data, setComments])

  if (postQuery?.isLoading || postQuery?.isFetching) return <Loader />

  console.log(comments)
  return (
    <Container className="col-sm-8 mx-auto">
      <Row>
        <Col>
          <h2 className="post-title-single">{post?.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col>Posted {moment(post?.createdAt).fromNow()}</Col>
        <Col sm={6}>Modified {moment(post?.updatedAt).fromNow()}</Col>
      </Row>
      <hr />

      <Row className="my-1">
        <Col>
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]} components={Highlighter}>
            {post?.entry}
          </ReactMarkdown>
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          {post?.tags?.map((tag, indx) => (
            <div key={indx}>
              <Badge bg="info">{tag}</Badge>{' '}
            </div>
          ))}
        </Col>
      </Row>
      <Row className="justify-content-sm-end">
        <Col sm={3} className="align-self-end">
          <Card bg="light" border="info">
            <Card.Header>
              <FaHourglassStart title="Snippet created date" aria-label="Snippet created date" />{' '}
              {moment(post?.createdAt).format('DD.MM.YYYY, h:mm')}
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <FaUserAstronaut
                  title={`Snippet created by ${post?.user?.username}`}
                  aria-label={`Snippet created by ${post?.user?.username}`}
                />{' '}
                <Link to={`/user/${post?.user?.id}`}>{post?.user?.username}</Link>{' '}
                <Link to={`/user/${post?.user?.id}`}>
                  <Image
                    src={post?.user?.avatar}
                    alt={`Profile photo of ${post?.user?.username}`}
                    rounded
                    height={25}
                    width={25}
                  />
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <FaEdit title="Snippet updated date" aria-label="Snippet updated date" />{' '}
                {moment(post?.updatedAt).format('DD.MM.YYYY, h:mm')}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <div className='my-3'>
        <Row>
          <Col>
            <Link to={`/create-comment/${post?.id}`}>
              <Badge bg="light" text="muted">
                Add a comment
              </Badge>
            </Link>
          </Col>
        </Row>
      </div>
      <FetchComments
        comments={comments}
        pkg={pkg}
        ReactMarkdown={ReactMarkdown}
        rehypeRaw={rehypeRaw}
        gfm={gfm}
        Highlighter={Highlighter}
      />
    </Container>
  )
}

export default FetchSnippet
