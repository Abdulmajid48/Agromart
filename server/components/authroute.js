import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import bcrypt from "bcrypt";
import db from "./db.js";
import env from "dotenv";

env.config();

// Bcrypt Saltround
const saltRounds = 10;

// Login Users with Local Strategy
passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      // Check for user email
      const response = await db.query(
        "SELECT * FROM users WHERE email = ($1)",
        [username]
      );
      // if email is present
      if (response.rows.length > 0) {
        const user = response.rows[0];
        const storedpassword = user.password;
        bcrypt.compare(password, storedpassword, (err, result) => {
          // Handle bcrypt Error
          if (err) {
            console.error(err);
            return cb(err);
          } else {
            // if password matches
            if (result) {
              return cb(null, user);
              // if password doesnt match
            } else {
              return cb(null, false, { message: "Incorrect password." });
            }
          }
        });
        // if user email doesnt exist
      } else {
        return cb(null, false, { message: "User not found." });
      }
    } catch (error) {
      console.log(error);
    }
  })
);

// REGISTER NEW USERS
const register = async (req, res) => {
  const { fullname, email, password } = req.body;
  // check if email already exist
  try {
    const response = await db.query("SELECT * FROM users WHERE email = ($1)", [
      email,
    ]);
    // if email exist
    if (response.rows[0]) {
      res.redirect("/login");
      // If email doesnt exist
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        // handle bcrypt error
        if (err) {
          console.error(err);
          // Store profile and hash password
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
};

// GOOGLE AUTHENTICATION
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://agromart-uyly.onrender.com/auth/google/products", //backend
    },
    async (accessToken, refreshToken, profile, cb) => {
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
          return cb(null, newUser.rows[0]);
          // if email exist, return user
        } else {
          return cb(null, result.rows[0]);
        }
        // handle error
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// Serialize and deSerialize users
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Export passport and Register USer
export default passport;
export { register };
