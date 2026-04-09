// KOIST - Main Layout Template
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

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: { DEFAULT: '${s.primary_color || '#1E3A5F'}', light: '#2D5A8E', lighter: '#4A7AB5' },
            accent: { DEFAULT: '${s.accent_color || '#3B82F6'}', dark: '#2563EB', light: '#60A5FA' },
            surface: { DEFAULT: '#FAFBFC', dark: '#F5F6FA', light: '#FEFEFE' },
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
    
    /* Fluid Typography */
    html { font-size: clamp(15px, 1vw + 10px, 18px); }
    
    /* Smooth scroll */
    html { scroll-behavior: smooth; }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #F0F2F5; }
    ::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #64748b; }
    
    /* GNB dropdown */
    .gnb-item:hover .gnb-dropdown { opacity: 1; visibility: visible; transform: translateY(0); }
    .gnb-dropdown { opacity: 0; visibility: hidden; transform: translateY(-8px); transition: all 0.2s ease; }
    
    /* Mobile menu */
    .mobile-menu { transform: translateX(100%); transition: transform 0.3s ease; }
    .mobile-menu.active { transform: translateX(0); }
    .mobile-overlay { opacity: 0; visibility: hidden; transition: all 0.3s ease; }
    .mobile-overlay.active { opacity: 1; visibility: visible; }
    
    /* Contact badge pulse */
    @keyframes pulse-ring {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.3); opacity: 0; }
    }
    .contact-pulse::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: inherit;
      border: 2px solid currentColor;
      animation: pulse-ring 2s ease-out infinite;
    }
    
    /* Card hover effect */
    .service-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .service-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(100,116,139,0.15); }
    
    /* Popup styles */
    .popup-overlay { backdrop-filter: blur(2px); }
  </style>
  ${opts.headExtra || ''}
