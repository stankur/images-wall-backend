import express, { Express, NextFunction, Router } from "express";
import multer, { StorageEngine, Multer } from "multer";
import { postImage, getImages } from "../controllers/imageController"; 

const storage: StorageEngine = multer.memoryStorage();
const upload: Multer = multer({ storage: storage });

const router: Router = express.Router();

router.get("/images", getImages);
router.post("/images", upload.single("image"), postImage);

export default router;
