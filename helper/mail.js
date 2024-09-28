const nodemailer = require("nodemailer");
const {
  email_password,
  email_user,
  email_client_id,
  email_client_secret,
  email_refresh_token,
} = process.env;

console.log("cek email conf", email_password, email_user);
const transporter = nodemailer.createTransport({
  service: "gmail",
  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
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
    from: email_user,
    to: "ziusesan@gmail.com",
    subject: "REMINDER",
    text: text,
  };
  console.log("cek option mail", mailOptions, email_user, email_password);
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("email status", info.response);
    }
  });
};

module.exports = { sendMail };
