const helper = require("../helper/helper");
const moment = require("moment");
const cron = require("node-cron");
const pusher = require("../helper/pusher");

const addJobs = async (req) => {
  try {
    let { data } = req.body;
    console.log("first", data);
    for (const element of data) {
      date = moment(element.time, "YYYY-MM-DD HH:mm:ss");
      let minutes = date.minute();
      let hour = date.hours();
      let day = date.date();
      let month = date.month() + 1;
      let dayOfWeek = date.days();

      let cronJob = `${minutes} ${hour} ${day} ${month} ${dayOfWeek}`;

      console.log(minutes, hour, day, month, dayOfWeek);
      await cron.schedule(cronJob, async () => {
        console.log("first");
        pushTrigger(data.id);
      });
    }

    return helper.buildResponse(0, "success", null);
  } catch (error) {
    return helper.buildResponse(500, error, null);
  }
};

const pushTrigger = async (data) => {
  await pusher.trigger("reminder", "done", "done", () => {
    console.log("trigger success");
  });
};

module.exports = { addJobs };
