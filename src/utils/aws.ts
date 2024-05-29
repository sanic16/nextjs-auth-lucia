import {
  S3Client,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const bucketName = process.env.BUCKET;
const region = process.env.REGION;
const accessKeyId = process.env.KEY_ID;
const secretAccessKey = process.env.ACCESS_KEY;

if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
  throw new Error("Error en las variables de entorno");
}

const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

export const uploadObject = (
  fileBuffer: Buffer,
  fileName: string,
  mimetype: string
) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
  };

  return s3.send(new PutObjectCommand(uploadParams));
};

export const deleteObject = (fileName: string) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  return s3.send(new DeleteObjectCommand(deleteParams));
};
