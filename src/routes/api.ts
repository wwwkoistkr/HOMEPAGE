// KOIST - Public API Routes
import { Hono } from 'hono';
import type { Bindings, Variables } from '../types';
import { inquiryRateLimiter } from '../middleware/rate-limit';

const api = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// GET /api/settings
api.get('/settings', async (c) => {
  const db = c.env.DB;
  const result = await db.prepare('SELECT key, value, category FROM site_settings').all();
  return c.json({ success: true, data: result.results });
});

// GET /api/departments
api.get('/departments', async (c) => {
  const db = c.env.DB;
  const result = await db.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY sort_order').all();
  return c.json({ success: true, data: result.results });
});

// GET /api/departments/:slug
api.get('/departments/:slug', async (c) => {
  const db = c.env.DB;
  const slug = c.req.param('slug');
  const dept = await db.prepare('SELECT * FROM departments WHERE slug = ? AND is_active = 1').bind(slug).first();
  if (!dept) return c.json({ error: 'Not found' }, 404);
  const pages = await db.prepare('SELECT id, title, slug, sort_order FROM dep_pages WHERE dept_id = ? AND is_active = 1 ORDER BY sort_order').bind(dept.id).all();
  return c.json({ success: true, data: { ...dept, pages: pages.results } });
});

// GET /api/popups/active
api.get('/popups/active', async (c) => {
  const db = c.env.DB;
  const now = new Date().toISOString();
  const result = await db.prepare(
    `SELECT * FROM popups WHERE is_active = 1 
     AND (start_date IS NULL OR start_date <= ?) 
     AND (end_date IS NULL OR end_date >= ?) 
     ORDER BY sort_order`
  ).bind(now, now).all();
  return c.json({ success: true, data: result.results });
});

// GET /api/notices
api.get('/notices', async (c) => {
  const db = c.env.DB;
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '15');
  const offset = (page - 1) * limit;
  const total = await db.prepare('SELECT COUNT(*) as cnt FROM notices').first<{ cnt: number }>();
  const result = await db.prepare('SELECT * FROM notices ORDER BY is_pinned DESC, created_at DESC LIMIT ? OFFSET ?').bind(limit, offset).all();
  return c.json({ success: true, data: result.results, total: total?.cnt || 0, page, limit });
});

// GET /api/notices/:id
api.get('/notices/:id', async (c) => {
  const db = c.env.DB;
  const id = c.req.param('id');
  const notice = await db.prepare('SELECT * FROM notices WHERE id = ?').bind(id).first();
  if (!notice) return c.json({ error: 'Not found' }, 404);
  await db.prepare('UPDATE notices SET views = views + 1 WHERE id = ?').bind(id).run();
  return c.json({ success: true, data: notice });
});

// GET /api/progress
api.get('/progress', async (c) => {
  const db = c.env.DB;
  const category = c.req.query('category');
  let query = 'SELECT * FROM progress_items';
  const params: string[] = [];
  if (category) { query += ' WHERE category = ?'; params.push(category); }
  query += ' ORDER BY created_at DESC';
  const stmt = params.length > 0 ? db.prepare(query).bind(...params) : db.prepare(query);
  const result = await stmt.all();
  return c.json({ success: true, data: result.results });
});

// GET /api/downloads
api.get('/downloads', async (c) => {
  const db = c.env.DB;
  const result = await db.prepare('SELECT * FROM downloads ORDER BY created_at DESC').all();
  return c.json({ success: true, data: result.results });
});

// GET /api/faqs
api.get('/faqs', async (c) => {
  const db = c.env.DB;
  const result = await db.prepare('SELECT * FROM faqs WHERE is_active = 1 ORDER BY sort_order').all();
  return c.json({ success: true, data: result.results });
});

// GET /api/downloads/:id/file - Redirect to file URL and increment counter
api.get('/downloads/:id/file', async (c) => {
  const db = c.env.DB;
  const id = c.req.param('id');
  const dl = await db.prepare('SELECT * FROM downloads WHERE id = ?').bind(id).first<{ file_url: string }>();
  if (!dl || !dl.file_url) return c.json({ error: 'File not found' }, 404);
  await db.prepare('UPDATE downloads SET download_count = download_count + 1 WHERE id = ?').bind(id).run();
  return c.redirect(dl.file_url, 302);
});

