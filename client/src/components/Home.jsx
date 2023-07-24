import { useEffect, useRef, lazy } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import pkg from 'lodash'
import { useDebounce } from 'use-debounce'

import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

import { postService } from '../services/post'
import { posts_atom } from '../recoil/post'
import { postKeys } from '../services/queryKeyFactory'

const { orderBy } = pkg
const Loader = lazy(() => import('./misc/loader'))
const List = lazy(() => import('./List'))
const SearchForm = lazy(() => import('./SearchForm'))

const Home = ({ searchText, setSearchText }) => {
  const [searchValue] = useDebounce(searchText, 1000)

  const postsQuery = useQuery({
    queryKey: postKeys.details(),
    queryFn: postService.getAll,
    staleTime: 6000,
  })

  const postsSearchQuery = useQuery(['search', searchValue], () => postService.search(searchValue))

  const setPosts = useSetRecoilState(posts_atom)

  const posts = useRecoilValue(posts_atom)

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

  useEffect(() => {
    const fetchSearchPosts = async () => {
      if (postsSearchQuery?.data && isMounted) {
        setPosts(postsSearchQuery?.data)
      }
    }
    fetchSearchPosts()
  }, [postsSearchQuery?.data, setPosts])

  const sortedPosts = orderBy(posts, ['updatedAt'], ['desc'])

  const sortedSearchPosts = orderBy(postsSearchQuery?.data, ['updatedAt'], ['desc'])

  if (
    postsQuery?.isLoading ||
    postsQuery?.isFetching ||
    postsQuery?.isInitialLoading ||
    postsSearchQuery?.isLoading ||
    postsSearchQuery?.isFetching ||
    postsSearchQuery?.isInitialLoading
  ) {
    return <Loader />
  }

  //console.log(postsSearchQuery?.data)
  return (
    <Stack>
      <Container className="col-sm-8 mx-auto">
        <h2>
          <Badge pill bg="primary" text="light" onClick={() => setSearchText('')}>
            All Posts
          </Badge>
        </h2>
        <div className="my-1">
          <SearchForm searchText={searchText} setSearchText={setSearchText} />
          <div className="my-2">
            <Button variant="light" size="sm" onClick={() => setSearchText('')}>
              Set all posts
            </Button>
          </div>
        </div>
        <div className="my-2">
          <strong>
            {sortedPosts.length >= 2
              ? `${sortedPosts.length} snippets`
              : `${sortedPosts.length} snippet`}
          </strong>
        </div>

        {sortedPosts
          ? sortedPosts?.map((post) => (
              <div key={post?.id}>
                <List post={post} setSearchText={setSearchText} />
                <hr />
              </div>
            ))
          : sortedSearchPosts?.data?.map((post) => (
              <div key={post?.id}>
                <List post={post} setSearchText={setSearchText} />
                <hr />
              </div>
            ))}
      </Container>
    </Stack>
  )
}

export default Home
