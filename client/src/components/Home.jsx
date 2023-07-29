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

// main home component and index page that holds the list of post
const Home = ({ searchText, setSearchText }) => {
  // capture the search text and debounce
  const [searchValue] = useDebounce(searchText, 1000)

  // query all posts from backend
  const postsQuery = useQuery({
    queryKey: postKeys.details(),
    queryFn: postService.getAll,
    staleTime: 6000,
  })
  // query search text from backend
  const postsSearchQuery = useQuery(['search', searchValue], () => postService.search(searchValue))

  // set all post query in atom
  const setPosts = useSetRecoilState(posts_atom)

  // set all posts
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

  // sort all posts on descending order by updated date
  const sortedPosts = orderBy(posts, ['updatedAt'], ['desc'])

  // sort all searched posts on descending order by updated date
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
