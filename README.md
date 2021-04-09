# CRUD with NodeJs + Express

Simple CRUD app designed with MVC pattern.

## App

In this app you can add, edit, and delete book. It does not check for duplicates.

This app provides a single sign-on using OAuth from google. It will authorize acces to the "Add Book" module.

## Tools

- Nodejs: Express
- Templating: Embedded JS templating
- Styling: Bootstrap
- DataBase: MySQL
- ORM: Sequelize
- Authentication: OAuth with Passport(authentication middleware for Node)

## Run the app

- Settings:

`cp .env.sample .env`

- Installation and data base migration:

`npm run migrate`

\*\* make sure to set your credentials properly

- Run the app:

`npm start`
