import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import moment from 'moment'
import Stack from 'react-bootstrap/Stack'
import Image from 'react-bootstrap/Image'

import { FaHourglassStart } from 'react-icons/fa6'
import { FaEdit } from 'react-icons/fa'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'

import { postService } from '../../services/post'
import { posts_atom } from '../../recoil/post'

export const Home = () => {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: postService.getAll,
  })

  const setPosts = useSetRecoilState(posts_atom)

  const posts = useRecoilValue(posts_atom)

  useEffect(() => {
    let mounted = true

    const preparePosts = async () => {
      if (postsQuery.data && mounted) {
        setPosts(postsQuery.data)
      }
    }
    preparePosts()

    return () => {
      mounted = false
    }
  }, [postsQuery.data, setPosts])

  console.log('POSTS: ', posts)
  return (
    <Stack>
      {posts.map((post) => (
        <Container key={post?.id}>
          <h2>All Snippets</h2>
          <Row>
            <Col>
              <p className="post-title">
                <Link to={`/snippet/${post?.id}`} className="post-title">
                  {post.title}
                </Link>
              </p>
              <p>{post.description}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Badge bg="secondary">{post?.tag}</Badge>
            </Col>
          </Row>
          <Row className="justify-content-md-end">
            <Col sm={2} className="align-self-end bg-light p-2 my-1">
              <strong>
                <Image
                  src={post?.user?.avatar}
                  alt={`Profile photo of ${post?.user?.username}`}
                  rounded
                  height={23}
                  width={23}
                  className="mx-1 mb-1 mt-1"
                />{' '}
                <Link to={`/user/${post?.user?.id}`} className="text-primary">
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

          <hr />
        </Container>
      ))}
    </Stack>
  )
}
