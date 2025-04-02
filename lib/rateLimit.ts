import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const REDIS_URL = process.env.UPSTASH_REDIS_URL
const REDIS_TOKEN = process.env.UPSTASH_REDIS_TOKEN

//define single Redis instance
const redis = new Redis({ url: REDIS_URL, token: REDIS_TOKEN })

//define separate rateLimiters
export const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
}) //5 logins per 15 minutes
export const registerRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '30 m'),
}) //3 registrations per 30 minutes
export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 h'),
}) // 100 api calls per hour

export const forgotPasswordRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '24 h'),
}) //3 registrations per 30 minutes
