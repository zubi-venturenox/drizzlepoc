const Job_Application = require('../models/Job_Application');
const errorHandler = require('../utility/ErrorHandler');
const { store } = require('../utility/db_manager/BaseManager');




const getJobApplication= async (id) => {
	try {
		const data = await Job_Application.query().where({ id: id})
			.throwIfNotFound();
		return { result: { status: 200, message: 'Job_Application Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Job_Application not found', data: null } };
	}
};



const getJobApplications = async () => {
	try {
		console.log("in get sdfdsaff");
		const data = await Job_Application.query()
			.throwIfNotFound();
		return { result: { status: 200, message: 'Job_Application Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Job_Application not found', data: null } };
	}
};



const updateJob_Application = async (id, body) => {
	try {
        console.log("Job_Application update body ", body);
		const data = await Job_Application.query()
			.patch(body)
			.where({ id: id })
			.andWhere({ is_active: true })
			.throwIfNotFound();
		return { result: { status: 200, message: 'Job_Application Updated', data: data } };
	} catch (error) {
		return { error: { status: 400, message: error.message, data: null } };
	}
};













const createJob_Application = async (filterdData) => {
	try {
        console.log("Job_Application create body ", filterdData);
		const data = await Job_Application.query().insertGraph(filterdData);
		return {
			result: { status: 201, data },
		};
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};





module.exports = {
    getJobApplication,
    getJobApplications,
    createJob_Application,
    updateJob_Application
};
