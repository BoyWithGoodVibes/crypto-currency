const { Router } = require("express");
const router = Router();
const config = require("config");
const axios = require("axios");



// /api/makrket/
router.get(
	'/:coinId',
	(req, res) => {

		const { coinId } = req.params;

		axios.get(`${config.get("assetsUrl")}/${coinId}/markets?limit=180`, {
			headers: {
				'Accept-Encoding': 'gzip',
				'Content-Type': 'application/json; charset=utf-8',
				'Authorization': `Bearer ${config.get('assetsToken')}`
			}
		})
			.then(response => {
				const filteredArray = response.data.data.map(a => a).sort((a, b) => Number(b['volumeUsd24Hr']) - Number(a['volumeUsd24Hr']))
				res.json(filteredArray)
			})
			.catch(e => res.status(500).json({ message: "Something went wrong, try again" }))

	}
)


module.exports = router