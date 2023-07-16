# Express Server README
# Himanshu Raj 
# Email : himanshurj85@gmail.com
# Project Assignment For MAPUP.AI

This is the README file for an Express server application. The server is built using Node.js and utilizes the Express framework to handle HTTP requests. It includes various middleware, routes, and custom contexts.

## Table of Contents
- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
- [Middleware](#middleware)
- [Routes](#routes)
- [Starting the Server](#starting-the-server)

## Dependencies
The following dependencies are used in this project:
- Express: Fast, unopinionated web framework for Node.js
- body-parser: Node.js body parsing middleware
- dotenv: Loads environment variables from a .env file
- morgan: HTTP request logger middleware
- jsonwebtoken: JSON Web Token implementation for token verification

Make sure to install these dependencies before running the server.

## Getting Started
1. Clone the repository to your local machine.
2. Put Secrect Key In .env file In JWT_SECRET Variable.
3. Install the required dependencies using a package manager like npm or yarn. 
4. Use command (`npm install -dev`)
5. Set up the environment variables by creating a .env file and providing the necessary values.
6. Run the server using the appropriate command (`npx ts-node dist/index.js`).

## Middleware
The server uses the following middleware:
- `body-parser`: Parses JSON and URL-encoded request bodies with a payload size limit of 50mb.
- `morgan`: Logs HTTP requests in the "combined" format.

## Routes
The server defines the following routes:
- `/`: Returns a "Server is Up!" response for the root URL.
- `/api/v1`: Mounts the GeoJSONRouter middleware, which handles specific routes related to GeoJSON data.
- `/auth`: Mounts the UserRouter middleware, which handles user authentication routes.

## Starting the Server
To start the server, run the appropriate command (e.g., `npx ts-node dist/index.js`) in the project's root directory. The server will listen on the port specified in the environment variables.


