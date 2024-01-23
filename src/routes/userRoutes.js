import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();


// Create New User
userRouter.post('/createUser',createUser );
userRouter.post('/logIn',loginUser );

export default userRouter;