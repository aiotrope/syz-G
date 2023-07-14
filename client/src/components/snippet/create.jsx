import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { sanitize } from 'isomorphic-dompurify'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { toast } from 'react-toastify'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

import { postService } from '../../services/post'
import { post_atom } from '../../recoil/post'
import { posts_atom } from '../../recoil/post'
import { Highlighter } from '../misc/highlighter'

const schema = yup
  .object({
    title: yup.string().min(5).required(),
    description: yup.string().min(10).required(),
    tag: yup.lazy((val) => (Array.isArray(val) ? yup.array().of(yup.string()) : yup.string())),
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

  const handleClickTag = (event) => {
    event.preventDefault()
    const tagValue = getValues('tag')
    setTag((prevState) => [...prevState, sanitize(tagValue.toLowerCase())])
    reset()
    //console.log('Tag Value', tagValue)
    //console.log('Tag', tag)
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
      if (result) {
        toast.success(result.message, { theme: 'colored' })
        setPost(result.post)
        setPosts(posts.concat(result.post))
        reset()
      }
    } catch (err) {
      //console.error(err.response.data.error)
      toast.error(err.response.data.error, { theme: 'colored' })
    }
  }

  console.log(posts)

  const tagValue = tag?.map((t, idx) => (
    <small key={idx}>
      <span className="bg-light m-1">{t}</span>
    </small>
  ))

  return (
    <Stack className="col-md-9 mx-auto">
      <h2>Create Snippet</h2>
      <p>All fields are required to fill-in.</p>
      <Form className="mt-2" spellCheck="false" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel label="Programming language" className="mb-2">
          <Form.Control
            type="text"
            {...register('tag')}
            placeholder="What programming language is your code related to?"
            style={{ height: '2rem' }}
            aria-invalid={errors.tag?.message ? 'true' : 'false'}
            id="tag"
            className={`${errors.tag?.message ? 'is-invalid' : ''} `}
          />
          {errors.tag?.message && (
            <Form.Control.Feedback type="invalid">{errors.tag?.message}</Form.Control.Feedback>
          )}
          <Form.Text muted>
            Add at least one or more. Input will be transformed to lowercase.
          </Form.Text>
          <div className="mb-2">
            <Button type="button" size="sm" onClick={handleClickTag}>
              Add language
            </Button>
            <br />
            {tag ? tagValue : null}
          </div>
        </FloatingLabel>
        <FloatingLabel label="Snippet title" className="mb-2">
          <Form.Control
            as="textarea"
            {...register('title')}
            placeholder="Give your code snippet a title."
            style={{ height: '1rem' }}
            aria-invalid={errors.title?.message ? 'true' : 'false'}
            id="title"
            className={`${errors.title?.message ? 'is-invalid' : ''} `}
          />
          {errors.title?.message && (
            <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
          )}
        </FloatingLabel>
        <FloatingLabel label="Description" className="mb-2">
          <Form.Control
            as="textarea"
            {...register('description')}
            placeholder="Description"
            style={{ height: '2rem' }}
            aria-invalid={errors.description?.message ? 'true' : 'false'}
            id="description"
            className={`${errors.description?.message ? 'is-invalid' : ''} `}
          />
          {errors.description?.message && (
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          )}
          <Form.Text muted>
            What are the use cases of your snippet? Any particular application/s? Remember to write
            your snippet in markdown or plain text.
          </Form.Text>
        </FloatingLabel>
        <FloatingLabel label="Enter your snippet" className="mb-3">
          <Form.Control
            as="textarea"
            {...register('entry')}
            placeholder="Enter your snippet"
            style={{ height: '15rem' }}
            aria-invalid={errors.entry?.message ? 'true' : 'false'}
            id="entry"
            className={`${errors.entry?.message ? 'is-invalid' : ''} `}
          />
          {errors.entry?.message && (
            <Form.Control.Feedback type="invalid">{errors.entry?.message}</Form.Control.Feedback>
          )}
          <Form.Text muted>
            Any code that you want to share or questions that you want to ask.
          </Form.Text>
        </FloatingLabel>
        <FormGroup className="d-grid my-2">
          <Button variant="light" size="lg" type="submit" onClick={() => postMutation.reset()}>
            SUBMIT YOUR SNIPPET
          </Button>
        </FormGroup>
      </Form>
      {post.entry ? (
        <>
          <Row className="my-3">
            <Col>
              <p>Title: {post?.title}</p>
              <p>Description: {post?.description}</p>
              <p>Programming language: {post?.tag}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[gfm]}
                components={Highlighter}
              >
                {post?.entry}
              </ReactMarkdown>
            </Col>
          </Row>
        </>
      ) : null}
    </Stack>
  )
}
