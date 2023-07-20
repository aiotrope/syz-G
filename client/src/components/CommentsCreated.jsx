//import { useEffect } from 'react'
//import { useSetRecoilState, useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import pkg from 'lodash'
import moment from 'moment'

//import { postService } from '../services/post'
import { commentService } from '../services/comment'
import { commentKeys } from '../services/queryKeyFactory'
//import { comments_atom } from '../recoil/comment'

const { orderBy } = pkg

const CommentsCreated = ({ user, useQuery }) => {
  /* const postsQuery = useQuery({
    queryKey: postKeys.details(),
    queryFn: postService.getAll,
  }) */

  //const commentsByUser = useRecoilValue(comments_atom)

  const userId = user?.id

  const commentsQuery = useQuery({
    queryKey: [commentKeys.detail(userId), userId],
    queryFn: async () => await commentService.getCommentsByUser(userId),
  })

  //const setCommentsByUser = useSetRecoilState(comments_atom)

  /* useEffect(() => {
    let mounted = true

    const prepareCommentsByUser = async () => {
      if (commentsQuery?.data && mounted) {
        setCommentsByUser(commentsQuery?.data)
      }
    }

    prepareCommentsByUser()

    return () => {
      mounted = false
    }
  }, [commentsQuery?.data, setCommentsByUser]) */

  const sortedComments = orderBy(user.comments, ['updatedAt'], ['desc'])

  console.log(commentsQuery?.data)

  //console.log(commentsByUser)

  return (
    <>
      {user?.comments ? (
        <>
          {' '}
          <Card>
            <Card.Header>
              {sortedComments?.length >= 2
                ? `${sortedComments?.length} comments created`
                : `${sortedComments?.length} comment created`}
            </Card.Header>
            <ListGroup as="ul">
              {sortedComments &&
                sortedComments?.map(({ id, commentOn, createdAt }) => (
                  <ListGroup.Item as="li" key={id}>
                    Commented on{' '}
                    <Link to={`/snippet/${id}`} className="post-title">
                      {commentOn?.title}
                    </Link>{' '}
                    comment posted {moment(createdAt).fromNow()}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Card>
        </>
      ) : null}
    </>
  )
}

export default CommentsCreated
