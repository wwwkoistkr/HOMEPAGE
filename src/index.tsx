// KOIST Website - Main Entry Point
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Bindings, Variables, Department, DepartmentWithPages, Popup, Notice, ProgressItem, DepPage, FAQ, AboutPage, SimCertType } from './types';
import { getSettings, getDepartmentsWithPages } from './utils/db';
import { verifyPassword, createJWT, verifyJWT } from './utils/crypto';
import { authMiddleware, getJwtSecret } from './middleware/auth';
import { sanitizeHtml, escapeHtml } from './utils/sanitize';
import { csrfCookieMiddleware, csrfValidationMiddleware } from './middleware/csrf';
import { loginRateLimiter, inquiryRateLimiter } from './middleware/rate-limit';
import { secureHeaders } from 'hono/secure-headers';

import publicApi from './routes/api';
import adminApi from './routes/admin';

import { layout } from './templates/layout';
import { homePage } from './templates/home';
import { adminLoginPage, changePasswordContent, adminDashboardPage, adminDashboardContent } from './templates/admin/index';
import { homeContentPage } from './templates/admin/home-content';
import { backgroundMediaPage } from './templates/admin/background-media';
import { servicePage, noticeListPage, noticeDetailPage, faqPage, inquiryPage, progressPage, serviceProgressContent, downloadsPage } from './templates/pages';

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// ===== Helpers =====
// v39.19: 공개 페이지에서 "현재 사용자가 유효한 관리자 세션인지"를 판정해
// 시스템 문서 등 관리자 전용 UI 요소의 렌더링 여부를 결정한다.
// 실제 접근 보호는 /support/documents 및 /api/docs/* 의 authMiddleware에서 수행.
async function isAuthenticatedAdmin(c: any): Promise<boolean> {
  try {
    const cookie = c.req.header('Cookie') || '';
    const m = cookie.match(/(?:^|;\s*)koist_token=([^;]+)/);
    if (!m) return false;
    const token = decodeURIComponent(m[1]);
    const secret = getJwtSecret(c.env);
    const payload = await verifyJWT(token, secret);
    return !!payload;
  } catch {
    return false;
  }
}

// ===== Security Headers =====
app.use('*', secureHeaders({
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.tailwindcss.com", "https://cdn.jsdelivr.net", "https://unpkg.com", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
    imgSrc: ["'self'", "data:", "https:", "blob:"],
    fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
    mediaSrc: ["'self'", "blob:", "data:"],
    connectSrc: ["'self'", "https://www.google-analytics.com", "https://www.googletagmanager.com"],
    frameSrc: ["'none'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
  },
  xFrameOptions: 'DENY',
  referrerPolicy: 'strict-origin-when-cross-origin',
  permissionsPolicy: {
    camera: [],
    microphone: [],
    geolocation: [],
  },
}));

// CORS for API
app.use('/api/*', cors());

// NOTE: /api/init-db removed (security hardening). Use scripts/init-admin.cjs instead.

// v39.19: 모든 공개 페이지 요청에서 관리자 세션 여부를 컨텍스트에 미리 판정
// — 템플릿(layout/home)에서 시스템 문서 UI를 조건부 렌더링하기 위함
app.use('*', async (c, next) => {
  c.set('isAdmin', await isAuthenticatedAdmin(c));
  await next();
});

// ===== Public API Routes =====
app.route('/api', publicApi);

// ===== Admin API Routes =====
// Login doesn't need auth middleware but needs rate limiting
app.post('/api/admin/login', loginRateLimiter, async (c) => {
  const db = c.env.DB;
  let body: { username?: string; password?: string };
  try { body = await c.req.json(); } catch { return c.json({ error: '잘못된 요청입니다.' }, 400); }
  const { username, password } = body;
  if (!username || !password) return c.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, 401);

  const user = await db.prepare(
    'SELECT id, username, password_hash, salt, must_change_password FROM admin_users WHERE username = ?'
  ).bind(username).first<{
    id: number; username: string; password_hash: string; salt: string; must_change_password: number;
  }>();
  if (!user) return c.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, 401);

  const valid = await verifyPassword(password, user.salt, user.password_hash);
  if (!valid) return c.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, 401);

  let secret: string;
  try { secret = getJwtSecret(c.env); } catch { return c.json({ error: 'Server misconfigured' }, 500); }

  await db.prepare('UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').bind(user.id).run();
  const token = await createJWT({ id: user.id, username: user.username }, secret);

  // Set HttpOnly secure cookie
  const isSecure = c.req.url.startsWith('https');
  const cookieFlags = `Path=/; HttpOnly; SameSite=Lax; Max-Age=86400${isSecure ? '; Secure' : ''}`;
  c.header('Set-Cookie', `koist_token=${token}; ${cookieFlags}`);

  return c.json({ success: true, must_change_password: user.must_change_password === 1 });
});

