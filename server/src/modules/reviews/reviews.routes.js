import express from 'express';
import { getReviews, createReview, deleteReview } from './reviews.controller.js';
import { adminAuth } from '../../middleware/adminAuth.js';

const router = express.Router();

// Public: fetch all reviews (local + Google)
router.get('/', getReviews);

// Public: submit a new review
router.post('/', createReview);

// Admin only: delete a review by ID
router.delete('/:id', adminAuth, deleteReview);

export default router;
