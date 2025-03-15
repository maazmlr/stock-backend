import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log(
  process.env.EMAIL_PASS,
  process.env.EMAIL_PORT,
  process.env.EMAIL_USER,
  process.env.EMAIl_HOST
);
const transporter = nodemailer.createTransport({
  host: process.env.EMAIl_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ email: to, subject, message: text }) => {
  console.log(to, "i amamam");
  try {
    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log("Email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
export default sendEmail;
