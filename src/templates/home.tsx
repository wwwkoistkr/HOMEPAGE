// KOIST - Home Page Template (v15.0 - Ultimate Premium Design / World-Class UI)
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
    // Check if all cards were removed
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
       HERO SECTION (v15 - Ultra Premium with Particle Grid)
       ════════════════════════════════════════════════════════ -->
  <section class="relative overflow-hidden" style="${bgStyle(s.hero_bg_url, 'var(--grad-hero)', heroOpacity)}">
    <!-- Animated background layers -->
    ${!s.hero_bg_url ? `
    <div class="absolute inset-0 pointer-events-none">
      <!-- Gradient Orbs -->
      <div class="absolute animate-float-slow" style="top:8%; left:3%; width:clamp(250px,30vw,500px); height:clamp(250px,30vw,500px); background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%); border-radius:50%; filter:blur(50px);"></div>
      <div class="absolute animate-float-medium" style="top:25%; right:5%; width:clamp(180px,22vw,400px); height:clamp(180px,22vw,400px); background: radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%); border-radius:50%; filter:blur(50px);"></div>
      <div class="absolute animate-float-slow" style="bottom:10%; left:30%; width:clamp(160px,18vw,320px); height:clamp(160px,18vw,320px); background: radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%); border-radius:50%; filter:blur(50px);"></div>
      <!-- Grid Pattern -->
      <div class="absolute inset-0 opacity-[0.025]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
      <!-- Floating Icons -->
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

        <!-- Headline -->
        <h1 class="text-white font-black" style="margin-top:var(--space-md); margin-bottom:var(--space-sm); font-size:clamp(1.55rem, 1.2rem + 1.2vw, 2.35rem); line-height:1.3;">
          ${s.site_slogan || '정보보안을 완성하는 기업 <span class="hero-gradient-text">한국정보보안기술원</span>'}
        </h1>

        <!-- Sub-text -->
        <p class="text-slate-300/80 f-text-sm" style="margin-bottom:clamp(1.25rem,2vw,1.75rem); max-width:550px;">
          ${s.site_sub_slogan || 'IT제품의 시험·인증을 통해 정보보안이 완성됩니다. 최상의 시험·인증 서비스를 약속합니다.'}
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

    <!-- Contact Bar (Full-width, refined) -->
    <div class="relative" style="background: rgba(255,255,255,0.04); border-top: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(12px);">
      <div class="fluid-container">
        <div class="flex flex-wrap items-center justify-between" style="padding:clamp(0.65rem,1vw,0.9rem) 0; gap:clamp(0.5rem,1vw,1rem)">
          <!-- Left: Phone -->
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
          <!-- Right: Contact Details -->
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
       EVALUATION PERIOD SIMULATOR — v19 사전준비 1~100 슬라이더
       ════════════════════════════════════════════════════════════════ -->
  <section class="relative overflow-hidden" style="padding:clamp(2rem,3.5vw,3rem) 0; background: linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%);">
    <div class="relative fluid-container">
      <div class="mx-auto" style="max-width:min(960px, 100%)">
        <div class="rounded-2xl overflow-hidden" style="box-shadow: 0 4px 24px rgba(10,15,30,0.08), 0 1px 4px rgba(10,15,30,0.04); border: 1px solid rgba(226,232,240,0.70);" data-aos="fade-up" data-aos-duration="700">

          <!-- Card Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" style="padding:clamp(1.1rem,1.8vw,1.4rem) clamp(1.25rem,2.2vw,1.75rem); background: linear-gradient(135deg, #0A0F1E, #111D35);">
            <div class="flex items-center" style="gap:12px">
              <div class="rounded-xl flex items-center justify-center" style="width:36px; height:36px; background: linear-gradient(135deg, rgba(59,130,246,0.20), rgba(6,182,212,0.15)); border: 1px solid rgba(59,130,246,0.20);">
                <i class="fas fa-chart-bar text-blue-400" style="font-size:14px"></i>
              </div>
              <div>
                <p class="text-white font-bold f-text-sm">KOIST와 함께라면 평가기간을 <span class="text-cyan-300">대폭 단축</span>합니다</p>
                <p class="text-slate-400 f-text-xs" style="margin-top:2px">사전준비 수준에 따라 평가기간을 시뮬레이션해보세요</p>
              </div>
            </div>
            <div class="hidden sm:flex items-center rounded-full" style="gap:6px; padding:6px 16px; margin-top:0; background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.25);">
              <span class="text-white font-black f-text-base" id="headerReductionPct">37%</span>
              <span class="text-blue-300 f-text-xs font-medium">평균 단축</span>
            </div>
          </div>

          <div style="padding:clamp(1.1rem,1.8vw,1.5rem) clamp(1.25rem,2.2vw,1.75rem); background:#fff;">
            <!-- Tab bar: 전체 | EAL2 | EAL3 | EAL4 -->
            <div class="eal-tabs flex rounded-xl overflow-hidden" style="margin-bottom:clamp(0.8rem,1.2vw,1rem); border:1px solid rgba(226,232,240,0.70); background: rgba(248,250,252,0.80);">
              <button class="eal-tab active flex-1 text-center font-bold f-text-xs transition-all" style="padding:8px 0;" data-eal="overall" onclick="switchEAL('overall')">전체평균</button>
              <button class="eal-tab flex-1 text-center font-bold f-text-xs transition-all" style="padding:8px 0; border-left:1px solid rgba(226,232,240,0.70);" data-eal="EAL2" onclick="switchEAL('EAL2')">EAL2</button>
              <button class="eal-tab flex-1 text-center font-bold f-text-xs transition-all" style="padding:8px 0; border-left:1px solid rgba(226,232,240,0.70);" data-eal="EAL3" onclick="switchEAL('EAL3')">EAL3</button>
              <button class="eal-tab flex-1 text-center font-bold f-text-xs transition-all" style="padding:8px 0; border-left:1px solid rgba(226,232,240,0.70);" data-eal="EAL4" onclick="switchEAL('EAL4')">EAL4</button>
            </div>

            <!-- 사전준비 슬라이더 (1~100) -->
            <div class="rounded-xl" style="padding:clamp(0.7rem,1.1vw,1rem) clamp(0.8rem,1.3vw,1.1rem); margin-bottom:clamp(0.8rem,1.2vw,1rem); background: linear-gradient(135deg, rgba(16,185,129,0.04), rgba(59,130,246,0.03)); border: 1px solid rgba(16,185,129,0.12);">
              <div class="flex flex-col sm:flex-row sm:items-center" style="gap:clamp(0.5rem,0.8vw,0.7rem)">
                <div class="flex items-center shrink-0" style="gap:6px">
                  <i class="fas fa-clipboard-check text-emerald-500" style="font-size:11px"></i>
                  <span class="font-bold f-text-xs text-slate-700">사전준비</span>
                </div>
                <div class="flex-1 flex items-center" style="gap:clamp(0.4rem,0.8vw,0.8rem)">
                  <span class="text-slate-400 f-text-xs shrink-0" style="font-size:10px">1</span>
                  <div class="flex-1 relative" style="height:40px;">
                    <!-- Track background with gradient -->
                    <div class="absolute left-0 right-0" style="top:50%; transform:translateY(-50%); height:8px; border-radius:4px; background: linear-gradient(90deg, #EF4444 0%, #F59E0B 25%, #10B981 60%, #3B82F6 100%); opacity:0.25;"></div>
                    <!-- Active fill -->
                    <div id="prepFill" class="absolute left-0" style="top:50%; transform:translateY(-50%); height:8px; border-radius:4px; width:50%; background: linear-gradient(90deg, #EF4444 0%, #F59E0B 30%, #10B981 70%, #3B82F6 100%); transition: width 0.15s ease;"></div>
                    <input type="range" id="prepSlider" min="1" max="100" step="1" value="50" 
                      class="prep-range" 
                      style="width:100%; position:absolute; top:50%; transform:translateY(-50%); cursor:pointer; -webkit-appearance:none; appearance:none; height:8px; border-radius:4px; background: transparent; outline:none; z-index:2;"
                      oninput="onPrepChange(this.value)">
                  </div>
                  <span class="text-slate-400 f-text-xs shrink-0" style="font-size:10px">100</span>
                  <div id="prepBadge" class="shrink-0 flex items-center rounded-full font-bold transition-all" style="gap:4px; padding:4px 12px; min-width:64px; justify-content:center; background: rgba(16,185,129,0.10); border: 1px solid rgba(16,185,129,0.20); color: #10B981; font-size:clamp(0.68rem,0.85vw,0.78rem);">
                    <span id="prepValueText">50</span><span style="font-size:0.7em; opacity:0.7">%</span>
                  </div>
                </div>
              </div>
              <p id="prepDesc" class="text-slate-400 f-text-xs" style="margin-top:5px; padding-left:24px;">사전준비 수준이 높을수록 KOIST를 통한 평가기간이 더욱 단축됩니다</p>
              <!-- 사전준비 레벨 가이드 -->
              <div class="flex items-center justify-between" style="margin-top:6px; padding:0 24px;">
                <div class="flex items-center" style="gap:3px"><span class="inline-block w-2 h-2 rounded-full" style="background:#EF4444"></span><span class="text-slate-400" style="font-size:9px">미흡</span></div>
                <div class="flex items-center" style="gap:3px"><span class="inline-block w-2 h-2 rounded-full" style="background:#F59E0B"></span><span class="text-slate-400" style="font-size:9px">보통</span></div>
                <div class="flex items-center" style="gap:3px"><span class="inline-block w-2 h-2 rounded-full" style="background:#10B981"></span><span class="text-slate-400" style="font-size:9px">양호</span></div>
                <div class="flex items-center" style="gap:3px"><span class="inline-block w-2 h-2 rounded-full" style="background:#3B82F6"></span><span class="text-slate-400" style="font-size:9px">우수</span></div>
              </div>
            </div>

            <!-- Bar Chart Area -->
            <div id="ealPanel" class="bar-chart-container" style="display:flex; flex-direction:column; gap:clamp(0.7rem,1vw,0.9rem);">
              <!-- CCRA (일반) bar -->
              <div>
                <div class="flex justify-between items-center" style="margin-bottom:5px">
                  <span class="text-slate-500 font-semibold f-text-xs flex items-center" style="gap:4px"><span class="inline-block w-2 h-2 rounded-full bg-slate-400"></span>전통 CCRA 평가 프로세스</span>
                  <span id="ealGeneralTotal" class="text-slate-400 font-bold f-text-xs">약 24개월</span>
                </div>
                <div class="relative rounded-lg overflow-hidden" style="height:clamp(30px,3vw,38px); background: #F1F5F9;">
                  <div id="ealGeneralBar" class="bar-animate eal-bar absolute left-0 top-0 h-full rounded-lg flex items-center" style="width:100%; background: linear-gradient(90deg, #F59E0B 0%, #F59E0B 50%, #94A3B8 50%, #94A3B8 100%);">
                    <span id="ealGeneralPrep" class="absolute text-white font-bold" style="left:8px; font-size:clamp(0.6rem,0.78vw,0.72rem); text-shadow:0 1px 3px rgba(0,0,0,0.3);">준비 12개월</span>
                    <span id="ealGeneralEval" class="absolute text-white font-bold" style="right:8px; font-size:clamp(0.6rem,0.78vw,0.72rem); text-shadow:0 1px 3px rgba(0,0,0,0.3);">평가 12개월</span>
                  </div>
                </div>
              </div>

              <!-- KOIST bar -->
              <div>
                <div class="flex justify-between items-center" style="margin-bottom:5px">
                  <span class="text-accent font-bold f-text-xs flex items-center" style="gap:4px"><span class="inline-block w-2 h-2 rounded-full" style="background: linear-gradient(135deg, #2563EB, #06B6D4);"></span><i class="fas fa-bolt text-yellow-500 mr-0.5" style="font-size:8px"></i>KOIST 평가 프로세스</span>
                  <span id="ealKoistTotal" class="text-accent font-bold f-text-xs">약 15개월</span>
                </div>
                <div class="relative rounded-lg overflow-hidden" style="height:clamp(30px,3vw,38px); background: #F1F5F9;">
                  <div id="ealKoistBar" class="bar-animate eal-bar absolute left-0 top-0 h-full rounded-lg flex items-center" style="width:62.5%; background: linear-gradient(90deg, #F59E0B 0%, #F59E0B 40%, #3B82F6 40%, #3B82F6 100%);">
                    <span id="ealKoistPrep" class="absolute text-white font-bold" style="left:8px; font-size:clamp(0.6rem,0.78vw,0.72rem); text-shadow:0 1px 3px rgba(0,0,0,0.3);">준비 6개월</span>
                    <span id="ealKoistEval" class="absolute text-white font-bold" style="right:8px; font-size:clamp(0.6rem,0.78vw,0.72rem); text-shadow:0 1px 3px rgba(0,0,0,0.3);">평가 9개월</span>
                  </div>
                </div>
              </div>

              <!-- 시뮬레이션 결과 Summary -->
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl" style="gap:clamp(0.5rem,0.8vw,0.8rem); padding:clamp(0.6rem,1vw,0.9rem) clamp(0.8rem,1.2vw,1.1rem); background: linear-gradient(135deg, rgba(59,130,246,0.04), rgba(6,182,212,0.03)); border: 1px solid rgba(59,130,246,0.12);">
                <div class="flex items-center" style="gap:clamp(0.5rem,0.8vw,0.8rem)">
                  <div id="ealReductionBadge" class="shrink-0 rounded-xl flex items-center justify-center" style="width:clamp(40px,3.2vw,50px); height:clamp(40px,3.2vw,50px); background: linear-gradient(135deg, #2563EB, #06B6D4); box-shadow: 0 4px 14px rgba(37,99,235,0.25);">
                    <span class="text-white font-black" style="font-size:clamp(0.82rem,1.15vw,1.05rem);">37%</span>
                  </div>
                  <div>
                    <p id="ealReductionText" class="text-primary font-bold f-text-xs">평가기간 약 37% 단축</p>
                    <p id="ealSavingText" class="text-slate-500" style="font-size:clamp(0.62rem,0.72vw,0.72rem)">약 9개월 절감 &middot; 원스톱 서비스</p>
                  </div>
                </div>
                <div class="flex items-center flex-wrap" style="gap:8px">
                  <span id="simKoistPrepResult" class="f-text-xs font-medium" style="color:#F59E0B"><i class="fas fa-file-pen" style="font-size:8px; margin-right:2px;"></i>준비 <strong>6</strong>개월</span>
                  <span id="simKoistEvalResult" class="f-text-xs font-medium" style="color:#3B82F6"><i class="fas fa-magnifying-glass" style="font-size:8px; margin-right:2px;"></i>평가 <strong>9</strong>개월</span>
                  <span class="text-slate-300">|</span>
                  <span class="f-text-xs font-medium" style="color:#64748B"><strong>${totalEvals}</strong>건 평가실적</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <style>
    .prep-range::-webkit-slider-thumb { -webkit-appearance:none; width:26px; height:26px; border-radius:50%; background: white; border:3px solid #10B981; box-shadow: 0 2px 10px rgba(0,0,0,0.18); cursor:pointer; transition: border-color 0.2s, transform 0.15s; position:relative; z-index:3; }
    .prep-range::-moz-range-thumb { width:26px; height:26px; border-radius:50%; background: white; border:3px solid #10B981; box-shadow: 0 2px 10px rgba(0,0,0,0.18); cursor:pointer; }
    .prep-range::-webkit-slider-thumb:hover { transform: scale(1.15); box-shadow: 0 3px 14px rgba(0,0,0,0.22); }
    .prep-range::-webkit-slider-runnable-track { height:8px; border-radius:4px; background:transparent; }
    .prep-range::-moz-range-track { height:8px; border-radius:4px; background:transparent; }
  </style>

  <!-- ════════════════════════════════════════════════════════
       SERVICES SECTION (v16 - Premium Bento Grid, 3x Enlarged)
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

      <!-- Bento Grid (3x Enlarged Tags) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style="gap:clamp(1rem, 2vw, 1.5rem)">
        ${deps.map((dept, i) => `
        <a href="/services/${dept.slug}" class="card-service-xl group block relative" style="--card-accent:${dept.color}; padding:clamp(2rem, 3.5vw, 3rem);" data-aos="fade-up" data-aos-delay="${Math.min(i * 40, 300)}">
          <div class="rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg mx-auto" style="width:clamp(80px,8vw,110px); height:clamp(80px,8vw,110px); background: linear-gradient(135deg, ${dept.color}15, ${dept.color}08); margin-bottom:clamp(1rem,1.5vw,1.25rem);">
            <i class="fas ${dept.icon}" style="color:${dept.color}; font-size:clamp(2.2rem,3.5vw,3rem)"></i>
          </div>
          <h3 class="font-bold text-primary group-hover:text-accent transition-colors text-center" style="font-size:clamp(1.3rem,2vw,1.65rem); margin-bottom:6px; line-height:1.35;">${dept.name}</h3>
          <p class="text-slate-500 leading-snug text-center line-clamp-2" style="font-size:clamp(0.85rem,1.1vw,1rem);">${dept.description || ''}</p>
          <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
            <i class="fas fa-arrow-right text-accent/50" style="font-size:16px"></i>
          </div>
        </a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════
       FEATURED SERVICES (v16 - Premium Image Cards)
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
       NOTICES + PROGRESS (v16 - Premium Dual Panels)
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
       CTA SECTION (v15 - Immersive Premium)
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
       EAL Simulator Script (v19 - 사전준비 1~100 슬라이더)
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
              bar.style.transition = 'width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              setTimeout(function() { bar.style.width = w; }, 200);
            });
          }
        });
      }, { threshold: 0.3 });
      observer.observe(bars[0].closest('.bar-chart-container') || bars[0]);
    }

    /* ─── EAL Data (admin-configurable) ─── */
    /* For each level: general prep/eval (fixed CCRA), koist min/max prep/eval */
    /* min = best case (사전준비 100), max = worst case (사전준비 1) */
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
    var currentPrep = 50; // 1~100 slider value

    /* Linear interpolation: prepValue 1→max, 100→min */
    function lerp(min, max, t) { return min + (max - min) * t; }

    function simulate(level, prepVal) {
      var d = ealData[level];
      if (!d) return null;
      // t = 0 at prepVal=100 (best), t = 1 at prepVal=1 (worst)
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

    /* Format months: show decimal only if not integer */
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

      // Update tabs
      document.querySelectorAll('.eal-tab').forEach(function(t) { t.classList.toggle('active', t.getAttribute('data-eal') === currentEAL); });

      // General bar (fixed CCRA)
      var gPrepPct = d.maxBar > 0 ? Math.round((d.general.prep / d.maxBar) * 100) : 50;
      var gBar = document.getElementById('ealGeneralBar');
      if (gBar) {
        gBar.style.transition = 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        gBar.style.width = '100%';
        gBar.style.background = 'linear-gradient(90deg, #F59E0B 0%, #F59E0B ' + gPrepPct + '%, #94A3B8 ' + gPrepPct + '%, #94A3B8 100%)';
      }
      var gTotal = document.getElementById('ealGeneralTotal');
      if (gTotal) gTotal.textContent = '약 ' + d.general.total + '개월';
      var gPrep = document.getElementById('ealGeneralPrep');
      if (gPrep) gPrep.textContent = '준비 ' + d.general.prep + '개월';
      var gEval = document.getElementById('ealGeneralEval');
      if (gEval) gEval.textContent = '평가 ' + d.general.eval + '개월';

      // KOIST bar (dynamic)
      var kWidthPct = d.maxBar > 0 ? Math.round((d.koist.total / d.maxBar) * 100) : 50;
      var kPrepPct = d.koist.total > 0 ? Math.round((d.koist.prep / d.koist.total) * 100) : 50;
      var kBar = document.getElementById('ealKoistBar');
      if (kBar) {
        kBar.style.transition = 'width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        kBar.style.width = Math.max(kWidthPct, 15) + '%';
        kBar.style.background = 'linear-gradient(90deg, #F59E0B 0%, #F59E0B ' + kPrepPct + '%, #3B82F6 ' + kPrepPct + '%, #3B82F6 100%)';
      }
      var kTotal = document.getElementById('ealKoistTotal');
      if (kTotal) kTotal.textContent = '약 ' + fmtM(d.koist.total) + '개월';
      var kPrep = document.getElementById('ealKoistPrep');
      if (kPrep) kPrep.textContent = '준비 ' + fmtM(d.koist.prep) + '개월';
      var kEval = document.getElementById('ealKoistEval');
      if (kEval) kEval.textContent = '평가 ' + fmtM(d.koist.eval) + '개월';

      // Reduction badge
      var badge = document.getElementById('ealReductionBadge');
      if (badge) badge.querySelector('span').textContent = d.reduction + '%';
      var hdrPct = document.getElementById('headerReductionPct');
      if (hdrPct) hdrPct.textContent = d.reduction + '%';
      var redText = document.getElementById('ealReductionText');
      if (redText) redText.textContent = '평가기간 약 ' + d.reduction + '% 단축';
      var savText = document.getElementById('ealSavingText');
      if (savText) savText.textContent = '약 ' + fmtM(d.saving) + '개월 절감 \\u00b7 원스톱 서비스';

      // Sim result badges
      var simPrep = document.getElementById('simKoistPrepResult');
      if (simPrep) simPrep.innerHTML = '<i class="fas fa-file-pen" style="font-size:8px; margin-right:2px;"></i>준비 <strong>' + fmtM(d.koist.prep) + '</strong>개월';
      var simEval = document.getElementById('simKoistEvalResult');
      if (simEval) simEval.innerHTML = '<i class="fas fa-magnifying-glass" style="font-size:8px; margin-right:2px;"></i>평가 <strong>' + fmtM(d.koist.eval) + '</strong>개월';
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
      // Thumb color
      var slider = document.getElementById('prepSlider');
      if (slider) {
        slider.style.setProperty('--thumb-color', color);
        // Dynamic thumb color via CSS
        var styleEl = document.getElementById('prepThumbStyle');
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = 'prepThumbStyle';
          document.head.appendChild(styleEl);
        }
        styleEl.textContent = '.prep-range::-webkit-slider-thumb{border-color:' + color + '!important} .prep-range::-moz-range-thumb{border-color:' + color + '!important}';
      }
      // Description update
      var desc = document.getElementById('prepDesc');
      if (desc) {
        if (val <= 15) desc.textContent = '사전준비가 매우 부족합니다 - KOIST의 컨설팅 서비스를 권장합니다';
        else if (val <= 35) desc.textContent = '사전준비가 부족한 상태 - 추가 준비 기간이 필요합니다';
        else if (val <= 65) desc.textContent = '보통 수준의 사전준비 상태에서의 예상 기간입니다';
        else if (val <= 85) desc.textContent = '양호한 사전준비 상태 - 효율적인 진행이 가능합니다';
        else desc.textContent = '충분한 사전준비 완료 - 최단 기간으로 진행 가능합니다';
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
