module.exports = {
   "type": "mysql",
   "host": "us-cdbr-east-03.cleardb.com",
   "port": 3306,
   "username": "b1d8af5c0d93d3",
   "password": "8cacb1e8",
   "database": "heroku_0b77672724210d9",
   "synchronize": true,
   "logging": false,
   "entities": [
      "dist/entity/**/*.js"
   ],
   "migrations": [
      "dist/migration/**/*.js"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}