import { Schema, model } from 'mongoose';

const gallerySchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default model('Gallery', gallerySchema);
