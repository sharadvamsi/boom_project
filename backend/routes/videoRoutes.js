import express from 'express';
import multer from 'multer';
import { uploadVideo, getVideos, likeVideo } from '../controllers/videoController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/upload', verifyToken, upload.single('video'), uploadVideo);
router.get('/videos', getVideos);
router.post('/like/:videoId', likeVideo);

export default router;
