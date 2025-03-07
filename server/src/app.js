import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import dotenv from "dotenv"
dotenv.config()

const app = express()

//applying middle ware

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
// so that we can fetch the api from anywhere

app.use(express.json({ limit: "16kb" }));    // it parse json data to make them available in req.body

app.use(express.urlencoded({ extended: true })) // it parse form or url-encoded data to make them availabel in req.body

app.use(cookieparser())  // to read and write cookies

app.use(express.static("public")); // it serve the static files from public so that we can use them



import userRouter from "./routes/user.route.js"
app.use("/api/v1/users", userRouter)

import blogrouter from "./routes/blog.route.js"
app.use("/api/v1/blog", blogrouter)



app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

export default app


