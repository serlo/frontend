import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { NextApiRequest, NextApiResponse } from 'next'

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'Q3AM3UQ867SPQQA43P2F',
    secretAccessKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
  },
  endpoint: 'https://play.min.io:9000',
  forcePathStyle: true,
})

async function generateUploadURL(fileName: string): Promise<string | null> {
  const params: PutObjectCommandInput = {
    Key: fileName,
    Bucket: 'botho-test-bucket',
    // ContentType: fileType,
    // Metadata: { 'Content-Type': fileType },
  }

  const command = new PutObjectCommand(params)
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = String(req.query.name)
  res.json(await generateUploadURL(name))
}

// simple access policy:
// full public read access, everything else private

// {
//     "Version": "2012-10-17",
//     "Statement": [
//         {
//             "Effect": "Allow",
//             "Principal": {
//                 "AWS": [
//                     "*"
//                 ]
//             },
//             "Action": [
//                 "s3:GetObject"
//             ],
//             "Resource": [
//                 "arn:aws:s3:::botho-test-bucket/*"
//             ]
//         }
//     ]
// }
