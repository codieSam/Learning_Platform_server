import { config } from "dotenv";
config();

export const envConfig = {
  portNumber: process.env.PORT || 3001,

  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  // dbDialect: process.env.DB_DIALECT,

  jwtSecret: process.env.JWT_SECRET,

  cloudinaryCloudName : process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey : process.env.CLOUDINARY_API_KEY,
  cloudinarySecretKey: process.env.CLOUDINARY_SECRET_KEY,
  

  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS
};
