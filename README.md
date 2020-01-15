# REST API - MongoDB - Passport - JWT

Boilerplate for REST API using MongoDB, passport authentication and JWT.

## Requirements

- Recent version of _node_. It is recommend to install _node_ using [nvm](https://github.com/creationix/nvm).

## Getting started

1.  Clone the repository (git clone git@github.com:gilsantosjulian/nodejsrestapi.git).
2.  Run `npm install` to install dependencies.
3.  Run `npm run dev:build` to build the project.
4.  In a different shell, r `npm run dev` to run development server.
5.  Call to [localhost:3000](http://localhost:3000) to view the runing the API.
6.  Define an enviroment variable NODE_ENV=development on your .bash_profile (OSx or linux).

## Install MongoDB on macOS

### Install Homebrew

OSX does not include the Homebrew brew package by default. Install brew using the [official instructions](https://brew.sh/#install)

### Tap the MongoDB Homebrew Tap

Issue the following from the terminal to tap the official [MongoDB Homebrew Tap](https://github.com/mongodb/homebrew-brew):

```
brew tap mongodb/brew
```

### Install MongoDB

From a terminal, issue the following:

```
brew install mongodb-community@4.2
```

## Run MongoDB

You can run MongoDB as a macOS service using brew, or you can run MongoDB manually as a background process. It is recommended to run MongoDB as a macOS service, as doing so sets the correct system ulimit values automatically (see [ulimit settings](https://docs.mongodb.com/manual/reference/ulimit/#ulimit-settings) for more information).

To run MongoDB (i.e. the mongod process) as a macOS service, issue the following:

```
brew services start mongodb-community@4.2
```
