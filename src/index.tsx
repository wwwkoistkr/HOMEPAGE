// KOIST Website - Main Entry Point
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Bindings, Variables, Department, Popup, Notice, ProgressItem, DepPage, FAQ, AboutPage, SimCertType } from './types';
import { getSettings } from './utils/db';
import { hashPassword, generateSalt } from './utils/crypto';
import { authMiddleware } from './middleware/auth';

import publicApi from './routes/api';
import adminApi from './routes/admin';

import { layout } from './templates/layout';
import { homePage } from './templates/home';
import { adminLoginPage, changePasswordPage, adminDashboardPage, adminDashboardContent } from './templates/admin/index';
import { servicePage, noticeListPage, noticeDetailPage, faqPage, inquiryPage, progressPage, serviceProgressContent, downloadsPage } from './templates/pages';

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// CORS for API
app.use('/api/*', cors());

// ===== DB Seed / Init Route (protected - requires special header in production) =====
app.get('/api/init-db', async (c) => {
  const db = c.env.DB;
  // Check if admin already exists
  const existing = await db.prepare('SELECT id FROM admin_users WHERE username = ?').bind('admin').first();
  if (existing) return c.json({ message: 'Already initialized' });

  // Create admin user with default password: admin1234
  const salt = await generateSalt();
  const hash = await hashPassword('admin1234', salt);
  await db.prepare(
    'INSERT INTO admin_users (username, password_hash, salt, must_change_password) VALUES (?, ?, ?, 0)'
  ).bind('admin', hash, salt).run();

  return c.json({ success: true, message: 'Admin user created (admin/admin1234).' });
});

// ===== Public API Routes =====
app.route('/api', publicApi);

// ===== Admin API Routes =====
// Login doesn't need auth middleware
app.post('/api/admin/login', async (c) => {
  const db = c.env.DB;
  const { username, password } = await c.req.json();
  
  // Auto-create admin user if none exists (safety net)
  const adminCount = await db.prepare('SELECT COUNT(*) as cnt FROM admin_users').first<{cnt: number}>();
  if (!adminCount || adminCount.cnt === 0) {
    const salt = await generateSalt();
    const hash = await hashPassword('admin1234', salt);
    await db.prepare(
      'INSERT INTO admin_users (username, password_hash, salt, must_change_password) VALUES (?, ?, ?, 0)'
    ).bind('admin', hash, salt).run();
  }
  
  const user = await db.prepare('SELECT * FROM admin_users WHERE username = ?').bind(username).first<{
    id: number; username: string; password_hash: string; salt: string; must_change_password: number;
  }>();
  if (!user) return c.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, 401);
  
  const { verifyPassword: vp, createJWT: cj } = await import('./utils/crypto');
  const { getJwtSecret } = await import('./middleware/auth');
  const valid = await vp(password, user.salt, user.password_hash);
  if (!valid) return c.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, 401);
  
  await db.prepare('UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').bind(user.id).run();
  const secret = getJwtSecret(c.env);
  const token = await cj({ id: user.id, username: user.username }, secret);
  return c.json({ success: true, token, must_change_password: user.must_change_password === 1 });
});

// All other admin API routes require auth
app.use('/api/admin/*', authMiddleware);
app.route('/api/admin', adminApi);

// ===== Page Routes =====

// Home Page
app.get('/', async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = (await db.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY sort_order').all<Department>()).results || [];
  
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

  const content = homePage({ settings, departments, popups, notices, progressItems, progressCategoryCounts, simCertTypes });
  return c.html(layout({ settings, departments, content }));
});

