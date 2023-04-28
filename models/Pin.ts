import mongoose from "mongoose";


export interface IPin {
	username: string;
	title: string;
	descr: string;
	rating: number;
	lat: number;
	lon: number;
}


const PinSchema = new mongoose.Schema<IPin>({
	username: {
		type: String,
		require: true,
	},
	title: {
		type: String,
		require: true,
		min: 3,
	},
	descr: {
		type: String,
		require: true,
		min: 3,
	},
	rating: {
		type: Number,
		require: true,
		min: 0,
		max: 5,
	},
	lat: {
		type: Number,
		require: true,
	},
	lon: {
		type: Number,
		require: true,
	},
}, { timestamps: true })

module.exports = mongoose.model('Pin', PinSchema);
