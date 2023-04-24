import mongoose from "mongoose";


export interface IPin {
	username: string;
	title: string;
	desc: string;
	rating: number;
	lat: number;
	long: number;
	_id: string;
	created_at: string;
	updated_at: string;
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
	desc: {
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
	long: {
		type: Number,
		require: true,
	},
}, { timestamps: true })

module.exports = mongoose.model('Pin', PinSchema);
