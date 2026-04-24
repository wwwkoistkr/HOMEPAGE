// KOIST - Admin API Routes
import { Hono } from 'hono';
import type { Bindings, Variables, ImageRecord } from '../types';
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

  const secret = (() => { try { return getJwtSecret(c.env); } catch { return null; } })();
  if (!secret) return c.json({ error: 'Server misconfigured' }, 500);
  const token = await createJWT({ id: adminUser.id, username: adminUser.username }, secret);

  // Refresh HttpOnly cookie with new token
  const isSecure = c.req.url.startsWith('https');
  const cookieFlags = `Path=/; HttpOnly; SameSite=Lax; Max-Age=86400${isSecure ? '; Secure' : ''}`;
  c.header('Set-Cookie', `koist_token=${token}; ${cookieFlags}`);

  return c.json({ success: true, message: '비밀번호가 변경되었습니다.' });
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

// ──────────────────────────────────────────────────────────────────────────
// v39.4: AI 시뮬레이터 슬라이더 전용 설정 (category='slider') CRUD
// ──────────────────────────────────────────────────────────────────────────
// GET  /api/admin/slider-settings          → 전체 조회 (카테고리='slider')
// PUT  /api/admin/slider-settings          → 여러 키 일괄 저장 {key:value, ...}
// POST /api/admin/slider-settings/reset    → 기본값으로 리셋
// POST /api/admin/slider-settings/preset/:name → 사전 정의 프리셋 적용
// ──────────────────────────────────────────────────────────────────────────

admin.get('/slider-settings', async (c) => {
  const result = await c.env.DB.prepare(
    "SELECT key, value, description FROM site_settings WHERE category = 'slider' ORDER BY key"
  ).all();
  return c.json({ success: true, data: result.results });
});

admin.put('/slider-settings', async (c) => {
  const body = await c.req.json<Record<string, string>>();
  if (!body || typeof body !== 'object') {
    return c.json({ error: 'Request body must be a key-value object' }, 400);
  }
  const db = c.env.DB;
  const stmts: any[] = [];
  let updated = 0;
  for (const [key, val] of Object.entries(body)) {
    if (typeof key !== 'string' || !key.startsWith('slider_')) continue; // 안전장치
    const value = val == null ? '' : String(val);
    stmts.push(
      db.prepare(
        "UPDATE site_settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ? AND category = 'slider'"
      ).bind(value, key)
    );
    updated++;
  }
  if (stmts.length > 0) {
    await db.batch(stmts);
  }
  return c.json({ success: true, updated });
});

// 슬라이더 기본값 (마이그레이션 0029와 동일)
const SLIDER_DEFAULTS: Record<string, string> = {
  slider_total_mode: 'sum',
  slider_round_mode: 'round',
  slider_decimal_places: '0',
  slider_number_unit: '개월',
  slider_total_format: '약 {N}개월',
  slider_prep_format: '준비 {N}개월',
  slider_eval_format: '평가 {N}개월',
  slider_reduction_format: '{N}%',
  slider_saving_format: '약 {N}개월 절감',
  slider_prep_label: '준비',
  slider_eval_label: '평가',
  slider_gen_prep_color: '#F59E0B',
  slider_gen_eval_color: '#94A3B8',
  slider_gen_min_width: '15',
  slider_gen_transition: '0.7',
  slider_koist_prep_color: '#F59E0B',
  slider_koist_eval_color: '#3B82F6',
  slider_koist_min_width: '8',
  slider_koist_transition: '0.5',
  slider_track_color_1: '#EF4444',
  slider_track_color_2: '#F59E0B',
  slider_track_color_3: '#10B981',
  slider_track_color_4: '#3B82F6',
  slider_track_opacity: '0.20',
  slider_badge_grad_start: '#10B981',
  slider_badge_grad_end: '#059669',
  slider_badge_text_color: '#FFFFFF',
  slider_gen_prep_ratio: '55',
  slider_gen_eval_ratio: '45',
  slider_koist_prep_ratio: '40',
  slider_koist_eval_ratio: '60',
  slider_weeks_per_month: '4.345',
};

