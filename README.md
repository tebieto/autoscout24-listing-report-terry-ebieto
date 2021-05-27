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
* Linter: Eslint
* Database: Postgres
* ORM: Sequelize
* Container: Docker

## Run Locally
* see .env.sample.dev for required environment variables
* install npm, node and postgres locally
* if you do not want to make local installations, run in container instead
* cd server && yarn dev

## Run In Container(DOCKER)
* install docker locally
* docker-compose build
* docker-compose up -d listings-app
* default PORT is 5000, u can edit in docker-compose.yaml

## Information
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
* More tests
