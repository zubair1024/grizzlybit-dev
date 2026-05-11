import AWS from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer';

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;
  const ses = new AWS.SES({
    apiVersion: '2010-12-01',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  cachedTransporter = nodemailer.createTransport({ SES: ses });
  return cachedTransporter;
}

// Defense in depth — strip CR/LF on header-bound fields again
const safeHeader = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

export async function sendContactInfo(
  name: string,
  email: string,
  message: string,
) {
  const safeName = safeHeader(name).slice(0, 200);
  const safeEmail = safeHeader(email).slice(0, 200);
  // Message body is text-only — newlines allowed
  const safeMessage = message.slice(0, 5000);

  return getTransporter().sendMail({
    from: 'za@grizzlybit.dev',
    to: 'zubair1024@gmail.com',
    replyTo: safeEmail,
    subject: `Contact form — ${safeName}`,
    text: `Name: ${safeName}\nFrom: ${safeEmail}\n\n${safeMessage}\n`,
  });
}
