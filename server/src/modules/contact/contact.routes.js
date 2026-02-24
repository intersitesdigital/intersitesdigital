import express from 'express';
import { submitContact, getAllContacts } from './contact.controller.js';
import { adminAuth } from '../../middleware/adminAuth.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', adminAuth, getAllContacts);

export default router;
