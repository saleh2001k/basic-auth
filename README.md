# Basic-auth
This is a sample application that demonstrates basic authentication functionality using Node.js, Express, Sequelize, and SQLite. The application allows users to sign up and sign in using their credentials.


##### [Deployed link](https://basic-auth-wbf7.onrender.com/)
##### [PR ](https://github.com/saleh2001k/basic-auth/pull/2)

## Prerequisites

- Node.js (v14 or above)
- SQLite

## Structure
```bash
├── README.md
├── __tests__
│   └── server.test.js
├── config
├── index.js
├── memory
├── package-lock.json
├── package.json
└── src
    ├── auth
    │   ├── middleware
    │   │   ├── basic.js
    │   │   └── basic.test.js
    │   ├── models
    │   │   ├── index.js
    │   │   └── users-model.js
    │   └── router.js
    ├── middleware
    │   ├── 404.js
    │   ├── 404.test.js
    │   └── 500.js
    └── server.js

```

## UML Diagram:

![UML](UML.png)


## API Endpoints

The application exposes the following API endpoints:

- `POST /signup`: Sign up a new user. Requires a JSON payload with `username` and `password` properties.

- `POST /signin`: Sign in an existing user. Requires Basic Authentication using the `Authorization` header with the format `Basic <base64-encoded-credentials>`. The credentials should be in the format `username:password`.

## Configuration

The application can be configured using environment variables. Create a `.env` file in the project root directory and define the following variables:

- `PORT`: The port number on which the application should run. Default is `3000`.
- `DATABASE_URL`: The URL or path to the SQLite database. Default is `sqlite:database.sqlite`.

