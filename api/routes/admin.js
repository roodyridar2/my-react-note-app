import express from "express";
import { getUsers, deleteUser, getUserPosts,getUser,getUserPost } from "../controllers/admin.js";

const router = express.Router();

router.get("/all-users/", getUsers);
router.delete("/delete-user/:id", deleteUser);

router.get("/userPosts/:id", getUserPosts);
router.get("/userPost/:id", getUserPost);

router.get("/user/:id", getUser);
// router.post("/:id/likes", togglePostLikes);
// router.post("/", addPost);
// router.put("/:id", updatePost);

export default router;
