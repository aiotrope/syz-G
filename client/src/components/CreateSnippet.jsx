import { useState, lazy } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { sanitize } from 'isomorphic-dompurify'
import jwtDecode from 'jwt-decode'

import Stack from 'react-bootstrap/Stack'
import { toast } from 'react-toastify'

import { postService } from '../services/post'
import { post_atom, posts_atom } from '../recoil/post'
import { jwt_atom } from '../recoil/auth'

import { userKeys, postKeys } from '../services/queryKeyFactory'

const CreateForm = lazy(() => import('./snippet/createForm'))
const Created = lazy(() => import('./snippet/created'))
const Loader = lazy(() => import('./misc/loader'))

const schema = yup
  .object({
    title: yup.string().min(5).required(),
    description: yup.string().min(10).required(),
    entry: yup.string().min(10).required(),
  })
  .required()

const CreateSnippet = () => {
  const [tag, setTag] = useState([])

  const queryClient = useQueryClient()

  const setPosts = useSetRecoilState(posts_atom)

  const setPost = useSetRecoilState(post_atom)

  const posts = useRecoilValue(posts_atom)

  const post = useRecoilValue(post_atom)

  const _jwt = useRecoilValue(jwt_atom)

  const decoded = jwtDecode(_jwt)

  const postMutation = useMutation({
    mutationFn: postService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.details() })
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.details() })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.detail(decoded.id) })
      queryClient.invalidateQueries({ queryKey: postKeys.detail(post?.id) })
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

export default CreateSnippet
