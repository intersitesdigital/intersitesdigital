import Contact from './contact.model.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, company, service, budget, timeline, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const contact = await Contact.create({ name, email, phone, company, service, budget, timeline, message });

    res.status(201).json({
      success: true,
      message: 'Message received. We will get back to you within 24 hours.',
      data: { id: contact._id },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to submit contact form.' });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch contacts.' });
  }
};
