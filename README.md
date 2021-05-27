# Listing Report by Terry Ebieto

## Introduction
This web app extracts data from Two CSV files namely:

* listings.csv with required fields(type) id(numeric), make(alphanumeric), price(numeric), mileage(numeric), seller_type(alphanumeric)

* contacts.csv with required fields(type) listing_id(numeric), contact_date(UTC Timestamps)

And generates four reports including

* Average Listing Selling Price
* Distribution (in percent) of available cars by make
* Average price of the 30% most contacted listings
* The Top 5 most contacted listings per month

## Technology
* Language: TypeScript
* Backend: Express
* Frontend: React
* Test: Jest
* Enpoint Test: supertest
* Linter: Eslint
* Database: Postgres
* ORM: Sequelize
* Container: Docker

## Run Locally
* see .env.sample.dev for required environment variables
* install npm, node and postgres locally
* cd /server && yarn dev
* if you do not want to make local installations, run in container instead

## Run In Container(DOCKER)
* install docker locally or any remote provider
* RUN docker-compose build
* RUN docker-compose up -d test-app
* default PORT is 5000, u can edit in docker-compose.yaml

## Run Tests
* cd server
* RUN yarn test

## Information
* Test will only pass when there is database access
* Find example CSV files listings.csv, contacts.csv in /server
* app entry file is at /server/src/index.ts

## Possible Improvements and Upgrades
* User authentication functionality
* Better UI design components(e.g from Material UI or ANT design) for better UI/UX 
* Improved accessibility for screen readers
* More user friendly Success and Error alerts
* Make my react components more granular(atomic)
* report delete and update functionality
* Swagger documentation REST API endpoints
* Need to fix some bugs with sequelize models not syncing during tests
* And has caused some tests to fail
* Add more unit tests
