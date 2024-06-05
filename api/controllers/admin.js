import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  //get post by user id
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, "jwtKey", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      //use knexjs to get all users
      const users = await db("users")
        .select("id", "username", "email", "isAdmin")
        .where("isAdmin", false);

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

export const deleteUser = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, "jwtKey", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = req.params.id;
    console.log(id);

    try {
      await db("users").where("id", id).del();
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

export const getUserPosts = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, "jwtKey", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = req.params.id;

    try {
      const posts = await db("posts").where("uid", id);
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

export const getUser = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, "jwtKey", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = req.params.id;

    try {
      const user = await db("users").where("id", id).first();
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

export const getUserPost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, "jwtKey", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = req.params.id;

    try {
      const post = await db("posts").where("id", id).first();
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
