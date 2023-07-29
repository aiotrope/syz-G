## About this project

**Xzymous** is a web app project submitted in partial fulfillment of Lappeenranta–Lahti University of Technology's **CT30A3204** course. The application's architecture which consists of server-side deployed as serverless function and client-side code is separately published on the internet and maintained in a single git repository. The client side, which acts as a single-page application, can send HTTP requests to the server, providing the resources such as users, posts, and comments. Anonymous users can only access some of the resources through `GET` requests through rendered data on the website; otherwise, users must authenticate to the system to execute further interactive operations.

---

## App general overview and workflow description

Non-exhaustive description on how to use the app. Although some terminology is technical, this guide is intended for adopters, collaborators, and reviewers with basic knowledge with MERN app architecture. However, the author assumes that any user, regardless of technical knowledge, may navigate or use the web app as long as they knows how to fill out a form and create an account. Same familiarity when visiting any web applications in the internet. The Author intends to update this documentation to make it easier for laypeople to grasp.

Legends:

**Frontend (client) base URL on debug**: https://localhost:5173

**Frontend (client) base URL on production**: https://www.arnelimperial.com

**Backend (server) base URL on debug**: https://localhost:8080

**Backend (server) base URL on production**: https://xzymous-api.vercel.app

**object**: refers to the backend model object

**request**: CRUD operation

**endpoint**: resource access locations for APIs.

**page**: denotes routes primarily in the frontend (client)

**redirect**: refers to reroutes in the frontend, but also in the backend.

**req.user**: Current authenticated user

**req.params**: property is an object that has properties mapped to the named route "parameters"

**req.body**: property includes data given in the request body as key-value pairs

**anonymous users**: Non-authenticated user

### Object: User

The `req.user` has permission to perform all CRUD operations and has control over the object created by the request. user or a currently authenticated user. The admin user has complete access to all database objects. All requests are supported by **JWT-based authentication**. User has an array of reference to `Post` and `Comment` object model as `posts` and `comments` respectively. The `createdAt/updatedAt` timestamp, an empty array of `posts` and `comments` for reference, a default value for the `bio` field of `Hello, World!`, and an `avatar` field with an image from `https://ui-avatars.com/api?name=xz&bold=true&size=70&color=a0a0a0` as well as `id` are all generated once a user signs up for the system.

#### Registration and authentication flow

The first step in using this website is to register an account by providing the requested details on the **http://localhost:5173/signup** page, including a `username`, `email address`, `password` and `confirmation password`. Upon successful registration, the user will be re-directed to **http://localhost:5173/login** page asking them for login credentials such as `email address` and `password`.

##### Signup

```bash
request: POST
endpoint: http://localhost:8080/auth/user/signup
page: http://localhost:5173/signup
redirect: http://localhost:5173/login
```

##### Login

```bash
request: POST
endpoint: http://localhost:8080/auth/user/signin
page: http://localhost:5173/login
redirect: http://localhost:5173/dashboard
```

### Authenticated user account

Authenticated users can **update** their username, email, bio info and avatar. Can also `delete` their account.
Only the `req.user` that has reference to or created the object can update and delete their `Post` and `Comment`.

#### Username, email, bio update

`id` as user's id

```bash
request: PATCH
endpoint: http://localhost:8080/api/user/update/${id}
page: http://localhost:5173/me
```

#### Profile photo update

`id` as user's id

```bash
request: PATCH
endpoint: http://localhost:8080/api/user/update/avatar/${id}
page: http://localhost:5173/me
```

#### Account deletion

All of the references that has association to the user will be deleted: **Post and Comment**

`id` as user's id

```bash
request: DELETE
endpoint: http://localhost:8080/api/user/delete/${id}
page: http://localhost:5173/me
redirect: http://localhost:5173/login
```

---

### Object: Post

`Post` object has `User` object reference and array of reference to `Comment` as `user` and `comments` respectively. `Post` objects list and retrieve actions can be access by **anonymous users** as well as viewing each user's posts snippets objects created. Creating, updating and deleting `post` objects can only be done when user is authenticated and if the `req.user` has reference to the objects. The `http://localhost:5173/me` page can manage the update and deletion of `req.user` object references including the deletion of their account. When an authenticated user created a post snippet at `http://localhost:5173/create-snippet`, the reference `user`` object was automatically filled in with an empty array of `comments`as another reference as well as`createdAt`and`updatedAt` timestamp.

