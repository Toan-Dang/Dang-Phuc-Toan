import dotenv from "dotenv";
dotenv.config();

const config = {
  postgres: {
    "database": process.env.DB,
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
  },
  gemini: {
    "api_key": process.env.API_KEY,
  },
};

export default config;
