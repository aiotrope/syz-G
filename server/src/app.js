import config from './config'
import express from 'express'
import 'express-async-errors'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'
import mongoSanitize from 'express-mongo-sanitize'
import passport from 'passport'

import dbConnection from './utils/mongo'
import loggingMiddleware from './middlewares/logging'
import errorMiddleware from './middlewares/error'
import { jwtLogin } from './passport/jwt'
import { googleLogin } from './passport/google'
import { fbLogin } from './passport/fb'
import cache from './utils/redis'
import corsMiddleware from './middlewares/cors'

import userRouter from './routes/user'
import googleRouter from './routes/google'

import connectionRouter from './routes/connection'
import assetsRouter from './routes/assets'

const publicPath = path.resolve(__dirname, '../../client/public')
const buildPath = path.resolve(__dirname, '../../client/build')

const app = express()

dbConnection()

app.set('views', path.join(__dirname, '..', 'views'))

app.set('view engine', 'ejs')

app.use(cookieParser())

app.use(
  session({
    store: cache.redisStore,
    secret: [config.cookie_secret1, config.cookie_secret2],
    name: config.cookie_name,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production' ? true : 'auto',
      httpOnly: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: 2 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
)

app.use(passport.initialize())

app.use(passport.session())

googleLogin(passport)

fbLogin(passport)

jwtLogin(passport)

app.use(
  cors({
    origin: config.frontend_url,
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

app.use(corsMiddleware.cors)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

//app.use(express.static(path.join(__dirname, '../../client', 'build')))

app.disable('x-powered-by')

app.use(helmet())

app.use(require('sanitize').middleware)

app.use(mongoSanitize())

app.use(loggingMiddleware.logging)

app.use('/api/user', userRouter)

app.use('/api/google', googleRouter)

app.use('/', express.static(publicPath))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(buildPath))
} else {
  app.use('/', express.static(publicPath))
  app.use('/src', assetsRouter)
}

app.use(connectionRouter)

app.use(errorMiddleware.endPoint404)

app.use(errorMiddleware.errorHandler)

export default app
