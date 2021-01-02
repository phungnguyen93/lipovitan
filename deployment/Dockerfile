# Base on offical Node.js Alpine image
FROM node:alpine

ARG NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}

ARG NEXT_PUBLIC_API_BASE_PATH
ENV NEXT_PUBLIC_API_BASE_PATH=${NEXT_PUBLIC_API_BASE_PATH}

ARG NEXT_PUBLIC_ENV
ENV NEXT_PUBLIC_ENV=${NEXT_PUBLIC_ENV}

ARG SESSION_SECRET
ENV SESSION_SECRET=$SESSION_SECRET

ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

RUN apk add g++ make python

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
# RUN npm install --global pm2

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN yarn install --production

# Delete all files in /pages
# RUN rm -rf ./pages/
# RUN rm -rf ./.next/

# Copy all files
COPY ./ ./

# Build app
RUN yarn build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts
# CMD [ "npm", "start" ]
CMD [ "yarn", "start" ]