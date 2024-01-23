import { NextApiRequest, NextApiResponse } from 'next';

type AppHealth = { status: 'up' | 'down' }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AppHealth>) {
  res.status(200).json({ status: 'up' });
}
