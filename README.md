## Summary

Project follows a REST service API First approach and is structured following DDD with the following modules:

* **Domain**: contains entities, value objects and interfaces that make up the project.
* **Application**: in which use cases reside.
* **Repository**: where is the persistence implementation.
* **Api**: controllers that act as REST adapters reside.

I have structured it as DDD because I think that helps to respect SOLID principles.

I have made each endpoint independent using the **action classes** pattern taken from the [Symfony](https://api-platform.com/docs/core/controllers/) way of working which makes the classes less coupled.

Folders and file structure for classes, unit and integration tests is taken from typical Java projects, trying not to get them mixed up, but I have tried to follow the Nestjs naming conventions.

Although I have not done some unit tests of classes, I have tried to do the most necessary and I have created all the ones of the domain.

I have created the repository module as global to avoid dependency on application and domain layers, but I don't know if it is the correct way. I have no experience in NestJS, I'm sure there are many things to improve.

## Assumptions

Since it is requested that pending tasks can be returned, the API has an endpoint to return by status and order by the field that is necessary.

## Links of interest

* Swagger: http://localhost:3000/api#/
* PgAdmin: http://localhost:5050/ (Username: 'nest@nest.org', Password 'nest')

## Build

```bash
# build and run app
$ docker-compose up -d
```

## Run

```bash
# development
$ docker-compose run nest npm run start

# watch mode
$ docker-compose run nest npm run start:dev

# production mode
$ docker-compose run nest npm run start:prod
```

## Test

```bash
# unit tests
$ docker-compose run nest npm run test

# e2e tests
$ docker-compose run nest npm run test:e2e

# test coverage
$ docker-compose run nest npm run test:cov
```
