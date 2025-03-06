import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { Schema } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()



const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,

            // validate: [  // validation for user
            //     {
            //         validator: (value) => (validator.isEmail(value.trim())),
            //         message: "please provide a valid email"
            //     }
            // ]
        },
        phoneNumber: {
            type: String,
            required: true,

        },
        avatar: {
            type: String,
            required: true
        },
        // education: {
        //     type: String,
        //     required: true
        // },
        role: {
            type: String,
            required: true,
            enum: ["user", "admin"] // role is either user or admin not other than both
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)
// pre hook
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next()
})

// custom method  .methods ka use karke userSchema kke ander or method addd kar sakte he    
userSchema.methods.isPasswordCorrect = async function (password) {
    console.log(this.password, password)   // we will use this in login
    try {
        if (await bcrypt.compare(password, this.password)) {
            return true;
        }
        else {
            return false;
        }

    } catch (err) {
        throw new ApiError(500, "something went wrong in hashing")
    }
}

userSchema.methods.generateAccessToken = function () {
    console.log("in the user model")
    return jwt.sign(
        //payload  jo data token me include karna chahte ho
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET, // secret key

        //additional option like expiresIn:
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema);