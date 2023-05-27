# FROM node:lts-alpine
FROM mysql:latest

COPY init/01.sql /docker-entrypoint-initdb.d/

# WORKDIR /usr/src/app

# COPY package*.json pnpm-lock.yaml ./

# RUN npm i -g pnpm
# RUN pnpm install

# COPY . .

# RUN npm run start-production

# EXPOSE 8090

# CMD [ "npm run start-production" ]
