const helper = require("../helper/helper");
const moment = require("moment");
const cron = require("node-cron");
const pusher = require("../helper/pusher");
const { sendMail } = require("../helper/mail");
const { sendTelegramMessage } = require("../helper/telegram");
var cronData = [];

const addJobs = async (req) => {
  try {
    let { data } = req.body;
    console.log("first", data, moment().format("YYYY-MM-DD HH:mm:ss"));
    for (const element of data) {
      date = moment(element.time, "YYYY-MM-DD HH:mm:ss");
      let minutes = date.minute();
      let hour = date.hours();
      let day = date.date();
      let month = date.month() + 1;
      let dayOfWeek = date.days();

      let cronJob = `${minutes} ${hour} ${day} ${month} ${dayOfWeek}`;

      console.log(minutes, hour, day, month, dayOfWeek);

      element.cron = cronJob;

      cronData.push(element);
    }

    await addToCron();

    return helper.buildResponse(0, "success", null);
  } catch (error) {
    return helper.buildResponse(500, error.message, null);
  }
};

const pushTrigger = async (data) => {
  await pusher.trigger("reminder", "done", data, () => {
    console.log("trigger success");
  });
};

const addToCron = async () => {
  // console.log("cek cron data", cronData);
  // try {
  for (const element of cronData) {
    cron.schedule(element.cron, async () => {
      console.log("first");
      pushTrigger(element.id);
      await sendMail(element.name);
      await sendTelegramMessage(element.name);
    });
  }
  // } catch (error) {
  //   console.log("error cron", error.message);
  // }
};

cron.schedule("0 1 * * *", () => {
  try {
    console.log("cron running", cronData);
    for (let index = 0; index < cronData.length; index++) {
      console.log(
        "first run",
        moment(cronData[index].time, "YYYY-MM-DD HH:mm:ss")
      );
      if (
        moment().isAfter(moment(cronData[index].time, "YYYY-MM-DD HH:mm:ss"))
      ) {
        cronData.splice(index, 1);
      }
      console.log("after delete", cronData);
    }
  } catch (error) {
    console.log("cron error delete", error.message);
  }
});

const deleteJobs = async (req) => {
  let response;
  try {
    let { id } = req.body;
    for (let index = 0; index < cronData.length; index++) {
      if (id == cronData[index].id) {
        cronData.splice(index, 1);
      }
      console.log("after delete", cronData);
    }
    await addToCron();

    response = helper.buildResponse(0, "success", null);
  } catch (error) {
    console.log(error);
    response = helper.buildResponse(500, error.message, null);
  }

  return response;
};

module.exports = { addJobs, deleteJobs };
