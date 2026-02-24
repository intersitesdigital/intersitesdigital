import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    service: { type: String, trim: true },
    budget: { type: String, trim: true },
    source: { type: String, default: 'website', trim: true }, // hero-cta, contact-page, newsletter, etc.
    status: { type: String, enum: ['new', 'qualified', 'contacted', 'converted', 'lost'], default: 'new' },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);
