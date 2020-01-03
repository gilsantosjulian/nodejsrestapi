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
