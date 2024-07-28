// import express from "express";
// import middleware from "./components/middleware.js";
// import routes from "./components/routes.js";
// import env from "dotenv";

// env.config();
// // Express JS
// const app = express();
// // PORT
// const port = process.env.PORT || 3000;

// // MIDDLEWARE
// middleware(app);
// // ROUTES
// routes(app);

// // PORT
// app.listen(port, () => {
//   console.log(`listening to port ${port}`);
// });

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import env from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 10;
import createMemoryStore from "memorystore";

// Initialize MemoryStore
const MemoryStore = createMemoryStore(session);

env.config();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "https://agromart-gamma.vercel.app",
    credentials: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },

    expires: new Date(Date.now() + 86400000), // 24 hours from now
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  })
);
app.use(passport.session());
app.use(passport.initialize());

// POSTGRESQL DATABASE
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: true, // or ssl: { rejectUnauthorized: false } if you're using self-signed certificates
});

db.connect();

app.get("/login", (req, res) => {
  res.json({ hello: "hello" });
});
// Logout page
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/products", (req, res) => {
  console.log("isAuthenticated:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.json({ isLoggedIn: "user is certified", user: req.session.user });
  } else {
    res.redirect("/login");
  }
});
// Google Auth
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
// Google auth redirect
app.get(
  "/auth/google/products",
  passport.authenticate("google", {
    successRedirect: "/products",
    failureRedirect: "/login",
  })
);
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/products",
    failureRedirect: "/login",
  })
);

passport.use(
  "local",
  new Strategy(async (username, password, done) => {
    try {
      const response = await db.query(
        "SELECT * FROM users WHERE email = ($1)",
        [username]
      );

      if (response.rows.length > 0) {
        const user = response.rows[0];
        const storedpassword = user.password;
        bcrypt.compare(password, storedpassword, (err, result) => {
          if (err) {
            console.error(err);
            return done(err);
          } else {
            if (result) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password." });
            }
          }
        });
      } else {
        return done(null, false, { message: "User not found." });
      }
    } catch (error) {
      console.log(error);
    }
  })
);
// Register new User
app.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const response = await db.query("SELECT * FROM users WHERE email = ($1)", [
      email,
    ]);

    if (response.rows[0]) {
      res.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error(err);
        } else {
          const result = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [fullname, email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/products");
          });
        }
      });
    }
    // handle error
  } catch (error) {
    console.log(error);
  }
});

// GOOGLE AUTHENTICATION
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://agromart-uyly.onrender.com/auth/google/products",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if email already exist
        console.log(profile);
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        // if doesnt email exist
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [profile.name, profile.email, "google"]
          );
          return done(null, newUser.rows[0]);
          // if email exist, return user
        } else {
          return done(null, result.rows[0]);
        }
        // handle error
      } catch (err) {
        return done(err);
      }
    }
  )
);
// Serialize and deSerialize users
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
