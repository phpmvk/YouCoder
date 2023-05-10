# YouCoder

## Backend Configuration

This project requires certain configuration variables to be set in a `.env` file. Please follow these steps to create a `.env` file:

`cd server`

1. Copy the `example.env` file to a new file called `.env`:

`cp .env.example .env`

2. Replace the placeholder values in `.env` with your own values.

- `RAPIDAPI_KEY`: Your [Judge0 API key](https://rapidapi.com/judge0-official/api/judge0-ce/pricing).
- `RAPIDAPI_HOST`: The host url for Judge0 on RapidAPI.
- `PORT`: The port number that the server should listen on.
- `DATABASE_URL`: Insert the URL to your Postgresql database.
- `FIREBASE_PROJECT_ID`: [Generate a private key file](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments) for your project on firebase, and insert the 'project_id' here.
- `FIREBASE_CLIENT_EMAIL`: Insert your Firebase project 'client_email' here.
- `FIREBASE_PRIVATE_KEY`: Insert your Firebase project 'private_key' here.

3. Save the `.env` file and make sure it's in the server directory of the project.

Note: **Do not commit the `.env` file to version control!** It will likely contain sensitive information.

## Backend Scripts

`npm run build`

- cleans the /build folder if it exists, then builds the app there.

`npm run start:dev`

- an alternative is to run an optimized version of nodemon for typescript (this is the only command needed):

``tsnd --respawn index.ts`

- Starts the application in development using nodemon and ts-node

`npm run start`

- Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at build/index.js.
