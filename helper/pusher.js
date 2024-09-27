const Pusher = require("pusher");
require("dotenv").config();

const { pusher_app_id, pusher_key, pusher_secret, pusher_cluster } =
  process.env;

const pusher = new Pusher({
  appId: pusher_app_id,
  key: pusher_key,
  secret: pusher_secret,
  cluster: pusher_cluster,
  useTLS: true,
});

module.exports = pusher;
