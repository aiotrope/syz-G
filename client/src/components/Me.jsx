import { useEffect, lazy } from 'react'
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

import { userService } from '../services/user'
import { convertBase64 } from '../services/misc'
import { user_atom } from '../recoil/auth'
import { jwt_atom } from '../recoil/auth'
import { userKeys, postKeys, commentKeys } from '../services/queryKeyFactory'

const username_regex = /^[a-zA-Z0-9!@#%^&*+-=]{4,}$/

const UpdateMeForm = lazy(() => import('./UpdateMeForm'))
const UpdateAvatarForm = lazy(() => import('./UpdateAvatarForm'))
const UpdateDestroySnippetsCreated = lazy(() => import('./UpdateDestroySnippetsCreated'))
const UpdateDestroyCommentsCreated = lazy(() => import('./UpdateDestroyCommentsCreated'))
const AccountDeletion = lazy(() => import('./AccountDeletion'))
const Loader = lazy(() => import('./misc/loader'))

// main component for authenticated user to manage their profile account, update and deletion
const Me = () => {
  const queryClient = useQueryClient()

  // set current user in atom
  const setUser = useSetRecoilState(user_atom)
  // value of atom
  const user = useRecoilValue(user_atom)
  // value of access token
  const _jwt = useRecoilValue(jwt_atom)
  // decoding jwt
  const decoded = jwtDecode(_jwt)
  // reseting jwt for logging out
  const resetJWTAtom = useResetRecoilState(jwt_atom)
  // query current user based on decoded jwt
  const userQuery = useQuery({
    queryKey: userKeys.detail(decoded.id),
    queryFn: userService.getMe,
  })

  useEffect(() => {
    let mounted = true

    const prepareUser = async () => {
      if (userQuery?.data && mounted) {
        setUser({
          ...userQuery?.data,
        })
      }
    }
    prepareUser()

    return () => {
      mounted = false
    }
  }, [setUser, userQuery?.data])

  // object schema for validating user profile update fields
  const schema = yup.object({
    username: yup.string().trim().matches(username_regex).default(user.username).notRequired(),
    email: yup.string().email().default(user.email).notRequired(),
    bio: yup.string().default(user.bio).notRequired(),
  })
  // object schema for validating avatar field
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

  // mutation action for updating user info
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

  // mutation action for updating user's avatar
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

  // mutation action to delete user account
  const deleteMutation = useMutation({
    mutationFn: userService.deleteUserAccount,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userKeys.detail(decoded.id) })
      toast.info(`${user.email} account deleted`, { theme: 'colored' })
      resetJWTAtom()
    },
  })

  // submit action for updating user
  const onSubmit = async (data) => {
    try {
      const result = await userMutation.mutateAsync(data)
      if (result) {
        //console.log(result?.user)
        toast.success(result?.message, { theme: 'colored' })
        setUser(result.user)
      }
    } catch (err) {
      toast.error(err?.response?.data?.error, { theme: 'colored' })
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

  // handler for deleting account
  const handleDeleteAccount = async () => {
    try {
      await deleteMutation.mutateAsync(user.id)
    } catch (err) {
      toast.error(err.response.data.error, { theme: 'colored' })
    }
  }

  // finding user's posts
  const snippetsByUser = user?.posts?.find((post) => post.user === decoded.id)
  // finding user's comments
  const commentsByUser = user?.comments?.find((comment) => comment.commenter === decoded.id)

  if (
    userMutation.isLoading ||
    avatarMutation.isLoading ||
    userQuery.isLoading ||
    deleteMutation.isLoading
  ) {
    return <Loader />
  }
  //console.log(commentsByUser)
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
            src={user?.avatar}
            alt={`Profile photo of ${user.username}`}
            thumbnail
            height={80}
            width={80}
          />
        </Col>
      </Row>
      <Row>
        <Col md="auto">
          <p>Created: {moment(user?.createdAt).fromNow()}</p>
          <p>Updated: {moment(user?.updatedAt).fromNow()}</p>
        </Col>
      </Row>
      <h3>Update your profile</h3>
      <UpdateMeForm
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
          <h5>
            {user?.posts?.length >= 2
              ? `${user?.posts?.length} snippets created`
              : `${user?.posts?.length} snippet created`}
          </h5>
          {snippetsByUser && (
            <UpdateDestroySnippetsCreated
              user={user}
              queryClient={queryClient}
              useMutation={useMutation}
              postKeys={postKeys}
              userKeys={userKeys}
              access={_jwt}
            />
          )}
        </Col>
      </Row>
      <hr />
      <div>
        <Row>
          <Col>
            <h5>
              {' '}
              {user?.comments?.length >= 2
                ? `${user?.comments?.length} comments created`
                : `${user?.comments?.length} comment created`}
            </h5>
            {commentsByUser && (
              <UpdateDestroyCommentsCreated
                user={user}
                queryClient={queryClient}
                useMutation={useMutation}
                postKeys={postKeys}
                userKeys={userKeys}
                commentKeys={commentKeys}
                access={_jwt}
                userQuery={userQuery}
              />
            )}
          </Col>
        </Row>
      </div>
      <hr />
      <div className="my-5 d-grid gap-2">
        <h6>Account Deletion</h6>
        <AccountDeletion handleDeleteAccount={handleDeleteAccount} />
      </div>
    </Container>
  )
}

export default Me
