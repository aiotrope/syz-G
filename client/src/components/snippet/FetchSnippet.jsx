import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSetRecoilState, useRecoilValue } from 'recoil'
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

import { Highlighter } from '../Misc/Highlighter'

import { FaHourglassStart } from 'react-icons/fa6'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { FaEdit } from 'react-icons/fa'

import { postService } from '../../services/post'
import { post_atom } from '../../recoil/post'
import Loader from '../Misc/Loader'

export const FetchSnippet = () => {
  const { id } = useParams()

  const postQuery = useQuery([`post-${id}`, id], () => postService.getPostById(id))

  const setPost = useSetRecoilState(post_atom)

  const post = useRecoilValue(post_atom)

  useEffect(() => {
    let mounted = true

    const preparePost = async () => {
      if (postQuery.data && mounted) {
        setPost({
          ...postQuery.data,
        })
      }
    }
    preparePost()

    return () => {
      mounted = false
    }
  }, [postQuery.data, setPost])

  if (postQuery.isLoading || postQuery.isFetching) return <Loader />

  //console.log(post)
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="post-title-single">{post?.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {post?.tags?.map((tag, indx) => (
            <Badge key={indx} className="mx-1">
              {tag}
            </Badge>
          ))}
        </Col>
      </Row>
      <Row className="justify-content-md-end">
        <Col sm={3} className="align-self-end bg-light py-1 my-2">
          <strong>
            <Link to={`/user/${post.id}`} className="text-primary">
              <Image
                src={post?.user?.avatar}
                alt={`Profile photo of ${postQuery?.data?.user?.username}`}
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
          <ImArrowUp />
          {'  '}
          <ImArrowDown />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]} components={Highlighter}>
            {post?.entry}
          </ReactMarkdown>
        </Col>
      </Row>
    </Container>
  )
}
