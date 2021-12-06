const express = require('express');
const path = require('path');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/assets', require('./routes/assets.routes'));
app.use('/api/chart', require('./routes/chart.routes'));
app.use('/api/market', require('./routes/market.routes'));


if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}


const PORT = process.env.PORT || 5000;

const start = async () => {
	try {
		app.listen(PORT, () => console.log(`Started on port ${PORT}...`));

	} catch (e) {
		console.log('Server Error', e.message);
		process.exit(1)
	}
}

start();