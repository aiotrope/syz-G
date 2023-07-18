import { useEffect, useRef, lazy } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import pkg from 'lodash'

import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'

import { postService } from '../services/post'
import { posts_atom } from '../recoil/post'
import { postKeys } from '../services/queryKeyFactory'

const Loader = lazy(() => import('./misc/loader'))
const List = lazy(() => import('./List'))

const Home = () => {
  const postsQuery = useQuery({
    queryKey: postKeys.details(),
    queryFn: postService?.getAll,
  })

  const setPosts = useSetRecoilState(posts_atom)

  const posts = useRecoilValue(posts_atom)

  const { orderBy } = pkg

  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      if (postsQuery?.data && isMounted) {
        setPosts(postsQuery?.data)
      }
    }
    fetchPosts()
  }, [postsQuery?.data, setPosts])

  //console.log('POSTS: ', posts)

  const sortedPosts = orderBy(posts, ['updatedAt'], ['desc'])

  if (postsQuery?.isLoading || postsQuery?.isFetching || postsQuery?.isInitialLoading) {
    return <Loader />
  }

  return (
    <Stack>
      <Container>
        <h2>All Snippets</h2>
        {sortedPosts &&
          sortedPosts?.map((post) => (
            <div key={post?.id}>
              <List post={post} />
              <hr />
            </div>
          ))}
      </Container>
    </Stack>
  )
}

export default Home
