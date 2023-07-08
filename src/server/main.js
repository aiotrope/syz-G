import config from './config.js'
import express from 'express'
import ViteExpress from 'vite-express'
import 'express-async-errors'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'
import mongoSanitize from 'express-mongo-sanitize'
import passport from 'passport'
import * as sanitize from 'sanitize'

import dbConnection from './utils/mongo.js'
import loggingMiddleware from './middlewares/logging.js'
import errorMiddleware from './middlewares/error.js'
import { jwtLogin } from './passport/jwt.js'
import { googleLogin } from './passport/google.js'
import { fbLogin } from './passport/fb.js'
import cache from './utils/redis.js'
import corsMiddleware from './middlewares/cors.js'

import userRouter from './routes/user.js'
import googleRouter from './routes/google.js'

const app = express()

dbConnection()

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

app.disable('x-powered-by')

app.use(helmet())

app.use(sanitize.middleware)

app.use(mongoSanitize())

app.use(loggingMiddleware.logging)

app.use('/api/user', userRouter)

app.use('/api/google', googleRouter)

app.use(errorMiddleware.endPoint404)

app.use(errorMiddleware.errorHandler)


ViteExpress.listen(app, config.port, () =>
  console.log(`Server is listening on port ${config.port}`)
);
