import { useEffect } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { toast } from 'react-toastify'
import moment from 'moment'
import jwtDecode from 'jwt-decode'

import { UpdateForm } from './me/updateForm'
import { UpdateAvatarForm } from './me/updateAvatarForm'
import { UpdateDestroySnippetsCreated } from './me/updateDestroySnippetsCreated'
import { AccountDeletion } from './me/accountDeletion'

import Loader from './misc/loader'
import { userService } from '../services/user'
import { convertBase64 } from '../services/misc'
import { user_atom } from '../recoil/auth'
import { jwt_atom } from '../recoil/auth'
import { userKeys, postKeys } from '../services/queryKeyFactory'

const username_regex = /^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-{}€"'ÄöäÖØÆ`~_]{4,}$/

export const Me = () => {
  const queryClient = useQueryClient()

  const setUser = useSetRecoilState(user_atom)

  const user = useRecoilValue(user_atom)

  const _jwt = useRecoilValue(jwt_atom)

  const decoded = jwtDecode(_jwt)

  const resetJWTAtom = useResetRecoilState(jwt_atom)

  const userQuery = useQuery({
    queryKey: userKeys.detail(decoded.id),
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
    bio: yup.string().default(user.bio).notRequired(),
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
    mode: 'onChange',
  })

  useEffect(() => {
    let defaultValues = {}
    defaultValues.username = user.username
    defaultValues.email = user.email
    defaultValues.bio = user.bio
    reset({ ...defaultValues })
  }, [reset, user.bio, user.email, user.username])

  const userMutation = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: userKeys.detail(decoded.id) })
      queryClient.invalidateQueries({ queryKey: userKeys.details() })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: postKeys.details() })
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })

  const avatarMutation = useMutation({
    mutationFn: userService.updateUserAvatar,
    onSuccess: () => {
      avatarForm.reset()
      queryClient.invalidateQueries({ queryKey: userKeys.detail(decoded.id) })
      queryClient.invalidateQueries({ queryKey: userKeys.details() })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: postKeys.details() })
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: userService.deleteUserAccount,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userKeys.detail(decoded.id) })
      toast.info(`${user.email} account deleted`, { theme: 'colored' })
      resetJWTAtom()
    },
  })

  const onSubmit = async (data) => {
    try {
      const result = await userMutation.mutateAsync(data)
      if (result) {
        console.log(result.user)
        toast.success(result.message, { theme: 'colored' })
        setUser(result.user)
      }
    } catch (err) {
      toast.error(err.response.data.error, { theme: 'colored' })
    }
  }

  const onAvatarFormSubmit = async (data) => {
    const base64 = await convertBase64(data.image[0])
    //console.log(base64)
    try {
      const result = await avatarMutation.mutateAsync({ image: base64 })
      if (result) {
        toast.success(result.message, { theme: 'colored' })
        setUser(result.user)
      }
    } catch (err) {
      toast.error(err.response.data.error, { theme: 'colored' })
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteMutation.mutateAsync(user.id)
    } catch (err) {
      toast.error(err.response.data.error, { theme: 'colored' })
    }
  }

  const snippetsByUser = user?.posts?.find((post) => post.user === decoded.id)

  if (
    userMutation.isLoading ||
    avatarMutation.isLoading ||
    useQuery.isLoading ||
    userQuery.isFetching ||
    deleteMutation.isLoading
  ) {
    return <Loader />
  }

  return (
    <Container className="col-md-8 mx-auto">
      <Row>
        <div>
          <h2>
            <span className="text-secondary">{user.username}</span> Profile
          </h2>
        </div>
        <Col className="my-4">
          <Image
            src={user.avatar}
            alt={`Profile photo of ${user.username}`}
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
      <UpdateForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        user={user}
        errors={errors}
      />
      <UpdateAvatarForm onAvatarFormSubmit={onAvatarFormSubmit} avatarForm={avatarForm} />

      <hr />
      <Row>
        <Col>
          <h5>Snippets created</h5>
          {snippetsByUser && (
            <UpdateDestroySnippetsCreated
              user={user}
              queryClient={queryClient}
              useMutation={useMutation}
              postKeys={postKeys}
              userKeys={userKeys}
              //decoded={decoded}
              access={_jwt}
            />
          )}
        </Col>
      </Row>
      <hr />
      <div className="my-5 d-grid gap-2">
        <h6>Account Deletion</h6>
        <AccountDeletion handleDeleteAccount={handleDeleteAccount} />
      </div>
    </Container>
  )
}
