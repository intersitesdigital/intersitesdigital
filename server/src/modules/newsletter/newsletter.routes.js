import express from 'express';
import { subscribe, unsubscribe, getAllSubscribers } from './newsletter.controller.js';
import { adminAuth } from '../../middleware/adminAuth.js';

const router = express.Router();

router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);
router.get('/', adminAuth, getAllSubscribers);

export default router;
