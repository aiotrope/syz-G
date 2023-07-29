import { useEffect, lazy } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'
import { sanitize } from 'isomorphic-dompurify'
import axios from 'axios'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Container from 'react-bootstrap/Container'
import { toast } from 'react-toastify'

import { commentService } from '../services/comment'
import { comment_atom } from '../recoil/comment'
import { jwt_atom } from '../recoil/auth'
import { userKeys, postKeys, commentKeys } from '../services/queryKeyFactory'

const Loader = lazy(() => import('./misc/loader'))
const UpdateCommentForm = lazy(() => import('./UpdateCommentForm'))
const CreatedOrUpdatedComment = lazy(() => import('./CreatedOrUpdatedComment'))

// main component for updating comment
const UpdateComment = () => {
  const queryClient = useQueryClient()

  const { id } = useParams()

  const baseUrl = import.meta.env.VITE_BASE_URL

  const setComment = useSetRecoilState(comment_atom)

  const access = useRecoilValue(jwt_atom)

  const comment = useRecoilValue(comment_atom)

  const commentQuery = useQuery([commentKeys?.detail(id), id], () =>
    commentService?.getCommentById(id)
  )

  const updateMutation = useMutation({
    mutationFn: async (data) =>
      await axios.patch(`${baseUrl}/api/comment/update/${id}`, data, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${access}`, 'Content-Type': 'application/json' },
      }),
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: postKeys.details() })
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.details() })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: commentKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: commentKeys.details() })
      queryClient.invalidateQueries({ queryKey: commentKeys.lists() })
    },
  })

  const schema = yup.object({
    commentary: yup.string().min(4).default(comment?.commentary).notRequired(),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  useEffect(() => {
    let defaultValues = {}
    defaultValues.commentary = comment?.commentary
    reset({ ...defaultValues })
  }, [comment?.commentary, reset])

  useEffect(() => {
    let mounted = true

    const preparePost = async () => {
      if (commentQuery?.data && mounted) {
        setComment(commentQuery?.data)
      }
    }
    preparePost()

    return () => {
      mounted = false
    }
  }, [commentQuery?.data, setComment])

  const onSubmit = async (formData) => {
    try {
      const sanitzeData = {
        commentary: sanitize(formData.commentary),
      }
      const result = await updateMutation.mutateAsync(sanitzeData)
      //console.log(result)
      if (result) {
        toast.success(result.data.message, { theme: 'colored' })
        setComment(result.data.comment)
      }
    } catch (err) {
      toast.error(err.response.data.error, { theme: 'colored' })
    }
  }

  if (updateMutation.isLoading) return <Loader />
  console.log(comment)
  return (
    <Container className="col-md-9 mx-auto">
      <h2>Update Comment</h2>
      <UpdateCommentForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        reset={reset}
        updateMutation={updateMutation}
        commentQuery={commentQuery}
      />
      {comment?.commentOn ? (
        <>
          <CreatedOrUpdatedComment comment={comment} />
        </>
      ) : null}
    </Container>
  )
}

export default UpdateComment