Take note when filling the form on `entry` filled, anything that contains `?` or `.`, particularly in the beginning, will be sanitised and cleared out.

#### Post snippets list

Anonymous users can view the list and number of posts and can perform retrieve actions.

```bash
request: GET
endpoint: http://localhost:8080/api/user
page: http://localhost:5173
```

#### Viewing single post snippet

Anonymous users can view a single post by clicking the link on each `title` of the post snippet in http://localhost:5173. Comments for each post are also listed.

`id` as post's id

```bash
request: GET
endpoint: http://localhost:8080/api/post/${id}
page: http://localhost:5173/snippet/${id}
```

#### Create post

Authenticated users must provide the post's title, description, tags and entry. The `entry` field which is textarea field is recommended to be filled in `markdown` form but plain text can be suitable as well.

```bash
request: POST
endpoint: http://localhost:8080/api/post
page: http://localhost:5173/create-snippet
```

#### Update post

Partial update(PATCH) is supported in this endpoint. Only the **req.user who has the association with post through reference** can update the post object. Post title, description and entry can be edited.

`id` as post's id

```bash
request: PATCH
endpoint: http://localhost:8080/api/post/${id}
page: http://localhost:5173/me
```

#### Delete a post

Similarly to a partial update request, the user who owns/created the object post snippet has the ability to delete the selected object.

```bash
request: DELETE
endpoint: http://localhost:8080/api/post/${id}
page: http://localhost:5173/me
```

---

### Object: Comment

Comment object has a reference relationship to **Post** and **User** object. All Comment object actions and methods are directly controlled by the `req.user` who has relationship with the object such updating and deleting the `req.user` comments. The reference object `commenter` denotes the user who created the comment and `commentOn` that reference to the post snippet object being commented are all generated once the comment is created along with `createdAt` and `updatedAt` timestamp.

#### Create a comment

Authenticated user can comment on any post snippets including their own posts. The `commentary` is the only `req.body` or filled that are required to be filled in and it is recommended to enter a `comment` in `markdown` format but plain text will suffice. Created comments by the `req.user` will be listed, can be updated and deleted in `http://localhost:5173/me`. Comments per post snippet can be viewed by authenticated and anonymous users at `http://localhost:5173/snippet/${id}`, where `id` is the id of the post snippet. `Add a comment` button is only available when user is authenticated and can be accessed in `http://localhost:5173` and `http://localhost:5173/snippet/${id}`.

`postId` as `req.params` that stands for auto-generated id of the post

```bash
request: POST
endpoint: http://localhost:8080/api/comment/${postId}
page: http://localhost:5173/create-comment/${postId}
```

#### Update a comment

Only request.user who owns the comment object can update a certain comment.

`id` as id of the comment

```bash
request: PATCH
endpoint: http://localhost:8080/api/comment/api/comment/update/${id}
page: http://localhost:5173/me
```

#### Delete a comment

Only request.user who owns the comment object can delete a certain comment. The `comments` reference from both `User` and `Post` object will also deleted once the comment associated is removed.

`id` as id of the comment

```bash
request: DELETE
endpoint: http://localhost:8080/api/comment/api/comment/delete/${id}
page: http://localhost:5173/me
```

---

### Search

Anonymous and login users can search the post snippet by the post `title`, `tag`, `description` or `entry` . The main functionality was implemented on the backend mongoose `Find` filter and use debouncing on the frontend.

```bash
request: GET
endpoint: http://localhost:8080/api/post
page: http://localhost:5173

```

---

### Customization

Go to the client directory > src > sass and select the directory you want to update, such as the entire app or the index, or add variables, if you want to modify the theme of the website and add your own stylesheets.

By changing the images in client directory > public, it is also possible to change the site's favicon and images. To edit any of the elements in the site documentation, go to client > assets > doc.md.

Port number for server can be change by adding environment variable in .env file as `PORT`. For client go to client folder > vite.config.js and specify the preferred port number by adding server object:

```bash
export default defineConfig({
  // ...some configs
  server: {
    port: 3000,
  },
});

```

Customization of server and client codes as a whole can be achieved mainly by changing the codes in the `src` directory of the two major folder.

### Other CLI commnds

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
