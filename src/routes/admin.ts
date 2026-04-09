// KOIST - Admin API Routes
import { Hono } from 'hono';
import type { Bindings, Variables } from '../types';
import { hashPassword, verifyPassword, generateSalt, createJWT } from '../utils/crypto';
import { getJwtSecret } from '../middleware/auth';

const admin = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// NOTE: Login is handled in index.tsx before authMiddleware
// POST /api/admin/change-password (requires auth via token in header)
admin.post('/change-password', async (c) => {
  const db = c.env.DB;
  const adminUser = c.get('admin');
  if (!adminUser) return c.json({ error: 'Unauthorized' }, 401);

  const { current_password, new_password } = await c.req.json();
  if (!new_password || new_password.length < 6) {
    return c.json({ error: '새 비밀번호는 6자 이상이어야 합니다.' }, 400);
  }

  const user = await db.prepare('SELECT * FROM admin_users WHERE id = ?').bind(adminUser.id).first<{
    id: number; password_hash: string; salt: string;
  }>();
  if (!user) return c.json({ error: 'User not found' }, 404);

  const valid = await verifyPassword(current_password, user.salt, user.password_hash);
  if (!valid) return c.json({ error: '현재 비밀번호가 올바르지 않습니다.' }, 400);

  const newSalt = await generateSalt();
  const newHash = await hashPassword(new_password, newSalt);

  await db.prepare(
    'UPDATE admin_users SET password_hash = ?, salt = ?, must_change_password = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind(newHash, newSalt, user.id).run();

  const secret = getJwtSecret(c.env);
  const token = await createJWT({ id: adminUser.id, username: adminUser.username }, secret);

  return c.json({ success: true, token, message: '비밀번호가 변경되었습니다.' });
});

// ---- Site Settings ----
admin.get('/settings', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM site_settings ORDER BY category, key').all();
  return c.json({ success: true, data: result.results });
});

admin.put('/settings/:key', async (c) => {
  const key = c.req.param('key');
  const { value } = await c.req.json();
  await c.env.DB.prepare('UPDATE site_settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?').bind(value, key).run();
  return c.json({ success: true });
});

// ---- Popups CRUD ----
admin.get('/popups', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM popups ORDER BY sort_order').all();
  return c.json({ success: true, data: result.results });
});

admin.post('/popups', async (c) => {
  const body = await c.req.json();
  const { title, content, image_url, popup_type, width, height, position_top, position_left, start_date, end_date, is_active, sort_order } = body;
  await c.env.DB.prepare(
    'INSERT INTO popups (title, content, image_url, popup_type, width, height, position_top, position_left, start_date, end_date, is_active, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
  ).bind(title, content || '', image_url || '', popup_type || 'html', width || 420, height || 300, position_top || 100, position_left || 0, start_date || null, end_date || null, is_active ?? 1, sort_order || 0).run();
  return c.json({ success: true });
});

admin.put('/popups/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const fields = ['title', 'content', 'image_url', 'popup_type', 'width', 'height', 'position_top', 'position_left', 'start_date', 'end_date', 'is_active', 'sort_order'];
  const updates: string[] = [];
  const values: any[] = [];
  for (const f of fields) {
    if (body[f] !== undefined) { updates.push(`${f} = ?`); values.push(body[f]); }
  }
  if (updates.length === 0) return c.json({ error: 'No fields to update' }, 400);
  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  await c.env.DB.prepare(`UPDATE popups SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
  return c.json({ success: true });
});

admin.delete('/popups/:id', async (c) => {
  await c.env.DB.prepare('DELETE FROM popups WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ success: true });
});

// ---- Departments CRUD ----
admin.get('/departments', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM departments ORDER BY sort_order').all();
  return c.json({ success: true, data: result.results });
});

admin.post('/departments', async (c) => {
  const { name, slug, description, icon, color, sort_order } = await c.req.json();
  await c.env.DB.prepare('INSERT INTO departments (name, slug, description, icon, color, sort_order) VALUES (?,?,?,?,?,?)').bind(name, slug, description || '', icon || 'fa-shield-halved', color || '#3B82F6', sort_order || 0).run();
  return c.json({ success: true });
});

admin.put('/departments/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const fields = ['name', 'slug', 'description', 'icon', 'color', 'sort_order', 'is_active'];
  const updates: string[] = [];
  const values: any[] = [];
  for (const f of fields) { if (body[f] !== undefined) { updates.push(`${f} = ?`); values.push(body[f]); } }
  if (updates.length === 0) return c.json({ error: 'No fields' }, 400);
  values.push(id);
  await c.env.DB.prepare(`UPDATE departments SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
  return c.json({ success: true });
});

