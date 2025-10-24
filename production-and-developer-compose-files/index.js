import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello from Express!');
});

app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Server listening on http://localhost:${port}`);
});

export default app;