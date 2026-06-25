import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { cdn } from "@/lib/cdn";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function listR2Images(prefix: string): Promise<string[]> {
  try {
    const result = await r2.send(
      new ListObjectsV2Command({
        Bucket: process.env.R2_BUCKET_NAME!,
        Prefix: prefix,
      })
    );

    return (result.Contents ?? [])
      .map((obj) => obj.Key!)
      .filter((key) => /\.(jpe?g|png|webp|avif)$/i.test(key))
      .sort()
      .map((key) => cdn(key));
  } catch {
    return [];
  }
}
