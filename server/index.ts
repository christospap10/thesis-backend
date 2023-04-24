import express, { Router } from 'express';
import mongoose from 'mongoose';
import * as  dotenv from 'dotenv';
import Logger from '../lib/logger';
import morganMiddleware from '../config/morganMiddleware';
import { createPinRouter, getAllPinsRouter } from '../routes/pins';


const app = express();
const port: number = 8800;

dotenv.config()
app.use(express.json());
app.use(morganMiddleware);

const uri: string | undefined = process.env.MONGO_URL
if (!uri) {
	console.error('Mongo url not defined');
	process.exit(1);
}

const connectToDB = async () => {
	const options = {
		autoIndex: false, // Don't build indexes
		maxPoolSize: 10, // Maintain up to 10 socket connections
		serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
		socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
		family: 4 // Use IPv4, skip trying IPv6
	}

	mongoose.connect(uri, options).then(() => {
		try {
			Logger.info('Connected to MongoDB successfully');
		}
		catch (err) {
			Logger.error(err)
		}
	},

	)
}


app.get("/logger", (_, res) => {
	Logger.error("This is an error log");
	Logger.warn("This is a warn log");
	Logger.info("This is a info log");
	Logger.http("This is a http log");
	Logger.debug("This is a debug log");

	res.send("Hello from Logger");
});

// ROUTES
app.use('/api/pins', createPinRouter);
app.use('/api/pins', getAllPinsRouter);



app.listen(port, () => {
	Logger.debug(`Server listening on port ${port}`);
	connectToDB()
})
