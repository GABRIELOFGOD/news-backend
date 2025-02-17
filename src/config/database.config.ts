import mysql from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "./env";

const dbConfig = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    console.log("DATABASE CONNECTED SUCCESSFULLY");
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

export default dbConfig;
