const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const sendgridMail = require("@sendgrid/mail");
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateOTP = async (req, res, next) => {
  try {
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const hashedOtp = await bcrypt.hash(otp, 10);

    const isProduction = process.env.ENVIRONMENT == "production";
    res.cookie("otp", hashedOtp, {
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction,
      maxAge: 5 * 60 * 1000,
    });

    const { email } = req.query;

    const emailMessage = {
      to: email,
      from: {
        email: "ialjagal@krishnatherokar.freewebhostmost.com",
        name: "Authentication",
      },
      subject: `Your verification code: ${otp}`,
      html: `<div style="text-align: center;"><p>Use the code below to verify your account. This code is valid for 5 minutes.</p><h1>${otp}</h1><p>If you didn’t request this, please ignore this email.</p><small>If you don't wish to receive these emails, you can <a href="https://krishnatherokar.freewebhostmost.com/unsubscribe">unsubscribe</a>.</small><p class="footer"></div>`,
    };

    await sendgridMail.send(emailMessage);
    res.send("OTP sent");
  } catch (error) {
    next(error);
  }
};

module.exports = generateOTP;
