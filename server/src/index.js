import config from './utils/config'
import express from 'express'
require('express-async-errors')
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'
import mongoSanitize from 'express-mongo-sanitize'
import passport from 'passport'

import dbConnection from './utils/mongo'
import loggingMiddleware from './middlewares/logging'
import errorMiddleware from './middlewares/error'
import userRouter from './routes/user'
import googleRouter from './routes/google'
//import { jwtLogin } from './services/passport/jwt'
import { googleLogin } from './services/passport/google'
import { fbLogin } from './services/passport/fb'
import cache from './utils/redis'
import corsMiddleware from './middlewares/cors'
import logger from './utils/logger'

const app = express()

app.use(express.static('../client/build'))

app.use(cookieParser())

app.use(
  session({
    store: cache.redisStore,
    secret: [config.cookie_secret1, config.cookie_secret2],
    name: config.cookie_name,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production' ? true : false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 2 * 60 * 60 * 1000,
      sameSite: 'none',
    },
  })
)

app.use(passport.initialize())

app.use(passport.session())

googleLogin(passport)

fbLogin(passport)

//jwtLogin(passport)

if (process.env === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
      optionsSuccessStatus: 200,
    })
  )
}

app.use(corsMiddleware.cors)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.disable('x-powered-by')

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
