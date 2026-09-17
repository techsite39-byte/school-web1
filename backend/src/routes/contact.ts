import { Router } from 'express';
import ContactMessage from '../models/ContactMessage';

const router = Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ message: 'All contact form fields are required.' });
    }

    const contact = await ContactMessage.create({ name, phone, email, message });
    return res.status(201).json({ message: 'Contact message submitted successfully', contact });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to submit contact message', error });
  }
});

export default router;
