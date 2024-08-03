import express from "express";
import db from "./db.js";
import passport from "passport";
import bcrypt from "bcrypt";
import env from "dotenv";
import "./local-strategy.js";

const router = express.Router();
const saltRounds = 10;
env.config(); //dotenv
const url = process.env.FRONTEND;

// Login page GET
router.get("/login", (req, res) => {
  res.json({ getloginpage: true });
});

// Logout page
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ gethomepage: true });
  });
});

// Google Authentication
router.get("/auth/google", passport.authenticate("google"));

// Google auth redirect (redirect Callback URL)
router.get(
  "/auth/google/products",
  passport.authenticate("google", { session: true }),
  (req, res) => {
    res.redirect(`${url}/products`);
  }
);

// Register new User
router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    //check if email exists
    const response = await db.query("SELECT * FROM users WHERE email = ($1)", [
      email,
    ]);
    if (response.rows[0]) {
      res.json({ msg: "email already exist, proceed to login page" }); //redirect to login page if email exist
    } else {
      //hash password with bcrypt if email doesnt exist
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error(err);
        } else {
          const result = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [fullname, email, hash]
          );
          const user = result.rows[0];
          // login User
          req.login(user, (err) => {
            console.log("sucess");
            return res.json({
              isLoggedIn: "user is certified",
              user: req.user.name,
            });
          });
        }
      });
    }
    // handle error
  } catch (error) {
    console.log(error);
  }
});

// Login Users
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Authentication failed
      return res.status(401).json({ msg: info.message || "Login failed" });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      // Authentication successful
      return res.json({ isLoggedIn: "user is certified", user: req.user.name });
    });
  })(req, res, next); // Don't forget to invoke the middleware
});

const isAuth = (req, res, next) => {
  console.log("isAuth middleware called");
  console.log("req.user:", req.user);
  if (req.user) {
    return next();
  }
  return res.status(401).json({ isLoggedIn: false });
};
// Products Page
router.get("/products", isAuth, (req, res) => {
  console.log("Full session data:", req.session);
  const user = {
    ...req.user,
    isLoggedIn: true,
  };
  console.log(user);
  res.json(user);
});

export default router;
