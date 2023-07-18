import config from './config'
import express from 'express'
require('express-async-errors')
import cookieParser from 'cookie-parser'
import http from 'http'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import nocache from 'nocache'

import dbConnection from './utils/mongo'
import loggingMiddleware from './middlewares/logging'
import errorMiddleware from './middlewares/error'
import corsMiddleware from './middlewares/cors'

import userRouter from './routes/user'
import indexRouter from './routes/index'
import postRouter from './routes/post'

import logger from './utils/logger'

const port = config.port

const app = express()

const httpServer = http.createServer(app)

dbConnection()

app.use(cookieParser())

app.use(
  cors({
    origin: [
      config.frontend_url,
      config.original_frontend_url,
      config.backend_url,
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

app.use(corsMiddleware.cors)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.disable('x-powered-by')

app.use(mongoSanitize())

app.use(helmet())

app.use(loggingMiddleware.logging)

app.use(nocache())

app.use('/', indexRouter)

app.use('/api/user', userRouter)

app.use('/api/post', postRouter)

app.use(errorMiddleware.endPoint404)

app.use(errorMiddleware.errorHandler)

httpServer.listen(port, () => {
  logger.http(`Server is running on port ${port}`)
})
