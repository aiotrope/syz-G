import { useState } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import { toast } from 'react-toastify'
import axios from 'axios'
import moment from 'moment'
import pkg from 'lodash'

const UpdateDestroyCommentsCreated = ({
  user,
  queryClient,
  useMutation,
  postKeys,
  userKeys,
  commentKeys,
  access,
  userQuery,
}) => {
  const [commentId, setCommentId] = useState(null)

  const baseUrl = import.meta.env.VITE_BASE_URL

  const deleteMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(`${baseUrl}/api/comment/delete/${commentId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${access}`, 'Content-Type': 'application/json' },
      }),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: commentKeys.detail(commentId) })
      queryClient.removeQueries({ queryKey: commentKeys.details() })
      queryClient.removeQueries({ queryKey: commentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.details() })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: postKeys.details() })
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.detail(user.id) })
      toast.info(`${commentId} deleted`, { theme: 'colored' })
    },
  })

  const handleClickDelete = async (event) => {
    event.preventDefault()

    const targetId = event.target.id

    setCommentId(targetId)

    try {
      await deleteMutation.mutateAsync(commentId)
    } catch (err) {
      toast.error(err.response.data.error, { theme: 'colored' })
    }
  }

  const { orderBy } = pkg
  const userComments = userQuery?.data?.comments

  const sortedComments = orderBy(userComments, ['updatedAt'], ['desc'])
  //console.log(sortedComments)
  return (
    <>
      <ListGroup as="ul">
        {sortedComments &&
          sortedComments?.map(({ id, commentOn, createdAt }) => (
            <div key={id}>
              <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div>
                    Commented on{' '}
                    <Link to={`/snippet/${commentOn?.id}`} className="text-primary">
                      {commentOn?.title}
                    </Link>{' '}
                    by <Link to={`/user/${commentOn?.user?.id}`}>{commentOn?.user?.username}</Link>{' '}
                    {moment(createdAt).fromNow()}
                  </div>
                  <Badge bg="warning">
                    <Link to={`/comment/update/${id}`}>UPDATE</Link>
                  </Badge>
                </div>
                <Badge bg="danger" onClick={handleClickDelete} id={id}>
                  DELETE
                </Badge>
              </ListGroup.Item>
            </div>
          ))}
      </ListGroup>
    </>
  )
}

export default UpdateDestroyCommentsCreated
