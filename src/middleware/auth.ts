// KOIST - Auth Middleware
import { createMiddleware } from 'hono/factory';
import type { Bindings, Variables } from '../types';
import { verifyJWT } from '../utils/crypto';

/**
 * Retrieve JWT secret from environment.
 * Throws if JWT_SECRET is missing or shorter than 32 characters.
 */
export function getJwtSecret(env: Bindings): string {
  const secret = env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET is missing or too short (min 32 chars). Set via `wrangler secret put JWT_SECRET` or .dev.vars');
  }
  return secret;
}

export const authMiddleware = createMiddleware<{
  Bindings: Bindings;
  Variables: Variables;
}>(async (c, next) => {
  let secret: string;
  try {
    secret = getJwtSecret(c.env);
  } catch {
    if (c.req.path.startsWith('/api/')) {
      return c.json({ error: 'Server misconfigured' }, 500);
    }
    return c.text('Server misconfigured: JWT_SECRET not set', 500);
  }

  // Check cookie first, then Authorization header
  const cookieToken = getCookie(c.req.raw, 'koist_token');
  const authHeader = c.req.header('Authorization');
  const token = cookieToken || (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null);

  if (!token) {
    if (c.req.path.startsWith('/api/')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    return c.redirect('/admin');
  }

  const payload = await verifyJWT(token, secret);
  if (!payload) {
    if (c.req.path.startsWith('/api/')) {
      return c.json({ error: 'Invalid or expired token' }, 401);
    }
    return c.redirect('/admin');
  }

  c.set('admin', {
    id: payload.id as number,
    username: payload.username as string,
  });

  await next();
});

function getCookie(req: Request, name: string): string | null {
  const cookie = req.headers.get('Cookie');
  if (!cookie) return null;
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}
