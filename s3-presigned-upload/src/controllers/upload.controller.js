import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/s3.js";

const generateUploadUrl = async (req, res) => {
  try {
    const { fileName, fileType } = req.body;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];

    if (!fileName || !allowedTypes.includes(fileType)) {
      return res.status(400).json({
        message: "Invalid file details",
      });
    }

    const fileKey = `uploads/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(
      s3Client,
      command,
      { expiresIn: 300 }
    );

    res.json({
      uploadUrl,
      fileKey,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate upload URL",
    });
  }
};

export default generateUploadUrl;