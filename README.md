# xzymous

Xzymous is a web app project submitted in partial fulfillment of LUT's CT30A3204 course. The application's architecture which consists of server-side deployed as serverless function and client-side code is separately published on the internet and maintained in a single git repository. The client side, which acts as a single-page application, can send HTTP requests to the server, providing the resources such as users, posts, and comments. Anonymous users can only access some of the resources through `GET` requests through rendered data on the website; otherwise, users must authenticate to the system to execute further interactive operations. 


[![GitHub](https://img.shields.io/github/license/aiotrope/xzymous)](https://opensource.org/license/0bsd/)


[![Logo](https://drive.google.com/uc?export=view&id=1HpzHwBj5EriL1ZVpkMrqAMrFXyEEuOhR)](https://www.arnelimperial.com)


## Tech Stack
The following is a non-exhaustive list of technologies used to carry out this project.

**Client:** React, Axios, TanStack Query, Recoil, Bootstrap, Sass

**Server:** Node, Express, Jsonwebtoken, Mongoose

**Database:** Mongodb

**Frontend development tool:** Vite

**Unit and e2e testing tools:** Jest, Supertest, Cypress

**Deployment:** Vercel


## Installation

Install this project with yarn.

```bash
  git clone git@github.com:aiotrope/xzymous.git
  cd xzymous
  # install server dependencies 
  cd server && yarn
  # install client dependencies 
  cd client && yarn
```
    