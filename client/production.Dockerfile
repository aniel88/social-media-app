FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm install

COPY . .

RUN npm run build

FROM node:lts-alpine

WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/build ./dist
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
