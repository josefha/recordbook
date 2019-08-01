// using Twilio SendGrid's v3 Node.js Library
require("dotenv").config();
const sgMail = require("@sendgrid/mail");

module.exports = function sendEmail() {
  console.log("Calling mailing service");

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "josefha@live.se",
    from: "info@gmail.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>"
  };
  sgMail.send(msg);
};
