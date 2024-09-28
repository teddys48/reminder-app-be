const helper = require("../helper/helper");
const moment = require("moment");
const cron = require("node-cron");
const pusher = require("../helper/pusher");
const { sendMail } = require("../helper/mail");
var cronData = [];

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
      // cron.schedule(cronJob, async () => {
      //   console.log("first");
      //   pushTrigger(element.id);
      // });

      element.cron = cronJob;

      cronData.push(element);
    }

    await addToCron();
    await scheduleDelete()

    return helper.buildResponse(0, "success", null);
  } catch (error) {
    return helper.buildResponse(500, error, null);
  }
};

const pushTrigger = async (data) => {
  await pusher.trigger("reminder", "done", data, () => {
    console.log("trigger success");
  });
};

const addToCron = async () => {
  // console.log("cek cron data", cronData);
  for (const element of cronData) {
    cron.schedule(element.cron, async () => {
      console.log("first");
      pushTrigger(element.id);
      await sendMail(element.name);
    });
  }
};

const scheduleDelete = async () => {};
cron.schedule("* * * * *", () => {
  // console.log("cron running", cronData);
  for (const element of cronData) {
    if (
      moment()
        .format("YYYY-MM-DD HH:mm:ss")
        .isAfter(moment(element.time, "YYYY-MM-DD HH:mm:ss"))
    ) {
      console.log("deleting", element.id);
      delete element;
    }
    console.log("after delete", cronData);
  }
});

module.exports = { addJobs };
