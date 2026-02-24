import Subscriber from './newsletter.model.js';

export const subscribe = async (req, res) => {
  try {
    const { email, source } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (!existing.active) {
        existing.active = true;
        await existing.save();
        return res.json({ success: true, message: 'Welcome back! You have been re-subscribed.' });
      }
      return res.json({ success: true, message: 'You are already subscribed.' });
    }

    await Subscriber.create({ email, source: source || 'website' });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed! Welcome to the Intersites Digital community.',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to subscribe.' });
  }
};

export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    await Subscriber.findOneAndUpdate({ email: email?.toLowerCase() }, { active: false });
    res.json({ success: true, message: 'You have been unsubscribed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to unsubscribe.' });
  }
};

export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ active: true }).sort({ createdAt: -1 });
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers.' });
  }
};