// Logout — expire cookie
app.post('/api/admin/logout', (c) => {
  const isSecure = c.req.url.startsWith('https');
  const cookieFlags = `Path=/; HttpOnly; SameSite=Lax; Max-Age=0${isSecure ? '; Secure' : ''}`;
  c.header('Set-Cookie', `koist_token=; ${cookieFlags}`);
  return c.json({ success: true });
});

// All other admin API routes require auth + CSRF
app.use('/api/admin/*', authMiddleware);
app.use('/api/admin/*', csrfValidationMiddleware);
app.route('/api/admin', adminApi);

// ===== Secure Docs (v39.19) =====
// /api/docs/* — 관리자 전용 보안 문서 서빙 (R2 secure-docs/ prefix)
// 반드시 authMiddleware로 보호되며, 경로 traversal 차단 + 허용 파일만 서빙
app.get('/api/docs/*', authMiddleware, async (c) => {
  // 허용 파일 화이트리스트 (확장 시 여기만 수정)
  const ALLOWED_FILES: Record<string, string> = {
    'architecture-diagram.html': 'text/html; charset=utf-8',
    'development-guide.html': 'text/html; charset=utf-8',
  };

  const rawKey = c.req.path.replace('/api/docs/', '');
  // 경로 traversal / 빈 경로 차단
  if (!rawKey || rawKey.includes('..') || rawKey.includes('/') || rawKey.startsWith('.')) {
    return c.json({ error: 'Invalid document path' }, 400);
  }
  // 화이트리스트 검증
  if (!(rawKey in ALLOWED_FILES)) {
    return c.json({ error: 'Document not found' }, 404);
  }

  if (!(c.env as any).R2) {
    return c.json({ error: 'R2 storage not configured' }, 503);
  }

  try {
    const r2Key = `secure-docs/${rawKey}`;
    const object = await c.env.R2.get(r2Key);
    if (!object) {
      return c.json({ error: 'Document not found in storage' }, 404);
    }

    const headers = new Headers();
    headers.set('Content-Type', object.httpMetadata?.contentType || ALLOWED_FILES[rawKey]);
    headers.set('Content-Length', String(object.size));
    // 보안: 캐싱 금지 + 검색엔진 배제 + 다운로드 방어
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'no-referrer');
    return new Response(object.body, { headers });
  } catch {
    return c.json({ error: 'Failed to retrieve document' }, 500);
  }
});

// ===== Page Routes =====

// Home Page
app.get('/', async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = await getDepartmentsWithPages(db);
  
  const now = new Date().toISOString();
  const popups = (await db.prepare(
    `SELECT * FROM popups WHERE is_active = 1 
     AND (start_date IS NULL OR start_date <= ?) 
     AND (end_date IS NULL OR end_date >= ?) 
     ORDER BY sort_order`
  ).bind(now, now).all<Popup>()).results || [];

  const notices = (await db.prepare('SELECT * FROM notices ORDER BY is_pinned DESC, created_at DESC LIMIT 5').all<Notice>()).results || [];
  const progressItems = (await db.prepare('SELECT * FROM progress_items ORDER BY created_at DESC LIMIT 10').all<ProgressItem>()).results || [];
  const progressCategoryCounts = (await db.prepare(`SELECT category, COUNT(*) as cnt FROM progress_items GROUP BY category ORDER BY cnt DESC`).all<{category:string;cnt:number}>()).results || [];

  // AI 시뮬레이터 인증유형 데이터
  const simCertTypes = (await db.prepare('SELECT * FROM sim_cert_types WHERE is_active = 1 ORDER BY sort_order').all<SimCertType>()).results || [];

  // v39.19: 시스템 문서 탭/링크를 관리자에게만 노출 (보호는 서버 미들웨어에서 최종 수행)
  const isAdmin = !!c.get('isAdmin');
  const content = homePage({ settings, departments, popups, notices, progressItems, progressCategoryCounts, simCertTypes, isAdmin });
  return c.html(layout({ settings, departments, content, isAdmin }));
});

