/**
 * The resource to send email
 */

import nodemailer from 'nodemailer';
import { defineEventHandler } from "h3";

interface EmailRequestBody {
  subject: string;
  text: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<EmailRequestBody>(event); //Parse html body

  //Init nodemailer with source email information
  const transporter = nodemailer.createTransport({
    service: "Outlook365",
    auth: {
      user: "SekiShohei@outlook.com",
      pass: "04dP13dms2021chl",
    },
  });

  //Set credential of source mail to value
  const mailOptions = {
    from: "SekiShohei@outlook.com",
    to: "DEVSWORLD36428@GMAIL.COM",
    subject: body.subject,
    text: body.text,
  };

  try {
    await transporter.sendMail(mailOptions);  //Send email
    return { success: true, message: "Email sent successfully!" };  //Send response when success
  } catch (error) {
    if (error instanceof Error) {
      // This ensures `error` is of type `Error` and has a `message` property
      return { success: false, message: error.message };
    } else {
      // Fallback in case `error` is not of type `Error`
      return { success: false, message: "An unknown error occurred." };
    }
  }
});