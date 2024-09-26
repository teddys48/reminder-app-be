const helper = require("../helper/helper");
const moment = require("moment");
const cron = require("node-cron");

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
      cron.schedule(cronJob, () => {
        console.log("first");
      });
    }

    return helper.buildResponse(0, "success", null);
  } catch (error) {
    return helper.buildResponse(500, error, null);
  }
};

module.exports = { addJobs };
