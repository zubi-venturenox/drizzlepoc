// const { result } = require("lodash");
const SoftSkills = require('../models/SoftSkills');
const errorHandler = require('../utility/ErrorHandler');
const { store } = require('../utility/db_manager/BaseManager');




/**
 * It fetches a user profile from the database, and if it doesn't exist, it throws an error
 * @param id - The id of the user you want to get
 * @returns An object with a key of result or error.
 */
const getSoftSkill = async (id) => {
	try {
		const data = await SoftSkills.query().where({ id: id})
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
const getSoftSkills = async () => {
	try {
		console.log("in get sdfdsaff");
		const data = await SoftSkills.query()
			// .withGraphFetched('[GoogleCertificates]')
			.throwIfNotFound();
		return { result: { status: 200, message: 'SoftSkills Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'SoftSkills not found', data: null } };
	}
};

/**
 * It updates a user profile based on the user id and the body of the request
 * @param id - The id of the user you want to update
 * @param body - The data that you want to update.
 * @returns An object with a key of result or error.
 */
const updateSoftSkills = async (id, body) => {
	try {
        console.log("SoftSkills update body ", body);
		const data = await SoftSkills.query()
			.patch(body)
			.where({ id: id })
			.throwIfNotFound();
		return { result: { status: 200, message: 'SoftSkills Updated', data: data } };
	} catch (error) {
		return { error: { status: 400, message: error.message, data: null } };
	}
};



/**
 * It takes an array of objects, and inserts them into the database
 * @param filterdData - This is the data that you want to insert into the database.
 * @returns An object with a result property and an error property.
 */
const createSoftSkill = async (filterdData) => {
	try {
        console.log("SoftSkills create body ", filterdData);
		const data = await SoftSkills.query().insertGraph(filterdData);
		return {
			result: { status: 201, data },
		};
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};





module.exports = {
    getSoftSkill,
    getSoftSkills,
    updateSoftSkills,
    createSoftSkill
};
