import express from "express";
import upload from "../utils/upload.js";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

// POST /api/upload-images
router.post("/", upload.single("images"), async (req, res) => {
  console.log("🔥 Inside Upload Route");
  console.log("File received:", req.file);

  try {
    if (!req.file) {
      console.log("❌ No file received");
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    console.log("☁️ Uploading to Cloudinary...");
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "mern_estate",
      resource_type: "image",
    });

    console.log("✅ Cloudinary Upload Success:", result.secure_url);

    return res.json({
      success: true,
      url: result.secure_url,
    });

  } catch (error) {
    console.log("❌ Cloudinary Error:", error);
    res.status(500).json({
      success: false,
      message: "Cloudinary upload error",
    });
  }
});

export default router;
