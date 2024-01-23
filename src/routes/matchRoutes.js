import express from "express";
import { createMatch } from "../controllers/matchController.js";

const matchRouter = express.Router();


// Create New User
matchRouter.post('/createMatch',createMatch );


export default matchRouter;