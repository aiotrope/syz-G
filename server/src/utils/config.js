import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8080

const FRONTEND_URL = process.env.FRONTEND_URL

const MONGO_URL_DEV = process.env.MONGO_URL_DEV

const MONGO_URL_PROD = process.env.MONGO_URL_PROD

const MONGO_URL_TEST = process.env.MONGO_URL_TEST

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL

const JWT_SECRET = process.env.JWT_SECRET

const SESSION_SECRET = process.env.SESSION_SECRET

const COOKIE_SECRET1 = process.env.COOKIE_SECRET1

const COOKIE_SECRET2 = process.env.COOKIE_SECRET2

const COOKIE_NAME = process.env.COOKIE_NAME

const REDIS_URL = process.env.REDIS_URL

const config = {
  port: PORT,
  frontend_url: FRONTEND_URL,
  mongo_url_dev: MONGO_URL_DEV,
  mongo_url_prod: MONGO_URL_PROD,
  mongo_url_test: MONGO_URL_TEST,
  google_client_id: GOOGLE_CLIENT_ID,
  google_client_secret: GOOGLE_CLIENT_SECRET,
  google_callback_url: GOOGLE_CALLBACK_URL,
  jwt_secret: JWT_SECRET,
  session_secret: SESSION_SECRET,
  cookie_secret1: COOKIE_SECRET1,
  cookie_secret2: COOKIE_SECRET2,
  redis_url: REDIS_URL,
  cookie_name: COOKIE_NAME,
}

export default config
