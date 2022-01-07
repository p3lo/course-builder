import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const path: string = req.body.path;

  const client = new S3({
    endpoint: process.env.WASABI_ENDPOINT,
    credentials: {
      accessKeyId: process.env.WASABI_KEY,
      secretAccessKey: process.env.WASABI_SECRET,
    },
    region: process.env.WASABI_REGION,
    // signatureVersion: 'v4',
  });
  const command = new PutObjectCommand({
    Bucket: process.env.WASABI_BUCKET,
    Key: `${path}${req.query.file}`,
  });
  const signedUrl = await getSignedUrl(client, command, {
    expiresIn: 10 * 60,
  });

  res.status(200).json({ url: signedUrl });
}

export default handler;
