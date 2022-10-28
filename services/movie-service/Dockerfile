FROM node:14.15-alpine

RUN npm install -g nodemon
RUN npm install -g jest

WORKDIR /app

COPY ./package*.json ./
RUN npm install && npm cache clean --force

RUN mkdir ./src
COPY ./src ./src

ENTRYPOINT [ "nodemon", "--inspect=0.0.0.0", "./src/server.js" ]
