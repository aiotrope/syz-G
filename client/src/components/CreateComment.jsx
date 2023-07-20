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
const CreatedOrUpdatedComment = lazy(() => import('./CreatedOrUpdatedComment'))
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

  const commentQuery = useQuery([commentKeys?.detail(postId), postId], () =>
    commentService.getCommentsByPostId(postId)
  )

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
        setComment(result.data.comment)
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
  const postCommentCount = find(postsQuery?.data, { id: postId })?.comments?.length

  if (
    commentMutation.isLoading ||
    postsQuery.isLoading ||
    postsQuery.isFetching ||
    commentQuery.isLoading ||
    commentQuery.isFetching
  ) {
    return <Loader />
  }

  //console.log(postsQuery?.data)

  console.log(comment)

  return (
    <Stack className="col-md-9 mx-auto">
      <h2>
        Comment about <Link to={`/snippet/${postId}`}>{postTitle}</Link>
      </h2>
      <p>
        <Link to={`/snippet/${postId}`}>{postTitle}</Link> by{' '}
        <Link to={`/user/${postUserId}`}>{postUserName}</Link> posted{' '}
        {moment(postCreated).fromNow()} .
      </p>
      <p>
        {postCommentCount >= 2 ? `${postCommentCount} comments` : `${postCommentCount} comment`}
      </p>
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
          <CreatedOrUpdatedComment comment={comment} />
        </>
      ) : null}
    </Stack>
  )
}

export default CreateComment
