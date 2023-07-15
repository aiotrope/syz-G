import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'

import { postService } from '../../services/post'
import { posts_atom } from '../../recoil/post'
import { Heading } from './Heading'
import Loader from '../Misc/Loader'

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

  //console.log('POSTS: ', posts)
  return (
    <Stack>
      {postsQuery.isLoading ? (
        <Loader />
      ) : (
        <>
          {posts.map((post) => (
            <Container key={post?.id}>
              <h2>All Snippets</h2>
              <Heading post={post} />
              <hr />
            </Container>
          ))}
        </>
      )}
    </Stack>
  )
}
