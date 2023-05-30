import { S3_BUCKET, S3_REGION } from "$env/static/private";

import { PutObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";

const createPresignedUrlWithClientGET = ({ region, bucket, key }: Record<string, string>) => {
  const client = new S3Client({ region });
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

export const _getS3Image = async (key: string): Promise<string> => {
  const REGION = S3_REGION;
  const BUCKET = S3_BUCKET;
  const KEY = key;

  try {
    return createPresignedUrlWithClientGET({
      region: REGION,
      bucket: BUCKET,
      key: KEY,
    });

  } catch (err) {
    console.error(err);
    return "";
  }
};

type ImageUpload = {
  file: Buffer;
  key: string;
};

export const _putS3Image = async (image: ImageUpload) => {
  const client = new S3Client({ region: S3_REGION });
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: image.key,
    Body: image.file,
  });

  try {
    await client.send(command);
  } catch (err) {
    console.error(err);
  }
};