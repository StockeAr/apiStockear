module.exports={
   "type": "mysql",
   "host": "db4free.net",
   "port": 3306,
   "username": "stockear",
   "password": "stockear",
   "database": "apistockear",
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