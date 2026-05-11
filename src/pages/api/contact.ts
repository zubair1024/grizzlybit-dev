// Next.js API route: https://nextjs.org/docs/api-routes/introduction
import { sendContactInfo } from '@/util/mailer';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | { success: true }
  | { success: false; error: string };

// Simple in-memory token bucket per IP (per server instance).
// Acceptable for low-volume personal site; consider Upstash/Redis at scale.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true, retryAfter: 0 };
}

function getClientIp(req: NextApiRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0].trim();
  if (Array.isArray(fwd) && fwd[0]) return fwd[0];
  return req.socket.remoteAddress ?? 'unknown';
}

// Strip CR/LF (header-injection guard) and trim
const sanitize = (s: unknown, max: number): string =>
  typeof s === 'string' ? s.replace(/[\r\n]+/g, ' ').trim().slice(0, max) : '';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const limit = rateLimit(getClientIp(req));
  if (!limit.ok) {
    res.setHeader('Retry-After', String(limit.retryAfter));
    return res
      .status(429)
      .json({ success: false, error: 'Too many requests. Try again later.' });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const name = sanitize(body.name, 200);
  const email = sanitize(body.email, 200);
  const message =
    typeof body.message === 'string' ? body.message.trim().slice(0, 5000) : '';

  if (!name || name.length < 2) {
    return res.status(400).json({ success: false, error: 'Invalid name' });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email' });
  }
  if (!message || message.length < 5) {
    return res.status(400).json({ success: false, error: 'Invalid message' });
  }

  try {
    await sendContactInfo(name, email, message);
    return res.status(200).json({ success: true });
  } catch (err) {
    // Never leak stack/details to client
    console.error('contact send failed', err);
    return res
      .status(500)
      .json({ success: false, error: 'Could not send message' });
  }
}
