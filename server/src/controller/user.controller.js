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
    // 1. Get input fields from req.body
    const { name, email, phoneNumber, role, password } = req.body;

    if (!name || !email || !phoneNumber || !role || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // 2. Check if the user already exists
    const existedUser = await User.findOne(

        {
            $or: [{ email, phoneNumber }]
        },

    );
    if (existedUser) {
        throw new ApiError(400, "User already exists with this email or phoneNumber");
    }



    // 3. Validate file upload
    console.log(req.files.avatar)
    if (!req.files || Object.keys(req.files).length === 0) {   // Object.keys(req.files).length === 0;
        throw new ApiError(400, "Avatar is required");
    }

    const avatarLocalPath = req.files.avatar[0].path;

    // 4. Upload image to Cloudinary (if needed)
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
        throw new ApiError(500, "Error uploading avatar");
    }

    // 5. Create the user
    const user = await User.create({
        name,
        email,
        phoneNumber,
        avatar: avatar.url,
        role,
        password
    });

    // 6. Send response
    return res.status(201).json(new ApiResponse(201, user, "User registered successfully"));
});

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
        throw new ApiError(403, "user is not registered");
    }

    const isPasswordCorrect = await existedUser.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "username or password is incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(existedUser._id);

    const loggedinUser = await User.findById(existedUser._id).select("-password -refreshToken")

    const options = {
        httpOnly: false,
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
        secure: true,  // Use true if deployed with HTTPS, false for local development
        sameSite: "None"  // Must be "None" for cross-origin cookies
    };


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

const resetPassword = asyncHandler(async (req, res) => {
})

export { register, login, logout, getCurrentUserProfile, getAdmins }
