import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { sanitize } from 'isomorphic-dompurify'

import Stack from 'react-bootstrap/Stack'
import { toast } from 'react-toastify'

import { postService } from '../../services/post'
import { post_atom } from '../../recoil/post'
import { posts_atom } from '../../recoil/post'
import { CreateForm } from './CreateForm'
import { Created } from './Created'
import Loader from '../Misc/Loader'

const schema = yup
  .object({
    title: yup.string().min(5).required(),
    description: yup.string().min(10).required(),
    entry: yup.string().min(10).required(),
  })
  .required()

export const CreateSnippet = () => {
  const [tag, setTag] = useState([])

  const queryClient = useQueryClient()

  const postMutation = useMutation({
    mutationFn: postService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts', 'post', 'users', 'user'],
      })
    },
  })
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const setPosts = useSetRecoilState(posts_atom)

  const setPost = useSetRecoilState(post_atom)

  const posts = useRecoilValue(posts_atom)

  const post = useRecoilValue(post_atom)

  const handleClickLang = (event) => {
    event.preventDefault()
    const langValue = getValues('lang')
    setTag((prevState) => [...prevState, sanitize(langValue.toLowerCase())])
    //console.log('Tag Value', tagValue)
    console.log('Tag', tag)
  }

  const resetForm = () => {
    setTag([])
    reset()
  }

  const onSubmit = async (formData) => {
    try {
      const sanitzeData = {
        title: sanitize(formData.title),
        description: sanitize(formData.description),
        tag: tag,
        entry: sanitize(formData.entry),
      }
      const result = await postMutation.mutateAsync(sanitzeData)
      //console.log('CREATE POST ', result)
      if (result) {
        toast.success(result.message, { theme: 'colored' })
        setPost(result.post)
        setPosts(posts.concat(result.post))
        setTag([])
        reset()
      }
    } catch (err) {
      toast.error(err.response.data.error, { theme: 'colored' })
    }
  }

  //console.log(posts)

  const tagValue = tag?.map((val, idx) => (
    <small key={idx}>
      <span className="bg-light m-1 text-danger">{val}</span>
    </small>
  ))

  if (postMutation.isLoading) {
    return <Loader />
  }

  return (
    <Stack className="col-md-9 mx-auto">
      <h2>Create Snippet</h2>
      <p>All fields are required to fill-in.</p>
      <CreateForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        handleClickLang={handleClickLang}
        resetForm={resetForm}
        postMutation={postMutation}
        tag={tag}
        tagValue={tagValue}
      />
      {post.entry ? (
        <>
          <Created post={post} />
        </>
      ) : null}
    </Stack>
  )
}
