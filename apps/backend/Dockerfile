FROM node:22-alpine

WORKDIR /app

COPY . .

WORKDIR /app/apps/backend

RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]
