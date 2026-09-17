import { Router } from 'express';
import Announcement from '../models/Announcement';

const router = Router();

router.get('/announcements', async (_req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 }).limit(20);
    return res.status(200).json(announcements);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch announcements', error });
  }
});

export default router;