admin.delete('/departments/:id', async (c) => {
  // Also delete sub-pages
  await c.env.DB.prepare('DELETE FROM dep_pages WHERE dept_id = ?').bind(c.req.param('id')).run();
  await c.env.DB.prepare('DELETE FROM departments WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ success: true });
});

// ---- Dep Pages CRUD ----
admin.get('/departments/:id/pages', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM dep_pages WHERE dept_id = ? ORDER BY sort_order').bind(c.req.param('id')).all();
  return c.json({ success: true, data: result.results });
});

admin.post('/departments/:id/pages', async (c) => {
  const deptId = c.req.param('id');
  const { title, slug, content, sort_order } = await c.req.json();
  await c.env.DB.prepare('INSERT INTO dep_pages (dept_id, title, slug, content, sort_order) VALUES (?,?,?,?,?)').bind(deptId, title, slug, content || '', sort_order || 0).run();
  return c.json({ success: true });
});

admin.put('/dep-pages/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const fields = ['title', 'slug', 'content', 'sort_order', 'is_active', 'meta_description'];
  const updates: string[] = [];
  const values: any[] = [];
  for (const f of fields) { if (body[f] !== undefined) { updates.push(`${f} = ?`); values.push(body[f]); } }
  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  await c.env.DB.prepare(`UPDATE dep_pages SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
  return c.json({ success: true });
});

admin.delete('/dep-pages/:id', async (c) => {
  await c.env.DB.prepare('DELETE FROM dep_pages WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ success: true });
});

// ---- Notices CRUD ----
admin.get('/notices', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM notices ORDER BY is_pinned DESC, created_at DESC').all();
  return c.json({ success: true, data: result.results });
});

admin.post('/notices', async (c) => {
  const { title, content, is_pinned } = await c.req.json();
  await c.env.DB.prepare('INSERT INTO notices (title, content, is_pinned) VALUES (?,?,?)').bind(title, content, is_pinned || 0).run();
  return c.json({ success: true });
});

admin.put('/notices/:id', async (c) => {
  const { title, content, is_pinned } = await c.req.json();
  await c.env.DB.prepare('UPDATE notices SET title=?, content=?, is_pinned=?, updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(title, content, is_pinned || 0, c.req.param('id')).run();
  return c.json({ success: true });
});

admin.delete('/notices/:id', async (c) => {
  await c.env.DB.prepare('DELETE FROM notices WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ success: true });
});

// ---- Progress CRUD ----
admin.get('/progress', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM progress_items ORDER BY created_at DESC').all();
  return c.json({ success: true, data: result.results });
});

admin.post('/progress', async (c) => {
  const { category, product_name, company, status, start_date, end_date, note } = await c.req.json();
  await c.env.DB.prepare('INSERT INTO progress_items (category, product_name, company, status, start_date, end_date, note) VALUES (?,?,?,?,?,?,?)').bind(category, product_name, company||'', status||'진행중', start_date||null, end_date||null, note||'').run();
  return c.json({ success: true });
});

admin.put('/progress/:id', async (c) => {
  const body = await c.req.json();
  const fields = ['category', 'product_name', 'company', 'status', 'start_date', 'end_date', 'note'];
  const updates: string[] = [];
  const values: any[] = [];
  for (const f of fields) { if (body[f] !== undefined) { updates.push(`${f} = ?`); values.push(body[f]); } }
  if (updates.length === 0) return c.json({ error: 'No fields' }, 400);
  values.push(c.req.param('id'));
  await c.env.DB.prepare(`UPDATE progress_items SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
  return c.json({ success: true });
});

admin.delete('/progress/:id', async (c) => {
  await c.env.DB.prepare('DELETE FROM progress_items WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ success: true });
});

// ---- FAQ CRUD ----
admin.get('/faqs', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM faqs ORDER BY sort_order').all();
  return c.json({ success: true, data: result.results });
});

