import config from './utils/config'
import express from 'express'
require('express-async-errors')
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import passport from 'passport'
//import session from 'express-session'
import cookieSession from 'cookie-session'
import dbConnection from './utils/db'
import loggingMiddleware from './middlewares/logging'
import errorMiddleware from './middlewares/error'

import logger from './utils/logger'

import userRouter from './routes/user'
import googleRouter from './routes/google'
import { jwtLogin } from './services/passport/jwt'
import { googleLogin } from './services/passport/google'
import { localLogin } from './services/passport/local'
import User from './models/user'

const app = express()

dbConnection()

app.use(express.static('../client/build'))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

/* app.use(
  session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 10000 }, // 24 hrs // true for https
  })
) */

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.cookie_secret1, config.cookie_secret2],
  })
)

app.use(passport.initialize())

app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

jwtLogin(passport)
googleLogin(passport)
localLogin(passport)

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

app.use(mongoSanitize())

app.use(loggingMiddleware.logging)

app.use('/api/user', userRouter)

app.use('/api/google', googleRouter)

app.use(errorMiddleware.endPoint404)

app.use(errorMiddleware.errorHandler)

app.listen(config.port, () => {
  logger.debug(`Server is running on port ${config.port}`)
})
