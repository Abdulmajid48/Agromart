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

  // products page
  app.get("/products", (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ isLoggedIn: "user is certified", user: req.user });
    } else {
      res.redirect("/login");
    }
  });

  // google Auth
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // google auth redirect
  app.get(
    "/auth/google/products",
    passport.authenticate("google", {
      successRedirect: "https://agromart-gamma.vercel.app/products", //"/products
      failureRedirect: "/login",
    })
  );

  // register route
  app.post("/register", register);

  // login route
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/products",
      failureRedirect: "/login",
    })
  );
};
export default routes;
