# Base on offical Node.js Alpine image
FROM node:alpine

RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    libtool \
    gcc \
    make \
    nasm

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
RUN npm install --global pm2

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install --production

# # Delete all files in /pages
# RUN rm -rf ./pages/
# RUN rm -rf ./.next/

# Copy all files
COPY ./ ./

# Build app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run npm start script when container starts
CMD ["sh", "/usr/app/deployment/run_dev.sh"]
