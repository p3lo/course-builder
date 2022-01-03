import { supabase } from '../../lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
