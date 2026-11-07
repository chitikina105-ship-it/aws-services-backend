import { S3Client } from "@aws-sdk/client-s3";
console.log("AWS Region: ", process.env.AWS_REGION);

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

export default s3Client;
