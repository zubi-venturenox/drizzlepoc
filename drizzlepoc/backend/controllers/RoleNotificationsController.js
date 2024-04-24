// const { result } = require("lodash");
const RoleNotification = require('../models/RoleNotification');
const errorHandler = require('../utility/ErrorHandler');
const { store } = require('../utility/db_manager/BaseManager');




/**
 * It fetches a user profile from the database, and if it doesn't exist, it throws an error
 * @param id - The id of the user you want to get
 * @returns An object with a key of result or error.
 */
const getRoleNotification = async (id) => {
	try {
		const data = await RoleNotification.query().where({ id: id})
			.throwIfNotFound();
		return { result: { status: 200, message: 'GoogleCertificates Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'GoogleCertificates not found', data: null } };
	}
};

/**
 * If fetches user profiles from the database, and if it doesn't exist, it throws an error
 * @param {List} ids - list of ids of the users
 * @returns An object containing all the user profile or error
 */
const getRoleNotifications = async () => {
	try {
		console.log("in get sdfdsaff");
		const data = await RoleNotification.query()
			// .withGraphFetched('[RoleNotification]')
			.throwIfNotFound();
		return { result: { status: 200, message: 'RoleNotification Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'RoleNotification not found', data: null } };
	}
};

/**
 * It updates a user profile based on the user id and the body of the request
 * @param id - The id of the user you want to update
 * @param body - The data that you want to update.
 * @returns An object with a key of result or error.
 */
const updateRoleNotification = async (id, body) => {
	try {
        console.log("RoleNotification update body ", body);
		const data = await RoleNotification.query()
			.patch(body)
			.where({ id: id })
			.throwIfNotFound();
		return { result: { status: 200, message: 'RoleNotification Updated', data: data } };
	} catch (error) {
		return { error: { status: 400, message: error.message, data: null } };
	}
};



/**
 * It takes an array of objects, and inserts them into the database
 * @param filterdData - This is the data that you want to insert into the database.
 * @returns An object with a result property and an error property.
 */
const createRoleNotification = async (filterdData) => {
	try {
        console.log("RoleNotification create body ", filterdData);
		const data = await RoleNotification.query().insertGraph(filterdData);
		return {
			result: { status: 201, data },
		};
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};





module.exports = {
getRoleNotification,
getRoleNotifications,
createRoleNotification,
updateRoleNotification
};
