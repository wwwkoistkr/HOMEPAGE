/**
 * KOIST - Rate Limiting Middleware (Cloudflare KV-backed)
 *
 * Uses KV namespace RATE_LIMIT_KV to track request counts per IP per time window.
 * If KV is not available, falls back to allowing all requests (degraded mode).
 */
import { createMiddleware } from 'hono/factory';
import type { Bindings, Variables } from '../types';

interface RateLimitConfig {
  /** Maximum requests allowed in the window */
  max: number;
  /** Window duration in seconds */
  windowSec: number;
  /** Key prefix for namespacing different rate limits */
  prefix: string;
}

export function rateLimiter(config: RateLimitConfig) {
  return createMiddleware<{
    Bindings: Bindings;
    Variables: Variables;
  }>(async (c, next) => {
    const kv = c.env.RATE_LIMIT_KV;

    // If KV not configured, degrade gracefully (allow request)
    if (!kv) {
      return next();
    }

    const ip = c.req.header('CF-Connecting-IP') ||
               c.req.header('X-Forwarded-For')?.split(',')[0]?.trim() ||
               'unknown';

    const window = Math.floor(Date.now() / 1000 / config.windowSec);
    const key = `${config.prefix}:${ip}:${window}`;

    try {
      const current = parseInt(await kv.get(key) || '0', 10);

      if (current >= config.max) {
        const retryAfter = config.windowSec - (Math.floor(Date.now() / 1000) % config.windowSec);
        return c.json(
          { error: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.' },
          429,
          { 'Retry-After': String(retryAfter) }
        );
      }

      // Increment counter with TTL matching the window
      await kv.put(key, String(current + 1), {
        expirationTtl: config.windowSec,
      });
    } catch {
      // KV error — degrade gracefully
    }

    await next();
  });
}

// Pre-configured rate limiters
export const loginRateLimiter = rateLimiter({
  max: 5,
  windowSec: 5 * 60, // 5 requests per 5 minutes
  prefix: 'rl:login',
});

export const inquiryRateLimiter = rateLimiter({
  max: 3,
  windowSec: 60 * 60, // 3 requests per 1 hour
  prefix: 'rl:inquiry',
});
