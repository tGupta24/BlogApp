import dotenv from "dotenv"
import { connectDB } from "./db/index.js"
import app from "./app.js"
dotenv.config()


const port = process.env.PORT
connectDB()
    .then(() => {

        app.listen(port, () => {
            console.log(`Example app listening on port ${port} `)
        })
    })
    .catch((err) => {
        console.log("::MONGODB connection error:", err)
    })


