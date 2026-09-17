import { Schema, model } from 'mongoose';

const newsSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    publishedAt: { type: Date, required: true },
    image: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

export default model('News', newsSchema);
