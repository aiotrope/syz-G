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
7. [ Documentation ](#docs)
8. [ Running Tests ](#tests)
9. [ Features ](#feat)
10. [ License ](#license)
11. [ Lessons ](#lessons)
12. [ Deployment ](#deployment)
13. [ Author ](#author)

<a name="requisite"></a>

### 🤔 Requisite

Basic understanding of MERN (MongoDB, Express, React, Node) stack web development.

<a name="tech-stack"></a>

### 🤖 Tech Stack

The author chose the technological stack in the project based on his prior experiences with the stack, the application of technologies covered in the `CT30A3204` course curriculum, and the motivation to try something new to carry out an extra feature to the app built.
`Vite` was used as a build tool to scaffold the project on the client side instead of `Create React App` due to faster hot module reloading feature.
The aim for uniformity between the backend and frontend code during development phase led to the optional decision of the author to implement `Babel` transpilation to CommonJS on production.
Node version `v18.16.1`, yarn version `1.22.19` and [N](https://github.com/tj/n) nodejs package manager was used for development setup.

**Server**

| Dependencies           | Uses                                     |
| ---------------------- | ---------------------------------------- |
| express                | API request handler and DB connetor      |
| bcrypt                 | Hashing password                         |
| cloudinary             | SDK integration for image upload         |
| cors                   | CORS middleware                          |
| dotenv                 | For environment variables                |
| helmet                 | Add security layer to the app            |
| express-async-errors   | Async/await error handling               |
| express-mongo-sanitize | Prevent MongoDB operator injection       |
| isomorphic-dompurify   | Sanitize use input                       |
| joi                    | For schema validation                    |
| jsonwebtoken           | Generation and verification of JWT token |
| mongoose               | wrapper for MongoDB                      |
| morgan                 | Development logger                       |
| nocache                | Prevent caching from client              |
| safe-regex             | To safe guard regex used                 |
| winston                | Developent logger                        |
| http-errors            | For error handling                       |
| lodash                 | Utilities for data manipulation          |
| jest/supertest         | For backend unit testing                 |
| eslint/prettier        | Formatting codes                         |
| nodemon                | Dev server                               |
| babel et al            | Code transpiler                          |

**Client**

| Dependencies              | Uses                                   |
| ------------------------- | -------------------------------------- |
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

Go to the root directory, delete .git and create .env file

```bash
  cd xzymous && rm -rf .git && touch .env
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
# by default it will start at http://localhost:8080
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
# by default it will start at http://localhost:5173
  yarn dev
```

#### Other CLI Commands

**Build**

```bash
# building server app
cd server && yarn build:server
# to run production build at port 8080
yarn start
```

```bash
# building client app
cd client && yarn build
# to view the production build @ port 5173
yarn preview
```

**Format & Lint**

Format codes with prettier and eslint

```bash
# server
cd server && yarn format && yarn lint

```

```bash
# client
cd client && yarn format && yarn lint
```

<a name="envs"></a>

### 🌱 Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

- For `server` directory, the .env must be located at the root of `xzymous` directory.

- Port `8080` is preconfigured by default in the `server`.

- For the `client` directory, place the .env file in the client folder's `src` directory.

- MongoDB credentials and connection were established via [MongoDB Atlas](https://www.mongodb.com/atlas/database), however locally installed MongoDB will suffice.

- The backend also suggests obtaining [Cloudinary](https://cloudinary.com/) such as such as the `API KEYS`, `API SECRET`, `CLOUD NAME` and `PRESET NAME`. To your account, add new `upload preset` and set it to `unsigned`. Clodinary integration is only optional and the app will run even without it but image upload cannot be tested.

```bash
.
├── client
└── server
└── .env # .env for server

```

```bash
# server .env file e.g.
MONGO_URL=<MONGO_CONNECTION_URL> # MongoDB connection other than test mode (debug & production mode)
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
.src
├── assets
├── components
├── recoil
├── sass
└── services
└── .env.development.local # or .env from the ./client/src
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

| Body       | Type     | Description  |
| :--------- | :------- | :----------- |
| `username` | `string` | **Required** |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |
| `confirm`  | `string` | **Required** |

##### Login user

```http
  GET /api/user/signin
```

| Body       | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

##### Get auth user. Authentication required

```http
  GET /api/user/me/${id}
```

| Param | Type     | Description   |
| :---- | :------- | :------------ |
| `id`  | `string` | **Required**. |

##### Get user by id

```http
  GET /api/user/${id}
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `string` | **Required** |

##### Update user by id. Authentication required

```http
  PATCH /api/user/update/${id}
```

| Params/Body | Type     | Description  |
| :---------- | :------- | :----------- |
| `id`        | `string` | **Required** |
| `username`  | `string` | **Optional** |
| `email`     | `string` | **Optional** |
| `bio`       | `string` | **Optional** |

##### Update user profile photo. Authentication required

```http
  PATCH /api/user/update/avatar/${id}
```

| Params/Body | Type     | Description  |
| :---------- | :------- | :----------- |
| `id`        | `string` | **Required** |
| `image`     | `string` | **Required** |

##### Delete user by id. Authentication required

```http
  DELETE /api/user/delete/${id}
```

| Params | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | **Required** |

##### Get all users

```http
  GET /api/user/all
```

#### Post

##### Create post snippet. Authentication required

```http
  POST /api/post
```

| Body          | Type     | Description  |
| :------------ | :------- | :----------- |
| `title`       | `string` | **Required** |
| `description` | `string` | **Optional** |
| `tags`        | `string` | **Optional** |
| `entry`       | `string` | **Optional** |

##### Get post snippet by id

```http
  GET /api/post/${id}
```

| Params | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | **Required** |

##### Get all post

```http
  GET /api/post
```

##### Update post. Authentication required

```http
  PATCH /api/post/${id}
```

| Params/Body   | Type     | Description  |
| :------------ | :------- | :----------- |
| `id`          | `string` | **Required** |
| `title`       | `string` | **Required** |
| `description` | `string` | **Optional** |
| `entry`       | `string` | **Optional** |

##### Delete post. Authentication required

```http
  DELETE /api/post/${id}
```

| Params | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | **Required** |

#### Post

##### Create comment. Authentication required

```http
  POST /api/comment/${postId}
```

| Params/Body  | Type     | Description  |
| :----------- | :------- | :----------- |
| `postId`     | `string` | **Required** |
| `commentary` | `string` | **Required** |

##### Get comment by post snippet id

```http
  GET /api/comment/post/${postId}
```

| Params   | Type     | Description  |
| :------- | :------- | :----------- |
| `postId` | `string` | **Required** |

##### Get comment by id

```http
  GET /api/comment/${id}
```

| Params | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | **Required** |

##### Update comment by id. Authentication required

```http
  PATCH /api/comment/update/${id}
```

| Params/Body  | Type     | Description  |
| :----------- | :------- | :----------- |
| `id`         | `string` | **Required** |
| `commentary` | `string` | **Optional** |

##### Delete comment by id. Authentication required

```http
  DELETE /api/comment/delete/${id}
```

| Params | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | **Required** |

##### Get comment by user id

```http
  GET /api/comment/user/${id}
```

| Params | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | **Required** |

<a name="docs"></a>

### 📜 Documentation

[Documentation](https://www.arnelimperial.com/docs)

<a name="tests"></a>

### 🧪 Running Tests

To run server's unit tests, run the following commands

```bash
cd server
# build backend code to production. Build folder at ./dist
yarn build:server
# run test
yarn test
```

To run End-to-end test, run the following commands

**video e2e test output @ ./client/cypress/videos/spec.cy.js.mp4**

```bash
# go to server directory and build server. Build folder at ./server/dist
cd server && yarn build:server
# run the server on test mode at port 8080
yarn start:testMode

# go to client directory and build client. Build folder at ./client/dist
cd client && yarn build
# run client's preview at port 5173
yarn preview
# choose where to run
# to run with GUI
yarn cypress:open
# to run the in the terminal
yarn test:e2e
```

<a name="feat"></a>

### ✨ Features

The projected points for each feature are solely dependent on the author's perspective.

\*Basic/mandatory requirements includes: Implementation of backend with Node.js, utilization of database(MongoDB), authentication(JWT),
post new code snippets, comment on existing posts, users who are not logged in can view posts and comments, there is a page that lists all of the posts; when opening a post, the comments are also listed, responsive design, and documentation.

#### Based on the [project work guidline submission list](https://docs.google.com/document/d/1zSfVZcnv7FUnu6VxwKLXBPZHqTIdRX1w3d9Yer_mKVU/edit)

| Feautures                                      | Points |
| :--------------------------------------------- | :----- |
| `*Basic/mandatory requirements`                | `25`   |
| `Users can edit their own comments/posts`      | `4`    |
| `Utilization of a frontside framework`         | `5`    |
| `Use some highlight library with markdown`     | `2`    |
| `Test software for accessibility`              | `2`    |
| `Search filter for post title and tags`        | `2`    |
| `User profile image for posts & comments`      | `3`    |
| `Clickable user account and profile with info` | `2`    |
| `Last edited timestamp is stored and shown`    | `2`    |
| `E2E test with cypress (> 10 tests)`           | `5`    |

#### Additional Features

| Feautures                                              | Points |
| :----------------------------------------------------- | :----- |
| `Deployment`                                           | `14`   |
| `Backend unit test with jest & supertest (> 10 tests)` | `5`    |
| `Authenticated user can update profile `               | `4`    |
| `Authenticated user can delete their account`          | `5`    |
| `Authenticated user can delete their comments`         | `5`    |
| `Authenticated user can add/update profile image`      | `5`    |
| `Adding security to production web app`                | `5`    |

- **Deployment:** I think that any new web app should be tested online and must be configured f production deployment with different environment setup

- **Backend unit test:** Additional unit test dedicated to backend can be a good practice

- **Update user profile:** This feature can give the `req.user` permission and control to the object created

- **User can delete their comment:** This feature can give the `req.user` permission and control to the object created

- **User can add or update profile image:** This feature can give the `req.user` permission and control to the object created

- **User can delete their account:** User has the right to delete their data from any system without traces

- **Adding security to production web app:** On the production app, user validation form input, sanitising user input, protecting the database from any type of malicious attack, and so on are all taken into account

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
