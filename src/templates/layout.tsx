// KOIST - Main Layout Template (v37.0 - Security Hardening + Partials Refactor)
import type { SettingsMap, DepartmentWithPages } from '../types';
import { layoutCSS } from './partials/layout-css';

export function layout(opts: {
  title?: string;
  settings: SettingsMap;
  departments?: DepartmentWithPages[];
  bodyClass?: string;
  content: string;
  headExtra?: string;
}) {
  const s = opts.settings;
  const siteName = s.site_name || '(주)한국정보보안기술원';
  const pageTitle = opts.title ? `${opts.title} - ${siteName}` : siteName;
  const deps = opts.departments || [];

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=5">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="theme-color" content="#0A0F1E">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="msapplication-TileColor" content="#0A0F1E">
  <meta name="color-scheme" content="dark light">
  <meta name="description" content="${s.meta_description || ''}">
  <meta name="keywords" content="${s.meta_keywords || ''}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${s.meta_description || ''}">
  <meta property="og:url" content="https://koist.kr">
  ${s.naver_verification ? `<meta name="naver-site-verification" content="${s.naver_verification}">` : ''}
  <title>${pageTitle}</title>
  <link rel="icon" type="image/png" href="/static/images/logo-circle.png">

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        screens: {
          'xs': '375px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1536px',
          '3xl': '1920px',
          '4k': '2560px',
          '5k': '3840px',
          '8k': '7680px',
        },
        extend: {
          colors: {
            primary:  { DEFAULT: '#0A0F1E', light: '#141B2D', lighter: '#1E293B', mid: '#1A2640', soft: '#334155' },
            accent:   { DEFAULT: '#3B82F6', dark: '#2563EB', light: '#60A5FA', pale: '#93C5FD', teal: '#06B6D4' },
            cyber:    { DEFAULT: '#06B6D4', light: '#22D3EE', dark: '#0891B2', glow: '#67E8F9' },
            emerald:  { glow: '#10B981', light: '#34D399' },
            neon:     { blue: '#4F9CF7', cyan: '#38BDF8', purple: '#A78BFA', pink: '#F472B6' },
            surface:  { DEFAULT: '#F8FAFC', warm: '#F1F5F9', card: '#FFFFFF', muted: '#E2E8F0', cool: '#EFF6FF', ice: '#F0F9FF' },
            glass:    { light: 'rgba(255,255,255,0.06)', mid: 'rgba(255,255,255,0.10)', heavy: 'rgba(255,255,255,0.16)' },
          },
          fontFamily: {
            sans: ['"Noto Sans KR"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
          },
          boxShadow: {
            'glass':      '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
            'card':       '0 1px 3px rgba(15,23,42,0.03), 0 4px 16px rgba(15,23,42,0.04)',
            'card-hover': '0 20px 48px rgba(15,23,42,0.10), 0 4px 12px rgba(15,23,42,0.04)',
            'glow-blue':  '0 0 20px rgba(59,130,246,0.20), 0 0 60px rgba(59,130,246,0.06)',
            'glow-cyan':  '0 0 20px rgba(6,182,212,0.20), 0 0 60px rgba(6,182,212,0.06)',
            'premium':    '0 1px 2px rgba(15,23,42,0.03), 0 4px 16px rgba(15,23,42,0.05), 0 12px 40px rgba(15,23,42,0.03)',
          },
        }
      }
    }
  </script>

  <!-- Google Fonts — Variable Weight for HiDPI crisp rendering -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- FontAwesome Icons -->
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">

  <!-- AOS Animation -->
  <link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet">

  ${layoutCSS()}
  ${opts.headExtra || ''}
