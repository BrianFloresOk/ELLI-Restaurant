FROM node:22-alpine

WORKDIR /app

COPY . .

WORKDIR /app/apps/frontend/pos-elli

RUN yarn install

EXPOSE 5173

CMD ["yarn", "dev", "--host"]
