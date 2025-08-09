import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const REDIS_URL = process.env.UPSTASH_REDIS_URL
const REDIS_TOKEN = process.env.UPSTASH_REDIS_TOKEN

//define single Redis instance
const redis = new Redis({ url: REDIS_URL, token: REDIS_TOKEN })

export const startRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '30 m'),
}) //5 codes per 30 minutes
