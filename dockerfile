# docker file for a Typescript api server

# Use the official Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:14-alpine

# Create and change to the app directory.
WORKDIR /app
# Copy application dependency manifests to the container image.

# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

COPY tsconfig.json ./

# Install production dependencies.

# Install typescript globally

RUN npm install -g typescript

# This example includes multiple package manifests,
# representing different environments.
# To use one of them, uncomment the COPY line above,
# and the 'npm install' line below.
# RUN npm install --only=production

# Copy local code to the container image.
COPY . .

# Set environment variables
ENV AWS_ACCESS_KEY_ID=############
ENV AWS_SECRET_ACCESS_KEY=############
ENV AWS_REGION="eu-west-3"
ENV DYNAMODB_TABLE="Humedales_Nav"
ENV JWT_SECRET="------------------------"

# Share the logs folder as a volume
VOLUME [ "/app/logs" ]

# run the ts build
RUN npm install

RUN tsc

# Run the web service on container startup.
CMD [ "npm", "start" ]
