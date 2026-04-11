// KOIST - Home Page Template (v11.0 - Full Original Content Restored + Featured Services + KOLAS)
import type { SettingsMap, Department, Popup, Notice, ProgressItem } from '../types';

// Helper: generate background style with image overlay or gradient fallback
function bgStyle(imageUrl: string | undefined, fallbackGradient: string, opacity: string = '0.85'): string {
  if (imageUrl && imageUrl.trim() !== '') {
    return `background-image: linear-gradient(rgba(10,15,30,${opacity}), rgba(10,15,30,${opacity})), url('${imageUrl}'); background-size:cover; background-position:center;`;
  }
  return `background: ${fallbackGradient};`;
}

export function homePage(opts: {
  settings: SettingsMap;
  departments: Department[];
  popups: Popup[];
  notices: Notice[];
  progressItems: ProgressItem[];
  progressCategoryCounts: {category: string; cnt: number}[];
}) {
  const s = opts.settings;
  const deps = opts.departments.filter(d => d.is_active);
  const popups = opts.popups;
  const notices = opts.notices.slice(0, 5);
  const progress = opts.progressItems.slice(0, 5);
  const catCounts = opts.progressCategoryCounts || [];
  const heroOpacity = s.hero_overlay_opacity || '0.85';

  // Category metadata for icons/colors (원본 koist.kr 기반)
  const catMeta: Record<string, {icon: string; color: string}> = {
    'CC평가':       { icon: 'fa-shield-halved', color: '#3B82F6' },
    '보안기능시험':   { icon: 'fa-file-shield', color: '#8B5CF6' },
    '암호모듈검증':   { icon: 'fa-lock', color: '#EC4899' },
    '성능평가':      { icon: 'fa-gauge-high', color: '#F59E0B' },
    '보안적합성검증':  { icon: 'fa-clipboard-check', color: '#10B981' },
    '취약점분석평가':  { icon: 'fa-bug', color: '#EF4444' },
    '정보보호제품평가': { icon: 'fa-box-archive', color: '#06B6D4' },
    '클라우드보안인증': { icon: 'fa-cloud-arrow-up', color: '#6366F1' },
    'IoT보안인증':   { icon: 'fa-microchip', color: '#14B8A6' },
    '기타시험평가':   { icon: 'fa-flask', color: '#78716C' },
  };

  // Total evaluation count for bar chart
  const totalEvals = catCounts.reduce((sum, c) => sum + c.cnt, 0);

  return `
  <!-- Popup System (Mobile-Responsive Modal) -->
  ${popups.length > 0 ? `
  <div id="popupOverlay" class="fixed inset-0 z-[9998] transition-opacity duration-300" style="background:rgba(0,0,0,0.5); backdrop-filter:blur(4px);" onclick="closeAllPopups()"></div>
  <div id="popupContainer" class="fixed z-[9999] popup-responsive-container">
    <!-- Popup Navigation (multiple popups) -->
    ${popups.length > 1 ? `
    <div id="popupNav" class="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
      <button onclick="prevPopup()" class="w-7 h-7 rounded-full bg-white/90 text-gray-600 hover:bg-white shadow flex items-center justify-center text-xs"><i class="fas fa-chevron-left"></i></button>
      <span id="popupCounter" class="text-white text-xs font-medium bg-black/40 px-2.5 py-1 rounded-full">1 / ${popups.length}</span>
      <button onclick="nextPopup()" class="w-7 h-7 rounded-full bg-white/90 text-gray-600 hover:bg-white shadow flex items-center justify-center text-xs"><i class="fas fa-chevron-right"></i></button>
    </div>
    ` : ''}
    ${popups.map((p, i) => `
    <div class="popup-slide bg-white rounded-2xl overflow-hidden shadow-2xl ${i === 0 ? '' : 'hidden'}"
         data-popup-index="${i}" data-popup-id="${p.id}" id="popup-${p.id}"
         style="width:100%; max-height:80vh; border:1px solid rgba(226,232,240,0.5); animation: popupSlideIn 0.3s ease-out;">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-slate-100" style="padding:12px 16px; background:linear-gradient(135deg, rgba(248,250,252,0.95), rgba(241,245,249,0.95));">
        <span class="font-semibold text-gray-800" style="font-size:14px; line-height:1.3;">${p.title}</span>
        <button onclick="closeAllPopups()" class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors" aria-label="닫기">
          <i class="fas fa-times" style="font-size:14px;"></i>
        </button>
      </div>
      <!-- Content -->
      <div class="overflow-y-auto" style="max-height:calc(80vh - 110px); -webkit-overflow-scrolling:touch;">
        ${p.popup_type === 'image' && p.image_url 
          ? `<img src="${p.image_url}" alt="${p.title}" class="w-full h-auto" loading="lazy">` 
          : `<div style="padding:16px; font-size:14px; line-height:1.7; color:#374151;">${p.content || ''}</div>`}
      </div>
      <!-- Footer -->
      <div class="flex justify-between items-center border-t border-slate-100" style="padding:10px 16px; background:rgba(248,250,252,0.7);">
        <label class="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" id="noshow-${p.id}" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600">
          <span class="text-gray-500" style="font-size:12px;">오늘 하루 안 보기</span>
        </label>
        <button onclick="closeAllPopups()" class="text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors font-medium" style="padding:6px 14px; font-size:13px;">닫기</button>
      </div>
    </div>
    `).join('')}
  </div>

  <style>
    .popup-responsive-container {
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: min(420px, 92vw);
      max-width: 500px;
    }
    @media (min-width: 768px) {
      .popup-responsive-container { width: min(440px, 80vw); max-width: 520px; }
    }
    @media (min-width: 1280px) {
      .popup-responsive-container { width: 460px; max-width: 520px; }
    }
    @keyframes popupSlideIn {
      from { opacity: 0; transform: translateY(20px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes popupFadeOut {
      from { opacity: 1; }
      to { opacity: 0; transform: scale(0.95); }
    }
  </style>

  <script>
  (function() {
    var today = new Date().toISOString().slice(0, 10);
    var hiddenIds = JSON.parse(localStorage.getItem('koist_popup_hidden') || '{}');
    var popupIds = [${popups.map(p => p.id).join(',')}];
    var allHidden = popupIds.every(function(id) { return hiddenIds[id] === today; });
    if (allHidden) {
      var overlay = document.getElementById('popupOverlay');
      var container = document.getElementById('popupContainer');
      if (overlay) overlay.remove();
      if (container) container.remove();
      return;
    }
    popupIds.forEach(function(id) {
      if (hiddenIds[id] === today) {
        var el = document.getElementById('popup-' + id);
        if (el) el.remove();
      }
    });
  })();
  var currentPopupIndex = 0;
  var totalPopups = ${popups.length};
  function showPopupAtIndex(idx) {
    var slides = document.querySelectorAll('.popup-slide');
    slides.forEach(function(s, i) {
      if (i === idx) { s.classList.remove('hidden'); s.style.animation = 'popupSlideIn 0.25s ease-out'; }
      else { s.classList.add('hidden'); }
    });
    var counter = document.getElementById('popupCounter');
    if (counter) counter.textContent = (idx + 1) + ' / ' + totalPopups;
    currentPopupIndex = idx;
  }
  function nextPopup() { showPopupAtIndex((currentPopupIndex + 1) % totalPopups); }
  function prevPopup() { showPopupAtIndex((currentPopupIndex - 1 + totalPopups) % totalPopups); }
  function closeAllPopups() {
    var today = new Date().toISOString().slice(0, 10);
    var hiddenIds = JSON.parse(localStorage.getItem('koist_popup_hidden') || '{}');
    var checkboxes = document.querySelectorAll('[id^="noshow-"]');
    checkboxes.forEach(function(cb) {
      if (cb.checked) { var id = cb.id.replace('noshow-', ''); hiddenIds[id] = today; }
    });
    localStorage.setItem('koist_popup_hidden', JSON.stringify(hiddenIds));
    var overlay = document.getElementById('popupOverlay');
    var container = document.getElementById('popupContainer');
    if (overlay) { overlay.style.opacity = '0'; }
    if (container) { container.style.animation = 'popupFadeOut 0.2s ease-in forwards'; }
    setTimeout(function() { if (overlay) overlay.remove(); if (container) container.remove(); }, 250);
  }
  (function() {
    var container = document.getElementById('popupContainer');
    if (!container || totalPopups <= 1) return;
    var startX = 0, startY = 0;
    container.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
    container.addEventListener('touchend', function(e) {
      var diffX = e.changedTouches[0].clientX - startX;
      var diffY = Math.abs(e.changedTouches[0].clientY - startY);
      if (Math.abs(diffX) > 50 && diffY < 100) { if (diffX < 0) nextPopup(); else prevPopup(); }
    }, { passive: true });
  })();
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeAllPopups(); });
  </script>
  ` : ''}

  <!-- ═══════════════════════════════════════════════════════
       HERO SECTION (Premium Immersive - Original Text Restored)
       ═══════════════════════════════════════════════════════ -->
  <section class="relative overflow-hidden" style="${bgStyle(s.hero_bg_url, 'var(--grad-hero)', heroOpacity)}">
    <!-- Animated background layers -->
    ${!s.hero_bg_url ? `
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute animate-float-slow" style="top:10%; left:5%; width:clamp(200px,25vw,450px); height:clamp(200px,25vw,450px); background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%); border-radius:50%; filter:blur(40px);"></div>
      <div class="absolute animate-float-medium" style="top:30%; right:8%; width:clamp(150px,20vw,350px); height:clamp(150px,20vw,350px); background: radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%); border-radius:50%; filter:blur(40px);"></div>
      <div class="absolute" style="bottom:5%; left:30%; width:clamp(180px,22vw,400px); height:clamp(180px,22vw,400px); background: radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%); border-radius:50%; filter:blur(40px);"></div>
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
      <div class="absolute animate-float-slow opacity-[0.04] text-blue-400" style="top:15%; left:8%; font-size:clamp(2rem,3.5vw,3.5rem)"><i class="fas fa-shield-halved"></i></div>
      <div class="absolute animate-float-medium opacity-[0.03] text-cyan-400" style="top:40%; right:12%; font-size:clamp(1.5rem,3vw,3rem)"><i class="fas fa-lock"></i></div>
      <div class="absolute animate-pulse-glow opacity-[0.04] text-blue-300" style="bottom:20%; left:20%; font-size:clamp(1.2rem,2.2vw,2.2rem)"><i class="fas fa-key"></i></div>
    </div>
    ` : ''}

    <div class="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style="background: linear-gradient(to top, rgba(240,244,248,0.03), transparent);"></div>

    <div class="relative fluid-container" style="padding-top:clamp(3rem,5vw,5.5rem); padding-bottom:clamp(3rem,5vw,5.5rem)">
      <div class="grid grid-cols-1 lg:grid-cols-5 items-center" style="gap:clamp(2rem, 4vw, 5rem)">

        <!-- Left: Hero Text (Original koist.kr text restored) -->
        <div class="lg:col-span-3" data-aos="fade-right" data-aos-duration="800">
          <!-- Badge: Korean Information Security Technology (원본 복원) -->
          <div class="inline-flex items-center rounded-full f-text-xs" style="gap:var(--space-xs); padding:6px 14px; background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.15); backdrop-filter: blur(8px);">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-50"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
            </span>
            <span class="text-blue-300 font-semibold tracking-wide" style="font-family:'Inter','Noto Sans KR',sans-serif;">Korean Information Security Technology</span>
          </div>

          <!-- Main Headline: 원본 koist.kr 메인 배너 문구 복원 -->
          <h1 class="text-white font-black" style="margin-top:var(--space-md); margin-bottom:var(--space-sm); font-size:clamp(2.10rem, 1.55rem + 1.6vw, 3.30rem); line-height:1.3;">
            ${s.site_slogan || '정보보안을 완성하는 기업<br><span style="background: linear-gradient(135deg, #60A5FA, #22D3EE); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">한국정보보안기술원</span>'}
          </h1>

          <!-- Decorative divider (원본 koist.kr 구분선 복원) -->
          <div style="width:50px; height:2px; background: rgba(255,255,255,0.4); margin-bottom:var(--space-md);"></div>

          <!-- Sub-headline: 원본 서브 텍스트 복원 -->
          <p class="text-slate-300/90 leading-relaxed max-w-xl f-text-base" style="margin-bottom:var(--space-xs)">
            ${s.site_sub_slogan || '성실과 신뢰를 바탕으로 최고의 보안서비스를 제공합니다.'}
          </p>

          <!-- Secondary slogan (원본 inc01 핵심 메시지) -->
          <p class="text-slate-400/70 leading-relaxed max-w-lg f-text-sm" style="margin-bottom:var(--space-lg)">
            최상의 시험 &middot; 인증 서비스로 정보보안 기술을 완성 &mdash;
            정보보안 기술은 IT제품으로 구현되고 시험 &middot; 인증 서비스를 통해 완성됩니다.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap" style="gap:var(--space-sm)">
            <a href="/support/inquiry" class="btn-glow ripple-btn f-text-sm" style="padding:var(--space-sm) clamp(1.2rem,2vw,1.8rem);">
              <i class="fas fa-paper-plane f-text-xs"></i> ${s.hero_btn_primary || '온라인 상담'}
            </a>
            <a href="#services" class="btn-ghost ripple-btn f-text-sm" style="padding:var(--space-sm) clamp(1.2rem,2vw,1.8rem);">
              <i class="fas fa-th-large f-text-xs"></i> ${s.hero_btn_secondary || '사업분야 보기'}
            </a>
          </div>
        </div>

        <!-- Right: Contact Card (Glassmorphism) -->
        <div class="lg:col-span-2" data-aos="fade-left" data-aos-delay="200" data-aos-duration="800">
          <div class="relative rounded-2xl overflow-hidden" style="box-shadow: 0 24px 64px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08); background: rgba(255,255,255,0.97); backdrop-filter: blur(12px);">
            <div style="height:3px; background: linear-gradient(90deg, #2563EB, #06B6D4, #3B82F6);"></div>

            <div style="padding: clamp(1.25rem,2vw,1.75rem);">
              <!-- Online indicator -->
              <div class="absolute top-5 right-5">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-green-400 border-2 border-white"></span>
                </span>
              </div>

              <p class="text-slate-500 font-semibold tracking-wider uppercase f-text-xs" style="margin-bottom:var(--space-xs)">
                <i class="fas fa-headset mr-1 text-accent"></i>상담문의
              </p>
              <a href="tel:${s.phone || '02-586-1230'}" class="block font-black hover:text-accent transition-colors tracking-tight f-text-3xl" style="margin-bottom:var(--space-md); background: linear-gradient(135deg, #0A0F1E, #1E293B); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
                ${s.phone_display || s.phone || '02-586-1230'}
              </a>

              <div class="text-slate-600 f-text-sm" style="display:flex; flex-direction:column; gap:10px">
                <div class="flex items-center" style="gap:10px">
                  <div class="shrink-0 rounded-md flex items-center justify-center" style="width:28px; height:28px; background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.05));">
                    <i class="fas fa-envelope text-accent" style="font-size:11px"></i>
                  </div>
                  <a href="mailto:${s.email || 'koist@koist.kr'}" class="hover:text-accent transition-colors">${s.email || 'koist@koist.kr'}</a>
                </div>
                <div class="flex items-center" style="gap:10px">
                  <div class="shrink-0 rounded-md flex items-center justify-center" style="width:28px; height:28px; background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.05));">
                    <i class="fas fa-fax text-accent" style="font-size:11px"></i>
                  </div>
                  <span>FAX ${s.fax || '02-586-1238'}</span>
                </div>
                <div class="flex items-start" style="gap:10px">
                  <div class="shrink-0 rounded-md flex items-center justify-center mt-0.5" style="width:28px; height:28px; background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.05));">
                    <i class="fas fa-location-dot text-accent" style="font-size:11px"></i>
                  </div>
                  <span class="leading-snug f-text-xs text-slate-500">${s.address || '서울특별시 서초구 효령로 336 윤일빌딩 4층'}</span>
                </div>
              </div>

              <!-- Quick badge -->
              <div style="margin-top:var(--space-md); padding-top:var(--space-md); border-top: 1px solid rgba(226,232,240,0.50);">
                <div class="flex items-center rounded-lg" style="gap:var(--space-xs); padding:10px 14px; background: linear-gradient(135deg, rgba(16,185,129,0.05), rgba(6,182,212,0.04)); border: 1px solid rgba(16,185,129,0.12);">
                  <div class="shrink-0 flex items-center justify-center" style="width:24px; height:24px; background: linear-gradient(135deg, rgba(234,179,8,0.15), rgba(251,191,36,0.10)); border-radius: 6px;">
                    <i class="fas fa-bolt text-yellow-500" style="font-size:10px"></i>
                  </div>
                  <span class="text-emerald-700 font-bold f-text-sm">${s.hero_quick_badge || 'CC평가 신청 즉시 착수 가능'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════════════════
       CORE VALUES SECTION (원본 koist.kr #inc01 복원)
       Expert / One-Stop / Quality / Reliability
       ═══════════════════════════════════════════════════════ -->
  <section id="coreValues" class="relative overflow-hidden" style="background: #0A0F1E;">
    <!-- Background image layer -->
    <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(10,15,30,0.92), rgba(15,25,50,0.88)); z-index:1;"></div>
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 40px 40px; z-index:1;"></div>

    <div class="relative fluid-container" style="z-index:2; padding-top:clamp(2.5rem,4vw,4rem); padding-bottom:clamp(2.5rem,4vw,4rem);">
      <!-- Section Header (원본 inc01 .tit 복원) -->
      <div class="text-center" style="margin-bottom:clamp(2rem,3.5vw,3.5rem)" data-aos="fade-up" data-aos-duration="1000">
        <span class="inline-block text-blue-400 font-bold tracking-widest uppercase f-text-sm" style="font-family:'Inter','Noto Sans KR',sans-serif; letter-spacing:0.15em;">Korean Information Security Technology</span>
        <h2 class="text-white font-black f-text-2xl" style="margin-top:var(--space-sm); margin-bottom:var(--space-sm); line-height:1.35;">
          최상의 시험 &middot; 인증 서비스로<br>정보보안 기술을 완성
        </h2>
        <p class="text-slate-400/80 f-text-base max-w-lg mx-auto leading-relaxed">
          정보보안 기술은 IT제품으로 구현되고<br class="hidden sm:inline"> 시험 &middot; 인증 서비스를 통해 완성됩니다.
        </p>
      </div>

      <!-- 4 Core Value Panels (원본 koist.kr Expert/One-Stop/Quality/Reliability) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style="gap:0; border-radius:16px; overflow:hidden;">

        <!-- Expert -->
        <div class="core-value-card group relative" style="border-right:1px solid rgba(255,255,255,0.06);" data-aos="fade-in" data-aos-duration="800">
          <div class="relative z-10 flex flex-col items-center text-center text-white" style="padding:clamp(2rem,3vw,3rem) clamp(1rem,2vw,2rem);">
            <div class="rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style="width:clamp(52px,4.5vw,68px); height:clamp(52px,4.5vw,68px); background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.10)); margin-bottom:var(--space-md); border: 1px solid rgba(59,130,246,0.20);">
              <i class="fas fa-user-tie text-blue-400" style="font-size:clamp(1.2rem,1.8vw,1.6rem)"></i>
            </div>
            <span class="text-blue-400 font-bold tracking-widest uppercase f-text-xs" style="font-family:'Inter',sans-serif; letter-spacing:0.15em; margin-bottom:var(--space-sm);">Expert</span>
            <h3 class="text-white font-bold f-text-base" style="margin-bottom:var(--space-sm); line-height:1.5;">시험&middot;인증 분야<br>최고의 전문 인력 구성</h3>
            <p class="text-slate-400/70 f-text-xs leading-relaxed core-value-desc">국제 전문자격 및 KISA 전문자격 인력으로 최고의 서비스를 제공합니다.</p>
          </div>
          <div class="core-value-overlay"></div>
        </div>

        <!-- One-Stop -->
        <div class="core-value-card group relative" style="border-right:1px solid rgba(255,255,255,0.06);" data-aos="fade-in" data-aos-duration="800" data-aos-delay="150">
          <div class="relative z-10 flex flex-col items-center text-center text-white" style="padding:clamp(2rem,3vw,3rem) clamp(1rem,2vw,2rem);">
            <div class="rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style="width:clamp(52px,4.5vw,68px); height:clamp(52px,4.5vw,68px); background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.10)); margin-bottom:var(--space-md); border: 1px solid rgba(16,185,129,0.20);">
              <i class="fas fa-arrows-spin text-emerald-400" style="font-size:clamp(1.2rem,1.8vw,1.6rem)"></i>
            </div>
            <span class="text-emerald-400 font-bold tracking-widest uppercase f-text-xs" style="font-family:'Inter',sans-serif; letter-spacing:0.15em; margin-bottom:var(--space-sm);">One-Stop</span>
            <h3 class="text-white font-bold f-text-base" style="margin-bottom:var(--space-sm); line-height:1.5;">컨설팅에서 평가까지<br>일괄서비스 제공</h3>
            <p class="text-slate-400/70 f-text-xs leading-relaxed core-value-desc">KOIST만의 원스톱 맞춤형 컨설팅으로 신속한 시험 서비스를 제공합니다.</p>
          </div>
          <div class="core-value-overlay"></div>
        </div>

        <!-- Quality -->
        <div class="core-value-card group relative" style="border-right:1px solid rgba(255,255,255,0.06);" data-aos="fade-in" data-aos-duration="800" data-aos-delay="300">
          <div class="relative z-10 flex flex-col items-center text-center text-white" style="padding:clamp(2rem,3vw,3rem) clamp(1rem,2vw,2rem);">
            <div class="rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style="width:clamp(52px,4.5vw,68px); height:clamp(52px,4.5vw,68px); background: linear-gradient(135deg, rgba(234,179,8,0.15), rgba(251,191,36,0.10)); margin-bottom:var(--space-md); border: 1px solid rgba(234,179,8,0.20);">
              <i class="fas fa-award text-yellow-400" style="font-size:clamp(1.2rem,1.8vw,1.6rem)"></i>
            </div>
            <span class="text-yellow-400 font-bold tracking-widest uppercase f-text-xs" style="font-family:'Inter',sans-serif; letter-spacing:0.15em; margin-bottom:var(--space-sm);">Quality</span>
            <h3 class="text-white font-bold f-text-base" style="margin-bottom:var(--space-sm); line-height:1.5;">시험결과에 대한<br>최상의 품질 보장</h3>
            <p class="text-slate-400/70 f-text-xs leading-relaxed core-value-desc">정보보호제품에 대한 전문성을 바탕으로 고품질 서비스를 제공합니다.</p>
          </div>
          <div class="core-value-overlay"></div>
        </div>

        <!-- Reliability -->
        <div class="core-value-card group relative" data-aos="fade-in" data-aos-duration="800" data-aos-delay="450">
          <div class="relative z-10 flex flex-col items-center text-center text-white" style="padding:clamp(2rem,3vw,3rem) clamp(1rem,2vw,2rem);">
            <div class="rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style="width:clamp(52px,4.5vw,68px); height:clamp(52px,4.5vw,68px); background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(167,139,250,0.10)); margin-bottom:var(--space-md); border: 1px solid rgba(139,92,246,0.20);">
              <i class="fas fa-building-columns text-purple-400" style="font-size:clamp(1.2rem,1.8vw,1.6rem)"></i>
            </div>
            <span class="text-purple-400 font-bold tracking-widest uppercase f-text-xs" style="font-family:'Inter',sans-serif; letter-spacing:0.15em; margin-bottom:var(--space-sm);">Reliability</span>
            <h3 class="text-white font-bold f-text-base" style="margin-bottom:var(--space-sm); line-height:1.5;">시험결과의 신뢰성<br>(공인시험기관)</h3>
            <p class="text-slate-400/70 f-text-xs leading-relaxed core-value-desc">KOLAS 공인 시험기관으로서 검증지표 기반의 객관적인 시험 서비스를 제공합니다.</p>
          </div>
          <div class="core-value-overlay"></div>
        </div>
      </div>

      <!-- KOLAS badge -->
      <div class="flex justify-center" style="margin-top:clamp(1.5rem,2.5vw,2.5rem)" data-aos="fade-up" data-aos-delay="500">
        <div class="inline-flex items-center rounded-full" style="gap:8px; padding:8px 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);">
          <i class="fas fa-certificate text-yellow-400" style="font-size:clamp(0.85rem,1.2vw,1.1rem)"></i>
          <span class="text-slate-300 f-text-xs font-medium">KOLAS 국제공인시험기관 인정 (KTL-F-588)</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════════════════
       SERVICES SECTION (Bento Grid)
       ═══════════════════════════════════════════════════════ -->
  <section id="services" class="f-section-y relative overflow-hidden" style="background: #FFFFFF;">
    <div class="absolute inset-0 opacity-[0.015]" style="background-image: radial-gradient(circle at 1px 1px, rgba(15,23,42,0.15) 1px, transparent 0); background-size: 32px 32px;"></div>

    <div class="relative fluid-container">
      <!-- Section Header -->
      <div class="text-center" style="margin-bottom: clamp(1.5rem,3vw,2.5rem)" data-aos="fade-up">
        <div class="inline-flex items-center rounded-full f-text-xs font-semibold" style="gap:6px; padding:5px 14px; margin-bottom:var(--space-sm); background: linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.04)); border: 1px solid rgba(59,130,246,0.10); color: #2563EB;">
          <i class="fas fa-cubes" style="font-size:9px"></i>KOIST 사업분야
        </div>
        <h2 class="font-bold text-primary f-text-2xl" style="margin-bottom:var(--space-xs)">${s.services_title || '핵심 사업분야'}</h2>
        <p class="text-slate-500 f-text-sm max-w-md mx-auto">${s.services_subtitle || 'KOIST의 전문 시험·평가 서비스를 한눈에 확인하세요'}</p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" style="gap:clamp(0.5rem, 1.2vw, 1rem)">
        ${deps.map((dept, i) => `
        <a href="/services/${dept.slug}" class="card-service group block relative" style="--card-accent:${dept.color}; padding:clamp(0.85rem, 1.6vw, 1.3rem);" data-aos="fade-up" data-aos-delay="${i * 60}">
          <div class="rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style="width:clamp(36px,3.2vw,48px); height:clamp(36px,3.2vw,48px); background: linear-gradient(135deg, ${dept.color}0C, ${dept.color}06); margin-bottom:var(--space-sm);">
            <i class="fas ${dept.icon}" style="color:${dept.color}; font-size:var(--text-lg)"></i>
          </div>
          <h3 class="font-bold text-primary group-hover:text-accent transition-colors f-text-sm" style="margin-bottom:4px">${dept.name}</h3>
          <p class="text-slate-500 leading-relaxed line-clamp-2 f-text-xs">${dept.description || ''}</p>
          <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">
            <i class="fas fa-arrow-right text-accent/40" style="font-size:10px"></i>
          </div>
        </a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════════════════
       FEATURED SERVICES (원본 koist.kr #inc03 사업분야 이미지 카드 복원)
       ═══════════════════════════════════════════════════════ -->
  <section class="f-section-y relative overflow-hidden" style="background: linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 100%);">
    <div class="relative fluid-container">
      <div class="text-center" style="margin-bottom: clamp(2rem,3.5vw,3rem)" data-aos="fade-up">
        <div class="inline-flex items-center rounded-full f-text-xs font-semibold" style="gap:6px; padding:5px 14px; margin-bottom:var(--space-sm); background: linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.04)); border: 1px solid rgba(59,130,246,0.10); color: #2563EB;">
          <i class="fas fa-briefcase" style="font-size:9px"></i>주요 사업 소개
        </div>
        <h2 class="font-bold text-primary f-text-2xl" style="margin-bottom:var(--space-xs)">KOIST 핵심 사업분야</h2>
        <p class="text-slate-500 f-text-sm max-w-lg mx-auto">정보보안 시험·인증의 모든 분야를 전문적으로 수행합니다</p>
      </div>

      <!-- 5 Featured Service Cards with Images (원본 koist.kr inc03 복원) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style="gap:clamp(0.75rem, 1.5vw, 1.25rem)">
        <!-- CC평가 -->
        <div class="featured-service-card group rounded-xl overflow-hidden bg-white border border-slate-200/50" style="box-shadow: var(--shadow-sm);" data-aos="fade-up" data-aos-delay="0">
          <div class="relative overflow-hidden" style="height:clamp(120px,10vw,160px)">
            <img src="/static/images/services/cc-evaluation.jpg" alt="CC평가" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
            <div class="absolute inset-0" style="background: linear-gradient(180deg, transparent 30%, rgba(10,15,30,0.70) 100%);"></div>
            <div class="absolute bottom-0 left-0 right-0" style="padding:10px 14px;">
              <h3 class="text-white font-bold f-text-sm">CC평가</h3>
            </div>
          </div>
          <div style="padding:clamp(0.75rem,1.2vw,1rem)">
            <p class="text-slate-600 f-text-xs leading-relaxed">보안기능의 안정성과 신뢰성을 보증하는 국제공통평가기준(CC) 인증 서비스</p>
            <a href="/services/cc-evaluation" class="inline-flex items-center text-accent font-semibold f-text-xs mt-2 group-hover:gap-2 transition-all" style="gap:4px">
              자세히 <i class="fas fa-arrow-right" style="font-size:8px; transition: transform 0.3s ease; transform: translateX(0);"></i>
            </a>
          </div>
        </div>

        <!-- 보안기능 시험 -->
        <div class="featured-service-card group rounded-xl overflow-hidden bg-white border border-slate-200/50" style="box-shadow: var(--shadow-sm);" data-aos="fade-up" data-aos-delay="80">
          <div class="relative overflow-hidden" style="height:clamp(120px,10vw,160px)">
            <img src="/static/images/services/security-test.jpg" alt="보안기능시험" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
            <div class="absolute inset-0" style="background: linear-gradient(180deg, transparent 30%, rgba(10,15,30,0.70) 100%);"></div>
            <div class="absolute bottom-0 left-0 right-0" style="padding:10px 14px;">
              <h3 class="text-white font-bold f-text-sm">보안기능 시험</h3>
            </div>
          </div>
          <div style="padding:clamp(0.75rem,1.2vw,1rem)">
            <p class="text-slate-600 f-text-xs leading-relaxed">공공기관 도입을 위한 객관적인 제품 검증 시험 서비스</p>
            <a href="/services/security-function-test" class="inline-flex items-center text-accent font-semibold f-text-xs mt-2 group-hover:gap-2 transition-all" style="gap:4px">
              자세히 <i class="fas fa-arrow-right" style="font-size:8px"></i>
            </a>
          </div>
        </div>

        <!-- 성능평가 -->
        <div class="featured-service-card group rounded-xl overflow-hidden bg-white border border-slate-200/50" style="box-shadow: var(--shadow-sm);" data-aos="fade-up" data-aos-delay="160">
          <div class="relative overflow-hidden" style="height:clamp(120px,10vw,160px)">
            <img src="/static/images/services/performance.jpg" alt="성능평가" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
            <div class="absolute inset-0" style="background: linear-gradient(180deg, transparent 30%, rgba(10,15,30,0.70) 100%);"></div>
            <div class="absolute bottom-0 left-0 right-0" style="padding:10px 14px;">
              <h3 class="text-white font-bold f-text-sm">성능평가</h3>
            </div>
          </div>
          <div style="padding:clamp(0.75rem,1.2vw,1rem)">
            <p class="text-slate-600 f-text-xs leading-relaxed">기준에 따른 정보보호제품의 성능을 객관적으로 검증하는 평가 서비스</p>
            <a href="/services/performance-evaluation" class="inline-flex items-center text-accent font-semibold f-text-xs mt-2 group-hover:gap-2 transition-all" style="gap:4px">
              자세히 <i class="fas fa-arrow-right" style="font-size:8px"></i>
            </a>
          </div>
        </div>

        <!-- 시험성적서 -->
        <div class="featured-service-card group rounded-xl overflow-hidden bg-white border border-slate-200/50" style="box-shadow: var(--shadow-sm);" data-aos="fade-up" data-aos-delay="240">
          <div class="relative overflow-hidden" style="height:clamp(120px,10vw,160px)">
            <img src="/static/images/services/test-report.jpg" alt="시험성적서" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
            <div class="absolute inset-0" style="background: linear-gradient(180deg, transparent 30%, rgba(10,15,30,0.70) 100%);"></div>
            <div class="absolute bottom-0 left-0 right-0" style="padding:10px 14px;">
              <h3 class="text-white font-bold f-text-sm">시험성적서</h3>
            </div>
          </div>
          <div style="padding:clamp(0.75rem,1.2vw,1rem)">
            <p class="text-slate-600 f-text-xs leading-relaxed">객관적인 신뢰성 확보 및 소프트웨어 품질 검증 시험 서비스</p>
            <a href="/services/test-report" class="inline-flex items-center text-accent font-semibold f-text-xs mt-2 group-hover:gap-2 transition-all" style="gap:4px">
              자세히 <i class="fas fa-arrow-right" style="font-size:8px"></i>
            </a>
          </div>
        </div>

        <!-- 정보보안진단 -->
        <div class="featured-service-card group rounded-xl overflow-hidden bg-white border border-slate-200/50" style="box-shadow: var(--shadow-sm);" data-aos="fade-up" data-aos-delay="320">
          <div class="relative overflow-hidden" style="height:clamp(120px,10vw,160px)">
            <img src="/static/images/services/security-diagnosis.jpg" alt="정보보안진단" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
            <div class="absolute inset-0" style="background: linear-gradient(180deg, transparent 30%, rgba(10,15,30,0.70) 100%);"></div>
            <div class="absolute bottom-0 left-0 right-0" style="padding:10px 14px;">
              <h3 class="text-white font-bold f-text-sm">정보보안진단</h3>
            </div>
          </div>
          <div style="padding:clamp(0.75rem,1.2vw,1rem)">
            <p class="text-slate-600 f-text-xs leading-relaxed">보안진단 시스템을 통한 등급 부여 및 종합 보안 진단 서비스</p>
            <a href="/services/security-diagnosis" class="inline-flex items-center text-accent font-semibold f-text-xs mt-2 group-hover:gap-2 transition-all" style="gap:4px">
              자세히 <i class="fas fa-arrow-right" style="font-size:8px"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section divider -->
  <div class="section-divider"></div>

  <!-- ═══════════════════════════════════════════════════════
       EVALUATION PERIOD COMPARISON (Bar Graph Component)
       ═══════════════════════════════════════════════════════ -->
  <section class="f-section-y relative overflow-hidden" style="background: #FFFFFF;">
    <div class="relative fluid-container">
      <div class="grid grid-cols-1 lg:grid-cols-2 items-center" style="gap:clamp(2rem,4vw,4rem)">

        <!-- Left: Bar Graph -->
        <div data-aos="fade-right" data-aos-duration="800">
          <div class="inline-flex items-center rounded-full f-text-xs font-semibold" style="gap:6px; padding:5px 14px; margin-bottom:var(--space-sm); background: linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.04)); border: 1px solid rgba(59,130,246,0.10); color: #2563EB;">
            <i class="fas fa-chart-bar" style="font-size:9px"></i>평가기간 비교
          </div>
          <h2 class="font-bold text-primary f-text-2xl" style="margin-bottom:var(--space-xs)">KOIST와 함께라면<br>평가기간을 <span class="text-accent">단축</span>할 수 있습니다</h2>
          <p class="text-slate-500 f-text-sm" style="margin-bottom:clamp(1.5rem,2.5vw,2rem)">원스톱 컨설팅 서비스로 준비기간 단축 및 평가 효율성을 극대화합니다.</p>

          <!-- Bar Chart Container -->
          <div class="bar-chart-container" style="display:flex; flex-direction:column; gap:clamp(1.2rem,2vw,1.8rem);">
            <!-- General Process -->
            <div>
              <div class="flex justify-between items-center" style="margin-bottom:8px">
                <span class="text-slate-600 font-semibold f-text-sm">일반 평가 프로세스</span>
                <span class="text-slate-400 font-bold f-text-sm">약 24개월</span>
              </div>
              <div class="relative rounded-xl overflow-hidden" style="height:clamp(36px,3.2vw,48px); background: #F1F5F9;">
                <div class="bar-animate absolute left-0 top-0 h-full rounded-xl flex items-center" style="width:100%; background: linear-gradient(90deg, #F59E0B 0%, #F59E0B 50%, #94A3B8 50%, #94A3B8 100%);">
                  <span class="absolute text-white font-bold f-text-xs" style="left:10px; text-shadow:0 1px 2px rgba(0,0,0,0.2);">준비 12개월</span>
                  <span class="absolute text-white font-bold f-text-xs" style="right:10px; text-shadow:0 1px 2px rgba(0,0,0,0.2);">평가 12개월</span>
                </div>
              </div>
            </div>

            <!-- KOIST Process -->
            <div>
              <div class="flex justify-between items-center" style="margin-bottom:8px">
                <span class="text-accent font-bold f-text-sm"><i class="fas fa-bolt text-yellow-500 mr-1" style="font-size:10px"></i>KOIST 평가 프로세스</span>
                <span class="text-accent font-bold f-text-sm">약 15개월</span>
              </div>
              <div class="relative rounded-xl overflow-hidden" style="height:clamp(36px,3.2vw,48px); background: #F1F5F9;">
                <div class="bar-animate absolute left-0 top-0 h-full rounded-xl flex items-center" style="width:62.5%; background: linear-gradient(90deg, #F59E0B 0%, #F59E0B 40%, #3B82F6 40%, #3B82F6 100%);">
                  <span class="absolute text-white font-bold f-text-xs" style="left:8px; text-shadow:0 1px 2px rgba(0,0,0,0.2);">준비 6개월</span>
                  <span class="absolute text-white font-bold f-text-xs" style="right:8px; text-shadow:0 1px 2px rgba(0,0,0,0.2);">평가 9개월</span>
                </div>
              </div>
            </div>

            <!-- Result highlight -->
            <div class="flex items-center rounded-xl" style="gap:clamp(0.8rem,1.2vw,1.2rem); padding:clamp(0.8rem,1.5vw,1.2rem); background: linear-gradient(135deg, rgba(59,130,246,0.04), rgba(6,182,212,0.03)); border: 1px solid rgba(59,130,246,0.12);">
              <div class="shrink-0 rounded-xl flex items-center justify-center" style="width:clamp(48px,4vw,60px); height:clamp(48px,4vw,60px); background: linear-gradient(135deg, #2563EB, #06B6D4); box-shadow: 0 4px 12px rgba(37,99,235,0.25);">
                <span class="text-white font-black f-text-lg">37%</span>
              </div>
              <div>
                <p class="text-primary font-bold f-text-base">평가기간 약 37.5% 단축</p>
                <p class="text-slate-500 f-text-xs">전문 컨설팅 + 원스톱 서비스 = 빠르고 정확한 인증 완료</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Stats + Mini Dashboard -->
        <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
          <div class="rounded-2xl border border-slate-200/50 overflow-hidden" style="box-shadow: var(--shadow-premium);">
            <!-- Dashboard Header -->
            <div style="padding:clamp(1rem,1.8vw,1.5rem) clamp(1.25rem,2vw,1.75rem); background: linear-gradient(135deg, #0A0F1E, #111D35);">
              <div class="flex items-center" style="gap:10px">
                <div class="rounded-lg flex items-center justify-center" style="width:32px; height:32px; background: rgba(59,130,246,0.15);">
                  <i class="fas fa-chart-pie text-blue-400" style="font-size:13px"></i>
                </div>
                <div>
                  <p class="text-white font-bold f-text-sm">KOIST 평가현황 대시보드</p>
                  <p class="text-slate-400 f-text-xs">총 ${totalEvals}건의 시험&middot;평가 수행</p>
                </div>
              </div>
            </div>

            <!-- Stats Grid -->
            <div style="padding:clamp(1rem,1.8vw,1.5rem) clamp(1.25rem,2vw,1.75rem); background:#fff;">
              <div class="grid grid-cols-2" style="gap:clamp(0.6rem,1vw,0.8rem);">
                ${catCounts.slice(0, 4).map(cc => {
                  const m = catMeta[cc.category] || { icon: 'fa-circle', color: '#64748B' };
                  return `
                <a href="/support/progress?category=${encodeURIComponent(cc.category)}" class="group rounded-xl border border-slate-100 hover:border-slate-200 transition-all hover:shadow-sm" style="padding:clamp(0.7rem,1.2vw,1rem);">
                  <div class="flex items-center" style="gap:6px; margin-bottom:6px">
                    <i class="fas ${m.icon}" style="color:${m.color}; font-size:clamp(0.65rem,0.9vw,0.85rem)"></i>
                    <span class="text-slate-500 f-text-xs truncate">${cc.category}</span>
                  </div>
                  <div class="font-black f-text-xl" style="color:${m.color}">${cc.cnt}<span class="text-slate-400 font-normal f-text-xs ml-0.5">건</span></div>
                </a>`;
                }).join('')}
              </div>

              ${catCounts.length > 4 ? `
              <div class="text-center" style="margin-top:var(--space-sm)">
                <a href="/support/progress" class="inline-flex items-center text-accent font-semibold hover:underline f-text-xs" style="gap:4px">
                  전체 ${catCounts.length}개 사업분야 보기 <i class="fas fa-arrow-right" style="font-size:9px"></i>
                </a>
              </div>` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- ═══════════════════════════════════════════════════════
       NOTICES + PROGRESS SECTION (Premium Panels)
       ═══════════════════════════════════════════════════════ -->
  <section class="f-section-y relative overflow-hidden" style="background: var(--grad-surface);">
    <div class="relative fluid-container">
      <div class="grid grid-cols-1 lg:grid-cols-2" style="gap:clamp(1rem, 2vw, 1.5rem)">

        <!-- Notices Panel -->
        <div data-aos="fade-right" data-aos-duration="700" class="bg-white rounded-xl border border-slate-200/50" style="padding:clamp(1.25rem, 2.2vw, 1.75rem); box-shadow: var(--shadow-sm);">
          <div class="flex justify-between items-center" style="margin-bottom:var(--space-md)">
            <h3 class="font-bold text-primary flex items-center f-text-lg" style="gap:var(--space-sm)">
              <div class="rounded-lg flex items-center justify-center" style="width:clamp(28px,2.5vw,34px); height:clamp(28px,2.5vw,34px); background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(96,165,250,0.05));">
                <i class="fas fa-bullhorn text-accent f-text-sm"></i>
              </div>
              공지사항
            </h3>
            <a href="/support/notice" class="text-accent font-semibold hover:underline f-text-xs inline-flex items-center" style="gap:4px">더보기 <i class="fas fa-chevron-right" style="font-size:9px"></i></a>
          </div>
          <div class="divide-y divide-slate-100/80">
            ${notices.length > 0 ? notices.map(n => `
            <a href="/support/notice/${n.id}" class="flex items-center py-2.5 hover:bg-blue-50/30 -mx-2 px-2 rounded-lg transition-colors group" style="gap:var(--space-sm)">
              ${n.is_pinned ? '<span class="shrink-0 bg-red-500 text-white rounded flex items-center justify-center font-bold" style="width:18px; height:18px; font-size:8px; box-shadow: 0 2px 6px rgba(239,68,68,0.25);">N</span>' : '<span class="shrink-0 w-1.5 h-1.5 rounded-full bg-slate-300/80"></span>'}
              <span class="flex-1 text-slate-700 truncate group-hover:text-accent transition-colors f-text-sm">${n.title}</span>
              <span class="shrink-0 text-slate-400/70 f-text-xs tabular-nums">${n.created_at ? n.created_at.split('T')[0] : ''}</span>
            </a>
            `).join('') : '<p class="text-slate-400 text-center f-text-sm" style="padding:var(--space-xl) 0"><i class="fas fa-inbox text-slate-300 block" style="font-size:1.2rem;margin-bottom:8px"></i>등록된 공지사항이 없습니다.</p>'}
          </div>
        </div>

        <!-- Progress Panel -->
        <div data-aos="fade-left" data-aos-duration="700" class="bg-white rounded-xl border border-slate-200/50" style="padding:clamp(1.25rem, 2.2vw, 1.75rem); box-shadow: var(--shadow-sm);">
          <div class="flex justify-between items-center" style="margin-bottom:var(--space-md)">
            <h3 class="font-bold text-primary flex items-center f-text-lg" style="gap:var(--space-sm)">
              <div class="rounded-lg flex items-center justify-center" style="width:clamp(28px,2.5vw,34px); height:clamp(28px,2.5vw,34px); background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.05));">
                <i class="fas fa-chart-bar text-emerald-500 f-text-sm"></i>
              </div>
              최근 평가현황
            </h3>
            <a href="/support/progress" class="text-accent font-semibold hover:underline f-text-xs inline-flex items-center" style="gap:4px">전체보기 <i class="fas fa-chevron-right" style="font-size:9px"></i></a>
          </div>

          <!-- Category Tags -->
          ${catCounts.length > 0 ? `
          <div class="flex flex-wrap" style="gap:4px; margin-bottom:var(--space-md)">
            ${catCounts.slice(0, 6).map(cc => {
              const m = catMeta[cc.category] || { icon: 'fa-circle', color: '#64748B' };
              return `<a href="/support/progress?category=${encodeURIComponent(cc.category)}" class="inline-flex items-center rounded-full hover:shadow-sm transition-all f-text-xs" style="gap:4px; padding:3px 10px; background:${m.color}08; color:${m.color}; border:1px solid ${m.color}15;"><i class="fas ${m.icon}" style="font-size:7px"></i>${cc.category} <strong>${cc.cnt}</strong></a>`;
            }).join('')}
          </div>` : ''}

          <!-- Recent Items Table -->
          <div class="overflow-x-auto -mx-1 px-1">
            <table class="w-full" style="min-width:340px;">
              <thead>
                <tr class="text-left text-slate-500 border-b border-slate-100">
                  <th class="font-semibold f-text-xs" style="padding:0 6px 8px 0">제품명</th>
                  <th class="font-semibold f-text-xs hidden sm:table-cell" style="padding:0 6px 8px; width:80px; text-align:center;">분류</th>
                  <th class="font-semibold f-text-xs" style="padding:0 0 8px 6px; text-align:right; width:80px;">상태</th>
                </tr>
              </thead>
              <tbody>
                ${progress.length > 0 ? progress.map(p => {
                  const m = catMeta[p.category] || { icon: 'fa-circle', color: '#64748B' };
                  return `
                <tr class="border-b border-slate-50/80 hover:bg-slate-50/40 transition-colors">
                  <td class="text-slate-700 font-medium f-text-xs" style="padding:8px 6px 8px 0; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${p.product_name}</td>
                  <td class="hidden sm:table-cell text-center" style="padding:8px 6px">
                    <span class="inline-flex items-center gap-1 rounded-full f-text-xs" style="padding:1px 8px; background:${m.color}10; color:${m.color}; white-space:nowrap;"><i class="fas ${m.icon}" style="font-size:7px"></i>${p.category.length > 5 ? p.category.substring(0,5) + '..' : p.category}</span>
                  </td>
                  <td style="padding:8px 0 8px 6px; text-align:right;">
                    <span class="badge-status ${(p.status === '평가완료' || p.status === '발급완료') ? 'badge-complete' : (p.status === '평가진행' || p.status === '시험진행') ? 'badge-progress' : 'badge-received'}">
                      <span class="badge-dot"></span>${p.status}
                    </span>
                  </td>
                </tr>`;
                }).join('') : '<tr><td colspan="3" class="text-center text-slate-400 f-text-sm" style="padding:var(--space-xl) 0"><i class="fas fa-chart-line text-slate-300 block" style="font-size:1.2rem;margin-bottom:8px"></i>등록된 현황이 없습니다.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════════════════
       CTA SECTION (Immersive Premium)
       ═══════════════════════════════════════════════════════ -->
  <section class="relative overflow-hidden" style="${bgStyle(s.cta_bg_url, 'linear-gradient(135deg, #0A0F1E 0%, #111D35 35%, #0C1629 70%, #0A0F1E 100%)', '0.90')}; padding: clamp(3rem,5vw,5rem) 0;">
    ${!s.cta_bg_url ? `
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute animate-float-slow" style="top:15%; left:15%; width:250px; height:250px; background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%); border-radius:50%; filter:blur(50px);"></div>
      <div class="absolute animate-float-medium" style="bottom:15%; right:15%; width:200px; height:200px; background: radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%); border-radius:50%; filter:blur(50px);"></div>
    </div>
    ` : ''}

    <div class="relative fluid-container text-center" data-aos="fade-up" data-aos-duration="700">
      <div class="inline-flex items-center rounded-full f-text-xs font-semibold" style="gap:6px; padding:5px 14px; margin-bottom:var(--space-sm); background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.15); color: #93C5FD;">
        <i class="fas fa-headset" style="font-size:9px"></i>${s.cta_subtitle || '전문 상담 안내'}
      </div>

      <h2 class="text-white font-bold f-text-2xl" style="margin-bottom:var(--space-sm)">${s.cta_title || '정보보안 시험·인증이 필요하신가요?'}</h2>
      <p class="text-blue-200/60 max-w-xl mx-auto f-text-base" style="margin-bottom:clamp(1.5rem,2.5vw,2.5rem)">${s.cta_description || '전문 상담원이 빠르고 정확하게 안내해 드립니다'}</p>

      <div class="flex flex-wrap justify-center" style="gap:var(--space-sm)">
        <a href="tel:${s.phone || '02-586-1230'}" class="inline-flex items-center bg-white text-primary rounded-lg font-bold transition-all f-text-sm ripple-btn" style="gap:var(--space-xs); padding:var(--space-sm) clamp(1.2rem,2vw,1.8rem); box-shadow: 0 4px 16px rgba(255,255,255,0.12), 0 1px 4px rgba(255,255,255,0.08);">
          <i class="fas fa-phone f-text-xs"></i> ${s.phone || '02-586-1230'}
        </a>
        <a href="/support/inquiry" class="btn-glow f-text-sm ripple-btn" style="padding:var(--space-sm) clamp(1.2rem,2vw,1.8rem);">
          <i class="fas fa-envelope f-text-xs"></i> 온라인 상담
        </a>
      </div>
    </div>
  </section>

  <!-- Mobile Fixed Phone -->
  <a href="tel:${s.phone || '02-586-1230'}" class="sm:hidden fixed bottom-5 right-5 z-50 text-white rounded-full flex items-center justify-center transition-all active:scale-95" style="width:clamp(46px,5.5vw,54px); height:clamp(46px,5.5vw,54px); font-size:var(--text-lg); background: linear-gradient(135deg, #2563EB, #06B6D4); box-shadow: 0 4px 20px rgba(37,99,235,0.35), 0 2px 8px rgba(37,99,235,0.20);">
    <i class="fas fa-phone"></i>
  </a>

  <!-- Bar Chart Animation Script -->
  <script>
  (function(){
    // Animate bar widths on scroll into view
    var observed = false;
    var bars = document.querySelectorAll('.bar-animate');
    if (!bars.length) return;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !observed) {
          observed = true;
          bars.forEach(function(bar) {
            var w = bar.style.width;
            bar.style.width = '0%';
            bar.style.transition = 'width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            setTimeout(function() { bar.style.width = w; }, 200);
          });
        }
      });
    }, { threshold: 0.3 });
    observer.observe(bars[0].closest('.bar-chart-container') || bars[0]);
  })();
  </script>
  `;
}
