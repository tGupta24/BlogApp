import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        // console.log(connectionInstance);
    } catch (error) {
        throw error
    }
}
export { connectDB }