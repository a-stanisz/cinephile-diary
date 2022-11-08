FROM node:14.15-alpine

RUN npm install -g nodemon
RUN npm install -g jest

WORKDIR /app

COPY ./package*.json ./
RUN npm install && npm cache clean --force

RUN mkdir ./src
COPY ./src ./src

CMD ["node", "server.js"]
