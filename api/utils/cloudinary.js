import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// Debug logs:
console.log("DEBUG CLOUDINARY ENV:");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded ✔" : "Missing ❌");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filepath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filepath);
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

export default cloudinary;