admin.post('/slider-settings/reset', async (c) => {
  const db = c.env.DB;
  const stmts = Object.entries(SLIDER_DEFAULTS).map(([k, v]) =>
    db.prepare(
      "UPDATE site_settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ? AND category = 'slider'"
    ).bind(v, k)
  );
  await db.batch(stmts);
  return c.json({ success: true, reset: stmts.length });
});

// 색상 프리셋: 기본/모노톤/다크/파스텔
const SLIDER_PRESETS: Record<string, Record<string, string>> = {
  default: {
    slider_gen_prep_color: '#F59E0B',
    slider_gen_eval_color: '#94A3B8',
    slider_koist_prep_color: '#F59E0B',
    slider_koist_eval_color: '#3B82F6',
    slider_track_color_1: '#EF4444',
    slider_track_color_2: '#F59E0B',
    slider_track_color_3: '#10B981',
    slider_track_color_4: '#3B82F6',
    slider_badge_grad_start: '#10B981',
    slider_badge_grad_end: '#059669',
  },
  monotone: {
    slider_gen_prep_color: '#64748B',
    slider_gen_eval_color: '#CBD5E1',
    slider_koist_prep_color: '#475569',
    slider_koist_eval_color: '#94A3B8',
    slider_track_color_1: '#334155',
    slider_track_color_2: '#64748B',
    slider_track_color_3: '#94A3B8',
    slider_track_color_4: '#CBD5E1',
    slider_badge_grad_start: '#334155',
    slider_badge_grad_end: '#1E293B',
  },
  dark: {
    slider_gen_prep_color: '#DC2626',
    slider_gen_eval_color: '#1F2937',
    slider_koist_prep_color: '#DC2626',
    slider_koist_eval_color: '#1D4ED8',
    slider_track_color_1: '#991B1B',
    slider_track_color_2: '#B91C1C',
    slider_track_color_3: '#15803D',
    slider_track_color_4: '#1D4ED8',
    slider_badge_grad_start: '#065F46',
    slider_badge_grad_end: '#064E3B',
  },
  pastel: {
    slider_gen_prep_color: '#FCD34D',
    slider_gen_eval_color: '#E5E7EB',
    slider_koist_prep_color: '#FCD34D',
    slider_koist_eval_color: '#93C5FD',
    slider_track_color_1: '#FCA5A5',
    slider_track_color_2: '#FCD34D',
    slider_track_color_3: '#6EE7B7',
    slider_track_color_4: '#93C5FD',
    slider_badge_grad_start: '#6EE7B7',
    slider_badge_grad_end: '#34D399',
  },
};

admin.post('/slider-settings/preset/:name', async (c) => {
  const name = c.req.param('name');
  const preset = SLIDER_PRESETS[name];
  if (!preset) return c.json({ error: `Unknown preset: ${name}` }, 400);
  const db = c.env.DB;
  const stmts = Object.entries(preset).map(([k, v]) =>
    db.prepare(
      "UPDATE site_settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ? AND category = 'slider'"
    ).bind(v, k)
  );
  await db.batch(stmts);
  return c.json({ success: true, preset: name, applied: stmts.length });
});

// ---- Popups CRUD ----
admin.get('/popups', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM popups ORDER BY sort_order').all();
  return c.json({ success: true, data: result.results });
});

admin.post('/popups', async (c) => {
  const body = await c.req.json();
  // v39.16 Phase 2-E: card_width_cm, card_height_cm 추가
  const { title, content, image_url, popup_type, width, height, position_top, position_left, start_date, end_date, is_active, sort_order, font_size, title_font_size, bg_color, title_bg_color, text_color, title_color, line_height, padding, card_width_cm, card_height_cm } = body;
  await c.env.DB.prepare(
    'INSERT INTO popups (title, content, image_url, popup_type, width, height, position_top, position_left, start_date, end_date, is_active, sort_order, font_size, title_font_size, bg_color, title_bg_color, text_color, title_color, line_height, padding, card_width_cm, card_height_cm) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
  ).bind(title, content || '', image_url || '', popup_type || 'html', width || 420, height || 300, position_top || 100, position_left || 0, start_date || null, end_date || null, is_active ?? 1, sort_order || 0, font_size || 17, title_font_size || 17, bg_color || '#ffffff', title_bg_color || '', text_color || '#374151', title_color || '#1f2937', line_height || 1.7, padding || 20, card_width_cm ?? null, card_height_cm ?? null).run();
  return c.json({ success: true });
});

