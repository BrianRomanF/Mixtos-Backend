import express from "express";
import dotenv from "dotenv"; 
import connect from "./db.js"; 
import userRouter from "./routes/userRoutes.js";
import matchRouter from "./routes/matchRoutes.js";
import bodyParser from "body-parser";
import {fileURLToPath} from 'url';
import path from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 



dotenv.config();
const PORT = process.env.PORT||3000;
const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../dist')));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})


connect();


app.use('/api',userRouter);
app.use('/api',matchRouter);


app.listen(PORT, ()=> console.log(`Your server is running on port: ${PORT}`))