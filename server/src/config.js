import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const PORT = process.env.PORT

const FRONTEND_URL = process.env.FRONTEND_URL

const BACKEND_URL = process.env.BACKEND_URL

const MONGO_URL = process.env.MONGO_URL

const MONGO_URL_TEST = process.env.MONGO_URL_TEST

const JWT_SECRET = process.env.JWT_SECRET

const SESSION_SECRET = process.env.SESSION_SECRET

const COOKIE_SECRET1 = process.env.COOKIE_SECRET1

const COOKIE_SECRET2 = process.env.COOKIE_SECRET2

const COOKIE_NAME = process.env.COOKIE_NAME

const REDIS_URL = process.env.REDIS_URL

const REDIS_PORT = process.env.REDIS_PORT

const REDIS_HOST = process.env.REDIS_HOST

const REDIS_PASSWORD = process.env.REDIS_PASSWORD

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME

const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY

const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET

const config = {
  port: PORT,
  frontend_url: FRONTEND_URL,
  backend_url: BACKEND_URL,
  mongo_url: MONGO_URL,
  mongo_url_test: MONGO_URL_TEST,
  jwt_secret: JWT_SECRET,
  session_secret: SESSION_SECRET,
  cookie_secret1: COOKIE_SECRET1,
  cookie_secret2: COOKIE_SECRET2,
  redis_url: REDIS_URL,
  redis_host: REDIS_HOST,
  redis_port: REDIS_PORT,
  redis_password: REDIS_PASSWORD,
  cookie_name: COOKIE_NAME,
  cloudinary_name: CLOUDINARY_NAME,
  cloudinary_key: CLOUDINARY_KEY,
  cloudinary_secret: CLOUDINARY_SECRET,
}

module.exports = config
