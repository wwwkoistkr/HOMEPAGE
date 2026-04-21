// ============================================================================
// admin-slider-settings.js — 슬라이더 UI 설정 관리자 페이지 (v39.4)
// ============================================================================
// AI 시뮬레이터 히어로 배너의 모든 슬라이더 관련 숫자/색상/텍스트 제어
// ============================================================================
(async function () {
  const container = document.getElementById('admin-content');
  let settings = {}; // { key: value }
  let descriptions = {}; // { key: description }

  async function loadData() {
    const data = await apiCall('/api/admin/slider-settings');
    if (!data || !data.data) {
      container.innerHTML = '<p class="text-red-500">슬라이더 설정 데이터 로딩 실패</p>';
      return;
    }
    settings = {};
    descriptions = {};
    for (const row of data.data) {
      settings[row.key] = row.value;
      descriptions[row.key] = row.description || '';
    }
    render();
  }

  function get(key, fallback) {
    return settings[key] != null ? settings[key] : (fallback || '');
  }

  function section(title, icon, color, body) {
    return `
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-5">
      <h2 class="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i class="fas ${icon} text-${color}-500"></i>${title}
      </h2>
      ${body}
    </div>`;
  }

  function colorInput(key, label, helpText) {
    const val = get(key, '#000000');
    return `
    <div class="flex items-center gap-3 mb-3">
      <div class="w-40 shrink-0">
        <div class="text-sm font-medium text-gray-700">${label}</div>
        ${helpText ? `<div class="text-[10px] text-gray-400 leading-tight">${helpText}</div>` : ''}
      </div>
      <input type="color" data-key="${key}" value="${val}" class="slider-color w-12 h-9 rounded border border-gray-200 cursor-pointer">
      <input type="text" data-key="${key}" value="${val}" class="slider-hex font-mono text-xs border border-gray-200 rounded px-2 py-1.5 w-24 uppercase">
    </div>`;
  }

  function textInput(key, label, helpText, width = 'w-64') {
    const val = get(key, '');
    return `
    <div class="flex items-center gap-3 mb-3">
      <div class="w-40 shrink-0">
        <div class="text-sm font-medium text-gray-700">${label}</div>
        ${helpText ? `<div class="text-[10px] text-gray-400 leading-tight">${helpText}</div>` : ''}
      </div>
      <input type="text" data-key="${key}" value="${escapeHtml(val)}" class="slider-text border border-gray-200 rounded px-2 py-1.5 text-sm ${width}">
    </div>`;
  }

  function numberInput(key, label, helpText, min, max, step = 1) {
    const val = get(key, '0');
    return `
    <div class="flex items-center gap-3 mb-3">
      <div class="w-40 shrink-0">
        <div class="text-sm font-medium text-gray-700">${label}</div>
        ${helpText ? `<div class="text-[10px] text-gray-400 leading-tight">${helpText}</div>` : ''}
      </div>
      <input type="number" data-key="${key}" value="${val}" min="${min}" max="${max}" step="${step}" class="slider-num border border-gray-200 rounded px-2 py-1.5 text-sm w-28">
    </div>`;
  }

  function selectInput(key, label, helpText, options) {
    const val = get(key, '');
    const opts = options.map(o => `<option value="${o.value}" ${o.value === val ? 'selected' : ''}>${o.label}</option>`).join('');
    return `
    <div class="flex items-center gap-3 mb-3">
      <div class="w-40 shrink-0">
        <div class="text-sm font-medium text-gray-700">${label}</div>
        ${helpText ? `<div class="text-[10px] text-gray-400 leading-tight">${helpText}</div>` : ''}
      </div>
      <select data-key="${key}" class="slider-select border border-gray-200 rounded px-2 py-1.5 text-sm w-64">${opts}</select>
    </div>`;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function render() {
    const genPrep = get('slider_gen_prep_color', '#F59E0B');
    const genEval = get('slider_gen_eval_color', '#94A3B8');
    const koPrep = get('slider_koist_prep_color', '#F59E0B');
    const koEval = get('slider_koist_eval_color', '#3B82F6');

    container.innerHTML = `
    <!-- 안내 배너 -->
    <div class="bg-gradient-to-r from-amber-50 to-blue-50 border border-amber-200 rounded-xl p-4 mb-5">
      <div class="flex items-start gap-2 text-sm">
        <i class="fas fa-sliders text-amber-500 mt-0.5"></i>
        <div>
          <p class="font-semibold text-gray-800 mb-1">AI 시뮬레이터 슬라이더 UI 설정
            <span class="text-[10px] bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 font-bold ml-1">v39.4</span>
          </p>
          <p class="text-xs text-gray-600">홈페이지 상단 AI 시뮬레이터에 표시되는 <strong>모든 숫자 형식·색상·반올림 정책</strong>을 이곳에서 통제합니다.</p>
          <p class="text-xs text-gray-600 mt-1">⚡ <strong>준비+평가 합계 정합성(Option C)</strong>은 "총합 표시 모드 = sum"일 때 자동 유지됩니다.</p>
        </div>
      </div>
    </div>

    <!-- 라이브 프리뷰 -->
    <div class="bg-slate-900 rounded-xl p-6 mb-5 shadow-inner">
      <div class="text-xs text-slate-400 mb-3"><i class="fas fa-eye mr-1"></i>라이브 프리뷰 (색상·바 구조 실시간 반영)</div>

      <!-- CCRA 프리뷰 바 -->
      <div class="mb-4">
        <div class="text-xs text-slate-300 mb-1.5 flex justify-between">
          <span>CCRA평가일수</span>
          <span id="previewGenTotal" class="font-bold text-white">약 12개월</span>
        </div>
        <div class="relative h-8 bg-slate-700/40 rounded-lg overflow-hidden">
          <div id="previewGenBar" class="absolute left-0 top-0 h-full rounded-lg flex items-center px-3" style="width:85%; background:linear-gradient(90deg, ${genPrep} 0%, ${genPrep} 55%, ${genEval} 55%, ${genEval} 100%);">
            <span class="text-[11px] font-semibold text-white" style="text-shadow:0 1px 2px rgba(0,0,0,0.4)">
              <span id="previewGenPrep">준비 7개월</span>
              <span class="mx-1.5 opacity-60">·</span>
              <span id="previewGenEval">평가 5개월</span>
            </span>
          </div>
        </div>
      </div>

      <!-- KOIST 프리뷰 바 -->
      <div>
        <div class="text-xs text-slate-300 mb-1.5 flex justify-between">
          <span>KOIST평가프로세스</span>
          <span id="previewKoistTotal" class="font-bold text-white">약 6개월</span>
        </div>
        <div class="relative h-8 bg-slate-700/40 rounded-lg overflow-hidden">
          <div id="previewKoistBar" class="absolute left-0 top-0 h-full rounded-lg flex items-center px-3" style="width:45%; background:linear-gradient(90deg, ${koPrep} 0%, ${koPrep} 40%, ${koEval} 40%, ${koEval} 100%);">
            <span class="text-[11px] font-semibold text-white" style="text-shadow:0 1px 2px rgba(0,0,0,0.4)">
              <span id="previewKoistPrep">준비 2개월</span>
              <span class="mx-1.5 opacity-60">·</span>
              <span id="previewKoistEval">평가 4개월</span>
            </span>
          </div>
        </div>
      </div>

      <div class="mt-3 flex items-center justify-center">
        <span id="previewBadge" class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
              style="background:linear-gradient(90deg, ${get('slider_badge_grad_start','#10B981')}, ${get('slider_badge_grad_end','#059669')}); color:${get('slider_badge_text_color','#FFFFFF')}">
          <i class="fas fa-arrow-trend-down"></i> <span id="previewBadgeText">50% 단축</span>
        </span>
      </div>
    </div>

    <!-- ── 섹션 1: 반올림·표시 정책 ── -->
    ${section('반올림·표시 정책', 'fa-calculator', 'blue', `
      ${selectInput('slider_total_mode', '총합 표시 모드', '가장 중요 · sum=준비+평가 (권장)', [
        { value: 'sum', label: 'sum — 준비+평가 합 (정합성 100%, Option C)' },
        { value: 'round', label: 'round — round(total) (최대 ±1개월 오차 발생)' },
        { value: 'decimal', label: 'decimal — 소수 1자리 표시 (예: 8.3개월)' },
      ])}
      ${selectInput('slider_round_mode', '반올림 모드', 'round=반올림, ceil=올림, floor=내림', [
        { value: 'round', label: 'round (반올림)' },
        { value: 'ceil',  label: 'ceil (올림)' },
        { value: 'floor', label: 'floor (내림)' },
      ])}
      ${numberInput('slider_decimal_places', '소수 자리 수', '0=정수만, 1=소수1자리 (decimal 모드에서 사용)', 0, 2, 1)}
      ${textInput('slider_number_unit', '숫자 단위', '예: "개월", "월", "months"', 'w-32')}
    `)}

    <!-- ── 섹션 2: 텍스트 포맷 ── -->
    ${section('텍스트 포맷 (숫자는 {N}으로 치환)', 'fa-font', 'purple', `
      ${textInput('slider_total_format', '바 위 총합 포맷', '예: "약 {N}개월"')}
      ${textInput('slider_prep_format', '준비 포맷', '예: "준비 {N}개월"')}
      ${textInput('slider_eval_format', '평가 포맷', '예: "평가 {N}개월"')}
      ${textInput('slider_reduction_format', '단축률 포맷', '예: "{N}%"', 'w-32')}
      ${textInput('slider_saving_format', '절감 포맷', '예: "약 {N}개월 절감"')}
      ${textInput('slider_prep_label', '준비 라벨', '결과 텍스트', 'w-32')}
      ${textInput('slider_eval_label', '평가 라벨', '결과 텍스트', 'w-32')}
    `)}

    <!-- ── 섹션 3: CCRA 바 ── -->
    ${section('CCRA평가일수 바 (일반 프로세스)', 'fa-chart-bar', 'amber', `
      ${colorInput('slider_gen_prep_color', '준비 구간 색상', '바의 왼쪽 (준비 부분)')}
      ${colorInput('slider_gen_eval_color', '평가 구간 색상', '바의 오른쪽 (평가 부분)')}
      ${numberInput('slider_gen_min_width', '바 최소 너비(%)', '가독성 하한값', 0, 100)}
      ${numberInput('slider_gen_transition', '애니메이션 시간(초)', '0.3~1.0 권장', 0, 3, 0.1)}
    `)}

    <!-- ── 섹션 4: KOIST 바 ── -->
    ${section('KOIST평가프로세스 바', 'fa-chart-bar', 'cyan', `
      ${colorInput('slider_koist_prep_color', '준비 구간 색상')}
      ${colorInput('slider_koist_eval_color', '평가 구간 색상')}
      ${numberInput('slider_koist_min_width', '바 최소 너비(%)', '가독성 하한값', 0, 100)}
      ${numberInput('slider_koist_transition', '애니메이션 시간(초)', '0.3~1.0 권장', 0, 3, 0.1)}
    `)}

    <!-- ── 섹션 5: 사전준비 트랙 (4단계) ── -->
    ${section('사전준비 슬라이더 트랙 (4단계 그라데이션)', 'fa-layer-group', 'green', `
      ${colorInput('slider_track_color_1', '1단계 색상', '0~25% 구간 (저조)')}
      ${colorInput('slider_track_color_2', '2단계 색상', '26~50% 구간 (보통)')}
      ${colorInput('slider_track_color_3', '3단계 색상', '51~75% 구간 (양호)')}
      ${colorInput('slider_track_color_4', '4단계 색상', '76~100% 구간 (우수)')}
      ${numberInput('slider_track_opacity', '트랙 투명도', '0.0~1.0', 0, 1, 0.05)}
    `)}

    <!-- ── 섹션 6: 단축률 뱃지 ── -->
    ${section('단축률(Reduction) 뱃지 색상', 'fa-award', 'emerald', `
      ${colorInput('slider_badge_grad_start', '그라데이션 시작', '왼쪽 색상')}
      ${colorInput('slider_badge_grad_end', '그라데이션 끝', '오른쪽 색상')}
      ${colorInput('slider_badge_text_color', '뱃지 글자 색상', '보통 흰색')}
    `)}

    <!-- ── 섹션 7: 분배 비율 & 변환 ── -->
    ${section('분배 비율 & 주→월 변환 (고급)', 'fa-percent', 'pink', `
      ${numberInput('slider_gen_prep_ratio', 'CCRA 준비 비율(%)', '준비+평가=100이어야 함', 0, 100)}
      ${numberInput('slider_gen_eval_ratio', 'CCRA 평가 비율(%)', '', 0, 100)}
      ${numberInput('slider_koist_prep_ratio', 'KOIST 준비 비율(%)', '', 0, 100)}
      ${numberInput('slider_koist_eval_ratio', 'KOIST 평가 비율(%)', '', 0, 100)}
      ${numberInput('slider_weeks_per_month', '주→월 변환계수', '기본 4.345', 1, 10, 0.001)}
    `)}

    <!-- ── 액션 바 (하단 고정) ── -->
    <div class="sticky bottom-0 bg-white border-t border-gray-200 -mx-6 px-6 py-4 flex flex-wrap items-center gap-2 shadow-lg">
      <button id="btnSave" class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2">
        <i class="fas fa-save"></i> 전체 저장
      </button>
      <button id="btnReset" class="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
        <i class="fas fa-rotate-left"></i> 기본값 복원
      </button>
      <div class="border-l border-gray-200 h-8 mx-2"></div>
      <span class="text-xs text-gray-500 mr-1">프리셋:</span>
      <button data-preset="default" class="btn-preset bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium">🎨 기본</button>
      <button data-preset="monotone" class="btn-preset bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium">⚫ 모노톤</button>
      <button data-preset="dark" class="btn-preset bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium">🌙 다크</button>
      <button data-preset="pastel" class="btn-preset bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium">🌸 파스텔</button>
      <div class="flex-1"></div>
      <a href="/" target="_blank" class="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
        <i class="fas fa-external-link-alt text-xs"></i> 홈에서 확인
      </a>
    </div>
    `;

    bindEvents();
    updatePreview();
  }

  function bindEvents() {
    // 컬러피커 ↔ HEX 동기화
    container.querySelectorAll('.slider-color').forEach(el => {
      el.addEventListener('input', (e) => {
        const key = e.target.dataset.key;
        const v = e.target.value;
        settings[key] = v;
        const hex = container.querySelector(`.slider-hex[data-key="${key}"]`);
        if (hex) hex.value = v.toUpperCase();
        updatePreview();
      });
    });
    container.querySelectorAll('.slider-hex').forEach(el => {
      el.addEventListener('input', (e) => {
        const key = e.target.dataset.key;
        let v = e.target.value.trim();
        if (!v.startsWith('#')) v = '#' + v;
        if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
          settings[key] = v.toUpperCase();
          const cp = container.querySelector(`.slider-color[data-key="${key}"]`);
          if (cp) cp.value = v;
          updatePreview();
        }
      });
    });
    container.querySelectorAll('.slider-text, .slider-num, .slider-select').forEach(el => {
      el.addEventListener('input', (e) => {
        settings[e.target.dataset.key] = e.target.value;
        updatePreview();
      });
    });

    // 저장
    document.getElementById('btnSave').addEventListener('click', async () => {
      const btn = document.getElementById('btnSave');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 저장중...';
      const res = await apiCall('/api/admin/slider-settings', 'PUT', settings);
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-save"></i> 전체 저장';
      if (res && res.success) {
        toast(`✅ ${res.updated}개 설정이 저장되었습니다`);
      } else {
        toast('❌ 저장 실패', 'error');
      }
    });

    // 기본값 복원
    document.getElementById('btnReset').addEventListener('click', async () => {
      if (!confirm('모든 슬라이더 설정을 기본값으로 복원하시겠습니까?')) return;
      const res = await apiCall('/api/admin/slider-settings/reset', 'POST');
      if (res && res.success) {
        toast(`🔄 ${res.reset}개 설정이 기본값으로 복원되었습니다`);
        await loadData();
      } else {
        toast('❌ 복원 실패', 'error');
      }
    });

    // 프리셋 적용
    container.querySelectorAll('.btn-preset').forEach(el => {
      el.addEventListener('click', async (e) => {
        const name = e.currentTarget.dataset.preset;
        if (!confirm(`"${name}" 프리셋의 색상을 적용하시겠습니까? (현재 색상 덮어쓰기)`)) return;
        const res = await apiCall(`/api/admin/slider-settings/preset/${name}`, 'POST');
        if (res && res.success) {
          toast(`🎨 프리셋 "${name}" 적용 완료 (${res.applied}개)`);
          await loadData();
        } else {
          toast('❌ 프리셋 적용 실패', 'error');
        }
      });
    });
  }

  // 라이브 프리뷰 업데이트
  function updatePreview() {
    const gP = get('slider_gen_prep_color', '#F59E0B');
    const gE = get('slider_gen_eval_color', '#94A3B8');
    const kP = get('slider_koist_prep_color', '#F59E0B');
    const kE = get('slider_koist_eval_color', '#3B82F6');
    const bS = get('slider_badge_grad_start', '#10B981');
    const bE = get('slider_badge_grad_end', '#059669');
    const bT = get('slider_badge_text_color', '#FFFFFF');

    const gBar = document.getElementById('previewGenBar');
    if (gBar) gBar.style.background = `linear-gradient(90deg, ${gP} 0%, ${gP} 55%, ${gE} 55%, ${gE} 100%)`;
    const kBar = document.getElementById('previewKoistBar');
    if (kBar) kBar.style.background = `linear-gradient(90deg, ${kP} 0%, ${kP} 40%, ${kE} 40%, ${kE} 100%)`;
    const badge = document.getElementById('previewBadge');
    if (badge) {
      badge.style.background = `linear-gradient(90deg, ${bS}, ${bE})`;
      badge.style.color = bT;
    }

    // 텍스트 포맷 프리뷰 (샘플: CCRA 12개월=7+5, KOIST 6개월=2+4, 절감 6개월)
    const fmt = (tpl, n) => String(tpl || '{N}').replace(/\{N\}/g, n);
    const totalFmt = get('slider_total_format', '약 {N}개월');
    const prepFmt = get('slider_prep_format', '준비 {N}개월');
    const evalFmt = get('slider_eval_format', '평가 {N}개월');
    const redFmt = get('slider_reduction_format', '{N}%');
    const ids = {
      previewGenTotal: fmt(totalFmt, 12),
      previewGenPrep: fmt(prepFmt, 7),
      previewGenEval: fmt(evalFmt, 5),
      previewKoistTotal: fmt(totalFmt, 6),
      previewKoistPrep: fmt(prepFmt, 2),
      previewKoistEval: fmt(evalFmt, 4),
      previewBadgeText: fmt(redFmt, 50) + ' 단축',
    };
    for (const [id, text] of Object.entries(ids)) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    }
  }

  // 간단 토스트
  function toast(msg, type = 'success') {
    const div = document.createElement('div');
    div.className = `fixed bottom-6 right-6 z-[100] ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium`;
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3200);
  }

  await loadData();
})();
