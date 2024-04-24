const UsersController = require('../controllers/UsersController');
const jwt = require("jsonwebtoken");


const login = async function (body) {
    let { email, password } = body;
    let existingUser;
    console.log("in login", email, password);
        try {
            const{result} = await UsersController.loginUser(email, password);
            // console.log('user in loging', data);
            existingUser = result.data[0];
            // console.log(existingUser);
            
            // {
            //     id:1,
            //     email:"test@test.com",
            //     password:"password"}
                // await User.findOne({ email: email });
        } catch {
            const error =
                new Error(
                    "Error! Something went wrong."
                );
            console.log(error);
            return error;
        }
        if (!existingUser
            || existingUser.password
            != password) {
            const error =
                Error(
                    "Wrong details please check at once"
                );
                console.log(error);
            return error;
        }
        let token;
        try {
            //Creating jwt token
            token = jwt.sign(
                {
                    user_id: existingUser.id,
                    email: existingUser.email
                },
                "secretkeyappearshere",
                { expiresIn: "1h" }
            );
        } catch (err) {
            console.log(err);
            const error =
                new Error("Error! Something went wrong.");
                console.log(error);
            return error;
        }
 
        const data = {
                user_id: existingUser.id,
                email: existingUser.email,
                token: token,
            }
        
        return { result: { status: 200, message: 'User Found', data: data } };
        


}


const authorize =  async function(req, res, next){
    try {
        
    const token =
        req.headers
            .authorization.split(' ')[1];
    // Authorization: 'Bearer TOKEN'
    if (!token) {
        res.status(200)
            .json(
                {
                    success: false,
                    message: "Error!Token was not provided."
                }
            );
    }
    //Decoding the token
    const decodedToken =
        jwt.verify(token, "secretkeyappearshere");
        console.log(decodedToken);
        const getuser = await UsersController.getAuthUser(decodedToken.user_id);
        req.user =  getuser.result.data[0]
        
        // const enforcer = await newEnforcer('rbac_model.conf', 'rbac_policy.csv');

        // const sub = 'alice'; // the user that wants to access a resource.
        // const obj = 'data1'; // the resource that is going to be accessed.
        // const act = 'read'; // the operation that the user performs on the resource.

// Async:
        // const action = await enforcer.enforce("alice", obj, act);
        // const roles = await enforcer.getRolesForUser('alice');
// Sync:
// const res = enforcer.enforceSync(sub, obj, act);

        // if (action) {
        // console.log("access allowed")
        // console.log("roles:  ", roles)
        // } else {
        // // deny the request, show an error
        // console.log("access denied")
        // }
        // next();
    //  = requser
    console.log("req user", req.user);
    next();
    }
    catch (error) {
        console.log('auth error',error);
        res
        .status(400)
        .json({
            success: true,
            data: {
                message: "Auth Unsuccessful"
            },
        });


    }
};









module.exports = {
    login,
    authorize
};

















