// KOIST - Home Page Template (v22.0 - 8K Ultra-Sharp + Compact Hero + Enlarged Tags)
import type { SettingsMap, Department, Popup, Notice, ProgressItem, SimCertType } from '../types';

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
  simCertTypes: SimCertType[];
}) {
  const s = opts.settings;
  const deps = opts.departments.filter(d => d.is_active);
  const popups = opts.popups;
  const notices = opts.notices.slice(0, 5);
  const progress = opts.progressItems.slice(0, 5);
  const catCounts = opts.progressCategoryCounts || [];
  const heroOpacity = s.hero_overlay_opacity || '0.85';
  const simCerts = opts.simCertTypes || [];

  // Category metadata for icons/colors
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

  const totalEvals = catCounts.reduce((sum, c) => sum + c.cnt, 0);

  return `
  <!-- ════════════════════════════════════════════════
       POPUP SYSTEM (Mobile-Responsive Modal)
       ════════════════════════════════════════════════ -->
  ${popups.length > 0 ? `
  <div id="popupOverlay" class="fixed inset-0 z-[9998] transition-opacity duration-300" style="background:rgba(0,0,0,0.5); backdrop-filter:blur(4px);" onclick="closeAllPopups()"></div>
  <div id="popupContainer" class="fixed z-[9999] popup-multi-container">
    <!-- Close All Button -->
    <div class="popup-close-all-bar">
      <button onclick="closeAllPopups()" class="inline-flex items-center gap-2 bg-white/95 text-gray-700 font-semibold rounded-full shadow-lg hover:bg-white transition-all" style="padding:8px 20px; font-size:13px;">
        <i class="fas fa-times" style="font-size:12px"></i> 모두 닫기
      </button>
    </div>
    <!-- Popup Cards (side by side on desktop, stacked on mobile) -->
    <div class="popup-grid">
      ${popups.map((p, i) => `
      <div class="popup-card bg-white rounded-2xl overflow-hidden shadow-2xl"
           data-popup-id="${p.id}" id="popup-${p.id}"
           style="border:1px solid rgba(226,232,240,0.5); animation: popupSlideIn ${0.3 + i * 0.1}s ease-out;">
        <div class="flex justify-between items-center border-b border-slate-100" style="padding:12px 16px; background:linear-gradient(135deg, rgba(248,250,252,0.95), rgba(241,245,249,0.95));">
          <span class="font-semibold text-gray-800" style="font-size:14px; line-height:1.3;">${p.title}</span>
          <button onclick="closeSinglePopup(${p.id})" class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors" aria-label="닫기">
            <i class="fas fa-times" style="font-size:14px;"></i>
          </button>
        </div>
        <div class="overflow-y-auto" style="max-height:calc(75vh - 120px); -webkit-overflow-scrolling:touch;">
          ${p.popup_type === 'image' && p.image_url 
            ? `<img src="${p.image_url}" alt="${p.title}" class="w-full h-auto" loading="lazy">` 
            : `<div style="padding:16px; font-size:14px; line-height:1.7; color:#374151;">${p.content || ''}</div>`}
        </div>
        <div class="flex justify-between items-center border-t border-slate-100" style="padding:10px 16px; background:rgba(248,250,252,0.7);">
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" id="noshow-${p.id}" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600">
            <span class="text-gray-500" style="font-size:12px;">오늘 하루 안 보기</span>
          </label>
          <button onclick="closeSinglePopup(${p.id})" class="text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors font-medium" style="padding:6px 14px; font-size:13px;">닫기</button>
        </div>
      </div>
      `).join('')}
    </div>
  </div>
  <style>
    .popup-multi-container {
      top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: min(92vw, 920px);
      max-height: 90vh;
    }
    .popup-close-all-bar {
      text-align: center;
      margin-bottom: 12px;
    }
    .popup-grid {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }
    .popup-card {
      flex: 1;
      min-width: 0;
      max-height: 80vh;
    }
    /* Mobile: stack vertically with scroll */
    @media (max-width: 767px) {
      .popup-multi-container {
        width: min(92vw, 420px);
      }
      .popup-grid {
        flex-direction: column;
        max-height: 75vh;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
      .popup-card {
        flex: none;
        width: 100%;
      }
    }
    @keyframes popupSlideIn { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes popupFadeOut { from { opacity: 1; } to { opacity: 0; transform: scale(0.95); } }
  </style>
  <script>
  (function() {
    var today = new Date().toISOString().slice(0, 10);
    var hiddenIds = JSON.parse(localStorage.getItem('koist_popup_hidden') || '{}');
    var popupIds = [${popups.map(p => p.id).join(',')}];
    var allHidden = popupIds.every(function(id) { return hiddenIds[id] === today; });
    if (allHidden) { var ov = document.getElementById('popupOverlay'); var ct = document.getElementById('popupContainer'); if (ov) ov.remove(); if (ct) ct.remove(); return; }
    popupIds.forEach(function(id) { if (hiddenIds[id] === today) { var el = document.getElementById('popup-' + id); if (el) el.remove(); } });
    setTimeout(function() {
      var ct = document.getElementById('popupContainer');
      if (ct && ct.querySelectorAll('.popup-card').length === 0) {
        var ov = document.getElementById('popupOverlay');
        if (ov) ov.remove(); if (ct) ct.remove();
      }
    }, 0);
  })();
  function closeSinglePopup(id) {
    var today = new Date().toISOString().slice(0, 10);
    var hids = JSON.parse(localStorage.getItem('koist_popup_hidden') || '{}');
    var cb = document.getElementById('noshow-' + id);
    if (cb && cb.checked) hids[id] = today;
    localStorage.setItem('koist_popup_hidden', JSON.stringify(hids));
    var el = document.getElementById('popup-' + id);
    if (el) { el.style.animation = 'popupFadeOut 0.2s ease-in forwards'; setTimeout(function() { el.remove(); checkRemainingPopups(); }, 250); }
  }
  function checkRemainingPopups() {
    var ct = document.getElementById('popupContainer');
    if (!ct || ct.querySelectorAll('.popup-card').length === 0) { closeAllPopups(); }
  }
  function closeAllPopups() {
    var today = new Date().toISOString().slice(0, 10);
    var hids = JSON.parse(localStorage.getItem('koist_popup_hidden') || '{}');
    document.querySelectorAll('[id^="noshow-"]').forEach(function(cb) { if (cb.checked) hids[cb.id.replace('noshow-', '')] = today; });
    localStorage.setItem('koist_popup_hidden', JSON.stringify(hids));
    var ov = document.getElementById('popupOverlay');
    var ct = document.getElementById('popupContainer');
    if (ov) ov.style.opacity = '0';
    if (ct) ct.style.animation = 'popupFadeOut 0.2s ease-in forwards';
    setTimeout(function() { if (ov) ov.remove(); if (ct) ct.remove(); }, 250);
  }
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeAllPopups(); });
  </script>
  ` : ''}

  <!-- ════════════════════════════════════════════════════════
       HERO SECTION (v21 - 8K Ultra-Sharp Premium)
       ════════════════════════════════════════════════════════ -->
  <section class="relative overflow-hidden" style="${bgStyle(s.hero_bg_url, 'var(--grad-hero)', heroOpacity)}">
    <!-- Animated background layers -->
    ${!s.hero_bg_url ? `
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute animate-float-slow" style="top:8%; left:3%; width:clamp(250px,30vw,500px); height:clamp(250px,30vw,500px); background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%); border-radius:50%; filter:blur(50px);"></div>
      <div class="absolute animate-float-medium" style="top:25%; right:5%; width:clamp(180px,22vw,400px); height:clamp(180px,22vw,400px); background: radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%); border-radius:50%; filter:blur(50px);"></div>
      <div class="absolute animate-float-slow" style="bottom:10%; left:30%; width:clamp(160px,18vw,320px); height:clamp(160px,18vw,320px); background: radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%); border-radius:50%; filter:blur(50px);"></div>
      <div class="absolute inset-0 opacity-[0.025]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
      <div class="absolute animate-float-slow opacity-[0.04] text-blue-400" style="top:12%; left:8%; font-size:clamp(1.5rem,2.5vw,2.5rem)"><i class="fas fa-shield-halved"></i></div>
      <div class="absolute animate-float-medium opacity-[0.03] text-cyan-400" style="top:45%; right:12%; font-size:clamp(1.2rem,2vw,2rem)"><i class="fas fa-lock"></i></div>
      <div class="absolute animate-float-slow opacity-[0.03] text-purple-400" style="bottom:20%; left:15%; font-size:clamp(1rem,1.5vw,1.8rem)"><i class="fas fa-fingerprint"></i></div>
    </div>
    ` : ''}

    <!-- Hero Content -->
    <div class="relative fluid-container" style="padding-top:clamp(2.5rem,4vw,4rem); padding-bottom:clamp(2rem,3vw,3rem)">
      <div class="max-w-3xl" data-aos="fade-up" data-aos-duration="700">
        <!-- Badge -->
        <div class="inline-flex items-center rounded-full f-text-xs" style="gap:var(--space-xs); padding:6px 14px; background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.15); backdrop-filter: blur(12px);">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span class="text-blue-300 font-semibold tracking-wide" style="font-family:'Inter','Noto Sans KR',sans-serif;">Korean Information Security Technology</span>
        </div>

        <!-- Headline (v22 Compact 2-line, ~50% smaller) -->
        <h1 class="text-white font-black" style="margin-top:var(--space-sm); margin-bottom:6px; font-size:clamp(0.85rem, 0.7rem + 0.65vw, 1.25rem); line-height:1.4; letter-spacing:-0.01em;">
          ${s.hero_line1 || '정보보안 시험·인증 전문기관'}
        </h1>
        <p class="text-slate-300/90 font-semibold" style="margin-bottom:clamp(0.8rem,1.2vw,1rem); font-size:clamp(0.72rem, 0.6rem + 0.5vw, 1rem); line-height:1.45; max-width:480px;">
          ${s.hero_line2 || 'IT제품 보안성 평가·인증의 원스톱 서비스, <span class="hero-gradient-text">한국정보보안기술원</span>'}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap" style="gap:var(--space-sm)">
          <a href="/support/inquiry" class="btn-glow ripple-btn f-text-xs" style="padding:10px clamp(1.1rem,1.8vw,1.5rem);">
            <i class="fas fa-paper-plane" style="font-size:10px"></i> ${s.hero_btn_primary || '온라인 상담'}
          </a>
          <a href="#services" class="btn-ghost ripple-btn f-text-xs" style="padding:10px clamp(1.1rem,1.8vw,1.5rem);">
            <i class="fas fa-th-large" style="font-size:10px"></i> ${s.hero_btn_secondary || '사업분야 보기'}
          </a>
        </div>
      </div>
    </div>

    <!-- Contact Bar -->
    <div class="relative" style="background: rgba(255,255,255,0.04); border-top: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(12px);">
      <div class="fluid-container">
        <div class="flex flex-wrap items-center justify-between" style="padding:clamp(0.65rem,1vw,0.9rem) 0; gap:clamp(0.5rem,1vw,1rem)">
          <div class="flex items-center flex-wrap" style="gap:clamp(0.8rem,1.5vw,1.5rem)">
            <a href="tel:${s.phone || '02-586-1230'}" class="flex items-center text-white font-black hover:text-blue-300 transition-colors" style="gap:8px; font-size:clamp(1.05rem,1.3vw,1.35rem); letter-spacing:-0.02em;">
              <div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(28px,2.2vw,34px); height:clamp(28px,2.2vw,34px); background: linear-gradient(135deg, rgba(59,130,246,0.25), rgba(6,182,212,0.20));">
                <i class="fas fa-phone text-blue-300" style="font-size:clamp(10px,0.9vw,13px)"></i>
              </div>
              ${s.phone_display || s.phone || '02-586-1230'}
            </a>
            <span class="hidden sm:inline-block" style="width:1px; height:18px; background: rgba(255,255,255,0.12);"></span>
            <div class="hidden sm:flex items-center" style="gap:6px">
              <i class="fas fa-bolt text-yellow-400" style="font-size:9px"></i>
              <span class="text-emerald-300/90 font-semibold f-text-xs">${s.hero_quick_badge || 'CC평가 신청 즉시 착수 가능'}</span>
            </div>
          </div>
          <div class="flex items-center flex-wrap text-slate-400 f-text-xs" style="gap:clamp(0.6rem,1.2vw,1.2rem)">
            <a href="mailto:${s.email || 'koist@koist.kr'}" class="flex items-center hover:text-white transition-colors" style="gap:5px">
              <i class="fas fa-envelope text-blue-400/60" style="font-size:10px"></i>
              <span class="hidden md:inline">${s.email || 'koist@koist.kr'}</span>
              <span class="md:hidden">이메일</span>
            </a>
            <span class="flex items-center" style="gap:5px">
              <i class="fas fa-fax text-blue-400/60" style="font-size:10px"></i>
              <span class="hidden md:inline">FAX ${s.fax || '02-586-1238'}</span>
              <span class="md:hidden">팩스</span>
            </span>
            <span class="hidden lg:flex items-center" style="gap:5px">
              <i class="fas fa-location-dot text-blue-400/60" style="font-size:10px"></i>
              ${(s.address || '서울특별시 서초구 효령로 336').split(' ').slice(0, 4).join(' ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════════════
       AI SIMULATOR HERO BANNER — v21 8K ULTRA-SHARP
       Glass-morphism + Animated Particles + sim_cert_types DB
       ════════════════════════════════════════════════════════════════ -->
  <section class="relative overflow-hidden sim-hero-section" style="background: linear-gradient(135deg, #0C1426 0%, #0F1E3D 25%, #162D5A 55%, #1E40AF 85%, #2563EB 100%); padding: 0;">
    <!-- 8K-grade animated background effects -->
    <div class="absolute inset-0 pointer-events-none" style="-webkit-backface-visibility:hidden; transform:translateZ(0); will-change:transform;">
      <!-- Large gradient orbs with animation -->
      <div class="absolute sim-orb-1" style="top:-12%; right:-8%; width:clamp(350px,50vw,800px); height:clamp(350px,50vw,800px); background: radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(37,99,235,0.06) 40%, transparent 65%); border-radius:50%; filter:blur(60px);"></div>
      <div class="absolute sim-orb-2" style="bottom:-15%; left:-10%; width:clamp(280px,40vw,650px); height:clamp(280px,40vw,650px); background: radial-gradient(circle, rgba(6,182,212,0.10) 0%, rgba(34,211,238,0.04) 40%, transparent 65%); border-radius:50%; filter:blur(50px);"></div>
      <div class="absolute sim-orb-3" style="top:40%; left:50%; width:clamp(200px,25vw,400px); height:clamp(200px,25vw,400px); background: radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%); border-radius:50%; filter:blur(40px);"></div>
      <!-- Grid pattern -->
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size:48px 48px;"></div>
      <!-- Floating micro-particles -->
      <div class="absolute animate-float-slow opacity-[0.06]" style="top:15%; left:12%; width:3px; height:3px; background:#60A5FA; border-radius:50%; box-shadow:0 0 8px rgba(96,165,250,0.4);"></div>
      <div class="absolute animate-float-medium opacity-[0.05]" style="top:30%; right:18%; width:2px; height:2px; background:#22D3EE; border-radius:50%; box-shadow:0 0 6px rgba(34,211,238,0.4);"></div>
      <div class="absolute animate-float-slow opacity-[0.04]" style="bottom:25%; left:25%; width:2px; height:2px; background:#A78BFA; border-radius:50%; box-shadow:0 0 6px rgba(167,139,250,0.3);"></div>
      <div class="absolute animate-float-medium opacity-[0.05]" style="top:60%; right:30%; width:3px; height:3px; background:#60A5FA; border-radius:50%; box-shadow:0 0 8px rgba(96,165,250,0.3);"></div>
    </div>

    <div class="relative fluid-container" style="padding: clamp(2.5rem,4vw,4rem) 0 clamp(2rem,3vw,3rem);">
      <div class="grid grid-cols-1 lg:grid-cols-2 items-center" style="gap:clamp(2rem,4vw,4rem);">

        <!-- LEFT: AI Hero Text -->
        <div data-aos="fade-right" data-aos-duration="700">
          <div class="inline-flex items-center rounded-full" style="gap:8px; padding:6px 16px; margin-bottom:clamp(0.8rem,1.2vw,1.2rem); background: rgba(59,130,246,0.10); border: 1px solid rgba(59,130,246,0.20); backdrop-filter:blur(8px);">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
            </span>
            <span class="text-cyan-300 font-bold tracking-wider" style="font-size:clamp(0.68rem,0.88vw,0.82rem); letter-spacing:0.1em; text-rendering:geometricPrecision;">AI-POWERED SIMULATOR</span>
          </div>
          <h2 class="text-white font-black" style="font-size:clamp(1.6rem,1.3rem + 1.6vw,2.8rem); line-height:1.2; margin-bottom:clamp(0.6rem,1vw,1rem); letter-spacing:-0.025em; -webkit-font-smoothing:antialiased; text-rendering:geometricPrecision;">
            AI 인증 소요시간<br><span style="background: linear-gradient(135deg, #60A5FA 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">시뮬레이터</span>
          </h2>
          <p class="text-slate-300/85" style="font-size:clamp(0.88rem,1.05vw,1.02rem); line-height:1.7; margin-bottom:clamp(1rem,1.5vw,1.5rem); max-width:480px; text-rendering:optimizeLegibility;">
            KOIST의 전문 컨설팅과 함께라면 인증 소요시간을 <strong class="text-white">획기적으로 단축</strong>할 수 있습니다. 사전준비 수준에 따른 실시간 기간 시뮬레이션을 확인해보세요.
          </p>

          <!-- Feature checklist -->
          <div style="display:flex; flex-direction:column; gap:clamp(0.4rem,0.6vw,0.6rem); margin-bottom:clamp(1.2rem,2vw,1.8rem);">
            <div class="flex items-center" style="gap:10px"><div class="shrink-0 rounded-full flex items-center justify-center" style="width:22px; height:22px; background:rgba(34,211,238,0.12); border:1px solid rgba(34,211,238,0.25);"><i class="fas fa-check text-cyan-400" style="font-size:9px"></i></div><span class="text-slate-300" style="font-size:clamp(0.8rem,0.95vw,0.92rem)">전통 CCRA 대비 평균 <strong class="text-white font-bold">35~40%</strong> 기간 단축</span></div>
            <div class="flex items-center" style="gap:10px"><div class="shrink-0 rounded-full flex items-center justify-center" style="width:22px; height:22px; background:rgba(34,211,238,0.12); border:1px solid rgba(34,211,238,0.25);"><i class="fas fa-check text-cyan-400" style="font-size:9px"></i></div><span class="text-slate-300" style="font-size:clamp(0.8rem,0.95vw,0.92rem)">CC·KCMVP·보안기능확인서 등 <strong class="text-white font-bold">${simCerts.length || 6}개 인증</strong> 지원</span></div>
            <div class="flex items-center" style="gap:10px"><div class="shrink-0 rounded-full flex items-center justify-center" style="width:22px; height:22px; background:rgba(34,211,238,0.12); border:1px solid rgba(34,211,238,0.25);"><i class="fas fa-check text-cyan-400" style="font-size:9px"></i></div><span class="text-slate-300" style="font-size:clamp(0.8rem,0.95vw,0.92rem)">사전준비 수준별 <strong class="text-white font-bold">맞춤형 기간 산출</strong></span></div>
          </div>

          <a href="#simCard" class="inline-flex items-center font-bold rounded-xl transition-all hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98]" style="gap:10px; padding:clamp(0.65rem,1vw,0.85rem) clamp(1.4rem,2.2vw,2rem); background:white; color:#1E40AF; font-size:clamp(0.82rem,1vw,0.95rem); box-shadow: 0 4px 24px rgba(255,255,255,0.12), 0 1px 4px rgba(0,0,0,0.06); text-rendering:geometricPrecision;">
            <i class="fas fa-play-circle" style="font-size:clamp(0.75rem,0.9vw,0.88rem)"></i> 시뮬레이터 사용하기
          </a>
        </div>

        <!-- RIGHT: Glassmorphism Preview Card (8K-grade rendering) -->
        <div data-aos="fade-left" data-aos-duration="700" data-aos-delay="150">
          <div class="rounded-2xl overflow-hidden sim-glass-card" style="background: rgba(255,255,255,0.06); backdrop-filter:blur(24px) saturate(180%); -webkit-backdrop-filter:blur(24px) saturate(180%); border:1px solid rgba(255,255,255,0.10); box-shadow: 0 12px 48px rgba(0,0,0,0.30), 0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08); -webkit-font-smoothing:antialiased; text-rendering:geometricPrecision;">
            <!-- Window chrome bar -->
            <div class="flex items-center justify-between" style="padding:clamp(0.75rem,1.1vw,1rem) clamp(1rem,1.4vw,1.3rem); border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(0,0,0,0.08);">
              <div class="flex items-center" style="gap:7px">
                <span class="rounded-full" style="width:10px; height:10px; background:#EF4444; box-shadow: inset 0 -1px 2px rgba(0,0,0,0.2);"></span>
                <span class="rounded-full" style="width:10px; height:10px; background:#F59E0B; box-shadow: inset 0 -1px 2px rgba(0,0,0,0.2);"></span>
                <span class="rounded-full" style="width:10px; height:10px; background:#22C55E; box-shadow: inset 0 -1px 2px rgba(0,0,0,0.2);"></span>
              </div>
              <span class="text-slate-400/70 font-medium" style="font-size:clamp(0.62rem,0.75vw,0.72rem); letter-spacing:0.02em;">KOIST Simulator v3.0</span>
            </div>
            <div style="padding:clamp(1rem,1.5vw,1.4rem);">
              <div class="flex items-center" style="gap:10px; margin-bottom:clamp(0.7rem,1vw,1rem);">
                <div class="rounded-lg flex items-center justify-center" style="width:32px; height:32px; background:linear-gradient(135deg, rgba(59,130,246,0.20), rgba(6,182,212,0.15)); border:1px solid rgba(59,130,246,0.25);">
                  <i class="fas fa-robot text-cyan-400" style="font-size:13px"></i>
                </div>
                <span class="text-white font-bold" style="font-size:clamp(0.85rem,1.05vw,1rem);">인증별 예상 소요기간</span>
              </div>
              <!-- Cert type comparison rows from DB -->
              <div style="display:flex; flex-direction:column; gap:clamp(0.45rem,0.65vw,0.6rem);">
                ${simCerts.slice(0, 5).map((cert, i) => {
                  const tradAvg = Math.round((cert.traditional_min_weeks + cert.traditional_max_weeks) / 2);
                  const koistAvg = Math.round((cert.koist_min_weeks + cert.koist_max_weeks) / 2);
                  const pct = tradAvg > 0 ? Math.round((1 - koistAvg / tradAvg) * 100) : 0;
                  return `
                <div class="sim-row rounded-xl flex items-center justify-between" style="padding:clamp(0.5rem,0.7vw,0.65rem) clamp(0.7rem,1vw,0.9rem); background:rgba(255,255,255,0.035); border:1px solid rgba(255,255,255,0.05); transition:all 0.25s ease;">
                  <div class="flex items-center" style="gap:9px">
                    <i class="fas ${cert.icon}" style="color:${cert.color}; font-size:clamp(0.7rem,0.85vw,0.82rem); width:18px; text-align:center; filter:drop-shadow(0 0 3px ${cert.color}40);"></i>
                    <span class="text-slate-200 font-semibold" style="font-size:clamp(0.76rem,0.92vw,0.9rem);">${cert.name}</span>
                  </div>
                  <div class="flex items-center" style="gap:clamp(0.5rem,0.9vw,0.75rem)">
                    <span class="text-slate-400/80 line-through" style="font-size:clamp(0.68rem,0.82vw,0.78rem);">${tradAvg}주</span>
                    <span class="text-cyan-300 font-black" style="font-size:clamp(0.8rem,0.98vw,0.95rem); text-shadow:0 0 12px rgba(34,211,238,0.25);">${koistAvg}주</span>
                    <span class="rounded-full font-bold" style="padding:2px 9px; font-size:clamp(0.58rem,0.68vw,0.66rem); background:rgba(34,211,238,0.10); border:1px solid rgba(34,211,238,0.20); color:#22D3EE; letter-spacing:-0.01em;">-${pct}%</span>
                  </div>
                </div>`;
                }).join('')}
              </div>
              ${simCerts.length > 5 ? `
              <div class="flex items-center justify-center" style="margin-top:clamp(0.5rem,0.7vw,0.6rem); gap:5px;">
                <span class="text-slate-400/70" style="font-size:clamp(0.62rem,0.72vw,0.7rem)">+${simCerts.length - 5}개 인증유형 더보기</span>
                <i class="fas fa-chevron-down text-slate-500/50" style="font-size:8px"></i>
              </div>` : ''}
              <!-- Mini stats bar -->
              <div class="flex items-center justify-between" style="margin-top:clamp(0.6rem,0.9vw,0.8rem); padding-top:clamp(0.5rem,0.7vw,0.6rem); border-top:1px solid rgba(255,255,255,0.05);">
                <span class="text-slate-400/60" style="font-size:clamp(0.58rem,0.68vw,0.65rem)"><i class="fas fa-chart-line mr-1" style="font-size:8px"></i>${totalEvals}건 평가실적</span>
                <span class="text-cyan-400/70 font-semibold" style="font-size:clamp(0.58rem,0.68vw,0.65rem)"><i class="fas fa-bolt text-yellow-400/70 mr-0.5" style="font-size:7px"></i>평균 35% 단축</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 8K Simulator Hero Styles -->
  <style>
    .sim-hero-section { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: geometricPrecision; }
    .sim-glass-card { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease; }
    .sim-glass-card:hover { transform: translateY(-4px); box-shadow: 0 16px 56px rgba(0,0,0,0.35), 0 6px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.10); }
    .sim-row:hover { background: rgba(255,255,255,0.07) !important; border-color: rgba(255,255,255,0.10) !important; transform: translateX(2px); }
    @keyframes simOrb1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-15px, 20px) scale(1.05); } }
    @keyframes simOrb2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px, -15px) scale(1.03); } }
    @keyframes simOrb3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-10px, -10px) scale(1.08); } }
    .sim-orb-1 { animation: simOrb1 15s ease-in-out infinite; }
    .sim-orb-2 { animation: simOrb2 18s ease-in-out infinite; }
    .sim-orb-3 { animation: simOrb3 12s ease-in-out infinite; }
  </style>

  <!-- ════════════════════════════════════════════════════════════════
       EVALUATION PERIOD SIMULATOR — v21 8K Ultra-Sharp
       ════════════════════════════════════════════════════════════════ -->
  <section id="simCard" class="relative overflow-hidden sim-card-section" style="padding:clamp(1.5rem,2.5vw,2.5rem) 0 clamp(2rem,3vw,3rem); background: linear-gradient(180deg, #EEF2FF 0%, #F8FAFC 25%, #FFFFFF 100%);">
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 opacity-[0.015]" style="background-image: radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0); background-size: 28px 28px;"></div>
    
    <div class="relative fluid-container">
      <div class="mx-auto" style="max-width:min(1060px, 100%)">
        <div class="rounded-2xl overflow-hidden sim-main-card" style="box-shadow: 0 4px 32px rgba(10,15,30,0.07), 0 2px 8px rgba(10,15,30,0.03), 0 0 0 1px rgba(226,232,240,0.60); -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; text-rendering:geometricPrecision;" data-aos="fade-up" data-aos-duration="600">

          <!-- Card Header — 8K Crisp -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" style="padding:clamp(0.9rem,1.4vw,1.2rem) clamp(1.2rem,2vw,1.8rem); background: linear-gradient(135deg, #0A0F1E 0%, #0F1B33 50%, #111D35 100%);">
            <div class="flex items-center" style="gap:12px">
              <div class="rounded-xl flex items-center justify-center" style="width:36px; height:36px; background: linear-gradient(135deg, rgba(59,130,246,0.18), rgba(6,182,212,0.12)); border: 1px solid rgba(59,130,246,0.18);">
                <i class="fas fa-chart-bar text-blue-400" style="font-size:15px"></i>
              </div>
              <div>
                <p class="text-white font-bold" style="font-size:clamp(0.88rem,1.1vw,1.06rem); line-height:1.3; letter-spacing:-0.01em;">KOIST와 함께라면 평가기간을 <span class="text-cyan-300">대폭 단축</span>합니다</p>
                <p class="text-slate-400/80" style="font-size:clamp(0.66rem,0.8vw,0.76rem); margin-top:2px">사전준비 수준에 따라 실시간으로 기간을 산출합니다</p>
              </div>
            </div>
            <div class="hidden sm:flex items-center rounded-full" style="gap:6px; padding:6px 16px; background: rgba(59,130,246,0.10); border: 1px solid rgba(59,130,246,0.20);">
              <span class="text-white font-black" style="font-size:clamp(0.92rem,1.15vw,1.1rem)" id="headerReductionPct">37%</span>
              <span class="text-blue-300/90 font-medium" style="font-size:clamp(0.64rem,0.78vw,0.74rem)">평균 단축</span>
            </div>
          </div>

          <div style="padding:clamp(1rem,1.5vw,1.4rem) clamp(1.2rem,2vw,1.8rem); background:#fff;">
            <!-- Tab bar -->
            <div class="eal-tabs flex rounded-xl overflow-hidden" style="margin-bottom:clamp(0.7rem,1vw,0.9rem); border:1px solid rgba(226,232,240,0.70); background: rgba(248,250,252,0.80);">
              <button class="eal-tab active flex-1 text-center font-bold transition-all" style="padding:8px 0; font-size:clamp(0.74rem,0.92vw,0.88rem);" data-eal="overall" onclick="switchEAL('overall')">전체평균</button>
              <button class="eal-tab flex-1 text-center font-bold transition-all" style="padding:8px 0; font-size:clamp(0.74rem,0.92vw,0.88rem); border-left:1px solid rgba(226,232,240,0.70);" data-eal="EAL2" onclick="switchEAL('EAL2')">EAL2</button>
              <button class="eal-tab flex-1 text-center font-bold transition-all" style="padding:8px 0; font-size:clamp(0.74rem,0.92vw,0.88rem); border-left:1px solid rgba(226,232,240,0.70);" data-eal="EAL3" onclick="switchEAL('EAL3')">EAL3</button>
              <button class="eal-tab flex-1 text-center font-bold transition-all" style="padding:8px 0; font-size:clamp(0.74rem,0.92vw,0.88rem); border-left:1px solid rgba(226,232,240,0.70);" data-eal="EAL4" onclick="switchEAL('EAL4')">EAL4</button>
            </div>

            <!-- Preparation Slider — 8K Sharp -->
            <div class="rounded-xl" style="padding:clamp(0.6rem,0.9vw,0.8rem) clamp(0.8rem,1.2vw,1rem); margin-bottom:clamp(0.7rem,1vw,0.9rem); background: linear-gradient(135deg, rgba(16,185,129,0.035), rgba(59,130,246,0.025)); border: 1px solid rgba(16,185,129,0.10);">
              <div class="flex items-center" style="gap:clamp(0.5rem,0.8vw,0.7rem)">
                <div class="flex items-center shrink-0" style="gap:6px">
                  <i class="fas fa-clipboard-check text-emerald-500" style="font-size:12px"></i>
                  <span class="font-bold text-slate-700" style="font-size:clamp(0.76rem,0.95vw,0.92rem)">사전준비</span>
                </div>
                <div class="flex-1 flex items-center" style="gap:clamp(0.3rem,0.5vw,0.5rem)">
                  <span class="text-slate-400 shrink-0" style="font-size:11px; font-weight:600;">1</span>
                  <div class="flex-1 relative" style="height:38px;">
                    <div class="absolute left-0 right-0" style="top:50%; transform:translateY(-50%); height:8px; border-radius:4px; background: linear-gradient(90deg, #EF4444 0%, #F59E0B 25%, #10B981 60%, #3B82F6 100%); opacity:0.20;"></div>
                    <div id="prepFill" class="absolute left-0" style="top:50%; transform:translateY(-50%); height:8px; border-radius:4px; width:50%; background: linear-gradient(90deg, #EF4444 0%, #F59E0B 30%, #10B981 70%, #3B82F6 100%); transition: width 0.12s ease; box-shadow:0 2px 6px rgba(0,0,0,0.08);"></div>
                    <input type="range" id="prepSlider" min="1" max="100" step="1" value="50"
                      class="prep-range"
                      style="width:100%; position:absolute; top:50%; transform:translateY(-50%); cursor:pointer; -webkit-appearance:none; appearance:none; height:8px; border-radius:4px; background: transparent; outline:none; z-index:2;"
                      oninput="onPrepChange(this.value)">
                  </div>
                  <span class="text-slate-400 shrink-0" style="font-size:11px; font-weight:600;">100</span>
                  <div id="prepBadge" class="shrink-0 flex items-center rounded-full font-bold transition-all" style="gap:3px; padding:4px 12px; min-width:62px; justify-content:center; background: rgba(16,185,129,0.10); border: 1px solid rgba(16,185,129,0.20); color: #10B981; font-size:clamp(0.72rem,0.88vw,0.85rem);">
                    <span id="prepValueText">50</span><span style="font-size:0.7em; opacity:0.7">%</span>
                  </div>
                </div>
              </div>
              <!-- Level guide -->
              <div class="flex items-center justify-between" style="margin-top:5px; padding:0 0 0 clamp(74px,8.5vw,95px);">
                <div class="flex items-center" style="gap:3px"><span class="inline-block rounded-full" style="width:6px; height:6px; background:#EF4444;"></span><span class="text-slate-400 font-medium" style="font-size:10px">미흡</span></div>
                <div class="flex items-center" style="gap:3px"><span class="inline-block rounded-full" style="width:6px; height:6px; background:#F59E0B;"></span><span class="text-slate-400 font-medium" style="font-size:10px">보통</span></div>
                <div class="flex items-center" style="gap:3px"><span class="inline-block rounded-full" style="width:6px; height:6px; background:#10B981;"></span><span class="text-slate-400 font-medium" style="font-size:10px">양호</span></div>
                <div class="flex items-center" style="gap:3px"><span class="inline-block rounded-full" style="width:6px; height:6px; background:#3B82F6;"></span><span class="text-slate-400 font-medium" style="font-size:10px">우수</span></div>
              </div>
            </div>

            <!-- Bar Chart — 8K Ultra-Sharp -->
            <div id="ealPanel" class="bar-chart-container" style="display:flex; flex-direction:column; gap:clamp(0.6rem,0.9vw,0.8rem);">
              <!-- CCRA bar -->
              <div>
                <div class="flex justify-between items-center" style="margin-bottom:5px">
                  <span class="text-slate-500 font-semibold flex items-center" style="gap:5px; font-size:clamp(0.76rem,0.95vw,0.92rem)"><span class="inline-block rounded-full" style="width:8px; height:8px; background: linear-gradient(135deg, #94A3B8, #64748B);"></span>전통 CCRA 평가 프로세스</span>
                  <span id="ealGeneralTotal" class="text-slate-400 font-bold" style="font-size:clamp(0.76rem,0.95vw,0.92rem)">약 24개월</span>
                </div>
                <div class="relative rounded-xl overflow-hidden" style="height:clamp(38px,3.8vw,48px); background: linear-gradient(90deg, #F1F5F9, #E2E8F0);">
                  <div id="ealGeneralBar" class="bar-animate eal-bar absolute left-0 top-0 h-full rounded-xl flex items-center" style="width:100%; background: linear-gradient(90deg, #F59E0B 0%, #F59E0B 50%, #94A3B8 50%, #94A3B8 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.06);">
                    <span id="ealGeneralPrep" class="absolute text-white font-bold" style="left:12px; font-size:clamp(0.68rem,0.86vw,0.82rem); text-shadow:0 1px 4px rgba(0,0,0,0.35); letter-spacing:-0.01em;">준비 12개월</span>
                    <span id="ealGeneralEval" class="absolute text-white font-bold" style="right:12px; font-size:clamp(0.68rem,0.86vw,0.82rem); text-shadow:0 1px 4px rgba(0,0,0,0.35); letter-spacing:-0.01em;">평가 12개월</span>
                  </div>
                </div>
              </div>

              <!-- KOIST bar -->
              <div>
                <div class="flex justify-between items-center" style="margin-bottom:5px">
                  <span class="text-accent font-bold flex items-center" style="gap:5px; font-size:clamp(0.76rem,0.95vw,0.92rem)"><span class="inline-block rounded-full" style="width:8px; height:8px; background: linear-gradient(135deg, #2563EB, #06B6D4);"></span><i class="fas fa-bolt text-yellow-500 mr-0.5" style="font-size:9px"></i>KOIST 평가 프로세스</span>
                  <span id="ealKoistTotal" class="text-accent font-bold" style="font-size:clamp(0.76rem,0.95vw,0.92rem)">약 15개월</span>
                </div>
                <div class="relative rounded-xl overflow-hidden" style="height:clamp(38px,3.8vw,48px); background: linear-gradient(90deg, #F1F5F9, #E2E8F0);">
                  <div id="ealKoistBar" class="bar-animate eal-bar absolute left-0 top-0 h-full rounded-xl flex items-center" style="width:62.5%; background: linear-gradient(90deg, #F59E0B 0%, #F59E0B 40%, #3B82F6 40%, #3B82F6 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.06);">
                    <span id="ealKoistPrep" class="absolute text-white font-bold" style="left:12px; font-size:clamp(0.68rem,0.86vw,0.82rem); text-shadow:0 1px 4px rgba(0,0,0,0.35); letter-spacing:-0.01em;">준비 6개월</span>
                    <span id="ealKoistEval" class="absolute text-white font-bold" style="right:12px; font-size:clamp(0.68rem,0.86vw,0.82rem); text-shadow:0 1px 4px rgba(0,0,0,0.35); letter-spacing:-0.01em;">평가 9개월</span>
                  </div>
                </div>
              </div>

              <!-- Result Summary — 8K Crisp -->
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl" style="gap:clamp(0.5rem,0.7vw,0.7rem); padding:clamp(0.6rem,0.9vw,0.8rem) clamp(0.8rem,1.2vw,1rem); background: linear-gradient(135deg, rgba(59,130,246,0.035), rgba(6,182,212,0.025)); border: 1px solid rgba(59,130,246,0.10);">
                <div class="flex items-center" style="gap:clamp(0.5rem,0.7vw,0.7rem)">
                  <div id="ealReductionBadge" class="shrink-0 rounded-xl flex items-center justify-center" style="width:clamp(42px,3.2vw,50px); height:clamp(42px,3.2vw,50px); background: linear-gradient(135deg, #2563EB, #06B6D4); box-shadow: 0 4px 16px rgba(37,99,235,0.25);">
                    <span class="text-white font-black" style="font-size:clamp(0.88rem,1.15vw,1.08rem); text-rendering:geometricPrecision;">37%</span>
                  </div>
                  <div>
                    <p id="ealReductionText" class="text-primary font-bold" style="font-size:clamp(0.8rem,1vw,0.96rem)">평가기간 약 37% 단축</p>
                    <p id="ealSavingText" class="text-slate-500" style="font-size:clamp(0.66rem,0.8vw,0.76rem)">약 9개월 절감 &middot; 원스톱 서비스</p>
                  </div>
                </div>
                <div class="flex items-center flex-wrap" style="gap:10px">
                  <span id="simKoistPrepResult" class="font-medium" style="font-size:clamp(0.72rem,0.88vw,0.85rem); color:#F59E0B"><i class="fas fa-file-pen" style="font-size:9px; margin-right:3px;"></i>준비 <strong>6</strong>개월</span>
                  <span id="simKoistEvalResult" class="font-medium" style="font-size:clamp(0.72rem,0.88vw,0.85rem); color:#3B82F6"><i class="fas fa-magnifying-glass" style="font-size:9px; margin-right:3px;"></i>평가 <strong>9</strong>개월</span>
                  <span class="text-slate-300">|</span>
                  <span class="font-medium" style="font-size:clamp(0.72rem,0.88vw,0.85rem); color:#64748B"><strong>${totalEvals}</strong>건 평가실적</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 8K Simulator Card Styles -->
  <style>
    .sim-card-section, .sim-card-section * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: geometricPrecision; }
    .sim-main-card { transition: box-shadow 0.4s ease; }
    .sim-main-card:hover { box-shadow: 0 8px 40px rgba(10,15,30,0.10), 0 2px 10px rgba(10,15,30,0.04), 0 0 0 1px rgba(226,232,240,0.65); }
    .eal-bar span { text-rendering: geometricPrecision; }
    .prep-range::-webkit-slider-thumb { -webkit-appearance:none; width:26px; height:26px; border-radius:50%; background: white; border:3px solid #10B981; box-shadow: 0 2px 10px rgba(0,0,0,0.18), 0 0 0 3px rgba(16,185,129,0.08); cursor:pointer; transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s; position:relative; z-index:3; }
    .prep-range::-moz-range-thumb { width:26px; height:26px; border-radius:50%; background: white; border:3px solid #10B981; box-shadow: 0 2px 10px rgba(0,0,0,0.18); cursor:pointer; }
    .prep-range::-webkit-slider-thumb:hover { transform: scale(1.15); box-shadow: 0 4px 14px rgba(0,0,0,0.22), 0 0 0 4px rgba(16,185,129,0.12); }
    .prep-range::-webkit-slider-thumb:active { transform: scale(1.05); }
    .prep-range::-webkit-slider-runnable-track { height:8px; border-radius:4px; background:transparent; }
    .prep-range::-moz-range-track { height:8px; border-radius:4px; background:transparent; }
  </style>

  <!-- ════════════════════════════════════════════════════════
       SERVICES SECTION (v21 - Premium Bento Grid, 3x Enlarged)
       ════════════════════════════════════════════════════════ -->
  <section id="services" class="f-section-y relative overflow-hidden" style="background: #FFFFFF;">
    <div class="absolute inset-0 opacity-[0.012]" style="background-image: radial-gradient(circle at 1px 1px, rgba(15,23,42,0.15) 1px, transparent 0); background-size: 32px 32px;"></div>

    <div class="relative fluid-container">
      <div class="text-center" style="margin-bottom: clamp(1.5rem,3vw,2.5rem)" data-aos="fade-up">
        <div class="inline-flex items-center rounded-full f-text-xs font-semibold" style="gap:6px; padding:5px 14px; margin-bottom:var(--space-sm); background: linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.04)); border: 1px solid rgba(59,130,246,0.10); color: #2563EB;">
          <i class="fas fa-cubes" style="font-size:9px"></i>KOIST 사업분야
        </div>
        <h2 class="font-bold text-primary f-text-2xl" style="margin-bottom:var(--space-xs)">${s.services_title || '핵심 사업분야'}</h2>
        <p class="text-slate-500 f-text-sm max-w-md mx-auto">${s.services_subtitle || 'KOIST의 전문 시험·평가 서비스를 한눈에 확인하세요'}</p>
      </div>

      <!-- Bento Grid (v22 - Dynamic font scale & gap from admin settings) -->
      ${(() => {
        const fontScale = parseFloat(s.services_tag_font_scale || '2') || 2;
        const gapScale = parseFloat(s.services_tag_gap_scale || '0.7') || 0.7;
        const baseFontMin = 0.8; // rem base
        const baseFontVw = 1.4;  // vw base
        const baseFontMax = 1.1; // rem base
        const fMin = (baseFontMin * fontScale).toFixed(2);
        const fVw = (baseFontVw * fontScale).toFixed(1);
        const fMax = (baseFontMax * fontScale).toFixed(2);
        const gapMin = (0.7 * gapScale).toFixed(2);
        const gapVw = (1.4 * gapScale).toFixed(1);
        const gapMax = (1.2 * gapScale).toFixed(2);
        const padMin = (0.9 * gapScale).toFixed(2);
        const padVw = (1.5 * gapScale).toFixed(1);
        const padMax = (1.3 * gapScale).toFixed(2);
        const gridCols = parseInt(s.services_grid_cols || '5') || 5;
        return `
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-${gridCols}" style="gap:clamp(${gapMin}rem, ${gapVw}vw, ${gapMax}rem)">
        ${deps.map((dept, i) => `
        <a href="/services/${dept.slug}" class="card-service-xl group block relative" style="--card-accent:${dept.color}; padding:clamp(${padMin}rem, ${padVw}vw, ${padMax}rem);" data-aos="fade-up" data-aos-delay="${Math.min(i * 30, 250)}">
          <div class="rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg mx-auto" style="width:clamp(48px,5vw,64px); height:clamp(48px,5vw,64px); background: linear-gradient(135deg, ${dept.color}15, ${dept.color}08); margin-bottom:clamp(0.5rem,0.8vw,0.7rem);">
            <i class="fas ${dept.icon}" style="color:${dept.color}; font-size:clamp(1.3rem,2vw,1.8rem)"></i>
          </div>
          <h3 class="font-bold text-primary group-hover:text-accent transition-colors text-center" style="font-size:clamp(${fMin}rem,${fVw}vw,${fMax}rem); margin-bottom:4px; line-height:1.25; letter-spacing:-0.02em;">${dept.name}</h3>
          <p class="text-slate-500 leading-snug text-center line-clamp-2" style="font-size:clamp(0.68rem,0.85vw,0.82rem);">${dept.description || ''}</p>
          <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
            <i class="fas fa-arrow-right text-accent/50" style="font-size:12px"></i>
          </div>
        </a>
        `).join('')}
      </div>`;
      })()}
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════
       FEATURED SERVICES (v21 - Premium Image Cards)
       ════════════════════════════════════════════════════════ -->
  <section class="f-section-y relative overflow-hidden" style="background: linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 100%);">
    <div class="relative fluid-container">
      <div class="text-center" style="margin-bottom: clamp(2rem,3.5vw,3rem)" data-aos="fade-up">
        <div class="inline-flex items-center rounded-full f-text-xs font-semibold" style="gap:6px; padding:5px 14px; margin-bottom:var(--space-sm); background: linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.04)); border: 1px solid rgba(59,130,246,0.10); color: #2563EB;">
          <i class="fas fa-briefcase" style="font-size:9px"></i>주요 사업 소개
        </div>
        <h2 class="font-bold text-primary f-text-2xl" style="margin-bottom:var(--space-xs)">KOIST 핵심 사업분야</h2>
        <p class="text-slate-500 f-text-sm max-w-lg mx-auto">정보보안 시험·인증의 모든 분야를 전문적으로 수행합니다</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style="gap:clamp(0.75rem, 1.5vw, 1.25rem)">
        ${[
          { title: 'CC평가', slug: 'cc-evaluation', img: '/static/images/services/cc-evaluation.jpg', desc: '보안기능의 안정성과 신뢰성을 보증하는 국제공통평가기준(CC) 인증 서비스' },
          { title: '보안기능 시험', slug: 'security-function-test', img: '/static/images/services/security-test.jpg', desc: '공공기관 도입을 위한 객관적인 제품 검증 시험 서비스' },
          { title: '성능평가', slug: 'performance-evaluation', img: '/static/images/services/performance.jpg', desc: '기준에 따른 정보보호제품의 성능을 객관적으로 검증하는 평가 서비스' },
          { title: '시험성적서', slug: 'test-report', img: '/static/images/services/test-report.jpg', desc: '객관적인 신뢰성 확보 및 소프트웨어 품질 검증 시험 서비스' },
          { title: '정보보안진단', slug: 'security-diagnosis', img: '/static/images/services/security-diagnosis.jpg', desc: '보안진단 시스템을 통한 등급 부여 및 종합 보안 진단 서비스' },
        ].map((item, i) => `
        <div class="featured-service-card group rounded-xl overflow-hidden bg-white border border-slate-200/50" style="box-shadow: var(--shadow-sm);" data-aos="fade-up" data-aos-delay="${i * 80}">
          <div class="relative overflow-hidden" style="height:clamp(120px,10vw,160px)">
            <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy">
            <div class="absolute inset-0" style="background: linear-gradient(180deg, transparent 30%, rgba(10,15,30,0.75) 100%);"></div>
            <div class="absolute bottom-0 left-0 right-0" style="padding:10px 14px;">
              <h3 class="text-white font-bold f-text-sm">${item.title}</h3>
            </div>
          </div>
          <div style="padding:clamp(0.75rem,1.2vw,1rem)">
            <p class="text-slate-600 f-text-xs leading-relaxed">${item.desc}</p>
            <a href="/services/${item.slug}" class="inline-flex items-center text-accent font-semibold f-text-xs mt-2 group-hover:gap-2 transition-all" style="gap:4px">
              자세히 <i class="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1" style="font-size:8px"></i>
            </a>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- ════════════════════════════════════════════════════════
       NOTICES + PROGRESS (v21 - Premium Dual Panels)
       ════════════════════════════════════════════════════════ -->
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

        <!-- Progress Panel + Dashboard -->
        <div data-aos="fade-left" data-aos-duration="700" class="bg-white rounded-xl border border-slate-200/50" style="padding:clamp(1.25rem, 2.2vw, 1.75rem); box-shadow: var(--shadow-sm);">
          <div class="flex justify-between items-center" style="margin-bottom:var(--space-md)">
            <h3 class="font-bold text-primary flex items-center f-text-lg" style="gap:var(--space-sm)">
              <div class="rounded-lg flex items-center justify-center" style="width:clamp(28px,2.5vw,34px); height:clamp(28px,2.5vw,34px); background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.05));">
                <i class="fas fa-chart-bar text-emerald-500 f-text-sm"></i>
              </div>
              평가현황
            </h3>
            <a href="/support/progress" class="text-accent font-semibold hover:underline f-text-xs inline-flex items-center" style="gap:4px">전체보기 <i class="fas fa-chevron-right" style="font-size:9px"></i></a>
          </div>

          <!-- Dashboard Mini Cards -->
          ${catCounts.length > 0 ? `
          <div class="grid grid-cols-2 sm:grid-cols-4" style="gap:clamp(0.4rem,0.7vw,0.6rem); margin-bottom:var(--space-md)">
            ${catCounts.slice(0, 4).map(cc => {
              const m = catMeta[cc.category] || { icon: 'fa-circle', color: '#64748B' };
              return `
            <a href="/support/progress?category=${encodeURIComponent(cc.category)}" class="group rounded-lg border border-slate-100 hover:border-slate-200 transition-all hover:shadow-sm text-center" style="padding:clamp(0.5rem,0.8vw,0.7rem);">
              <div class="flex items-center justify-center" style="gap:4px; margin-bottom:4px">
                <i class="fas ${m.icon}" style="color:${m.color}; font-size:clamp(0.6rem,0.75vw,0.75rem)"></i>
                <span class="text-slate-500 f-text-xs truncate">${cc.category}</span>
              </div>
              <div class="font-black f-text-lg" style="color:${m.color}; line-height:1.2;">${cc.cnt}<span class="text-slate-400 font-normal f-text-xs ml-0.5">건</span></div>
            </a>`;
            }).join('')}
          </div>
          ${catCounts.length > 4 ? `
          <div class="flex flex-wrap" style="gap:4px; margin-bottom:var(--space-md)">
            ${catCounts.slice(4).map(cc => {
              const m = catMeta[cc.category] || { icon: 'fa-circle', color: '#64748B' };
              return `<a href="/support/progress?category=${encodeURIComponent(cc.category)}" class="inline-flex items-center rounded-full hover:shadow-sm transition-all f-text-xs" style="gap:4px; padding:3px 10px; background:${m.color}08; color:${m.color}; border:1px solid ${m.color}15;"><i class="fas ${m.icon}" style="font-size:7px"></i>${cc.category} <strong>${cc.cnt}</strong></a>`;
            }).join('')}
          </div>` : ''}
          ` : ''}

          <!-- Total Count -->
          <div class="flex items-center justify-between rounded-lg" style="margin-bottom:var(--space-md); padding:6px 12px; background: linear-gradient(135deg, rgba(59,130,246,0.03), rgba(6,182,212,0.02)); border: 1px solid rgba(59,130,246,0.08);">
            <span class="text-slate-500 f-text-xs"><i class="fas fa-chart-pie text-blue-400 mr-1" style="font-size:9px"></i>총 시험·평가 실적</span>
            <span class="text-accent font-black f-text-sm">${totalEvals}건</span>
          </div>

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

  <!-- ════════════════════════════════════════════════════════
       CTA SECTION (v21 - Immersive Premium)
       ════════════════════════════════════════════════════════ -->
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
        <a href="tel:${s.phone || '02-586-1230'}" class="inline-flex items-center bg-white text-primary rounded-lg font-bold transition-all f-text-sm ripple-btn hover:shadow-xl hover:-translate-y-0.5" style="gap:var(--space-xs); padding:var(--space-sm) clamp(1.2rem,2vw,1.8rem); box-shadow: 0 4px 16px rgba(255,255,255,0.12), 0 1px 4px rgba(255,255,255,0.08);">
          <i class="fas fa-phone f-text-xs"></i> ${s.phone || '02-586-1230'}
        </a>
        <a href="/support/inquiry" class="btn-glow f-text-sm ripple-btn" style="padding:var(--space-sm) clamp(1.2rem,2vw,1.8rem);">
          <i class="fas fa-envelope f-text-xs"></i> 온라인 상담
        </a>
      </div>
    </div>
  </section>

  <!-- Mobile Fixed Phone -->
  <a href="tel:${s.phone || '02-586-1230'}" class="sm:hidden fixed bottom-5 right-5 z-50 text-white rounded-full flex items-center justify-center transition-all active:scale-95 hover:scale-105" style="width:clamp(48px,5.5vw,56px); height:clamp(48px,5.5vw,56px); font-size:var(--text-lg); background: linear-gradient(135deg, #2563EB, #06B6D4); box-shadow: 0 4px 20px rgba(37,99,235,0.35), 0 2px 8px rgba(37,99,235,0.20);" aria-label="전화하기">
    <i class="fas fa-phone"></i>
  </a>

  <!-- ════════════════════════════════════════════════════════
       EAL Simulator Script (v21 - 8K Ultra-Sharp)
       ════════════════════════════════════════════════════════ -->
  <script>
  (function(){
    // Animate bar widths on scroll
    var observed = false;
    var bars = document.querySelectorAll('.bar-animate');
    if (bars.length) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !observed) {
            observed = true;
            bars.forEach(function(bar) {
              var w = bar.style.width;
              bar.style.width = '0%';
              bar.style.transition = 'width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              setTimeout(function() { bar.style.width = w; }, 150);
            });
          }
        });
      }, { threshold: 0.3 });
      observer.observe(bars[0].closest('.bar-chart-container') || bars[0]);
    }

    /* EAL Data (admin-configurable) */
    var ealData = {
      overall: {
        general: { prep: ${s.eval_overall_general_prep || '12'}, eval: ${s.eval_overall_general_eval || '12'} },
        koist: {
          prepMin: ${s.eval_overall_koist_prep_high || '4'},  prepMax: ${s.eval_overall_koist_prep_low || '9'},
          evalMin: ${s.eval_overall_koist_eval_high || '7'},  evalMax: ${s.eval_overall_koist_eval_low || '11'}
        }
      },
      EAL2: {
        general: { prep: ${s.eval_eal2_general_prep || '8'}, eval: ${s.eval_eal2_general_eval || '6'} },
        koist: {
          prepMin: ${s.eval_eal2_koist_prep_high || '2'},  prepMax: ${s.eval_eal2_koist_prep_low || '6'},
          evalMin: ${s.eval_eal2_koist_eval_high || '3'},  evalMax: ${s.eval_eal2_koist_eval_low || '5'}
        }
      },
      EAL3: {
        general: { prep: ${s.eval_eal3_general_prep || '10'}, eval: ${s.eval_eal3_general_eval || '8'} },
        koist: {
          prepMin: ${s.eval_eal3_koist_prep_high || '4'},  prepMax: ${s.eval_eal3_koist_prep_low || '8'},
          evalMin: ${s.eval_eal3_koist_eval_high || '4'},  evalMax: ${s.eval_eal3_koist_eval_low || '7'}
        }
      },
      EAL4: {
        general: { prep: ${s.eval_eal4_general_prep || '14'}, eval: ${s.eval_eal4_general_eval || '12'} },
        koist: {
          prepMin: ${s.eval_eal4_koist_prep_high || '5'},  prepMax: ${s.eval_eal4_koist_prep_low || '11'},
          evalMin: ${s.eval_eal4_koist_eval_high || '5'},  evalMax: ${s.eval_eal4_koist_eval_low || '10'}
        }
      }
    };

    var currentEAL = 'overall';
    var currentPrep = 50;

    function lerp(min, max, t) { return min + (max - min) * t; }

    function simulate(level, prepVal) {
      var d = ealData[level];
      if (!d) return null;
      var t = 1 - (prepVal - 1) / 99;
      var kPrep = Math.round(lerp(d.koist.prepMin, d.koist.prepMax, t) * 10) / 10;
      var kEval = Math.round(lerp(d.koist.evalMin, d.koist.evalMax, t) * 10) / 10;
      var g = d.general;
      var gTotal = g.prep + g.eval;
      var kTotal = Math.round((kPrep + kEval) * 10) / 10;
      return {
        general: { prep: g.prep, eval: g.eval, total: gTotal },
        koist: { prep: kPrep, eval: kEval, total: kTotal },
        maxBar: gTotal,
        reduction: gTotal > 0 ? Math.round((1 - kTotal / gTotal) * 100) : 0,
        saving: Math.round((gTotal - kTotal) * 10) / 10
      };
    }

    function fmtM(v) { return v === Math.floor(v) ? v.toString() : v.toFixed(1); }

    function getColor(prepVal) {
      if (prepVal <= 25) return '#EF4444';
      if (prepVal <= 50) return '#F59E0B';
      if (prepVal <= 75) return '#10B981';
      return '#3B82F6';
    }

    function updateChart() {
      var d = simulate(currentEAL, currentPrep);
      if (!d) return;

      document.querySelectorAll('.eal-tab').forEach(function(t) { t.classList.toggle('active', t.getAttribute('data-eal') === currentEAL); });

      var gPrepPct = d.maxBar > 0 ? Math.round((d.general.prep / d.maxBar) * 100) : 50;
      var gBar = document.getElementById('ealGeneralBar');
      if (gBar) {
        gBar.style.transition = 'width 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        gBar.style.width = '100%';
        gBar.style.background = 'linear-gradient(90deg, #F59E0B 0%, #F59E0B ' + gPrepPct + '%, #94A3B8 ' + gPrepPct + '%, #94A3B8 100%)';
      }
      var gTotal = document.getElementById('ealGeneralTotal');
      if (gTotal) gTotal.textContent = '약 ' + d.general.total + '개월';
      var gPrep = document.getElementById('ealGeneralPrep');
      if (gPrep) gPrep.textContent = '준비 ' + d.general.prep + '개월';
      var gEval = document.getElementById('ealGeneralEval');
      if (gEval) gEval.textContent = '평가 ' + d.general.eval + '개월';

      var kWidthPct = d.maxBar > 0 ? Math.round((d.koist.total / d.maxBar) * 100) : 50;
      var kPrepPct = d.koist.total > 0 ? Math.round((d.koist.prep / d.koist.total) * 100) : 50;
      var kBar = document.getElementById('ealKoistBar');
      if (kBar) {
        kBar.style.transition = 'width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        kBar.style.width = Math.max(kWidthPct, 15) + '%';
        kBar.style.background = 'linear-gradient(90deg, #F59E0B 0%, #F59E0B ' + kPrepPct + '%, #3B82F6 ' + kPrepPct + '%, #3B82F6 100%)';
      }
      var kTotal = document.getElementById('ealKoistTotal');
      if (kTotal) kTotal.textContent = '약 ' + fmtM(d.koist.total) + '개월';
      var kPrep = document.getElementById('ealKoistPrep');
      if (kPrep) kPrep.textContent = '준비 ' + fmtM(d.koist.prep) + '개월';
      var kEval = document.getElementById('ealKoistEval');
      if (kEval) kEval.textContent = '평가 ' + fmtM(d.koist.eval) + '개월';

      var badge = document.getElementById('ealReductionBadge');
      if (badge) badge.querySelector('span').textContent = d.reduction + '%';
      var hdrPct = document.getElementById('headerReductionPct');
      if (hdrPct) hdrPct.textContent = d.reduction + '%';
      var redText = document.getElementById('ealReductionText');
      if (redText) redText.textContent = '평가기간 약 ' + d.reduction + '% 단축';
      var savText = document.getElementById('ealSavingText');
      if (savText) savText.textContent = '약 ' + fmtM(d.saving) + '개월 절감 \\u00b7 원스톱 서비스';

      var simPrep = document.getElementById('simKoistPrepResult');
      if (simPrep) simPrep.innerHTML = '<i class="fas fa-file-pen" style="font-size:9px; margin-right:3px;"></i>준비 <strong>' + fmtM(d.koist.prep) + '</strong>개월';
      var simEval = document.getElementById('simKoistEvalResult');
      if (simEval) simEval.innerHTML = '<i class="fas fa-magnifying-glass" style="font-size:9px; margin-right:3px;"></i>평가 <strong>' + fmtM(d.koist.eval) + '</strong>개월';
    }

    function updatePrepUI(val) {
      val = parseInt(val);
      var color = getColor(val);
      var badge = document.getElementById('prepBadge');
      var valText = document.getElementById('prepValueText');
      var fill = document.getElementById('prepFill');
      if (valText) valText.textContent = val;
      if (badge) {
        badge.style.background = color + '18';
        badge.style.borderColor = color + '40';
        badge.style.color = color;
      }
      if (fill) fill.style.width = ((val - 1) / 99 * 100) + '%';
      var slider = document.getElementById('prepSlider');
      if (slider) {
        var styleEl = document.getElementById('prepThumbStyle');
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = 'prepThumbStyle';
          document.head.appendChild(styleEl);
        }
        styleEl.textContent = '.prep-range::-webkit-slider-thumb{border-color:' + color + '!important; box-shadow:0 2px 10px rgba(0,0,0,0.18), 0 0 0 3px ' + color + '14 !important} .prep-range::-moz-range-thumb{border-color:' + color + '!important}';
      }
    }

    window.switchEAL = function(level) {
      currentEAL = level;
      updateChart();
    };

    window.onPrepChange = function(val) {
      currentPrep = parseInt(val);
      updatePrepUI(currentPrep);
      updateChart();
    };

    // Initialize
    updatePrepUI(50);
    updateChart();
  })();
  </script>
  `;
}
