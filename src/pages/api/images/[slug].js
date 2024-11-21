import path from "path";
import fs from "fs";

export default async function handler(req, res) {
  const { slug } = req.query;

  const imagePath = path.join(process.cwd(), "public", "uploads", slug);
  try {
    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);

      const ext = path.extname(slug).toLowerCase();
      const mimeTypes = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".svg": "image/svg+xml",
      };

      res.setHeader(
        "Content-Type",
        mimeTypes[ext] || "application/octet-stream"
      );

      res.status(200).send(imageBuffer);
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
