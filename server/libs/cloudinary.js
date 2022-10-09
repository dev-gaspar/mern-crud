import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dxuauzyp9",
  api_key: "141155625795838",
  api_secret: "LqnUvpCwr1i0aBeVeXeGSvYLrhI",
});

export const uploadImage = async (filePath) => {
  return await cloudinary.v2.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.v2.uploader.destroy(id);
};
