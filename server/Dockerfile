# Use a Node.js base image with a specific version
FROM node:19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Prisma schema and configuration files
COPY prisma ./prisma

# Copy the rest of the application code to the working directory
COPY src ./src

# COPY TypeScript configuration file
COPY tsconfig.json ./

# Generate the Prisma client
RUN npx prisma generate

#Build the TypeScript Code
RUN npm run build

# Expose a port if your application listens on a specific port
EXPOSE 3000 3001

# Specify the command to run your Node.js application
CMD [ "node", "build/index.js" ]
