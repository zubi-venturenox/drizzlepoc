const Shortlisted_Candidates = require('../models/Shortlisted_Candidates');
const errorHandler = require('../utility/ErrorHandler');
const { store } = require('../utility/db_manager/BaseManager');




const getShortlisted_Candidate= async (id) => {
	try {
		const data = await Shortlisted_Candidates.query().where({ id: id})
			.throwIfNotFound();
		return { result: { status: 200, message: 'Shortlisted_Candidates Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Shortlisted_Candidates not found', data: null } };
	}
};



const getShortlisted_Candidates = async () => {
	try {
		console.log("in get sdfdsaff");
		const data = await Shortlisted_Candidates.query()
			.throwIfNotFound();
		return { result: { status: 200, message: 'Shortlisted_Candidates Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Shortlisted_Candidates not found', data: null } };
	}
};



const updateShortlisted_Candidates = async (id, body) => {
	try {
        console.log("Shortlisted_Candidates update body ", body);
		const data = await Shortlisted_Candidates.query()
			.patch(body)
			.where({ id: id })
			.andWhere({ is_active: true })
			.throwIfNotFound();
		return { result: { status: 200, message: 'Shortlisted_Candidates Updated', data: data } };
	} catch (error) {
		return { error: { status: 400, message: error.message, data: null } };
	}
};













const createShortlisted_Candidates = async (filterdData) => {
	try {
        console.log("Shortlisted_Candidates create body ", filterdData);
		const data = await Shortlisted_Candidates.query().insertGraph(filterdData);
		return {
			result: { status: 201, data },
		};
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};





module.exports = {
    getShortlisted_Candidate,
    getShortlisted_Candidates,
    updateShortlisted_Candidates,
    createShortlisted_Candidates
};