// Service Pages
app.get('/services/:slug', async (c) => {
  const db = c.env.DB;
  const slug = c.req.param('slug');
  const settings = await getSettings(db);
  const departments = (await db.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY sort_order').all<Department>()).results || [];
  
  const dept = await db.prepare('SELECT * FROM departments WHERE slug = ?').bind(slug).first<Department>();
  if (!dept) return c.html(layout({ settings, departments, title: '페이지를 찾을 수 없습니다', content: '<div class="py-20 text-center"><h1 class="text-2xl font-bold text-gray-400">페이지를 찾을 수 없습니다</h1><a href="/" class="mt-4 inline-block text-accent hover:underline">홈으로 돌아가기</a></div>' }), 404);

  const pages = (await db.prepare('SELECT * FROM dep_pages WHERE dept_id = ? AND is_active = 1 ORDER BY sort_order').bind(dept.id).all<DepPage>()).results || [];
  const firstPage = pages.length > 0 ? pages[0] : null;

  const content = servicePage(dept, pages, firstPage, settings);
  return c.html(layout({ settings, departments, title: dept.name, content }));
});

app.get('/services/:slug/:pageSlug', async (c) => {
  const db = c.env.DB;
  const { slug, pageSlug } = c.req.param();
  const settings = await getSettings(db);
  const departments = (await db.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY sort_order').all<Department>()).results || [];

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
    return c.html(layout({ settings, departments, title: `평가현황 - ${dept.name}`, content }));
  }

  const content = servicePage(dept, pages, currentPage, settings);
  return c.html(layout({ settings, departments, title: currentPage ? `${currentPage.title} - ${dept.name}` : dept.name, content }));
});

// Notice Pages
app.get('/support/notice', async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = (await db.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY sort_order').all<Department>()).results || [];
  const page = parseInt(c.req.query('page') || '1');
  const perPage = 15;
  const total = (await db.prepare('SELECT COUNT(*) as cnt FROM notices').first<{ cnt: number }>())?.cnt || 0;
  const notices = (await db.prepare('SELECT * FROM notices ORDER BY is_pinned DESC, created_at DESC LIMIT ? OFFSET ?').bind(perPage, (page - 1) * perPage).all<Notice>()).results || [];

  const content = noticeListPage(notices, page, total, perPage, settings);
  return c.html(layout({ settings, departments, title: '공지사항', content }));
});

app.get('/support/notice/:id', async (c) => {
  const db = c.env.DB;
  const id = c.req.param('id');
  const settings = await getSettings(db);
  const departments = (await db.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY sort_order').all<Department>()).results || [];
  
  await db.prepare('UPDATE notices SET views = views + 1 WHERE id = ?').bind(id).run();
  const notice = await db.prepare('SELECT * FROM notices WHERE id = ?').bind(id).first<Notice>();
  if (!notice) return c.redirect('/support/notice');

  const content = noticeDetailPage(notice, settings);
  return c.html(layout({ settings, departments, title: notice.title, content }));
});

// FAQ Page
app.get('/support/faq', async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = (await db.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY sort_order').all<Department>()).results || [];
  const faqs = (await db.prepare('SELECT * FROM faqs WHERE is_active = 1 ORDER BY sort_order').all<FAQ>()).results || [];

  const content = faqPage(faqs, settings);
  return c.html(layout({ settings, departments, title: 'FAQ', content }));
});

// Inquiry Page
app.get('/support/inquiry', async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = (await db.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY sort_order').all<Department>()).results || [];

  const content = inquiryPage(settings);
  return c.html(layout({ settings, departments, title: '온라인 상담문의', content }));
});

// Progress Page (with pagination, search, filter)
app.get('/support/progress', async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = (await db.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY sort_order').all<Department>()).results || [];

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
  return c.html(layout({ settings, departments, title: categoryFilter ? `${categoryFilter} 현황` : '평가현황', content }));
});

// Documents Page (Architecture Diagram + Dev Guide downloads)
app.get('/support/documents', async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = (await db.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY sort_order').all<Department>()).results || [];

  const content = `
  <section class="page-header relative overflow-hidden" style="padding: clamp(2.5rem,4vw,4.5rem) 0; background: linear-gradient(135deg, #0A0F1E 0%, #111D35 50%, #0D1525 100%);">
    <div class="relative fluid-container">
      <div class="flex items-center" style="gap:var(--space-sm)">
        <div class="rounded-lg flex items-center justify-center shrink-0" style="width:clamp(38px,3.2vw,46px); height:clamp(38px,3.2vw,46px); background: linear-gradient(135deg, rgba(139,92,246,0.20), rgba(139,92,246,0.10)); border: 1px solid rgba(139,92,246,0.15);">
          <i class="fas fa-book" style="color:#A78BFA; font-size:var(--text-lg)"></i>
        </div>
        <div>
          <h1 class="text-white font-bold f-text-xl tracking-tight">시스템 문서</h1>
          <p class="text-slate-400/80 f-text-xs" style="margin-top:3px">설계서 및 개발지침서 다운로드</p>
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
              <a href="/static/docs/architecture-diagram.html" target="_blank" class="btn-primary f-text-xs ripple-btn" style="padding:var(--space-xs) var(--space-md); border-radius:var(--radius-sm);">
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
              <a href="/static/docs/development-guide.html" target="_blank" class="btn-primary f-text-xs ripple-btn" style="padding:var(--space-xs) var(--space-md); border-radius:var(--radius-sm);">
                <i class="fas fa-external-link-alt" style="font-size:10px"></i> 보기
              </a>
            </div>
          </div>
        </div>
        <p class="text-slate-400 f-text-xs text-center" style="margin-top:var(--space-sm)">
          <i class="fas fa-info-circle mr-1"></i> 문서를 열고 브라우저의 인쇄 기능(Ctrl+P)으로 PDF로 저장할 수 있습니다.
        </p>
      </div>
    </div>
  </section>`;

  return c.html(layout({ settings, departments, title: '시스템 문서', content }));
});

// Downloads Page
app.get('/support/downloads', async (c) => {
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = (await db.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY sort_order').all<Department>()).results || [];
  const items = (await db.prepare('SELECT * FROM downloads ORDER BY created_at DESC').all()).results || [];

  const content = downloadsPage(items as any[], settings);
  return c.html(layout({ settings, departments, title: '자료실', content }));
});

// About pages (DB-driven with fallback)
app.get('/about/:page', async (c) => {
  const page = c.req.param('page');
  const db = c.env.DB;
  const settings = await getSettings(db);
  const departments = (await db.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY sort_order').all<Department>()).results || [];

  // Try to load from about_pages table first
  let aboutPage: AboutPage | null = null;
  try {
    aboutPage = await db.prepare('SELECT * FROM about_pages WHERE slug = ?').bind(page).first<AboutPage>();
  } catch {
    // Table might not exist yet
  }

  // Fallback to hardcoded content if not in DB
  const fallbackContent: Record<string, { title: string; content: string }> = {
    greeting: { title: '인사말', content: '<h2>인사말</h2><p>한국정보보안기술원(KOIST)을 방문해 주셔서 감사합니다.</p><p>저희 KOIST는 정보보호 제품의 시험·평가·인증 전문기관으로서, 국내 최고 수준의 평가 인력과 시험 환경을 갖추고 있습니다.</p><p>IT 보안제품의 보안성과 성능을 객관적이고 공정하게 평가하여 국내 정보보호 산업 발전에 기여하고 있으며, 앞으로도 최상의 시험·인증 서비스를 제공하기 위해 최선을 다하겠습니다.</p><p>감사합니다.</p><p class="mt-4 font-bold">(주)한국정보보안기술원 임직원 일동</p>' },
    history: { title: '연혁', content: '<h2>KOIST 연혁</h2><div class="space-y-4"><div class="flex gap-4"><span class="font-bold text-accent w-20 shrink-0">2025</span><div>암호모듈 검증시험(KCMVP) 민간시험 기관 지정</div></div><div class="flex gap-4"><span class="font-bold text-accent w-20 shrink-0">2020</span><div>성능평가 시험 업무 확대</div></div><div class="flex gap-4"><span class="font-bold text-accent w-20 shrink-0">2015</span><div>CC평가기관 지정 (과학기술정보통신부)</div></div><div class="flex gap-4"><span class="font-bold text-accent w-20 shrink-0">2010</span><div>(주)한국정보보안기술원 설립</div></div></div>' },
    business: { title: '사업소개', content: '<h2>사업소개</h2><p>KOIST는 정보보호 분야의 종합 시험·평가·인증 서비스를 제공합니다.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"><div class="bg-blue-50 p-4 rounded-lg"><h3 class="font-bold text-blue-700">CC평가</h3><p class="text-sm text-blue-600 mt-1">국제 표준 기반 IT 보안제품 평가</p></div><div class="bg-purple-50 p-4 rounded-lg"><h3 class="font-bold text-purple-700">보안기능 시험</h3><p class="text-sm text-purple-600 mt-1">보안제품 기능 시험 및 인증</p></div><div class="bg-pink-50 p-4 rounded-lg"><h3 class="font-bold text-pink-700">KCMVP</h3><p class="text-sm text-pink-600 mt-1">암호모듈 검증시험</p></div><div class="bg-green-50 p-4 rounded-lg"><h3 class="font-bold text-green-700">성능평가</h3><p class="text-sm text-green-600 mt-1">보안제품 성능 객관적 평가</p></div></div>' },
    location: { title: '오시는길', content: '<h2>오시는길</h2><div class="bg-gray-50 p-6 rounded-xl mb-6"><div class="flex items-start gap-3 mb-3"><i class="fas fa-location-dot text-accent mt-1"></i><div><strong>주소</strong><br>서울특별시 서초구 효령로 336 윤일빌딩 4층 한국정보보안기술원</div></div><div class="flex items-start gap-3 mb-3"><i class="fas fa-phone text-accent mt-1"></i><div><strong>전화</strong><br>02-586-1230</div></div><div class="flex items-start gap-3"><i class="fas fa-envelope text-accent mt-1"></i><div><strong>이메일</strong><br>koist@koist.kr</div></div></div>' },
  };

  const title = aboutPage?.title || fallbackContent[page]?.title;
  const contentBody = aboutPage?.content || fallbackContent[page]?.content;

  if (!title || !contentBody) return c.redirect('/');

  const contentHtml = `
    <section class="bg-gradient-to-r from-primary to-primary-light py-[clamp(2.5rem,5vh,4rem)]">
      <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
        <h1 class="text-white font-bold text-[clamp(1.4rem,3vw,2.2rem)]"><i class="fas fa-building mr-2"></i>${title}</h1>
      </div>
    </section>
    <section class="py-[clamp(2rem,4vh,4rem)]">
      <div class="w-[min(92vw,1000px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
        <div class="bg-white rounded-xl border border-gray-100 p-[clamp(1.5rem,3vw,3rem)] prose prose-gray max-w-none">${contentBody}</div>
      </div>
    </section>`;

  return c.html(layout({ settings, departments, title, content: contentHtml }));
});

// ===== Admin Page Routes =====
app.get('/admin', (c) => c.html(adminLoginPage()));

app.get('/admin/change-password', (c) => c.html(changePasswordPage(true)));

app.get('/admin/dashboard', authMiddleware, async (c) => {
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

// Admin CRUD pages
const adminPages = ['site-settings', 'departments', 'popups', 'notices', 'progress', 'downloads', 'faqs', 'inquiries', 'images', 'about', 'sim-cert-types'];
for (const page of adminPages) {
  app.get(`/admin/${page}`, authMiddleware, async (c) => {
    const db = c.env.DB;
    const settings = await getSettings(db);
    const jsFile = page === 'about' ? 'admin-about' : page === 'sim-cert-types' ? 'admin-sim-cert-types' : `admin-${page}`;
    const content = `
      <h1 class="text-2xl font-bold text-gray-800 mb-6">${getAdminPageTitle(page)}</h1>
      <div id="admin-content" class="bg-white rounded-xl border border-gray-100 p-6">
        <p class="text-gray-400"><i class="fas fa-spinner fa-spin mr-1"></i> 데이터를 불러오는 중...</p>
      </div>
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
  };
  return titles[page] || page;
}

export default app;
