FROM node:lts-alpine

COPY init/01.sql /docker-entrypoint-initdb.d/

WORKDIR /usr/src/app

COPY package*.json pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm install

COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
RUN chmod +x /wait

EXPOSE 8090

CMD [ "npm run start-development" ]