admin.put('/popups/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  // v39.16 Phase 2-E: card_width_cm, card_height_cm 추가
  const fields = ['title', 'content', 'image_url', 'popup_type', 'width', 'height', 'position_top', 'position_left', 'start_date', 'end_date', 'is_active', 'sort_order', 'font_size', 'title_font_size', 'bg_color', 'title_bg_color', 'text_color', 'title_color', 'line_height', 'padding', 'card_width_cm', 'card_height_cm'];
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
  const { name, slug, description, icon, color, sort_order, image_url, header_bg_url, contact_dept, contact_name, contact_phone } = await c.req.json();
  await c.env.DB.prepare('INSERT INTO departments (name, slug, description, icon, color, sort_order, image_url, header_bg_url, contact_dept, contact_name, contact_phone) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(name, slug, description || '', icon || 'fa-shield-halved', color || '#3B82F6', sort_order || 0, image_url || '', header_bg_url || '', contact_dept || '', contact_name || '', contact_phone || '').run();
  return c.json({ success: true });
});

admin.put('/departments/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const fields = ['name', 'slug', 'description', 'icon', 'color', 'sort_order', 'is_active', 'image_url', 'header_bg_url', 'contact_dept', 'contact_name', 'contact_phone', 'use_legacy_theme', 'english_subtitle'];
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
  const fields = ['title', 'slug', 'content', 'sort_order', 'is_active', 'meta_description', 'header_bg_url'];
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
  const result = await c.env.DB.prepare('SELECT * FROM progress_items ORDER BY sort_order ASC').all();
  return c.json({ success: true, data: result.results });
});

admin.post('/progress', async (c) => {
  const { category, product_name, company, status, assurance_level, cert_type, eval_type, start_date, end_date, note } = await c.req.json();
  await c.env.DB.prepare('INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, start_date, end_date, note) VALUES (?,?,?,?,?,?,?,?,?,?)').bind(category, product_name, company||'', status||'평가접수', assurance_level||'', cert_type||'최초평가', eval_type||'국내평가', start_date||null, end_date||null, note||'').run();
  return c.json({ success: true });
});

