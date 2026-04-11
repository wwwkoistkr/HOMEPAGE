// KOIST - Home Page Template (v7.0 - Ultra Premium 4K/8K HiDPI Design)
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
    /* Responsive Popup Positioning */
    .popup-responsive-container {
      /* Desktop: Positioned, draggable-style */
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: min(420px, 92vw);
      max-width: 500px;
    }
    @media (min-width: 768px) {
      .popup-responsive-container {
        width: min(440px, 80vw);
        max-width: 520px;
      }
    }
    @media (min-width: 1280px) {
      .popup-responsive-container {
        width: 460px;
        max-width: 520px;
      }
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
    // Check "don't show today" cookies
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
    
    // Remove individually hidden popups
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
    // Save "don't show today" preferences
    var today = new Date().toISOString().slice(0, 10);
    var hiddenIds = JSON.parse(localStorage.getItem('koist_popup_hidden') || '{}');
    var checkboxes = document.querySelectorAll('[id^="noshow-"]');
    checkboxes.forEach(function(cb) {
      if (cb.checked) {
        var id = cb.id.replace('noshow-', '');
        hiddenIds[id] = today;
      }
    });
    localStorage.setItem('koist_popup_hidden', JSON.stringify(hiddenIds));
    
    // Animate out
    var overlay = document.getElementById('popupOverlay');
    var container = document.getElementById('popupContainer');
    if (overlay) { overlay.style.opacity = '0'; }
    if (container) { container.style.animation = 'popupFadeOut 0.2s ease-in forwards'; }
    setTimeout(function() {
      if (overlay) overlay.remove();
      if (container) container.remove();
    }, 250);
  }
  
  // Swipe gesture support for mobile
  (function() {
    var container = document.getElementById('popupContainer');
    if (!container || totalPopups <= 1) return;
    var startX = 0, startY = 0, diffX = 0;
    container.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    container.addEventListener('touchend', function(e) {
      diffX = e.changedTouches[0].clientX - startX;
      var diffY = Math.abs(e.changedTouches[0].clientY - startY);
      if (Math.abs(diffX) > 50 && diffY < 100) {
        if (diffX < 0) nextPopup();
        else prevPopup();
      }
    }, { passive: true });
  })();

  // ESC key closes popup
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeAllPopups(); });
  </script>
  ` : ''}

  <!-- ═══════════════════════════════════════════════════════
       HERO SECTION (Premium Immersive)
       ═══════════════════════════════════════════════════════ -->
  <section class="relative overflow-hidden" style="${bgStyle(s.hero_bg_url, 'var(--grad-hero)', heroOpacity)}">
    <!-- Animated background layers -->
    ${!s.hero_bg_url ? `
    <div class="absolute inset-0 pointer-events-none">
      <!-- Gradient orbs -->
      <div class="absolute animate-float-slow" style="top:10%; left:5%; width:clamp(200px,25vw,450px); height:clamp(200px,25vw,450px); background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%); border-radius:50%; filter:blur(40px);"></div>
      <div class="absolute animate-float-medium" style="top:30%; right:8%; width:clamp(150px,20vw,350px); height:clamp(150px,20vw,350px); background: radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%); border-radius:50%; filter:blur(40px);"></div>
      <div class="absolute" style="bottom:5%; left:30%; width:clamp(180px,22vw,400px); height:clamp(180px,22vw,400px); background: radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%); border-radius:50%; filter:blur(40px);"></div>
      <!-- Grid pattern -->
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
      <!-- Floating icons -->
      <div class="absolute animate-float-slow opacity-[0.04] text-blue-400" style="top:15%; left:8%; font-size:clamp(2rem,3.5vw,3.5rem)"><i class="fas fa-shield-halved"></i></div>
      <div class="absolute animate-float-medium opacity-[0.03] text-cyan-400" style="top:40%; right:12%; font-size:clamp(1.5rem,3vw,3rem)"><i class="fas fa-lock"></i></div>
      <div class="absolute animate-pulse-glow opacity-[0.04] text-blue-300" style="bottom:20%; left:20%; font-size:clamp(1.2rem,2.2vw,2.2rem)"><i class="fas fa-key"></i></div>
    </div>
    ` : ''}

    <!-- Bottom gradient fade -->
    <div class="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style="background: linear-gradient(to top, rgba(240,244,248,0.03), transparent);"></div>

    <div class="relative fluid-container" style="padding-top:clamp(3rem,5vw,5.5rem); padding-bottom:clamp(3rem,5vw,5.5rem)">
      <div class="grid grid-cols-1 lg:grid-cols-5 items-center" style="gap:clamp(2rem, 4vw, 5rem)">

        <!-- Left: Hero Text -->
        <div class="lg:col-span-3" data-aos="fade-right" data-aos-duration="800">
          <!-- Badge -->
          <div class="inline-flex items-center rounded-full f-text-xs" style="gap:var(--space-xs); padding:6px 14px; background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.15); backdrop-filter: blur(8px);">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-50"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
            </span>
            <span class="text-blue-300 font-medium">${s.hero_badge_text || '국가 공인 정보보안 시험·평가 전문기관'}</span>
          </div>

          <!-- Headline -->
          <h1 class="text-white font-black f-text-hero" style="margin-top:var(--space-md); margin-bottom:var(--space-md)">
            ${s.site_slogan || '최상의 시험·인증 서비스로<br><span style="background: linear-gradient(135deg, #60A5FA, #22D3EE); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">정보보안 기술</span>을 완성'}
          </h1>

          <!-- Sub-headline -->
          <p class="text-slate-400/90 leading-relaxed max-w-lg f-text-base" style="margin-bottom:var(--space-lg)">
            ${s.site_sub_slogan || '정보보안 기술은 IT제품으로 구현되고 시험·인증 서비스를 통해 완성됩니다.'}
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
            <!-- Top gradient bar -->
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
       SERVICES SECTION (Bento Grid)
       ═══════════════════════════════════════════════════════ -->
  <section id="services" class="f-section-y relative overflow-hidden" style="background: #FFFFFF;">
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 opacity-[0.015]" style="background-image: radial-gradient(circle at 1px 1px, rgba(15,23,42,0.15) 1px, transparent 0); background-size: 32px 32px;"></div>

    <div class="relative fluid-container">
      <!-- Section Header -->
      <div class="text-center" style="margin-bottom: clamp(1.5rem,3vw,2.5rem)" data-aos="fade-up">
        <div class="inline-flex items-center rounded-full f-text-xs font-semibold" style="gap:6px; padding:5px 14px; margin-bottom:var(--space-sm); background: linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.04)); border: 1px solid rgba(59,130,246,0.10); color: #2563EB;">
          <i class="fas fa-cubes" style="font-size:9px"></i>Our Services
        </div>
        <h2 class="font-bold text-primary f-text-2xl" style="margin-bottom:var(--space-xs)">${s.services_title || '핵심 사업분야'}</h2>
        <p class="text-slate-500 f-text-sm max-w-md mx-auto">${s.services_subtitle || 'KOIST의 전문 시험·평가 서비스를 한눈에 확인하세요'}</p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" style="gap:clamp(0.5rem, 1.2vw, 1rem)">
        ${deps.map((dept, i) => `
        <a href="/services/${dept.slug}" class="card-service group block relative" style="--card-accent:${dept.color}; padding:clamp(0.85rem, 1.6vw, 1.3rem);" data-aos="fade-up" data-aos-delay="${i * 60}">
          <!-- Icon -->
          <div class="rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style="width:clamp(36px,3.2vw,48px); height:clamp(36px,3.2vw,48px); background: linear-gradient(135deg, ${dept.color}0C, ${dept.color}06); margin-bottom:var(--space-sm);">
            <i class="fas ${dept.icon}" style="color:${dept.color}; font-size:var(--text-lg)"></i>
          </div>
          <!-- Text -->
          <h3 class="font-bold text-primary group-hover:text-accent transition-colors f-text-sm" style="margin-bottom:4px">${dept.name}</h3>
          <p class="text-slate-500 leading-relaxed line-clamp-2 f-text-xs">${dept.description || ''}</p>
          <!-- Arrow -->
          <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">
            <i class="fas fa-arrow-right text-accent/40" style="font-size:10px"></i>
          </div>
        </a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Section divider -->
  <div class="section-divider"></div>

  <!-- ═══════════════════════════════════════════════════════
       NOTICES + PROGRESS SECTION (Premium Panels)
       ═══════════════════════════════════════════════════════ -->
  <section class="f-section-y relative overflow-hidden" style="background: var(--grad-surface);">
    <div class="relative fluid-container">
      <div class="grid grid-cols-1 lg:grid-cols-2" style="gap:clamp(1rem, 2vw, 1.5rem)">

        <!-- ── Notices Panel ── -->
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

        <!-- ── Progress Panel (Category Summary + Expandable) ── -->
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

          <!-- Category Summary Cards -->
          ${catCounts.length > 0 ? `
          <div class="grid grid-cols-2 sm:grid-cols-3" style="gap:6px; margin-bottom:var(--space-md)">
            ${catCounts.slice(0, 6).map(cc => {
              const m = catMeta[cc.category] || { icon: 'fa-circle', color: '#64748B' };
              return `
              <a href="/support/progress?category=${encodeURIComponent(cc.category)}" class="group rounded-lg border border-slate-100 hover:border-slate-200 transition-all hover:shadow-sm" style="padding:8px 10px;">
                <div class="flex items-center" style="gap:6px">
                  <i class="fas ${m.icon} f-text-xs" style="color:${m.color}"></i>
                  <span class="text-slate-600 font-medium f-text-xs truncate group-hover:text-accent transition-colors">${cc.category}</span>
                </div>
                <div class="font-bold f-text-base" style="color:${m.color}; margin-top:2px">${cc.cnt}<span class="text-slate-400 font-normal f-text-xs ml-1">건</span></div>
              </a>`;
            }).join('')}
          </div>
          ${catCounts.length > 6 ? `
          <div class="text-center" style="margin-bottom:var(--space-sm)">
            <a href="/support/progress" class="text-slate-400 hover:text-accent f-text-xs inline-flex items-center" style="gap:4px">+ ${catCounts.length - 6}개 사업 더보기 <i class="fas fa-angle-right" style="font-size:8px"></i></a>
          </div>` : ''}
          ` : ''}

          <!-- Recent Items Table -->
          <div class="overflow-x-auto -mx-1 px-1">
            <div class="text-slate-400 f-text-xs font-medium" style="margin-bottom:6px">최근 평가 현황</div>
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
    <!-- Background orbs -->
    ${!s.cta_bg_url ? `
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute animate-float-slow" style="top:15%; left:15%; width:250px; height:250px; background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%); border-radius:50%; filter:blur(50px);"></div>
      <div class="absolute animate-float-medium" style="bottom:15%; right:15%; width:200px; height:200px; background: radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%); border-radius:50%; filter:blur(50px);"></div>
    </div>
    ` : ''}

    <div class="relative fluid-container text-center" data-aos="fade-up" data-aos-duration="700">
      <!-- Label -->
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
  `;
}