// v39.8 Issue A-2: mock-test/overview → diagnosis/ddos 301 리다이렉트
// 원본 koist.kr/test4/page02 (DDoS 모의훈련) 콘텐츠는 /services/diagnosis/ddos 에 존재
app.get('/services/mock-test/overview', (c) => {
  return c.redirect('/services/diagnosis/ddos', 301);
});
app.get('/services/mock-test', (c) => {
  return c.redirect('/services/diagnosis/ddos', 301);
});

// Service Pages
app.get('/services/:slug', async (c) => {
  const db = c.env.DB;
  const slug = c.req.param('slug');
  const settings = await getSettings(db);
  const departments = await getDepartmentsWithPages(db);
  
  const dept = await db.prepare('SELECT * FROM departments WHERE slug = ?').bind(slug).first<Department>();
  if (!dept) return c.html(layout({ settings, departments, isAdmin: !!c.get('isAdmin'), title: '페이지를 찾을 수 없습니다', content: '<div class="py-20 text-center"><h1 class="text-2xl font-bold text-gray-400">페이지를 찾을 수 없습니다</h1><a href="/" class="mt-4 inline-block text-accent hover:underline">홈으로 돌아가기</a></div>' }), 404);

  const pages = (await db.prepare('SELECT * FROM dep_pages WHERE dept_id = ? AND is_active = 1 ORDER BY sort_order').bind(dept.id).all<DepPage>()).results || [];
  const firstPage = pages.length > 0 ? pages[0] : null;

  const content = servicePage(dept, pages, firstPage, settings);
  return c.html(layout({ settings, departments, isAdmin: !!c.get('isAdmin'), title: dept.name, content }));
});

app.get('/services/:slug/:pageSlug', async (c) => {
  const db = c.env.DB;
  const { slug, pageSlug } = c.req.param();
  const settings = await getSettings(db);
  const departments = await getDepartmentsWithPages(db);

  const dept = await db.prepare('SELECT * FROM departments WHERE slug = ?').bind(slug).first<Department>();
  if (!dept) return c.redirect('/');

  const pages = (await db.prepare('SELECT * FROM dep_pages WHERE dept_id = ? AND is_active = 1 ORDER BY sort_order').bind(dept.id).all<DepPage>()).results || [];
  const currentPage = pages.find(p => p.slug === pageSlug) || null;

  // Special handling: if pageSlug is 'progress', render dynamic progress data
  if (pageSlug === 'progress') {
    const page = parseInt(c.req.query('page') || '1') || 1;
    const perPage = 15;
    const search = c.req.query('q') || '';
    const statusFilter = c.req.query('status') || '';
    const categoryFilter = c.req.query('category') || '';

    let whereClause = '1=1';
    const binds: string[] = [];
    if (categoryFilter) { whereClause += ' AND category = ?'; binds.push(categoryFilter); }
    if (search) { whereClause += ' AND product_name LIKE ?'; binds.push(`%${search}%`); }
    if (statusFilter) { whereClause += ' AND status = ?'; binds.push(statusFilter); }

    const countStmt = db.prepare(`SELECT COUNT(*) as cnt FROM progress_items WHERE ${whereClause}`);
    const totalResult = await (binds.length > 0 ? countStmt.bind(...binds) : countStmt).first<{ cnt: number }>();
    const total = totalResult?.cnt || 0;

    const offset = (page - 1) * perPage;
    const dataStmt = db.prepare(`SELECT * FROM progress_items WHERE ${whereClause} ORDER BY sort_order ASC LIMIT ? OFFSET ?`);
    const allBinds = [...binds, perPage, offset];
    const items = (await dataStmt.bind(...allBinds).all<ProgressItem>()).results || [];

    const categoryCounts = (await db.prepare(`SELECT category, COUNT(*) as cnt FROM progress_items GROUP BY category ORDER BY category`).all<{category:string;cnt:number}>()).results || [];

    // Override the page content with dynamic progress table
    const dynamicContent = serviceProgressContent(items, page, total, perPage, search, statusFilter, categoryFilter, categoryCounts);
    const overriddenPage = currentPage ? { ...currentPage, content: dynamicContent } : { id: 0, dept_id: dept.id, title: '평가현황', slug: 'progress', content: dynamicContent, meta_description: '', sort_order: 0, is_active: 1 } as DepPage;

    const content = servicePage(dept, pages, overriddenPage, settings);
    return c.html(layout({ settings, departments, isAdmin: !!c.get('isAdmin'), title: `평가현황 - ${dept.name}`, content }));
  }

  const content = servicePage(dept, pages, currentPage, settings);
  return c.html(layout({ settings, departments, isAdmin: !!c.get('isAdmin'), title: currentPage ? `${currentPage.title} - ${dept.name}` : dept.name, content }));
});

