import { Router } from "express"
import { upload } from "../middleware/multer.middleware.js";
import {
    createBlog,
    deleteBlog,
    getallBlogs,
    getSingleBlog,
    updateBlog
} from "../controller/blog.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { userVerification } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create-blog").post(upload.single("blogImage"), verifyJWT, userVerification("admin"), createBlog) // create 
router.route("/getallBlogs").get(getallBlogs)



//req.params
router.route("/delete-blog/:id").delete(verifyJWT, userVerification("admin"), deleteBlog) // delete
router.route("/update-blog/:id").put(verifyJWT, userVerification("admin"), updateBlog) // update
// if send formdata from postman use middleware upload.none()

router.route("/getsingleBlog/:id").put(verifyJWT, getSingleBlog);




export default router;