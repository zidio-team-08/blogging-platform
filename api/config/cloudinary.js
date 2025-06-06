import dotenv from 'dotenv';
dotenv.config();


// Cloudinary configuration
const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}

export { cloudinaryConfig };