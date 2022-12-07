#!/bin/bash

rm ./.env

echo -e "JWT_SECRET=secret" >> .env
echo -e "OMDB_APIKEY=77bf7437" >> .env
echo -e "MONGODB_USERNAME=root" >> .env
echo -e "MONGODB_PASSWORD=example" >> .env
echo -e "TEST_TOKEN_EXPIRES_IN_HOURS=8" >> .env

docker compose build auth-service && docker compose run --name auth -p 3001:3001 -d auth-service

sleep 5

TEST_TOKEN_BASIC_USER=$(curl --location --request POST '0.0.0.0:3001/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}')

TEST_TOKEN_PREMIUM_USER=$(curl --location --request POST '0.0.0.0:3001/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "premium-jim",
    "password": "GBLtTyq3E_UNjFnpo9m6"
}')

EXTRACTED_TEST_TOKEN_BASIC_USER=${TEST_TOKEN_BASIC_USER:10:-2}
ENV_VAR_TEST_TOKEN_BASIC_USER="TEST_TOKEN_BASIC_USER=${EXTRACTED_TEST_TOKEN_BASIC_USER}"

EXTRACTED_TEST_TOKEN_PREMIUM_USER=${TEST_TOKEN_PREMIUM_USER:10:-2}
ENV_VAR_TEST_TOKEN_PREMIUM_USER="TEST_TOKEN_PREMIUM_USER=${EXTRACTED_TEST_TOKEN_PREMIUM_USER}"

echo ${ENV_VAR_TEST_TOKEN_BASIC_USER} >> .env
echo ${ENV_VAR_TEST_TOKEN_PREMIUM_USER} >> .env

docker container stop auth && docker container rm -fv auth && docker compose build && docker compose down -v && docker compose up -d
