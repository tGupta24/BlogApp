import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const generateAccessAndRefereshTokens = async (userId) => {
    console.log("user Id", userId)
    try {
        console.log("User id received to generate token");
        const user = await User.findById(userId)
        console.log("user", user);
        const accessToken = user.generateAccessToken()
        console.log("accessToken Generated");
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const register = asyncHandler(async (req, res) => {
    //1. Take all input from req.body and check all are filled or not
    const { name, email, phoneNumber, education, role, password } = req.body;
    console.log("hi");
    if (!name || !email || !phoneNumber || !education || !role || !password) {
        throw new ApiError(401, "All fields are required");
    }



    //2. if User already exist
    const existedUser = await User.findOne({ email }) //since email is unique
    if (existedUser) {
        throw new ApiError(401, "user already exist with email");
    }


    //3. Take avatar from req.files avatar nam se array hoga
    if (!req.files) {
        throw new ApiError(400, "avatar is not uploaded");
    }
    const avatarLocalPath = req.files?.avatar[0].path;

    console.log(req.files);
    if (!avatarLocalPath) {
        throw new ApiError(402, "avatar file is required");
    }


    //4 uploadOnCloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        throw new ApiError(402, "avatar file is required");
    }
    console.log("uploaded")


    //5. create new User
    const user = await User.create({
        name,
        email,
        phoneNumber,
        avatar: avatar.url,
        education,
        role,
        password   // password hashed before save see in user.model.js

    })


    //check created or not by finding again 
    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    if (!createdUser) {
        throw new ApiError(500, "something went wrong user not created");
    }
    console.log(" user created")


    //send response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

const login = asyncHandler(async (req, res) => {
    // take data from  req.body
    const { email, phoneNumber, password } = req.body

    // check if all correct or not
    if (!password || (!email && !phoneNumber)) {
        throw new ApiError(401, "All fields are required");
    }


    // existedUser 
    const existedUser = await User.findOne(        // ek object uske ander key:value pair  now key is $or and value is array inwhich all object have key jo bhi find karna he
        {
            $or: [{ email }, { phoneNumber }]
        }
    )

    if (!existedUser) {
        throw new ApiError(403, "user is  not registered");
    }

    const isPasswordCorrect = await existedUser.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "entered password is incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(existedUser._id);

    const loggedinUser = await User.findById(existedUser._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedinUser, refreshToken, accessToken
                },
                "User logged  in succesfully"
            )
        )
})

const logout = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true,
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(201)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(201, {}, "user loggedOut succesfully")
        )

})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "Current User Fectched Succecfully")
        )
})

const getAdmins = asyncHandler(async (req, res) => {
    const admins = await User.find({ role: "admin" })

    res
        .status(200)
        .json(
            new ApiResponse(200, admins, "all admins are fetched succesfully")
        )
})

export { register, login, logout, getCurrentUserProfile, getAdmins }
