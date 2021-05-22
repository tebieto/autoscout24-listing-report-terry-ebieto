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

* install npm, node and postgres locally
* yarn start

## Run In Container

* install docker locally

* docker-compose up

## Live Link

Coming soon

## Information

Find example CSV files listings.csv, contacts.csv in project root

