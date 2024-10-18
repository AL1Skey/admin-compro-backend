// src/utils/email.ts
import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';

configDotenv();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendResetEmail = async(email: string, token: string) => {
  const resetUrl = `${process.env.API_URL}/${token}`;
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    text: `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}`,
  };
  console.log('sending email');
  await transporter.sendMail(mailOptions);
  return true;
};

export default sendResetEmail;
