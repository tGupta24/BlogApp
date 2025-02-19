import { Router } from "express"
import { upload } from "../middleware/multer.middleware.js"
import { login, register, logout, getCurrentUserProfile, getAdmins } from "../controller/user.controller.js"

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", upload.fields([
    {
        name: "avatar", maxCount: 1
    }
]), register)


router.post("/login", login);
router.post("/logout", verifyJWT, logout);
router.get("/my-profile", verifyJWT, getCurrentUserProfile);
router.get("/all-Admins", verifyJWT, getAdmins);

export default router;
