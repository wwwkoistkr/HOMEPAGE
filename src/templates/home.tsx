// KOIST - Home Page Template (v35.2 - Left 70% text + 7cm wider, Equal Height, 8K Ultra-Sharp)
import type { SettingsMap, Department, Popup, Notice, ProgressItem, SimCertType } from '../types';

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
  const defaultReduction = s.unified_reduction_default || '35';

  return `
  <!-- ════════════════════════════════════════════════
       POPUP SYSTEM (Mobile-Responsive Modal)
       ════════════════════════════════════════════════ -->
  ${popups.length > 0 ? `
  <div id="popupOverlay" class="fixed inset-0 z-[9998] transition-opacity duration-300" style="background:rgba(0,0,0,0.15);" onclick="closeAllPopups()"></div>
  <div id="popupContainer" class="fixed z-[9999] popup-multi-container">
    <div class="popup-close-all-bar">
      <button onclick="closeAllPopups()" class="inline-flex items-center gap-3 bg-white/95 text-gray-700 font-semibold rounded-full shadow-lg hover:bg-white transition-all" style="padding:14px 36px; font-size:22px;">
        <i class="fas fa-times" style="font-size:20px"></i> 모두 닫기
      </button>
    </div>
    <div class="popup-grid">
      ${popups.map((p, i) => `
      <div class="popup-card bg-white rounded-2xl overflow-hidden shadow-2xl"
           data-popup-id="${p.id}" id="popup-${p.id}"
           style="border:1px solid rgba(226,232,240,0.5); animation: popupSlideIn ${0.3 + i * 0.1}s ease-out;">
        <div class="flex justify-between items-center border-b border-slate-100" style="padding:20px 28px; background:linear-gradient(135deg, rgba(248,250,252,0.95), rgba(241,245,249,0.95));">
          <span class="font-semibold text-gray-800" style="font-size:24px; line-height:1.3;">${p.title}</span>
          <button onclick="closeSinglePopup(${p.id})" class="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors" aria-label="닫기">
            <i class="fas fa-times" style="font-size:22px;"></i>
          </button>
        </div>
        <div class="overflow-y-auto" style="max-height:calc(80vh - 180px); -webkit-overflow-scrolling:touch;">
          ${p.popup_type === 'image' && p.image_url 
            ? `<img src="${p.image_url}" alt="${p.title}" class="w-full h-auto" loading="lazy">` 
            : `<div style="padding:28px; font-size:24px; line-height:1.7; color:#374151;">${p.content || ''}</div>`}
        </div>
        <div class="flex justify-between items-center border-t border-slate-100" style="padding:16px 28px; background:rgba(248,250,252,0.7);">
          <label class="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" id="noshow-${p.id}" class="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600">
            <span class="text-gray-500" style="font-size:20px;">오늘 하루 안 보기</span>
          </label>
          <button onclick="closeSinglePopup(${p.id})" class="text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors font-medium" style="padding:10px 24px; font-size:22px;">닫기</button>
        </div>
      </div>
      `).join('')}
    </div>
  </div>
  <style>
    .popup-multi-container { top: 50%; left: 50%; transform: translate(-50%, -50%); width: min(96vw, 1840px); max-height: 92vh; }
    .popup-close-all-bar { text-align: center; margin-bottom: 20px; }
    .popup-grid { display: flex; gap: 28px; align-items: flex-start; }
    .popup-card { flex: 1; min-width: 0; max-height: 85vh; }
    @media (max-width: 767px) {
      .popup-multi-container { width: min(96vw, 520px); }
      .popup-grid { flex-direction: column; max-height: 80vh; overflow-y: auto; -webkit-overflow-scrolling: touch; }
      .popup-card { flex: none; width: 100%; }
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
        var ov = document.getElementById('popupOverlay'); if (ov) ov.remove(); if (ct) ct.remove();
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
    var ov = document.getElementById('popupOverlay'); var ct = document.getElementById('popupContainer');
    if (ov) ov.style.opacity = '0';
    if (ct) ct.style.animation = 'popupFadeOut 0.2s ease-in forwards';
    setTimeout(function() { if (ov) ov.remove(); if (ct) ct.remove(); }, 250);
  }
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeAllPopups(); });
  </script>
  ` : ''}

  <!-- ════════════════════════════════════════════════════════════════════════
       UNIFIED HERO + SIMULATOR — v32 8K ULTRA-SHARP
       상단: 히어로 텍스트 (배지 + 대제목 + 부제 + CTA 버튼 + 연락처)
       하단: 인터랙티브 시뮬레이터 패널 (70% 폭, 시험평가~고객지원 정렬)
       ════════════════════════════════════════════════════════════════════════ -->
  <section class="unified-hero-section relative" style="overflow: visible; ${bgStyle(s.hero_bg_url, 'linear-gradient(135deg, #070B14 0%, #0A1128 20%, #0F1E3D 45%, #162D5A 70%, #1A3A6E 100%)', heroOpacity)}">
    <!-- 8K Animated background layers -->
    ${!s.hero_bg_url ? `
    <div class="absolute inset-0 pointer-events-none" style="overflow:hidden; will-change:transform; -webkit-backface-visibility:hidden; transform:translateZ(0);">
      <div class="absolute unified-orb-1" style="top:-8%; right:-5%; width:clamp(300px,42vw,750px); height:clamp(300px,42vw,750px); background: radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(37,99,235,0.04) 40%, transparent 65%); border-radius:50%; filter:blur(60px);"></div>
      <div class="absolute unified-orb-2" style="bottom:-12%; left:-8%; width:clamp(250px,35vw,600px); height:clamp(250px,35vw,600px); background: radial-gradient(circle, rgba(6,182,212,0.07) 0%, rgba(34,211,238,0.03) 40%, transparent 65%); border-radius:50%; filter:blur(50px);"></div>
      <div class="absolute unified-orb-3" style="top:50%; left:40%; width:clamp(150px,20vw,350px); height:clamp(150px,20vw,350px); background: radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 60%); border-radius:50%; filter:blur(40px);"></div>
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size:52px 52px;"></div>
      <div class="absolute animate-float-slow opacity-[0.05]" style="top:15%; left:8%; width:3px; height:3px; background:#60A5FA; border-radius:50%; box-shadow:0 0 10px rgba(96,165,250,0.5);"></div>
      <div class="absolute animate-float-medium opacity-[0.04]" style="top:35%; right:15%; width:2px; height:2px; background:#22D3EE; border-radius:50%; box-shadow:0 0 8px rgba(34,211,238,0.4);"></div>
      <div class="absolute animate-float-slow opacity-[0.035]" style="bottom:20%; left:22%; width:2.5px; height:2.5px; background:#A78BFA; border-radius:50%; box-shadow:0 0 8px rgba(167,139,250,0.35);"></div>
      <div class="absolute animate-float-medium opacity-[0.04]" style="top:65%; right:35%; width:2px; height:2px; background:#34D399; border-radius:50%; box-shadow:0 0 6px rgba(52,211,153,0.3);"></div>
    </div>
    ` : ''}

    <div class="relative fluid-container" style="padding-top:clamp(2.5rem,4.5vw,5rem); padding-bottom:clamp(2.5rem,4.5vw,5rem);">
      <!-- ═══ v32: Top row — Hero text + Contact side by side ═══ -->
      <div class="unified-hero-grid">

        <!-- ═══════ LEFT: Hero Text ═══════ -->
        <div class="unified-hero-left" data-aos="fade-right" data-aos-duration="700">
          <!-- Badge (2.5x enlarged) -->
          <div class="inline-flex items-center rounded-full" style="gap:8px; padding:clamp(6px,0.56vw,8px) clamp(13px,1.26vw,20px); margin-bottom:clamp(0.84rem,1.54vw,1.4rem); background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.18); backdrop-filter: blur(12px);">
            <span class="relative flex" style="height:clamp(7px,0.56vw,10px); width:clamp(7px,0.56vw,10px);">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
              <span class="relative inline-flex rounded-full h-full w-full bg-emerald-400"></span>
            </span>
            <span class="text-blue-300 font-semibold tracking-wide" style="font-size:clamp(0.70rem,0.91vw,1.01rem); font-family:'Inter','Noto Sans KR',sans-serif; letter-spacing:0.04em;">${s.hero_badge_text || 'Korean Information Security Technology'}</span>
          </div>

          <!-- Headline — 2.5x 8K Ultra-Sharp -->
          <h1 class="text-white font-black" style="font-size:clamp(1.54rem, 1.12rem + 2.24vw, 3.36rem); line-height:1.1; margin-bottom:clamp(0.56rem,1.05vw,1.05rem); letter-spacing:-0.03em; -webkit-font-smoothing:antialiased; text-rendering:geometricPrecision;">
            ${s.hero_line1 || '정보보안 시험·인증 전문기관'}
          </h1>

          <!-- Subtitle (2.5x) -->
          <p class="text-slate-300/90 font-medium" style="font-size:clamp(0.80rem, 0.66rem + 0.63vw, 1.22rem); line-height:1.25; margin-bottom:clamp(1.26rem,2.1vw,2.1rem); max-width:none; white-space:nowrap; text-rendering:optimizeLegibility;">
            ${s.hero_line2 || 'IT제품 보안성 평가·인증의 원스톱 서비스, <span class="hero-gradient-text">한국정보보안기술원</span>'}
          </p>

          <!-- CTA Buttons (2.5x) -->
          <div class="flex flex-wrap" style="gap:clamp(0.56rem,0.84vw,0.98rem); margin-bottom:clamp(0.4rem,0.8vw,0.8rem);">
            <a href="/support/inquiry" class="btn-glow ripple-btn inline-flex items-center font-bold rounded-xl transition-all hover:scale-[1.03] active:scale-[0.98]" style="gap:7px; padding:clamp(0.63rem,0.91vw,0.84rem) clamp(1.26rem,1.96vw,1.96rem); font-size:clamp(0.77rem,0.94vw,1.05rem);">
              <i class="fas fa-paper-plane" style="font-size:clamp(0.59rem,0.70vw,0.77rem)"></i> ${s.hero_btn_primary || '온라인 상담'}
            </a>
            <a href="#services" class="btn-ghost ripple-btn inline-flex items-center font-bold rounded-xl transition-all hover:scale-[1.03] active:scale-[0.98]" style="gap:7px; padding:clamp(0.63rem,0.91vw,0.84rem) clamp(1.26rem,1.96vw,1.96rem); font-size:clamp(0.77rem,0.94vw,1.05rem);">
              <i class="fas fa-th-large" style="font-size:clamp(0.59rem,0.70vw,0.77rem)"></i> ${s.hero_btn_secondary || '사업분야 보기'}
            </a>
          </div>

          <!-- ═══════ Hero Contact Card (원본 koist.kr 스타일, 8K fluid) ═══════ -->
          <div class="hero-contact-card" data-aos="fade-up" data-aos-delay="200">
            <p class="text-slate-300/90 font-bold" style="font-size:clamp(0.69rem,1.05vw,1.11rem); margin-bottom:clamp(0.38rem,0.66vw,0.66rem); letter-spacing:0.01em; white-space:nowrap; text-rendering:geometricPrecision;">${s.hero_contact_label || '국가 시험·인증 전문기관 정보보안 기술을 완성'}</p>
            <div class="hero-contact-grid">
              <div class="hero-contact-item">
                <div class="hero-contact-icon"><i class="fas fa-phone"></i></div>
                <span>${s.phone || '02-586-1230'}</span>
              </div>
              <div class="hero-contact-item">
                <div class="hero-contact-icon"><i class="fas fa-fax"></i></div>
                <span>FAX: ${s.fax || '02-586-1238'}</span>
              </div>
              <div class="hero-contact-item">
                <div class="hero-contact-icon"><i class="fas fa-envelope"></i></div>
                <span>${s.email || 'koist@koist.kr'}</span>
              </div>
              <div class="hero-contact-item">
                <div class="hero-contact-icon"><i class="fas fa-location-dot"></i></div>
                <span class="hero-contact-addr">${s.address || '서울특별시 서초구 효령로 336 윤일빌딩 4층 한국정보보안기술원'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══════ RIGHT: Interactive Simulator Panel ═══════ -->
        <div class="unified-hero-right" data-aos="fade-left" data-aos-duration="700" data-aos-delay="150">
          <div class="unified-sim-panel" id="simCard">
            <!-- Panel Header — Dark Navy -->
            <div class="unified-sim-header">
              <div class="flex items-center" style="gap:clamp(8px,0.8vw,12px);">
                <div class="rounded-xl flex items-center justify-center shrink-0" style="width:clamp(30px,2.5vw,38px); height:clamp(30px,2.5vw,38px); background: linear-gradient(135deg, rgba(59,130,246,0.20), rgba(6,182,212,0.15)); border: 1px solid rgba(59,130,246,0.20);">
                  <i class="fas fa-chart-bar text-blue-400" style="font-size:clamp(11px,1vw,15px)"></i>
                </div>
                <div style="min-width:0;">
                  <p class="text-white font-bold truncate" style="font-size:clamp(0.95rem,1.15vw,1.25rem); line-height:1.3; letter-spacing:-0.01em;">${s.unified_panel_title || 'KOIST와 함께라면 평가기간을 <span class="text-cyan-300">대폭 단축</span>합니다'}</p>
                  <p class="text-slate-400/80 truncate" style="font-size:clamp(0.72rem,0.85vw,0.9rem); margin-top:2px;">${s.unified_panel_subtitle || '사전준비 수준에 따라 실시간으로 기간을 산출합니다'}</p>
                </div>
              </div>
              <div class="hidden sm:flex items-center rounded-full shrink-0" style="gap:5px; padding:clamp(4px,0.4vw,6px) clamp(10px,1vw,16px); background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.22);">
                <span class="text-white font-black" style="font-size:clamp(0.85rem,1.05vw,1.05rem)" id="headerReductionPct">${defaultReduction}%</span>
                <span class="text-blue-300/90 font-medium" style="font-size:clamp(0.58rem,0.7vw,0.7rem)">${s.unified_reduction_label || '평균 단축'}</span>
              </div>
            </div>

            <!-- Panel Body — White -->
            <div class="unified-sim-body">
              <!-- Tab Bar -->
              <div class="eal-tabs flex rounded-xl overflow-hidden" style="margin-bottom:clamp(0.6rem,0.9vw,0.8rem); border:1px solid rgba(226,232,240,0.70); background: rgba(248,250,252,0.80);">
                <button class="eal-tab active flex-1 text-center font-bold transition-all" style="padding:clamp(6px,0.6vw,8px) 0; font-size:clamp(0.68rem,0.82vw,0.82rem);" data-eal="overall" onclick="switchEAL('overall')">${s.sim_tab_overall || '\uC804\uCCB4\uD3C9\uADE0'}</button>
                <button class="eal-tab flex-1 text-center font-bold transition-all" style="padding:clamp(6px,0.6vw,8px) 0; font-size:clamp(0.68rem,0.82vw,0.82rem); border-left:1px solid rgba(226,232,240,0.70);" data-eal="EAL2" onclick="switchEAL('EAL2')">${s.sim_tab_eal2 || 'EAL2'}</button>
                <button class="eal-tab flex-1 text-center font-bold transition-all" style="padding:clamp(6px,0.6vw,8px) 0; font-size:clamp(0.68rem,0.82vw,0.82rem); border-left:1px solid rgba(226,232,240,0.70);" data-eal="EAL3" onclick="switchEAL('EAL3')">${s.sim_tab_eal3 || 'EAL3'}</button>
                <button class="eal-tab flex-1 text-center font-bold transition-all" style="padding:clamp(6px,0.6vw,8px) 0; font-size:clamp(0.68rem,0.82vw,0.82rem); border-left:1px solid rgba(226,232,240,0.70);" data-eal="EAL4" onclick="switchEAL('EAL4')">${s.sim_tab_eal4 || 'EAL4'}</button>
              </div>

              <!-- Preparation Slider — 8K Sharp -->
              <div class="rounded-xl" style="padding:clamp(0.5rem,0.7vw,0.7rem) clamp(0.7rem,1vw,0.9rem); margin-bottom:clamp(0.6rem,0.9vw,0.8rem); background: linear-gradient(135deg, rgba(16,185,129,0.035), rgba(59,130,246,0.025)); border: 1px solid rgba(16,185,129,0.10);">
                <div class="flex items-center" style="gap:clamp(0.4rem,0.6vw,0.6rem)">
                  <div class="flex items-center shrink-0" style="gap:5px">
                    <i class="fas fa-clipboard-check text-emerald-500" style="font-size:clamp(10px,0.8vw,12px)"></i>
                    <span class="font-bold text-slate-700" style="font-size:clamp(0.7rem,0.85vw,0.85rem)">${s.sim_label_prep || '사전준비'}</span>
                  </div>
                  <div class="flex-1 flex items-center" style="gap:clamp(0.2rem,0.4vw,0.4rem)">
                    <span class="text-slate-400 shrink-0" style="font-size:clamp(9px,0.65vw,10px); font-weight:600;">1</span>
                    <div class="flex-1 relative" style="height:clamp(30px,2.8vw,38px);">
                      <div class="absolute left-0 right-0" style="top:50%; transform:translateY(-50%); height:clamp(6px,0.55vw,8px); border-radius:4px; background: linear-gradient(90deg, #EF4444 0%, #F59E0B 25%, #10B981 60%, #3B82F6 100%); opacity:0.20;"></div>
                      <div id="prepFill" class="absolute left-0" style="top:50%; transform:translateY(-50%); height:clamp(6px,0.55vw,8px); border-radius:4px; width:50%; background: linear-gradient(90deg, #EF4444 0%, #F59E0B 30%, #10B981 70%, #3B82F6 100%); transition: width 0.12s ease; box-shadow:0 2px 6px rgba(0,0,0,0.08);"></div>
                      <input type="range" id="prepSlider" min="1" max="100" step="1" value="50"
                        class="prep-range"
                        style="width:100%; position:absolute; top:50%; transform:translateY(-50%); cursor:pointer; -webkit-appearance:none; appearance:none; height:clamp(6px,0.55vw,8px); border-radius:4px; background: transparent; outline:none; z-index:2;"
                        oninput="onPrepChange(this.value)">
                    </div>
                    <span class="text-slate-400 shrink-0" style="font-size:clamp(9px,0.65vw,10px); font-weight:600;">100</span>
                    <div id="prepBadge" class="shrink-0 flex items-center rounded-full font-bold transition-all" style="gap:2px; padding:clamp(3px,0.3vw,4px) clamp(8px,0.7vw,12px); min-width:clamp(48px,4vw,60px); justify-content:center; background: rgba(16,185,129,0.10); border: 1px solid rgba(16,185,129,0.20); color: #10B981; font-size:clamp(0.65rem,0.78vw,0.78rem);">
                      <span id="prepValueText">50</span><span style="font-size:0.7em; opacity:0.7">%</span>
                    </div>
                  </div>
                </div>
                <!-- Level guide dots -->
                <div class="flex items-center justify-between" style="margin-top:4px; padding:0 0 0 clamp(65px,7.5vw,88px);">
                  <div class="flex items-center" style="gap:2px"><span class="inline-block rounded-full" style="width:5px; height:5px; background:#EF4444;"></span><span class="text-slate-400 font-medium" style="font-size:clamp(8px,0.6vw,9px)">미흡</span></div>
                  <div class="flex items-center" style="gap:2px"><span class="inline-block rounded-full" style="width:5px; height:5px; background:#F59E0B;"></span><span class="text-slate-400 font-medium" style="font-size:clamp(8px,0.6vw,9px)">보통</span></div>
                  <div class="flex items-center" style="gap:2px"><span class="inline-block rounded-full" style="width:5px; height:5px; background:#10B981;"></span><span class="text-slate-400 font-medium" style="font-size:clamp(8px,0.6vw,9px)">양호</span></div>
                  <div class="flex items-center" style="gap:2px"><span class="inline-block rounded-full" style="width:5px; height:5px; background:#3B82F6;"></span><span class="text-slate-400 font-medium" style="font-size:clamp(8px,0.6vw,9px)">우수</span></div>
                </div>
              </div>

              <!-- Bar Charts — 8K Ultra-Sharp -->
              <div id="ealPanel" class="bar-chart-container" style="display:flex; flex-direction:column; gap:clamp(0.5rem,0.7vw,0.7rem);">
                <!-- CCRA bar -->
                <div>
                  <div class="flex justify-between items-center" style="margin-bottom:4px">
                    <span class="text-slate-500 font-semibold flex items-center" style="gap:4px; font-size:clamp(0.68rem,0.82vw,0.82rem)"><span class="inline-block rounded-full" style="width:7px; height:7px; background: linear-gradient(135deg, #94A3B8, #64748B);"></span>${s.sim_label_traditional || '전통 CCRA 평가 프로세스'}</span>
                    <span id="ealGeneralTotal" class="text-slate-400 font-bold" style="font-size:clamp(0.68rem,0.82vw,0.82rem)">약 24개월</span>
                  </div>
                  <div class="relative rounded-xl overflow-hidden" style="height:clamp(32px,3.2vw,44px); background: linear-gradient(90deg, #F1F5F9, #E2E8F0);">
                    <div id="ealGeneralBar" class="bar-animate eal-bar absolute left-0 top-0 h-full rounded-xl flex items-center" style="width:100%; background: linear-gradient(90deg, #F59E0B 0%, #F59E0B 50%, #94A3B8 50%, #94A3B8 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.06);">
                      <span id="ealGeneralPrep" class="absolute text-white font-bold" style="left:clamp(6px,0.6vw,10px); font-size:clamp(0.6rem,0.75vw,0.76rem); text-shadow:0 1px 4px rgba(0,0,0,0.35); letter-spacing:-0.01em;">준비 12개월</span>
                      <span id="ealGeneralEval" class="absolute text-white font-bold" style="right:clamp(6px,0.6vw,10px); font-size:clamp(0.6rem,0.75vw,0.76rem); text-shadow:0 1px 4px rgba(0,0,0,0.35); letter-spacing:-0.01em;">평가 12개월</span>
                    </div>
                  </div>
                </div>

                <!-- KOIST bar -->
                <div>
                  <div class="flex justify-between items-center" style="margin-bottom:4px">
                    <span class="text-accent font-bold flex items-center" style="gap:4px; font-size:clamp(0.68rem,0.82vw,0.82rem)"><span class="inline-block rounded-full" style="width:7px; height:7px; background: linear-gradient(135deg, #2563EB, #06B6D4);"></span><i class="fas fa-bolt text-yellow-500" style="font-size:clamp(7px,0.55vw,9px); margin-right:2px;"></i>${s.sim_label_koist || 'KOIST 평가 프로세스'}</span>
                    <span id="ealKoistTotal" class="text-accent font-bold" style="font-size:clamp(0.68rem,0.82vw,0.82rem)">약 15개월</span>
                  </div>
                  <div class="relative rounded-xl overflow-hidden" style="height:clamp(32px,3.2vw,44px); background: linear-gradient(90deg, #F1F5F9, #E2E8F0);">
                    <div id="ealKoistBar" class="bar-animate eal-bar absolute left-0 top-0 h-full rounded-xl flex items-center" style="width:62.5%; background: linear-gradient(90deg, #F59E0B 0%, #F59E0B 40%, #3B82F6 40%, #3B82F6 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.06);">
                      <span id="ealKoistPrep" class="absolute text-white font-bold" style="left:clamp(6px,0.6vw,10px); font-size:clamp(0.6rem,0.75vw,0.76rem); text-shadow:0 1px 4px rgba(0,0,0,0.35); letter-spacing:-0.01em;">준비 6개월</span>
                      <span id="ealKoistEval" class="absolute text-white font-bold" style="right:clamp(6px,0.6vw,10px); font-size:clamp(0.6rem,0.75vw,0.76rem); text-shadow:0 1px 4px rgba(0,0,0,0.35); letter-spacing:-0.01em;">평가 9개월</span>
                    </div>
                  </div>
                </div>

                <!-- Result Summary Strip -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl" style="gap:clamp(0.4rem,0.5vw,0.5rem); padding:clamp(0.5rem,0.7vw,0.7rem) clamp(0.6rem,0.9vw,0.9rem); background: linear-gradient(135deg, rgba(59,130,246,0.04), rgba(6,182,212,0.025)); border: 1px solid rgba(59,130,246,0.10);">
                  <div class="flex items-center" style="gap:clamp(0.4rem,0.5vw,0.5rem)">
                    <div id="ealReductionBadge" class="shrink-0 rounded-xl flex items-center justify-center" style="width:clamp(36px,2.8vw,46px); height:clamp(36px,2.8vw,46px); background: linear-gradient(135deg, #2563EB, #06B6D4); box-shadow: 0 4px 16px rgba(37,99,235,0.25);">
                      <span class="text-white font-black" style="font-size:clamp(0.78rem,1vw,1rem); text-rendering:geometricPrecision;">${defaultReduction}%</span>
                    </div>
                    <div>
                      <p id="ealReductionText" class="text-primary font-bold" style="font-size:clamp(0.72rem,0.88vw,0.88rem)">평가기간 약 ${defaultReduction}% 단축</p>
                      <p id="ealSavingText" class="text-slate-500" style="font-size:clamp(0.58rem,0.7vw,0.7rem)">약 9개월 절감 &middot; 원스톱 서비스</p>
                    </div>
                  </div>
                  <div class="flex items-center flex-wrap" style="gap:clamp(6px,0.5vw,8px)">
                    <span id="simKoistPrepResult" class="font-medium" style="font-size:clamp(0.62rem,0.75vw,0.76rem); color:#F59E0B"><i class="fas fa-file-pen" style="font-size:8px; margin-right:2px;"></i>준비 <strong>6</strong>개월</span>
                    <span id="simKoistEvalResult" class="font-medium" style="font-size:clamp(0.62rem,0.75vw,0.76rem); color:#3B82F6"><i class="fas fa-magnifying-glass" style="font-size:8px; margin-right:2px;"></i>평가 <strong>9</strong>개월</span>
                    <span class="text-slate-300">|</span>
                    <span class="font-medium" style="font-size:clamp(0.62rem,0.75vw,0.76rem); color:#64748B"><strong>${totalEvals}</strong>건 평가실적</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ═══════ Unified Hero + Simulator Styles — v32 8K Ultra-Sharp ═══════ -->
  <style>
    .unified-hero-section {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: geometricPrecision;
    }
    /* v35.4: left +15cm (card -7cm narrower), card text 30% smaller */
    .unified-hero-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(1.5rem, 2.5vw, 2.5rem);
      align-items: stretch;
      overflow: visible;
    }
    .unified-hero-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: none;
      width: calc(100% + 15cm);
    }
    .unified-hero-right {
      display: flex;
      flex-direction: column;
      margin-left: 3cm;
      width: calc(100% + 10cm);
      min-width: 0;
    }
    
    /* Simulator panel card — original height (no stretch) */
    .unified-sim-panel {
      border-radius: clamp(12px, 1.2vw, 18px);
      overflow: hidden;
      box-shadow: 0 8px 40px rgba(0,0,0,0.25), 0 2px 12px rgba(0,0,0,0.10), 0 0 0 1px rgba(255,255,255,0.06);
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
      -webkit-font-smoothing: antialiased;
      text-rendering: geometricPrecision;
      display: flex;
      flex-direction: column;
    }
    .unified-sim-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .unified-sim-panel:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 48px rgba(0,0,0,0.30), 0 4px 16px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.08);
    }
    .unified-sim-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: clamp(0.7rem, 1.1vw, 1rem) clamp(0.9rem, 1.4vw, 1.4rem);
      background: linear-gradient(135deg, #0A0F1E 0%, #0F1B33 50%, #111D35 100%);
      gap: 10px;
    }
    .unified-sim-body {
      padding: clamp(0.8rem, 1.2vw, 1.2rem) clamp(0.9rem, 1.4vw, 1.4rem);
      background: #ffffff;
      flex: 1;
    }

    /* EAL Tab active state */
    .eal-tab { color: #94A3B8; cursor: pointer; border: none; background: transparent; }
    .eal-tab.active { color: #fff; background: linear-gradient(135deg, #2563EB, #0891B2); box-shadow: 0 2px 8px rgba(37,99,235,0.25); }
    .eal-tab:hover:not(.active) { color: #475569; background: rgba(0,0,0,0.03); }
    .eal-bar span { text-rendering: geometricPrecision; }

    /* Slider thumb */
    .prep-range::-webkit-slider-thumb { -webkit-appearance:none; width:clamp(20px,1.8vw,26px); height:clamp(20px,1.8vw,26px); border-radius:50%; background: white; border:3px solid #10B981; box-shadow: 0 2px 10px rgba(0,0,0,0.18), 0 0 0 3px rgba(16,185,129,0.08); cursor:pointer; transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s; position:relative; z-index:3; }
    .prep-range::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background: white; border:3px solid #10B981; box-shadow: 0 2px 10px rgba(0,0,0,0.18); cursor:pointer; }
    .prep-range::-webkit-slider-thumb:hover { transform: scale(1.15); box-shadow: 0 4px 14px rgba(0,0,0,0.22), 0 0 0 4px rgba(16,185,129,0.12); }
    .prep-range::-webkit-slider-thumb:active { transform: scale(1.05); }
    .prep-range::-webkit-slider-runnable-track { height:clamp(6px,0.55vw,8px); border-radius:4px; background:transparent; }
    .prep-range::-moz-range-track { height:8px; border-radius:4px; background:transparent; }

    /* Background orb animations */
    @keyframes unifiedOrb1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-15px, 18px) scale(1.04); } }
    @keyframes unifiedOrb2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(18px, -12px) scale(1.03); } }
    @keyframes unifiedOrb3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-10px, -8px) scale(1.06); } }
    .unified-orb-1 { animation: unifiedOrb1 16s ease-in-out infinite; }
    .unified-orb-2 { animation: unifiedOrb2 19s ease-in-out infinite; }
    .unified-orb-3 { animation: unifiedOrb3 13s ease-in-out infinite; }

    /* ═══ Hero Contact Card (v39 — 7cm left reduction, 50% text shrink, compact) ═══ */
    .hero-contact-card {
      padding: clamp(0.53rem,0.92vw,1.04rem) clamp(0.75rem,1.20vw,1.35rem);
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: clamp(5px,0.55vw,10px);
      max-width: none;
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
    }
    @supports not (backdrop-filter: blur(1px)) {
      .hero-contact-card { background: rgba(10,15,30,0.88); }
    }
    .hero-contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(0.26rem,0.41vw,0.45rem) 2cm;
    }
    .hero-contact-item {
      display: flex;
      align-items: center;
      gap: clamp(6px,0.63vw,9px);
      font-size: clamp(0.52rem,0.87vw,0.87rem);
      color: rgba(220,230,245,0.92);
      white-space: nowrap;
      overflow-wrap: break-word;
      line-height: 1.40;
      font-weight: 500;
      letter-spacing: -0.01em;
      -webkit-font-smoothing: antialiased;
      text-rendering: geometricPrecision;
    }
    .hero-contact-addr {
      white-space: nowrap;
      line-height: 1.40;
    }
    .hero-contact-icon {
      width: clamp(21px,2.00vw,30px);
      height: clamp(21px,2.00vw,30px);
      border-radius: clamp(4px,0.42vw,7px);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(59,130,246,0.12);
      color: rgba(96,165,250,0.90);
      font-size: clamp(8px,0.84vw,12px);
      flex-shrink: 0;
    }

    /* ── Responsive: Mobile → 1 column stack, reset shift ── */
    @media (max-width: 1023px) {
      .unified-hero-grid {
        grid-template-columns: 1fr;
        gap: clamp(1.5rem, 3vw, 2rem);
        overflow: hidden;
      }
      .unified-hero-left { max-width: 100%; text-align: center; width: 100%; }
      .unified-hero-right { margin-left: 0; width: 100%; }
      .unified-hero-left .flex.flex-wrap { justify-content: center; }
      .unified-hero-left .inline-flex { margin-left: auto; margin-right: auto; }
      .hero-contact-card { margin-left: auto; margin-right: auto; text-align: left; max-width: 94%; flex: none; }
      .hero-contact-item { font-size: clamp(0.75rem, 2.1vw, 1.10rem); }
      .hero-contact-icon { width: clamp(28px, 4.5vw, 38px); height: clamp(28px, 4.5vw, 38px); font-size: clamp(11px, 2.0vw, 15px); }
      .hero-contact-grid { gap: clamp(0.26rem,0.41vw,0.45rem) 2cm; }
      .hero-contact-addr { white-space: normal; }
    }
    /* Mobile (639px) */
    @media (max-width: 639px) {
      .unified-sim-header { flex-direction: column; align-items: flex-start; gap: 8px; }
      .unified-sim-header .hidden.sm\\:flex { display: flex !important; }
      .hero-contact-grid { grid-template-columns: 1fr; gap: clamp(0.53rem,2.0vw,0.75rem); }
      .hero-contact-item { white-space: normal; font-size: clamp(0.72rem, 3vw, 0.90rem); word-break: keep-all; overflow-wrap: break-word; }
      .hero-contact-icon { width: 30px; height: 30px; font-size: 12px; border-radius: 7px; }
      .hero-contact-card { padding: clamp(0.9rem,3vw,1.2rem) clamp(1.05rem,3.5vw,1.35rem); border-radius: 14px; }
      .hero-contact-card p { font-size: clamp(0.80rem, 3.2vw, 0.98rem) !important; }
    }
    /* Very small mobile (375px) */
    @media (max-width: 375px) {
      .hero-contact-item { font-size: 0.69rem; gap: 6px; }
      .hero-contact-icon { width: 25px; height: 25px; font-size: 10px; }
    }

    /* ── 2.5K (2560px) ── */
    @media (min-width: 2560px) {
      .hero-contact-item { font-size: 1.35rem; gap: 14px; }
      .hero-contact-icon { width: 44px; height: 44px; font-size: 18px; border-radius: 10px; }
      .hero-contact-card { max-width: 900px; padding: 2.0rem 2.4rem; border-radius: 20px; }
      .hero-contact-card p { font-size: 1.43rem !important; }
      .hero-contact-grid { gap: 0.6rem 2.5cm; }
    }

    /* ── 4K (3840px) ── */
    @media (min-width: 3840px) {
      .unified-hero-grid { gap: 4rem; }
      .unified-hero-left { }
      .unified-sim-panel { border-radius: 28px; }
      .unified-sim-header { padding: 1.8rem 2.5rem; }
      .unified-sim-body { padding: 2rem 2.5rem; }
      .hero-contact-card { max-width: 1100px; padding: 2.4rem 3rem; border-radius: 22px; }
      .hero-contact-icon { width: 57px; height: 57px; font-size: 23px; border-radius: 13px; }
      .hero-contact-item { font-size: 1.73rem; gap: 17px; }
      .hero-contact-grid { gap: 1.4rem 3cm; }
      .hero-contact-card p { font-size: 1.8rem !important; }
      /* 4K dept icon scaling */
      .card-service-xl .rounded-lg { width: 200px !important; height: 200px !important; }
    }

    /* ── 8K (7680px) Ultra-Sharp ── */
    @media (min-width: 7680px) {
      .unified-hero-grid { gap: 6rem; }
      .unified-hero-left { }
      .unified-sim-panel { border-radius: 56px; box-shadow: 0 24px 120px rgba(0,0,0,0.3), 0 8px 40px rgba(0,0,0,0.12); }
      .unified-sim-header { padding: 3rem 4rem; }
      .unified-sim-body { padding: 3.5rem 4rem; }
      .eal-tab { padding: 22px 0 !important; font-size: 1.8rem !important; }
      .prep-range::-webkit-slider-thumb { width: 60px !important; height: 60px !important; border-width: 7px !important; }
      .hero-contact-card { max-width: 1800px; padding: 3.8rem 5.0rem; border-radius: 42px; }
      .hero-contact-icon { width: 83px; height: 83px; font-size: 33px; border-radius: 20px; }
      .hero-contact-item { font-size: 2.7rem; gap: 24px; }
      .hero-contact-grid { gap: 2.1rem 4.2cm; }
      .hero-contact-card p { font-size: 2.6rem !important; }
      /* 8K dept icon scaling */
      .card-service-xl .rounded-lg { width: 320px !important; height: 320px !important; }
    }

    /* ── Touch device: disable hover transforms on mobile ── */
    @media (hover: none) and (pointer: coarse) {
      .card-service-xl:hover { transform: none; box-shadow: var(--shadow-xs); }
      .card-premium:hover { transform: none; }
      .featured-service-card:hover { transform: none; }
      .unified-sim-panel:hover { transform: none; }
      .gnb-link:hover::after { width: 0; }
      /* Ensure min 44px touch targets */
      .eal-tab { min-height: 44px; }
      .prep-range { min-height: 44px; }
    }
    /* iOS Safari vh fix */
    @supports (height: 100dvh) {
      .unified-hero-section { min-height: auto; }
    }

    /* ═══ v32: Notice Tab Menu styles ═══ */
    .notice-tab-bar {
      display: flex;
      border-bottom: 2px solid rgba(226,232,240,0.50);
      margin-bottom: clamp(0.6rem, 1vw, 1rem);
      gap: 0;
    }
    .notice-tab {
      padding: clamp(0.5rem,0.8vw,0.75rem) clamp(0.8rem,1.2vw,1.2rem);
      font-size: clamp(1.0rem, 0.85rem + 0.5vw, 1.6rem);
      font-weight: 700;
      color: #94A3B8;
      background: transparent;
      border: none;
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
      cursor: pointer;
      transition: all 0.25s ease;
      white-space: nowrap;
      letter-spacing: -0.01em;
    }
    .notice-tab.active {
      color: #2563EB;
      border-bottom-color: #2563EB;
    }
    .notice-tab:hover:not(.active) {
      color: #475569;
      background: rgba(59,130,246,0.03);
    }
    .notice-tab-content {
      display: none;
    }
    .notice-tab-content.active {
      display: block;
    }
    /* 8K notice tabs */
    @media (min-width: 7680px) {
      .notice-tab { font-size: 2.8rem; padding: 1.5rem 2.5rem; border-bottom-width: 6px; }
      .notice-tab-bar { border-bottom-width: 4px; }
    }
    @media (min-width: 3840px) {
      .notice-tab { font-size: 2.0rem; padding: 1rem 1.8rem; border-bottom-width: 4px; }
      .notice-tab-bar { border-bottom-width: 3px; }
    }

    /* ── Services Section 50% enlarged — 2.5K/4K/8K scaling ── */
    @media (min-width: 2560px) {
      .services-badge-text { font-size: clamp(1.5rem, 1.2rem + 0.4vw, 2.0rem) !important; padding: 10px 28px !important; gap: 12px !important; }
      .services-badge-text i { font-size: clamp(22px, 1.6vw, 30px) !important; }
      .services-title-text { font-size: clamp(3.0rem, 2.4rem + 0.8vw, 4.2rem) !important; }
      .services-subtitle-text { font-size: clamp(1.5rem, 1.2rem + 0.4vw, 2.0rem) !important; max-width: 56rem !important; }
    }
    @media (min-width: 3840px) {
      .services-badge-text { font-size: clamp(2.2rem, 1.8rem + 0.5vw, 3.0rem) !important; padding: 14px 38px !important; gap: 16px !important; border-radius: 9999px; }
      .services-badge-text i { font-size: clamp(28px, 2vw, 42px) !important; }
      .services-title-text { font-size: clamp(4.2rem, 3.4rem + 1.2vw, 6.0rem) !important; }
      .services-subtitle-text { font-size: clamp(2.0rem, 1.6rem + 0.6vw, 2.8rem) !important; max-width: 72rem !important; }
    }
    @media (min-width: 7680px) {
      .services-badge-text { font-size: clamp(3.6rem, 3.0rem + 0.8vw, 5.0rem) !important; padding: 24px 60px !important; gap: 24px !important; }
      .services-badge-text i { font-size: clamp(48px, 3.5vw, 72px) !important; }
      .services-title-text { font-size: clamp(7.0rem, 5.6rem + 1.8vw, 10.0rem) !important; letter-spacing: -0.02em; }
      .services-subtitle-text { font-size: clamp(3.6rem, 3.0rem + 0.8vw, 5.0rem) !important; max-width: 120rem !important; }
    }
  </style>

  <!-- ════════════════════════════════════════════════════════
       SERVICES SECTION (v32 - 2x Text Enlarged, Premium Bento Grid)
       ════════════════════════════════════════════════════════ -->
  <section id="services" class="relative overflow-hidden" style="background: #FFFFFF; padding: clamp(1.5rem,2.5vw,2.5rem) 0;">
    <div class="absolute inset-0 opacity-[0.012]" style="background-image: radial-gradient(circle at 1px 1px, rgba(15,23,42,0.15) 1px, transparent 0); background-size: 32px 32px;"></div>

    <div class="relative fluid-container">
      <div class="text-center" style="margin-bottom: clamp(0.8rem,1.5vw,1.5rem)" data-aos="fade-up">
        <div class="inline-flex items-center rounded-full font-semibold services-badge-text" style="gap:8px; padding:6px 18px; margin-bottom:var(--space-xs); background: linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.04)); border: 1px solid rgba(59,130,246,0.10); color: #2563EB; font-size: clamp(1.14rem, 0.93rem + 0.54vw, 1.68rem);">
          <i class="fas fa-cubes" style="font-size:clamp(16px,1.35vw,24px)"></i>${s.services_badge || 'KOIST 사업분야'}
        </div>
        <h2 class="font-bold text-primary services-title-text" style="font-size: clamp(2.16rem, 1.62rem + 1.38vw, 3.84rem); margin-bottom:var(--space-2xs); line-height:1.15;">${s.services_title || '핵심 사업분야'}</h2>
        <p class="text-slate-500 max-w-2xl mx-auto services-subtitle-text" style="font-size: clamp(1.10rem, 0.90rem + 0.52vw, 1.72rem); line-height:1.3;">${s.services_subtitle || 'KOIST의 전문 시험·평가 서비스를 한눈에 확인하세요'}</p>
      </div>

      ${(() => {
        const fontScale = parseFloat(s.services_tag_font_scale || '1.6') || 1.6;
        const gapScale = parseFloat(s.services_tag_gap_scale || '0.5') || 0.5;
        const baseFontMin = 0.8;
        const baseFontVw = 1.4;
        const baseFontMax = 1.1;
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
        const iconSize = parseFloat(s.services_icon_scale || '1.0') || 1.0;
        const iconW = (56 * iconSize).toFixed(0);
        const iconWMax = (80 * iconSize).toFixed(0);
        const iconVw = (6 * iconSize).toFixed(1);
        const descFontMin = (0.58 * fontScale).toFixed(2);
        const descFontVw = (0.72 * fontScale).toFixed(1);
        const descFontMax = (0.70 * fontScale).toFixed(2);
        return `
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-${gridCols}" style="gap:clamp(${gapMin}rem, ${gapVw}vw, ${gapMax}rem)">
        ${deps.map((dept, i) => `
        <a href="/services/${dept.slug}" class="card-service-xl group block relative" style="--card-accent:${dept.color}; padding:clamp(${padMin}rem, ${padVw}vw, ${padMax}rem);" data-aos="fade-up" data-aos-delay="${Math.min(i * 20, 180)}">
          ${dept.image_url ? `
          <div class="rounded-lg overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg mx-auto" style="width:clamp(${iconW}px,${iconVw}vw,${iconWMax}px); height:clamp(${iconW}px,${iconVw}vw,${iconWMax}px); margin-bottom:clamp(0.4rem,0.6vw,0.6rem); border: 1.5px solid ${dept.color}20; box-shadow: 0 1px 8px ${dept.color}10;">
            <img src="${dept.image_url}" alt="${dept.name}" class="w-full h-full object-cover" loading="lazy" style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;">
          </div>` : `
          <div class="rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg mx-auto" style="width:clamp(${iconW}px,${iconVw}vw,${iconWMax}px); height:clamp(${iconW}px,${iconVw}vw,${iconWMax}px); background: linear-gradient(135deg, ${dept.color}15, ${dept.color}08); margin-bottom:clamp(0.4rem,0.6vw,0.6rem);">
            <i class="fas ${dept.icon}" style="color:${dept.color}; font-size:clamp(1.2rem,2vw,1.8rem)"></i>
          </div>`}
          <h3 class="font-bold text-primary group-hover:text-accent transition-colors text-center" style="font-size:clamp(${fMin}rem,${fVw}vw,${fMax}rem); margin-bottom:2px; line-height:1.15; letter-spacing:-0.02em;">${dept.name}</h3>
          <p class="text-slate-500 text-center line-clamp-2" style="font-size:clamp(${descFontMin}rem,${descFontVw}vw,${descFontMax}rem); line-height:1.2;">${dept.description || ''}</p>
          <div class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
            <i class="fas fa-arrow-right text-accent/50" style="font-size:12px"></i>
          </div>
        </a>
        `).join('')}
      </div>`;
      })()}
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════
       v33: INLINE ACCORDION — 공지사항/자료실/시스템문서/오시는길
       사업분야 바로 아래, 클릭 → 펼치기 → 항목 클릭 → 내용 → 닫기 → 원위치
       ════════════════════════════════════════════════════════ -->
  <section id="homeAccordionSection" class="relative" style="background:#FFFFFF; border-top:1px solid rgba(226,232,240,0.40);">
    <div class="fluid-container" style="padding-top:0; padding-bottom:0;">
      <!-- Accordion Trigger Bar -->
      <button id="accordionTrigger" onclick="toggleHomeAccordion()" class="w-full flex items-center justify-between transition-all hover:bg-blue-50/30" style="padding:clamp(0.7rem,1.1vw,1rem) clamp(0.5rem,1vw,1rem); border-radius:0; cursor:pointer; border:none; background:transparent;">
        <span class="flex items-center" style="gap:clamp(6px,0.6vw,10px);">
          <i class="fas fa-bullhorn text-accent" style="font-size:clamp(12px,1vw,16px)"></i>
          <span class="font-bold text-primary" style="font-size:clamp(0.85rem,0.72rem+0.38vw,1.15rem);">${s.accordion_title || '공지사항 / 자료실 / 시스템문서 / 오시는길'}</span>
        </span>
        <span class="flex items-center" style="gap:6px;">
          <span class="text-slate-400 font-medium" style="font-size:clamp(0.7rem,0.6rem+0.2vw,0.85rem);">${s.accordion_expand_label || '펼쳐보기'}</span>
          <i id="accordionArrow" class="fas fa-chevron-down text-slate-400 transition-transform" style="font-size:clamp(10px,0.8vw,13px); transition:transform 0.3s ease;"></i>
        </span>
      </button>

      <!-- Accordion Body (hidden by default) -->
      <div id="accordionBody" style="max-height:0; overflow:hidden; transition:max-height 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s ease; opacity:0;">
        <div style="padding:0 clamp(0.5rem,1vw,1rem) clamp(1rem,1.5vw,1.5rem);">

          <!-- 4-tab bar -->
          <div class="acc-tab-bar flex" style="border-bottom:2px solid rgba(226,232,240,0.50); margin-bottom:clamp(0.5rem,0.8vw,0.8rem); gap:0;">
            <button class="acc-tab active" data-acctab="acc-notices" onclick="switchAccTab('acc-notices')">
              <i class="fas fa-bullhorn" style="font-size:clamp(9px,0.7vw,12px); margin-right:3px;"></i>공지사항
            </button>
            <button class="acc-tab" data-acctab="acc-downloads" onclick="switchAccTab('acc-downloads')">
              <i class="fas fa-download" style="font-size:clamp(9px,0.7vw,12px); margin-right:3px;"></i>자료실
            </button>
            <button class="acc-tab" data-acctab="acc-documents" onclick="switchAccTab('acc-documents')">
              <i class="fas fa-book" style="font-size:clamp(9px,0.7vw,12px); margin-right:3px;"></i>시스템문서
            </button>
            <button class="acc-tab" data-acctab="acc-location" onclick="switchAccTab('acc-location')">
              <i class="fas fa-location-dot" style="font-size:clamp(9px,0.7vw,12px); margin-right:3px;"></i>오시는길
            </button>
          </div>

          <!-- Tab Content: 공지사항 (AJAX loaded) -->
          <div class="acc-tab-content active" id="acc-notices">
            <div id="accNoticeList" class="divide-y divide-slate-100/80">
              <p class="text-slate-400 text-center" style="padding:1.5rem 0; font-size:clamp(0.8rem,0.7rem+0.2vw,0.95rem);"><i class="fas fa-spinner fa-spin mr-1"></i> 불러오는 중...</p>
            </div>
            <!-- Notice detail expand area -->
            <div id="accNoticeDetail" style="display:none; margin-top:clamp(0.5rem,0.8vw,0.8rem);">
              <div class="rounded-xl border border-blue-100 bg-blue-50/30" style="padding:clamp(1rem,1.5vw,1.5rem);">
                <h4 id="accNoticeDetailTitle" class="font-bold text-primary" style="font-size:clamp(0.9rem,0.78rem+0.35vw,1.15rem); margin-bottom:clamp(0.4rem,0.6vw,0.6rem); line-height:1.3;"></h4>
                <div id="accNoticeDetailBody" class="text-slate-600" style="font-size:clamp(0.8rem,0.7rem+0.25vw,0.95rem); line-height:1.6; word-break:keep-all; overflow-wrap:break-word;"></div>
                <div style="text-align:center; margin-top:clamp(0.8rem,1.2vw,1.2rem);">
                  <button onclick="closeAccDetail()" class="inline-flex items-center font-semibold text-white rounded-lg transition-all hover:opacity-90" style="gap:5px; padding:clamp(0.4rem,0.6vw,0.55rem) clamp(1.2rem,1.8vw,1.6rem); font-size:clamp(0.75rem,0.65rem+0.22vw,0.88rem); background:linear-gradient(135deg,#2563EB,#06B6D4);">
                    <i class="fas fa-times" style="font-size:10px"></i> 닫기
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab Content: 자료실 (AJAX loaded) -->
          <div class="acc-tab-content" id="acc-downloads">
            <div id="accDownloadList" class="divide-y divide-slate-100/80">
              <p class="text-slate-400 text-center" style="padding:1.5rem 0; font-size:clamp(0.8rem,0.7rem+0.2vw,0.95rem);"><i class="fas fa-spinner fa-spin mr-1"></i> 불러오는 중...</p>
            </div>
          </div>

          <!-- Tab Content: 시스템문서 (static) -->
          <div class="acc-tab-content" id="acc-documents">
            <div class="space-y-2">
              <a href="/static/docs/architecture-diagram.html" target="_blank" class="flex items-center hover:bg-blue-50/30 px-2 rounded-lg transition-colors group" style="gap:clamp(6px,0.6vw,10px); padding-top:clamp(0.35rem,0.5vw,0.5rem); padding-bottom:clamp(0.35rem,0.5vw,0.5rem);">
                <div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(30px,2.5vw,40px); height:clamp(30px,2.5vw,40px); background:rgba(59,130,246,0.06);"><i class="fas fa-sitemap text-blue-400" style="font-size:clamp(11px,0.9vw,15px)"></i></div>
                <div class="flex-1 min-w-0">
                  <span class="text-slate-700 font-medium group-hover:text-accent block truncate" style="font-size:clamp(0.8rem,0.7rem+0.25vw,0.95rem); line-height:1.3;">시스템 설계서 (Architecture Diagram)</span>
                  <span class="text-slate-400" style="font-size:clamp(0.65rem,0.56rem+0.18vw,0.78rem);">v8.0 · 시스템 아키텍처, DB 스키마, API 설계</span>
                </div>
                <i class="fas fa-external-link-alt text-slate-300 group-hover:text-accent" style="font-size:clamp(9px,0.7vw,12px)"></i>
              </a>
              <a href="/static/docs/development-guide.html" target="_blank" class="flex items-center hover:bg-blue-50/30 px-2 rounded-lg transition-colors group" style="gap:clamp(6px,0.6vw,10px); padding-top:clamp(0.35rem,0.5vw,0.5rem); padding-bottom:clamp(0.35rem,0.5vw,0.5rem);">
                <div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(30px,2.5vw,40px); height:clamp(30px,2.5vw,40px); background:rgba(16,185,129,0.06);"><i class="fas fa-code text-emerald-400" style="font-size:clamp(11px,0.9vw,15px)"></i></div>
                <div class="flex-1 min-w-0">
                  <span class="text-slate-700 font-medium group-hover:text-accent block truncate" style="font-size:clamp(0.8rem,0.7rem+0.25vw,0.95rem); line-height:1.3;">개발지침서 (Development Guide)</span>
                  <span class="text-slate-400" style="font-size:clamp(0.65rem,0.56rem+0.18vw,0.78rem);">v8.0 · 기술 스택, 디렉터리 구조, API 가이드</span>
                </div>
                <i class="fas fa-external-link-alt text-slate-300 group-hover:text-accent" style="font-size:clamp(9px,0.7vw,12px)"></i>
              </a>
            </div>
          </div>

          <!-- Tab Content: 오시는길 (static from settings) -->
          <div class="acc-tab-content" id="acc-location">
            <div class="rounded-xl overflow-hidden border border-slate-100" style="padding:clamp(0.8rem,1.2vw,1.2rem);">
              <div class="flex items-start" style="gap:clamp(8px,0.8vw,12px); margin-bottom:clamp(0.5rem,0.7vw,0.7rem);">
                <div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(32px,2.8vw,44px); height:clamp(32px,2.8vw,44px); background:linear-gradient(135deg,#2563EB,#06B6D4);">
                  <i class="fas fa-building text-white" style="font-size:clamp(12px,1vw,18px)"></i>
                </div>
                <div>
                  <p class="font-bold text-primary" style="font-size:clamp(0.85rem,0.75rem+0.3vw,1.1rem); line-height:1.3; margin-bottom:3px;">${s.company_name || '(주)한국정보보안기술원'}</p>
                  <p class="text-slate-500" style="font-size:clamp(0.75rem,0.65rem+0.22vw,0.9rem); line-height:1.3;">${s.address || '서울특별시 서초구 효령로 336 윤일빌딩 4층'}</p>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2" style="gap:clamp(0.3rem,0.5vw,0.5rem);">
                <div class="flex items-center" style="gap:5px;">
                  <i class="fas fa-phone text-accent" style="font-size:clamp(9px,0.7vw,12px)"></i>
                  <span class="text-slate-600" style="font-size:clamp(0.75rem,0.65rem+0.22vw,0.9rem);">${s.phone || '02-586-1230'}</span>
                </div>
                <div class="flex items-center" style="gap:5px;">
                  <i class="fas fa-fax text-accent" style="font-size:clamp(9px,0.7vw,12px)"></i>
                  <span class="text-slate-600" style="font-size:clamp(0.75rem,0.65rem+0.22vw,0.9rem);">FAX: ${s.fax || '02-586-1238'}</span>
                </div>
              </div>
              <a href="/about/location" class="inline-flex items-center font-semibold text-accent hover:underline" style="gap:4px; margin-top:clamp(0.5rem,0.7vw,0.7rem); font-size:clamp(0.75rem,0.65rem+0.22vw,0.9rem);">
                <i class="fas fa-map-location-dot" style="font-size:clamp(9px,0.7vw,12px)"></i> 오시는길 상세보기
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- v33 Accordion Styles -->
  <style>
    .acc-tab-bar { display:flex; gap:0; }
    .acc-tab {
      padding:clamp(0.35rem,0.55vw,0.5rem) clamp(0.6rem,0.9vw,0.9rem);
      font-size:clamp(0.75rem,0.65rem+0.22vw,0.9rem);
      font-weight:700;
      color:#94A3B8;
      background:transparent;
      border:none;
      border-bottom:2.5px solid transparent;
      margin-bottom:-2px;
      cursor:pointer;
      transition:all 0.25s ease;
      white-space:nowrap;
    }
    .acc-tab.active { color:#2563EB; border-bottom-color:#2563EB; }
    .acc-tab:hover:not(.active) { color:#475569; background:rgba(59,130,246,0.03); }
    .acc-tab-content { display:none; }
    .acc-tab-content.active { display:block; }
    .acc-notice-row {
      display:flex; align-items:center; gap:clamp(6px,0.6vw,10px);
      padding:clamp(0.35rem,0.5vw,0.5rem) clamp(0.25rem,0.4vw,0.4rem);
      cursor:pointer; border-radius:8px; transition:background 0.2s ease;
    }
    .acc-notice-row:hover { background:rgba(59,130,246,0.04); }
    .acc-dl-row {
      display:flex; align-items:center; gap:clamp(6px,0.6vw,10px);
      padding:clamp(0.35rem,0.5vw,0.5rem) clamp(0.25rem,0.4vw,0.4rem);
      border-radius:8px; transition:background 0.2s ease;
    }
    .acc-dl-row:hover { background:rgba(59,130,246,0.04); }
    #accordionArrow.open { transform:rotate(180deg); }
    @media (min-width:3840px) {
      .acc-tab { font-size:1.6rem; padding:0.8rem 1.4rem; }
      .acc-notice-row, .acc-dl-row { padding:0.7rem 0.6rem; }
    }
    @media (min-width:7680px) {
      .acc-tab { font-size:2.4rem; padding:1.2rem 2rem; border-bottom-width:5px; }
      .acc-tab-bar { border-bottom-width:4px; }
    }
  </style>

  <!-- v33 Accordion JavaScript -->
  <script>
  (function(){
    var accOpen = false;
    var accScrollY = 0;
    var accDataLoaded = { notices:false, downloads:false };

    window.toggleHomeAccordion = function() {
      var body = document.getElementById('accordionBody');
      var arrow = document.getElementById('accordionArrow');
      if (!body) return;
      if (!accOpen) {
        accScrollY = window.pageYOffset || document.documentElement.scrollTop;
        body.style.maxHeight = body.scrollHeight + 400 + 'px';
        body.style.opacity = '1';
        arrow.classList.add('open');
        accOpen = true;
        loadAccTab('acc-notices');
      } else {
        closeHomeAccordion();
      }
    };

    function closeHomeAccordion() {
      var body = document.getElementById('accordionBody');
      var arrow = document.getElementById('accordionArrow');
      if (!body) return;
      body.style.maxHeight = '0';
      body.style.opacity = '0';
      arrow.classList.remove('open');
      accOpen = false;
      var detail = document.getElementById('accNoticeDetail');
      if (detail) detail.style.display = 'none';
      setTimeout(function() {
        window.scrollTo({ top: accScrollY, behavior: 'smooth' });
      }, 100);
    }

    window.switchAccTab = function(tabId) {
      document.querySelectorAll('.acc-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('.acc-tab-content').forEach(function(c) { c.classList.remove('active'); });
      var tab = document.querySelector('.acc-tab[data-acctab="' + tabId + '"]');
      var content = document.getElementById(tabId);
      if (tab) tab.classList.add('active');
      if (content) content.classList.add('active');
      loadAccTab(tabId);
      // Hide notice detail when switching tabs
      var detail = document.getElementById('accNoticeDetail');
      if (detail) detail.style.display = 'none';
      // Re-calc max-height
      var body = document.getElementById('accordionBody');
      if (body && accOpen) {
        body.style.maxHeight = body.scrollHeight + 400 + 'px';
      }
    };

    function loadAccTab(tabId) {
      if (tabId === 'acc-notices' && !accDataLoaded.notices) {
        fetch('/api/notices?limit=10')
          .then(function(r) { return r.json(); })
          .then(function(res) {
            accDataLoaded.notices = true;
            var list = document.getElementById('accNoticeList');
            if (!list) return;
            if (!res.data || res.data.length === 0) {
              list.innerHTML = '<p class="text-slate-400 text-center" style="padding:1.5rem 0; font-size:clamp(0.8rem,0.7rem+0.2vw,0.95rem);">등록된 공지사항이 없습니다.</p>';
              return;
            }
            var html = '';
            res.data.forEach(function(n) {
              var date = n.created_at ? n.created_at.split('T')[0] : '';
              var pinBadge = n.is_pinned ? '<span class="shrink-0 bg-red-500 text-white rounded flex items-center justify-center font-bold" style="width:20px;height:20px;font-size:9px;">N</span>' : '<span class="shrink-0 rounded-full bg-slate-300/80" style="width:5px;height:5px;"></span>';
              html += '<div class="acc-notice-row" onclick="loadAccNotice(' + n.id + ')">' + pinBadge + '<span class="flex-1 text-slate-700 truncate" style="font-size:clamp(0.8rem,0.7rem+0.25vw,0.95rem);line-height:1.3;">' + escH(n.title) + '</span><span class="shrink-0 text-slate-400/70 tabular-nums" style="font-size:clamp(0.68rem,0.58rem+0.18vw,0.82rem);">' + date + '</span></div>';
            });
            list.innerHTML = html;
            // Re-calc max-height after content loaded
            var body = document.getElementById('accordionBody');
            if (body && accOpen) body.style.maxHeight = body.scrollHeight + 400 + 'px';
          })
          .catch(function() {
            var list = document.getElementById('accNoticeList');
            if (list) list.innerHTML = '<p class="text-slate-400 text-center" style="padding:1rem 0;">데이터를 불러오지 못했습니다.</p>';
          });
      }
      if (tabId === 'acc-downloads' && !accDataLoaded.downloads) {
        fetch('/api/downloads')
          .then(function(r) { return r.json(); })
          .then(function(res) {
            accDataLoaded.downloads = true;
            var list = document.getElementById('accDownloadList');
            if (!list) return;
            if (!res.data || res.data.length === 0) {
              list.innerHTML = '<p class="text-slate-400 text-center" style="padding:1.5rem 0; font-size:clamp(0.8rem,0.7rem+0.2vw,0.95rem);">등록된 자료가 없습니다.</p>';
              return;
            }
            var iconMap = { pdf:'fa-file-pdf text-red-400', doc:'fa-file-word text-blue-400', docx:'fa-file-word text-blue-400', xls:'fa-file-excel text-green-400', xlsx:'fa-file-excel text-green-400', zip:'fa-file-zipper text-purple-400', hwp:'fa-file-lines text-cyan-400' };
            var html = '';
            res.data.forEach(function(d) {
              var ext = (d.file_type || '').toLowerCase();
              var iconCls = iconMap[ext] || 'fa-file text-slate-400';
              html += '<a href="/api/downloads/' + d.id + '/file" target="_blank" class="acc-dl-row group" style="text-decoration:none;color:inherit;">' +
                '<div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(28px,2.2vw,36px);height:clamp(28px,2.2vw,36px);background:rgba(59,130,246,0.05);"><i class="fas ' + iconCls + '" style="font-size:clamp(10px,0.9vw,14px)"></i></div>' +
                '<div class="flex-1 min-w-0"><span class="text-slate-700 font-medium group-hover:text-accent block truncate" style="font-size:clamp(0.8rem,0.7rem+0.25vw,0.95rem);line-height:1.3;">' + escH(d.title) + '</span>' +
                '<span class="text-slate-400" style="font-size:clamp(0.65rem,0.56rem+0.18vw,0.78rem);">' + (ext.toUpperCase() || 'FILE') + (d.file_size ? ' · ' + formatSize(d.file_size) : '') + '</span></div>' +
                '<i class="fas fa-download text-slate-300 group-hover:text-accent" style="font-size:clamp(9px,0.7vw,12px)"></i></a>';
            });
            list.innerHTML = html;
            var body = document.getElementById('accordionBody');
            if (body && accOpen) body.style.maxHeight = body.scrollHeight + 400 + 'px';
          })
          .catch(function() {
            var list = document.getElementById('accDownloadList');
            if (list) list.innerHTML = '<p class="text-slate-400 text-center" style="padding:1rem 0;">데이터를 불러오지 못했습니다.</p>';
          });
      }
    }

    window.loadAccNotice = function(id) {
      var detail = document.getElementById('accNoticeDetail');
      var titleEl = document.getElementById('accNoticeDetailTitle');
      var bodyEl = document.getElementById('accNoticeDetailBody');
      if (!detail || !titleEl || !bodyEl) return;
      titleEl.textContent = '';
      bodyEl.innerHTML = '<p class="text-slate-400"><i class="fas fa-spinner fa-spin mr-1"></i> 불러오는 중...</p>';
      detail.style.display = 'block';
      // Re-calc max-height
      var accBody = document.getElementById('accordionBody');
      if (accBody && accOpen) accBody.style.maxHeight = accBody.scrollHeight + 800 + 'px';
      // Scroll to detail
      setTimeout(function() { detail.scrollIntoView({ behavior:'smooth', block:'nearest' }); }, 100);

      fetch('/api/notices/' + id)
        .then(function(r) { return r.json(); })
        .then(function(res) {
          if (!res.data) { bodyEl.innerHTML = '<p class="text-slate-400">내용을 불러오지 못했습니다.</p>'; return; }
          titleEl.textContent = res.data.title || '';
          bodyEl.innerHTML = res.data.content || '<p class="text-slate-400">내용이 없습니다.</p>';
          if (accBody && accOpen) accBody.style.maxHeight = accBody.scrollHeight + 800 + 'px';
          setTimeout(function() { detail.scrollIntoView({ behavior:'smooth', block:'nearest' }); }, 50);
        })
        .catch(function() { bodyEl.innerHTML = '<p class="text-slate-400">내용을 불러오지 못했습니다.</p>'; });
    };

    window.closeAccDetail = function() {
      var detail = document.getElementById('accNoticeDetail');
      if (detail) detail.style.display = 'none';
      // Close accordion and return to original scroll
      closeHomeAccordion();
    };

    function escH(s) { var d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }
    function formatSize(bytes) {
      if (!bytes) return '';
      var kb = bytes / 1024;
      if (kb < 1024) return kb.toFixed(0) + ' KB';
      return (kb / 1024).toFixed(1) + ' MB';
    }
  })();
  </script>

  <!-- ════════════════════════════════════════════════════════
       NOTICES + PROGRESS (v32 - 2x Text, Tab Menu, Premium Dual Panels)
       ════════════════════════════════════════════════════════ -->
  <section class="relative overflow-hidden" style="background: var(--grad-surface); padding: clamp(1.5rem,2.5vw,2.5rem) 0;">
    <div class="relative fluid-container">
      <div class="grid grid-cols-1 lg:grid-cols-2" style="gap:clamp(1rem, 2vw, 1.5rem)">

        <!-- ═══ Notices Panel with Tab Menu (v32) ═══ -->
        <div data-aos="fade-right" data-aos-duration="700" class="bg-white rounded-xl border border-slate-200/50" style="padding:clamp(1.25rem, 2.2vw, 2rem); box-shadow: var(--shadow-sm);">
          <!-- Tab Bar: 공지사항 / 자료실 / 시스템문서 / 오시는길 -->
          <div class="notice-tab-bar" id="noticeTabBar">
            <button class="notice-tab active" data-tab="notices" onclick="switchNoticeTab('notices')">
              <i class="fas fa-bullhorn" style="font-size:clamp(10px,0.8vw,14px); margin-right:4px;"></i>공지사항
            </button>
            <button class="notice-tab" data-tab="downloads" onclick="switchNoticeTab('downloads')">
              <i class="fas fa-download" style="font-size:clamp(10px,0.8vw,14px); margin-right:4px;"></i>자료실
            </button>
            <button class="notice-tab" data-tab="documents" onclick="switchNoticeTab('documents')">
              <i class="fas fa-book" style="font-size:clamp(10px,0.8vw,14px); margin-right:4px;"></i>시스템문서
            </button>
            <button class="notice-tab" data-tab="location" onclick="switchNoticeTab('location')">
              <i class="fas fa-location-dot" style="font-size:clamp(10px,0.8vw,14px); margin-right:4px;"></i>오시는길
            </button>
          </div>

          <!-- Tab Content: 공지사항 -->
          <div class="notice-tab-content active" id="tab-notices">
            <div class="flex justify-end" style="margin-bottom:clamp(0.3rem,0.5vw,0.5rem);">
              <a href="/support/notice" class="text-accent font-semibold hover:underline inline-flex items-center" style="gap:4px; font-size:clamp(1.0rem, 0.85rem + 0.4vw, 1.5rem);">더보기 <i class="fas fa-chevron-right" style="font-size:clamp(9px,0.7vw,12px)"></i></a>
            </div>
            <div class="divide-y divide-slate-100/80">
              ${notices.length > 0 ? notices.map(n => `
              <a href="/support/notice/${n.id}" class="flex items-center hover:bg-blue-50/30 -mx-2 px-2 rounded-lg transition-colors group" style="gap:var(--space-sm); padding: clamp(0.4rem,0.6vw,0.6rem) 0;">
                ${n.is_pinned ? '<span class="shrink-0 bg-red-500 text-white rounded flex items-center justify-center font-bold" style="width:clamp(22px,1.8vw,30px); height:clamp(22px,1.8vw,30px); font-size:clamp(9px,0.7vw,13px); box-shadow: 0 2px 6px rgba(239,68,68,0.25);">N</span>' : '<span class="shrink-0 rounded-full bg-slate-300/80" style="width:clamp(6px,0.5vw,8px); height:clamp(6px,0.5vw,8px);"></span>'}
                <span class="flex-1 text-slate-700 truncate group-hover:text-accent transition-colors" style="font-size:clamp(1.1rem, 0.9rem + 0.5vw, 1.7rem); line-height:1.2;">${n.title}</span>
                <span class="shrink-0 text-slate-400/70 tabular-nums" style="font-size:clamp(0.95rem, 0.8rem + 0.4vw, 1.4rem);">${n.created_at ? n.created_at.split('T')[0] : ''}</span>
              </a>
              `).join('') : '<p class="text-slate-400 text-center" style="padding:var(--space-xl) 0; font-size:clamp(1.1rem,0.9rem+0.5vw,1.7rem);"><i class="fas fa-inbox text-slate-300 block" style="font-size:clamp(1.4rem,1.2vw,2rem);margin-bottom:8px"></i>등록된 공지사항이 없습니다.</p>'}
            </div>
          </div>

          <!-- Tab Content: 자료실 (AJAX from DB) -->
          <div class="notice-tab-content" id="tab-downloads">
            <div class="flex justify-end" style="margin-bottom:clamp(0.3rem,0.5vw,0.5rem);">
              <a href="/support/downloads" class="text-accent font-semibold hover:underline inline-flex items-center" style="gap:4px; font-size:clamp(1.0rem, 0.85rem + 0.4vw, 1.5rem);">전체보기 <i class="fas fa-chevron-right" style="font-size:clamp(9px,0.7vw,12px)"></i></a>
            </div>
            <div id="noticeDownloadList" style="padding:clamp(1rem,1.5vw,1.5rem) 0;">
              <p class="text-slate-400 text-center" style="font-size:clamp(0.8rem,0.7rem+0.2vw,0.95rem);"><i class="fas fa-spinner fa-spin mr-1"></i> 불러오는 중...</p>
            </div>
          </div>

          <!-- Tab Content: 시스템문서 (AJAX from DB) -->
          <div class="notice-tab-content" id="tab-documents">
            <div class="flex justify-end" style="margin-bottom:clamp(0.3rem,0.5vw,0.5rem);">
              <a href="/support/documents" class="text-accent font-semibold hover:underline inline-flex items-center" style="gap:4px; font-size:clamp(1.0rem, 0.85rem + 0.4vw, 1.5rem);">전체보기 <i class="fas fa-chevron-right" style="font-size:clamp(9px,0.7vw,12px)"></i></a>
            </div>
            <div id="noticeDocumentList" style="padding:clamp(1rem,1.5vw,1.5rem) 0;">
              <p class="text-slate-400 text-center" style="font-size:clamp(0.8rem,0.7rem+0.2vw,0.95rem);"><i class="fas fa-spinner fa-spin mr-1"></i> 불러오는 중...</p>
            </div>
          </div>

          <!-- Tab Content: 오시는길 -->
          <div class="notice-tab-content" id="tab-location">
            <div style="padding:clamp(1rem,1.5vw,1.5rem) 0;">
              <div class="rounded-xl overflow-hidden border border-slate-100" style="margin-bottom:clamp(0.8rem,1.2vw,1.2rem);">
                <div style="background: linear-gradient(135deg, rgba(59,130,246,0.04), rgba(6,182,212,0.03)); padding:clamp(1rem,1.5vw,1.5rem);">
                  <div class="flex items-start" style="gap:clamp(10px,1vw,16px); margin-bottom:clamp(0.6rem,0.8vw,0.8rem);">
                    <div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(40px,3.5vw,56px); height:clamp(40px,3.5vw,56px); background:linear-gradient(135deg, #2563EB, #06B6D4);">
                      <i class="fas fa-building text-white" style="font-size:clamp(16px,1.4vw,24px)"></i>
                    </div>
                    <div>
                      <p class="font-bold text-primary" style="font-size:clamp(1.2rem,1rem+0.6vw,1.9rem); line-height:1.2; margin-bottom:4px;">${s.company_name || '(주)한국정보보안기술원'}</p>
                      <p class="text-slate-500" style="font-size:clamp(1.0rem,0.85rem+0.4vw,1.5rem); line-height:1.2;">${s.address || '서울특별시 서초구 효령로 336 윤일빌딩 4층'}</p>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2" style="gap:clamp(0.4rem,0.6vw,0.6rem);">
                    <div class="flex items-center" style="gap:6px;">
                      <i class="fas fa-phone text-accent" style="font-size:clamp(10px,0.8vw,14px)"></i>
                      <span class="text-slate-600" style="font-size:clamp(1.0rem,0.85rem+0.4vw,1.5rem);">${s.phone || '02-586-1230'}</span>
                    </div>
                    <div class="flex items-center" style="gap:6px;">
                      <i class="fas fa-fax text-accent" style="font-size:clamp(10px,0.8vw,14px)"></i>
                      <span class="text-slate-600" style="font-size:clamp(1.0rem,0.85rem+0.4vw,1.5rem);">FAX: ${s.fax || '02-586-1238'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <a href="/about/location" class="btn-primary w-full justify-center" style="font-size:clamp(1.0rem,0.85rem+0.4vw,1.5rem); padding:clamp(0.6rem,0.8vw,0.8rem) 0;">
                <i class="fas fa-map-location-dot"></i> 오시는길 상세보기
              </a>
            </div>
          </div>
        </div>

        <!-- ═══ Progress Panel + Dashboard (v32 - 2x text) ═══ -->
        <div data-aos="fade-left" data-aos-duration="700" class="bg-white rounded-xl border border-slate-200/50" style="padding:clamp(1.25rem, 2.2vw, 2rem); box-shadow: var(--shadow-sm);">
          <div class="flex justify-between items-center" style="margin-bottom:var(--space-md)">
            <h3 class="font-bold text-primary flex items-center" style="gap:var(--space-sm); font-size: clamp(1.4rem, 1.1rem + 0.8vw, 2.4rem);">
              <div class="rounded-lg flex items-center justify-center" style="width:clamp(36px,3vw,50px); height:clamp(36px,3vw,50px); background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.05));">
                <i class="fas fa-chart-bar text-emerald-500" style="font-size:clamp(14px,1.2vw,22px)"></i>
              </div>
              ${s.progress_title || '평가현황'}
            </h3>
            <a href="/support/progress" class="text-accent font-semibold hover:underline inline-flex items-center" style="gap:4px; font-size:clamp(1.0rem, 0.85rem + 0.4vw, 1.5rem);">전체보기 <i class="fas fa-chevron-right" style="font-size:clamp(9px,0.7vw,12px)"></i></a>
          </div>

          ${catCounts.length > 0 ? `
          <div class="grid grid-cols-2 sm:grid-cols-4" style="gap:clamp(0.4rem,0.7vw,0.6rem); margin-bottom:var(--space-md)">
            ${catCounts.slice(0, 4).map(cc => {
              const m = catMeta[cc.category] || { icon: 'fa-circle', color: '#64748B' };
              return `
            <a href="/support/progress?category=${encodeURIComponent(cc.category)}" class="group rounded-lg border border-slate-100 hover:border-slate-200 transition-all hover:shadow-sm text-center" style="padding:clamp(0.5rem,0.8vw,0.8rem);">
              <div class="flex items-center justify-center" style="gap:4px; margin-bottom:4px">
                <i class="fas ${m.icon}" style="color:${m.color}; font-size:clamp(0.85rem,0.9vw,1.2rem)"></i>
                <span class="text-slate-500 truncate" style="font-size:clamp(0.95rem,0.8rem+0.4vw,1.4rem);">${cc.category}</span>
              </div>
              <div class="font-black" style="color:${m.color}; line-height:1.15; font-size:clamp(1.4rem,1.1rem+0.8vw,2.4rem);">${cc.cnt}<span class="text-slate-400 font-normal ml-0.5" style="font-size:clamp(0.85rem,0.7rem+0.3vw,1.2rem);">건</span></div>
            </a>`;
            }).join('')}
          </div>
          ${catCounts.length > 4 ? `
          <div class="flex flex-wrap" style="gap:6px; margin-bottom:var(--space-md)">
            ${catCounts.slice(4).map(cc => {
              const m = catMeta[cc.category] || { icon: 'fa-circle', color: '#64748B' };
              return `<a href="/support/progress?category=${encodeURIComponent(cc.category)}" class="inline-flex items-center rounded-full hover:shadow-sm transition-all" style="gap:4px; padding:4px 14px; background:${m.color}08; color:${m.color}; border:1px solid ${m.color}15; font-size:clamp(0.95rem,0.8rem+0.4vw,1.4rem);"><i class="fas ${m.icon}" style="font-size:clamp(8px,0.65vw,12px)"></i>${cc.category} <strong>${cc.cnt}</strong></a>`;
            }).join('')}
          </div>` : ''}
          ` : ''}

          <div class="flex items-center justify-between rounded-lg" style="margin-bottom:var(--space-md); padding:clamp(6px,0.6vw,10px) clamp(12px,1vw,18px); background: linear-gradient(135deg, rgba(59,130,246,0.03), rgba(6,182,212,0.02)); border: 1px solid rgba(59,130,246,0.08);">
            <span class="text-slate-500" style="font-size:clamp(0.95rem,0.8rem+0.4vw,1.4rem);"><i class="fas fa-chart-pie text-blue-400 mr-1" style="font-size:clamp(10px,0.8vw,14px)"></i>${s.progress_total_label || '총 시험·평가 실적'}</span>
            <span class="text-accent font-black" style="font-size:clamp(1.1rem,0.9rem+0.5vw,1.7rem);">${totalEvals}건</span>
          </div>

          <div class="overflow-x-auto -mx-1 px-1">
            <table class="w-full" style="min-width:340px;">
              <thead>
                <tr class="text-left text-slate-500 border-b border-slate-100">
                  <th class="font-semibold" style="padding:0 6px 8px 0; font-size:clamp(0.95rem,0.8rem+0.4vw,1.4rem);">제품명</th>
                  <th class="font-semibold hidden sm:table-cell" style="padding:0 6px 8px; width:100px; text-align:center; font-size:clamp(0.95rem,0.8rem+0.4vw,1.4rem);">분류</th>
                  <th class="font-semibold" style="padding:0 0 8px 6px; text-align:right; width:100px; font-size:clamp(0.95rem,0.8rem+0.4vw,1.4rem);">상태</th>
                </tr>
              </thead>
              <tbody>
                ${progress.length > 0 ? progress.map(p => {
                  const m = catMeta[p.category] || { icon: 'fa-circle', color: '#64748B' };
                  return `
                <tr class="border-b border-slate-50/80 hover:bg-slate-50/40 transition-colors">
                  <td class="text-slate-700 font-medium" style="padding:clamp(6px,0.6vw,10px) 6px clamp(6px,0.6vw,10px) 0; max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:clamp(1.0rem,0.85rem+0.4vw,1.5rem);">${p.product_name}</td>
                  <td class="hidden sm:table-cell text-center" style="padding:clamp(6px,0.6vw,10px) 6px">
                    <span class="inline-flex items-center gap-1 rounded-full" style="padding:2px 10px; background:${m.color}10; color:${m.color}; white-space:nowrap; font-size:clamp(0.85rem,0.7rem+0.3vw,1.2rem);"><i class="fas ${m.icon}" style="font-size:clamp(8px,0.65vw,12px)"></i>${p.category.length > 5 ? p.category.substring(0,5) + '..' : p.category}</span>
                  </td>
                  <td style="padding:clamp(6px,0.6vw,10px) 0 clamp(6px,0.6vw,10px) 6px; text-align:right;">
                    <span class="badge-status ${(p.status === '평가완료' || p.status === '발급완료') ? 'badge-complete' : (p.status === '평가진행' || p.status === '시험진행') ? 'badge-progress' : 'badge-received'}" style="font-size:clamp(0.9rem,0.75rem+0.35vw,1.3rem);">
                      <span class="badge-dot"></span>${p.status}
                    </span>
                  </td>
                </tr>`;
                }).join('') : '<tr><td colspan="3" class="text-center text-slate-400" style="padding:var(--space-xl) 0; font-size:clamp(1.1rem,0.9rem+0.5vw,1.7rem);"><i class="fas fa-chart-line text-slate-300 block" style="font-size:clamp(1.4rem,1.2vw,2rem);margin-bottom:8px"></i>등록된 현황이 없습니다.</td></tr>'}
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
       Notice Tab Menu Script (v32)
       ════════════════════════════════════════════════════════ -->
  <script>
  (function(){
    var ntDataLoaded = { downloads: false, documents: false };
    var iconMap = { pdf:'fa-file-pdf text-red-400', doc:'fa-file-word text-blue-400', docx:'fa-file-word text-blue-400', xls:'fa-file-excel text-green-400', xlsx:'fa-file-excel text-green-400', zip:'fa-file-zipper text-purple-400', hwp:'fa-file-lines text-cyan-400' };
    var colorPalette = ['rgba(59,130,246,0.06)', 'rgba(16,185,129,0.06)', 'rgba(139,92,246,0.06)', 'rgba(245,158,11,0.06)', 'rgba(6,182,212,0.06)'];

    function escH2(str) { var d = document.createElement('div'); d.textContent = str || ''; return d.innerHTML; }
    function fmtSize(bytes) {
      if (!bytes) return '';
      var kb = bytes / 1024;
      return kb < 1024 ? kb.toFixed(0) + ' KB' : (kb / 1024).toFixed(1) + ' MB';
    }

    window.switchNoticeTab = function(tabId) {
      document.querySelectorAll('.notice-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('.notice-tab-content').forEach(function(c) { c.classList.remove('active'); });
      var tab = document.querySelector('.notice-tab[data-tab="' + tabId + '"]');
      var content = document.getElementById('tab-' + tabId);
      if (tab) tab.classList.add('active');
      if (content) content.classList.add('active');
      // Lazy load downloads / documents
      if (tabId === 'downloads' && !ntDataLoaded.downloads) loadNoticeDownloads();
      if (tabId === 'documents' && !ntDataLoaded.documents) loadNoticeDocuments();
    };

    function loadNoticeDownloads() {
      fetch('/api/downloads').then(function(r) { return r.json(); }).then(function(res) {
        ntDataLoaded.downloads = true;
        var el = document.getElementById('noticeDownloadList');
        if (!el) return;
        if (!res.data || res.data.length === 0) {
          el.innerHTML = '<p class="text-slate-400 text-center" style="padding:1.5rem 0; font-size:clamp(0.8rem,0.7rem+0.2vw,0.95rem);">등록된 자료가 없습니다.</p>';
          return;
        }
        var html = '<div class="space-y-3">';
        res.data.slice(0, 5).forEach(function(d, i) {
          var ext = (d.file_name || '').split('.').pop().toLowerCase();
          var iconCls = iconMap[ext] || 'fa-file text-slate-400';
          var bgColor = colorPalette[i % colorPalette.length];
          html += '<a href="/api/downloads/' + d.id + '/file" target="_blank" class="flex items-center hover:bg-blue-50/30 px-2 py-2 rounded-lg transition-colors group" style="gap:clamp(8px,0.8vw,12px);">' +
            '<div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(36px,3vw,48px); height:clamp(36px,3vw,48px); background:' + bgColor + ';"><i class="fas ' + iconCls + '" style="font-size:clamp(14px,1.2vw,20px)"></i></div>' +
            '<div class="flex-1 min-w-0">' +
            '<span class="text-slate-700 font-medium group-hover:text-accent block truncate" style="font-size:clamp(1.1rem,0.9rem+0.5vw,1.7rem); line-height:1.2;">' + escH2(d.title) + '</span>' +
            '<span class="text-slate-400" style="font-size:clamp(0.85rem,0.7rem+0.3vw,1.2rem);">' + (ext.toUpperCase() || 'FILE') + (d.file_size ? ' · ' + fmtSize(d.file_size) : '') + ' · ' + (d.category || '일반') + '</span>' +
            '</div></a>';
        });
        html += '</div>';
        el.innerHTML = html;
      }).catch(function() {
        var el = document.getElementById('noticeDownloadList');
        if (el) el.innerHTML = '<p class="text-slate-400 text-center" style="padding:1rem 0;">데이터를 불러오지 못했습니다.</p>';
      });
    }

    function loadNoticeDocuments() {
      // Documents are also stored as downloads with category='document'
      fetch('/api/downloads').then(function(r) { return r.json(); }).then(function(res) {
        ntDataLoaded.documents = true;
        var el = document.getElementById('noticeDocumentList');
        if (!el) return;
        var docs = (res.data || []).filter(function(d) { return d.category === 'document' || d.category === 'system'; });
        if (docs.length === 0) {
          // Fallback: show static system docs
          el.innerHTML = '<div class="space-y-3">' +
            '<a href="/static/docs/architecture-diagram.html" target="_blank" class="flex items-center hover:bg-blue-50/30 px-2 py-2 rounded-lg transition-colors group" style="gap:clamp(8px,0.8vw,12px);">' +
            '<div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(36px,3vw,48px); height:clamp(36px,3vw,48px); background:rgba(59,130,246,0.06);"><i class="fas fa-sitemap text-blue-400" style="font-size:clamp(14px,1.2vw,20px)"></i></div>' +
            '<div class="flex-1 min-w-0"><span class="text-slate-700 font-medium group-hover:text-accent block truncate" style="font-size:clamp(1.1rem,0.9rem+0.5vw,1.7rem); line-height:1.2;">시스템 설계서</span><span class="text-slate-400" style="font-size:clamp(0.85rem,0.7rem+0.3vw,1.2rem);">HTML · 시스템 아키텍처</span></div></a>' +
            '<a href="/static/docs/development-guide.html" target="_blank" class="flex items-center hover:bg-blue-50/30 px-2 py-2 rounded-lg transition-colors group" style="gap:clamp(8px,0.8vw,12px);">' +
            '<div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(36px,3vw,48px); height:clamp(36px,3vw,48px); background:rgba(16,185,129,0.06);"><i class="fas fa-code text-emerald-400" style="font-size:clamp(14px,1.2vw,20px)"></i></div>' +
            '<div class="flex-1 min-w-0"><span class="text-slate-700 font-medium group-hover:text-accent block truncate" style="font-size:clamp(1.1rem,0.9rem+0.5vw,1.7rem); line-height:1.2;">개발지침서</span><span class="text-slate-400" style="font-size:clamp(0.85rem,0.7rem+0.3vw,1.2rem);">HTML · 기술 가이드</span></div></a></div>';
          return;
        }
        var html = '<div class="space-y-3">';
        docs.slice(0, 5).forEach(function(d, i) {
          var ext = (d.file_name || '').split('.').pop().toLowerCase();
          var iconCls = iconMap[ext] || 'fa-book text-blue-400';
          var bgColor = colorPalette[i % colorPalette.length];
          html += '<a href="/api/downloads/' + d.id + '/file" target="_blank" class="flex items-center hover:bg-blue-50/30 px-2 py-2 rounded-lg transition-colors group" style="gap:clamp(8px,0.8vw,12px);">' +
            '<div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(36px,3vw,48px); height:clamp(36px,3vw,48px); background:' + bgColor + ';"><i class="fas ' + iconCls + '" style="font-size:clamp(14px,1.2vw,20px)"></i></div>' +
            '<div class="flex-1 min-w-0">' +
            '<span class="text-slate-700 font-medium group-hover:text-accent block truncate" style="font-size:clamp(1.1rem,0.9rem+0.5vw,1.7rem); line-height:1.2;">' + escH2(d.title) + '</span>' +
            '<span class="text-slate-400" style="font-size:clamp(0.85rem,0.7rem+0.3vw,1.2rem);">' + (d.description || d.category || '문서') + '</span>' +
            '</div></a>';
        });
        html += '</div>';
        el.innerHTML = html;
      }).catch(function() {
        var el = document.getElementById('noticeDocumentList');
        if (el) el.innerHTML = '<p class="text-slate-400 text-center" style="padding:1rem 0;">데이터를 불러오지 못했습니다.</p>';
      });
    }
  })();
  </script>

  <!-- ════════════════════════════════════════════════════════
       EAL Simulator Script (v32 - Unified Layout)
       ════════════════════════════════════════════════════════ -->
  <script>
  (function(){
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

    updatePrepUI(50);
    updateChart();
  })();
  </script>
  `;
}
