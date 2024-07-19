import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import bcrypt from "bcrypt";
import db from "./db.js";
import env from "dotenv";

env.config();

// Bcrypt Saltround
const saltRounds = 10;

// Login Users with Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const response = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (response.rows.length > 0) {
        const user = response.rows[0];
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) return done(err);
          if (result) return done(null, user);
          return done(null, false, { message: "Incorrect password" });
        });
      } else {
        return done(null, false, { message: "Incorrect username" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

// Google Authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://agromart-uyly.onrender.com/auth/google/products",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [profile.displayName, profile.email, "google"]
          );
          return done(null, newUser.rows[0]);
        } else {
          return done(null, result.rows[0]);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize and Deserialize Users
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const response = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (response.rows.length > 0) {
      done(null, response.rows[0]);
    } else {
      done(new Error("User not found"));
    }
  } catch (error) {
    done(error);
  }
});

export default passport;
export { register };

// REGISTER NEW USERS
const register = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const response = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (response.rows.length > 0) {
      res.redirect("/login");
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await db.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [fullname, email, hashedPassword]
      );
      const user = result.rows[0];
      req.login(user, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect("/products");
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
