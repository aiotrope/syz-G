import { useEffect } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import moment from 'moment'

import { userService } from '../../services/user'
import { convertBase64 } from '../../services/misc'
import { user_atom } from '../../recoil/auth'
import Loader from '../loader'

const username_regex = /^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-{}€"'ÄöäÖØÆ`~_]{4,}$/

export const Me = () => {
  const queryClient = useQueryClient()

  const setUser = useSetRecoilState(user_atom)

  const user = useRecoilValue(user_atom)

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: userService.getMe,
  })

  useEffect(() => {
    let mounted = true

    const prepareUser = async () => {
      if (userQuery.data && mounted) {
        setUser({
          ...userQuery.data,
        })
      }
    }
    prepareUser()

    return () => {
      mounted = false
    }
  }, [setUser, userQuery.data])

  const schema = yup.object({
    username: yup.string().trim().matches(username_regex).default(user.username).notRequired(),
    email: yup.string().email().default(user.email).notRequired(),
    bio: yup.string().notRequired(),
  })

  const updateAvatarSchema = yup.object({
    image: yup.mixed().notRequired().nullable(),
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

  const avatarForm = useForm({
    resolver: yupResolver(updateAvatarSchema),
    mode: 'all',
  })

  useEffect(() => {
    let defaultValues = {}
    defaultValues.username = user.username
    defaultValues.email = user.email
    defaultValues.bio = user.bio
    reset({ ...defaultValues })
  }, [reset, user.bio, user.email, user.username])

  const userMutate = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({
        queryKey: ['users', 'user'],
      })
    },
  })

  const avatarMutate = useMutation({
    mutationFn: userService.updateUserAvatar,
    onSuccess: () => {
      avatarForm.reset()
      queryClient.invalidateQueries({
        queryKey: ['users', 'user'],
      })
    },
  })

  const onSubmit = async (data) => {
    try {
      const result = await userMutate.mutateAsync(data)
      if (result) {
        //console.log(result.user)
        toast.success(result.message)
        setUser(result.user)
      }
    } catch (err) {
      toast.error(err.response.data.error)
    }
  }

  const onAvatarFormSubmit = async (data) => {
    const base64 = await convertBase64(data.image[0])
    //console.log(base64)
    try {
      const result = await avatarMutate.mutateAsync({ image: base64 })
      if (result) {
        toast.success(result.message)
        setUser(result.user)
      }
    } catch (err) {
      toast.error(err.response.data.error)
    }
  }

  return (
    <Stack className="col-md-5 mx-auto">
      {userMutate.isLoading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <div>
              <h2>
                <span className="text-secondary">{user.username}</span> Profile
              </h2>
            </div>
            <Col className="my-4">
              <Image
                src={user.avatar}
                alt={`Profile photo of name`}
                thumbnail
                height={80}
                width={80}
              />
            </Col>
          </Row>
          <Row>
            <Col md="auto">
              <p>Created: {moment(user.createdAt).format('DD.MM.YYYY, h:mm:ss a')}</p>
              <p>Updated: {moment(user.updatedAt).format('DD.MM.YYYY, h:mm:ss a')}</p>
            </Col>
          </Row>
          <h3>Update your profile</h3>
          <Form
            className="mt-2 mb-4"
            spellCheck="false"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormGroup className="mb-2">
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl
                type="text"
                placeholder={user.username}
                {...register('username')}
                aria-invalid={errors.username?.message ? 'true' : 'false'}
                className={`${errors.username?.message ? 'is-invalid' : ''} `}
              />
              {errors.username?.message && (
                <FormControl.Feedback type="invalid">
                  {errors.username?.message}
                </FormControl.Feedback>
              )}
              <Form.Text muted>Contains only letters, numbers, and symbols.</Form.Text>
            </FormGroup>
            <FormGroup className="mb-2">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl
                type="email"
                placeholder={user.email}
                {...register('email')}
                aria-invalid={errors.email?.message ? 'true' : 'false'}
                className={`${errors.email?.message ? 'is-invalid' : ''} `}
              />
              {errors.email?.message && (
                <FormControl.Feedback type="invalid">{errors.email?.message}</FormControl.Feedback>
              )}
            </FormGroup>
            <FormGroup className="mb-2">
              <FormLabel htmlFor="bio">Bio</FormLabel>
              <FormControl
                as="textarea"
                rows={7}
                placeholder={user.bio}
                {...register('bio')}
                aria-invalid={errors.bio?.message ? 'true' : 'false'}
                className={`${errors.bio?.message ? 'is-invalid' : ''} `}
              />
              {errors.bio?.message && (
                <FormControl.Feedback type="invalid">{errors.bio?.message}</FormControl.Feedback>
              )}
            </FormGroup>
            <FormGroup className="d-grid mt-3">
              <Button variant="light" size="lg" type="submit">
                UPDATE PROFILE
              </Button>
            </FormGroup>
          </Form>
          <Form onSubmit={avatarForm.handleSubmit(onAvatarFormSubmit)}>
            <h4>Update your avatar</h4>
            <FormGroup className="mb-4">
              <FormLabel htmlFor="image">Update profile photo</FormLabel>
              <FormControl
                type="file"
                size="sm"
                {...avatarForm.register('image')}
                aria-invalid={avatarForm.formState.errors.image?.message ? 'true' : 'false'}
                className={`${avatarForm.formState.errors.image?.message ? 'is-invalid' : ''} `}
                id="image"
                multiple
              />
              {avatarForm.formState.errors.image?.message && (
                <FormControl.Feedback type="invalid">
                  {avatarForm.formState.errors.image?.message}
                </FormControl.Feedback>
              )}
            </FormGroup>
            <FormGroup className="d-grid mt-3">
              <Button variant="light" size="lg" type="submit">
                UPDATE AVATAR
              </Button>
            </FormGroup>
          </Form>
        </>
      )}
    </Stack>
  )
}
