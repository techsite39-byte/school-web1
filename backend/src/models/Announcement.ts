import { Schema, model } from 'mongoose';

const announcementSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: 'general' },
  },
  { timestamps: true }
);

export default model('Announcement', announcementSchema);
