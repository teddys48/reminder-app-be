const { Router } = require("express");
const route = Router();
const controller = require("../controller/jobs.controller");
const { default: axios } = require("axios");
const pusher = require("../helper/pusher");
const { sendMail } = require("../helper/mail");

route.post("/jobs/add", controller.addJobs);
route.get("/test/:id", async (req, res) => {
  let { id } = req.params;

  await pusher.trigger("reminder", "done", Number(id), () => {
    console.log("trigger success");
  });
  await sendMail("test");

  res.json("a");
});

route.get("/mail", async (req, res) => {
  let resp = await sendMail("test");

  res.json(resp);
});

module.exports = route;
