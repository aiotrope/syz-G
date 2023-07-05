import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT

const FRONTEND_URL = process.env.FRONTEND_URL

const MONGO_URL_DEV = process.env.MONGO_URL_DEV

const MONGO_URL_PROD = process.env.MONGO_URL_PROD

const MONGO_URL_TEST = process.env.MONGO_URL_TEST

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL

const FB_CLIENT_ID = process.env.FB_CLIENT_ID

const FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET

const FB_CALLBACK_URL = process.env.FB_CALLBACK_URL

const JWT_SECRET = process.env.JWT_SECRET

const SESSION_SECRET = process.env.SESSION_SECRET

const COOKIE_SECRET1 = process.env.COOKIE_SECRET1

const COOKIE_SECRET2 = process.env.COOKIE_SECRET2

const COOKIE_NAME = process.env.COOKIE_NAME

const REDIS_URL = process.env.REDIS_URL

const REDIS_PORT = process.env.REDIS_PORT

const REDIS_HOST = process.env.REDIS_HOST

const REDIS_PASSWORD = process.env.REDIS_PASSWORD


const config = {
  port: PORT,
  frontend_url: FRONTEND_URL,
  mongo_url_dev: MONGO_URL_DEV,
  mongo_url_prod: MONGO_URL_PROD,
  mongo_url_test: MONGO_URL_TEST,
  google_client_id: GOOGLE_CLIENT_ID,
  google_client_secret: GOOGLE_CLIENT_SECRET,
  google_callback_url: GOOGLE_CALLBACK_URL,
  fb_client_id: FB_CLIENT_ID,
  fb_client_secret: FB_CLIENT_SECRET,
  fb_callback_url: FB_CALLBACK_URL,
  jwt_secret: JWT_SECRET,
  session_secret: SESSION_SECRET,
  cookie_secret1: COOKIE_SECRET1,
  cookie_secret2: COOKIE_SECRET2,
  redis_url: REDIS_URL,
  redis_host: REDIS_HOST,
  redis_port: REDIS_PORT,
  redis_password: REDIS_PASSWORD,
  cookie_name: COOKIE_NAME,
}

export default config
