import express from "express";
import {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
  getPublicPosts,
  togglePostLikes,
  
} from "../controllers/post.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Hello World");
// });
router.get("/public/", getPublicPosts);

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/:id/likes", togglePostLikes);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
