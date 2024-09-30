const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jobsRoute = require("./route/jobs.route");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Credentials",
    ],
    credentials: true,
  })
);
app.use(express.json());

const port = process.env.port;

app.get("/", (req, res) => {
  res.json("Welcome!");
});

app.use("/api", jobsRoute);

app.listen(port, () => {
  console.log("app run at port " + port);
});
