const Certificate_Users = require('../models/Certificate_Users');
const errorHandler = require('../utility/ErrorHandler');
const { store } = require('../utility/db_manager/BaseManager');




const getCertificate_User = async (id) => {
	try {
		const data = await Certificate_Users.query().where({ id: id})
			.throwIfNotFound();
		return { result: { status: 200, message: 'Certificate_User Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Certificate_User not found', data: null } };
	}
};



const getCertificate_Users = async () => {
	try {
		console.log("in get sdfdsaff");
		const data = await Certificate_Users.query()
			.throwIfNotFound();
		return { result: { status: 200, message: 'Certificate_Users Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Certificate_Users not found', data: null } };
	}
};



const updateCertificate_Users = async (id, body) => {
	try {
        console.log("Certificate_Users update body ", body);
		const data = await Certificate_Users.query()
			.patch(body)
			.where({ id: id })
			.andWhere({ is_active: true })
			.throwIfNotFound();
		return { result: { status: 200, message: 'Certificate_Users Updated', data: data } };
	} catch (error) {
		return { error: { status: 400, message: error.message, data: null } };
	}
};













const createCertificate_Users = async (filterdData) => {
	try {
        console.log("Certificate_Users create body ", filterdData);
		const data = await Certificate_Users.query().insertGraph(filterdData);
		return {
			result: { status: 201, data },
		};
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};





module.exports = {
    getCertificate_User,
    getCertificate_Users,
    updateCertificate_Users,
    createCertificate_Users
};
