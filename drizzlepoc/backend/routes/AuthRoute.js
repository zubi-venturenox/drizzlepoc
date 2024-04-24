const router = require('express').Router();
const AuthController = require('../controllers/AuthController');



router.post("/",
    async (req, res, next) => {
        console.log("in login");
        const {
            result,
            error
        } = await AuthController.login(req.body);
    
        if (error) {
            res.status(error.status).json(error.message);
        } else if (result) {
            res.status(result.status).json(result.data);
        } else {
            res.sendStatus(500);
        }
    });








module.exports = router;