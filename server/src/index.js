import config from './utils/config'
import express from 'express'
require('express-async-errors')
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import passport from 'passport'
import session from 'express-session'
import dbConnection from './utils/mongo'
import RedisStore from 'connect-redis'
import loggingMiddleware from './middlewares/logging'
import errorMiddleware from './middlewares/error'

import userRouter from './routes/user'
import googleRouter from './routes/google'

import { googleLogin } from './services/passport/google'
import { redisClient } from './utils/redis'
import logger from './utils/logger'
//import User from './models/user'

const app = express()

let redisStore = new RedisStore({
  client: redisClient,
})

app.use(express.static('../client/build'))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(
  session({
    store: redisStore,
    secret: [config.cookie_secret1, config.cookie_secret2],
    name: config.cookie_name,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production' ? true : false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 2 * 60 * 60 * 1000,
      sameSite: 'lax',
    },
  })
)

app.use(passport.initialize())

app.use(passport.session())

googleLogin(passport)

if (process.env === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
      optionsSuccessStatus: 200,
    })
  )
}

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use(helmet())

app.use(require('sanitize').middleware)

dbConnection()

app.use(mongoSanitize())

app.use(loggingMiddleware.logging)

app.use('/api/user', userRouter)

app.use('/api/google', googleRouter)

app.use(errorMiddleware.endPoint404)

app.use(errorMiddleware.errorHandler)

app.listen(config.port, () => {
  logger.debug(`Server is running on port ${config.port}`)
})