// Notice Pages
app.get('/support/notice', async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = await getDepartmentsWithPages(db);
  const page = parseInt(c.req.query('page') || '1');
  const perPage = 15;
  const total = (await db.prepare('SELECT COUNT(*) as cnt FROM notices').first<{ cnt: number }>())?.cnt || 0;
  const notices = (await db.prepare('SELECT * FROM notices ORDER BY is_pinned DESC, created_at DESC LIMIT ? OFFSET ?').bind(perPage, (page - 1) * perPage).all<Notice>()).results || [];

  const content = noticeListPage(notices, page, total, perPage, settings);
  return c.html(layout({ settings, departments, isAdmin: !!c.get('isAdmin'), title: '공지사항', content }));
});

app.get('/support/notice/:id', async (c) => {
  const db = c.env.DB;
  const id = c.req.param('id');
  const settings = await getSettings(db);
  const departments = await getDepartmentsWithPages(db);
  
  await db.prepare('UPDATE notices SET views = views + 1 WHERE id = ?').bind(id).run();
  const notice = await db.prepare('SELECT * FROM notices WHERE id = ?').bind(id).first<Notice>();
  if (!notice) return c.redirect('/support/notice');

  const content = noticeDetailPage(notice, settings);
  return c.html(layout({ settings, departments, isAdmin: !!c.get('isAdmin'), title: notice.title, content }));
});

// FAQ Page
app.get('/support/faq', async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = await getDepartmentsWithPages(db);
  const faqs = (await db.prepare('SELECT * FROM faqs WHERE is_active = 1 ORDER BY sort_order').all<FAQ>()).results || [];

  const content = faqPage(faqs, settings);
  return c.html(layout({ settings, departments, isAdmin: !!c.get('isAdmin'), title: 'FAQ', content }));
});

// Inquiry Page
app.get('/support/inquiry', async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = await getDepartmentsWithPages(db);

  const content = inquiryPage(settings);
  return c.html(layout({ settings, departments, isAdmin: !!c.get('isAdmin'), title: '온라인 상담문의', content }));
});

// Progress Page (with pagination, search, filter)
app.get('/support/progress', async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = await getDepartmentsWithPages(db);

  const page = parseInt(c.req.query('page') || '1') || 1;
  const perPage = 15;
  const search = c.req.query('q') || '';
  const statusFilter = c.req.query('status') || '';
  const categoryFilter = c.req.query('category') || '';

  let whereClause = '1=1';
  const binds: string[] = [];
  if (categoryFilter) {
    whereClause += ' AND category = ?';
    binds.push(categoryFilter);
  }
  if (search) {
    whereClause += ' AND product_name LIKE ?';
    binds.push(`%${search}%`);
  }
  if (statusFilter) {
    whereClause += ' AND status = ?';
    binds.push(statusFilter);
  }

  const countStmt = db.prepare(`SELECT COUNT(*) as cnt FROM progress_items WHERE ${whereClause}`);
  const totalResult = await (binds.length > 0 ? countStmt.bind(...binds) : countStmt).first<{ cnt: number }>();
  const total = totalResult?.cnt || 0;

  // Get category counts for tabs
  const categoryCounts = (await db.prepare(`SELECT category, COUNT(*) as cnt FROM progress_items GROUP BY category ORDER BY category`).all<{category:string;cnt:number}>()).results || [];

  const offset = (page - 1) * perPage;
  const dataStmt = db.prepare(`SELECT * FROM progress_items WHERE ${whereClause} ORDER BY sort_order ASC LIMIT ? OFFSET ?`);
  const allBinds = [...binds, perPage, offset];
  const items = (await dataStmt.bind(...allBinds).all<ProgressItem>()).results || [];

  const content = progressPage(items, page, total, perPage, search, statusFilter, categoryFilter, categoryCounts, settings);
  return c.html(layout({ settings, departments, isAdmin: !!c.get('isAdmin'), title: categoryFilter ? `${categoryFilter} 현황` : '평가현황', content }));
});

