// KOIST - Main Layout Template (v5 - Full Fluid Responsive)
import type { SettingsMap, Department } from '../types';

export function layout(opts: {
  title?: string;
  settings: SettingsMap;
  departments?: Department[];
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        extend: {
          colors: {
            primary: { DEFAULT: '#0F172A', light: '#1E293B', lighter: '#334155', mid: '#1E3A5F' },
            accent: { DEFAULT: '#3B82F6', dark: '#2563EB', light: '#60A5FA', teal: '#14B8A6' },
            surface: { DEFAULT: '#F8FAFC', warm: '#F1F5F9', card: '#FFFFFF', muted: '#E2E8F0' },
          },
          fontFamily: {
            sans: ['"Noto Sans KR"', 'system-ui', '-apple-system', 'sans-serif'],
          },
        }
      }
    }
  </script>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">

  <!-- FontAwesome Icons -->
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">

  <!-- AOS Animation -->
  <link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet">

  <style>
    /* ═══════════════════════════════════════════════════════
       FLUID DESIGN SYSTEM
       모든 크기가 화면 너비(320px~1440px)에 비례하여 변합니다.
       공식: clamp(최소값, 선호값(vw 기반), 최대값)
       ═══════════════════════════════════════════════════════ */

    :root {
      /* ── Fluid Typography Scale ── */
      --text-xs:   clamp(0.68rem, 0.6rem + 0.2vw, 0.78rem);   /* 10.9 ~ 12.5px */
      --text-sm:   clamp(0.78rem, 0.7rem + 0.25vw, 0.9rem);    /* 12.5 ~ 14.4px */
      --text-base: clamp(0.88rem, 0.8rem + 0.3vw, 1.02rem);    /* 14.1 ~ 16.3px */
      --text-lg:   clamp(1rem, 0.9rem + 0.4vw, 1.2rem);        /* 16 ~ 19.2px */
      --text-xl:   clamp(1.15rem, 1rem + 0.5vw, 1.4rem);       /* 18.4 ~ 22.4px */
      --text-2xl:  clamp(1.3rem, 1.1rem + 0.7vw, 1.75rem);     /* 20.8 ~ 28px */
      --text-3xl:  clamp(1.6rem, 1.3rem + 1vw, 2.25rem);       /* 25.6 ~ 36px */
      --text-hero: clamp(1.8rem, 1.4rem + 1.4vw, 2.8rem);      /* 28.8 ~ 44.8px */

      /* ── Fluid Spacing Scale ── */
      --space-xs:  clamp(0.25rem, 0.2rem + 0.15vw, 0.4rem);    /* 4 ~ 6.4px */
      --space-sm:  clamp(0.5rem, 0.4rem + 0.3vw, 0.75rem);     /* 8 ~ 12px */
      --space-md:  clamp(0.75rem, 0.6rem + 0.5vw, 1.25rem);    /* 12 ~ 20px */
      --space-lg:  clamp(1.25rem, 1rem + 0.8vw, 2rem);         /* 20 ~ 32px */
      --space-xl:  clamp(2rem, 1.5rem + 1.5vw, 3.5rem);        /* 32 ~ 56px */
      --space-2xl: clamp(3rem, 2rem + 2.5vw, 5rem);            /* 48 ~ 80px */

      /* ── Fluid Container ── */
      --container-pad: clamp(1rem, 0.5rem + 2vw, 2.5rem);      /* 16 ~ 40px */
      --container-max: min(100% - var(--container-pad) * 2, 1320px);

      /* ── GNB ── */
      --gnb-h: clamp(54px, 48px + 1.2vw, 68px);               /* 54 ~ 68px */
    }

    * { font-family: 'Noto Sans KR', system-ui, -apple-system, sans-serif; }
    html { scroll-behavior: smooth; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #F1F5F9; }
    ::-webkit-scrollbar-thumb { background: #94A3B8; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #64748B; }

    /* ── Utility classes using fluid vars ── */
    .fluid-container {
      width: var(--container-max);
      margin-left: auto;
      margin-right: auto;
      padding-left: var(--container-pad);
      padding-right: var(--container-pad);
    }
    .f-text-xs   { font-size: var(--text-xs); }
    .f-text-sm   { font-size: var(--text-sm); }
    .f-text-base { font-size: var(--text-base); }
    .f-text-lg   { font-size: var(--text-lg); }
    .f-text-xl   { font-size: var(--text-xl); }
    .f-text-2xl  { font-size: var(--text-2xl); }
    .f-text-3xl  { font-size: var(--text-3xl); }
    .f-text-hero { font-size: var(--text-hero); }

    .f-section-y { padding-top: var(--space-2xl); padding-bottom: var(--space-2xl); }
    .f-section-y-sm { padding-top: var(--space-xl); padding-bottom: var(--space-xl); }
    .f-gap       { gap: var(--space-lg); }
    .f-gap-sm    { gap: var(--space-md); }
    .f-gap-xs    { gap: var(--space-sm); }
    .f-mb        { margin-bottom: var(--space-lg); }
    .f-mb-sm     { margin-bottom: var(--space-md); }
    .f-mb-xs     { margin-bottom: var(--space-sm); }
    .f-p         { padding: var(--space-lg); }
    .f-p-sm      { padding: var(--space-md); }

    /* ── GNB ── */
    .gnb-item .gnb-dropdown {
      opacity: 0; visibility: hidden; transform: translateY(4px);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .gnb-item:hover .gnb-dropdown { opacity: 1; visibility: visible; transform: translateY(0); }

    .gnb-link {
      padding: 0.5rem clamp(0.3rem, 0.65vw, 0.7rem);
      font-size: clamp(0.7rem, 0.58rem + 0.35vw, 0.88rem);
      font-weight: 500;
      color: #CBD5E1;
      white-space: nowrap;
      transition: color 0.15s;
      letter-spacing: -0.01em;
    }
    .gnb-link:hover { color: #FFFFFF; }

    /* ── Mobile ── */
    .mobile-menu { transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .mobile-menu.active { transform: translateX(0); }
    .mobile-overlay { opacity: 0; visibility: hidden; transition: all 0.3s; }
    .mobile-overlay.active { opacity: 1; visibility: visible; }

    /* ── Card hover ── */
    .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(15,23,42,0.10); }

    /* ── Popup ── */
    .popup-overlay { backdrop-filter: blur(2px); }
  </style>
  ${opts.headExtra || ''}
</head>
<body class="bg-[#F1F5F9] text-slate-700">

  <!-- ═══════════ GNB ═══════════ -->
  <header id="gnb" class="fixed top-0 left-0 right-0 z-50 shadow-lg shadow-black/10" style="${s.gnb_bg_url ? `background-image: linear-gradient(rgba(15,23,42,0.92), rgba(15,23,42,0.92)), url('${s.gnb_bg_url}'); background-size:cover; background-position:center;` : 'background: #0F172A;'}">
    <div class="fluid-container">
      <div class="flex items-center justify-between" style="height:var(--gnb-h)">

        <!-- Logo -->
        <a href="/" class="flex items-center shrink-0">
          ${s.logo_url && s.logo_url.trim() !== '' && s.logo_url !== '/static/images/logo.png' ? `
          <img src="${s.logo_url}" alt="${siteName}" style="height:clamp(28px, 24px + 0.8vw, 38px)" class="w-auto object-contain">
          ` : `
          <div class="flex items-center gap-2">
            <i class="fas fa-shield-halved text-accent" style="font-size:var(--text-xl)"></i>
            <div>
              <div class="font-bold text-white leading-tight f-text-sm">한국정보보안기술원</div>
              <div class="text-slate-400 tracking-widest f-text-xs">KOIST</div>
            </div>
          </div>
          `}
        </a>

        <!-- Desktop GNB — breakpoint: lg (1024px) -->
        <nav class="hidden lg:flex items-center">
          ${deps.filter(d => d.is_active).map(dept => `
          <div class="gnb-item relative">
            <a href="/services/${dept.slug}" class="gnb-link">${dept.name}</a>
            <div class="gnb-dropdown absolute top-full left-1/2 -translate-x-1/2 pt-2 min-w-[170px]" id="gnb-drop-${dept.slug}"></div>
          </div>
          `).join('')}
          <a href="/support/notice" class="gnb-link">고객지원</a>
        </nav>

        <!-- Right -->
        <div class="flex items-center" style="gap:var(--space-sm)">
          <a href="tel:${s.phone || '02-586-1230'}" class="hidden sm:inline-flex items-center gap-1.5 text-white font-medium bg-accent/90 hover:bg-accent rounded-md transition-colors f-text-xs" style="padding:var(--space-xs) var(--space-sm)">
            <i class="fas fa-phone" style="font-size:10px"></i>
            <span>${s.phone || '02-586-1230'}</span>
          </a>
          <button id="mobileMenuBtn" class="lg:hidden p-2 text-slate-300 hover:text-white" aria-label="메뉴 열기">
            <i class="fas fa-bars" style="font-size:var(--text-lg)"></i>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Overlay -->
  <div id="mobileOverlay" class="mobile-overlay fixed inset-0 bg-black/50 z-[60]" onclick="closeMobileMenu()"></div>

  <!-- Mobile Slide-out Menu -->
  <div id="mobileMenu" class="mobile-menu fixed top-0 right-0 bottom-0 w-[min(85vw,360px)] bg-white z-[70] overflow-y-auto shadow-2xl">
    <div class="p-5 border-b flex justify-between items-center">
      <span class="font-bold text-primary f-text-lg">메뉴</span>
      <button onclick="closeMobileMenu()" class="p-2 text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl"></i></button>
    </div>
    <div class="p-4 space-y-1">
      <a href="tel:${s.phone || '02-586-1230'}" class="flex items-center gap-3 p-3 bg-accent/5 rounded-xl mb-3">
        <div class="w-9 h-9 bg-accent text-white rounded-full flex items-center justify-center f-text-sm"><i class="fas fa-phone"></i></div>
        <div>
          <div class="f-text-xs text-gray-500">상담문의</div>
          <div class="f-text-base font-bold text-accent">${s.phone || '02-586-1230'}</div>
        </div>
      </a>
      ${deps.filter(d => d.is_active).map(dept => `
      <a href="/services/${dept.slug}" class="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors" onclick="closeMobileMenu()">
        <i class="fas ${dept.icon} w-5 text-center f-text-sm" style="color:${dept.color}"></i>
        <span class="f-text-sm font-medium">${dept.name}</span>
      </a>
      `).join('')}
      <div class="border-t my-2 pt-2">
        <a href="/support/notice"    class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm" onclick="closeMobileMenu()"><i class="fas fa-bullhorn w-5 text-center text-gray-400 f-text-xs"></i>공지사항</a>
        <a href="/support/faq"       class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm" onclick="closeMobileMenu()"><i class="fas fa-circle-question w-5 text-center text-gray-400 f-text-xs"></i>FAQ</a>
        <a href="/support/downloads" class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm" onclick="closeMobileMenu()"><i class="fas fa-download w-5 text-center text-gray-400 f-text-xs"></i>자료실</a>
        <a href="/support/inquiry"   class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm" onclick="closeMobileMenu()"><i class="fas fa-envelope w-5 text-center text-gray-400 f-text-xs"></i>온라인 상담</a>
      </div>
    </div>
  </div>

  <!-- ═══════════ Content ═══════════ -->
  <main style="padding-top:var(--gnb-h)">
    ${opts.content}
  </main>

  <!-- ═══════════ Footer ═══════════ -->
  <footer class="text-gray-400 mt-auto" style="${s.footer_bg_url ? `background-image: linear-gradient(rgba(15,23,42,0.93), rgba(15,23,42,0.93)), url('${s.footer_bg_url}'); background-size:cover; background-position:center;` : 'background: #0F172A;'}">
    <div class="h-0.5 bg-gradient-to-r from-accent via-blue-400 to-accent/60"></div>

    <div class="fluid-container f-section-y">
      <div class="grid grid-cols-1 md:grid-cols-12 f-gap">

        <!-- Company Info -->
        <div class="md:col-span-5">
          <div class="f-mb">
            <div class="inline-block bg-white rounded-lg" style="padding:var(--space-sm) var(--space-md)">
              <img src="/static/images/logo-horizontal.png" alt="${siteName}" style="height:clamp(26px, 22px + 0.6vw, 34px)" class="w-auto object-contain">
            </div>
          </div>
          <p class="f-text-sm leading-relaxed text-gray-500 f-mb-sm max-w-sm">${s.site_slogan || '최상의 시험·인증 서비스로 정보보안 기술을 완성'}</p>
          <div class="space-y-1.5 f-text-sm">
            <div class="flex items-center gap-2"><i class="fas fa-phone text-accent/70 w-4 text-center f-text-xs"></i><span>${s.phone || '02-586-1230'}</span></div>
            <div class="flex items-center gap-2"><i class="fas fa-fax text-accent/70 w-4 text-center f-text-xs"></i><span>FAX: ${s.fax || '02-586-1238'}</span></div>
            <div class="flex items-center gap-2"><i class="fas fa-envelope text-accent/70 w-4 text-center f-text-xs"></i><a href="mailto:${s.email || 'koist@koist.kr'}" class="hover:text-white transition-colors">${s.email || 'koist@koist.kr'}</a></div>
            <div class="flex items-start gap-2"><i class="fas fa-location-dot text-accent/70 w-4 text-center f-text-xs mt-0.5"></i><span>${s.address || ''}</span></div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="md:col-span-3">
          <h4 class="text-white font-semibold f-text-sm f-mb-sm tracking-wide">사업분야</h4>
          <ul class="space-y-2 f-text-sm">
            ${deps.filter(d => d.is_active).slice(0, 6).map(d => `<li><a href="/services/${d.slug}" class="hover:text-white transition-colors">${d.name}</a></li>`).join('')}
          </ul>
        </div>

        <!-- Support Links -->
        <div class="md:col-span-4">
          <h4 class="text-white font-semibold f-text-sm f-mb-sm tracking-wide">고객지원</h4>
          <div class="grid grid-cols-2 f-gap-xs f-text-sm f-mb">
            <a href="/support/notice" class="hover:text-white transition-colors">공지사항</a>
            <a href="/support/faq" class="hover:text-white transition-colors">FAQ</a>
            <a href="/support/downloads" class="hover:text-white transition-colors">자료실</a>
            <a href="/support/inquiry" class="hover:text-white transition-colors">온라인 상담</a>
            <a href="/about/greeting" class="hover:text-white transition-colors">KOIST 소개</a>
            <a href="/about/location" class="hover:text-white transition-colors">오시는길</a>
          </div>
          <div class="bg-white/5 rounded-lg border border-white/10 f-p-sm">
            <p class="f-text-xs text-gray-500 mb-1">빠른 상담 전화</p>
            <a href="tel:${s.phone || '02-586-1230'}" class="text-white font-bold f-text-lg hover:text-accent transition-colors">${s.phone || '02-586-1230'}</a>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-white/10 flex flex-col sm:flex-row justify-between items-center f-gap-xs" style="margin-top:var(--space-lg); padding-top:var(--space-lg)">
        <p class="f-text-xs text-slate-600">&copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
        <div class="flex items-center f-text-xs text-slate-500" style="gap:var(--space-sm)">
          <a href="/about/greeting" class="hover:text-white transition-colors">KOIST 소개</a>
          <span class="text-slate-700">|</span>
          <a href="/support/inquiry" class="hover:text-white transition-colors">문의하기</a>
          <span class="text-slate-700">|</span>
          <a href="/admin" class="hover:text-white transition-colors"><i class="fas fa-lock mr-0.5" style="font-size:9px"></i>관리자</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- AOS -->
  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
  <script>AOS.init({ duration: 500, once: true, offset: 40 });</script>

  <script>
    function openMobileMenu() {
      document.getElementById('mobileMenu').classList.add('active');
      document.getElementById('mobileOverlay').classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeMobileMenu() {
      document.getElementById('mobileMenu').classList.remove('active');
      document.getElementById('mobileOverlay').classList.remove('active');
      document.body.style.overflow = '';
    }
    document.getElementById('mobileMenuBtn')?.addEventListener('click', openMobileMenu);
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
</body>
</html>`;
}