</head>
<body class="bg-surface text-slate-700 antialiased">

  <!-- R2: Skip-to-Content (WCAG 2.4.1) -->
  <a href="#main-content" class="skip-to-content">본문 바로가기</a>

  <!-- Scroll Progress Bar -->
  <div id="scrollProgress"></div>

  <!-- ═══════════ GNB v33 (2-Tier Premium Header) ═══════════ -->
  <header id="gnb" class="fixed top-0 left-0 right-0 z-50" role="banner" style="border-bottom: none;">

    <!-- ══ TOP BAR: KOLAS + Logo + Phone ══ -->
    <div class="gnb-top-bar">
      <div style="width:100%;max-width:100%;padding:0 clamp(6px,0.4vw,10px);margin:0;">
        <div class="flex items-center" style="height:100%;gap:19px;justify-content:flex-start;">

          <!-- KOLAS Mark -->
          <div class="hidden md:flex items-center shrink-0" style="padding:0;margin:0 0 0 5cm;">
            <img src="/static/images/kolas.png" alt="KOLAS 국제공인시험기관" loading="lazy" decoding="async" sizes="(min-width: 7680px) 220px, (min-width: 3840px) 140px, (min-width: 2560px) 110px, (max-width: 767px) 0px, 68px" style="height:clamp(44px, 38px + 1.4vw, 68px);" class="kolas-mark w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" title="KOLAS 국제공인시험기관 인정 (KTL-F-588)" data-admin-edit="kolas_image">
          </div>

          <!-- Logo -->
          <a href="/" class="flex items-center shrink-0 group" data-admin-edit="site_logo">
            ${s.logo_url && s.logo_url.trim() !== '' && s.logo_url !== '/static/images/logo.png' ? `
            <img src="${s.logo_url}" alt="${siteName}" style="height:clamp(48px, 40px + 1.6vw, 72px); max-width:clamp(280px, 24vw, 440px);" sizes="(min-width: 7680px) 440px, (min-width: 3840px) 360px, (min-width: 2560px) 320px, (max-width: 640px) 200px, 300px" class="site-logo-img w-auto object-contain transition-transform group-hover:scale-[1.02]">
            ` : `
            <div class="flex items-center" style="gap: clamp(8px, 0.8vw, 14px)">
              <div class="relative">
                <div class="absolute inset-0 rounded-xl blur-md transition-all group-hover:blur-lg" style="background: linear-gradient(135deg, rgba(59,130,246,0.25), rgba(6,182,212,0.20));"></div>
                <div class="relative rounded-xl flex items-center justify-center" style="width:clamp(42px,4.2vw,62px); height:clamp(42px,4.2vw,62px); background: linear-gradient(135deg, #2563EB, #06B6D4);">
                  <i class="fas fa-shield-halved text-white" style="font-size:clamp(20px,2.2vw,32px)"></i>
                </div>
              </div>
              <div>
                <div class="font-bold text-white leading-tight tracking-tight" style="font-size:clamp(1.15rem, 0.95rem + 0.7vw, 1.65rem);">한국정보보안기술원</div>
                <div class="tracking-[0.18em] font-medium" style="font-size:clamp(0.72rem, 0.60rem + 0.35vw, 1.0rem); background: linear-gradient(90deg, #94A3B8, #64748B); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">KOIST</div>
              </div>
            </div>
            `}
          </a>

          <!-- Right: Phone + Mobile Menu -->
          <div class="flex items-center shrink-0" style="gap:var(--space-xs);margin-left:auto;margin-right:15cm;">
            <a href="tel:${s.phone || '02-586-1230'}" class="hidden xl:inline-flex items-center text-white font-bold rounded-lg transition-all ripple-btn" style="gap: 6px; padding: clamp(0.35rem,0.5vw,0.5rem) clamp(0.6rem,0.8vw,0.9rem); font-size: clamp(0.75rem, 0.65rem + 0.30vw, 0.92rem); background: linear-gradient(135deg, rgba(59,130,246,0.85), rgba(6,182,212,0.85)); box-shadow: 0 4px 16px rgba(59,130,246,0.25), inset 0 1px 0 rgba(255,255,255,0.12); border-radius: clamp(8px,0.6vw,12px);">
              <i class="fas fa-phone" style="font-size:clamp(8px,0.6vw,11px)"></i>
              <span>${s.phone || '02-586-1230'}</span>
            </a>
            <button id="mobileMenuBtn" class="lg:hidden p-2 text-slate-400 hover:text-white transition-colors" aria-label="메뉴 열기">
              <i class="fas fa-bars" style="font-size:var(--text-lg)"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ GNB NAVIGATION BAR: Full-width centered, 40% enlarged ══ -->
    <div class="gnb-nav-bar hidden lg:flex">
      ${(() => {
        const activeDeps = deps.filter(d => d.is_active);
        const navLinks = [
          '<a href="/about/greeting" class="gnb-link gnb-mega-trigger" data-col="about">KOIST소개</a>'
        ].concat(
          activeDeps.map(dept =>
            '<a href="/services/' + dept.slug + '" class="gnb-link gnb-mega-trigger" data-col="dept-' + dept.slug + '">' + dept.name + '</a>'
          )
        ).concat([
          '<a href="/support/notice" class="gnb-link gnb-mega-trigger" data-col="support">고객지원</a>'
        ]);
        // Join with separator dots
        return navLinks.join('<span class="gnb-sep" aria-hidden="true"></span>');
      })()}
    </div>

    <!-- Mega Dropdown Panel (v38 - 2-row adaptive) -->
    <div id="megaMenu" class="mega-menu-panel" role="navigation" aria-label="전체 메뉴">
      <div class="fluid-container">
        <div class="mega-menu-grid">
          ${(() => {
                // Split departments into 2 rows for optimal layout
                const activeDepsWithPages = deps.filter(d => d.is_active && d.pages && d.pages.length > 0);
                // Separate single-page depts for grouping
                const multiPageDeps = activeDepsWithPages.filter(d => d.pages.length > 1);
                const singlePageDeps = activeDepsWithPages.filter(d => d.pages.length === 1);

                // Row 1: KOIST소개 + first ~5 departments (shorter names)
                const row1Deps = multiPageDeps.slice(0, 5);
                // Row 2: remaining departments + grouped singles + 고객지원
                const row2Deps = multiPageDeps.slice(5);

                let html = '';
                // ── ROW 1 ──
                html += '<div class="mega-menu-row">';
                // KOIST소개
                html += '<div class="mega-menu-column" data-col="about">';
                html += '<h3 class="mega-menu-heading"><a href="/about/greeting">KOIST소개</a></h3>';
                html += '<ul><li><a href="/about/greeting">인사말</a></li>';
                html += '<li><a href="/about/history">연혁</a></li>';
                html += '<li><a href="/about/business">사업소개</a></li>';
                html += '<li><a href="/about/location">오시는길</a></li></ul>';
                html += '</div>';
                // Row 1 departments
                row1Deps.forEach(dept => {
                  const wideCls = dept.name.length >= 7 ? ' mega-col-wide' : '';
                  html += '<div class="mega-menu-column' + wideCls + '" data-col="dept-' + dept.slug + '">';
                  html += '<h3 class="mega-menu-heading"><a href="/services/' + dept.slug + '">' + dept.name + '</a></h3>';
                  html += '<ul>' + dept.pages.map(p => '<li><a href="/services/' + dept.slug + '/' + p.slug + '">' + p.title + '</a></li>').join('') + '</ul>';
                  html += '</div>';
                });
                html += '</div>';

                // ── ROW 2 ──
                html += '<div class="mega-menu-row">';
                // Row 2 multi-page departments
                row2Deps.forEach(dept => {
                  const wideCls = dept.name.length >= 7 || dept.pages.some(p => p.title.length >= 8) ? ' mega-col-wide' : '';
                  html += '<div class="mega-menu-column' + wideCls + '" data-col="dept-' + dept.slug + '">';
                  html += '<h3 class="mega-menu-heading"><a href="/services/' + dept.slug + '">' + dept.name + '</a></h3>';
                  html += '<ul>' + dept.pages.map(p => '<li><a href="/services/' + dept.slug + '/' + p.slug + '">' + p.title + '</a></li>').join('') + '</ul>';
                  html += '</div>';
                });
                // Grouped single-page departments
                if (singlePageDeps.length > 0) {
                  const alsoCols = singlePageDeps.slice(1).map(d => 'dept-' + d.slug).join(',');
                  const alsoAttr = alsoCols ? ' data-col-also="' + alsoCols + '"' : '';
                  html += '<div class="mega-menu-column mega-col-wide" data-col="dept-' + singlePageDeps[0].slug + '"' + alsoAttr + '>';
                  html += '<h3 class="mega-menu-heading">기타 서비스</h3>';
                  singlePageDeps.forEach((dept, idx) => {
                    if (idx > 0) html += '<div class="mega-sub-group">';
                    else html += '<div>';
                    html += '<div class="mega-sub-group-title"><a href="/services/' + dept.slug + '">' + dept.name + '</a></div>';
                    html += '<ul>' + dept.pages.map(p => '<li><a href="/services/' + dept.slug + '/' + p.slug + '">' + p.title + '</a></li>').join('') + '</ul>';
                    html += '</div>';
                  });
                  html += '</div>';
                }
                // 고객지원
                html += '<div class="mega-menu-column" data-col="support">';
                html += '<h3 class="mega-menu-heading"><a href="/support/notice">고객지원</a></h3>';
                html += '<ul><li><a href="/support/notice">공지사항</a></li>';
                html += '<li><a href="/support/faq">FAQ</a></li>';
                html += '<li><a href="/support/downloads">자료실</a></li>';
                html += '<li><a href="/support/documents">시스템 문서</a></li>';
                html += '<li><a href="/support/inquiry">온라인 상담</a></li></ul>';
                html += '</div>';
                html += '</div>';

                return html;
              })()}
            </div>
          </div>
        </div>

  </header>

  <!-- Mobile Overlay -->
  <div id="mobileOverlay" class="mobile-overlay fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" onclick="closeMobileMenu()"></div>

  <!-- Mobile Slide-out Menu (R4: Right slide panel with smooth backdrop) -->
  <div id="mobileMenu" class="mobile-menu fixed top-0 right-0 bottom-0 w-[min(85vw,380px)] bg-white z-[70] overflow-y-auto" role="dialog" aria-modal="true" aria-label="모바일 메뉴" style="box-shadow: -8px 0 48px rgba(0,0,0,0.18);">
    <div class="flex justify-between items-center border-b border-slate-100" style="padding: var(--space-md) var(--space-lg)">
      <div class="flex items-center" style="gap: var(--space-sm)">
        <div class="rounded-lg flex items-center justify-center" style="width:30px; height:30px; background: linear-gradient(135deg, #2563EB, #06B6D4);">
          <i class="fas fa-shield-halved text-white" style="font-size:13px"></i>
        </div>
        <span class="font-bold text-primary f-text-lg tracking-tight">메뉴</span>
      </div>
      <button onclick="closeMobileMenu()" class="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-50"><i class="fas fa-times f-text-lg"></i></button>
    </div>
    <div style="padding: var(--space-md) var(--space-md)">
      <!-- Phone CTA -->
      <a href="tel:${s.phone || '02-586-1230'}" class="flex items-center rounded-xl mb-4" style="gap: var(--space-sm); padding: var(--space-md); background: linear-gradient(135deg, rgba(59,130,246,0.05), rgba(6,182,212,0.05)); border: 1px solid rgba(59,130,246,0.08);">
        <div class="text-white rounded-full flex items-center justify-center shrink-0" style="width:38px; height:38px; background: linear-gradient(135deg, #2563EB, #06B6D4);"><i class="fas fa-phone f-text-xs"></i></div>
        <div>
          <div class="f-text-xs text-gray-500 font-medium">상담문의</div>
          <div class="f-text-base font-bold text-accent tracking-tight">${s.phone || '02-586-1230'}</div>
        </div>
      </a>
      <!-- Dept Links with sub-page accordion -->
      <div class="space-y-0.5">
        <!-- KOIST소개 -->
        <div class="mobile-acc">
          <button class="mobile-acc-btn flex items-center justify-between w-full px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-all" onclick="toggleMobileAcc(this)">
            <span class="flex items-center" style="gap: var(--space-sm)">
              <div class="rounded-md flex items-center justify-center shrink-0" style="width:28px; height:28px; background:rgba(59,130,246,0.08)">
                <i class="fas fa-building" style="color:#3B82F6; font-size: var(--text-xs)"></i>
              </div>
              <span class="f-text-sm font-medium">KOIST소개</span>
            </span>
            <i class="fas fa-chevron-down text-gray-400 transition-transform" style="font-size:10px"></i>
          </button>
          <div class="mobile-acc-sub hidden pl-10 space-y-0.5 pb-1">
            <a href="/about/greeting" class="block px-3 py-1.5 text-gray-500 hover:text-blue-600 f-text-xs rounded transition-colors" onclick="closeMobileMenu()">인사말</a>
            <a href="/about/history" class="block px-3 py-1.5 text-gray-500 hover:text-blue-600 f-text-xs rounded transition-colors" onclick="closeMobileMenu()">연혁</a>
            <a href="/about/business" class="block px-3 py-1.5 text-gray-500 hover:text-blue-600 f-text-xs rounded transition-colors" onclick="closeMobileMenu()">사업소개</a>
            <a href="/about/location" class="block px-3 py-1.5 text-gray-500 hover:text-blue-600 f-text-xs rounded transition-colors" onclick="closeMobileMenu()">오시는길</a>
          </div>
        </div>
        ${deps.filter(d => d.is_active).map(dept => `
        <div class="mobile-acc">
          ${dept.pages && dept.pages.length > 0 ? `
          <button class="mobile-acc-btn flex items-center justify-between w-full px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-all" onclick="toggleMobileAcc(this)">
            <span class="flex items-center" style="gap: var(--space-sm)">
              <div class="rounded-md flex items-center justify-center shrink-0" style="width:28px; height:28px; background:${dept.color}08">
                <i class="fas ${dept.icon}" style="color:${dept.color}; font-size: var(--text-xs)"></i>
              </div>
              <span class="f-text-sm font-medium">${dept.name}</span>
            </span>
            <i class="fas fa-chevron-down text-gray-400 transition-transform" style="font-size:10px"></i>
          </button>
          <div class="mobile-acc-sub hidden pl-10 space-y-0.5 pb-1">
            ${dept.pages.map(p => `<a href="/services/${dept.slug}/${p.slug}" class="block px-3 py-1.5 text-gray-500 hover:text-blue-600 f-text-xs rounded transition-colors" onclick="closeMobileMenu()">${p.title}</a>`).join('')}
          </div>
          ` : `
          <a href="/services/${dept.slug}" class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-all" style="gap: var(--space-sm)" onclick="closeMobileMenu()">
            <div class="rounded-md flex items-center justify-center shrink-0" style="width:28px; height:28px; background:${dept.color}08">
              <i class="fas ${dept.icon}" style="color:${dept.color}; font-size: var(--text-xs)"></i>
            </div>
            <span class="f-text-sm font-medium">${dept.name}</span>
          </a>
          `}
        </div>
        `).join('')}
      </div>
      <div class="border-t border-slate-100 my-3 pt-3 space-y-0.5">
        <a href="/support/notice"    class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm transition-colors" onclick="closeMobileMenu()"><i class="fas fa-bullhorn w-5 text-center text-gray-400 f-text-xs"></i>공지사항</a>
        <a href="/support/faq"       class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm transition-colors" onclick="closeMobileMenu()"><i class="fas fa-circle-question w-5 text-center text-gray-400 f-text-xs"></i>FAQ</a>
        <a href="/support/downloads" class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm transition-colors" onclick="closeMobileMenu()"><i class="fas fa-download w-5 text-center text-gray-400 f-text-xs"></i>자료실</a>
        <a href="/support/documents" class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm transition-colors" onclick="closeMobileMenu()"><i class="fas fa-book w-5 text-center text-gray-400 f-text-xs"></i>시스템 문서</a>
        <a href="/support/inquiry"   class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm transition-colors" onclick="closeMobileMenu()"><i class="fas fa-envelope w-5 text-center text-gray-400 f-text-xs"></i>온라인 상담</a>
      </div>
    </div>
  </div>

  <!-- ═══════════ Content ═══════════ -->
  <main id="main-content" role="main" style="padding-top:var(--gnb-h)">
    ${opts.content}
  </main>

  <!-- ═══════════ Footer (Premium Layered) ═══════════ -->
  <footer role="contentinfo" class="text-gray-400 mt-auto relative overflow-hidden" style="${s.footer_bg_url ? `background-image: linear-gradient(rgba(10,15,30,0.95), rgba(7,11,22,0.98)), url('${s.footer_bg_url}'); background-size:cover; background-position:center;` : 'background: linear-gradient(180deg, #0C1120 0%, #080D18 50%, #060A14 100%);'}">
    <!-- Top accent line -->
    <div style="height: 2px; background: linear-gradient(90deg, transparent 5%, #2563EB 25%, #06B6D4 50%, #3B82F6 75%, transparent 95%); opacity: 0.8;"></div>

    <!-- Decorative orbs -->
    <div class="absolute top-8 left-[15%] rounded-full blur-3xl pointer-events-none" style="width:280px; height:140px; background: radial-gradient(ellipse, rgba(59,130,246,0.04), transparent);"></div>
    <div class="absolute bottom-8 right-[15%] rounded-full blur-3xl pointer-events-none" style="width:220px; height:110px; background: radial-gradient(ellipse, rgba(6,182,212,0.04), transparent);"></div>

    <div class="relative fluid-container f-section-y">
      <div class="grid grid-cols-1 md:grid-cols-12" style="gap: clamp(1.5rem, 2.5vw, 3rem)">

        <!-- Company Info (v31 - 2.5x footer text + logo) -->
        <div class="md:col-span-5">
          <div style="margin-bottom: var(--space-lg)">
            <div class="inline-flex items-center rounded-xl" style="padding: var(--space-sm) var(--space-md); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);">
              <img src="/static/images/logo-horizontal.png" alt="${siteName}" loading="lazy" decoding="async" sizes="(min-width: 7680px) 120px, (min-width: 3840px) 80px, (min-width: 2560px) 64px, 48px" style="height:clamp(32px, 26px + 0.9vw, 48px)" class="footer-logo w-auto object-contain opacity-90">
            </div>
          </div>
          <p class="f-text-lg leading-relaxed text-gray-500 max-w-lg" style="margin-bottom: var(--space-md)">${s.site_slogan || '최상의 시험·인증 서비스로 정보보안 기술을 완성'}</p>
          <div class="space-y-3.5 f-text-lg">
            <div class="flex items-center" style="gap: var(--space-sm)">
              <div class="shrink-0 rounded-md flex items-center justify-center" style="width:clamp(34px,2.8vw,46px); height:clamp(34px,2.8vw,46px); background: rgba(59,130,246,0.10);"><i class="fas fa-phone text-accent/60" style="font-size:clamp(13px,1.2vw,18px)"></i></div>
              <span class="text-gray-400">${s.phone || '02-586-1230'}</span>
            </div>
            <div class="flex items-center" style="gap: var(--space-sm)">
              <div class="shrink-0 rounded-md flex items-center justify-center" style="width:clamp(34px,2.8vw,46px); height:clamp(34px,2.8vw,46px); background: rgba(59,130,246,0.10);"><i class="fas fa-fax text-accent/60" style="font-size:clamp(13px,1.2vw,18px)"></i></div>
              <span class="text-gray-400">FAX: ${s.fax || '02-586-1238'}</span>
            </div>
            <div class="flex items-center" style="gap: var(--space-sm)">
              <div class="shrink-0 rounded-md flex items-center justify-center" style="width:clamp(34px,2.8vw,46px); height:clamp(34px,2.8vw,46px); background: rgba(59,130,246,0.10);"><i class="fas fa-envelope text-accent/60" style="font-size:clamp(13px,1.2vw,18px)"></i></div>
              <a href="mailto:${s.email || 'koist@koist.kr'}" class="hover:text-white transition-colors text-gray-400">${s.email || 'koist@koist.kr'}</a>
            </div>
            <div class="flex items-start" style="gap: var(--space-sm)">
              <div class="shrink-0 rounded-md flex items-center justify-center mt-0.5" style="width:clamp(34px,2.8vw,46px); height:clamp(34px,2.8vw,46px); background: rgba(59,130,246,0.10);"><i class="fas fa-location-dot text-accent/60" style="font-size:clamp(13px,1.2vw,18px)"></i></div>
              <span class="text-gray-400" style="overflow-wrap:break-word; word-break:keep-all;">${s.address || ''}</span>
            </div>
          </div>
        </div>

        <!-- Quick Links: 사업분야 (v31 - 2.5x) -->
        <div class="md:col-span-3">
          <h4 class="text-white/90 font-bold f-text-base tracking-wide" style="margin-bottom: var(--space-md)">사업분야</h4>
          <ul class="space-y-3 f-text-base">
            ${deps.filter(d => d.is_active).slice(0, 6).map(d => `<li><a href="/services/${d.slug}" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>${d.name}</a></li>`).join('')}
          </ul>
        </div>

        <!-- Quick Links: 고객지원 (v31 - 2.5x) -->
        <div class="md:col-span-2">
          <h4 class="text-white/90 font-bold f-text-base tracking-wide" style="margin-bottom: var(--space-md)">고객지원</h4>
          <ul class="space-y-3 f-text-base">
            <li><a href="/support/notice" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>공지사항</a></li>
            <li><a href="/support/downloads" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>자료실</a></li>
            <li><a href="/support/documents" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>시스템 문서</a></li>
            <li><a href="/about/location" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>오시는길</a></li>
          </ul>
        </div>

        <!-- Phone Card -->
        <div class="md:col-span-2">
          <div class="rounded-xl" style="padding: var(--space-md); background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);">
            <p class="f-text-sm text-gray-600 font-medium" style="margin-bottom: 8px">빠른 상담 전화</p>
            <a href="tel:${s.phone || '02-586-1230'}" class="font-black tracking-tight hover:opacity-80 transition-opacity block" style="font-size: var(--text-2xl); background: linear-gradient(135deg, #FFFFFF, #93C5FD); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${s.phone || '02-586-1230'}</a>
          </div>
          <div class="mt-4 space-y-2.5 f-text-sm">
            <a href="/support/faq" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>FAQ</a>
            <a href="/support/inquiry" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all block" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>온라인 상담</a>
            <a href="/about/greeting" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all block" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>KOIST 소개</a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="flex flex-col sm:flex-row justify-between items-center" style="margin-top: var(--space-xl); padding-top: var(--space-lg); border-top: 1px solid rgba(255,255,255,0.04); gap: var(--space-sm);">
        <p class="f-text-sm text-slate-600">&copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
        <div class="flex items-center f-text-sm text-slate-600" style="gap:var(--space-sm)">
          <a href="/about/greeting" class="hover:text-white transition-colors">KOIST 소개</a>
          <span class="text-slate-700">|</span>
          <a href="/support/inquiry" class="hover:text-white transition-colors">문의하기</a>
          <span class="text-slate-700">|</span>
          <a href="/admin" class="hover:text-white transition-colors"><i class="fas fa-lock mr-0.5" style="font-size:8px"></i>관리자</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- ═══════════ Scripts ═══════════ -->
  <!-- AOS -->
  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
  <script>AOS.init({ duration: 700, once: true, offset: 50, easing: 'ease-out-cubic', anchorPlacement: 'top-bottom', disable: function() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } });</script>

  <script>
    /* ── Mobile Menu ── */
    function openMobileMenu() {
      document.getElementById('mobileMenu').classList.add('active');
      document.getElementById('mobileOverlay').classList.add('active');
      document.body.style.overflow = 'hidden';
      // R2: Focus first interactive element in menu
      setTimeout(function() {
        var closeBtn = document.querySelector('#mobileMenu button[onclick*="closeMobileMenu"]');
        if (closeBtn) closeBtn.focus();
      }, 100);
    }
    function closeMobileMenu() {
      document.getElementById('mobileMenu').classList.remove('active');
      document.getElementById('mobileOverlay').classList.remove('active');
      document.body.style.overflow = '';
      // R2: Return focus to menu trigger
      var btn = document.getElementById('mobileMenuBtn');
      if (btn) btn.focus();
    }
    document.getElementById('mobileMenuBtn')?.addEventListener('click', openMobileMenu);
    // R2: Close mobile menu on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.getElementById('mobileMenu')?.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    // R2: Focus trap for mobile menu (WCAG 2.4.3 — Focus Order)
    (function() {
      var mobileMenu = document.getElementById('mobileMenu');
      if (!mobileMenu) return;
      mobileMenu.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab') return;
        if (!mobileMenu.classList.contains('active')) return;
        var focusable = mobileMenu.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    })();

    /* ── GNB Scroll Effect ── */
    (function() {
      var gnb = document.getElementById('gnb');
      var scrollProg = document.getElementById('scrollProgress');
      var ticking = false;
      function onScroll() {
        if (!ticking) {
          requestAnimationFrame(function() {
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollY > 20) { gnb.classList.add('gnb-scrolled'); }
            else { gnb.classList.remove('gnb-scrolled'); }
            var docH = document.documentElement.scrollHeight - window.innerHeight;
            if (docH > 0 && scrollProg) {
              scrollProg.style.width = Math.min((scrollY / docH) * 100, 100) + '%';
            }
            ticking = false;
          });
          ticking = true;
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    })();

    /* ── Mega Dropdown Menu Logic ── */
    (function() {
      var gnbNav = document.querySelector('.gnb-nav-bar');
      var mega = document.getElementById('megaMenu');
      var gnbHeader = document.getElementById('gnb');
      if (!gnbNav || !mega) return;

      var hoverTimer = null;
      var activeTrigger = null;

      function showMega(triggerEl) {
        clearTimeout(hoverTimer);
        mega.classList.add('active');
        // Highlight the matching column (supports data-col-also for grouped columns)
        var col = triggerEl ? triggerEl.getAttribute('data-col') : null;
        mega.querySelectorAll('.mega-menu-column').forEach(function(c) {
          var match = c.getAttribute('data-col') === col;
          // Also check data-col-also for grouped single-page departments
          if (!match && col) {
            var also = c.getAttribute('data-col-also');
            if (also) { match = also.split(',').indexOf(col) !== -1; }
          }
          c.classList.toggle('mega-col-active', match);
        });
        // Highlight the trigger link
        gnbNav.querySelectorAll('.gnb-mega-trigger').forEach(function(l) {
          l.classList.toggle('gnb-link-active', l === triggerEl);
        });
        activeTrigger = triggerEl;
      }

      function hideMega() {
        hoverTimer = setTimeout(function() {
          mega.classList.remove('active');
          gnbNav.querySelectorAll('.gnb-mega-trigger').forEach(function(l) {
            l.classList.remove('gnb-link-active');
          });
          mega.querySelectorAll('.mega-menu-column').forEach(function(c) {
            c.classList.remove('mega-col-active');
          });
          activeTrigger = null;
        }, 180);
      }

      // Desktop hover behavior
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        gnbNav.querySelectorAll('.gnb-mega-trigger').forEach(function(link) {
          link.addEventListener('mouseenter', function() { showMega(link); });
          link.addEventListener('mouseleave', function() { hideMega(); });
        });
        mega.addEventListener('mouseenter', function() { clearTimeout(hoverTimer); });
        mega.addEventListener('mouseleave', function() { hideMega(); });
        // Also show when hovering the GNB header area (to prevent gap issues)
        gnbHeader.addEventListener('mouseleave', function(e) {
          // Only hide if not entering the mega menu
          if (!mega.contains(e.relatedTarget)) { hideMega(); }
        });
      }

      // Touch/tablet: click toggle
      var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouchDevice) {
        gnbNav.querySelectorAll('.gnb-mega-trigger').forEach(function(link) {
          link.addEventListener('click', function(e) {
            if (mega.classList.contains('active') && activeTrigger === link) {
              // Second tap → navigate
              return;
            }
            e.preventDefault();
            showMega(link);
          });
        });
        document.addEventListener('click', function(e) {
          if (!gnbNav.contains(e.target) && !mega.contains(e.target)) {
            clearTimeout(hoverTimer);
            mega.classList.remove('active');
            gnbNav.querySelectorAll('.gnb-mega-trigger').forEach(function(l) { l.classList.remove('gnb-link-active'); });
          }
        });
      }

      // Close mega menu on scroll (optional UX improvement)
      var scrollClosing = false;
      window.addEventListener('scroll', function() {
        if (mega.classList.contains('active') && !scrollClosing) {
          scrollClosing = true;
          requestAnimationFrame(function() {
            if (window.pageYOffset > 60) {
              mega.classList.remove('active');
              gnbNav.querySelectorAll('.gnb-mega-trigger').forEach(function(l) { l.classList.remove('gnb-link-active'); });
            }
            scrollClosing = false;
          });
        }
      }, { passive: true });
    })();

    /* ── Mobile Accordion Toggle ── */
    function toggleMobileAcc(btn) {
      var acc = btn.closest('.mobile-acc');
      var sub = acc.querySelector('.mobile-acc-sub');
      var icon = btn.querySelector('.fa-chevron-down');
      if (!sub) return;
      var isOpen = !sub.classList.contains('hidden');
      // Close all others
      document.querySelectorAll('.mobile-acc-sub').forEach(function(s) { s.classList.add('hidden'); });
      document.querySelectorAll('.mobile-acc-btn .fa-chevron-down').forEach(function(i) { i.style.transform = ''; });
      if (!isOpen) {
        sub.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    }

    /* ── body:has() JS fallback for popup scroll lock ── */
    (function() {
      var obs = new MutationObserver(function() {
        var overlay = document.getElementById('popupOverlay');
        if (overlay) { document.body.classList.add('popup-body-lock'); }
        else { document.body.classList.remove('popup-body-lock'); }
      });
      obs.observe(document.body, { childList: true, subtree: true });
    })();

    /* ── Ripple Effect for buttons ── */
    document.querySelectorAll('.ripple-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        var rect = btn.getBoundingClientRect();
        var ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        var size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(function() { ripple.remove(); }, 600);
      });
    });

    /* ── Animated Counter (for hero stats, etc.) ── */
    function animateCounter(el, target, duration) {
      var start = 0;
      var startTime = null;
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    /* ── Intersection Observer for scroll-triggered animations ── */
    (function() {
      if (!('IntersectionObserver' in window)) return;
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (entry.target.dataset.counter) {
              animateCounter(entry.target, parseInt(entry.target.dataset.counter), 1800);
            }
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      document.querySelectorAll('.observe-scroll').forEach(function(el) {
        observer.observe(el);
      });
    })();
  </script>

  ${s.google_analytics_id ? `
  <script async src="https://www.googletagmanager.com/gtag/js?id=${s.google_analytics_id}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${s.google_analytics_id}');
    ${s.google_conversion_id ? `gtag('event', 'conversion', {'send_to': '${s.google_conversion_id}'});` : ''}
  </script>
  ` : ''}

  <!-- ═══════════════════════════════════════════════════════════
       ADMIN INLINE EDITING MODE (v25)
       P0-1: 팝업 인라인 편집 → popups 테이블 직접 저장
       P1-1: HTML 포함 텍스트 innerHTML 보존 저장
       P1-2: 저장 완료 후 "새로고침 필요" 안내
       ═══════════════════════════════════════════════════════════ -->
  <script>
  (function() {
    // Check if admin is logged in
    var token = (document.cookie.match(/koist_token=([^;]*)/) || [])[1];
    if (!token) return;

    var isAdminMode = false;
    var editableElements = [];
    var pendingChanges = {};

    // Keys that contain HTML and should preserve it (use innerHTML instead of innerText)
    var htmlKeys = ['hero_line1', 'hero_line2', 'unified_panel_title', 'unified_panel_subtitle'];

    // Create admin toolbar
    var toolbar = document.createElement('div');
    toolbar.id = 'adminToolbar';
    toolbar.innerHTML = 
      '<div style="display:flex;align-items:center;gap:12px;padding:8px 20px;background:linear-gradient(135deg,#1E293B,#0F172A);border-top:2px solid #3B82F6;box-shadow:0 -4px 20px rgba(0,0,0,0.3);position:fixed;bottom:0;left:0;right:0;z-index:9999;font-family:Noto Sans KR,sans-serif;">' +
        '<div style="display:flex;align-items:center;gap:8px;">' +
          '<i class="fas fa-shield-halved" style="color:#3B82F6;font-size:16px;"></i>' +
          '<span style="color:#E2E8F0;font-weight:700;font-size:14px;">KOIST Admin</span>' +
        '</div>' +
        '<button id="adminToggleEdit" onclick="toggleAdminEdit()" style="padding:6px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid #3B82F6;background:transparent;color:#60A5FA;transition:all 0.2s;">' +
          '<i class="fas fa-edit" style="margin-right:4px;"></i>편집모드' +
        '</button>' +
        '<span id="adminChangeCount" style="color:#94A3B8;font-size:12px;display:none;">변경: <strong id="adminChangeCnt" style="color:#FBBF24;">0</strong>건</span>' +
        '<button id="adminSaveBtn" onclick="saveAdminChanges()" style="padding:6px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;background:linear-gradient(135deg,#2563EB,#06B6D4);color:#fff;display:none;transition:all 0.2s;box-shadow:0 2px 8px rgba(37,99,235,0.3);">' +
          '<i class="fas fa-save" style="margin-right:4px;"></i>저장' +
        '</button>' +
        '<button id="adminCancelBtn" onclick="cancelAdminEdit()" style="padding:6px 12px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid #475569;background:transparent;color:#94A3B8;display:none;">' +
          '취소' +
        '</button>' +
        '<div style="flex:1;"></div>' +
        '<a href="/admin/dashboard" style="color:#94A3B8;font-size:12px;text-decoration:none;display:flex;align-items:center;gap:4px;"><i class="fas fa-cog"></i>대시보드</a>' +
        '<a href="/" onclick="document.cookie=\'koist_token=;path=/;max-age=0\'" style="color:#EF4444;font-size:12px;text-decoration:none;display:flex;align-items:center;gap:4px;margin-left:8px;"><i class="fas fa-sign-out-alt"></i>로그아웃</a>' +
      '</div>';
    document.body.appendChild(toolbar);
    document.body.style.paddingBottom = '48px';

    // Find all editable elements
    function findEditables() {
      editableElements = [];
      document.querySelectorAll('[data-admin-edit]').forEach(function(el) {
        editableElements.push(el);
      });
      return editableElements;
    }

    // Toggle admin edit mode
    window.toggleAdminEdit = function() {
      isAdminMode = !isAdminMode;
      var btn = document.getElementById('adminToggleEdit');
      var saveBtn = document.getElementById('adminSaveBtn');
      var cancelBtn = document.getElementById('adminCancelBtn');
      var countSpan = document.getElementById('adminChangeCount');

      if (isAdminMode) {
        btn.style.background = '#3B82F6';
        btn.style.color = '#fff';
        btn.innerHTML = '<i class="fas fa-edit" style="margin-right:4px;"></i>편집중';
        saveBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
        countSpan.style.display = 'inline-block';
        activateEditables();
      } else {
        btn.style.background = 'transparent';
        btn.style.color = '#60A5FA';
        btn.innerHTML = '<i class="fas fa-edit" style="margin-right:4px;"></i>편집모드';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
        countSpan.style.display = 'none';
        deactivateEditables();
      }
    };

    // Check if key is for popup data (popup_{id}_title, popup_{id}_content, popup_{id}_image)
    function parsePopupKey(key) {
      var m = key.match(/^popup_(\d+)_(title|content|image)$/);
      if (m) return { id: m[1], field: m[2] };
      return null;
    }

    // Check if key is a HTML-preserving key
    function isHtmlKey(key) {
      return htmlKeys.indexOf(key) !== -1;
    }

    function activateEditables() {
      findEditables();
      editableElements.forEach(function(el) {
        var key = el.getAttribute('data-admin-edit');
        // Store original content
        if (!el.dataset.adminOriginal) {
          el.dataset.adminOriginal = el.innerHTML;
        }
        // Add visual edit indicator
        el.style.outline = '2px dashed rgba(59,130,246,0.4)';
        el.style.outlineOffset = '2px';
        el.style.cursor = 'pointer';
        el.style.position = 'relative';

        // Make text editable
        if (!key.includes('image') && !key.includes('logo') && !key.includes('kolas')) {
          el.contentEditable = 'true';
          el.style.outline = '2px dashed rgba(59,130,246,0.5)';
        }

        // Add edit label
        var label = document.createElement('span');
        label.className = 'admin-edit-label';
        label.style.cssText = 'position:absolute;top:-18px;left:0;background:#3B82F6;color:#fff;font-size:10px;padding:1px 6px;border-radius:4px 4px 0 0;z-index:100;pointer-events:none;font-weight:600;white-space:nowrap;line-height:1.5;';
        label.textContent = getEditLabel(key);
        el.style.position = 'relative';
        el.appendChild(label);

        // Listen for changes — P1-1: use innerHTML for HTML keys, innerText for plain text
        el.addEventListener('input', function() {
          if (isHtmlKey(key)) {
            // Strip admin-edit-labels before capturing innerHTML
            var clone = el.cloneNode(true);
            clone.querySelectorAll('.admin-edit-label').forEach(function(l) { l.remove(); });
            pendingChanges[key] = clone.innerHTML.trim();
          } else {
            pendingChanges[key] = el.innerText.trim();
          }
          updateChangeCount();
        });

        // For image elements, add click-to-change
        if (key.includes('image') || key.includes('logo') || key.includes('kolas')) {
          el.addEventListener('click', function(e) {
            if (!isAdminMode) return;
            e.preventDefault();
            e.stopPropagation();
            var img = el.querySelector('img') || el;
            var currentSrc = img.src || img.style.backgroundImage;
            var newUrl = prompt('이미지 URL을 입력하세요:', currentSrc);
            if (newUrl && newUrl.trim()) {
              if (img.tagName === 'IMG') {
                img.src = newUrl.trim();
              }
              pendingChanges[key] = newUrl.trim();
              updateChangeCount();
            }
          });
        }
      });
    }

    function deactivateEditables() {
      editableElements.forEach(function(el) {
        el.contentEditable = 'false';
        el.style.outline = '';
        el.style.outlineOffset = '';
        el.style.cursor = '';
        // Remove labels
        el.querySelectorAll('.admin-edit-label').forEach(function(l) { l.remove(); });
      });
    }

    function getEditLabel(key) {
      var labels = {
        'hero_badge_text': '배지 텍스트',
        'hero_line1': '메인 제목 (HTML)',
        'hero_line2': '부제목 (HTML)',
        'hero_btn_primary': '메인 버튼',
        'hero_btn_secondary': '보조 버튼',
        'hero_contact_label': '연락처 제목',
        'hero_contact_section': '연락처 섹션',
        'hero_contact_info': '연락처 정보',
        'phone': '전화번호',
        'fax': 'FAX',
        'email': '이메일',
        'address': '주소',
        'unified_panel_title': '시뮬레이터 제목 (HTML)',
        'unified_panel_subtitle': '시뮬레이터 부제',
        'unified_reduction_default': '기본 단축률',
        'unified_reduction_label': '단축률 라벨',
        'sim_tab_overall': '탭: 전체평균',
        'sim_tab_eal2': '탭: EAL2',
        'sim_tab_eal3': '탭: EAL3',
        'sim_tab_eal4': '탭: EAL4',
        'sim_label_prep': '사전준비 라벨',
        'sim_slider_level1': '슬라이더: 미흡',
        'sim_slider_level2': '슬라이더: 보통',
        'sim_slider_level3': '슬라이더: 양호',
        'sim_slider_level4': '슬라이더: 우수',
        'sim_label_traditional': 'CCRA평가일수 라벨',
        'sim_label_koist': 'KOIST 프로세스 라벨',
        'sim_panel': '시뮬레이터 패널',
        'services_badge': '서비스 배지',
        'services_title': '서비스 제목',
        'services_subtitle': '서비스 부제',
        'site_logo': '사이트 로고',
        'kolas_image': 'KOLAS 마크',
        'popup_close_all_text': '팝업 닫기 버튼',
      };
      // Dynamic popup labels
      var popupInfo = parsePopupKey(key);
      if (popupInfo) {
        var fieldNames = { title: '제목', content: '내용', image: '이미지' };
        return '팝업#' + popupInfo.id + ' ' + (fieldNames[popupInfo.field] || popupInfo.field);
      }
      return labels[key] || key;
    }

    function updateChangeCount() {
      var cnt = Object.keys(pendingChanges).length;
      var el = document.getElementById('adminChangeCnt');
      if (el) el.textContent = cnt;
    }

    // P0-1: Save popup changes to popups table, others to site_settings
    async function saveOneChange(key, value) {
      var popupInfo = parsePopupKey(key);
      if (popupInfo) {
        // Route popup edits to PUT /api/admin/popups/:id
        var body = {};
        if (popupInfo.field === 'title') body.title = value;
        else if (popupInfo.field === 'content') body.content = value;
        else if (popupInfo.field === 'image') body.image_url = value;
        var res = await fetch('/api/admin/popups/' + popupInfo.id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify(body)
        });
        return res.ok;
      } else {
        // Default: save to site_settings
        var res = await fetch('/api/admin/settings/' + key, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({ value: value })
        });
        return res.ok;
      }
    }

    // Save changes via API
    window.saveAdminChanges = async function() {
      var keys = Object.keys(pendingChanges);
      if (keys.length === 0) {
        alert('변경된 항목이 없습니다.');
        return;
      }

      var saveBtn = document.getElementById('adminSaveBtn');
      saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:4px;"></i>저장중...';
      saveBtn.disabled = true;

      var errors = [];
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = pendingChanges[key];
        try {
          var ok = await saveOneChange(key, value);
          if (!ok) errors.push(key);
        } catch (e) {
          errors.push(key);
        }
      }

      saveBtn.disabled = false;
      if (errors.length === 0) {
        saveBtn.innerHTML = '<i class="fas fa-check" style="margin-right:4px;"></i>저장완료!';
        pendingChanges = {};
        updateChangeCount();
        // P1-2: Show refresh notice
        setTimeout(function() {
          saveBtn.innerHTML = '<i class="fas fa-save" style="margin-right:4px;"></i>저장';
          if (confirm('저장 완료! 변경사항을 확인하려면 페이지를 새로고침해야 합니다.\n\n지금 새로고침 하시겠습니까?')) {
            location.reload();
          }
        }, 800);
        // Update original content
        editableElements.forEach(function(el) {
          el.dataset.adminOriginal = el.innerHTML;
        });
      } else {
        saveBtn.innerHTML = '<i class="fas fa-save" style="margin-right:4px;"></i>저장';
        alert(errors.length + '개 항목 저장 실패. 다시 시도해주세요.');
      }
    };

    // Cancel edit mode
    window.cancelAdminEdit = function() {
      // Restore original content
      editableElements.forEach(function(el) {
        if (el.dataset.adminOriginal) {
          el.innerHTML = el.dataset.adminOriginal;
        }
      });
      pendingChanges = {};
      updateChangeCount();
      window.toggleAdminEdit();
    };
  })();
  </script>
</body>
</html>`;
}
