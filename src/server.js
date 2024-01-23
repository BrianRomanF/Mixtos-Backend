import express from "express";
import dotenv from "dotenv"; 
import connect from "./db.js"; 
import userRouter from "./routes/userRoutes.js";
import matchRouter from "./routes/matchRoutes.js";


dotenv.config();
const PORT = process.env.PORT||3000;
const app = express();
app.use(express.json());

connect();


app.use('/api',userRouter);
app.use('/api',matchRouter);


app.listen(PORT, ()=> console.log(`Your server is running on port: ${PORT}`))