import { Schema, model } from 'mongoose';

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'new' },
  },
  { timestamps: true }
);

export default model('ContactMessage', contactMessageSchema);
