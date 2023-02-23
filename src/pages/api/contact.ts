// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sendContactInfo } from '@/util/mailer';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  error?: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    if (req.method !== 'POST')
      res.status(500).json({ success: false, error: 'Invalid Method' });
    const {
      name,
      email,
      message,
    }: { name: string; email: string; message: string } = req.body;
    const response = await sendContactInfo(name, email, message);
    if (response) return res.status(200).json({ success: true });
    res.status(500).json({ success: false, error: 'Unknown error' });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).stack });
  }
}