admin.put('/progress/:id', async (c) => {
  const body = await c.req.json();
  const fields = ['category', 'product_name', 'company', 'status', 'assurance_level', 'cert_type', 'eval_type', 'start_date', 'end_date', 'note'];
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

// ---- Images Management (R2) ----

// ---- Sim Cert Types CRUD (AI 시뮬레이터) ----
admin.get('/sim-cert-types', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM sim_cert_types ORDER BY sort_order').all();
  return c.json({ success: true, data: result.results });
});

admin.post('/sim-cert-types', async (c) => {
  const { name, slug, icon, color, traditional_min_weeks, traditional_max_weeks, koist_min_weeks, koist_max_weeks, description, sort_order } = await c.req.json();
  await c.env.DB.prepare(
    'INSERT INTO sim_cert_types (name, slug, icon, color, traditional_min_weeks, traditional_max_weeks, koist_min_weeks, koist_max_weeks, description, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?)'
  ).bind(name, slug, icon || 'fa-shield-halved', color || '#3B82F6', traditional_min_weeks || 12, traditional_max_weeks || 28, koist_min_weeks || 7, koist_max_weeks || 20, description || '', sort_order || 0).run();
  return c.json({ success: true });
});

admin.put('/sim-cert-types/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const fields = ['name', 'slug', 'icon', 'color', 'traditional_min_weeks', 'traditional_max_weeks', 'koist_min_weeks', 'koist_max_weeks', 'description', 'sort_order', 'is_active'];
  const updates: string[] = [];
  const values: any[] = [];
  for (const f of fields) { if (body[f] !== undefined) { updates.push(`${f} = ?`); values.push(body[f]); } }
  if (updates.length === 0) return c.json({ error: 'No fields' }, 400);
  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  await c.env.DB.prepare(`UPDATE sim_cert_types SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
  return c.json({ success: true });
});

admin.delete('/sim-cert-types/:id', async (c) => {
  await c.env.DB.prepare('DELETE FROM sim_cert_types WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ success: true });
});

// ---- Images Management (R2) (continued) ----
admin.get('/images', async (c) => {
  const category = c.req.query('category') || '';
  let sql = 'SELECT * FROM images ORDER BY created_at DESC';
  const binds: string[] = [];
  if (category) {
    sql = 'SELECT * FROM images WHERE category = ? ORDER BY created_at DESC';
    binds.push(category);
  }
  const stmt = c.env.DB.prepare(sql);
  const result = await (binds.length > 0 ? stmt.bind(...binds) : stmt).all<ImageRecord>();
  return c.json({ success: true, data: result.results || [] });
});

// Check if R2 is available
function hasR2(env: Bindings): boolean {
  return !!(env as any).R2;
}

// GET /api/admin/images/r2-status - Check R2 availability
admin.get('/images/r2-status', async (c) => {
  return c.json({ success: true, r2_available: hasR2(c.env) });
});

admin.post('/images', async (c) => {
  try {
    const contentType = c.req.header('content-type') || '';
    const maxBytes = parseInt(c.env.IMAGE_MAX_BYTES || '5242880', 10); // Default 5 MB
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await c.req.formData();
      const file = formData.get('file') as File | null;
      const category = (formData.get('category') as string) || 'general';
      const altText = (formData.get('alt_text') as string) || '';

      if (!file) return c.json({ error: '파일을 선택해주세요.' }, 400);

      // Disallow SVG by default (XSS vector)
      if (file.type === 'image/svg+xml') {
        return c.json({ error: 'SVG 파일은 보안상 업로드할 수 없습니다.' }, 400);
      }

      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const allowedVideoTypes = ['video/mp4', 'video/webm'];
      const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
      const isVideo = allowedVideoTypes.includes(file.type);
      if (!allowedTypes.includes(file.type)) {
        return c.json({ error: '지원하지 않는 파일 형식입니다. (JPG, PNG, GIF, WebP, MP4, WebM 가능)' }, 400);
      }

      // Video files allow up to 20 MB; images use default maxBytes
      const effectiveMaxBytes = isVideo ? Math.max(maxBytes, 20 * 1024 * 1024) : maxBytes;
      if (file.size > effectiveMaxBytes) {
        return c.json({ error: `파일 크기는 ${Math.round(effectiveMaxBytes / 1024 / 1024)}MB 이하만 가능합니다.` }, 400);
      }

      // Validate magic bytes
      const arrayBuffer = await file.arrayBuffer();
      const header = new Uint8Array(arrayBuffer.slice(0, 32));
      const magicValid = validateMagicBytes(header, file.type);
      if (!magicValid) {
        return c.json({ error: '파일 내용이 확장자와 일치하지 않습니다.' }, 400);
      }

      // Video files use 'videos/' prefix in R2
      const uploadCategory = isVideo ? 'videos' : category;

      const timestamp = Date.now();
      const ext = file.name.split('.').pop()?.toLowerCase() || (isVideo ? 'mp4' : 'jpg');
      const safeName = `${uploadCategory}/${timestamp}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
      
      if (hasR2(c.env)) {
        await c.env.R2.put(safeName, arrayBuffer, {
          httpMetadata: { contentType: file.type },
        });
      }

      await c.env.DB.prepare(
        'INSERT INTO images (file_name, original_name, r2_key, mime_type, file_size, category, alt_text) VALUES (?,?,?,?,?,?,?)'
      ).bind(safeName, file.name, safeName, file.type, file.size, category, altText).run();

      const image = await c.env.DB.prepare('SELECT * FROM images WHERE r2_key = ?').bind(safeName).first<ImageRecord>();

      return c.json({ 
        success: true, 
        data: image,
        url: `/api/images/${safeName}` 
      });
    } else if (contentType.includes('application/json')) {
      // URL-based image registration (no R2 needed)
      const { url, category, alt_text } = await c.req.json();
      if (!url) return c.json({ error: 'URL을 입력해주세요.' }, 400);

      // Validate external URL
      if (!isValidExternalUrl(url)) {
        return c.json({ error: '유효하지 않은 URL입니다. HTTPS URL만 허용됩니다.' }, 400);
      }

      const safeName = url;
      await c.env.DB.prepare(
        'INSERT INTO images (file_name, original_name, r2_key, mime_type, file_size, category, alt_text) VALUES (?,?,?,?,?,?,?)'
      ).bind(safeName, url.split('/').pop() || 'image', safeName, 'image/external', 0, category || 'general', alt_text || '').run();

      const image = await c.env.DB.prepare('SELECT * FROM images WHERE r2_key = ?').bind(safeName).first<ImageRecord>();
      return c.json({ success: true, data: image, url });
    } else {
      return c.json({ error: 'Content-Type must be multipart/form-data or application/json' }, 400);
    }
  } catch (err: any) {
    return c.json({ error: '업로드 실패: ' + (err.message || '알 수 없는 오류') }, 500);
  }
});

