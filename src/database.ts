import mongoose from 'mongoose';

const URI_DB: string = process.env.URI || '';

mongoose
	.connect(URI_DB)
	.then((db: any) => {
		if (db.connections[0]._readyState) {
			console.log('DB connected');
		}
	})
	.catch((err) => console.log(err.message));
