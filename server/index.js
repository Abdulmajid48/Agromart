import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import env from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.session());
app.use(passport.initialize());

// POSTGRESQL DATABASE
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_NAME,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

// Register new User
app.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const response = await db.query("SELECT * FROM users WHERE email = ($1)", [
      email,
    ]);
    const checkemail = response.rows[0];
    console.log(checkemail);
    if (checkemail) {
      res.json({ userexist: "user already exist" });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error(err);
        } else {
          const result = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [fullname, email, hash]
          );
          res.send("save");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/aboutus",
    failureRedirect: "/login",
  })
);

passport.use(
  new Strategy(async function verify(email, password, cd) {
    try {
      const response = await db.query(
        "SELECT * FROM users WHERE email = ($1)",
        [email]
      );
      const checkemail = response.rows[0];
      console.log(checkemail);

      if (checkemail) {
        const storedpassword = checkemail.password;
        bcrypt.compare(password, storedpassword, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            if (result) {
              res.json({ login: "login" });
            } else {
              res.send("incorrect password");
            }
          }
        });
      } else {
        res.send("no user found");
      }
    } catch (error) {
      console.log(error);
    }
  })
);
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
