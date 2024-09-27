const { Router } = require("express");
const route = Router();
const controller = require("../controller/jobs.controller");
const { default: axios } = require("axios");
const pusher = require("../helper/pusher");

route.post("/jobs/add", controller.addJobs);
route.get("/test/", async (req, res) => {
  //   await axios
  //     .get("http://localhost:3000/update/1")
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((err) => {
  //       res.json(err);
  //     });
  // let a = await fetch("http://localhost:3000/update/1");
  // a.status
  await pusher.trigger("reminder", "done", 1727423531, () => {
    console.log("trigger success");
  });
  res.json("a");
});

module.exports = route;
