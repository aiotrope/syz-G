import config from './config'
import express from 'express'
require('express-async-errors')
import cookieParser from 'cookie-parser'
import http from 'http'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import passport from 'passport'

import dbConnection from './utils/mongo'
import loggingMiddleware from './middlewares/logging'
import errorMiddleware from './middlewares/error'
import { jwtLogin } from './passport/jwt'
import { googleLogin } from './passport/google'
import { fbLogin } from './passport/fb'
import corsMiddleware from './middlewares/cors'

import userRouter from './routes/user'
import googleRouter from './routes/google'
import indexRouter from './routes/index'

import logger from './utils/logger'

const port = config.port

const app = express()

const httpServer = http.createServer(app)

//app.use(express.static(path.resolve(__dirname, '../client/build')))

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

app.use('/', indexRouter)

app.use('/api/user', userRouter)

app.use('/api/google', googleRouter)

dbConnection()

/* if (process.env.NODE_ENV === 'production') {
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
  })
} */

app.use(errorMiddleware.endPoint404)

app.use(errorMiddleware.errorHandler)

httpServer.listen(port, () => {
  logger.http(`Server is running on port ${port}`)
})
