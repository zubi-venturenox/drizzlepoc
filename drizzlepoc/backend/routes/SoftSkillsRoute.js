const router = require('express').Router();
const SoftSkillController = require('../controllers/SoftSkillController');
router.get('/', async (req, res) => {
	console.log("in get:")
	let data;
	if ('ids' in req.body) {
		console.log('specific users');
		console.log('body', req.body);
		data = await SoftSkillController.getSoftSkills();
		console.log('result', data?.result);
		console.log('error', data?.error);
	} else {
		console.log('all users');
		const {
			type,
			identifier,
			search
		} = req.query;
		data = await SoftSkillController.getSoftSkills();
		console.log('result', data?.result);
		console.log('error', data?.error);
	}

	const error = data?.error;
	const result = data?.result;

	if (error) {
		res.status(error.status).json(error.message);
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

router.get('/:id', async (req, res) => {

	const {
		result,
		error
	} = await SoftSkillController.getSoftSkill(req.params.id,);

	if (error) {
		res.status(error.status).json(error.message);
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

router.post('/', async (req, res) => {
	const {
		result,
		error
	} = await SoftSkillController.createSoftSkill(
		req.body
	);
	if (error) {
		res.status(error.status).json(error.message);
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

router.patch('/:id', async (req, res) => {
	const {
		result,
		error
	} = await SoftSkillController.updateSoftSkills(
		req.params.id,
		req.body
	);

	if (error) {
		res.status(error.status).json(error.message);
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});



module.exports = router;