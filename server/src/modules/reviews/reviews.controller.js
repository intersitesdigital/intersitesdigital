import Review from './reviews.model.js';
import { fetchGoogleReviews } from '../../services/googleReviews.service.js';
import { AppError } from '../../middleware/errorHandler.js';

/**
 * GET /api/reviews
 * Returns local MongoDB reviews + Google reviews merged.
 */
export const getReviews = async (req, res, next) => {
  try {
    const [localReviews, googleReviews] = await Promise.all([
      Review.find().sort({ createdAt: -1 }),
      fetchGoogleReviews(),
    ]);

    res.json({
      success: true,
      data: {
        local: localReviews,
        google: googleReviews,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/reviews
 * Create a new local review. Open to public.
 */
export const createReview = async (req, res, next) => {
  try {
    const { name, message, rating } = req.body;

    if (!name || !message || !rating) {
      return next(new AppError('Name, message, and rating are required.', 400));
    }

    const review = await Review.create({ name, message, rating });

    res.status(201).json({
      success: true,
      message: 'Thank you for your review!',
      data: review,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new AppError(error.message, 400));
    }
    next(error);
  }
};

/**
 * DELETE /api/reviews/:id
 * Admin-only: delete a local review by ID.
 */
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return next(new AppError('Review not found.', 404));
    }

    res.json({
      success: true,
      message: 'Review deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
