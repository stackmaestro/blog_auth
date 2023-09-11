
## Description

 It is a full stack application which covers following:
- Authentication
- Authorization
- Post CRUD Operations
- Comment CRUD Operations

## Installation

After cloning the repo, we need to run both client and server accordingly. Following steps
need to be performed:

# Server
- First run npm install to download all server dependencies
- nodemon is also required for running the sever in development you can run npm install -g nodemon
- pretiier and es-lint extensions are required in vs-code for proper error checking
- Add an env file in the project havinf following variables:
  - NODE_ENV
  - PORT
  - MONGO_STRING
  - JWT_KEY
  - SESSION
  - REACT_APP_BASE_URL
# Client
- Change directory to client
- Run npm install to download all dependencies
- Run the client in development using npm start

# Steps to run
- `npm install`
- `cd client && npm install`
- `cd ..`
- `npm run start`
After these steps go to `localhost:PORT` and check the results

# MongoDB
- Create a mongodb database and pass the connection string in the MONGO_STRING env variable
- use systemctl start mongod in the terminal in order to run mongodb

# Project Features
- Node.js server side authentication and authorization
- Mongoose Type-ODM used for models in Node.js
- Passport Authentication
- Service Oriented Architecture in Node.js
- Express used as web server
- Airbnb Linting used for development code erros, syntax
- Frontend implemented in React v18 and routing also in React Router v6
