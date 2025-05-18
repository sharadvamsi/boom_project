import Video from '../models/Video.js';

export const uploadVideo = async (req, res) => {
  try {
    const { title } = req.body;
    const filePath = req.file.path;
    const video = await Video.create({ title, filePath, user: req.user.id });
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('user', 'email');
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    video.likes += 1;
    await video.save();
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
