import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    source: { type: String, default: 'website' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Subscriber', subscriberSchema);
