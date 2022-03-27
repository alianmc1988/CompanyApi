import mongoose, { ConnectionStates } from 'mongoose';

const URI_DB: string = process.env.URI || '';

mongoose
	.connect(URI_DB)
	.then((db: Object) => console.log(`DB is connected `))
	.catch((err) => console.log(err.message));
