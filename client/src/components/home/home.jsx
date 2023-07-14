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
          <Row>
            <Col>
              <h3 className="post-title">
                <Link to={`/snippet/${post?.id}`} className="post-title">
                  {post.title}
                </Link>
              </h3>
              <p>{post.description}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Badge bg="info">{post?.tag}</Badge>
            </Col>
            <Col>
              <strong>
                Snippet by:{' '}
                <Link to={`/user/${post?.user?.id}`} className="text-primary">
                  {post?.user?.username}
                </Link>
              </strong>
            </Col>
            <Col>
              <small>Created: {moment(post?.createdAt).format('DD.MM.YYYY, h:mm:ss a')}</small>
              <br />
              <small>Updated: {moment(post?.updatedAt).format('DD.MM.YYYY, h:mm:ss a')}</small>
            </Col>
          </Row>
          <Row className="my-2">
            <Col>
              <Badge bg="primary">Comment</Badge>
            </Col>
            <Col>
              <Badge bg="primary">UpVote</Badge> <Badge bg="primary">DownVote</Badge>
            </Col>
          </Row>
          <hr />
        </Container>
      ))}
    </Stack>
  )
}
