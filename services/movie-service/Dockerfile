FROM node:14.21-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY ./package*.json ./
RUN npm install && npm cache clean --force

RUN mkdir ./src
COPY ./src ./src

CMD ["node", "server.js"]
