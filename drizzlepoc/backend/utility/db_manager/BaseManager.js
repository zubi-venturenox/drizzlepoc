const { getError } = require('../ErrorHandler');

/**
 * @summary The function gives the single record by id
 * @param {model} model name for query
 * @param {integer} id to be fetched
 * @returns {object} for successful execution: result object containing error code and data object with relevant data
 * 					 for unsuccessful execution: error object containing error code and message
 */

const getSingle = async (model, id) => {
	try {
		const data = await model
			.query()
			.findById(id)
			.throwIfNotFound({ message: 'Record not found' });
		return { result: { status: 200, data: data } };
	} catch (error) {
		return { error: getError(error) };
	}
};

/**
 * @summary The function gives all records
 * @param {model} model name for query
 * @returns {object} for successful execution: result object containing error code and data object with relevant data
 * 					 for unsuccessful execution: error object containing error code and message
 */

const getAll = async (model, tenant_id) => {
	try {
		const data = await model.query();
		return { result: { status: 200, data: data } };
	} catch (error) {
		return { error: getError(error) };
	}
};

/**
 * @summary The function create the record
 * @param {model} model name for query
 * @param {object} body for insertion
 * @returns {object} for successful execution: result object containing error code and data object with relevant data
 * 					 for unsuccessful execution: error object containing error code and message
 */

const store = async (model, body) => {
	try {
		const data = await model.query().insert(body);
		return { result: { status: 201, data: data } };
	} catch (error) {
		return { error: getError(error) };
	}
};

/**
 * @summary The function update the record
 * @param {model} model name for query
 * @param {integer} id to be updated
 * @param {object} body for insertion
 * @returns {object} for successful execution: result object containing error code and data object with relevant data
 * 					 for unsuccessful execution: error object containing error code and message
 */

const update = async (model, id, body) => {
	try {
		const data = await model
			.query()
			.patchAndFetchById(id, body)
			.throwIfNotFound('Record not updated');

		return { result: { status: 200, data: data } };
	} catch (error) {
		return { error: getError(error) };
	}
};

/**
 * @summary The function delete the record
 * @param {model} model name for query
 * @param {integer} id to be deleted
 * @returns {object} for successful execution: result object containing error code and data object with relevant data
 * 					 for unsuccessful execution: error object containing error code and message
 */

const destroy = async (model = null, id = null) => {
	try {
		await model.query().deleteById(id).throwIfNotFound();
		return { result: { status: 200, message: 'Record deleted.' } };
	} catch (error) {
		return { error: getError(error) };
	}
};

/**
 * @summary The function gives the results using withGraphFetched
 * @param {model} model name for query
 * @param {object} options contains where condition and graphMethods
 * @returns {object} for successful execution: result object containing error code and data object with relevant data
 * 					 for unsuccessful execution: error object containing error code and message
 */
const graphFetch = async (model, options) => {
	let conditions = options.condition;
	
	if (!Array.isArray(conditions))
		conditions = [conditions];

	try {
		const query = model.query().withGraphFetched(options.graphMethods);

		conditions.forEach((condition) => {
			query.andWhere(condition);
		});

		const data = await query;

		return { result: {status: 200, data: data } };
		
	} catch (error) {
		console.log(error);
		return { error: getError(error) };
	}
};

/**
 * The function performs a graph join operation on a model with specified conditions and returns the
 * result or an error.
 * @param model - The model parameter is likely a reference to a database model or schema, which is
 * used to query data from a database.
 * @param options - The `options` parameter is an object that contains the following properties:
 * @returns The function `graphJoin` returns an object with a `result` property that contains a status
 * code of 200 and the data obtained from the query, or an object with an `error` property that
 * contains the error message obtained from the `getError` function.
 */
const graphJoin = async (model, options) => {

	if (!Array.isArray(options.condition))
		options.condition = [options.condition];

	try {
		const query = model.query().withGraphJoined(options.graphMethods);

		options.condition.forEach((condition) => {
			query.andWhere(condition);
		});

		const data = await query;

		return { result: {status: 200, data: data } };

	} catch (error) {
		console.log(error);
		return { error: getError(error) };
	}
};

/**
 * The function upserts data into a graph database using a given model and body.
 * @param model - The `model` parameter is likely an instance of a database model or an ORM
 * (Object-Relational Mapping) model. It is used to interact with the database and perform CRUD
 * (Create, Read, Update, Delete) operations on the data.
 * @param body - The `body` parameter is an object that contains the data to be upserted into the
 * database. It is passed as an argument to the `upsertGraph` method of the `model` object. The
 * `upsertGraph` method is used to insert or update data in the database based
 * @returns The function `upsertGraph` returns an object with either a `result` or an `error` property.
 * If the function executes successfully, it returns an object with a `result` property that contains a
 * `status` of 200 and the `data` returned from the `upsertGraph` method. If an error occurs, it
 * returns an object with an `error` property that contains
 */
const upsertGraph = async (model, body) => {
	try {
		const data = await model.query().upsertGraph(body);
		return { result: { status: 200, data: data } };
	} catch (error) {
		console.log(error);
		return { error: getError(error) };
	}
};

const insertGraph = async (model, body) => {
	try {
		const data = await model.query().insertGraph(body);
		console.log('Data: ', data);
		return { result: { status: 201, data: data } };
	} catch (error) {
		console.log('Error: ', error);
		return { error: getError(error) };
	}
};
module.exports = {
	getSingle,
	getAll,
	store,
	update,
	destroy,
	graphFetch,
	upsertGraph,
	insertGraph,
	graphJoin,
};
