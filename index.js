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

// io = socket(server, {
//   cors: {
//     origin: "*",
//     methods: "*",
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "X-Requested-With",
//       "Accept",
//       "Origin",
//       "Access-Control-Allow-Origin",
//       "Access-Control-Allow-Headers",
//       "Access-Control-Allow-Methods",
//       "Access-Control-Allow-Credentials",
//     ],
//     withCredentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log(socket.id);
//   const id = socket.handshake.query.id;
//   socket.join(id);

//   var cronData = [];
//   socket.on("job", (data, callback) => {
//     console.log(data);
//     cronData = data;
//     // callback("on");
//     console.log("xzxzx", cronData);

//     for (const element of cronData) {
//       date = moment(element.time, "YYYY-MM-DD HH:mm:ss");
//       let minutes = date.minute();
//       let hour = date.hours();
//       let day = date.date();
//       let month = date.month() + 1;
//       let dayOfWeek = date.days();

//       let cronJob = `${minutes} ${hour} ${day} ${month} ${dayOfWeek}`;

//       console.log(minutes, hour, day, month, dayOfWeek);
//       cron.schedule(cronJob, () => {
//         console.log("first");
//         socket.emit("finish", element.id);
//       });
//     }
//   });

//   socket.on("disconnected", (data) => {
//     console.log("socket disconnected");
//   });
// });
