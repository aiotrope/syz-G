import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { sanitize } from 'isomorphic-dompurify'
import { Link } from 'react-router-dom'
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
import { Highlighter } from '../Misc/Highlighter'
import Badge from 'react-bootstrap/esm/Badge'

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
    reset()
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
      console.log('CREATE POST ', result)
      if (result) {
        toast.success(result.message, { theme: 'colored' })
        setPost(result.post)
        setPosts(posts.concat(result.post))
        setTag([])
        reset()
      }
    } catch (err) {
      //console.error(err.response.data.error)
      toast.error(err.response.data.error, { theme: 'colored' })
    }
  }

  console.log(posts)

  const tagValue = tag?.map((val, idx) => (
    <small key={idx}>
      <span className="bg-light m-1 text-danger">{val}</span>
    </small>
  ))

  return (
    <Stack className="col-md-9 mx-auto">
      <h2>Create Snippet</h2>
      <p>All fields are required to fill-in.</p>
      <Form className="mt-2" spellCheck="false" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel label="Tag your post" className="mb-2">
          <Form.Control
            type="text"
            {...register('lang')}
            placeholder="What programming language is your code related to?"
            style={{ height: '2rem' }}
            aria-invalid={errors.lang?.message ? 'true' : 'false'}
            id="lang"
            className={`${errors.lang?.message ? 'is-invalid' : ''} `}
          />
          {errors.lang?.message && (
            <Form.Control.Feedback type="invalid">{errors.lang?.message}</Form.Control.Feedback>
          )}
          <Form.Text muted>
            Particular topics? programming languages involve? Can enter one or more tags.
          </Form.Text>
          <div className="mb-2">
            <Button type="button" size="sm" variant="outline-secondary" onClick={handleClickLang}>
              ADD TAG
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
            What are the use cases of your snippet? Any particular application/s?
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
            Code that you want to share or questions that you want to ask. Write in markdown/text
            form.
          </Form.Text>
        </FloatingLabel>
        <FormGroup className="my-5">
          <Row>
            <Col>
              <Button variant="info" size="lg" type="submit" onClick={() => postMutation.reset()}>
                SUBMIT POST
              </Button>
            </Col>
            <Col>
              <Button variant="light" size="lg" type="button" onClick={() => resetForm()}>
                RESET FORM
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
      {post.entry ? (
        <>
          <Row className="my-3">
            <Col>
              <p>
                Title:{' '}
                <Link to={`/snippet/${post?.id}`} className="post-title">
                  {post?.title}
                </Link>
              </p>
              <p>Description: {post?.description}</p>
              <p>
                Tags:{' '}
                {post?.tags.map((tag, indx) => (
                  <Badge key={indx} className="mx-1">
                    {tag}
                  </Badge>
                ))}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Snippet:</p>
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
