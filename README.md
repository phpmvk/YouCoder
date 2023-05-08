# YouCoder

## Backend Scripts

``npm run start:dev``

Starts the application in development using nodemon and ts-node to do cold realoading

``npm run build``

builds the app at /build, cleaning the folder first

``npm run start``

Starts the app in production by first building the project with ``npm run build``, and then executing the compiled JavaScript at build/index.js.

## Backend Configuration

This project requires certain configuration variables to be set in a `.env` file. Please follow these steps to create a `.env` file:

``cd server``

1. Copy the `example.env` file to a new file called `.env`: 

``cp example.env env``

2. Replace the placeholder values in `.env` with your own values.

- `RAPIDAPI_KEY`: Your [Judge0 API key](https://rapidapi.com/judge0-official/api/judge0-ce/pricing).
- `RAPIDAPI_HOST`: The host url for Judge0 on RapidAPI.
- `PORT`: The port number that the server should listen on.

3. Save the `.env` file and make sure it's in the [root || server] directory of the project.

Note: Do not commit the `.env` file to version control! It will likely contain sensitive information.
