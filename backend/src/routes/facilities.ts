import { Router } from 'express';
import Facility from '../models/Facility';

const router = Router();

router.get('/facilities', async (_req, res) => {
  try {
    const facilities = await Facility.find().sort({ createdAt: -1 });
    return res.status(200).json(facilities);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch facilities', error });
  }
});

export default router;
