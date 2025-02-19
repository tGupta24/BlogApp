import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

    api_key: process.env.CLOUDNARY_API_KEY,

    api_secret: process.env.CLOUDNARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("::PLEASE PROVIDE A LOCALFILEPATH!!!")
            return null
        }
        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"   // images( .png, .jpg) , videos(.mp4), raw(.pdf)  auto me auto detect
        })

        // file has been uploaded
        fs.unlinkSync(localFilePath)
        console.log("YOUR FILE IS UPLOADED ON CLOUDINARY::", response.url);
        return response;

    } catch (err) {
        fs.unlinkSync(localFilePath) // sync mtlab ye hona hi chahiye
        //remove locally saved temp file as the upload ops got failed
        console.log("FILE UPLOAD OPERATION GOT FAILED::", err);
        return null
    }
}


export default uploadOnCloudinary