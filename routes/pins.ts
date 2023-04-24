import express, { Request, Response, Router } from 'express';
import { IPin } from '../models/Pin';

const router = express.Router();
const Pin = require('../models/Pin');


// create a pin
export const createPinRouter: Router = router.post('/', async (req: Request, res: Response): Promise<Response<IPin, Record<string, any>>> => {
	const newPin = new Pin(req.body)
	try {
		const savedPin = await newPin.save();
		return res.status(200).json({
			message: `Saved Pin successfully.`,
			savedPin,
		})

	} catch (err) {
		return res.status(500).json({
			message: `Error while creating pin`,
			err,
		})
	}
})


// get all pins
export const getAllPinsRouter: Router = router.get('/', async (req: Request, res: Response): Promise<Response<IPin, Record<string, any>>> => {
	try {
	const pins = await Pin.find();
	return res.status(200).json({
		message: `Pins found: ${pins.length}`,
		pins,
	})
	} catch (err) {
		return res.status(500).json({
			message: `Error while getting all pins`,
			err,
		})
	}
})

