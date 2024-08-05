import express from "express";
import allroutes from "./components/routes.js";
import dotenv from "dotenv";
import middleware from "./components/middleware.js";

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000; // PORT

// MIDDLEWARE
app.use(middleware);
// Routes
app.use(allroutes);

// PORT
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
