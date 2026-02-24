import express from 'express';
import { captureLead, getAllLeads } from './leads.controller.js';
import { adminAuth } from '../../middleware/adminAuth.js';

const router = express.Router();

router.post('/', captureLead);
router.get('/', adminAuth, getAllLeads);

export default router;
