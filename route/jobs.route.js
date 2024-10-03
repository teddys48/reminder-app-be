const { Router } = require("express");
const route = Router();
const controller = require("../controller/jobs.controller");
const { default: axios } = require("axios");
const pusher = require("../helper/pusher");
const { sendMail } = require("../helper/mail");
const { sendTelegramMessage } = require("../helper/telegram");

route.post("/jobs/add", controller.addJobs);
route.post("/jobs/delete", controller.deleteJobs);

route.get("/test/:id", async (req, res) => {
  let { id } = req.params;

  await pusher.trigger("reminder", "done", Number(id), () => {
    console.log("trigger success");
  });
  await sendMail("test");
  await sendTelegramMessage("test");

  res.json("a");
});

route.get("/mail", async (req, res) => {
  try {
    await sendMail("test");
    console.log("success send mail");
  } catch (error) {
    console.log("fail send mail ", error.message);
  }

  res.json("done");
});

route.get("/tele", async (req, res) => {
  try {
    await sendTelegramMessage("test");
    console.log("success send telegram");
  } catch (error) {
    console.log("fail send telegram ", error.message);
  }

  res.json("done");
});

module.exports = route;
