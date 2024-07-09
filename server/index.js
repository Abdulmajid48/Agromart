import express from "express";
import middleware from "./middleware.js";
import routes from "./routes.js";
import env from "dotenv";

env.config();
// Express JS
const app = express();
// PORT
const port = process.env.PORT;

// MIDDLEWARE
middleware(app);
// ROUTES
routes(app);

// PORT
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
