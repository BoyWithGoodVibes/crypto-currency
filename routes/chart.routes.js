const { Router } = require("express");
const router = Router();
const config = require("config");
const axios = require("axios");


// /api/chart/
router.get(
	'/',
	(req, res) => {

		const { period, coinId } = req.query;

		axios.get(`${config.get("chartUrl")}period=${period}&coinId=${coinId === 'xrp' ? 'ripple' : coinId}`, {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			}
		})
			.then(response => {
				if (response.data.chart.length === 0) {
					return res.status(500).json({ message: "Something went wrong, try again" });
				}
				const chartData = response.data.chart.filter(item => item[1] > 0.0).map(item => ({date: item[0], price: item[1]}))
				
				return res.json(chartData);
			})
			.catch(e => res.status(500).json({ message: "Something went wrong, try again" }))

	}
)


module.exports = router