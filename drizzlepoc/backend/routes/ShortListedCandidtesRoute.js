const router = require('express').Router();
const ShortlistedCadidatesContoller = require('../controllers/ShortlistedCadidatesContoller');
router.get('/', async (req, res) => {
	console.log("in get:")
	let data;
	if ('ids' in req.body) {
		console.log('body', req.body);
		data = await ShortlistedCadidatesContoller.getShortlisted_Candidates();
		console.log('result', data?.result);
		console.log('error', data?.error);
	} else {
		console.log('all users');
		const {
			type,
			identifier,
			search
		} = req.query;
		data = await ShortlistedCadidatesContoller.getShortlisted_Candidates();
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
	} = await ShortlistedCadidatesContoller.getShortlisted_Candidate(req.params.id,);

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
	} = await ShortlistedCadidatesContoller.createShortlisted_Candidates(
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
	} = await ShortlistedCadidatesContoller.updateShortlisted_Candidates(
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