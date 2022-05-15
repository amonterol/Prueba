/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: "http://localhost:3000",
    MONGODB_URL:
      "mongodb+srv://braulio:braulio123@cluster0.8lfd5.mongodb.net/pruebaDB?retryWrites=true&w=majority",
    CLOUD_UPDATE_PRESET: "tienda",
    CLOUD_NAME: "abmontero",
    CLOUD_API: "https://api.cloudinary.com/v1_1/abmontero/image/upload",
  },
};

module.exports = nextConfig;
