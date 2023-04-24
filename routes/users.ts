import express, { Request, Response, Router } from 'express';
import { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import Logger from '../lib/logger';

const router = express.Router();
const User = require('../models/User');

// create user register
export const createUserRouter: Router = router.post('/register', async (req: Request, res: Response): Promise<Response<IUser, Record<string, any>>> => {
	try {
		// generate new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// create new user
		const newUser = await User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		})

		// save user and send response
		const user = await newUser.save();
		return res.status(200).json({
			message: `User created successfully`,
			user: user._id,
		})

	} catch (err) {
		return res.status(500).json({
			message: `Failed to create user`,
			err: Logger.error(err),
		})
	}

})


// login user
export const loginUserRouter: Router = router.post('/login', async (req: Request, res: Response): Promise<Response<IUser, Record<string, any>>> => {
	try {
		// find user
		const user = await User.findOne({
			username: req.body.username,
		});
		!user && res.status(403).json({ message: 'User not found' });

		// validate password
		const validPassword = await bcrypt.compare(req.body.password, user.password,);
		!validPassword && res.status(403).json({ message: 'Password incorrect' });

		// send successfull response
		return res.status(200).json({
			message: `User successfully logged in successfully`,
			user: {
				id: user._id,
				username: user.username,
			},
		})

	} catch (err) {
		return res.status(500).json({
			message: `Failed to login user`,
			err: Logger.error(err),
		})
	}
})










