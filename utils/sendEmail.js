import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: process.env.SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.SMTP_USER}>`,
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
