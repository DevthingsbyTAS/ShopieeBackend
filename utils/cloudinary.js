const cloudinary = require("cloudinary"); // Import
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  apii_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudinaryUploadingImg = async (filetoUpload) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(filetoUpload, (result) => {
      resolve(
        {
          url: result.secure_url,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};
module.exports = cloudinaryUploadingImg;
