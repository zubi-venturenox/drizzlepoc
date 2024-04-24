const Job_Posting = require('../models/Job_Posting');
const errorHandler = require('../utility/ErrorHandler');
const { store } = require('../utility/db_manager/BaseManager');




const getJob_Posting= async (id) => {
	try {
		const data = await Job_Posting.query().where({ id: id})
			.throwIfNotFound();
		return { result: { status: 200, message: 'Job_Posting Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Job_Posting not found', data: null } };
	}
};



const getJob_Postings = async () => {
	try {
		console.log("in get sdfdsaff");
		const data = await Job_Posting.query()
			.throwIfNotFound();
		return { result: { status: 200, message: 'Job_Posting Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Job_Posting not found', data: null } };
	}
};



const updateJob_Posting = async (id, body) => {
	try {
        console.log("Job_Posting update body ", body);
		const data = await Job_Posting.query()
			.patch(body)
			.where({ id: id })
			.andWhere({ is_active: true })
			.throwIfNotFound();
		return { result: { status: 200, message: 'Job_Posting Updated', data: data } };
	} catch (error) {
		return { error: { status: 400, message: error.message, data: null } };
	}
};













const createJob_Posting = async (filterdData) => {
	try {
        console.log("Job_Posting create body ", filterdData);
		const data = await Job_Posting.query().insertGraph(filterdData);
		return {
			result: { status: 201, data },
		};
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};





module.exports = {
    getJob_Posting,
    getJob_Postings,
    updateJob_Posting,
    createJob_Posting
};
