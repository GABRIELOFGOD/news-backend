import { config } from 'dotenv';

config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

export const { 
  PORT,
  NODE_ENV,
  DB_URL,
  JWT_SECRET, JWT_EXPIRES_IN,
  CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET,
  DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
} = process.env;