// POST /api/inquiries (rate limited: 3 requests per hour)
api.post('/inquiries', inquiryRateLimiter, async (c) => {
  const db = c.env.DB;
  try {
    const body = await c.req.json();
    const { name, email, phone, company, subject, message } = body;
    if (!name || !subject || !message) {
      return c.json({ error: '이름, 제목, 내용은 필수입니다.' }, 400);
    }
    await db.prepare(
      'INSERT INTO inquiries (name, email, phone, company, subject, message) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(name, email || '', phone || '', company || '', subject, message).run();
    return c.json({ success: true, message: '문의가 접수되었습니다.' });
  } catch (e) {
    return c.json({ error: '문의 접수에 실패했습니다.' }, 500);
  }
});

// GET /api/sim-cert-types - AI 시뮬레이터 인증유형 데이터
api.get('/sim-cert-types', async (c) => {
  const db = c.env.DB;
  const result = await db.prepare('SELECT * FROM sim_cert_types WHERE is_active = 1 ORDER BY sort_order').all();
  return c.json({ success: true, data: result.results });
});

// GET /api/media/:key+ - Serve videos from R2 with Range request support (streaming)
api.get('/media/*', async (c) => {
  const key = c.req.path.replace('/api/media/', '');
  if (!key) return c.json({ error: 'Media key required' }, 400);

  if (!(c.env as any).R2) {
    return c.json({ error: 'R2 storage not configured.' }, 503);
  }

  try {
    const rangeHeader = c.req.header('range');

    // If Range header present, use partial content
    if (rangeHeader) {
      // First, get object metadata via head
      const head = await c.env.R2.head(key);
      if (!head) return c.json({ error: 'Media not found' }, 404);

      const totalSize = head.size;
      const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
      if (!match) return c.json({ error: 'Invalid Range header' }, 416);

      const start = parseInt(match[1], 10);
      const end = match[2] ? parseInt(match[2], 10) : Math.min(start + 2 * 1024 * 1024 - 1, totalSize - 1);
      const chunkSize = end - start + 1;

      const object = await c.env.R2.get(key, {
        range: { offset: start, length: chunkSize },
      });
      if (!object) return c.json({ error: 'Media not found' }, 404);

      const headers = new Headers();
      headers.set('Content-Type', head.httpMetadata?.contentType || 'video/mp4');
      headers.set('Content-Range', `bytes ${start}-${end}/${totalSize}`);
      headers.set('Content-Length', String(chunkSize));
      headers.set('Accept-Ranges', 'bytes');
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');

      return new Response(object.body, { status: 206, headers });
    }

    // No Range header — serve entire file
    const object = await c.env.R2.get(key);
    if (!object) return c.json({ error: 'Media not found' }, 404);

    const headers = new Headers();
    headers.set('Content-Type', object.httpMetadata?.contentType || 'video/mp4');
    headers.set('Accept-Ranges', 'bytes');
    headers.set('Content-Length', String(object.size));
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('ETag', object.etag || '');

    return new Response(object.body, { headers });
  } catch {
    return c.json({ error: 'Failed to retrieve media' }, 500);
  }
});

// GET /api/images/legacy/* - HTTPS proxy for legacy koist.kr images (v39.6)
// Resolves Mixed-Content warnings when embedding original koist.kr assets
// in HTTPS-served Cloudflare Pages. All images are company-owned assets.
api.get('/images/legacy/*', async (c) => {
  const key = c.req.path.replace('/api/images/legacy/', '');
  if (!key) return c.json({ error: 'Legacy image key required' }, 400);

  // Safety: only allow koist.kr path prefixes (sh_page/, img/, data/, files/, bbs/, etc.)
  // Reject any absolute URLs or parent-directory traversal
  if (key.includes('..') || /^https?:\/\//i.test(key)) {
    return c.json({ error: 'Invalid legacy image path' }, 400);
  }

  const upstream = `http://www.koist.kr/${key}`;
  try {
    const res = await fetch(upstream, {
      // @ts-ignore - cf property is available in Cloudflare Workers runtime
      cf: { cacheEverything: true, cacheTtl: 31536000 },
      headers: { 'User-Agent': 'KOIST-Legacy-Proxy/1.0' },
    });
    if (!res.ok) return c.json({ error: `Upstream ${res.status}` }, res.status === 404 ? 404 : 502);

    const headers = new Headers();
    const ct = res.headers.get('Content-Type') || 'image/png';
    headers.set('Content-Type', ct);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('X-Legacy-Proxy', 'koist.kr');
    headers.set('X-Legacy-Path', key);
    return new Response(res.body, { headers, status: 200 });
  } catch (err) {
    return c.json({ error: 'Failed to proxy legacy image', detail: String(err) }, 502);
  }
});

// GET /api/images/:key+ - Serve images from R2 (public, cached) or redirect for external URLs
api.get('/images/*', async (c) => {
  const key = c.req.path.replace('/api/images/', '');
  if (!key) return c.json({ error: 'Image key required' }, 400);

  // If key looks like an external URL, redirect
  if (key.startsWith('http://') || key.startsWith('https://')) {
    return c.redirect(key, 302);
  }

  // Check if R2 is available
  if (!(c.env as any).R2) {
    return c.json({ error: 'R2 storage not configured. Use external image URLs.' }, 503);
  }

  try {
    const object = await c.env.R2.get(key);
    if (!object) return c.json({ error: 'Image not found' }, 404);

    const headers = new Headers();
    headers.set('Content-Type', object.httpMetadata?.contentType || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('ETag', object.etag || '');

    return new Response(object.body, { headers });
  } catch {
    return c.json({ error: 'Failed to retrieve image' }, 500);
  }
});

export default api;
