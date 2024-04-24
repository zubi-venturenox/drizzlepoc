const { Model } = require('objection');
const path = require('path');
const { monitorEventLoopDelay } = require('perf_hooks');
class Notification extends Model {
	static get tableName() {
		return 'Notification';
	}

	static get idColumn() {
		return 'id';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['name', 'mode'],
			properties: {
				id: { type: 'integer' },
				name: { type: 'string' },
				template: { type: 'string' },
				mode: { type: 'string' },
			},
		};
	}

	static get relationMappings() {
		return {

		};
	}
}

module.exports = Notification;
