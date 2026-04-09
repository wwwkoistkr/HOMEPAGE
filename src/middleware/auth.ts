// KOIST - Auth Middleware
import { createMiddleware } from 'hono/factory';
import type { Bindings, Variables } from '../types';
import { verifyJWT } from '../utils/crypto';

const JWT_SECRET_DEFAULT = 'koist-jwt-secret-change-in-production-2026';

export const authMiddleware = createMiddleware<{
  Bindings: Bindings;
  Variables: Variables;
}>(async (c, next) => {
  const secret = c.env.JWT_SECRET || JWT_SECRET_DEFAULT;

  // Check cookie first, then Authorization header
  const cookieToken = getCookie(c.req.raw, 'koist_token');
  const authHeader = c.req.header('Authorization');
  const token = cookieToken || (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null);

  if (!token) {
    // API 요청이면 401, 페이지 요청이면 로그인 리다이렉트
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

export function getJwtSecret(env: Bindings): string {
  return env.JWT_SECRET || JWT_SECRET_DEFAULT;
}
