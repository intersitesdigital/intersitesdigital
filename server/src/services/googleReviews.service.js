/**
 * googleReviews.service.js
 * Fetches reviews from Google Places API and caches them in memory.
 * Falls back to empty array if API call fails or keys are not set.
 */

// Simple in-memory cache
let cache = {
  data: null,
  fetchedAt: null,
};

const CACHE_TTL_MS = 15 * 60 * 1000; // Cache for 15 minutes

export async function fetchGoogleReviews() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // Skip if credentials not configured
  if (!apiKey || !placeId) {
    console.warn('⚠️  GOOGLE_API_KEY or GOOGLE_PLACE_ID not set. Skipping Google reviews.');
    return [];
  }

  // Return cached data if still fresh
  const now = Date.now();
  if (cache.data && cache.fetchedAt && now - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google API responded with status ${response.status}`);
    }

    const json = await response.json();

    if (json.status !== 'OK') {
      throw new Error(`Google Places API error: ${json.status}`);
    }

    // Normalize Google reviews to our display format
    const reviews = (json.result?.reviews || []).map((r) => ({
      name: r.author_name,
      message: r.text,
      rating: r.rating,
      profilePhoto: r.profile_photo_url,
      relativeTime: r.relative_time_description,
      source: 'google',
    }));

    // Store in cache
    cache = { data: reviews, fetchedAt: now };

    return reviews;
  } catch (err) {
    console.error('❌ Failed to fetch Google reviews:', err.message);
    // Return stale cache if available, otherwise empty
    return cache.data || [];
  }
}
