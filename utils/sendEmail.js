const transporter = require('../config/email');

// Generic email sending function
const sendGenericEmail = async (to, subject, textBody, htmlBody = null) => {
  const fromAddress = process.env.EMAIL_FROM_ADDRESS;
  if (!fromAddress) {
    console.error("CRITICAL: EMAIL_FROM_ADDRESS is not set for generic email. Email will likely fail or be marked as spam.");
    // Consider throwing an error or handling this more gracefully
  }
  try {
   const mailOptions = {
      from: `"BestWorkers" <${fromAddress || 'fallback-noreply@yourdomain.com'}>`,
      to,
      subject,
      text: textBody, // Use textBody passed as argument
    };
    if (htmlBody) {
      mailOptions.html = htmlBody;
    }

    await transporter.sendMail(mailOptions);
    console.log(`Generic Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

// Specific function for sending OTP emails with pre-defined content
const sendOtpEmail = async (to, userName, otpCode) => {
  const subject = `Your BestWorkers Verification Code: ${otpCode}`;
  const currentYear = new Date().getFullYear();
  const fromAddress = process.env.EMAIL_FROM_ADDRESS;

  if (!fromAddress) {
    console.error("CRITICAL: EMAIL_FROM_ADDRESS is not set in .env. OTP Email will likely fail or be marked as spam.");
  }

  // Plain Text Version
  const textContent = `
Hi ${userName || 'User'},

Your verification code for BestWorkers is: ${otpCode}

This code will expire in 5 minutes.

If you did not request this code, please ignore this email.

Thank you,
The BestWorkers Team
© ${currentYear} BestWorkers. All rights reserved.
  `.trim();

  // HTML Version
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your BestWorkers OTP</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 20px; }
        .otp-code { font-size: 28px; font-weight: bold; color: #1a4b8c; text-align: center; margin: 20px 0; padding: 10px; background-color: #e7f0ff; border-radius: 4px; letter-spacing: 2px; }
        .instructions { font-size: 16px; text-align: center; margin-bottom: 15px; }
        .security-note { font-size: 14px; color: #555; text-align: center; margin-top: 20px; }
        .footer { font-size: 12px; color: #777; text-align: center; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>BestWorkers Account Verification</h2>
        </div>
        <p class="instructions">Hi ${userName || 'User'},</p>
        <p class="instructions">Please use the One-Time Password below to complete your verification:</p>
        <div class="otp-code">${otpCode}</div>
        <p class="instructions">This code is valid for 5 minutes.</p>
        <p class="security-note">For your security, do not share this code with anyone. If you did not request this, please disregard this email.</p>
        <div class="footer">
            &copy; ${currentYear} BestWorkers. All rights reserved.
        </div>
    </div>
</body>
</html>
  `.trim();

  try {
    const mailOptions = {
      from: `"BestWorkers" <${fromAddress}>`,
      to,
      subject,
      text: textContent,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('OTP Email could not be sent');
  }
};

module.exports = {
    sendOtpEmail,
    sendGenericEmail // Exporting both, ensure authController uses the correct one
};