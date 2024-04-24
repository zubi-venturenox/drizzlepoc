const WorkExperience = require('../models/WorkExperience');
const errorHandler = require('../utility/ErrorHandler');
const { store } = require('../utility/db_manager/BaseManager');




const getWorkExperience = async (id) => {
	try {
		const data = await WorkExperience.query().where({ id: id})
			.throwIfNotFound();
		return { result: { status: 200, message: 'Certificate_User Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Certificate_User not found', data: null } };
	}
};



const getWorkExperiences = async () => {
	try {
		console.log("in get sdfdsaff");
		const data = await WorkExperience.query()
			.throwIfNotFound();
		return { result: { status: 200, message: 'WorkExperience Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'WorkExperience not found', data: null } };
	}
};



const updateWorkExperience = async (id, body) => {
	try {
        console.log("WorkExperience update body ", body);
		const data = await WorkExperience.query()
			.patch(body)
			.where({ id: id })
			.andWhere({ is_active: true })
			.throwIfNotFound();
		return { result: { status: 200, message: 'WorkExperience Updated', data: data } };
	} catch (error) {
		return { error: { status: 400, message: error.message, data: null } };
	}
};













const createWorkExperience = async (filterdData) => {
	try {
        console.log("WorkExperience create body ", filterdData);
		const data = await WorkExperience.query().insertGraph(filterdData);
		return {
			result: { status: 201, data },
		};
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};





module.exports = {
    getWorkExperience,
    getWorkExperiences,
    createWorkExperience,
    updateWorkExperience
};
