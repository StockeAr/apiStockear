module.exports={
   "type": "mysql",
   "host": "us-cdbr-east-02.cleardb.com",
   "port": 3306,
   "username": "b90fb9004d5ed7",
   "password": "4b9b8f60",
   "database": "heroku_06422ce5f90633c",
   "synchronize": true,
   "logging": false,
   "entities": [
      "dist/entity/**/*.js"
   ],
   "migrations": [
      "dist/migration/**/*.ts"
   ],
   "subscribers": [
      "dist/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}