import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function getR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  if (!accountId || !accessKeyId || !secretAccessKey) return null;
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export async function uploadToR2(
  buffer: Buffer,
  fileName: string,
  contentType: string,
): Promise<string | null> {
  const client = getR2Client();
  if (!client) return null;

  const bucket = process.env.R2_BUCKET_NAME ?? "sahabat-kreator";
  const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
    }),
  );

  if (publicUrl) {
    return `${publicUrl}/${fileName}`;
  }
  return `https://${bucket}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${fileName}`;
}
