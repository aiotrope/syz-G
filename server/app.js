const config = require('./config')
const express = require('express')
require('express-async-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
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
const corsMiddleware = require('./middlewares/cors')

const app = express()

dbConnection()

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.use(cookieParser())

app.use(passport.initialize())

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