// Documents Page (Architecture Diagram + Dev Guide downloads)
// v39.19: 보안 강화 — 관리자 전용(authMiddleware), 파일은 R2(secure-docs/)에서 서빙
app.get('/support/documents', authMiddleware, async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = await getDepartmentsWithPages(db);
  const admin = c.get('admin');

  const content = `
  <section class="page-header relative overflow-hidden" style="padding: clamp(2.5rem,4vw,4.5rem) 0; background: linear-gradient(135deg, #0A0F1E 0%, #111D35 50%, #0D1525 100%);">
    <div class="relative fluid-container">
      <div class="flex items-center justify-between">
        <div class="flex items-center" style="gap:var(--space-sm)">
          <div class="rounded-lg flex items-center justify-center shrink-0" style="width:clamp(38px,3.2vw,46px); height:clamp(38px,3.2vw,46px); background: linear-gradient(135deg, rgba(139,92,246,0.20), rgba(139,92,246,0.10)); border: 1px solid rgba(139,92,246,0.15);">
            <i class="fas fa-lock" style="color:#A78BFA; font-size:var(--text-lg)"></i>
          </div>
          <div>
            <h1 class="text-white font-bold f-text-xl tracking-tight">시스템 문서 <span class="f-text-xs" style="color:#A78BFA; font-weight:500; margin-left:8px;"><i class="fas fa-shield-alt"></i> 관리자 전용</span></h1>
            <p class="text-slate-400/80 f-text-xs" style="margin-top:3px">설계서 및 개발지침서 (보안 문서)</p>
          </div>
        </div>
        <div class="flex items-center f-text-xs" style="gap:8px; color:#A78BFA;">
          <i class="fas fa-user-shield"></i>
          <span>${admin?.username ? String(admin.username).replace(/[<>&"']/g, '') : 'admin'}</span>
        </div>
      </div>
    </div>
  </section>
  <section style="padding:var(--space-xl) 0; background: var(--grad-surface);">
    <div class="fluid-container" style="max-width:min(900px, 100% - var(--container-pad) * 2)">
      <div style="display:flex; flex-direction:column; gap:var(--space-md)">
        <!-- Architecture Diagram -->
        <div class="bg-white rounded-xl border border-slate-200/60 overflow-hidden" style="box-shadow: var(--shadow-sm);">
          <div class="flex items-center justify-between" style="padding:clamp(1.25rem, 2vw, 1.75rem)">
            <div class="flex items-center" style="gap:var(--space-sm)">
              <div class="rounded-lg flex items-center justify-center shrink-0" style="width:44px; height:44px; background: linear-gradient(135deg, rgba(59,130,246,0.10), rgba(6,182,212,0.08));">
                <i class="fas fa-sitemap text-blue-500" style="font-size:18px"></i>
              </div>
              <div>
                <h3 class="font-bold text-slate-800 f-text-base">시스템 설계서 (Architecture Diagram)</h3>
                <p class="text-slate-400 f-text-xs" style="margin-top:2px">v8.0 | 시스템 아키텍처, 10개 사업 카테고리, DB 스키마, API 설계</p>
              </div>
            </div>
            <div class="flex shrink-0" style="gap:var(--space-sm)">
              <a href="/api/docs/architecture-diagram.html" target="_blank" class="btn-primary f-text-xs ripple-btn" style="padding:var(--space-xs) var(--space-md); border-radius:var(--radius-sm);">
                <i class="fas fa-external-link-alt" style="font-size:10px"></i> 보기
              </a>
            </div>
          </div>
        </div>
        <!-- Development Guide -->
        <div class="bg-white rounded-xl border border-slate-200/60 overflow-hidden" style="box-shadow: var(--shadow-sm);">
          <div class="flex items-center justify-between" style="padding:clamp(1.25rem, 2vw, 1.75rem)">
            <div class="flex items-center" style="gap:var(--space-sm)">
              <div class="rounded-lg flex items-center justify-center shrink-0" style="width:44px; height:44px; background: linear-gradient(135deg, rgba(16,185,129,0.10), rgba(6,182,212,0.08));">
                <i class="fas fa-code text-emerald-500" style="font-size:18px"></i>
              </div>
              <div>
                <h3 class="font-bold text-slate-800 f-text-base">개발지침서 (Development Guide)</h3>
                <p class="text-slate-400 f-text-xs" style="margin-top:2px">v8.0 | 기술 스택, 디렉터리 구조, API 가이드, 배포 절차, 테스트</p>
              </div>
            </div>
            <div class="flex shrink-0" style="gap:var(--space-sm)">
              <a href="/api/docs/development-guide.html" target="_blank" class="btn-primary f-text-xs ripple-btn" style="padding:var(--space-xs) var(--space-md); border-radius:var(--radius-sm);">
                <i class="fas fa-external-link-alt" style="font-size:10px"></i> 보기
              </a>
            </div>
          </div>
        </div>
        <p class="text-slate-400 f-text-xs text-center" style="margin-top:var(--space-sm)">
          <i class="fas fa-shield-alt mr-1"></i> 본 페이지와 문서는 관리자 인증 후에만 접근 가능합니다. 문서를 열고 브라우저의 인쇄 기능(Ctrl+P)으로 PDF로 저장할 수 있습니다.
        </p>
      </div>
    </div>
  </section>`;

  // 관리자 전용 페이지는 캐싱 금지
  c.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  c.header('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return c.html(layout({ settings, departments, isAdmin: !!c.get('isAdmin'), title: '시스템 문서 (관리자 전용)', content }));
});

