import { useState, useEffect } from 'react';
import { reviewsAPI } from '../../lib/api';
import { Star, Globe, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';

function StarRating({ rating, size = 'sm' }) {
  const sz = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${sz} ${s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, isGoogle }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        {review.profilePhoto ? (
          <img
            src={review.profilePhoto}
            alt={review.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {(review.name || 'A')[0].toUpperCase()}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{review.name}</p>
            {isGoogle && (
              <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full font-medium">
                <Globe className="w-3 h-3" />
                Google
              </span>
            )}
          </div>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {review.message}
      </p>
      {(review.createdAt || review.relativeTime) && (
        <p className="text-gray-400 dark:text-gray-600 text-xs">
          {review.relativeTime || new Date(review.createdAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

function SubmitReviewForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', message: '', rating: 5 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await reviewsAPI.create({ ...form, rating: Number(form.rating) });
      setForm({ name: '', message: '', rating: 5 });
      onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-indigo-500" />
        Leave a Review
      </h3>

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-3 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        placeholder="Your name"
        className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        required
        rows={3}
        placeholder="Share your experience…"
        className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
      />

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600 dark:text-gray-400 font-medium">Rating:</label>
        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{n} Star{n !== 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold rounded-lg py-2.5 text-sm transition-all shadow-md shadow-indigo-500/20"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</span>
        ) : 'Submit Review'}
      </button>
    </form>
  );
}

export default function ReviewsSection() {
  const [localReviews, setLocalReviews] = useState([]);
  const [googleReviews, setGoogleReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await reviewsAPI.getAll();
      setLocalReviews(res.data.local || []);
      setGoogleReviews(res.data.google || []);
    } catch (err) {
      setError('Could not load reviews at this time.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmitted = () => {
    setSubmitted(true);
    fetchReviews();
    setTimeout(() => setSubmitted(false), 4000);
  };

  const allEmpty = !loading && localReviews.length === 0 && googleReviews.length === 0;

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider">Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
            Real experiences from businesses we've worked with.
          </p>
        </div>

        {/* Success Toast */}
        {submitted && (
          <div className="mb-6 text-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl py-3 px-4 text-sm font-medium">
            🎉 Thank you! Your review has been submitted.
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center gap-2 text-red-500 mb-6 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 animate-pulse h-40" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {allEmpty && (
          <div className="text-center text-gray-400 dark:text-gray-600 py-12 text-sm">
            No reviews yet. Be the first to share your experience.
          </div>
        )}

        {/* Local Reviews */}
        {!loading && localReviews.length > 0 && (
          <div className="mb-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {localReviews.map((r) => (
                <ReviewCard key={r._id} review={r} isGoogle={false} />
              ))}
            </div>
          </div>
        )}

        {/* Google Reviews */}
        {!loading && googleReviews.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              From Google
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {googleReviews.map((r, i) => (
                <ReviewCard key={i} review={r} isGoogle={true} />
              ))}
            </div>
          </div>
        )}

        {/* Submit Review Form */}
        <div className="max-w-lg mx-auto mt-12">
          <SubmitReviewForm onSuccess={handleReviewSubmitted} />
        </div>
      </div>
    </section>
  );
}
