const router = require('express').Router();
const JobPostingController = require('../controllers/JobPostingController');
router.get('/', async (req, res) => {
	console.log("in get:")
	let data;
	if ('ids' in req.body) {
		console.log('body', req.body);
		data = await JobPostingController.getJob_Postings();
		console.log('result', data?.result);
		console.log('error', data?.error);
	} else {
		console.log('all users');
		const {
			type,
			identifier,
			search
		} = req.query;
		data = await JobPostingController.getJob_Postings();
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
	} = await JobPostingController.getJob_Posting(req.params.id,);

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
	} = await JobPostingController.createJob_Posting(
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
	} = await JobPostingController.updateJob_Posting(
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