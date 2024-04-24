const { boolean, varchar, pgTable, serial, pgSchema } = require('drizzle-orm/pg-core');
const { Model } = require('objection');
const path = require('path');
const { monitorEventLoopDelay } = require('perf_hooks');

// const mySchema = pgSchema("my_schema")
const User = pgTable('User', {
	id: serial('id').primaryKey(),
	first_name: varchar('first_name', { length: 256 }),
	last_name: varchar('last_name', { length: 256 }),
	email: varchar('email', { length: 256 }),
	deleted: boolean('deleted', { length: 1 }),
  });
  module.exports ={
	User
  }


