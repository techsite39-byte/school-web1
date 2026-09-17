import { Schema, model } from 'mongoose';

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    date: { type: Date, required: true },
    image: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

export default model('Event', eventSchema);
