import mongoose from "mongoose";

export interface IUser {
	username: string;
	email: string;
	password: string;
}


const UserSchema = new mongoose.Schema<IUser>({
	username: {
		type: String,
		require: true,
		min: 3,
		max: 20,
		unique: true,
	},
	email: {
		type: String,
		require: true,
		max: 50,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		min: 6,
	},
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema);
