# Surge-Global-Assignment

## Introduction
This project is assignment purposed fullstack JavaScript applications running on node.js. The technology stack is as follows:
- **React** for the front-end, bootstrapped with "Create React App".
- **express.js** for the server
  - Serves the React app 
  - Provides the JSON API for the React app using http

**MongoDB** is the database using Mongoose with this project.

## Roles
There are two roles in this project called user and admin. Usually user is a student.
After run the app you should select your role.
Admin can create users, view user details and serach user by name, email or id.
Students can update their profiles, add notes, update notes and delete notes.
This app is user token base authentication.

## Commands
The package.json provides all the commands needed to test and run this application.
- **npm install** install all dependencies for the server and the client.
- **npm run build** builds the static files for the React app.
- **npm start** starts the server and client sides.
- **npm run react-dev** starts the React app in development mode on http://localhost:3000. Only works if the server is started separately.
