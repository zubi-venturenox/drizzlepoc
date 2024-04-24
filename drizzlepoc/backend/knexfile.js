module.exports = {
	development: {
		client: 'pg',
		connection: {
		//   connectionString: config.DATABASE_URL,
		  host: 'db',
		  port: '5432',
		  user: 'postgres',
		  database: 'drizz',
		  password: 'example',
		//   ssl: config["DB_SSL"] ? { rejectUnauthorized: false } : false,
		  },
		migrations: {
			directory: './migrations',
		},
	},
};
