import clientPromise from "@/lib/mongodb";
import axios from "axios";
import { existsSync, mkdirSync } from "fs";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Ensure the uploads directory exists
const uploadDir = "./public/uploads";
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 40 } });
const uploadMiddleware = upload.single("image");

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const contentType = req.headers["content-type"] || "";
  if (!contentType.startsWith("multipart/form-data"))
    return res.status(400).json({ error: `Internal Server Error` });
  try {
    // Run multer middleware
    await runMiddleware(req, res, uploadMiddleware);

    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `/uploads/${file.filename}`;

    const newImage = {
      filename: file.filename,
      path: filePath,
      originalName: file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      createdAt: new Date(),
    };

    const protocol =
      req.headers["x-forwarded-proto"] ||
      (req.connection.encrypted ? "https" : "http");

    const host = req.headers["host"];

    const response = await axios.post(
      `${protocol}://${host}/api/uploadEntry`,
      newImage
    );

    if (!response.data.movie.acknowledged) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    return res
      .status(200)
      .json({ message: "Image uploaded successfully", file: newImage });
  } catch (error) {
    console.log(error, ":::");
    return res.status(500).json({ message: "Error uploading image" });
  }
}