// Downloads Page
app.get('/support/downloads', async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = await getDepartmentsWithPages(db);
  const items = (await db.prepare('SELECT * FROM downloads ORDER BY created_at DESC').all()).results || [];

  const content = downloadsPage(items as any[], settings);
  return c.html(layout({ settings, departments, isAdmin: !!c.get('isAdmin'), title: '자료실', content }));
});

// About pages (DB-driven, v27.1 - Premium layout with breadcrumbs)
app.get('/about/:page', async (c) => {
  const page = c.req.param('page');
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = await getDepartmentsWithPages(db);

  // Load from about_pages table
  let aboutPage: AboutPage | null = null;
  try {
    aboutPage = await db.prepare('SELECT * FROM about_pages WHERE slug = ?').bind(page).first<AboutPage>();
  } catch {
    // Table might not exist yet
  }

  // Minimal fallback for slug→title mapping (only if DB is empty)
  const slugTitleMap: Record<string, string> = {
    greeting: '인사말', history: '연혁', business: '사업소개', location: '오시는길'
  };

  const title = aboutPage?.title || slugTitleMap[page];
  const contentBody = aboutPage?.content;

  if (!title) return c.redirect('/');

  // Page icon map
  const iconMap: Record<string, string> = {
    greeting: 'fa-handshake', history: 'fa-clock-rotate-left',
    business: 'fa-briefcase', location: 'fa-location-dot'
  };
  const pageIcon = iconMap[page] || 'fa-building';

  // About sub-navigation tabs
  const aboutTabs = [
    { slug: 'greeting', title: '인사말', icon: 'fa-handshake' },
    { slug: 'history', title: '연혁', icon: 'fa-clock-rotate-left' },
    { slug: 'business', title: '사업소개', icon: 'fa-briefcase' },
    { slug: 'location', title: '오시는길', icon: 'fa-location-dot' },
  ];

  const contentHtml = `
    <!-- Page Header -->
    <section class="relative overflow-hidden" style="padding: clamp(2.5rem,4.5vw,4.5rem) 0; background: linear-gradient(135deg, #0A0F1E 0%, #111D35 50%, #0D1525 100%);">
      <div class="absolute top-4 right-[10%] w-32 h-32 rounded-full blur-3xl pointer-events-none" style="background: radial-gradient(circle, rgba(59,130,246,0.06), transparent);"></div>
      <div class="absolute bottom-2 left-[15%] w-24 h-24 rounded-full blur-3xl pointer-events-none" style="background: radial-gradient(circle, rgba(6,182,212,0.05), transparent);"></div>
      <div class="absolute inset-0 opacity-30" style="background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 24px 24px;"></div>
      <div class="relative fluid-container">
        <nav class="flex items-center flex-wrap text-slate-400 f-text-xs mb-3" style="gap:6px;">
          <a href="/" class="hover:text-white transition-colors"><i class="fas fa-home" style="font-size:10px"></i></a>
          <i class="fas fa-chevron-right text-[7px] text-slate-600/60"></i>
          <span class="text-slate-500">기관소개</span>
          <i class="fas fa-chevron-right text-[7px] text-slate-600/60"></i>
          <span class="text-white/80">${title}</span>
        </nav>
        <h1 class="text-white font-bold f-text-2xl flex items-center" style="gap:clamp(8px,1vw,14px)">
          <div class="rounded-xl flex items-center justify-center" style="width:clamp(36px,3vw,48px); height:clamp(36px,3vw,48px); background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.10)); border: 1px solid rgba(59,130,246,0.20);">
            <i class="fas ${pageIcon} text-blue-400" style="font-size:clamp(14px,1.2vw,20px)"></i>
          </div>
          ${title}
        </h1>
      </div>
    </section>

    <!-- Sub-navigation tabs -->
    <section class="bg-white border-b border-gray-100 sticky top-[var(--gnb-h)] z-30" style="box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
      <div class="fluid-container">
        <nav class="flex overflow-x-auto" style="gap:0; -ms-overflow-style:none; scrollbar-width:none;">
          ${aboutTabs.map(t => `
          <a href="/about/${t.slug}" class="flex items-center shrink-0 font-semibold transition-all ${page === t.slug ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800 border-b-2 border-transparent'}" style="gap:6px; padding:clamp(0.75rem,1vw,1rem) clamp(0.8rem,1.2vw,1.2rem); font-size:clamp(0.78rem,0.9vw,0.9rem); white-space:nowrap;">
            <i class="fas ${t.icon}" style="font-size:clamp(10px,0.8vw,13px)"></i>${t.title}
          </a>`).join('')}
        </nav>
      </div>
    </section>

    <!-- Content -->
    <section class="f-section-y" style="background: var(--grad-surface);">
      <div class="fluid-container" style="max-width:1000px;">
        <div class="bg-white rounded-2xl border border-gray-100 p-[clamp(1.5rem,3.5vw,3rem)]" style="box-shadow: 0 4px 24px rgba(0,0,0,0.04);">
          ${contentBody ? sanitizeHtml(contentBody) : `<div class="text-center py-12 text-gray-400"><i class="fas fa-edit text-3xl mb-3 block text-gray-300"></i><p class="font-medium">&ldquo;${escapeHtml(title)}&rdquo; 페이지 콘텐츠를 관리자 모드에서 등록해 주세요.</p><a href="/admin/about" class="inline-flex items-center gap-2 mt-4 text-blue-600 font-semibold text-sm hover:underline"><i class="fas fa-external-link-alt text-xs"></i>관리자 페이지로 이동</a></div>`}
        </div>
      </div>
    </section>`;

  return c.html(layout({ settings, departments, isAdmin: !!c.get('isAdmin'), title, content: contentHtml }));
});

