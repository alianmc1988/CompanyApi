import app from './server';
import dotenv from 'dotenv';
dotenv.config();
import './database';
import './setup';

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
