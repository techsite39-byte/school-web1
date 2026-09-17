import { Schema, model } from 'mongoose';

const admissionEnquirySchema = new Schema(
  {
    parentName: { type: String, required: true },
    studentName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String },
    status: { type: String, default: 'new' },
  },
  { timestamps: true }
);

export default model('AdmissionEnquiry', admissionEnquirySchema);
