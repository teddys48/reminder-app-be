const nodemailer = require("nodemailer");
const {
  email_password,
  email_user,
  email_client_id,
  email_client_secret,
  email_refresh_token,
} = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: email_user,
    pass: email_password,
    clientId: email_client_id,
    clientSecret: email_client_secret,
    refreshToken: email_refresh_token,
  },
});

const sendMail = async (text) => {
  let mailOptions = {
    from: "REMINDER APP " + "<" + email_user + ">",
    to: "ziusesan@gmail.com",
    subject: "REMINDER",
    text: text,
  };
  console.log("cek option mail", mailOptions, email_user, email_password);
  await transporter
    .sendMail(mailOptions)
    .then((data) => {
      console.log("email status", data.response);
    })
    .catch((err) => {
      console.log("email err", err);
    });
};

module.exports = { sendMail };
