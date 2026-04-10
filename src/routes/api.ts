// KOIST - Public API Routes
import { Hono } from 'hono';
import type { Bindings, Variables } from '../types';

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

// POST /api/inquiries
api.post('/inquiries', async (c) => {
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

// GET /api/images/:key+ - Serve images from R2 (public, cached)
api.get('/images/*', async (c) => {
  const key = c.req.path.replace('/api/images/', '');
  if (!key) return c.json({ error: 'Image key required' }, 400);

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
