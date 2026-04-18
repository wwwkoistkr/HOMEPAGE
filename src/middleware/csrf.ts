/**
 * KOIST - CSRF Protection Middleware (Double-Submit Cookie Pattern)
 *
 * On GET requests to admin pages: sets a `koist_csrf` cookie with a random token.
 * On POST/PUT/DELETE to /api/admin/*: validates X-CSRF-Token header matches koist_csrf cookie.
 */
import { createMiddleware } from 'hono/factory';
import type { Bindings, Variables } from '../types';

function getCookie(req: Request, name: string): string | null {
  const cookie = req.headers.get('Cookie');
  if (!cookie) return null;
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function generateCsrfToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Middleware to set CSRF cookie on admin page GET requests.
 * Applied to /admin/* page routes (not API routes).
 */
export const csrfCookieMiddleware = createMiddleware<{
  Bindings: Bindings;
  Variables: Variables;
}>(async (c, next) => {
  await next();

  // Only set CSRF cookie on successful HTML page responses
  if (c.res.headers.get('content-type')?.includes('text/html')) {
    const token = generateCsrfToken();
    const isSecure = c.req.url.startsWith('https');
    // Not HttpOnly so JS can read it for the double-submit pattern
    const cookieFlags = `Path=/; SameSite=Lax; Max-Age=86400${isSecure ? '; Secure' : ''}`;
    c.res.headers.append('Set-Cookie', `koist_csrf=${token}; ${cookieFlags}`);
  }
});

/**
 * Middleware to validate CSRF token on mutating admin API requests.
 * Checks that X-CSRF-Token header matches koist_csrf cookie value.
 */
export const csrfValidationMiddleware = createMiddleware<{
  Bindings: Bindings;
  Variables: Variables;
}>(async (c, next) => {
  const method = c.req.method.toUpperCase();

  // Only validate mutating methods
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    return next();
  }

  // Skip CSRF for login and logout (no cookie set yet)
  const path = c.req.path;
  if (path === '/api/admin/login' || path === '/api/admin/logout') {
    return next();
  }

  const cookieToken = getCookie(c.req.raw, 'koist_csrf');
  const headerToken = c.req.header('X-CSRF-Token');

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return c.json({ error: 'CSRF validation failed' }, 403);
  }

  await next();
});
