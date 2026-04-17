// KOIST - Home Page Template (v35.6.0 - P0-2: sim_cert_types→ealData 연동, P1-3: popup_close_all_text SSR)
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
  const simTypes = opts.simCertTypes || [];

  // P0-2: Build ealData from sim_cert_types (weeks→months conversion)
  // Mapping: cc-eal2→EAL2, cc-eal3→EAL3, cc-eal4→EAL4, overall→weighted average
  const W2M = 4.33; // weeks per month
  function simTypeToEal(st: SimCertType) {
    const tradMinM = Math.round(st.traditional_min_weeks / W2M);
    const tradMaxM = Math.round(st.traditional_max_weeks / W2M);
    const koistMinM = Math.round(st.koist_min_weeks / W2M);
    const koistMaxM = Math.round(st.koist_max_weeks / W2M);
    // Split traditional into prep (55%) + eval (45%) based on industry norms
    const gPrep = Math.round(tradMaxM * 0.55);
    const gEval = Math.round(tradMaxM * 0.45);
    // KOIST: min=high prep effort → shorter, max=low prep effort → longer
    // Split koist total into prep (40%) + eval (60%)
    const kPrepMin = Math.round(koistMinM * 0.40);
    const kEvalMin = Math.round(koistMinM * 0.60);
    const kPrepMax = Math.round(koistMaxM * 0.40);
    const kEvalMax = Math.round(koistMaxM * 0.60);
    return { gPrep, gEval, kPrepMin, kEvalMin, kPrepMax, kEvalMax };
  }

  const eal2Type = simTypes.find(t => t.slug === 'cc-eal2');
  const eal3Type = simTypes.find(t => t.slug === 'cc-eal3');
  const eal4Type = simTypes.find(t => t.slug === 'cc-eal4');

  // Build ealData entries from sim_cert_types with eval_* fallback
  function buildEalEntry(st: SimCertType | undefined, prefix: string) {
    if (st) {
      const d = simTypeToEal(st);
      return `{ general:{prep:${d.gPrep},eval:${d.gEval}}, koist:{prepMin:${d.kPrepMin},prepMax:${d.kPrepMax},evalMin:${d.kEvalMin},evalMax:${d.kEvalMax}} }`;
    }
    // Fallback to eval_* settings
    const gp = s[`eval_${prefix}_general_prep`] || '12';
    const ge = s[`eval_${prefix}_general_eval`] || '12';
    const kph = s[`eval_${prefix}_koist_prep_high`] || '4';
    const kpl = s[`eval_${prefix}_koist_prep_low`] || '9';
    const keh = s[`eval_${prefix}_koist_eval_high`] || '7';
    const kel = s[`eval_${prefix}_koist_eval_low`] || '11';
    return `{ general:{prep:${gp},eval:${ge}}, koist:{prepMin:${kph},prepMax:${kpl},evalMin:${keh},evalMax:${kel}} }`;
  }

  // overall = weighted average of EAL2/3/4
  function buildOverallEntry() {
    if (eal2Type && eal3Type && eal4Type) {
      const types = [eal2Type, eal3Type, eal4Type].map(simTypeToEal);
      const avg = (vals: number[]) => Math.round(vals.reduce((a,b) => a+b, 0) / vals.length);
      return `{ general:{prep:${avg(types.map(t=>t.gPrep))},eval:${avg(types.map(t=>t.gEval))}}, koist:{prepMin:${avg(types.map(t=>t.kPrepMin))},prepMax:${avg(types.map(t=>t.kPrepMax))},evalMin:${avg(types.map(t=>t.kEvalMin))},evalMax:${avg(types.map(t=>t.kEvalMax))}} }`;
    }
    return buildEalEntry(undefined, 'overall');
  }

  const ealDataOverall = buildOverallEntry();
  const ealDataEAL2 = buildEalEntry(eal2Type, 'eal2');
  const ealDataEAL3 = buildEalEntry(eal3Type, 'eal3');
  const ealDataEAL4 = buildEalEntry(eal4Type, 'eal4');

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
       POPUP SYSTEM v35.5.4 — HTML popup 13cm, Image popup per-card cm size, 8K Responsive
       ════════════════════════════════════════════════ -->
  ${popups.length > 0 ? `
  <div id="popupOverlay" class="fixed inset-0 z-[9998] transition-opacity duration-300" style="background:rgba(0,0,0,0.5); backdrop-filter:blur(4px);" onclick="closeAllPopups()"></div>
  <div id="popupContainer" class="fixed z-[9999] popup-multi-container">
    <div class="popup-close-all-bar">
      <button onclick="closeAllPopups()" class="popup-close-all-btn" data-admin-edit="popup_close_all_text">
        <i class="fas fa-times popup-close-all-icon"></i> ${s.popup_close_all_text || '모두 닫기'}
      </button>
    </div>
    <div class="popup-grid">
      ${popups.map((p, i) => {
        const titleBg = p.title_bg_color 
          ? `background:${p.title_bg_color};` 
          : `background:linear-gradient(135deg, rgba(248,250,252,0.95), rgba(241,245,249,0.95));`;
        const titleColor = p.title_color || '#1f2937';
        const titleFontSize = p.title_font_size || 14;
        const bodyFontSize = p.font_size || 14;
        const bodyTextColor = p.text_color || '#374151';
        const bodyLineHeight = p.line_height || 1.7;
        const bodyPadding = p.padding || 16;
        const bodyBgColor = p.bg_color || '#ffffff';
        const cardW = p.card_width_cm;
        const cardH = p.card_height_cm;
        const imgCardStyle = (cardW && cardH) ? `width:${cardW}cm; height:${cardH}cm;` : '';
        
        return `
      <div class="popup-card${p.popup_type === 'image' ? ' popup-card--imgtype' : ''}"
           data-popup-id="${p.id}" id="popup-${p.id}"
           style="animation: popupSlideIn ${0.3 + i * 0.1}s ease-out; ${imgCardStyle}">
        <!-- HEADER — admin-editable title -->
        <div class="popup-card-header" style="${titleBg}">
          <span class="popup-card-title" style="color:${titleColor}; font-size:${titleFontSize}px;" data-admin-edit="popup_${p.id}_title">${p.title}</span>
          <button onclick="closeSinglePopup(${p.id})" class="popup-card-close-btn" aria-label="닫기">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <!-- BODY — admin-editable content/image -->
        ${p.popup_type === 'image' && p.image_url 
          ? `<!-- IMAGE POPUP: image fills width, card height = auto -->
        <div class="popup-card-body popup-card-body--image" style="background:${bodyBgColor};">
          <div class="popup-img-wrap popup-img-wrap--fit" data-admin-edit="popup_${p.id}_image">
            <img src="${p.image_url}" alt="${p.title}" class="popup-img-fit" loading="lazy">
          </div>
        </div>
        <div class="popup-card-imgfooter">
          <button onclick="closeSinglePopup(${p.id})" class="popup-imgfooter-close-btn">
            <i class="fas fa-times" style="font-size:0.75em; margin-right:4px;"></i>닫기
          </button>
        </div>` 
          : `<!-- HTML POPUP: scrollable content with full footer -->
        <div class="popup-card-body" style="background:${bodyBgColor};">
          <div class="popup-html-wrap" style="font-size:${bodyFontSize}px; line-height:${bodyLineHeight}; color:${bodyTextColor}; padding:${bodyPadding}px;" data-admin-edit="popup_${p.id}_content">${p.content || ''}</div>
        </div>
        <div class="popup-card-footer">
          <label class="popup-noshow-label">
            <input type="checkbox" id="noshow-${p.id}" class="popup-noshow-checkbox">
            <span class="popup-noshow-text">오늘 하루 안 보기</span>
          </label>
          <button onclick="closeSinglePopup(${p.id})" class="popup-footer-close-btn">닫기</button>
        </div>`}
      </div>`;
      }).join('')}
    </div>
  </div>
  <style>
    /* ═══ POPUP SYSTEM v35.5.4 — Base (Desktop 1920px) ═══ */
    .popup-multi-container {
      top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: auto; max-width: 95vw; max-height: 95vh;
    }
    .popup-close-all-bar { text-align: center; margin-bottom: clamp(8px, 0.6vw, 16px); }
    .popup-close-all-btn {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(255,255,255,0.95); color: #374151; font-weight: 600;
      border-radius: 999px; box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      padding: 8px 20px; font-size: 13px; border: none; cursor: pointer;
      transition: all 0.2s;
    }
    .popup-close-all-btn:hover { background: #fff; transform: translateY(-1px); }
    .popup-close-all-icon { font-size: 12px; }

    .popup-grid {
      display: flex; gap: clamp(10px, 0.8vw, 20px);
      justify-content: center; align-items: stretch;
    }

    /* ═══ CARD — HTML popup: 13cm fixed, Image popup: auto (fits image) ═══ */
    .popup-card {
      width: 13cm; flex: none;
      background: #fff; border-radius: clamp(10px, 0.8vw, 20px);
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1);
      border: 1px solid rgba(226,232,240,0.5);
      display: flex; flex-direction: column;
    }
    /* Image-type popup: per-card size from DB (card_width_cm/card_height_cm) */
    .popup-card--imgtype {
      max-width: 95vw;
    }

    /* ═══ HEADER ═══ */
    .popup-card-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: clamp(8px, 0.6vw, 16px) clamp(10px, 0.8vw, 20px);
      border-bottom: 1px solid rgba(226,232,240,0.5);
      flex-shrink: 0;
    }
    .popup-card-title {
      font-weight: 600; line-height: 1.3;
      overflow: hidden; text-overflow: ellipsis;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    }
    .popup-card-close-btn {
      width: clamp(24px, 1.6vw, 40px); height: clamp(24px, 1.6vw, 40px);
      display: flex; align-items: center; justify-content: center;
      color: #9ca3af; border-radius: 8px; border: none; background: transparent;
      cursor: pointer; transition: all 0.2s; flex-shrink: 0;
    }
    .popup-card-close-btn:hover { color: #4b5563; background: rgba(0,0,0,0.05); }
    .popup-card-close-btn i { font-size: clamp(10px, 0.7vw, 16px); }

    /* ═══ BODY ═══ */
    .popup-card-body {
      flex: 1; min-height: 0; overflow: hidden;
      display: flex; flex-direction: column;
    }
    /* Image popup body: no flex grow, just fit image */
    .popup-card-body--image {
      flex: none; overflow: hidden;
    }
    /* When card has fixed cm size: body fills remaining space */
    .popup-card--sized .popup-card-body--image {
      flex: 1; min-height: 0;
      display: flex; flex-direction: column;
    }
    .popup-card--sized .popup-img-wrap--fit {
      flex: 1; min-height: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .popup-card--sized .popup-img-fit {
      width: 100%; height: 100%;
      object-fit: contain; display: block;
    }
    /* Image popups: image fills width, keeps aspect ratio */
    .popup-img-wrap--fit {
      line-height: 0; /* remove inline gap */
    }
    .popup-img-fit {
      width: 100%; height: auto; display: block;
    }
    /* HTML popups: scrollable content */
    .popup-html-wrap {
      flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch;
      min-height: 0;
    }

    /* ═══ FOOTER (HTML popups) ═══ */
    .popup-card-footer {
      display: flex; justify-content: space-between; align-items: center;
      padding: clamp(6px, 0.5vw, 14px) clamp(10px, 0.8vw, 20px);
      border-top: 1px solid rgba(226,232,240,0.5);
      background: rgba(248,250,252,0.7);
      flex-shrink: 0;
    }

    /* ═══ IMAGE FOOTER — simple close button below image ═══ */
    .popup-card-imgfooter {
      flex-shrink: 0;
      display: flex; justify-content: center; align-items: center;
      padding: clamp(8px, 0.6vw, 14px) clamp(10px, 0.8vw, 20px);
      background: rgba(248,250,252,0.95);
      border-top: 1px solid rgba(226,232,240,0.4);
    }
    .popup-imgfooter-close-btn {
      display: inline-flex; align-items: center; justify-content: center;
      font-size: clamp(11px, 0.7vw, 16px); font-weight: 600;
      color: #4b5563; background: rgba(0,0,0,0.04);
      border: 1px solid rgba(226,232,240,0.6);
      border-radius: 8px; padding: clamp(5px, 0.4vw, 10px) clamp(16px, 1.2vw, 32px);
      cursor: pointer; transition: all 0.2s;
    }
    .popup-imgfooter-close-btn:hover {
      background: rgba(0,0,0,0.08); color: #1f2937; border-color: rgba(203,213,225,0.8);
    }
    .popup-noshow-label {
      display: flex; align-items: center; gap: 6px; cursor: pointer; user-select: none;
    }
    .popup-noshow-checkbox {
      width: clamp(12px, 0.8vw, 20px); height: clamp(12px, 0.8vw, 20px);
      border-radius: 4px; accent-color: #3b82f6;
    }
    .popup-noshow-text { font-size: clamp(10px, 0.6vw, 15px); color: #6b7280; }
    .popup-footer-close-btn {
      font-size: clamp(10px, 0.65vw, 16px); color: #4b5563;
      padding: clamp(4px, 0.3vw, 8px) clamp(10px, 0.7vw, 18px);
      border-radius: 8px; border: none; background: transparent;
      cursor: pointer; font-weight: 500; transition: all 0.2s;
    }
    .popup-footer-close-btn:hover { background: rgba(0,0,0,0.05); color: #1f2937; }

    /* ═══ RESPONSIVE — Tablet (640px ~ 1023px) ═══ */
    @media (max-width: 1023px) {
      .popup-card { width: 10cm; }
      .popup-card--imgtype { max-width: 90vw; }
      .popup-grid { gap: 10px; }
    }

    /* ═══ RESPONSIVE — Mobile (≤639px) ═══ */
    @media (max-width: 639px) {
      .popup-multi-container { max-width: 95vw; max-height: 90vh; }
      .popup-grid {
        flex-direction: column; align-items: center;
        max-height: 80vh; overflow-y: auto; -webkit-overflow-scrolling: touch;
        gap: 10px;
      }
      .popup-card { width: min(90vw, 13cm); max-height: 55vh; flex: none; }
      .popup-card--imgtype { width: min(90vw, 13cm); max-width: 90vw; height: auto !important; }
      .popup-card-body { max-height: 35vh; overflow-y: auto; }
      .popup-close-all-btn { padding: 6px 14px; font-size: 11px; }
    }

    /* ═══ RESPONSIVE — Small Mobile (≤375px) ═══ */
    @media (max-width: 375px) {
      .popup-card { width: min(88vw, 11cm); max-height: 50vh; }
      .popup-card--imgtype { width: min(88vw, 11cm); max-width: 88vw; height: auto !important; }
    }

    /* ═══ HIGH-RES — 2.5K (2560px) ═══ */
    @media (min-width: 2560px) {
      .popup-card { width: 15.6cm; border-radius: 22px; }
      .popup-card--imgtype { max-width: 95vw; }
      .popup-grid { gap: 22px; }
      .popup-card-header { padding: 16px 22px; }
      .popup-card-title { font-size: 19px !important; }
      .popup-card-close-btn { width: 38px; height: 38px; }
      .popup-card-close-btn i { font-size: 16px; }
      .popup-card-footer { padding: 14px 22px; }
      .popup-card-imgfooter { padding: 14px 22px; }
      .popup-noshow-text { font-size: 15px; }
      .popup-noshow-checkbox { width: 19px; height: 19px; }
      .popup-footer-close-btn { font-size: 16px; padding: 8px 20px; }
      .popup-imgfooter-close-btn { font-size: 16px; padding: 10px 32px; }
      .popup-close-all-btn { padding: 12px 28px; font-size: 17px; }
    }

    /* ═══ HIGH-RES — 4K (3840px) ═══ */
    @media (min-width: 3840px) {
      .popup-card { width: 19.5cm; border-radius: 32px; }
      .popup-card--imgtype { max-width: 95vw; }
      .popup-grid { gap: 32px; }
      .popup-card-header { padding: 22px 30px; }
      .popup-card-title { font-size: 26px !important; }
      .popup-card-close-btn { width: 52px; height: 52px; border-radius: 14px; }
      .popup-card-close-btn i { font-size: 22px; }
      .popup-card-footer { padding: 18px 30px; }
      .popup-card-imgfooter { padding: 18px 30px; }
      .popup-noshow-text { font-size: 20px; }
      .popup-noshow-checkbox { width: 24px; height: 24px; }
      .popup-footer-close-btn { font-size: 21px; padding: 12px 26px; }
      .popup-imgfooter-close-btn { font-size: 21px; padding: 12px 40px; border-radius: 12px; }
      .popup-close-all-btn { padding: 16px 40px; font-size: 22px; }
      .popup-close-all-icon { font-size: 18px; }
    }

    /* ═══ HIGH-RES — 8K (7680px) ═══ */
    @media (min-width: 7680px) {
      .popup-card { width: 26cm; border-radius: 48px; }
      .popup-card--imgtype { max-width: 95vw; }
      .popup-grid { gap: 48px; }
      .popup-card-header { padding: 36px 44px; border-bottom-width: 2px; }
      .popup-card-title { font-size: 40px !important; }
      .popup-card-close-btn { width: 72px; height: 72px; border-radius: 18px; }
      .popup-card-close-btn i { font-size: 32px; }
      .popup-card-footer { padding: 28px 44px; border-top-width: 2px; }
      .popup-card-imgfooter { padding: 28px 44px; border-top-width: 2px; }
      .popup-noshow-text { font-size: 30px; }
      .popup-noshow-checkbox { width: 36px; height: 36px; }
      .popup-footer-close-btn { font-size: 30px; padding: 18px 40px; border-radius: 16px; }
      .popup-imgfooter-close-btn { font-size: 30px; padding: 18px 52px; border-radius: 16px; }
      .popup-close-all-btn { padding: 22px 52px; font-size: 30px; border-radius: 999px; }
      .popup-close-all-icon { font-size: 24px; }
      .popup-card { box-shadow: 0 16px 64px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.1); }
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
  <section class="unified-hero-section relative" style="overflow: visible; ${bgStyle(s.hero_bg_url, `linear-gradient(135deg, ${s.hero_gradient_color1 || '#070B14'} 0%, ${s.hero_gradient_color2 || '#0A1128'} 25%, ${s.hero_gradient_color3 || '#0F1E3D'} 45%, ${s.hero_gradient_color4 || '#162D5A'} 70%, ${s.hero_gradient_color5 || '#1A3A6E'} 100%)`, heroOpacity)}">
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
          <!-- Badge (8K fluid, admin-editable) -->
          <div class="inline-flex items-center rounded-full hero-badge-pill" style="gap:clamp(4px,0.29vw,8px); padding:clamp(4px,0.29vw,8px) clamp(9px,0.66vw,22px); margin-bottom:clamp(0.59rem,0.81vw,1.57rem); background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.18); backdrop-filter: blur(12px);">
            <span class="relative flex" style="height:clamp(7px,0.42vw,16px); width:clamp(7px,0.42vw,16px);">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
              <span class="relative inline-flex rounded-full h-full w-full bg-emerald-400"></span>
            </span>
            <span class="text-blue-300 font-semibold tracking-wide" data-admin-edit="hero_badge_text" style="font-size:clamp(0.69rem,0.51vw,2.45rem); font-family:'Inter','Noto Sans KR',sans-serif; letter-spacing:0.04em;">${s.hero_badge_text || 'Korean Information Security Technology'}</span>
          </div>

          <!-- Headline — 8K fluid (admin-editable) -->
          <h1 class="text-white font-black hero-headline" data-admin-edit="hero_line1" style="font-size:clamp(1.08rem, 1.53vw, 7.35rem); line-height:1.1; margin-bottom:clamp(0.39rem,0.55vw,1.18rem); letter-spacing:-0.03em; -webkit-font-smoothing:antialiased; text-rendering:geometricPrecision;">
            ${s.hero_line1 || '정보보안 시험·인증 전문기관'}
          </h1>

          <!-- Subtitle — 8K fluid (admin-editable) -->
          <p class="text-slate-300/90 font-medium hero-subtitle" data-admin-edit="hero_line2" style="font-size:clamp(0.69rem, 0.66vw, 3.15rem); line-height:1.35; margin-bottom:clamp(0.88rem,1.09vw,2.35rem); max-width:clamp(336px,24.5vw,1260px); text-rendering:optimizeLegibility;">
            ${s.hero_line2 || 'IT제품 보안성 평가·인증의 원스톱 서비스, <span class="hero-gradient-text">한국정보보안기술원</span>'}
          </p>

          <!-- CTA Buttons — 8K fluid (admin-editable) -->
          <div class="flex flex-wrap" style="gap:clamp(0.39rem,0.44vw,1.09rem); margin-bottom:clamp(0.98rem,1.27vw,2.74rem);">
            <a href="/support/inquiry" class="btn-glow ripple-btn inline-flex items-center font-bold rounded-xl transition-all hover:scale-[1.03] active:scale-[0.98]" style="gap:clamp(4px,0.29vw,10px); padding:clamp(0.44rem,0.48vw,0.94rem) clamp(0.88rem,1.02vw,2.20rem); font-size:clamp(0.69rem,0.58vw,2.8rem);">
              <i class="fas fa-paper-plane" style="font-size:clamp(0.50rem,0.36vw,0.86rem)"></i> <span data-admin-edit="hero_btn_primary">${s.hero_btn_primary || '온라인 상담'}</span>
            </a>
            <a href="#services" class="btn-ghost ripple-btn inline-flex items-center font-bold rounded-xl transition-all hover:scale-[1.03] active:scale-[0.98]" style="gap:clamp(4px,0.29vw,10px); padding:clamp(0.44rem,0.48vw,0.94rem) clamp(0.88rem,1.02vw,2.20rem); font-size:clamp(0.69rem,0.58vw,2.8rem);">
              <i class="fas fa-th-large" style="font-size:clamp(0.50rem,0.36vw,0.86rem)"></i> <span data-admin-edit="hero_btn_secondary">${s.hero_btn_secondary || '사업분야 보기'}</span>
            </a>
          </div>

          <!-- ═══════ Hero Contact Card (8K fluid, admin-editable) ═══════ -->
          <div class="hero-contact-card" data-aos="fade-up" data-aos-delay="200">
            <p class="text-slate-300/90 font-bold hero-contact-label" data-admin-edit="hero_contact_label" style="font-size:clamp(0.69rem,0.73vw,3.5rem); margin-bottom:clamp(0.49rem,0.66vw,1.41rem); letter-spacing:0.01em; text-rendering:geometricPrecision;">${s.hero_contact_label || '국가 시험·인증 전문기관 정보보안 기술을 완성'}</p>
            <div class="hero-contact-grid">
              <div class="hero-contact-item">
                <div class="hero-contact-icon"><i class="fas fa-phone"></i></div>
                <span data-admin-edit="phone">${s.phone || '02-586-1230'}</span>
              </div>
              <div class="hero-contact-item">
                <div class="hero-contact-icon"><i class="fas fa-fax"></i></div>
                <span>FAX: <span data-admin-edit="fax">${s.fax || '02-586-1238'}</span></span>
              </div>
              <div class="hero-contact-item">
                <div class="hero-contact-icon"><i class="fas fa-envelope"></i></div>
                <span data-admin-edit="email">${s.email || 'koist@koist.kr'}</span>
              </div>
              <div class="hero-contact-item">
                <div class="hero-contact-icon"><i class="fas fa-location-dot"></i></div>
                <span class="hero-contact-addr" data-admin-edit="address">${s.address || '서울특별시 서초구 효령로 336 윤일빌딩 4층 한국정보보안기술원'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══════ RIGHT: Interactive Simulator Panel ═══════ -->
        <div class="unified-hero-right" data-aos="fade-left" data-aos-duration="700" data-aos-delay="150">
          <div class="unified-sim-panel" id="simCard">
            <!-- Panel Header — Dark Navy (8K fluid, admin-editable) -->
            <div class="unified-sim-header">
              <div class="flex items-center" style="gap:clamp(8px,0.6vw,18px);">
                <div class="rounded-xl flex items-center justify-center shrink-0" style="width:clamp(30px,1.88vw,60px); height:clamp(30px,1.88vw,60px); background: linear-gradient(135deg, rgba(59,130,246,0.20), rgba(6,182,212,0.15)); border: 1px solid rgba(59,130,246,0.20);">
                  <i class="fas fa-chart-bar text-blue-400" style="font-size:clamp(11px,0.73vw,22px)"></i>
                </div>
                <div style="min-width:0;">
                  <p class="text-white font-bold truncate sim-panel-title" data-admin-edit="unified_panel_title" style="font-size:clamp(0.95rem,1.04vw,5rem); line-height:1.3; letter-spacing:-0.01em;">${s.unified_panel_title || 'KOIST와 함께라면 평가기간을 <span class="text-cyan-300">대폭 단축</span>합니다'}</p>
                  <p class="text-slate-400/80 truncate sim-panel-subtitle" data-admin-edit="unified_panel_subtitle" style="font-size:clamp(0.72rem,0.73vw,3.5rem); margin-top:2px;">${s.unified_panel_subtitle || '사전준비 수준에 따라 실시간으로 기간을 산출합니다'}</p>
                </div>
              </div>
              <div class="hidden sm:flex items-center rounded-full shrink-0" style="gap:clamp(3px,0.26vw,8px); padding:clamp(4px,0.31vw,10px) clamp(10px,0.73vw,24px); background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.22);">
                <span class="text-white font-black" style="font-size:clamp(0.85rem,0.78vw,3.5rem)" id="headerReductionPct" data-admin-edit="unified_reduction_default">${defaultReduction}%</span>
                <span class="text-blue-300/90 font-medium" style="font-size:clamp(0.58rem,0.52vw,2.2rem)" data-admin-edit="unified_reduction_label">${s.unified_reduction_label || '평균 단축'}</span>
              </div>
            </div>

            <!-- Panel Body — White -->
            <div class="unified-sim-body">
              <!-- Tab Bar (8K fluid, admin-editable) -->
              <div class="eal-tabs flex rounded-xl overflow-hidden" style="margin-bottom:clamp(0.6rem,0.68vw,1.28rem); border:clamp(1px,0.05vw,4px) solid rgba(226,232,240,0.70); background: rgba(248,250,252,0.80);">
                <button class="eal-tab active flex-1 text-center font-bold transition-all" style="padding:clamp(6px,0.47vw,12px) 0; font-size:clamp(0.68rem,0.73vw,3.5rem);" data-eal="overall" onclick="switchEAL('overall')" data-admin-edit="sim_tab_overall">${s.sim_tab_overall || '전체평균'}</button>
                <button class="eal-tab flex-1 text-center font-bold transition-all" style="padding:clamp(6px,0.47vw,12px) 0; font-size:clamp(0.68rem,0.73vw,3.5rem); border-left:clamp(1px,0.05vw,4px) solid rgba(226,232,240,0.70);" data-eal="EAL2" onclick="switchEAL('EAL2')" data-admin-edit="sim_tab_eal2">${s.sim_tab_eal2 || 'EAL2'}</button>
                <button class="eal-tab flex-1 text-center font-bold transition-all" style="padding:clamp(6px,0.47vw,12px) 0; font-size:clamp(0.68rem,0.73vw,3.5rem); border-left:clamp(1px,0.05vw,4px) solid rgba(226,232,240,0.70);" data-eal="EAL3" onclick="switchEAL('EAL3')" data-admin-edit="sim_tab_eal3">${s.sim_tab_eal3 || 'EAL3'}</button>
                <button class="eal-tab flex-1 text-center font-bold transition-all" style="padding:clamp(6px,0.47vw,12px) 0; font-size:clamp(0.68rem,0.73vw,3.5rem); border-left:clamp(1px,0.05vw,4px) solid rgba(226,232,240,0.70);" data-eal="EAL4" onclick="switchEAL('EAL4')" data-admin-edit="sim_tab_eal4">${s.sim_tab_eal4 || 'EAL4'}</button>
              </div>

              <!-- Preparation Slider — 8K Ultra-Sharp (admin-editable) -->
              <div class="rounded-xl" style="padding:clamp(0.5rem,0.52vw,1.12rem) clamp(0.7rem,0.73vw,1.44rem); margin-bottom:clamp(0.6rem,0.68vw,1.28rem); background: linear-gradient(135deg, rgba(16,185,129,0.035), rgba(59,130,246,0.025)); border: clamp(1px,0.05vw,4px) solid rgba(16,185,129,0.10);">
                <div class="flex items-center" style="gap:clamp(0.4rem,0.47vw,0.96rem)">
                  <div class="flex items-center shrink-0" style="gap:clamp(3px,0.26vw,8px)">
                    <i class="fas fa-clipboard-check text-emerald-500" style="font-size:clamp(10px,0.63vw,20px)"></i>
                    <span class="font-bold text-slate-700" data-admin-edit="sim_label_prep" style="font-size:clamp(0.7rem,0.73vw,3.5rem)">${s.sim_label_prep || '사전준비'}</span>
                  </div>
                  <div class="flex-1 flex items-center" style="gap:clamp(0.2rem,0.31vw,0.64rem)">
                    <span class="text-slate-400 shrink-0" style="font-size:clamp(9px,0.52vw,16px); font-weight:600;">1</span>
                    <div class="flex-1 relative" style="height:clamp(30px,2.08vw,60px);">
                      <div class="absolute left-0 right-0" style="top:50%; transform:translateY(-50%); height:clamp(6px,0.42vw,12px); border-radius:clamp(3px,0.21vw,6px); background: linear-gradient(90deg, #EF4444 0%, #F59E0B 25%, #10B981 60%, #3B82F6 100%); opacity:0.20;"></div>
                      <div id="prepFill" class="absolute left-0" style="top:50%; transform:translateY(-50%); height:clamp(6px,0.42vw,12px); border-radius:clamp(3px,0.21vw,6px); width:50%; background: linear-gradient(90deg, #EF4444 0%, #F59E0B 30%, #10B981 70%, #3B82F6 100%); transition: width 0.12s ease; box-shadow:0 2px 6px rgba(0,0,0,0.08);"></div>
                      <input type="range" id="prepSlider" min="1" max="100" step="1" value="50"
                        class="prep-range"
                        style="width:100%; position:absolute; top:50%; transform:translateY(-50%); cursor:pointer; -webkit-appearance:none; appearance:none; height:clamp(6px,0.42vw,12px); border-radius:clamp(3px,0.21vw,6px); background: transparent; outline:none; z-index:2;"
                        oninput="onPrepChange(this.value)">
                    </div>
                    <span class="text-slate-400 shrink-0" style="font-size:clamp(9px,0.52vw,16px); font-weight:600;">100</span>
                    <div id="prepBadge" class="shrink-0 flex items-center rounded-full font-bold transition-all" style="gap:2px; padding:clamp(3px,0.21vw,6px) clamp(8px,0.52vw,18px); min-width:clamp(48px,3.13vw,96px); justify-content:center; background: rgba(16,185,129,0.10); border: clamp(1px,0.05vw,3px) solid rgba(16,185,129,0.20); color: #10B981; font-size:clamp(0.65rem,0.63vw,3rem);">
                      <span id="prepValueText">50</span><span style="font-size:0.7em; opacity:0.7">%</span>
                    </div>
                  </div>
                </div>
                <!-- Level guide dots (admin-editable) -->
                <div class="flex items-center justify-between" style="margin-top:clamp(3px,0.21vw,8px); padding:0 0 0 clamp(65px,5.73vw,140px);">
                  <div class="flex items-center" style="gap:clamp(2px,0.16vw,4px)"><span class="inline-block rounded-full" style="width:clamp(4px,0.31vw,8px); height:clamp(4px,0.31vw,8px); background:#EF4444;"></span><span class="text-slate-400 font-medium" data-admin-edit="sim_slider_level1" style="font-size:clamp(8px,0.63vw,3rem)">${s.sim_slider_level1 || '미흡'}</span></div>
                  <div class="flex items-center" style="gap:clamp(2px,0.16vw,4px)"><span class="inline-block rounded-full" style="width:clamp(4px,0.31vw,8px); height:clamp(4px,0.31vw,8px); background:#F59E0B;"></span><span class="text-slate-400 font-medium" data-admin-edit="sim_slider_level2" style="font-size:clamp(8px,0.63vw,3rem)">${s.sim_slider_level2 || '보통'}</span></div>
                  <div class="flex items-center" style="gap:clamp(2px,0.16vw,4px)"><span class="inline-block rounded-full" style="width:clamp(4px,0.31vw,8px); height:clamp(4px,0.31vw,8px); background:#10B981;"></span><span class="text-slate-400 font-medium" data-admin-edit="sim_slider_level3" style="font-size:clamp(8px,0.63vw,3rem)">${s.sim_slider_level3 || '양호'}</span></div>
                  <div class="flex items-center" style="gap:clamp(2px,0.16vw,4px)"><span class="inline-block rounded-full" style="width:clamp(4px,0.31vw,8px); height:clamp(4px,0.31vw,8px); background:#3B82F6;"></span><span class="text-slate-400 font-medium" data-admin-edit="sim_slider_level4" style="font-size:clamp(8px,0.63vw,3rem)">${s.sim_slider_level4 || '우수'}</span></div>
                </div>
              </div>

              <!-- Bar Charts — 8K Ultra-Sharp (admin-editable) -->
              <div id="ealPanel" class="bar-chart-container" style="display:flex; flex-direction:column; gap:clamp(0.5rem,0.52vw,1.12rem);">
                <!-- CCRA bar -->
                <div>
                  <div class="flex justify-between items-center" style="margin-bottom:clamp(3px,0.21vw,6px)">
                    <span class="text-slate-500 font-semibold flex items-center" style="gap:clamp(3px,0.21vw,6px); font-size:clamp(0.68rem,0.73vw,3.5rem)"><span class="inline-block rounded-full" style="width:clamp(5px,0.36vw,10px); height:clamp(5px,0.36vw,10px); background: linear-gradient(135deg, #94A3B8, #64748B);"></span><span data-admin-edit="sim_label_traditional">${s.sim_label_traditional || 'CCRA평가일수'}</span></span>
                    <span id="ealGeneralTotal" class="text-slate-400 font-bold" style="font-size:clamp(0.68rem,0.73vw,3.5rem)">약 24개월</span>
                  </div>
                  <div class="relative rounded-xl overflow-hidden" style="height:clamp(32px,2.34vw,72px); background: linear-gradient(90deg, #F1F5F9, #E2E8F0);">
                    <div id="ealGeneralBar" class="bar-animate eal-bar absolute left-0 top-0 h-full rounded-xl flex items-center" style="width:100%; background: linear-gradient(90deg, #F59E0B 0%, #F59E0B 50%, #94A3B8 50%, #94A3B8 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.06);">
                      <span id="ealGeneralPrep" class="absolute text-white font-bold" style="left:clamp(6px,0.47vw,14px); font-size:clamp(0.6rem,0.68vw,3.25rem); text-shadow:0 1px 4px rgba(0,0,0,0.35); letter-spacing:-0.01em;">준비 12개월</span>
                      <span id="ealGeneralEval" class="absolute text-white font-bold" style="right:clamp(6px,0.47vw,14px); font-size:clamp(0.6rem,0.68vw,3.25rem); text-shadow:0 1px 4px rgba(0,0,0,0.35); letter-spacing:-0.01em;">평가 12개월</span>
                    </div>
                  </div>
                </div>

                <!-- KOIST bar -->
                <div>
                  <div class="flex justify-between items-center" style="margin-bottom:clamp(3px,0.21vw,6px)">
                    <span class="text-accent font-bold flex items-center" style="gap:clamp(3px,0.21vw,6px); font-size:clamp(0.68rem,0.73vw,3.5rem)"><span class="inline-block rounded-full" style="width:clamp(5px,0.36vw,10px); height:clamp(5px,0.36vw,10px); background: linear-gradient(135deg, #2563EB, #06B6D4);"></span><i class="fas fa-bolt text-yellow-500" style="font-size:clamp(7px,0.42vw,14px); margin-right:2px;"></i><span data-admin-edit="sim_label_koist">${s.sim_label_koist || 'KOIST 평가 프로세스'}</span></span>
                    <span id="ealKoistTotal" class="text-accent font-bold" style="font-size:clamp(0.68rem,0.73vw,3.5rem)">약 15개월</span>
                  </div>
                  <div class="relative rounded-xl overflow-hidden" style="height:clamp(32px,2.34vw,72px); background: linear-gradient(90deg, #F1F5F9, #E2E8F0);">
                    <div id="ealKoistBar" class="bar-animate eal-bar absolute left-0 top-0 h-full rounded-xl flex items-center" style="width:62.5%; background: linear-gradient(90deg, #F59E0B 0%, #F59E0B 40%, #3B82F6 40%, #3B82F6 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.06);">
                      <span id="ealKoistPrep" class="absolute text-white font-bold" style="left:clamp(6px,0.47vw,14px); font-size:clamp(0.6rem,0.68vw,3.25rem); text-shadow:0 1px 4px rgba(0,0,0,0.35); letter-spacing:-0.01em;">준비 6개월</span>
                      <span id="ealKoistEval" class="absolute text-white font-bold" style="right:clamp(6px,0.47vw,14px); font-size:clamp(0.6rem,0.68vw,3.25rem); text-shadow:0 1px 4px rgba(0,0,0,0.35); letter-spacing:-0.01em;">평가 9개월</span>
                    </div>
                  </div>
                </div>

                <!-- Result Summary Strip — 8K fluid (admin-editable) -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl" style="gap:clamp(0.4rem,0.36vw,0.8rem); padding:clamp(0.5rem,0.52vw,1.12rem) clamp(0.6rem,0.68vw,1.44rem); background: linear-gradient(135deg, rgba(59,130,246,0.04), rgba(6,182,212,0.025)); border: clamp(1px,0.05vw,4px) solid rgba(59,130,246,0.10);">
                  <div class="flex items-center" style="gap:clamp(0.4rem,0.36vw,0.8rem)">
                    <div id="ealReductionBadge" class="shrink-0 rounded-xl flex items-center justify-center" style="width:clamp(36px,2.08vw,72px); height:clamp(36px,2.08vw,72px); background: linear-gradient(135deg, #2563EB, #06B6D4); box-shadow: 0 4px 16px rgba(37,99,235,0.25); border-radius:clamp(8px,0.63vw,24px);">
                      <span class="text-white font-black" style="font-size:clamp(0.78rem,0.73vw,3.5rem); text-rendering:geometricPrecision;">${defaultReduction}%</span>
                    </div>
                    <div>
                      <p id="ealReductionText" class="text-primary font-bold" style="font-size:clamp(0.72rem,0.68vw,3.25rem)">평가기간 약 ${defaultReduction}% 단축</p>
                      <p id="ealSavingText" class="text-slate-500" style="font-size:clamp(0.58rem,0.52vw,2.5rem)">약 9개월 절감 &middot; 원스톱 서비스</p>
                    </div>
                  </div>
                  <div class="flex items-center flex-wrap" style="gap:clamp(6px,0.36vw,12px)">
                    <span id="simKoistPrepResult" class="font-medium" style="font-size:clamp(0.62rem,0.57vw,2.75rem); color:#F59E0B"><i class="fas fa-file-pen" style="font-size:clamp(7px,0.42vw,14px); margin-right:2px;"></i>준비 <strong>6</strong>개월</span>
                    <span id="simKoistEvalResult" class="font-medium" style="font-size:clamp(0.62rem,0.57vw,2.75rem); color:#3B82F6"><i class="fas fa-magnifying-glass" style="font-size:clamp(7px,0.42vw,14px); margin-right:2px;"></i>평가 <strong>9</strong>개월</span>
                    <span class="text-slate-300">|</span>
                    <span class="font-medium" style="font-size:clamp(0.62rem,0.57vw,2.75rem); color:#64748B"><strong>${totalEvals}</strong>건 평가실적</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ═══════ Unified Hero + Simulator Styles — v35.3.1 Hero bottom-align, 30% text reduce, Slider -2cm ═══════ -->
  <style>
    .unified-hero-section {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: geometricPrecision;
    }
    /* v35.3.1: align-items:end, hero text ×0.7, slider margin-left:-2cm */
    .unified-hero-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(1.5rem, 2.5vw, 2.5rem);
      align-items: end;
      overflow: visible;
    }
    .unified-hero-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: none;
      width: calc(100% + 7cm);
    }
    .unified-hero-right {
      display: flex;
      flex-direction: column;
      margin-left: -6cm;
      width: calc(100% + 9cm);
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

    /* ═══ Hero Contact Card (v30.0 — 2.5x enlarged, 8K Ultra-Sharp, Windows/Mobile compat) ═══ */
    .hero-contact-card {
      padding: clamp(0.69rem,1.23vw,1.37rem) clamp(0.88rem,1.57vw,1.72rem);
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: clamp(7px,0.88vw,14px);
      max-width: 380px;
    }
    @supports not (backdrop-filter: blur(1px)) {
      .hero-contact-card { background: rgba(10,15,30,0.88); }
    }
    .hero-contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(0.34rem,0.54vw,0.59rem) clamp(0.59rem,1.08vw,1.08rem);
    }
    .hero-contact-item {
      display: flex;
      align-items: center;
      gap: clamp(5px,0.59vw,8px);
      font-size: clamp(0.62rem,0.78vw,0.81rem);
      color: rgba(220,230,245,0.92);
      white-space: nowrap;
      overflow-wrap: break-word;
      line-height: 1.45;
      font-weight: 500;
      letter-spacing: -0.01em;
      -webkit-font-smoothing: antialiased;
      text-rendering: geometricPrecision;
    }
    .hero-contact-addr {
      white-space: normal;
      line-height: 1.55;
    }
    .hero-contact-icon {
      width: clamp(19px,1.86vw,27px);
      height: clamp(19px,1.86vw,27px);
      border-radius: clamp(4px,0.39vw,7px);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(59,130,246,0.12);
      color: rgba(96,165,250,0.90);
      font-size: clamp(7px,0.78vw,11px);
      flex-shrink: 0;
    }

    /* ── Responsive: Tablet → 1 column stack, reset shift ── */
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
      .hero-contact-card { margin-left: auto; margin-right: auto; text-align: left; max-width: 94%; padding: clamp(0.7rem,2.5vw,1rem) clamp(0.9rem,3vw,1.2rem); }
      .hero-contact-item { font-size: clamp(0.70rem, 1.96vw, 1.02rem); }
      .hero-contact-icon { width: clamp(27px, 4.2vw, 35px); height: clamp(27px, 4.2vw, 35px); font-size: clamp(10px, 1.75vw, 14px); }
      /* Hero text mobile adapt (×0.7) */
      .hero-headline { font-size: clamp(1.12rem, 3.85vw, 1.68rem) !important; }
      .hero-subtitle { font-size: clamp(0.63rem, 1.96vw, 0.81rem) !important; max-width: 100% !important; }
      .hero-badge-pill span[data-admin-edit] { font-size: clamp(0.53rem, 1.54vw, 0.67rem) !important; }
      /* Sim panel mobile adapt */
      .sim-panel-title { font-size: clamp(0.9rem, 3vw, 1.15rem) !important; }
      .sim-panel-subtitle { font-size: clamp(0.72rem, 2.2vw, 0.88rem) !important; }
    }
    /* Mobile (639px) */
    @media (max-width: 639px) {
      .unified-sim-header { flex-direction: column; align-items: flex-start; gap: 8px; }
      .unified-sim-header .hidden.sm\\:flex { display: flex !important; }
      .hero-contact-grid { grid-template-columns: 1fr; gap: clamp(0.7rem,2.5vw,1rem); }
      .hero-contact-item { white-space: normal; font-size: clamp(0.67rem, 2.8vw, 0.84rem); word-break: keep-all; overflow-wrap: break-word; }
      .hero-contact-icon { width: 28px; height: 28px; font-size: 11px; border-radius: 7px; }
      .hero-contact-card { padding: clamp(0.84rem,2.8vw,1.12rem) clamp(0.98rem,3.15vw,1.26rem); border-radius: 11px; }
      .hero-contact-card p { font-size: clamp(0.74rem, 2.94vw, 0.91rem) !important; }
      .hero-headline { font-size: clamp(0.98rem, 4.55vw, 1.4rem) !important; }
      .hero-subtitle { font-size: clamp(0.60rem, 2.45vw, 0.74rem) !important; }
    }
    /* Very small mobile (375px) */
    @media (max-width: 375px) {
      .hero-contact-item { font-size: 0.64rem; gap: 6px; }
      .hero-contact-icon { width: 24px; height: 24px; font-size: 10px; }
      .hero-headline { font-size: 0.91rem !important; }
      .hero-subtitle { font-size: 0.57rem !important; }
    }

    /* ── 2.5K (2560px) — Hero + Slider Overrides (hero text ×0.7) ── */
    @media (min-width: 2560px) {
      .hero-badge-pill span[data-admin-edit] { font-size: 0.82rem !important; }
      .hero-headline { font-size: 2.45rem !important; }
      .hero-subtitle { font-size: 1.05rem !important; }
      .sim-panel-title { font-size: 1.67rem !important; }
      .sim-panel-subtitle { font-size: 1.17rem !important; }
      .hero-contact-item { font-size: 1.26rem; gap: 13px; }
      .hero-contact-icon { width: 41px; height: 41px; font-size: 17px; border-radius: 10px; }
      .hero-contact-card { max-width: 630px; padding: 1.75rem 2.24rem; border-radius: 20px; }
      .hero-contact-card p { font-size: 1.33rem !important; }
      .hero-contact-label { font-size: 1.17rem !important; }
    }

    /* ── 4K (3840px) — Hero + Slider Overrides (hero text ×0.7) ── */
    @media (min-width: 3840px) {
      .unified-hero-grid { gap: 4rem; }
      .unified-hero-left { }
      /* Hero text 4K overrides (×0.7) */
      .hero-badge-pill { padding: 8px 22px !important; gap: 8px !important; border-width: 2px !important; }
      .hero-badge-pill span[data-admin-edit] { font-size: 1.23rem !important; }
      .hero-headline { font-size: 3.68rem !important; }
      .hero-subtitle { font-size: 1.58rem !important; max-width: 672px !important; }
      /* Sim panel 4K overrides (unchanged) */
      .unified-sim-panel { border-radius: 28px; }
      .unified-sim-header { padding: 1.8rem 2.5rem; }
      .unified-sim-body { padding: 2rem 2.5rem; }
      .sim-panel-title { font-size: 2.5rem !important; }
      .sim-panel-subtitle { font-size: 1.75rem !important; }
      .eal-tab { padding: 14px 0 !important; font-size: 1.75rem !important; }
      .prep-range::-webkit-slider-thumb { width: 44px !important; height: 44px !important; border-width: 5px !important; }
      .hero-contact-card { max-width: 770px; padding: 2.24rem 2.8rem; border-radius: 22px; border-width: 2px !important; }
      .hero-contact-icon { width: 53px; height: 53px; font-size: 21px; border-radius: 13px; }
      .hero-contact-item { font-size: 1.61rem; gap: 15px; }
      .hero-contact-grid { gap: 1.26rem 2.45rem; }
      .hero-contact-card p { font-size: 1.68rem !important; }
      .hero-contact-label { font-size: 1.75rem !important; }
      /* Bar chart 4K overrides (unchanged) */
      .bar-chart-container { gap: 1.12rem !important; }
      .eal-bar span { font-size: 1.6rem !important; }
    }

    /* ── 8K (7680px) Ultra-Sharp — Full Hero + Slider Overrides (hero text ×0.7) ── */
    @media (min-width: 7680px) {
      .unified-hero-grid { gap: 6rem; }
      .unified-hero-left { }
      /* Hero text 8K overrides (×0.7) */
      .hero-badge-pill { padding: 17px 45px !important; gap: 17px !important; margin-bottom: 3.15rem !important; border-width: 3px !important; border-radius: 56px !important; }
      .hero-badge-pill span[data-admin-edit] { font-size: 2.45rem !important; }
      .hero-headline { font-size: 7.35rem !important; margin-bottom: 2.38rem !important; }
      .hero-subtitle { font-size: 3.15rem !important; margin-bottom: 4.69rem !important; max-width: 1260px !important; line-height: 1.4 !important; }
      /* Sim panel 8K overrides (unchanged) */
      .unified-sim-panel { border-radius: 56px; box-shadow: 0 24px 120px rgba(0,0,0,0.3), 0 8px 40px rgba(0,0,0,0.12); }
      .unified-sim-header { padding: 3rem 4rem; }
      .unified-sim-body { padding: 3.5rem 4rem; }
      .sim-panel-title { font-size: 5rem !important; }
      .sim-panel-subtitle { font-size: 3.5rem !important; }
      .eal-tab { padding: 28px 0 !important; font-size: 3.5rem !important; }
      .prep-range::-webkit-slider-thumb { width: 88px !important; height: 88px !important; border-width: 10px !important; }
      .hero-contact-card { max-width: 1260px; padding: 3.5rem 4.55rem; border-radius: 39px; border-width: 3px !important; }
      .hero-contact-icon { width: 77px; height: 77px; font-size: 31px; border-radius: 18px; }
      .hero-contact-item { font-size: 2.52rem; gap: 22px; }
      .hero-contact-grid { gap: 1.96rem 3.85rem; }
      .hero-contact-card p { font-size: 2.38rem !important; }
      .hero-contact-label { font-size: 3.5rem !important; }
      /* Bar chart 8K overrides (unchanged) */
      .bar-chart-container { gap: 2.24rem !important; }
      .eal-bar span { font-size: 3.25rem !important; }
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
  </style>

  <!-- ════════════════════════════════════════════════════════
       SERVICES SECTION (v32 - 2x Text Enlarged, Premium Bento Grid)
       ════════════════════════════════════════════════════════ -->
  <section id="services" class="relative overflow-hidden" style="background: #FFFFFF; padding: clamp(1.5rem,2.5vw,2.5rem) 0;">
    <div class="absolute inset-0 opacity-[0.012]" style="background-image: radial-gradient(circle at 1px 1px, rgba(15,23,42,0.15) 1px, transparent 0); background-size: 32px 32px;"></div>

    <div class="relative fluid-container">
      <div class="text-center" style="margin-bottom: clamp(0.8rem,1.5vw,1.5rem)" data-aos="fade-up">
        <div class="inline-flex items-center rounded-full font-semibold" style="gap:8px; padding:6px 18px; margin-bottom:var(--space-xs); background: linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.04)); border: 1px solid rgba(59,130,246,0.10); color: #2563EB; font-size: clamp(0.76rem, 0.62rem + 0.36vw, 1.12rem);">
          <i class="fas fa-cubes" style="font-size:clamp(11px,0.9vw,16px)"></i>KOIST 사업분야
        </div>
        <h2 class="font-bold text-primary" style="font-size: clamp(1.44rem, 1.08rem + 0.92vw, 2.56rem); margin-bottom:var(--space-2xs); line-height:1.2;">${s.services_title || '핵심 사업분야'}</h2>
        <p class="text-slate-500 max-w-lg mx-auto" style="font-size: clamp(0.88rem, 0.72rem + 0.42vw, 1.36rem); line-height:1.25;">${s.services_subtitle || 'KOIST의 전문 시험·평가 서비스를 한눈에 확인하세요'}</p>
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
          <span class="font-bold text-primary" style="font-size:clamp(0.85rem,0.72rem+0.38vw,1.15rem);">공지사항 / 자료실 / 시스템문서 / 오시는길</span>
        </span>
        <span class="flex items-center" style="gap:6px;">
          <span class="text-slate-400 font-medium" style="font-size:clamp(0.7rem,0.6rem+0.2vw,0.85rem);">펼쳐보기</span>
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
                  <p class="font-bold text-primary" style="font-size:clamp(0.85rem,0.75rem+0.3vw,1.1rem); line-height:1.3; margin-bottom:3px;">(주)한국정보보안기술원</p>
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

          <!-- Tab Content: 자료실 -->
          <div class="notice-tab-content" id="tab-downloads">
            <div class="flex justify-end" style="margin-bottom:clamp(0.3rem,0.5vw,0.5rem);">
              <a href="/support/downloads" class="text-accent font-semibold hover:underline inline-flex items-center" style="gap:4px; font-size:clamp(1.0rem, 0.85rem + 0.4vw, 1.5rem);">전체보기 <i class="fas fa-chevron-right" style="font-size:clamp(9px,0.7vw,12px)"></i></a>
            </div>
            <div style="padding:clamp(1rem,1.5vw,1.5rem) 0;">
              <div class="space-y-3">
                <a href="/support/downloads" class="flex items-center hover:bg-blue-50/30 px-2 py-2 rounded-lg transition-colors group" style="gap:clamp(8px,0.8vw,12px);">
                  <div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(36px,3vw,48px); height:clamp(36px,3vw,48px); background:rgba(59,130,246,0.06);"><i class="fas fa-file-pdf text-red-400" style="font-size:clamp(14px,1.2vw,20px)"></i></div>
                  <div class="flex-1 min-w-0">
                    <span class="text-slate-700 font-medium group-hover:text-accent block truncate" style="font-size:clamp(1.1rem,0.9rem+0.5vw,1.7rem); line-height:1.2;">시험·평가 신청서 양식</span>
                    <span class="text-slate-400" style="font-size:clamp(0.85rem,0.7rem+0.3vw,1.2rem);">PDF · 신청서류</span>
                  </div>
                </a>
                <a href="/support/downloads" class="flex items-center hover:bg-blue-50/30 px-2 py-2 rounded-lg transition-colors group" style="gap:clamp(8px,0.8vw,12px);">
                  <div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(36px,3vw,48px); height:clamp(36px,3vw,48px); background:rgba(16,185,129,0.06);"><i class="fas fa-file-lines text-emerald-400" style="font-size:clamp(14px,1.2vw,20px)"></i></div>
                  <div class="flex-1 min-w-0">
                    <span class="text-slate-700 font-medium group-hover:text-accent block truncate" style="font-size:clamp(1.1rem,0.9rem+0.5vw,1.7rem); line-height:1.2;">평가 절차 안내서</span>
                    <span class="text-slate-400" style="font-size:clamp(0.85rem,0.7rem+0.3vw,1.2rem);">PDF · 안내자료</span>
                  </div>
                </a>
                <a href="/support/downloads" class="flex items-center hover:bg-blue-50/30 px-2 py-2 rounded-lg transition-colors group" style="gap:clamp(8px,0.8vw,12px);">
                  <div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(36px,3vw,48px); height:clamp(36px,3vw,48px); background:rgba(139,92,246,0.06);"><i class="fas fa-file-zipper text-purple-400" style="font-size:clamp(14px,1.2vw,20px)"></i></div>
                  <div class="flex-1 min-w-0">
                    <span class="text-slate-700 font-medium group-hover:text-accent block truncate" style="font-size:clamp(1.1rem,0.9rem+0.5vw,1.7rem); line-height:1.2;">CC인증 관련 자료 모음</span>
                    <span class="text-slate-400" style="font-size:clamp(0.85rem,0.7rem+0.3vw,1.2rem);">ZIP · 참고자료</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- Tab Content: 시스템문서 -->
          <div class="notice-tab-content" id="tab-documents">
            <div class="flex justify-end" style="margin-bottom:clamp(0.3rem,0.5vw,0.5rem);">
              <a href="/support/documents" class="text-accent font-semibold hover:underline inline-flex items-center" style="gap:4px; font-size:clamp(1.0rem, 0.85rem + 0.4vw, 1.5rem);">전체보기 <i class="fas fa-chevron-right" style="font-size:clamp(9px,0.7vw,12px)"></i></a>
            </div>
            <div style="padding:clamp(1rem,1.5vw,1.5rem) 0;">
              <div class="space-y-3">
                <a href="/support/documents" class="flex items-center hover:bg-blue-50/30 px-2 py-2 rounded-lg transition-colors group" style="gap:clamp(8px,0.8vw,12px);">
                  <div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(36px,3vw,48px); height:clamp(36px,3vw,48px); background:rgba(59,130,246,0.06);"><i class="fas fa-book text-blue-400" style="font-size:clamp(14px,1.2vw,20px)"></i></div>
                  <div class="flex-1 min-w-0">
                    <span class="text-slate-700 font-medium group-hover:text-accent block truncate" style="font-size:clamp(1.1rem,0.9rem+0.5vw,1.7rem); line-height:1.2;">품질경영시스템 매뉴얼</span>
                    <span class="text-slate-400" style="font-size:clamp(0.85rem,0.7rem+0.3vw,1.2rem);">QMS 문서</span>
                  </div>
                </a>
                <a href="/support/documents" class="flex items-center hover:bg-blue-50/30 px-2 py-2 rounded-lg transition-colors group" style="gap:clamp(8px,0.8vw,12px);">
                  <div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(36px,3vw,48px); height:clamp(36px,3vw,48px); background:rgba(245,158,11,0.06);"><i class="fas fa-shield-halved text-amber-400" style="font-size:clamp(14px,1.2vw,20px)"></i></div>
                  <div class="flex-1 min-w-0">
                    <span class="text-slate-700 font-medium group-hover:text-accent block truncate" style="font-size:clamp(1.1rem,0.9rem+0.5vw,1.7rem); line-height:1.2;">정보보호 관리체계 운영규정</span>
                    <span class="text-slate-400" style="font-size:clamp(0.85rem,0.7rem+0.3vw,1.2rem);">ISMS 문서</span>
                  </div>
                </a>
                <a href="/support/documents" class="flex items-center hover:bg-blue-50/30 px-2 py-2 rounded-lg transition-colors group" style="gap:clamp(8px,0.8vw,12px);">
                  <div class="shrink-0 rounded-lg flex items-center justify-center" style="width:clamp(36px,3vw,48px); height:clamp(36px,3vw,48px); background:rgba(6,182,212,0.06);"><i class="fas fa-clipboard-list text-cyan-400" style="font-size:clamp(14px,1.2vw,20px)"></i></div>
                  <div class="flex-1 min-w-0">
                    <span class="text-slate-700 font-medium group-hover:text-accent block truncate" style="font-size:clamp(1.1rem,0.9rem+0.5vw,1.7rem); line-height:1.2;">시험절차 표준운영규정</span>
                    <span class="text-slate-400" style="font-size:clamp(0.85rem,0.7rem+0.3vw,1.2rem);">SOP 문서</span>
                  </div>
                </a>
              </div>
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
                      <p class="font-bold text-primary" style="font-size:clamp(1.2rem,1rem+0.6vw,1.9rem); line-height:1.2; margin-bottom:4px;">(주)한국정보보안기술원</p>
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
              평가현황
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
            <span class="text-slate-500" style="font-size:clamp(0.95rem,0.8rem+0.4vw,1.4rem);"><i class="fas fa-chart-pie text-blue-400 mr-1" style="font-size:clamp(10px,0.8vw,14px)"></i>총 시험·평가 실적</span>
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
    window.switchNoticeTab = function(tabId) {
      // Deactivate all tabs
      document.querySelectorAll('.notice-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('.notice-tab-content').forEach(function(c) { c.classList.remove('active'); });
      // Activate selected tab
      var tab = document.querySelector('.notice-tab[data-tab="' + tabId + '"]');
      var content = document.getElementById('tab-' + tabId);
      if (tab) tab.classList.add('active');
      if (content) content.classList.add('active');
    };
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

    // P0-2: ealData now generated from sim_cert_types (weeks→months) with eval_* fallback
    var ealData = {
      overall: ${ealDataOverall},
      EAL2: ${ealDataEAL2},
      EAL3: ${ealDataEAL3},
      EAL4: ${ealDataEAL4}
    };

    var currentEAL = 'overall';
    var currentPrep = 50;

    function lerp(min, max, t) { return min + (max - min) * t; }

    function simulate(level, prepVal) {
      var d = ealData[level];
      if (!d) return null;
      var t = 1 - (prepVal - 1) / 99;
      var kPrep = Math.round(lerp(d.koist.prepMin, d.koist.prepMax, t));
      var kEval = Math.round(lerp(d.koist.evalMin, d.koist.evalMax, t));
      var g = d.general;
      var gTotal = g.prep + g.eval;
      var kTotal = kPrep + kEval;
      return {
        general: { prep: g.prep, eval: g.eval, total: gTotal },
        koist: { prep: kPrep, eval: kEval, total: kTotal },
        maxBar: gTotal,
        reduction: gTotal > 0 ? Math.round((1 - kTotal / gTotal) * 100) : 0,
        saving: gTotal - kTotal
      };
    }

    function fmtM(v) { return Math.round(v).toString(); }

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
      if (gTotal) gTotal.textContent = '약 ' + Math.round(d.general.total) + '개월';
      var gPrep = document.getElementById('ealGeneralPrep');
      if (gPrep) gPrep.textContent = '준비 ' + Math.round(d.general.prep) + '개월';
      var gEval = document.getElementById('ealGeneralEval');
      if (gEval) gEval.textContent = '평가 ' + Math.round(d.general.eval) + '개월';

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
