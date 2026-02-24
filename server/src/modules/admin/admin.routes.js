import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { adminLoginRateLimiter } from '../../middleware/rateLimiter.js';
import { adminAuth } from '../../middleware/adminAuth.js';

const router = express.Router();

// In-memory store for reset tokens { token: { expires: Date } }
const resetTokens = new Map();

// ─── Helper: create nodemailer transporter ──────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS, // Gmail App Password
    },
  });
}

// ─── POST /api/v1/admin/login ───────────────────────────────
router.post('/login', adminLoginRateLimiter, (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  const validUser = username === process.env.ADMIN_USER;
  const validPass = password === process.env.ADMIN_PASS;

  if (!validUser || !validPass) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  const token = jwt.sign(
    { role: 'admin', username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ success: true, message: 'Login successful.', token });
});

// ─── POST /api/v1/admin/request-password-reset ─────────────
// Protected — must be logged in as admin to request reset
router.post('/request-password-reset', adminAuth, async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      return res.status(500).json({
        success: false,
        message: 'ADMIN_EMAIL is not configured in environment variables.',
      });
    }

    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASS) {
      return res.status(500).json({
        success: false,
        message: 'SMTP credentials not configured. Add SMTP_EMAIL and SMTP_PASS to .env',
      });
    }

    // Generate a secure reset token
    const resetToken = jwt.sign(
      { role: 'admin', purpose: 'password-reset' },
      process.env.JWT_SECRET + '_reset',
      { expiresIn: '15m' }
    );

    // Store token with expiry
    resetTokens.set(resetToken, { expires: Date.now() + 15 * 60 * 1000 });

    // Cleanup expired tokens
    for (const [t, data] of resetTokens.entries()) {
      if (data.expires < Date.now()) resetTokens.delete(t);
    }

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetLink = `${clientUrl}/admin-login?reset=${resetToken}`;

    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Intersites Digital" <${process.env.SMTP_EMAIL}>`,
      to: adminEmail,
      subject: 'Admin Password Reset — Intersites Digital',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #ffffff;">
          <div style="margin-bottom: 32px;">
            <h1 style="font-size: 20px; font-weight: 700; color: #0a0a0a; margin: 0 0 4px;">Password Reset Request</h1>
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Intersites Digital Admin</p>
          </div>

          <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
            A password reset was requested for the admin account. Click the button below to set a new password. This link expires in <strong>15 minutes</strong>.
          </p>

          <a href="${resetLink}"
            style="display: inline-block; background: #7c3aed; color: #ffffff; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-bottom: 24px;">
            Reset Password
          </a>

          <p style="color: #9ca3af; font-size: 12px; line-height: 1.6; margin: 0;">
            If you did not request this, you can safely ignore this email. Your password will not change.<br /><br />
            Or copy this link:<br />
            <span style="color: #6b7280; word-break: break-all;">${resetLink}</span>
          </p>

          <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 24px 0;" />
          <p style="color: #d1d5db; font-size: 11px; margin: 0;">Intersites Digital · intersitesdigital@gmail.com</p>
        </div>
      `,
    });

    res.json({
      success: true,
      message: `Reset link sent to ${adminEmail}. It expires in 15 minutes.`,
    });
  } catch (err) {
    console.error('Password reset email error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to send reset email. Check your SMTP configuration.',
    });
  }
});

// ─── POST /api/v1/admin/reset-password ─────────────────────
// Public — uses the token from email to set new password
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ success: false, message: 'Token and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
  }

  // Verify token exists in our store
  if (!resetTokens.has(token)) {
    return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
  }

  const tokenData = resetTokens.get(token);
  if (tokenData.expires < Date.now()) {
    resetTokens.delete(token);
    return res.status(400).json({ success: false, message: 'Reset token has expired. Please request a new one.' });
  }

  // Verify JWT signature
  try {
    jwt.verify(token, process.env.JWT_SECRET + '_reset');
  } catch {
    resetTokens.delete(token);
    return res.status(400).json({ success: false, message: 'Invalid reset token.' });
  }

  // ⚠️ Since credentials are stored in .env (not DB), we cannot
  // permanently update the password via API. We update process.env at runtime
  // so it works until server restart. For permanent change, update .env manually.
  process.env.ADMIN_PASS = newPassword;
  resetTokens.delete(token);

  res.json({
    success: true,
    message: 'Password updated successfully. Please log in with your new password.',
    note: 'To make this permanent, also update ADMIN_PASS in your server .env file.',
  });
});

// ─── GET /api/v1/admin/verify-reset-token ──────────────────
// Check if a reset token is still valid (used by frontend)
router.get('/verify-reset-token', (req, res) => {
  const { token } = req.query;

  if (!token || !resetTokens.has(token)) {
    return res.json({ valid: false });
  }

  const tokenData = resetTokens.get(token);
  if (tokenData.expires < Date.now()) {
    resetTokens.delete(token);
    return res.json({ valid: false });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET + '_reset');
    res.json({ valid: true });
  } catch {
    res.json({ valid: false });
  }
});

export default router;
