const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: config.DATABASE_URL,
    host: 'db',
    port: '5432',
    user: 'root',
    database: 'drizz',
    password: 'example',
    ssl: config["DB_SSL"] ? { rejectUnauthorized: false } : false,
    }
  });
  