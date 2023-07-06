import config from './utils/config.mjs'
import express from 'express'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'
import mongoSanitize from 'express-mongo-sanitize'
import passport from 'passport'
import connectRedis from 'connect-redis'
import sanitize from 'sanitize'

import dbConnection from './utils/mongo.mjs'
import loggingMiddleware from './middlewares/logging.mjs'
import errorMiddleware from './middlewares/error.mjs'
import { userRouter } from './routes/user.mjs'
import { googleRouter } from './routes/google.mjs'
import { jwtLogin } from './services/passport/jwt.mjs'
import { googleLogin } from './services/passport/google.mjs'
import { fbLogin } from './services/passport/fb.mjs'
import cache from './utils/redis.mjs'
import corsMiddleware from './middlewares/cors.mjs'
import logger from './utils/logger.mjs'

let RedisStore = connectRedis(session)

const app = express()

app.use(express.static('../client/build'))

app.use(cookieParser())

app.use(
  session({
    store: new RedisStore({ client: cache.redisClient }),
    secret: [config.cookie_secret1, config.cookie_secret2],
    name: config.cookie_name,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      httpOnly: false,
      maxAge: 2 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
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
