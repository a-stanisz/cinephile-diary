# 🎬 Cinephile Diary

 **A movie service that creates, stores, and fetches movie records of the authenticated user.**

## 🌳 Project structure 

### Movie API

The movie service code is located under `./movie-service` directory.

### Authorization API

The authorization service code is located under `./auth-service` directory.

### Front-end App (TBD)

A React front-end.

### Database

The project uses mongodb as a database service.

## 🚗 How to run it?

First, clone this repository.

### 📝 Prerequisites 

You need to have `docker` and `docker-compose` installed on your host-machine.

It might be handy to have `node` with `npm` and `nvm` installed locally too.

You need to provide environmental variables: 

```
MOVIE_SERVICE_NAME=movie-service
MOVIE_SERVICE_PORT=3002
AUTH_SERVICE_NAME=auth-service
AUTH_SERVICE_PORT=3000
JWT_SECRET=<secret>
MONGODB_SERVICE_NAME=mongodb
DB_PORT=27017
MONGODB_USERNAME=<db-username>
MONGODB_PASSWORD=<password>
EXAMPLE_DB_NAME=example-database
OMDB_APIKEY=<your-omdb-apikey>
```
Most of the environmental variables have their defaults set as above, except those in angle brackets, so you need to specify at least:  
`JWT_SECRET`, `MONGODB_USERNAME`, `MONGODB_PASSWORD` and `OMDB_APIKEY`.  

Please note that **you need to provide \<your-omdb-apikey\>** from OMDB website. You can get it [here](http://www.omdbapi.com/apikey.aspx). 

You can also replace all other above example-values with your custom ones. This can be convenient, especially when it comes to the values of exposed ports.

You can store env vars in the `.env` file at the root directory of the project or provide them inline with `docker-compose up`.

## Run it 🤞

Finally, you can run it with `docker-compose up`:

```
JWT_SECRET=<secret> MONGODB_USERNAME=<db-username> MONGODB_PASSWORD=<password> OMDB_APIKEY=<your-omdb-apikey> docker-compose up -d
```

To stop the services stack run:

```
docker-compose down -v
```
Note that the project's containers use `anonymous volumes` that are newly created each time of startup. To avoid them taking up too much space on your hostdisk use the `-v` (`--volume`) flag to remove volumes created for the services.

## 🔍 How to try it out

### 👉🏽 Authorization service (`auth-service`) 

To authorize users while sending requests to the `movie-service`, you need to provide the `<token>`. This is what the `auth-service` is for. Auth service is based on JWT tokens. By default it runs at the `PORT 3000`.

To get the user's `<token>`, call the auth service at the `/auth` endpoint with the `POST` request and the request payload of `username` and `password`.

There are two example users defined by the `auth-service` that we use here, each of different roles (service access type):

1. `Basic` user

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

1. `Premium` user

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```
The example request to get the `<token>` for `basic-thomas`, using `curl`:
```
curl --location --request POST '0.0.0.0:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}'
```
The example request to get the `<token>` for `premium-jim`, using `curl`:
```
curl --location --request POST '0.0.0.0:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "premium-jim",
    "password": "GBLtTyq3E_UNjFnpo9m6"
}'
```
### 👉🏽 Movie service (`movie-service`)

By default the movie service runs at `PORT 3002`.

It provides two endpoints:  

1. `POST /movies`

   Allows creating a movie object based on movie title passed in the request body. Based on the title additional movie details are fetched from OMDB API (Title, Released, Genre, Director).

   Only authorized users can create a movie so you need to pass the `<token>` you've got from the Authorization service in the request's Authorization header (`Authorization: Bearer <token>`).
   
   Basic users are restricted to create 5 movies per (calendar) month. Premiium users have no limits.

  **Example request using `curl`:**

```
curl --location --request POST '0.0.0.0:3002/movies' --header 'Authorization: Bearer <token>' --header 'Content-Type: application/json' --data-raw '{"title": "The Last Duel"}'
```
    
2.  `GET /movies`

    Fetches a list of all movies created by an authorized user.

    Only authorized users can get their's movie list so you need to pass the `<token>` in the request's Authorization header (`Authorization: Bearer <token>`).

  **Example request using `curl`:**

```
curl --location --request GET '0.0.0.0:3002/movies' --header 'Authorization: Bearer <token>'
```
### 👉🏽 Database service (`mongodb`)

By default the database service runs at `PORT 27017`.

Maybe you'll want to preview the database service using some interactive tool. To log in, select `Username/Password` as the authentication method and use the credentials you defined as environment variables:
```
MONGODB_USERNAME=<db-username>
MONGODB_PASSWORD=<password> 
```
These are the ROOT credentials used at the Database service initialization (`MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD`), following by the value of `MONGO_INITDB_DATABASE` variable that specifies the name of the database used by `movie-service` within the application and that we defined as `EXAMPLE_DB_NAME` environmental variable earlier.

## 🏅 Credits

- This project initially was a task assigned by [Netguru](https://www.netguru.com/) and included the auth service. Here is [the original task repository](https://github.com/netguru/nodejs-recruitment-task). 

- Movie data is fetched from [OMDb API](https://omdbapi.com/).

## 🎯 Checklist

- Setup with a database connection (MongoDB) ✅
- Dockerize ✅
- Define domain model ✅
- Define routes and controllers ✅
- Define middleware for verifying user authentication ✅
- Handle user type restrictions ✅
- Remember of proper error handling 🏴󠁳󠁯󠁳󠁯󠁿
- Write (some) unit tests 🏴󠁳󠁯󠁳󠁯󠁿
- Configure CI/CD pipeline with GitHub Actions ✅
- Create a sample Pull Request ✅

## 🚧 Important notes

- Keep in mind that it was a training and recruitment task project.
- Since there are no editor-specific files commited, here is a sample content of VS Code `launch.json` used for debugging:
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Docker: Attach 9229 --inspect",
      "type": "node",
      "request": "attach",
      "remoteRoot": "/app",
      "port": 9229,
      "address": "localhost",
      "localRoot": "${workspaceFolder}/movie-service",
      "protocol": "inspector",
      "restart": true,
    }
  ]
}
```

## 🚀 Possible/needed further improvements

- Validation of user request payload
- More usage behavior coverage, e.g. right now you can add the same movie multiple times
- User's movies list for the POST request should be filtered before sending
- Definetely, more tests
- It would be nice to have type checking, preferably using TypeScript. Also, required movie properties could be retrieved using Movie Schema
- Avoid repetitive code, e.g. unify responses with some dedicated function, remove redundant if-checks 
- Define more functions that handle common behavior, avoid imperative code
- Better error handling, e.g. with unified methods spread across the application
- Use http request logger
- Improve Docker configs, e.g. optimize for production so the Dockerfile could be one and the same for all stages
- Services preferably should be called from controller, not middleware
- Consider separation of domain model layer, data access layer, and database abstraction layer

### 🎉 Thanks!
