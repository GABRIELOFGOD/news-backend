import cloudinary from "../config/cloudinary";

export const uploadImageToCloudinary = async (file: any): Promise<string> => {
  if (!file) {
    throw new Error("No image provided");
  }

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (error: any, result: { secure_url: string }) => {
      if (error) {
        console.log("Cloudinary upload error", error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

  return result.secure_url;
};