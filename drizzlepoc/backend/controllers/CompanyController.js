const Company = require('../models/Company');
const errorHandler = require('../utility/ErrorHandler');
const { store } = require('../utility/db_manager/BaseManager');




const getCompany = async (id) => {
	try {
		const data = await Company.query().where({ id: id})
			.throwIfNotFound();
		return { result: { status: 200, message: 'Company Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Company not found', data: null } };
	}
};



const getCompanies = async () => {
	try {
		console.log("in get sdfdsaff");
		const data = await Company.query()
			// .withGraphFetched('[company]')
			.throwIfNotFound();
		return { result: { status: 200, message: 'Company Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Company not found', data: null } };
	}
};



const updateCompany = async (id, body) => {
	try {
        console.log("company update body ", body);
		const data = await Company.query()
			.patch(body)
			.where({ id: id })
			.andWhere({ is_active: true })
			.throwIfNotFound();
		return { result: { status: 200, message: 'Company Updated', data: data } };
	} catch (error) {
		return { error: { status: 400, message: error.message, data: null } };
	}
};



const archiveCompany = async (body, current_user) => {
	try {
		console.log('logged user id: :  '+current_user.id); 
		const logincheck = body.includes(current_user.id);
		if (logincheck){
			return { result: { status: 400, message: 'Cannot Archive Current Logged In User', data: 'Cannot Archive Current Logged In User'} };
		}

		const data = await Company.query()
			.patch({
				is_active: false,
			})
			.whereIn('user_id', body);
		console.log('prod data :', data);
		return { result: { status: 200, message: 'Company Archived' } };
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};




const unarchiveUser = async (req) => {
	const body = req.body;
	try {
		await UserProfile.query()
			.patch({
				is_active: true,
			})
			.whereIn('user_id', body)
			.andWhere('company_id', req.user.company_id);
		return { result: { status: 200, message: 'User Unarchived' } };
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};





const createCompany = async (filterdData) => {
	try {
        console.log("company create body ", filterdData);
		const data = await Company.query().insertGraph(filterdData);
		return {
			result: { status: 201, data },
		};
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};





module.exports = {
    getCompany,
    getCompanies,
    updateCompany,
    createCompany
};
