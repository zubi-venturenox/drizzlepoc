// const { result } = require("lodash");
const Login_History = require('../models/Login_History');
const errorHandler = require('../utility/ErrorHandler');
const { store } = require('../utility/db_manager/BaseManager');




/**
 * It fetches a user profile from the database, and if it doesn't exist, it throws an error
 * @param id - The id of the user you want to get
 * @returns An object with a key of result or error.
 */
const getLogin_History = async (id) => {
	try {
		const data = await Login_History.query().where({ id: id})
			.throwIfNotFound();
		return { result: { status: 200, message: 'Login_History Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Login_History not found', data: null } };
	}
};

/**
 * If fetches user profiles from the database, and if it doesn't exist, it throws an error
 * @param {List} ids - list of ids of the users
 * @returns An object containing all the user profile or error
 */
const getLogin_Historys = async () => {
	try {
		console.log("in get sdfdsaff");
		const data = await Login_History.query()
			// .withGraphFetched('[Login_Historys]')
			.throwIfNotFound();
		return { result: { status: 200, message: 'Login_Historys Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Login_Historys not found', data: null } };
	}
};

/**
 * It updates a user profile based on the user id and the body of the request
 * @param id - The id of the user you want to update
 * @param body - The data that you want to update.
 * @returns An object with a key of result or error.
 */
const updateLogin_History = async (id, body) => {
	try {
        console.log("Login_History update body ", body);
		const data = await Login_History.query()
			.patch(body)
			.where({ id: id })
			.throwIfNotFound();
		return { result: { status: 200, message: 'Login_History Updated', data: data } };
	} catch (error) {
		return { error: { status: 400, message: error.message, data: null } };
	}
};



/**
 * It takes an array of objects, and inserts them into the database
 * @param filterdData - This is the data that you want to insert into the database.
 * @returns An object with a result property and an error property.
 */
const createLogin_History = async (filterdData) => {
	try {
        console.log("Login_Historys create body ", filterdData);
		const data = await Login_History.query().insertGraph(filterdData);
		return {
			result: { status: 201, data },
		};
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};





module.exports = {
    getLogin_History,
    getLogin_Historys,
    createLogin_History,
    updateLogin_History
};
