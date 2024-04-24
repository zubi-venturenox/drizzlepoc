
exports.up = function (knex) {
	return knex.schema
		.createTable('User', (t) => {
			t.increments().primary();
			t.boolean('deleted').notNullable().defaultTo('True');
			t.string('email',255).unique().notNullable();
			t.string('first_name',255).notNullable();
			t.string('last_name',255).notNullable();		})
		.createTable('Client', (t) => {
			t.increments().primary();
			t.string('name',255).notNullable();
			t.boolean('deleted').notNullable();
		})
		.createTable('UserClient', (t) => {
			t.increments().primary();
			t.integer('user_id').unsigned()
				.references('id')
				.inTable('User');
			t.integer('client_id').unsigned()
				.references('id')
				.inTable('Client');
		})
		.createTable('Task', (t) => {
			t.increments().primary();
		    t.string('title');
			t.integer('client').unsigned()
				.references('id')
				.inTable('Client');
			t.string('status');
			t.bigInteger('budgeted_hours');
			t.date('start_date');
			t.date('end_date')
		})
		.createTable('TaskAssignee', (t) => {
			t.increments().primary();
			t.integer('user_id').unsigned()
				.references('id')
				.inTable('User');
			t.integer('task_id').unsigned()
				.references('id')
				.inTable('Task');
		})
		.createTable('TimeLog', (t) => {
			t.increments().primary();
			t.integer('user_id').unsigned()
				.references('id')
				.inTable('User');
			t.integer('task_id').unsigned()
				.references('id')
				.inTable('Task');
            t.bigInteger('total_time');
			t.date('log_date')
		})
        
};

exports.down = function (knex) {
	return knex.schema

};
