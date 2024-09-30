const TelegramBot = require("node-telegram-bot-api");

const { telegram_token, telegram_chat_id, env } = process.env;

let bot;
if (env == "prod") {
  bot = new TelegramBot(telegram_token, { polling: true });
}

const sendTelegramMessage = async (msg) => {
  try {
    if (env == "prod") {
      await bot.sendMessage(telegram_chat_id, msg);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendTelegramMessage };
