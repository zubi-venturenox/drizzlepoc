const Education = require('../models/Education');
const errorHandler = require('../utility/ErrorHandler');
const { store } = require('../utility/db_manager/BaseManager');




const getEducation = async (id) => {
	try {
		const data = await Education.query().where({ id: id})
			.throwIfNotFound();
		return { result: { status: 200, message: 'Certificate_User Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Certificate_User not found', data: null } };
	}
};



const getEducations = async () => {
	try {
		console.log("in get sdfdsaff");
		const data = await Education.query()
			.throwIfNotFound();
		return { result: { status: 200, message: 'Education Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Education not found', data: null } };
	}
};



const updateEducation = async (id, body) => {
	try {
        console.log("Education update body ", body);
		const data = await Education.query()
			.patch(body)
			.where({ id: id })
			.andWhere({ is_active: true })
			.throwIfNotFound();
		return { result: { status: 200, message: 'Education Updated', data: data } };
	} catch (error) {
		return { error: { status: 400, message: error.message, data: null } };
	}
};













const createEducation = async (filterdData) => {
	try {
        console.log("Education create body ", filterdData);
		const data = await Education.query().insertGraph(filterdData);
		return {
			result: { status: 201, data },
		};
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};





module.exports = {
    getEducation,
    getEducations,
    createEducation,
    updateEducation
};
