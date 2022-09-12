import { Request, NextFunction, Response } from "express";
import dotenv from "dotenv";
import {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
	PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import probe from "probe-image-size";
import knex from "../db/db";
import Image, { SignedImage } from "../models/Image";

dotenv.config();

console.log("in controller ts: " + Object.keys(process.env));

import crypto from "crypto";

function generateRandom(bytes: number = 32): string {
	return crypto.randomBytes(bytes).toString("hex");
}

const s3 = new S3Client({
	credentials: {
		accessKeyId: process.env.ACCESS_KEY as string,
		secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
	},
	region: process.env.BUCKET_REGION,
});

async function postImage(req: Request, res: Response, next: NextFunction) {
	if (!req.file) {
		return next(new Error("no file has been attached to the request"));
	}

	console.log(probe.sync(req.file.buffer));

	const key: string = generateRandom();

	const command: PutObjectCommand = new PutObjectCommand({
		Bucket: process.env.BUCKET_NAME as string,
		Key: key,
		Body: req.file.buffer,
		ContentType: req.file.mimetype,
	});

	try {
		await s3.send(command);
		await knex<Image>("images").insert({ key });
	} catch (err) {
		return next(err);
	}

	return res.json("success!");
}

async function getImages(req: Request, res: Response, next: NextFunction) {
	const images = await knex<Image>("images").select();
	const signedImages: SignedImage[] = [];

	for (const image of images) {
		const getObjectCommand: GetObjectCommand = new GetObjectCommand({
			Bucket: process.env.BUCKET_NAME,
			Key: image.key,
		});

		let url: string = "";

		try {
			url = await getSignedUrl(s3, getObjectCommand, {
				expiresIn: 2,
			});
		} catch (err) {
			return next(err);
		}
		const signedImage: SignedImage = { ...image, image_url: url };

		signedImages.push(signedImage);
	}

	return res.json({ images: signedImages });
}

export { postImage, getImages };
