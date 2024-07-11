import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import env from "dotenv";
import createMemoryStore from "memorystore";

// Initialize MemoryStore
const MemoryStore = createMemoryStore(session);

env.config();

// MIDDLEWARE
const middleware = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: ["http://localhost:5173", "https://agromart-delta.vercel.app/"],
      credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 86400000 },
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

export default middleware;
