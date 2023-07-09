const config = require('./config')
const express = require('express')
require('express-async-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
//const session = require('express-session')
const mongoSanitize = require('express-mongo-sanitize')
const passport = require('passport')

const dbConnection = require('./utils/mongo')
const loggingMiddleware = require('./middlewares/logging')
const errorMiddleware = require('./middlewares/error')
const userRouter = require('./routes/user')
const googleRouter = require('./routes/google')

const jwtLogin = require('./passport/jwt')
const googleLogin = require('./passport/google')
const fbLogin = require('./passport/fb')
//const cache = require('./utils/redis')
const corsMiddleware = require('./middlewares/cors')

const app = express()

dbConnection()

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.use(cookieParser())

/* app.use(
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
) */

app.use(passport.initialize())

//app.use(passport.session())

jwtLogin(passport)
googleLogin(passport)
fbLogin(passport)

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

app.use(require('sanitize').middleware)

app.use(mongoSanitize())

app.use(loggingMiddleware.logging)

app.use('/api/user', userRouter)

app.use('/api/google', googleRouter)

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.use(errorMiddleware.endPoint404)

app.use(errorMiddleware.errorHandler)

module.exports = app
