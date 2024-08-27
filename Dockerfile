FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache bash
WORKDIR /app
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
 
# Installs all node packages
RUN npm install
 
# Copies everything over to Docker environment
COPY . .

# RUN npm run db:generate
# RUN npm run db:migrate


# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

# Uses port which is used by the actual application
EXPOSE 3000
 
# Finally runs the application
CMD [ "npm", "start" ]
