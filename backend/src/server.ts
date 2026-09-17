import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import admissionRoutes from './routes/admissions';
import contactRoutes from './routes/contact';
import eventRoutes from './routes/events';
import newsRoutes from './routes/news';
import galleryRoutes from './routes/gallery';
import facilityRoutes from './routes/facilities';
import announcementRoutes from './routes/announcements';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'SAM CBSE backend' });
});

app.use('/api', admissionRoutes);
app.use('/api', contactRoutes);
app.use('/api', eventRoutes);
app.use('/api', newsRoutes);
app.use('/api', galleryRoutes);
app.use('/api', facilityRoutes);
app.use('/api', announcementRoutes);
app.use('/api/admin', adminRoutes);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

connectDatabase();

app.listen(port, () => {
  console.log(`SAM CBSE backend running on http://localhost:${port}`);
});
