// c:\Users\kd1812\Desktop\BW NEW\BestWorkers_Server\config\email.js
const nodemailer = require('nodemailer');

if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.error("FATAL ERROR: SMTP credentials (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS) are not defined in .env file.");
  // Consider exiting the process if these are critical: process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_PORT === '465', // true for port 465 (SSL), false for 587 (TLS)
  auth: {
    user: process.env.SMTP_USER, // should be support@bestworkers.services
    pass: process.env.SMTP_PASS, // should be XYZbestworker321@
  },
});

module.exports = transporter;

