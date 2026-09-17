import { Schema, model } from 'mongoose';

const facilitySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default model('Facility', facilitySchema);
