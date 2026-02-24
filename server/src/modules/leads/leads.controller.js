import Lead from './leads.model.js';

export const captureLead = async (req, res) => {
  try {
    const { name, email, phone, company, service, budget, source } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    // Upsert: update if same email exists, else create new
    const lead = await Lead.findOneAndUpdate(
      { email: email.toLowerCase() },
      { name, email, phone, company, service, budget, source: source || 'website' },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json({
      success: true,
      message: 'Lead captured successfully.',
      data: { id: lead._id },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to capture lead.' });
  }
};

export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, count: leads.length, data: leads });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch leads.' });
  }
};
