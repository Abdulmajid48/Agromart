import passport from "./authroute.js";
import { register } from "./authroute.js";
import env from "dotenv";

env.config();

const routes = (app) => {
  // Rerender login page
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

  // Products page
  app.get("/products", (req, res) => {
    console.log("isAuthenticated:", req.isAuthenticated());
    if (req.isAuthenticated()) {
      res.json({ isLoggedIn: "user is certified", user: req.user });
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
      successRedirect: "https://agromart-gamma.vercel.app/products", // "/products
      failureRedirect: "/login",
    })
  );

  // Register route
  app.post("/register", register);

  // login route
  app.post(
    "/login",
    passport.authenticate("local",  (req, res, next) => {
      // Log the received username and password
      console.log("Received Username:", req.body.username);
      console.log("Received Password:", req.body.password);
      next();
    }, {
      successRedirect: "/products",
      failureRedirect: "/login",
    })
  );
};

export default routes;
