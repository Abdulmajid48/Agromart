import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import env from "dotenv";
import db from "./db.js";
import connectPgSimple from "connect-pg-simple";
import cookieParser from "cookie-parser";

const router = express.Router();
// Initialize PgSession
const PgSession = connectPgSimple(session);

env.config();

// MIDDLEWARE
router.use(bodyParser.urlencoded({ extended: true }));
router.use(
  cors({
    origin: "https://agromart-roan.vercel.app",
    credentials: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);
router.use(express.json());
router.use(cookieParser(process.env.SESSION_SECRET));
router.use(
  session({
    store: new PgSession({
      pool: db,
      tableName: "session", // You can customize the session table name
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
      sameSite: " lax",
      httpOnly: true,
      secure: true,
    },

    expires: new Date(Date.now() + 86400000), // 24 hours from now
  })
);
router.use(passport.session());
router.use(passport.initialize());

export default router;
