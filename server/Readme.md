Start and stop mongo server with

## if installed with brew

brew services start mongodb
brew services stop mongodb

## otherwise

Go to <mongodb-install-directory>/bin directory
./mongod

## Start server with nondemon

npm run dev

## DBMongo commands

use test
db.users.find().pretty()
