import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { IdentityPoolId, albumBucketName, bucketRegion } from "./secrets";

export function getAWSClient() {
  const client = new S3Client({
    region: bucketRegion,
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: bucketRegion },
      identityPoolId: IdentityPoolId,
    }),
  });

  console.log(client);

  return client;
}

export async function deleteS3Object(client: S3Client, photoKey: string) {
  const command = new DeleteObjectCommand({
    Bucket: albumBucketName,
    Key: photoKey,
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

export async function postS3Object(
  client: S3Client,
  file: File,
  photoKey: string
) {
  const command = new PutObjectCommand({
    Bucket: albumBucketName,
    Key: photoKey,
    Body: file,
    ContentType: "image/jpeg",
  });

  console.log("send command!");
  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}