admin.delete('/images/:id', async (c) => {
  const id = c.req.param('id');
  const image = await c.env.DB.prepare('SELECT * FROM images WHERE id = ?').bind(id).first<ImageRecord>();
  if (!image) return c.json({ error: '이미지를 찾을 수 없습니다.' }, 404);

  // Delete from R2 (only if R2 is available and it's not an external URL)
  if (hasR2(c.env) && image.mime_type !== 'image/external') {
    try {
      await c.env.R2.delete(image.r2_key);
    } catch {
      // R2 delete failure is non-critical
    }
  }

  await c.env.DB.prepare('DELETE FROM images WHERE id = ?').bind(id).run();
  return c.json({ success: true });
});

// ── Upload Validation Helpers ──

/** Validate file magic bytes against claimed MIME type */
function validateMagicBytes(header: Uint8Array, mimeType: string): boolean {
  const signatures: Record<string, number[][]> = {
    'image/jpeg': [[0xFF, 0xD8, 0xFF]],
    'image/png': [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
    'image/gif': [[0x47, 0x49, 0x46, 0x38, 0x37, 0x61], [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]], // GIF87a, GIF89a
    'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF (then WEBP at offset 8)
    // Video formats — ftyp box at offset 4 (ISO Base Media File Format)
    'video/mp4': [[0x66, 0x74, 0x79, 0x70]], // "ftyp" at offset 4
    'video/webm': [[0x1A, 0x45, 0xDF, 0xA3]], // EBML header
  };

  const sigs = signatures[mimeType];
  if (!sigs) return false;

  // MP4: ftyp box starts at byte 4, not byte 0
  if (mimeType === 'video/mp4') {
    return sigs.some(sig => sig.every((byte, i) => header[i + 4] === byte));
  }

  return sigs.some(sig => sig.every((byte, i) => header[i] === byte));
}

/** Validate external image URL: must be HTTPS, no loopback/private IPs */
function isValidExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return false;

    const hostname = parsed.hostname.toLowerCase();

    // Block loopback
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1' || hostname === '[::1]') return false;

    // Block private IP ranges
    if (/^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|169\.254\.)/.test(hostname)) return false;

    // Block link-local
    if (hostname.startsWith('fe80:')) return false;

    // Block internal hostnames
    if (hostname.endsWith('.local') || hostname.endsWith('.internal') || hostname.endsWith('.corp')) return false;

    // Whitelist file extensions (optional — image URLs may not always have extensions)
    const path = parsed.pathname.toLowerCase();
    const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif', '.bmp'];
    const hasExt = allowedExts.some(ext => path.endsWith(ext));
    // Allow if extension matches or if it's a CDN/API URL without extension
    if (path.includes('.') && !hasExt) {
      const ext = path.split('.').pop();
      if (ext && ext.length <= 5 && !allowedExts.some(e => e.slice(1) === ext)) return false;
    }

    return true;
  } catch {
    return false;
  }
}

export default admin;
