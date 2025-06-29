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
};
