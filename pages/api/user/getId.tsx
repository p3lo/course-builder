import { getToken } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';

const secret = process.env.JWT_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    const token = await getToken({ req, secret });
    if (token) {
      const id = token.sub;
      res.status(201).json({ success: true, id });
    }
    res.end();
  }
};

export default handler;
