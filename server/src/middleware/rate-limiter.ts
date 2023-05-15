import rateLimit  from 'express-rate-limit';

export const consoleRouteLimiter = rateLimit({
  windowMs: 30 * 1000,
  max: 5,
  message: { error: 'Rate limit reached. Please try again later' }
})

export const defaultLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Rate limit reached. Please try again later' }
})

export const likeRecordingLimiter = rateLimit({
  windowMs: 7 * 24 * 60 * 60 * 1000,
  max: 1,
  message: { error: 'Can only like once per recording'}
})