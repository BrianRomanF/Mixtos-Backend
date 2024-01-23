import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

async function connect(){
    try{
      await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ffxmptz.mongodb.net/?retryWrites=true&w=majority`, {dbName: 'EnrollDB'})
      //await mongoose.connect(process.env.MONGODB_URI, {dbName: 'EnrollDB'}); 
      console.log("Connected To MongoDB")
    }catch(error){
        console.log("Error Connectic to MongoDB", error.message)
        process.exit(1);
    }
}

export default connect; 