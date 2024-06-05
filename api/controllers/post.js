import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  //get post by user id
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, "jwtKey", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const posts = await db("posts")
        .where("uid", user.id)
        .where("deleted", false)
        .orderBy("created_at", "desc");
      res.json(posts);
    } catch (err) {
      console.log(err);
    }
  });
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  //use knex js join users and posts table

  try {
    //return number of likes
    const likes = await db("likes").where("post_id", id);

    const post = await db("posts as p")
      .join("users as u", "u.id", "p.uid")
      .where("p.id", id)
      .where("deleted", false)
      .select(
        "p.id",
        "p.title",
        "p.content",
        "p.img as img",
        "p.visibility",
        "p.created_at",
        "u.username",
        "u.img as userImg"
      );
    res.json({
      ...post[0],
      likes: likes.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addPost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, "jwtKey", async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    let { title, content, img, visibility } = req.body;

    img = img || "https://source.unsplash.com/random";

    try {
      await db("posts").insert({
        title,
        content,
        img,
        visibility,
        uid: user.id,
      });
      res.json({ message: "Post added" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

export const deletePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  const postId = req.params.id;

  jwt.verify(token, "jwtKey", async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    try {
      const post = await db("posts").where("id", postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
      if (user.id !== post[0].uid) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // await db("posts").where("id", postId).del();
      //set deleted to true
      await db("posts").where("id", postId).update({ deleted: true });

      res.json({ message: "Post deleted" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

export const updatePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  const postId = req.params.id;
  jwt.verify(token, "jwtKey", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const post = await db("posts").where("id", postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
      if (user.id !== post[0].uid) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      await db("posts").where("id", postId).update(req.body);
      res.json({ message: "Post updated" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

export const getPublicPosts = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, "jwtKey", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = user.id;

    try {
      const posts = await db("posts as p")
        .leftJoin("users as u", "u.id", "p.uid")
        .leftJoin("likes as l", "l.post_id", "p.id")
        .where("p.visibility", "public")
        .where("p.deleted", false)
        .groupBy("p.id", "u.id")
        .orderBy("p.created_at", "desc")
        .select(
          "p.id",
          "p.title",
          "p.content",
          "p.img as img",
          "p.visibility",
          "p.created_at",
          "u.username",
          "u.img as userImg",
          db.raw("COUNT(l.id) as likeCount"),
          db.raw(
            `EXISTS (
                    SELECT 1 
                    FROM likes 
                    WHERE likes.post_id = p.id 
                    AND likes.user_id = ?
                  ) as isLikedByUser`,
            [userId]
          )
        );

      // Return the combined response
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
    }
  });
};

export const togglePostLikes = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, "jwtKey", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = user.id;
    const postId = req.params.id;

    try {
      // Check if the post exists
      const post = await db("posts").where("id", postId);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      // Check if the user has already liked the post
      const existingLike = await db("likes")
        .where({ user_id: userId, post_id: postId })
        .first();

      if (existingLike) {
        // If like exists, unlike the post
        await db("likes").where({ user_id: userId, post_id: postId }).del();
        return res.status(200).json({ message: "Post unliked successfully" });
      } else {
        // If like doesn't exist, like the post
        await db("likes").insert({ user_id: userId, post_id: postId });
        return res.status(200).json({ message: "Post liked successfully" });
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};
