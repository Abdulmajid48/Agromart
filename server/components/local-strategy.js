import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import db from "./db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config(); // dotenv

passport.use(
  "local",
  new Strategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        //check if email exist
        const response = await db.query(
          "SELECT * FROM users WHERE email = ($1)",
          [email]
        );
        //compare password if it exist
        if (response.rows.length > 0) {
          const user = response.rows[0];
          const storedpassword = user.password;
          bcrypt.compare(password, storedpassword, (err, result) => {
            if (err) {
              console.error(err);
              return done(err);
            } else {
              if (result) {
                //if password match
                return done(null, user, { message: "verified user" });
              } else {
                //if password doesnt match
                return done(null, false, { message: "Incorrect password." });
              }
            }
          });
        } else {
          //if email doesnt exist
          return done(null, false, { message: "User not found." });
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);
// GOOGLE AUTHENTICATION
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://agromart-uyly.onrender.com/auth/google/products",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const account = profile._json;
      try {
        // Check if email already exist
        console.log(account);
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          account.email,
        ]);
        // if email doesnt exist
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [account.name, account.email, "google"]
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
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = ($1)", [email]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      done(null, user);
    } else {
      done(new Error("User not found"));
    }
  } catch (err) {
    done(err);
  }
});

export default passport;
