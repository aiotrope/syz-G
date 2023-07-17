import { useState } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import { toast } from 'react-toastify'
import axios from 'axios'

export const UpdateDestroySnippetsCreated = ({
  user,
  queryClient,
  useMutation,
  postKeys,
  userKeys,
  access,
}) => {
  const [postId, setPostId] = useState(null)

  const baseUrl = import.meta.env.VITE_BASE_URL

  const deleteMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(`${baseUrl}/api/post/delete/${postId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${access}`, 'Content-Type': 'application/json' },
      }),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: postKeys.detail(postId) })
      queryClient.invalidateQueries({ queryKey: userKeys.details() })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: postKeys.details() })
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.detail(user.id) })
      toast.info(`${postId} deleted`, { theme: 'colored' })
    },
  })

  const handleClickDelete = async (event) => {
    event.preventDefault()

    const targetId = event.target.id

    setPostId(targetId)

    try {
      await deleteMutation.mutateAsync(postId)
    } catch (err) {
      toast.error(err.response.data.error, { theme: 'colored' })
    }
  }

  return (
    <>
      <ListGroup as="ul">
        {user?.posts?.map(({ id, title }) => (
          <div key={id}>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  <Link to={`/snippet/${id}`} className="text-primary">
                    {title}
                  </Link>
                </div>
                <Badge bg="warning">
                  <Link to={`/snippet/update/${id}`}>UPDATE</Link>
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
