import express from "express";
import middleware from "./components/middleware.js";
import routes from "./components/routes.js";
import env from "dotenv";

env.config();
// Express JS
const app = express();
// PORT
const port = process.env.PORT || 3000;

// MIDDLEWARE
middleware(app);
// ROUTES
routes(app);

// PORT
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
