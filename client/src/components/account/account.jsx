import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import jwt_decode from 'jwt-decode'

import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify'

import { authService } from '../../services/auth'
import { convertBase64 } from '../../services/misc'
import { jwt_atom } from '../../recoil/auth'

export const Account = () => {
  const queryClient = useQueryClient()

  const _jwt = useRecoilValue(jwt_atom)

  const decoded = jwt_decode(_jwt)

  const avatarMutate = useMutation({
    mutationFn: authService.uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users', 'user'],
      })
    },
  })

  const avatarQuery = useQuery(['user-avatar'], () => authService.getUserAvatar(decoded.id))

  const avatarUrl = avatarQuery?.data?.avatar

  const handleUpload = async (event) => {
    const files = event.target.files

    console.log(files.length)

    try {
      const base64 = await convertBase64(files[0])

      const result = await avatarMutate.mutateAsync({ image: base64 })
      if (result) {
        toast.success(result.message)
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  if (avatarMutate.isLoading) {
    return (
      <Spinner animation="grow" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }
  return (
    <Stack className="col-md-5 mx-auto">
      <h2>Profile</h2>
      <div className="mt-5">
        <Row>
          <Col xs={12} md={8}>
            <small>
              User ID: <span className="text-info">{decoded.id}</span>
            </small>
            <p>Username: {decoded.username}</p>
            <p>Email: {decoded.email}</p>
          </Col>
          <Col xs={6} md={4}>
            <Image src={avatarUrl} thumbnail alt={`Profile photo of name`} />
          </Col>
        </Row>
        <form>
          <Form.Group className="mt-4">
            <Form.Label htmlFor="avatar">Update profile picture</Form.Label>
            <Form.Control type="file" size="sm" onChange={handleUpload} multiple id="avatar" />
          </Form.Group>
        </form>
      </div>
    </Stack>
  )
}
