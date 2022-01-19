import express from "express";
import path from "path";

import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";

import router from "./routes/questions.js";
import { application_name } from "pg/lib/defaults";

const app = express();

// var corsOptions = {
//   origin: 'https://cranky-benz-c47f20.netlify.app/',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://cranky-benz-c47f20.netlify.app/"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET");
});
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", router);

app.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: "We couldn't find what you were looking for 😞" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

export default app;
