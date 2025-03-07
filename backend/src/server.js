import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config({path:'./src/.env'});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

if(!process.env.MONGO_URI) throw Error('MONGO_URI environment variable is not defined');
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(PORT, () => console.log('Server running on port:', PORT));
	})
	.catch((aError) => {
		console.log('Failed to connect with error:', aError);
		process.exit(1);
	});

app.use((err, req, res, next) => {
	console.log('Express error:', err);
	res.status(500).send('Internal server error');
});