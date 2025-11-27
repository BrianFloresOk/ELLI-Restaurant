FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY apps/backend/package.json apps/backend/package.json

COPY domain/package.json domain/package.json

RUN yarn install

COPY . .

WORKDIR /app/apps/backend

EXPOSE 3500
CMD ["yarn", "dev"]
