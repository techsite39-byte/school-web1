import { Router } from 'express';
import Gallery from '../models/Gallery';

const router = Router();

router.get('/gallery', async (_req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 }).limit(50);
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch gallery', error });
  }
});

export default router;
