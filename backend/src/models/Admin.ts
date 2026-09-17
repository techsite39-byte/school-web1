import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

adminSchema.methods.comparePassword = async function comparePassword(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

export default model('Admin', adminSchema);