// ===== Admin Page Routes =====
app.get('/admin', csrfCookieMiddleware, (c) => c.html(adminLoginPage()));

app.get('/admin/change-password', authMiddleware, csrfCookieMiddleware, async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const content = changePasswordContent();
  return c.html(adminDashboardPage(content, 'account', settings.logo_url || ''));
});

app.get('/admin/dashboard', authMiddleware, csrfCookieMiddleware, async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const [notices, departments, popups, inquiries, downloads, faqs] = await Promise.all([
    db.prepare('SELECT COUNT(*) as cnt FROM notices').first<{ cnt: number }>(),
    db.prepare('SELECT COUNT(*) as cnt FROM departments').first<{ cnt: number }>(),
    db.prepare('SELECT COUNT(*) as cnt FROM popups WHERE is_active = 1').first<{ cnt: number }>(),
    db.prepare('SELECT COUNT(*) as cnt FROM inquiries WHERE status = ?').bind('pending').first<{ cnt: number }>(),
    db.prepare('SELECT COUNT(*) as cnt FROM downloads').first<{ cnt: number }>(),
    db.prepare('SELECT COUNT(*) as cnt FROM faqs').first<{ cnt: number }>(),
  ]);

  const content = adminDashboardContent({
    notices: notices?.cnt || 0,
    departments: departments?.cnt || 0,
    popups: popups?.cnt || 0,
    inquiries: inquiries?.cnt || 0,
    downloads: downloads?.cnt || 0,
    faqs: faqs?.cnt || 0,
  });

  return c.html(adminDashboardPage(content, 'dashboard', settings.logo_url || ''));
});