admin.post('/faqs', async (c) => {
  const { question, answer, category, sort_order } = await c.req.json();
  await c.env.DB.prepare('INSERT INTO faqs (question, answer, category, sort_order) VALUES (?,?,?,?)').bind(question, answer, category||'general', sort_order||0).run();
  return c.json({ success: true });
});

admin.put('/faqs/:id', async (c) => {
  const body = await c.req.json();
  const fields = ['question', 'answer', 'category', 'sort_order', 'is_active'];
  const updates: string[] = [];
  const values: any[] = [];
  for (const f of fields) { if (body[f] !== undefined) { updates.push(`${f} = ?`); values.push(body[f]); } }
  if (updates.length === 0) return c.json({ error: 'No fields' }, 400);
  values.push(c.req.param('id'));
  await c.env.DB.prepare(`UPDATE faqs SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
  return c.json({ success: true });
});

admin.delete('/faqs/:id', async (c) => {
  await c.env.DB.prepare('DELETE FROM faqs WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ success: true });
});

// ---- Inquiries Management ----
admin.get('/inquiries', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all();
  return c.json({ success: true, data: result.results });
});

admin.put('/inquiries/:id', async (c) => {
  const { admin_reply, status } = await c.req.json();
  await c.env.DB.prepare('UPDATE inquiries SET admin_reply=?, status=?, replied_at=CURRENT_TIMESTAMP WHERE id=?').bind(admin_reply, status||'replied', c.req.param('id')).run();
  return c.json({ success: true });
});

admin.delete('/inquiries/:id', async (c) => {
  await c.env.DB.prepare('DELETE FROM inquiries WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ success: true });
});

// ---- Downloads CRUD ----
admin.get('/downloads', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM downloads ORDER BY created_at DESC').all();
  return c.json({ success: true, data: result.results });
});

admin.post('/downloads', async (c) => {
  const { title, description, file_url, file_name, file_size, category } = await c.req.json();
  await c.env.DB.prepare('INSERT INTO downloads (title, description, file_url, file_name, file_size, category) VALUES (?,?,?,?,?,?)').bind(title, description||'', file_url, file_name||'', file_size||0, category||'general').run();
  return c.json({ success: true });
});

admin.put('/downloads/:id', async (c) => {
  const body = await c.req.json();
  const fields = ['title', 'description', 'file_url', 'file_name', 'file_size', 'category'];
  const updates: string[] = [];
  const values: any[] = [];
  for (const f of fields) { if (body[f] !== undefined) { updates.push(`${f} = ?`); values.push(body[f]); } }
  if (updates.length === 0) return c.json({ error: 'No fields' }, 400);
  values.push(c.req.param('id'));
  await c.env.DB.prepare(`UPDATE downloads SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
  return c.json({ success: true });
});

admin.delete('/downloads/:id', async (c) => {
  await c.env.DB.prepare('DELETE FROM downloads WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ success: true });
});

// ---- About Pages CRUD ----
admin.get('/about-pages', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM about_pages ORDER BY sort_order').all();
  return c.json({ success: true, data: result.results });
});

admin.post('/about-pages', async (c) => {
  const { title, slug, content, sort_order } = await c.req.json();
  if (!title || !slug || !content) return c.json({ error: '제목, 슬러그, 내용은 필수입니다.' }, 400);
  await c.env.DB.prepare('INSERT INTO about_pages (title, slug, content, sort_order) VALUES (?,?,?,?)').bind(title, slug, content, sort_order||0).run();
  return c.json({ success: true });
});

admin.put('/about-pages/:id', async (c) => {
  const body = await c.req.json();
  const fields = ['title', 'content', 'sort_order'];
  const updates: string[] = [];
  const values: any[] = [];
  for (const f of fields) { if (body[f] !== undefined) { updates.push(`${f} = ?`); values.push(body[f]); } }
  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(c.req.param('id'));
  await c.env.DB.prepare(`UPDATE about_pages SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
  return c.json({ success: true });
});

admin.delete('/about-pages/:id', async (c) => {
  await c.env.DB.prepare('DELETE FROM about_pages WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ success: true });
});

export default admin;
