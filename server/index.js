import express from "express";
import middleware from "./middleware.js";
import routes from "./routes.js";

// Express JS
const app = express();
// PORT
const port = 3000;

// MIDDLEWARE
middleware(app);
// ROUTES
routes(app);

// PORT
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
