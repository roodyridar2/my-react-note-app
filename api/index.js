import express from "express";
import cors from "cors";
import postsRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
// ------------------------------
const app = express();

//make uploads folder static and public link
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// const upload = multer({ dest: "uploads/" });
// app.post(
//   "/api/uploads",
//   upload.single("file"),
//    function (req, res) {
//     const file =  req.file;
//     try {
//       res.status(200).json(file.filename);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const upload = multer({ dest: "uploads/" });

app.post("/api/uploads", upload.single("file"), function (req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;
    res.status(200).json(file.filename);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use("/api/posts", postsRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
