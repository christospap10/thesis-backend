import express, { Request, Response, Router } from "express";
import { IUser } from "../models/User";
import bcrypt from "bcrypt";
import Logger from "../lib/logger";

const router = express.Router();
const User = require("../models/User");

// create user register
export const createUserRouter: Router = router.post(
  "/register",
  async (
    req: Request,
    res: Response
  ): Promise<Response<IUser, Record<string, any>>> => {
    try {
      // generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // create new user
      const newUser = await User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      // save user and send response
      const user = await newUser.save();
      console.log("\x1b[42m%s\x1b[0m", "[SUCCESS]Registering user");
      return res.status(200).json({
        message: `User created successfully`,
        user: user._id,
      });
    } catch (err) {
      console.log("\x1b[41m%s\x1b[0m", "[FAILED]Registering user");
      return res.status(500).json({
        message: `Failed to create user`,
        err: Logger.error(err),
      });
    }
  }
);

// login user
export const loginUserRouter: Router = router.post(
  "/login",
  async (
    req: Request,
    res: Response
  ): Promise<Response<IUser, Record<string, any>>> => {
    try {
      // find user
      const user = await User.findOne({
        username: req.body.username,
      });
      if (!user) {
        console.log(
          "\x1b[41m%s\x1b[0m",
          "[FAILED]Loging in with user (Wrong username)"
        );
        return res.status(403).json({ message: "User not found" });
      }

      // validate password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        console.log(
          "\x1b[41m%s\x1b[0m",
          "[FAILED]Loging in with user (Wrong pass)"
        );
        return res.status(403).json({ message: "Password incorrect" });
      }

      // send successfull response
      console.log("\x1b[42m%s\x1b[0m", "[SUCCESS]Loging in with user");
      return res.status(200).json(user);
    } catch (err) {
      console.log("\x1b[41m%s\x1b[0m", "[FAILED]Loging in with user");
      return res.status(500).json({
        message: `Failed to login user`,
        err: Logger.error(err),
      });
    }
  }
);
