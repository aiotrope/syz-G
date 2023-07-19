import Joi from 'joi'
import safe from 'safe-regex'
import logger from './logger'

const password_regex =
  /^(?=.*[0-9])(?=.*[!@#%^&*+-])[a-zA-Z0-9!@#%^&*+-=]{8,30}$/

const username_regex = /^[a-zA-Z0-9!@#%^&*+-=]{4,}$/

let signupSchema
let updateUserSchema

if (safe(username_regex) && safe(password_regex)) {
  signupSchema = Joi.object()
    .keys({
      email: Joi.string().trim().required().email(),
      username: Joi.string()
        .pattern(
          new RegExp(username_regex),
          'Username requires 4 characters long with letters, numbers and special characters'
        )
        .trim()
        .required(),
      password: Joi.string()
        .pattern(
          new RegExp(password_regex),
          'Password requires 8 characters with one lower, 1 uppercase letter, 1 number and 1 symbol'
        )
        .required(),
      confirm: Joi.string().valid(Joi.ref('password')).required().strict(),
    })
    .required()

  updateUserSchema = Joi.object()
    .keys({
      email: Joi.string().trim().email().optional(),
      username: Joi.string()
        .pattern(
          new RegExp(username_regex),
          'Username requires 4 characters long with letters, numbers and special characters'
        )
        .trim()
        .optional(),
      bio: Joi.string().optional(),
    })
    .optional()
} else {
  logger.error('Regex patterns unsafe!')
}

const signinSchema = Joi.object()
  .keys({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required(),
  })
  .required()

const createPostSchema = Joi.object()
  .keys({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(10).required(),
    tag: Joi.array().items(Joi.string().min(1).required()).required(),
    entry: Joi.string().min(10).required(),
  })
  .required()

const updatePostSchema = Joi.object().keys({
  title: Joi.string().min(5).optional(),
  description: Joi.string().min(10).optional(),
  entry: Joi.string().min(10).optional(),
})

const createCommentSchema = Joi.object()
  .keys({
    commentary: Joi.string().min(4).required(),
  })
  .required()

const updateCommentSchema = Joi.object().keys({
  commentary: Joi.string().min(4).optional(),
})

const validators = {
  signinSchema,
  signupSchema,
  updateUserSchema,
  createPostSchema,
  updatePostSchema,
  createCommentSchema,
  updateCommentSchema,
}

export default validators
