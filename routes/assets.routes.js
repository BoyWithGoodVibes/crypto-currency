const { Router } = require("express");
const router = Router();
const config = require("config");
const axios = require("axios");



// /api/assets/
router.get(
	'/',
	(req, res) => {

		axios.get(`${config.get("assetsUrl")}?limit=300`, {
			headers: {
				'Accept-Encoding': 'gzip',
				'Content-Type': 'application/json; charset=utf-8',
				'Authorization': `Bearer ${config.get('assetsToken')}`
			}
		})
			.then(response => {
				const crypts = response.data.data.map(item => {
					return {
						...item,
						icon: `https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`
					}
				})
				res.json(crypts)
			})
			.catch(e => res.status(500).json({ message: "Something went wrong, try again" }))

	}
)


module.exports = router