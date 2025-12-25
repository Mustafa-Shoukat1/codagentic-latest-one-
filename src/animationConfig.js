// Centralized animation & scroll timing configuration
// Adjust `SCALE` to make animations/scrolls slower (>1 slows down)
// Changed from 1.6 to 1.0 for significantly faster startup and responsiveness
export const SCALE = 1.0;

// GSAP uses timeScale where <1 slows down. We set GSAP_TIME_SCALE = 1 / SCALE
export const GSAP_TIME_SCALE = 1 / SCALE;

// Helper to scale JS timeouts/intervals
export const slowTimeout = (ms) => Math.round(ms * SCALE);
export const slowInterval = (ms) => Math.round(ms * SCALE);

// Defaults for auto-scroll behavior (per-tick delta and interval)
export const AUTO_SCROLL_DELTA = 6; // pixels per tick (smaller = slower)
export const AUTO_SCROLL_INTERVAL = 40; // ms between ticks

// Polling interval for checking scroll completion/stuck detection
export const POLL_INTERVAL = 160; // ms (was commonly 100)

// Small helper for framer-motion durations
export const slowDuration = (d) => (typeof d === 'number' ? d * SCALE : d);

export default {
  SCALE,
  GSAP_TIME_SCALE,
  slowTimeout,
  slowInterval,
  AUTO_SCROLL_DELTA,
  AUTO_SCROLL_INTERVAL,
  POLL_INTERVAL,
  slowDuration,
};
