// const { result } = require("lodash");
const Users = require('../models/Users');
const errorHandler = require('../utility/ErrorHandler');
const { store } = require('../utility/db_manager/BaseManager');
// const Identifier = require('../models/Identifier');
// const KafkaProducer = require('../utility/KafkaProducer');

/**
 * It fetches a user profile from the database, and if it doesn't exist, it throws an error
 * @param company_id - The id of the tenant you want to get the users from
 * @param type - all, active, archive
 * @param identifier - The identifier you want to check for
 * @returns An object with a key of result or error.
 */

const listUsers = async () => {
	try {
		const data = await UserProfile.query()
			.findOne({ id: id, company_id: company_id })
			.withGraphFetched('[company]')
			.throwIfNotFound();
		return { result: { status: 200, message: 'User Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'User not found', data: null } };
	}
};


/**
 * It fetches a user profile from the database, and if it doesn't exist, it throws an error
 * @param id - The id of the user you want to get
 * @returns An object with a key of result or error.
 */
const getUser = async (id) => {
	try {
		const data = await Users.query().where({ id: id})
			.throwIfNotFound();
		console.log(data);
		return { result: { status: 200, message: 'User Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'User not found', data: null } };
	}
};

/**
 * If fetches user profiles from the database, and if it doesn't exist, it throws an error
 * @param {List} ids - list of ids of the users
 * @returns An object containing all the user profile or error
 */
const getUsers = async () => {
	try {
		console.log("in get sdfdsaff");
		const data = await Users.query()
			// .withGraphFetched('[company]')
			.throwIfNotFound();
		return { result: { status: 200, message: 'Users Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'Users not found', data: null } };
	}
};

/**
 * It updates a user profile based on the user id and the body of the request
 * @param id - The id of the user you want to update
 * @param body - The data that you want to update.
 * @returns An object with a key of result or error.
 */
const updateUser = async (id, body) => {
	try {
		const data = await Users.query()
			.patch(body)
			.where({ id: id })
			.andWhere({ is_active: true })
			.throwIfNotFound();
		return { result: { status: 200, message: 'User Updated', data: data } };
	} catch (error) {
		return { error: { status: 400, message: error.message, data: null } };
	}
};

/**
 * It takes an array of user IDs and archives them
 * @param body - An array of user ids to be archived
 * @returns An object with a key of result or error.
 */
const archiveUser = async (body, current_user) => {
	try {
		console.log('logged user id: :  '+current_user.id); 
		const logincheck = body.includes(current_user.id);
		if (logincheck){
			return { result: { status: 400, message: 'Cannot Archive Current Logged In User', data: 'Cannot Archive Current Logged In User'} };
		}

		const data = await UserProfile.query()
			.patch({
				is_active: false,
			})
			.whereIn('user_id', body);
		console.log('prod data :', data);
		return { result: { status: 200, message: 'User Archived' } };
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};

/**
 * It takes an array of user IDs and updates the is_archive column to false
 * @param body - An array of user ids to be unarchived.
 * @returns an object with a key of result or error.
 */
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



/**
 * It takes an array of objects, and inserts them into the database
 * @param filterdData - This is the data that you want to insert into the database.
 * @returns An object with a result property and an error property.
 */
const createUserProfiles = async (filterdData) => {
	try {
		const data = await Users.query().insertGraph(filterdData);
		return {
			result: { status: 201, data },
		};
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};

const updateUserProfile = async (filterdData) => {
	try {
		const data = await UserProfile.query().upsertGraph(filterdData);
		return {
			result: { status: 200, data },
		};
	} catch (error) {
		return { error: errorHandler.getError(error) };
	}
};


const getprofilescore = async(id)=>{
	try {
		const profile_data = await Users.query().where({ id: id}).andWhere({is_active:true})
		.withGraphFetched('[experience, education]')
			.throwIfNotFound();
		console.log('profile_data: ',profile_data[0]);

		let score =  0;
		if (profile_data[0].profile_picture!=null &&profile_data[0].profile_picture!=''){
			score =score + 10;
		}
		if (profile_data[0].cv_file!=null &&profile_data[0].cv_file!=''){
			score =score + 20;
		}
		if (profile_data[0].first_name!='' &&  profile_data[0].last_name!='' && profile_data[0].gender!=''&& profile_data[0].city!=''){
			score =score + 25;
		}
		if (profile_data[0].experience!=[] ){
			score =score + 25;
		}
		if (profile_data[0].education!=[] ){
			score =score + 20;
		}
		return { result: { status: 200, message: 'User Found', data: score } };
	} catch (error) {
		console.log(error);
		return { error: { status: 404, message: 'User not found', data: null } };
	}
};

const loginUser = async (email, password) => {
	try {
		const data = await Users.query().where({ email: email}).andWhere({password:password})
		.withGraphFetched('[role]')
			.throwIfNotFound();
		console.log(data);
		return { result: { status: 200, message: 'User Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'User not found', data: null } };
	}
};


const getAuthUser = async (id) => {
	try {
		const data = await Users.query().where({ id: id})
		.withGraphFetched('[role]')
			.throwIfNotFound();
		console.log(data);
		return { result: { status: 200, message: 'User Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'User not found', data: null } };
	}
};

module.exports = {
	getUser,
	getUsers,
	createUserProfiles,
	updateUserProfile,
	archiveUser,
	unarchiveUser,
	updateUser,
	listUsers,
	getprofilescore,
	getAuthUser,
	loginUser


	

};
