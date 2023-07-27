<a name="intro"></a>
# xzymous

Xzymous is a web app project submitted in partial fulfillment of LUT's CT30A3204 course. The application's architecture which consists of server-side deployed as serverless function and client-side code is separately published on the internet and maintained in a single git repository. The client side, which acts as a single-page application, can send HTTP requests to the server, providing the resources such as users, posts, and comments. Anonymous users can only access some of the resources through `GET` requests through rendered data on the website; otherwise, users must authenticate to the system to execute further interactive operations.

[![GitHub](https://img.shields.io/github/license/aiotrope/xzymous)](https://opensource.org/license/0bsd/)

[![Logo](https://drive.google.com/uc?export=view&id=1HpzHwBj5EriL1ZVpkMrqAMrFXyEEuOhR)](https://www.arnelimperial.com)

## 🧬 Table of Contents

1. [ Introduction ](#intro)
2. [ Requisite ](#requisite)
3. [ Tech Stack ](#tech-stack)
4. [ Installation ](#installation)
5. [ Environment Variables ](#envs)
6. [ API Reference ](#api)
7. [ License ](#license)
8. [ Lessons ](#lessons)
9. [ Deployment ](#deployment)
10. [ Author ](#author)

<a name="requisite"></a>
### 🤔 Requisite

Basic understanding of MERN (MongoDB, Express, React, Node) stack web development.

<a name="tech-stack"></a>
### 🤖 Tech Stack

The author chose the technological stack in the project based on his prior experiences with the stack, the application of technologies covered in the `CT30A3204` course curriculum, and the motivation to try something new to carry out an extra feature to the app built. 
`Vite` was used as a build tool to scaffold the project on the client side instead of `Create React App` due to faster hot module reloading feature. 
The aim for uniformity between the backend and frontend code during development phase led to the optional decision of the author to implement `Babel` transpilation to CommonJS on production.
Node version `v18.16.1`, yarn version `1.22.19` and [N](https://github.com/tj/n) nodejs package manager was use for development setup.

**Server** 

| Dependencies           | Uses                                      |
|------------------------|-------------------------------------------|
| express                | API request handler and DB connetor       |
| bcrypt                 | Hashing password                          |
| cloudinary             | SDK integration for image upload          |
| cors                   | CORS middleware                           |
| dotenv                 | For environment variables                 |
| helmet                 | Add security layer to the app             |
| express-async-errors   | Async/await error handling                |
| express-mongo-sanitize | Prevent MongoDB operator injection        |
| isomorphic-dompurify   | Sanitize use input                        |
| joi                    | For schema validation                     |
| jsonwebtoken           | Generation and verification of JWT token  |
| mongoose               | wrapper for MongoDB                       |
| morgan                 | Development logger                        |
| nocache                | Prevent caching from client               |
| safe-regex             | To safe guard regex used                  |
| winston                | Developent logger                         |
| http-errors            | For error handling                        |
| lodash                 | Utilities for data manipulation           |
| jest/supertest         | For backend unit testing                  |
| eslint/prettier        | Formatting codes                          |
| nodemon                | Dev server                                |
| babel et al            | Code transpiler                           |

**Client** 

| Dependencies              | Uses                                   |
|---------------------------|----------------------------------------|
| react                     | User interface builder                 |
| @hookform/resolvers       | Connecting validator to form           |
| @tanstack/react-query     | Server side state manager              |
| axios                     | Manage HTTP request from the client    |
| react-bootstrap/bootstrap | Responsive components for creating UI  |
| jwt-decode                | Decoding JWT access token              |
| moment                    | Formatting timestamp                   |
| react-markdown            | Rendering markdown                     |
| react-hook-form           | Hook for building forms                |
| yup                       | For schema validation                  |
| react-syntax-highlighter  | Code highlighter                       |
| sass                      | CSS preprocessor                       |
| react-toastify            | Notification and messages              |
| recoil/recoil-persist     | Client side state manager              |
| use-debounce              | Delaying execution of state update     |
| remark-gfm                | Plugin to support GFM                  |
| @axe-core/react           | Accessibility test on dev mode         |
| cypress                   | For E2E testing                        |
| react-router-dom          | Routing for react                      |
| eslint/prettier           | Formatting codes                       |
| eslint-plugin-jsx-a11y    | Accessibility checker rule on dev mode |
| vite                      | Frontend build tool                    |
| isomorphic-dompurify      | Sanitize use input                     |
| lodash                    | Utilities for data manipulation        |

<a name="installation"></a>
### 💻 Run Locally

Clone the project

```bash
  git clone git@github.com:aiotrope/xzymous.git
```

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  yarn install
```

Start the server on development mode

```bash
  yarn dev
```

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  yarn install
```

Start the client on development mode

```bash
  yarn dev
```

<a name="envs"></a>
### 🌱 Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

For `server` directory the .env must be located at the root of `server` directory. Port `8080` is not configured by default and must be specified as an environment variable. For the `client` directory, place the .env file in the client folder's `src` directory.

MongoDB credentials and connection were established via [MongoDB Atlas](https://www.mongodb.com/atlas/database), however locally installed MongoDB will suffice.

The backend application also requires credentials to [Cloudinary](https://cloudinary.com/).

```bash
# server .env file e.g.
PORT=8080
MONGO_URL=<MONGO_CONNECTION_URL>
MONGO_URL_TEST=<MONGO_CONNECTION_URL> # MongoDB connection for test environment
LOCAL_URL=http://localhost:5173 # Client side base URL. Must be set as-is
JWT_SECRET=<YOUR_RANDOM_SECRET_STRING>
CLOUDINARY_NAME=<YOUR_CLOUDINARY_NAME>
CLOUDINARY_KEY=<YOUR_CLOUDINARY_KEY>
CLOUDINARY_SECRET=<YOUR_CLOUDINARY_SECRET>
CLOUDINARY_PRESET_NAME=<YOUR_CLOUDINARY_PRESET>
FRONTEND_URL=http://localhost:5173 # Client side base URL. Must be set as-is
ORIGINAL_FRONTEND_URL=http://localhost:5173 # Client side base URL. Must be set as-is
BACKEND_URL=http://localhost:8080 # Server side base URL. Must be set as-is

```

```bash
# client .env file e.g.
VITE_BASE_URL=http://127.0.0.1:8080 # Server side base URL. Must be set as-is
```

<a name="api"></a>
### ⚙️ API Reference

#### User

##### Create user

```http
  POST /api/user/signup
```

| Body      | Type     | Description    |
| :-------- | :------- | :--------------|
| `username`| `string` | **Required**   |
| `email`   | `string` | **Required**   |
| `password`| `string` | **Required**   |
| `confirm` | `string` | **Required**   |

##### Login user

```http
  GET /api/user/signin
```

| Body      | Type     | Description    |
| :-------- | :------- | :--------------|
| `email`   | `string` | **Required**   |
| `password`| `string` | **Required**   |

##### Get auth user. Authentication required

```http
  GET /api/user/me/${id}
```

| Param     | Type     | Description    |
| :-------- | :------- | :--------------|
| `id`      | `string` | **Required**.  |

##### Get user by id

```http
  GET /api/user/${id}
```

| Parameter | Type     | Description    |
| :-------- | :------- | :--------------|
| `id`      | `string` | **Required**   |

##### Update user by id. Authentication required

```http
  PATCH /api/user/update/${id}
```

| Params/Body | Type     | Description   |
| :---------- | :------- | :-------------|
| `id`        | `string` | **Required**  |
| `username`  | `string` | **Optional**  |
| `email`     | `string` | **Optional**  |
| `bio`       | `string` | **Optional**  |

##### Update user profile photo. Authentication required

```http
  PATCH /api/user/update/avatar/${id}
```

| Params/Body | Type     | Description   |
| :---------- | :------- | :-------------|
| `id`        | `string` | **Required**  |
| `image`     | `string` | **Required**  |

##### Delete user by id. Authentication required

```http
  DELETE /api/user/delete/${id}
```

| Params      | Type     | Description   |
| :---------- | :------- | :-------------|
| `id`        | `string` | **Required**  |

##### Get all users

```http
  GET /api/user/all
```

#### Post

##### Create post snippet. Authentication required

```http
  POST /api/post
```

| Body          | Type     | Description   |
| :------------ | :------- | :-------------|
| `title`       | `string` | **Required**  |
| `description` | `string` | **Optional**  |
| `tags`        | `string` | **Optional**  |
| `entry`       | `string` | **Optional**  |

##### Get post snippet by id

```http
  GET /api/post/${id}
```

| Params      | Type     | Description   |
| :---------- | :------- | :-------------|
| `id`        | `string` | **Required**  |

##### Get all post

```http
  GET /api/post
```

##### Update post. Authentication required

```http
  PATCH /api/post/${id}
```

| Params/Body   | Type     | Description   |
| :------------ | :------- | :-------------|
| `id`          | `string` | **Required**  |
| `title`       | `string` | **Required**  |
| `description` | `string` | **Optional**  |
| `entry`       | `string` | **Optional**  |

##### Delete post. Authentication required

```http
  DELETE /api/post/${id}
```

| Params        | Type     | Description   |
| :------------ | :------- | :-------------|
| `id`          | `string` | **Required**  |

#### Post

##### Create comment. Authentication required

```http
  POST /api/comment/${postId}
```

| Params/Body   | Type     | Description   |
| :------------ | :------- | :-------------|
| `postId`      | `string` | **Required**  |
| `commentary`  | `string` | **Required**  |

##### Get comment by post snippet id

```http
  GET /api/comment/post/${postId}
```

| Params        | Type     | Description   |
| :------------ | :------- | :-------------|
| `postId`      | `string` | **Required**  |

##### Get comment by id

```http
  GET /api/comment/${id}
```

| Params        | Type     | Description   |
| :------------ | :------- | :-------------|
| `id`          | `string` | **Required**  |

##### Update comment by id. Authentication required

```http
  PATCH /api/comment/update/${id}
```

| Params/Body   | Type     | Description   |
| :------------ | :------- | :-------------|
| `id`          | `string` | **Required**  |
| `commentary`  | `string` | **Optional**  |

##### Delete comment by id. Authentication required

```http
  DELETE /api/comment/delete/${id}
```

| Params   | Type     | Description   |
| :--------| :------- | :-------------|
| `id`     | `string` | **Required**  |

##### Get comment by user id

```http
  GET /api/comment/user/${id}
```

| Params  | Type     | Description   |
| :-------| :------- | :-------------|
| `id`    | `string` | **Required**  |


<a name="license"></a>
### 📝 License

[BSD Zero Clause](https://choosealicense.com/licenses/0bsd/)

<a name="lessons"></a>
### 🎓 Lessons Learned

The main issue I had when working on this project was determining the right tool and environment for a variety of tasks while also efficiently managing my time. I intended to write both the front-end and back-end in Typescript to be included as a feature of the project, however the development took longer than expected due to my lack of Typescript know-how. To meet the needs of time, I turned to Javascript for this matter. I'm certain that I can give the codes in TS, but time is now my adversary, and I'm worried that I won't be able to finish the project on time. I don't think I'm wasting time on that portion, but sitting in front of my computer, configuring, retooling my project at the same time reviewing TS gives me a sense of unfinished work, especially as the clock approaches a deadline. TS is good, however I think I'll use it on personal projects that offer me plenty of time. 
I also learned to prioritise the project's mandatory requirements before adding extra features that can slow down development.

<a name="deployment"></a>
### 🚀 Deployment

Web services by [Vercel](https://vercel.com/new)

**Backend api as serverless function:** https://xzymous-api.vercel.app/

**Frontend app:** https://www.arnelimperial.com

<a name="author"></a>
### 👨🏻‍💻 Author

- [@aiotrope](https://github.com/aiotrope)
