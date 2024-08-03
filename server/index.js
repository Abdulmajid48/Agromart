import express from "express";
import allroutes from "./components/routes.js";
import dotenv from "dotenv";
import middleware from "./components/middleware.js";

dotenv.config(); //dotenv

const app = express();
const port = process.env.PORT || 3000; // PORT

// MIDDLEWARE
app.use(middleware);
// Routes
app.use("/", allroutes);

// PORT
app.listen(port, () => {
  console.log(`listening to port ${port}`);
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
app.get("/products", isAuth, (req, res) => {
  console.log("Full session data:", req.session);
  const user = {
    ...req.user,
    isLoggedIn: true,
  };
  console.log(user);
  res.json(user);
});
