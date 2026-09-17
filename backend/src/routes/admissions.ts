import { Router } from 'express';
import AdmissionEnquiry from '../models/AdmissionEnquiry';

const router = Router();

router.post('/admissions', async (req, res) => {
  try {
    const { parentName, studentName, phone, email, message } = req.body;

    if (!parentName || !studentName || !phone || !email) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const enquiry = await AdmissionEnquiry.create({ parentName, studentName, phone, email, message });
    return res.status(201).json({ message: 'Admission enquiry submitted successfully', enquiry });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to submit admission enquiry', error });
  }
});

export default router;
