import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        blogImage: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true
        },
        // likes: {
        //     type: Number,
        //     default: 0
        // },

    },

    { timestamps: true }
);


export const Blog = mongoose.model("Blog", blogSchema)






