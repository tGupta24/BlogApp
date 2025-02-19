import { error } from "console";
import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


const createBlog = asyncHandler(async (req, res) => {

    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        throw new ApiError(401, "All fields are required");
    }
    if (!req.file) {
        throw new ApiError(401, "blog image is required");
    }
    const blogImageLocalPath = req.file?.path;

    const blogImage = await uploadOnCloudinary(blogImageLocalPath);

    if (!blogImage) {
        throw new ApiError(500, "something went wrong ");
    }
    const owner = req.user


    const blog = await Blog.create({
        title,
        blogImage: blogImage.url,
        content,
        category,
        owner: owner._id
    })

    if (!blog) {
        throw new ApiError(500, "blog not created something went wrong");
    }

    res.status(200)
        .json(
            new ApiResponse(200, blog, "Blog created succesfully")
        )

})

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id.trim());
    console.log("got blog", blog);

    if (!blog) {
        throw new ApiError(404, "blog not found");
    }

    await blog.deleteOne();

    console.log("blog is deleted")

    res.status(200)
        .json(
            200, {}, "blog deleted succesfully"
        )
})

const getallBlogs = asyncHandler(async (req, res) => {
    const allBlogs = await Blog.find().populate("owner", "name avatar")
    console.log(allBlogs)
    res.status(200)
        .json(
            new ApiResponse(200, allBlogs, "all blogs found")
        )
})

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // console.log(req.body)

    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!blog) {
        throw new ApiError(200, "blog not found")
    }

    res.
        status(200)
        .json(
            new ApiResponse(200, blog, "blog updated")
        )
})

const getSingleBlog = asyncHandler(async (req, res) => {
    const { id } = req.params

    const blog = Blog.findById(id);

    res.status(200)
        .json(
            200, blog, "blog found successfully"
        )
})


export { createBlog, deleteBlog, getallBlogs, updateBlog, getSingleBlog }
