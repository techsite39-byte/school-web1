import { Router } from 'express';
import EventModel from '../models/Event';

const router = Router();

router.get('/events', async (_req, res) => {
  try {
    const events = await EventModel.find().sort({ date: -1 }).limit(20);
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch events', error });
  }
});

export default router;