// Admin Home Content Management
app.get('/admin/home-content', authMiddleware, csrfCookieMiddleware, async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const content = homeContentPage();
  return c.html(adminDashboardPage(content, 'home-content', settings.logo_url || ''));
});

// Admin Background & Media Management
app.get('/admin/background-media', authMiddleware, csrfCookieMiddleware, async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const content = backgroundMediaPage();
  return c.html(adminDashboardPage(content, 'background-media', settings.logo_url || ''));
});

// Admin CRUD pages
const adminPages = ['site-settings', 'departments', 'popups', 'notices', 'progress', 'downloads', 'faqs', 'inquiries', 'images', 'about', 'sim-cert-types', 'slider-settings'];
for (const page of adminPages) {
  app.get(`/admin/${page}`, authMiddleware, csrfCookieMiddleware, async (c) => {
    const db = c.env.DB;
    const settings = await getSettings(db);
    const jsFile = page === 'about' ? 'admin-about' : page === 'sim-cert-types' ? 'admin-sim-cert-types' : `admin-${page}`;
    const content = `
      <h1 class="text-2xl font-bold text-gray-800 mb-6">${getAdminPageTitle(page)}</h1>
      <div id="admin-content" class="bg-white rounded-xl border border-gray-100 p-6">
        <p class="text-gray-400"><i class="fas fa-spinner fa-spin mr-1"></i> 데이터를 불러오는 중...</p>
      </div>
      <script src="/static/js/admin-fetch.js"></script>
      <script src="/static/js/${jsFile}.js"></script>
    `;
    return c.html(adminDashboardPage(content, page, settings.logo_url || ''));
  });
}

function getAdminPageTitle(page: string): string {
  const titles: Record<string, string> = {
    'site-settings': '<i class="fas fa-cog text-blue-500 mr-2"></i>사이트 설정',
    departments: '<i class="fas fa-building text-blue-500 mr-2"></i>사업분야 관리',
    popups: '<i class="fas fa-window-restore text-purple-500 mr-2"></i>팝업 관리',
    notices: '<i class="fas fa-bullhorn text-green-500 mr-2"></i>공지사항 관리',
    progress: '<i class="fas fa-chart-bar text-yellow-500 mr-2"></i>평가현황 관리',
    images: '<i class="fas fa-images text-pink-500 mr-2"></i>이미지 관리',
    downloads: '<i class="fas fa-download text-teal-500 mr-2"></i>자료실 관리',
    faqs: '<i class="fas fa-circle-question text-yellow-500 mr-2"></i>FAQ 관리',
    inquiries: '<i class="fas fa-envelope text-orange-500 mr-2"></i>상담문의 관리',
    about: '<i class="fas fa-info-circle text-indigo-500 mr-2"></i>소개 페이지 관리',
    'sim-cert-types': '<i class="fas fa-robot text-cyan-500 mr-2"></i>AI 시뮬레이터 인증유형 관리',
    'slider-settings': '<i class="fas fa-sliders text-amber-500 mr-2"></i>슬라이더 UI 설정 (색상·텍스트·반올림)',
  };
  return titles[page] || page;
}

export default app;
