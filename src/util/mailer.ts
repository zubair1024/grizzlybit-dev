import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01',
  }),
});

export async function sendContactInfo(
  name: string,
  email: string,
  message: string,
) {
  return transporter.sendMail({
    from: 'za@grizzlybit.dev',
    to: 'zubair1024@gmail.com',
    subject: 'Contact Form',
    text: `
          Name ${name}
          From: ${email}
          message: ${message}
          `,
  });
}
