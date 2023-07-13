import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

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
        <Row key={post.id}>
          <Col>
            <h3>{post.title}</h3>
          </Col>
        </Row>
      ))}
    </Stack>
  )
}
