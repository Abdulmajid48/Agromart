import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import env from "dotenv";
import createMemoryStore from "memorystore";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __filename
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = path.dirname(__filename);

// Initialize MemoryStore
const MemoryStore = createMemoryStore(session);

env.config();

// MIDDLEWARE
const middleware = (app) => {
  // Serve static files from the React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/index.html"));
  });
  app.use(express.static(path.join(__dirname, "client")));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "https://agromart-gamma.vercel.app", //frontend
      credentials: true,
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      allowedHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    })
  );
  app.use(bodyParser.json());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 86400000 },
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 86400000), // 24 hours from now
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

export default middleware;
