import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import env from "dotenv";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

// Initialize client.
let redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

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
      store: redisStore,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

export default middleware;
