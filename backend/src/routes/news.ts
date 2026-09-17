import { Router } from 'express';
import News from '../models/News';

const router = Router();

router.get('/news', async (_req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 }).limit(20);
    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch news', error });
  }
});

export default router;
