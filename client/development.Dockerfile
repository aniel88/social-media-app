FROM node:lts-alpine

WORKDIR /app/client

COPY package*.json pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm install

COPY . .

