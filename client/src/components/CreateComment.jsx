import { lazy, useEffect } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'react-router'
import { sanitize } from 'isomorphic-dompurify'
import jwtDecode from 'jwt-decode'
import pkg from 'lodash'
import moment from 'moment'
import { Link } from 'react-router-dom'

import Stack from 'react-bootstrap/Stack'
import { toast } from 'react-toastify'

import { postService } from '../services/post'
import { commentService } from '../services/comment'
import { comment_atom } from '../recoil/comment'
import { jwt_atom } from '../recoil/auth'
import { userKeys, postKeys, commentKeys } from '../services/queryKeyFactory'

const CreateCommentForm = lazy(() => import('./CreateCommentForm'))
const CreatedComment = lazy(() => import('./CreatedComment'))
const Loader = lazy(() => import('./misc/loader'))
const baseUrl = import.meta.env.VITE_BASE_URL
const { find } = pkg

const schema = yup
  .object({
    commentary: yup.string().min(4).required(),
  })
  .required()

const CreateComment = () => {
  const { postId } = useParams()

  const queryClient = useQueryClient()

  const setComment = useSetRecoilState(comment_atom)

  const comment = useRecoilValue(comment_atom)

  const access = useRecoilValue(jwt_atom)

  const decoded = jwtDecode(access)

  const commentMutation = useMutation({
    mutationFn: async (data) =>
      await axios.post(`${baseUrl}/api/comment/${postId}`, data, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${access}`, 'Content-Type': 'application/json' },
      }),
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: commentKeys.details() })
      queryClient.invalidateQueries({ queryKey: commentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: postKeys.details() })
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.details() })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) })
      queryClient.invalidateQueries({ queryKey: userKeys.detail(decoded.id) })
    },
  })

  const postsQuery = useQuery({
    queryKey: postKeys.details(),
    queryFn: postService?.getAll,
  })

  const commentQuery = useQuery({
    queryKey: commentKeys.detail(commentMutation?.data?.id),
    queryFn: commentService.getCommentById,
  })

  /* useEffect(() => {
    let mounted = true

    const prepareComments = async () => {
      if (commentsQuery?.data && mounted) {
        setComments(commentsQuery?.data)
      }
    }
    prepareComments()

    return () => {
      mounted = false
    }
  }, [commentsQuery?.data, setComments]) */

  useEffect(() => {
    let mounted = true

    const prepareComment = async () => {
      if (commentQuery?.data && mounted) {
        setComment(commentQuery?.data)
      }
    }
    prepareComment()

    return () => {
      mounted = false
    }
  }, [commentQuery?.data, setComment])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const onSubmit = async (formData) => {
    try {
      const sanitzeData = {
        commentary: sanitize(formData.commentary),
      }
      const result = await commentMutation.mutateAsync(sanitzeData)
      if (result) {
        toast.success(result.data.message, { theme: 'colored' })
        reset()
      }
    } catch (err) {
      toast.error(err.response.data.error, { theme: 'colored' })
    }
  }

  const postTitle = find(postsQuery?.data, { id: postId })?.title
  const postUserName = find(postsQuery?.data, { id: postId })?.user?.username
  const postUserId = find(postsQuery?.data, { id: postId })?.user?.id
  const postCreated = find(postsQuery?.data, { id: postId })?.createdAt

  if (
    commentMutation.isLoading ||
    postsQuery.isLoading ||
    postsQuery.isFetching ||
    commentQuery.isLoading ||
    commentQuery.isFetching
  ) {
    return <Loader />
  }

  console.log(postsQuery?.data)

  return (
    <Stack className="col-md-9 mx-auto">
      <h2>
        Comment about <Link to={`/snippet/${postId}`}>{postTitle}</Link>
      </h2>
      <small>
        Snippet by <Link to={`/user/${postUserId}`}>{postUserName}</Link> posted{' '}
        {moment(postCreated).fromNow()}
      </small>{' '}
      <CreateCommentForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        reset={reset}
        commentMutation={commentMutation}
      />
      {comment?.commentOn ? (
        <>
          <CreatedComment comment={comment} />
        </>
      ) : null}
    </Stack>
  )
}

export default CreateComment
