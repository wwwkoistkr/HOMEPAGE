// KOIST - Main Layout Template (v4 - Premium Polished)
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
    * { font-family: 'Noto Sans KR', system-ui, -apple-system, sans-serif; }
    html { scroll-behavior: smooth; }

    /* Custom scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #F1F5F9; }
    ::-webkit-scrollbar-thumb { background: #94A3B8; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #64748B; }

    /* ─── GNB ─── */
    .gnb-item .gnb-dropdown { 
      opacity: 0; visibility: hidden; transform: translateY(4px); 
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
    }
    .gnb-item:hover .gnb-dropdown { opacity: 1; visibility: visible; transform: translateY(0); }

    /* GNB menu items - responsive sizing */
    .gnb-link {
      padding: 0.5rem clamp(0.35rem, 0.7vw, 0.75rem);
      font-size: clamp(0.72rem, 0.82vw, 0.88rem);
      font-weight: 500;
      color: #CBD5E1;
      white-space: nowrap;
      transition: color 0.15s;
      letter-spacing: -0.01em;
    }
    .gnb-link:hover { color: #FFFFFF; }

    /* ─── Mobile ─── */
    .mobile-menu { transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .mobile-menu.active { transform: translateX(0); }
    .mobile-overlay { opacity: 0; visibility: hidden; transition: all 0.3s; }
    .mobile-overlay.active { opacity: 1; visibility: visible; }

    /* ─── Cards & Effects ─── */
    .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(15,23,42,0.10); }

    /* ─── Section backgrounds ─── */
    .section-alt { background: #F1F5F9; }
    .section-white { background: #FFFFFF; }

    /* ─── Popup ─── */
    .popup-overlay { backdrop-filter: blur(2px); }
  </style>
  ${opts.headExtra || ''}
</head>
<body class="bg-[#F1F5F9] text-slate-700">

  <!-- ═══════════════════════════════════════ GNB ═══════════════════════════════════════ -->
  <header id="gnb" class="fixed top-0 left-0 right-0 z-50 bg-[#0F172A] shadow-lg shadow-black/10">
    <div class="max-w-[1320px] mx-auto px-4 lg:px-6">
      <div class="flex items-center justify-between h-[60px] lg:h-[68px]">

        <!-- Logo -->
        <a href="/" class="flex items-center shrink-0">
          ${s.logo_url && s.logo_url.trim() !== '' && s.logo_url !== '/static/images/logo.png' ? `
          <img src="${s.logo_url}" alt="${siteName}" class="h-8 lg:h-9 w-auto object-contain">
          ` : `
          <div class="flex items-center gap-2">
            <i class="fas fa-shield-halved text-accent text-xl"></i>
            <div>
              <div class="text-sm font-bold text-white leading-tight">한국정보보안기술원</div>
              <div class="text-[10px] text-slate-400 tracking-widest">KOIST</div>
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

        <!-- Right: phone + hamburger -->
        <div class="flex items-center gap-2">
          <a href="tel:${s.phone || '02-586-1230'}" class="hidden sm:inline-flex items-center gap-1.5 text-white text-xs font-medium bg-accent/90 hover:bg-accent px-3 py-1.5 rounded-md transition-colors">
            <i class="fas fa-phone text-[10px]"></i>
            <span>${s.phone || '02-586-1230'}</span>
          </a>
          <button id="mobileMenuBtn" class="lg:hidden p-2 text-slate-300 hover:text-white" aria-label="메뉴 열기">
            <i class="fas fa-bars text-lg"></i>
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
      <span class="font-bold text-lg text-primary">메뉴</span>
      <button onclick="closeMobileMenu()" class="p-2 text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl"></i></button>
    </div>
    <div class="p-4 space-y-1">
      <!-- 연락처 -->
      <a href="tel:${s.phone || '02-586-1230'}" class="flex items-center gap-3 p-3 bg-accent/5 rounded-xl mb-3">
        <div class="w-9 h-9 bg-accent text-white rounded-full flex items-center justify-center text-sm"><i class="fas fa-phone"></i></div>
        <div>
          <div class="text-xs text-gray-500">상담문의</div>
          <div class="text-base font-bold text-accent">${s.phone || '02-586-1230'}</div>
        </div>
      </a>
      ${deps.filter(d => d.is_active).map(dept => `
      <a href="/services/${dept.slug}" class="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors" onclick="closeMobileMenu()">
        <i class="fas ${dept.icon} text-sm w-5 text-center" style="color:${dept.color}"></i>
        <span class="text-sm font-medium">${dept.name}</span>
      </a>
      `).join('')}
      <div class="border-t my-2 pt-2">
        <a href="/support/notice"    class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm" onclick="closeMobileMenu()"><i class="fas fa-bullhorn w-5 text-center text-gray-400 text-xs"></i>공지사항</a>
        <a href="/support/faq"       class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm" onclick="closeMobileMenu()"><i class="fas fa-circle-question w-5 text-center text-gray-400 text-xs"></i>FAQ</a>
        <a href="/support/downloads" class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm" onclick="closeMobileMenu()"><i class="fas fa-download w-5 text-center text-gray-400 text-xs"></i>자료실</a>
        <a href="/support/inquiry"   class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm" onclick="closeMobileMenu()"><i class="fas fa-envelope w-5 text-center text-gray-400 text-xs"></i>온라인 상담</a>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════ Content ══════════════════════════════════════ -->
  <main class="pt-[60px] lg:pt-[68px]">
    ${opts.content}
  </main>

  <!-- ═══════════════════════════════════ Footer ══════════════════════════════════════ -->
  <footer class="bg-[#0F172A] text-gray-400 mt-auto">
    <!-- Top bar accent -->
    <div class="h-0.5 bg-gradient-to-r from-accent via-blue-400 to-accent/60"></div>

    <div class="max-w-[1320px] mx-auto px-4 lg:px-6 py-10 lg:py-12">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

        <!-- Company Info — 5 cols -->
        <div class="md:col-span-5">
          <div class="mb-5">
            <div class="inline-block bg-white rounded-lg px-4 py-2">
              <img src="/static/images/logo-horizontal.png" alt="${siteName}" class="h-8 w-auto object-contain">
            </div>
          </div>
          <p class="text-sm leading-relaxed text-gray-500 mb-4 max-w-sm">${s.site_slogan || '최상의 시험·인증 서비스로 정보보안 기술을 완성'}</p>
          <div class="space-y-1.5 text-sm">
            <div class="flex items-center gap-2"><i class="fas fa-phone text-accent/70 w-4 text-center text-xs"></i><span>${s.phone || '02-586-1230'}</span></div>
            <div class="flex items-center gap-2"><i class="fas fa-fax text-accent/70 w-4 text-center text-xs"></i><span>FAX: ${s.fax || '02-586-1238'}</span></div>
            <div class="flex items-center gap-2"><i class="fas fa-envelope text-accent/70 w-4 text-center text-xs"></i><a href="mailto:${s.email || 'koist@koist.kr'}" class="hover:text-white transition-colors">${s.email || 'koist@koist.kr'}</a></div>
            <div class="flex items-start gap-2"><i class="fas fa-location-dot text-accent/70 w-4 text-center text-xs mt-0.5"></i><span>${s.address || ''}</span></div>
          </div>
        </div>

        <!-- Quick Links — 3 cols -->
        <div class="md:col-span-3">
          <h4 class="text-white font-semibold text-sm mb-4 tracking-wide">사업분야</h4>
          <ul class="space-y-2 text-sm">
            ${deps.filter(d => d.is_active).slice(0, 6).map(d => `<li><a href="/services/${d.slug}" class="hover:text-white transition-colors">${d.name}</a></li>`).join('')}
          </ul>
        </div>

        <!-- Support Links — 4 cols -->
        <div class="md:col-span-4">
          <h4 class="text-white font-semibold text-sm mb-4 tracking-wide">고객지원</h4>
          <div class="grid grid-cols-2 gap-2 text-sm mb-6">
            <a href="/support/notice" class="hover:text-white transition-colors">공지사항</a>
            <a href="/support/faq" class="hover:text-white transition-colors">FAQ</a>
            <a href="/support/downloads" class="hover:text-white transition-colors">자료실</a>
            <a href="/support/inquiry" class="hover:text-white transition-colors">온라인 상담</a>
            <a href="/about/greeting" class="hover:text-white transition-colors">KOIST 소개</a>
            <a href="/about/location" class="hover:text-white transition-colors">오시는길</a>
          </div>
          <!-- Quick consultation -->
          <div class="bg-white/5 rounded-lg p-3 border border-white/10">
            <p class="text-xs text-gray-500 mb-1">빠른 상담 전화</p>
            <a href="tel:${s.phone || '02-586-1230'}" class="text-white font-bold text-lg hover:text-accent transition-colors">${s.phone || '02-586-1230'}</a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p class="text-xs text-slate-600">&copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
        <div class="flex items-center gap-3 text-xs text-slate-500">
          <a href="/about/greeting" class="hover:text-white transition-colors">KOIST 소개</a>
          <span class="text-slate-700">|</span>
          <a href="/support/inquiry" class="hover:text-white transition-colors">문의하기</a>
          <span class="text-slate-700">|</span>
          <a href="/admin" class="hover:text-white transition-colors"><i class="fas fa-lock text-[10px] mr-0.5"></i>관리자</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- AOS -->
  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
  <script>AOS.init({ duration: 500, once: true, offset: 40 });</script>

  <!-- Menu & Scroll Scripts -->
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
  <!-- Google Analytics -->
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
