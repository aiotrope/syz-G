import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil'
import { Link, useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

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
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import moment from 'moment'

import { postService } from '../../services/post'
import { authService } from '../../services/auth'

export const UpdateDestroy = () => {
  const queryClient = useQueryClient()

  const { id } = useParams()

  const postQuery = useQuery([`post-${id}`, id], () => postService.getPostById(id))

  const token = authService.getAccessToken()

  const decoded = jwtDecode(token)

  return <>{decoded.id === postQuery?.data?.user?.id ? <Container></Container> : null}</>
}