</head>
<body class="bg-[#F5F6FA] text-[#2D3748] ${opts.bodyClass || ''}">

  <!-- GNB Navigation -->
  <header id="gnb" class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
    <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(0.5rem,2vw,1.5rem)]">
      <div class="flex items-center justify-between h-[clamp(56px,8vh,80px)]">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2 shrink-0">
          ${s.logo_url && s.logo_url.trim() !== '' && s.logo_url !== '/static/images/logo.png' ? `
          <img src="${s.logo_url}" alt="${siteName}" class="h-[clamp(32px,5vw,48px)] w-auto object-contain">
          ` : `
          <div class="flex items-center">
            <i class="fas fa-shield-halved text-accent text-[clamp(1.2rem,2.5vw,2rem)]"></i>
            <div class="ml-2">
              <div class="text-[clamp(0.7rem,1.2vw,1rem)] font-bold text-primary leading-tight">한국정보보안기술원</div>
              <div class="text-[clamp(0.45rem,0.7vw,0.65rem)] text-gray-400 tracking-wider">KOIST</div>
            </div>
          </div>
          `}
        </a>

        <!-- Desktop GNB -->
        <nav class="hidden xl:flex items-center gap-[clamp(0.3rem,1vw,1.2rem)]">
          ${deps.filter(d => d.is_active).map(dept => `
          <div class="gnb-item relative group">
            <a href="/services/${dept.slug}" class="px-[clamp(0.3rem,0.8vw,0.8rem)] py-2 text-[clamp(0.65rem,0.85vw,0.9rem)] font-medium text-gray-700 hover:text-accent transition-colors whitespace-nowrap">${dept.name}</a>
            <div class="gnb-dropdown absolute top-full left-0 pt-2 min-w-[180px]" id="gnb-drop-${dept.slug}"></div>
          </div>
          `).join('')}
          <a href="/support/notice" class="px-[clamp(0.3rem,0.8vw,0.8rem)] py-2 text-[clamp(0.65rem,0.85vw,0.9rem)] font-medium text-gray-700 hover:text-accent transition-colors whitespace-nowrap">고객지원</a>
        </nav>

        <!-- Contact Quick & Mobile Toggle -->
        <div class="flex items-center gap-3">
          <a href="tel:${s.phone || '02-586-1230'}" class="hidden md:flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-accent-dark transition-colors">
            <i class="fas fa-phone text-xs"></i>
            <span>${s.phone || '02-586-1230'}</span>
          </a>
          <button id="mobileMenuBtn" class="xl:hidden p-2 text-gray-700 hover:text-accent" aria-label="메뉴">
            <i class="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Menu Overlay -->
  <div id="mobileOverlay" class="mobile-overlay fixed inset-0 bg-black/50 z-[60]" onclick="closeMobileMenu()"></div>
  
  <!-- Mobile Menu -->
  <div id="mobileMenu" class="mobile-menu fixed top-0 right-0 bottom-0 w-[min(85vw,380px)] bg-white z-[70] overflow-y-auto shadow-2xl">
    <div class="p-5 border-b flex justify-between items-center">
      <span class="font-bold text-lg text-primary">메뉴</span>
      <button onclick="closeMobileMenu()" class="p-2 text-gray-500 hover:text-gray-800"><i class="fas fa-times text-xl"></i></button>
    </div>
    <div class="p-4">
      <!-- 연락처 -->
      <a href="tel:${s.phone || '02-586-1230'}" class="flex items-center gap-3 p-4 bg-accent/10 rounded-xl mb-4">
        <div class="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center"><i class="fas fa-phone"></i></div>
        <div>
          <div class="text-sm text-gray-500">상담문의</div>
          <div class="text-lg font-bold text-accent">${s.phone || '02-586-1230'}</div>
        </div>
      </a>
      <!-- 메뉴 목록 -->
      ${deps.filter(d => d.is_active).map(dept => `
      <div class="mb-1">
        <a href="/services/${dept.slug}" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors" onclick="closeMobileMenu()">
          <i class="fas ${dept.icon} text-sm" style="color:${dept.color}"></i>
          <span class="font-medium">${dept.name}</span>
        </a>
      </div>
      `).join('')}
      <div class="border-t mt-3 pt-3">
        <a href="/support/notice" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg" onclick="closeMobileMenu()"><i class="fas fa-bullhorn text-sm text-gray-400"></i><span>공지사항</span></a>
        <a href="/support/faq" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg" onclick="closeMobileMenu()"><i class="fas fa-circle-question text-sm text-gray-400"></i><span>FAQ</span></a>
        <a href="/support/downloads" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg" onclick="closeMobileMenu()"><i class="fas fa-download text-sm text-gray-400"></i><span>자료실</span></a>
        <a href="/support/inquiry" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg" onclick="closeMobileMenu()"><i class="fas fa-envelope text-sm text-gray-400"></i><span>온라인 상담</span></a>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <main class="pt-[clamp(56px,8vh,80px)]">
    ${opts.content}
  </main>

  <!-- Footer -->
  <footer class="bg-[#1E293B] text-gray-300 mt-auto">
    <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)] py-[clamp(2rem,4vh,4rem)]">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Company Info -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            ${s.logo_url && s.logo_url.trim() !== '' && s.logo_url !== '/static/images/logo.png' ? `
            <img src="${s.logo_url}" alt="${siteName}" class="h-8 w-auto object-contain brightness-0 invert">
            ` : `
            <i class="fas fa-shield-halved text-accent text-xl"></i>
            <span class="font-bold text-white text-lg">KOIST</span>
            `}
          </div>
          <p class="text-sm leading-relaxed text-gray-400">${s.site_slogan || '최상의 시험·인증 서비스로 정보보안 기술을 완성'}</p>
        </div>
        <!-- Contact -->
        <div>
          <h3 class="font-bold text-white mb-4">연락처</h3>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2"><i class="fas fa-phone text-accent w-4"></i><span>${s.phone || '02-586-1230'}</span></div>
            <div class="flex items-center gap-2"><i class="fas fa-fax text-accent w-4"></i><span>FAX: ${s.fax || '02-586-1238'}</span></div>
            <div class="flex items-center gap-2"><i class="fas fa-envelope text-accent w-4"></i><a href="mailto:${s.email || 'koist@koist.kr'}" class="hover:text-white transition-colors">${s.email || 'koist@koist.kr'}</a></div>
            <div class="flex items-start gap-2"><i class="fas fa-location-dot text-accent w-4 mt-1"></i><span>${s.address || ''}</span></div>
          </div>
        </div>
        <!-- Quick Links -->
        <div>
          <h3 class="font-bold text-white mb-4">바로가기</h3>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <a href="/support/notice" class="hover:text-white transition-colors">공지사항</a>
            <a href="/support/faq" class="hover:text-white transition-colors">FAQ</a>
            <a href="/support/downloads" class="hover:text-white transition-colors">자료실</a>
            <a href="/support/inquiry" class="hover:text-white transition-colors">온라인 상담</a>
            <a href="/about/greeting" class="hover:text-white transition-colors">KOIST 소개</a>
            <a href="/about/location" class="hover:text-white transition-colors">오시는길</a>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-gray-500">&copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
        <div class="flex items-center gap-4 text-xs text-gray-500">
          <a href="/about/greeting" class="hover:text-gray-300 transition-colors">KOIST 소개</a>
          <span class="text-gray-700">|</span>
          <a href="/support/inquiry" class="hover:text-gray-300 transition-colors">문의하기</a>
          <span class="text-gray-700">|</span>
          <a href="/admin" class="hover:text-gray-300 transition-colors" title="관리자"><i class="fas fa-lock text-[10px] mr-0.5"></i>관리자</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- AOS Animation -->
  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
  <script>AOS.init({ duration: 600, once: true, offset: 50 });</script>

  <!-- Mobile Menu Script -->
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

    // GNB scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const gnb = document.getElementById('gnb');
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        gnb.classList.add('shadow-md');
        gnb.classList.remove('shadow-sm');
      } else {
        gnb.classList.remove('shadow-md');
        gnb.classList.add('shadow-sm');
      }
      lastScroll = scrollY;
    });
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
