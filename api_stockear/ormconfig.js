module.exports = {
   "type": "mysql",
   "host": "mysql://@us-cdbr-east-02.cleardb.com",
   "port": 3306,
   "username": "b55f79f71151d2",
   "password": "0d901c23",
   "database": "heroku_b8b9f13ef66c1bf	",
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