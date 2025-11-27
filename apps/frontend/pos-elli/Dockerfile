FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY apps/frontend/pos-elli/package.json apps/frontend/pos-elli/package.json

RUN yarn install

COPY . .

WORKDIR /app/apps/frontend/pos-elli

EXPOSE 5173
CMD ["yarn", "dev", "--host"]
