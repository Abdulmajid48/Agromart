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

// Products Page
router.get("/products", (req, res) => {
  console.log("isAuthenticated:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.json({ isLoggedIn: "user is certified", user: req.user.name });
  } else {
    res.redirect("/login");
  }
});

// Google Authentication
router.get("/auth/google", passport.authenticate("google"));

// Google auth redirect (redirect Callback URL)
router.get(
  "/auth/google/products",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/products");
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
            res.redirect(`${url}/products`);
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
router.post("/login", passport.authenticate("local"), (req, res) => {
  if (!req.user) return res.json({ msg: "error" });
  return res.redirect("/products");
});

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) return next(err);
//     if (!user) return res.status(400).json({ message: info.message });
//     req.logIn(user, (err) => {
//       if (err) return next(err);
//       console.log("isAuthenticated:", req.isAuthenticated());
//       return res.json({ isLoggedIn: true, user });
//     });
//   })(req, res, next);
// });

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/products",
//     failureRedirect: "/login",
//   })
// );

export default router;
