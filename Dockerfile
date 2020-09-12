FROM node:lts-alpine3.12

WORKDIR /usr/app

COPY . .

RUN yarn install

EXPOSE 3333

CMD ["yarn", "dev"]
