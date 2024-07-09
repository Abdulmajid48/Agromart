// POSTGRESQL DATABASE
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: true, // or ssl: { rejectUnauthorized: false } if you're using self-signed certificates
});

db.connect();

export default db;
