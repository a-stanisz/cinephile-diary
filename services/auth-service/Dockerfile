FROM node:14.15-alpine

WORKDIR /app

COPY ./package*.json ./
RUN npm install && npm cache clean --force

RUN mkdir ./src
COPY ./src ./src

CMD ["node", "server.js"]