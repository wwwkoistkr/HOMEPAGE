// Admin - Site Settings Management (Enhanced with Image Picker & Background Management)
(async function() {
  const container = document.getElementById('admin-content');
  
  // Load settings and images simultaneously
  const [settingsData, imagesData] = await Promise.all([
    apiCall('/api/admin/settings'),
    apiCall('/api/admin/images')
  ]);
  
  if (!settingsData || !settingsData.data) { 
    container.innerHTML = '<p class="text-red-500">데이터 로딩 실패</p>'; 
    return; 
  }

  const images = (imagesData && imagesData.data) || [];
  
  const categories = {
    general: { label: '일반 설정', icon: 'fa-cog', color: 'blue' },
    contact: { label: '연락처', icon: 'fa-phone', color: 'green' },
    theme: { label: '디자인', icon: 'fa-palette', color: 'purple' },
    background: { label: '배경 이미지', icon: 'fa-image', color: 'pink' },
    content: { label: '홈페이지 텍스트', icon: 'fa-font', color: 'orange' },
    evaluation: { label: '평가기간 시뮬레이터 관리', icon: 'fa-chart-bar', color: 'cyan', custom: true },
    seo: { label: 'SEO', icon: 'fa-search', color: 'teal' },
  };

  const grouped = {};
  settingsData.data.forEach(s => {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  });

  // Build the image picker modal (shared)
  const modalHtml = `
    <div id="imagePickerModal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4" onclick="if(event.target===this)closeImagePicker()">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="font-bold text-gray-800"><i class="fas fa-images mr-2 text-blue-500"></i>이미지 선택</h3>
          <button onclick="closeImagePicker()" class="p-1 text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
        </div>
        <div class="p-4 overflow-y-auto flex-1">
          <div class="flex gap-2 mb-4 flex-wrap">
            <button onclick="filterPickerImages('')" class="picker-filter active px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">전체</button>
            <button onclick="filterPickerImages('background')" class="picker-filter px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">배경</button>
            <button onclick="filterPickerImages('logo')" class="picker-filter px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">로고</button>
            <button onclick="filterPickerImages('content')" class="picker-filter px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">콘텐츠</button>
            <button onclick="filterPickerImages('general')" class="picker-filter px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">일반</button>
          </div>
          <div id="pickerGrid" class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          </div>
          <div id="pickerEmpty" class="hidden text-center py-8">
            <i class="fas fa-images text-3xl text-gray-300 mb-2 block"></i>
            <p class="text-gray-400 text-sm">이미지가 없습니다. <a href="/admin/images" class="text-blue-500 underline">이미지 관리</a>에서 업로드하세요.</p>
          </div>
        </div>
        <div class="p-4 border-t bg-gray-50 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">또는 URL 직접 입력:</span>
            <input type="text" id="pickerUrlInput" placeholder="https://..." class="px-3 py-1.5 border rounded-lg text-sm w-64">
            <button onclick="selectPickerUrl()" class="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium">적용</button>
          </div>
          <button onclick="clearPickerValue()" class="text-red-500 hover:text-red-600 text-sm font-medium"><i class="fas fa-eraser mr-1"></i>초기화</button>
        </div>
      </div>
    </div>
  `;

  let html = modalHtml + '<form id="settingsForm">';

  for (const [cat, meta] of Object.entries(categories)) {
    const items = grouped[cat] || [];
    if (items.length === 0) continue;

    html += `
    <div class="mb-8">
      <h3 class="text-lg font-bold text-gray-700 mb-4 pb-2 border-b flex items-center gap-2">
        <span class="w-8 h-8 bg-${meta.color}-50 rounded-lg flex items-center justify-center"><i class="fas ${meta.icon} text-${meta.color}-500 text-sm"></i></span>
        ${meta.label}
      </h3>
      <div class="space-y-4">`;

    // Custom evaluation UI
    if (cat === 'evaluation' && meta.custom) {
      const evalMap = {};
      items.forEach(s => { evalMap[s.key] = s.value; });

      const ealLevels = [
        { key: 'overall', label: '전체평균', color: '#6366F1' },
        { key: 'eal2', label: 'EAL2', color: '#3B82F6' },
        { key: 'eal3', label: 'EAL3', color: '#8B5CF6' },
        { key: 'eal4', label: 'EAL4', color: '#EF4444' }
      ];

      html += `
      <div class="bg-cyan-50/50 border border-cyan-100 rounded-xl p-4 mb-4">
        <div class="flex items-start gap-2 text-sm text-cyan-700">
          <i class="fas fa-info-circle mt-0.5"></i>
          <div>
            <p class="font-medium mb-1">평가기간 시뮬레이터 데이터 관리</p>
            <p class="text-xs text-cyan-600">홈페이지의 "사전준비 슬라이더(1~100)"로 시뮬레이션되는 평가기간의 범위를 설정합니다.</p>
            <p class="text-xs text-cyan-600 mt-1"><strong>전통 CCRA</strong>: 고정된 일반 평가 프로세스 기간 (준비/평가)</p>
            <p class="text-xs text-cyan-600"><strong>KOIST 최소(사전준비100%)</strong>: 충분히 준비된 경우 최단 기간</p>
            <p class="text-xs text-cyan-600"><strong>KOIST 최대(사전준비1%)</strong>: 준비 부족시 최장 기간</p>
            <p class="text-xs text-cyan-600 mt-1">슬라이더가 1~100 사이를 이동하면 최소~최대 범위에서 선형 보간(interpolation)하여 기간이 자동 계산됩니다.</p>
          </div>
        </div>
      </div>
      
      <!-- 시뮬레이터 미리보기 -->
      <div class="border border-blue-200 rounded-xl overflow-hidden mb-4" style="background: linear-gradient(135deg, #EFF6FF, #F8FAFC);">
        <div class="flex items-center gap-2 px-4 py-3" style="background: linear-gradient(135deg, #1E3A5F, #2563EB);">
          <i class="fas fa-play-circle text-blue-300"></i>
          <span class="font-bold text-white text-sm">시뮬레이터 미리보기</span>
        </div>
        <div class="p-4">
          <div class="flex items-center gap-3 mb-3">
            <select id="previewEalSelect" onchange="updateAdminPreview()" class="px-3 py-1.5 border rounded-lg text-sm">
              <option value="overall">전체평균</option>
              <option value="eal2">EAL2</option>
              <option value="eal3">EAL3</option>
              <option value="eal4">EAL4</option>
            </select>
            <div class="flex-1 flex items-center gap-2">
              <span class="text-xs text-gray-500 shrink-0">사전준비:</span>
              <input type="range" id="previewPrepSlider" min="1" max="100" value="50" 
                class="flex-1" oninput="updateAdminPreview()">
              <span id="previewPrepVal" class="text-sm font-bold text-blue-600 w-10 text-center">50%</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg p-3" style="background: rgba(0,0,0,0.03); border:1px solid rgba(0,0,0,0.06);">
              <div class="text-xs text-gray-500 mb-1">전통 CCRA</div>
              <div class="flex items-baseline gap-1">
                <span id="previewCcraTotal" class="text-lg font-black text-gray-700">24</span>
                <span class="text-xs text-gray-400">개월</span>
              </div>
              <div class="text-xs text-gray-400 mt-0.5">준비 <span id="previewCcraPrep">12</span> + 평가 <span id="previewCcraEval">12</span></div>
            </div>
            <div class="rounded-lg p-3" style="background: rgba(37,99,235,0.04); border:1px solid rgba(37,99,235,0.12);">
              <div class="text-xs text-blue-500 mb-1"><i class="fas fa-bolt text-yellow-500 mr-1" style="font-size:9px"></i>KOIST</div>
              <div class="flex items-baseline gap-1">
                <span id="previewKoistTotal" class="text-lg font-black text-blue-700">15</span>
                <span class="text-xs text-blue-400">개월</span>
              </div>
              <div class="text-xs text-blue-400 mt-0.5">준비 <span id="previewKoistPrep">6</span> + 평가 <span id="previewKoistEval">9</span></div>
            </div>
          </div>
          <div class="flex items-center justify-center mt-2 gap-2">
            <span id="previewReduction" class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold bg-blue-100 text-blue-700"><i class="fas fa-arrow-down" style="font-size:8px"></i> 37% 단축</span>
            <span id="previewSaving" class="text-xs text-gray-500">약 9개월 절감</span>
          </div>
        </div>
      </div>`;

      ealLevels.forEach(eal => {
        const gPrep = evalMap['eval_' + eal.key + '_general_prep'] || '';
        const gEval = evalMap['eval_' + eal.key + '_general_eval'] || '';
        const kPrepMin = evalMap['eval_' + eal.key + '_koist_prep_high'] || '';
        const kPrepMax = evalMap['eval_' + eal.key + '_koist_prep_low'] || '';
        const kEvalMin = evalMap['eval_' + eal.key + '_koist_eval_high'] || '';
        const kEvalMax = evalMap['eval_' + eal.key + '_koist_eval_low'] || '';

        html += `
      <div class="border rounded-xl overflow-hidden mb-4" style="border-color: ${eal.color}30;">
        <div class="flex items-center gap-2 px-4 py-3" style="background: ${eal.color}08;">
          <span class="inline-block w-3 h-3 rounded-full" style="background: ${eal.color};"></span>
          <span class="font-bold text-gray-800">${eal.label}</span>
        </div>
        <div class="p-4 space-y-4">
          <!-- 전통 CCRA 프로세스 (고정값) -->
          <div>
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              <i class="fas fa-building text-gray-400 mr-1"></i>전통 CCRA 평가 프로세스 (고정)
            </label>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-xs text-gray-500 mb-1 block">준비기간 (개월)</label>
                <input type="number" data-key="eval_${eal.key}_general_prep" value="${gPrep}" min="0" max="60" step="0.5"
                  class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 eval-input" id="input_eval_${eal.key}_general_prep" onchange="updateAdminPreview()">
              </div>
              <div>
                <label class="text-xs text-gray-500 mb-1 block">평가기간 (개월)</label>
                <input type="number" data-key="eval_${eal.key}_general_eval" value="${gEval}" min="0" max="60" step="0.5"
                  class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 eval-input" id="input_eval_${eal.key}_general_eval" onchange="updateAdminPreview()">
              </div>
            </div>
          </div>
          <!-- KOIST 시뮬레이션 범위 -->
          <div>
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              <i class="fas fa-bolt text-yellow-500 mr-1"></i>KOIST 평가 프로세스 (시뮬레이션 범위)
            </label>
            <div class="space-y-3">
              <!-- 최소 (사전준비 100%) -->
              <div class="flex items-center gap-3 p-3 rounded-lg" style="background: #3B82F608; border: 1px solid #3B82F615;">
                <div class="shrink-0 w-36">
                  <div class="flex items-center gap-1">
                    <i class="fas fa-arrow-up" style="color:#3B82F6; font-size:10px"></i>
                    <span class="text-xs font-bold" style="color:#3B82F6">최소 (준비100%)</span>
                  </div>
                  <span class="text-[10px] text-gray-400">가장 잘 준비된 경우</span>
                </div>
                <div class="flex-1 grid grid-cols-2 gap-2">
                  <div class="flex items-center gap-1">
                    <span class="text-xs text-gray-400 shrink-0 w-6">준비</span>
                    <input type="number" data-key="eval_${eal.key}_koist_prep_high" value="${kPrepMin}" min="0" max="60" step="0.5"
                      class="w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/30 eval-input" id="input_eval_${eal.key}_koist_prep_high" onchange="updateAdminPreview()">
                    <span class="text-xs text-gray-400">월</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-xs text-gray-400 shrink-0 w-6">평가</span>
                    <input type="number" data-key="eval_${eal.key}_koist_eval_high" value="${kEvalMin}" min="0" max="60" step="0.5"
                      class="w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/30 eval-input" id="input_eval_${eal.key}_koist_eval_high" onchange="updateAdminPreview()">
                    <span class="text-xs text-gray-400">월</span>
                  </div>
                </div>
              </div>
              <!-- 최대 (사전준비 1%) -->
              <div class="flex items-center gap-3 p-3 rounded-lg" style="background: #EF444408; border: 1px solid #EF444415;">
                <div class="shrink-0 w-36">
                  <div class="flex items-center gap-1">
                    <i class="fas fa-arrow-down" style="color:#EF4444; font-size:10px"></i>
                    <span class="text-xs font-bold" style="color:#EF4444">최대 (준비1%)</span>
                  </div>
                  <span class="text-[10px] text-gray-400">준비가 부족한 경우</span>
                </div>
                <div class="flex-1 grid grid-cols-2 gap-2">
                  <div class="flex items-center gap-1">
                    <span class="text-xs text-gray-400 shrink-0 w-6">준비</span>
                    <input type="number" data-key="eval_${eal.key}_koist_prep_low" value="${kPrepMax}" min="0" max="60" step="0.5"
                      class="w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/30 eval-input" id="input_eval_${eal.key}_koist_prep_low" onchange="updateAdminPreview()">
                    <span class="text-xs text-gray-400">월</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-xs text-gray-400 shrink-0 w-6">평가</span>
                    <input type="number" data-key="eval_${eal.key}_koist_eval_low" value="${kEvalMax}" min="0" max="60" step="0.5"
                      class="w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/30 eval-input" id="input_eval_${eal.key}_koist_eval_low" onchange="updateAdminPreview()">
                    <span class="text-xs text-gray-400">월</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      });

      // Also render legacy/mid keys that might exist
      const legacyKeys = items.filter(s => 
        (s.key.endsWith('_koist_prep') || s.key.endsWith('_koist_eval') ||
         s.key.includes('_koist_prep_mid') || s.key.includes('_koist_eval_mid')) && 
        !s.key.includes('_high') && !s.key.includes('_low') &&
        !s.key.endsWith('_general_prep') && !s.key.endsWith('_general_eval')
      );
      if (legacyKeys.length > 0) {
        html += `
      <details class="mt-4">
        <summary class="text-xs text-gray-400 cursor-pointer hover:text-gray-600">기존 호환 데이터 (${legacyKeys.length}개) - 자동 참조용</summary>
        <div class="mt-2 space-y-2 pl-4 border-l-2 border-gray-100">`;
        legacyKeys.forEach(s => {
          html += `
          <div class="flex items-center gap-2">
            <label class="text-xs text-gray-400 w-48 shrink-0">${s.description || s.key}</label>
            <input type="number" data-key="${s.key}" value="${s.value}" min="0" max="60" step="0.5"
              class="w-24 px-2 py-1 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/30" id="input_${s.key}">
            <span class="text-xs text-gray-400">개월</span>
          </div>`;
        });
        html += `
        </div>
      </details>`;
      }

      html += '</div></div>';
      continue;
    }

    items.forEach(s => {
      const isImageUrl = s.key.includes('bg_url') || s.key === 'logo_url';
      const isOpacity = s.key.includes('opacity');

      // Hero compact 2-line text fields (HTML allowed)
      if (s.key === 'hero_line1' || s.key === 'hero_line2') {
        const lineLabel = s.key === 'hero_line1' ? '히어로 첫번째 줄' : '히어로 두번째 줄';
        const lineHint = s.key === 'hero_line2' ? '<span class="text-xs text-blue-400 ml-1">(HTML 가능: &lt;span class=&quot;hero-gradient-text&quot;&gt;...&lt;/span&gt;)</span>' : '';
        html += `
        <div class="p-4 bg-indigo-50/40 border border-indigo-100 rounded-xl">
          <label class="block text-sm font-bold text-indigo-700 mb-2"><i class="fas fa-heading mr-1"></i> ${s.description || lineLabel} ${lineHint}</label>
          <textarea data-key="${s.key}" id="input_${s.key}" rows="2"
            class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            placeholder="${lineLabel}">${(s.value || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
          <div class="mt-2 p-2 bg-white rounded-lg border border-indigo-100">
            <span class="text-xs text-gray-400 mr-1">미리보기:</span>
            <span class="font-semibold text-gray-800 text-sm" id="preview_${s.key}">${s.value || ''}</span>
          </div>
        </div>`;
      // Services tag layout controls
      } else if (s.key === 'services_tag_font_scale') {
        html += `
        <div class="p-4 bg-orange-50/40 border border-orange-100 rounded-xl">
          <label class="block text-sm font-bold text-orange-700 mb-2"><i class="fas fa-text-height mr-1"></i> ${s.description || '사업분야 태그 글자 크기 배율'}</label>
          <div class="flex items-center gap-3">
            <input type="range" min="0.5" max="4" step="0.1" data-key="${s.key}" value="${s.value || '2'}" id="input_${s.key}"
              class="flex-1" oninput="document.getElementById('val_${s.key}').textContent=this.value+'배'">
            <span id="val_${s.key}" class="text-sm font-bold text-orange-600 w-12 text-center">${s.value || '2'}배</span>
          </div>
          <p class="text-xs text-gray-400 mt-1"><i class="fas fa-info-circle mr-1"></i>1 = 기본, 2 = 2배 크기, 0.5 = 절반 크기</p>
        </div>`;
      } else if (s.key === 'services_tag_gap_scale') {
        html += `
        <div class="p-4 bg-orange-50/40 border border-orange-100 rounded-xl">
          <label class="block text-sm font-bold text-orange-700 mb-2"><i class="fas fa-arrows-alt-h mr-1"></i> ${s.description || '사업분야 태그 간격 비율'}</label>
          <div class="flex items-center gap-3">
            <input type="range" min="0.3" max="2" step="0.1" data-key="${s.key}" value="${s.value || '0.7'}" id="input_${s.key}"
              class="flex-1" oninput="document.getElementById('val_${s.key}').textContent=(this.value*100).toFixed(0)+'%'">
            <span id="val_${s.key}" class="text-sm font-bold text-orange-600 w-12 text-center">${Math.round((parseFloat(s.value) || 0.7) * 100)}%</span>
          </div>
          <p class="text-xs text-gray-400 mt-1"><i class="fas fa-info-circle mr-1"></i>1.0 = 기본 간격, 0.7 = 30% 축소, 0.5 = 50% 축소</p>
        </div>`;
      } else if (s.key === 'services_grid_cols') {
        html += `
        <div class="p-4 bg-orange-50/40 border border-orange-100 rounded-xl">
          <label class="block text-sm font-bold text-orange-700 mb-2"><i class="fas fa-th mr-1"></i> ${s.description || '사업분야 그리드 열 수'}</label>
          <div class="flex items-center gap-3">
            <select data-key="${s.key}" id="input_${s.key}" class="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30">
              ${[3,4,5,6].map(n => `<option value="${n}" ${(s.value||'5')==n?'selected':''}>${n}열</option>`).join('')}
            </select>
            <p class="text-xs text-gray-400"><i class="fas fa-info-circle mr-1"></i>데스크탑 기준 열 수 (모바일은 자동 조정)</p>
          </div>
        </div>`;
      } else if (s.key === 'logo_url') {
        // Logo URL with special UI
        html += `
        <div class="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
          <label class="block text-sm font-bold text-blue-700 mb-3"><i class="fas fa-image mr-1"></i> ${s.description || '로고 이미지'}</label>
          <div class="flex flex-col md:flex-row gap-4 items-start">
            <div class="flex-1 w-full">
              <div class="flex gap-2">
                <input type="text" data-key="${s.key}" value="${(s.value || '').replace(/"/g, '&quot;')}" id="input_${s.key}"
                  placeholder="/api/images/logo/..." class="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500">
                <button type="button" onclick="openImagePicker('${s.key}')" class="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors">
                  <i class="fas fa-folder-open mr-1"></i>선택
                </button>
              </div>
              <p class="text-xs text-gray-400 mt-1.5"><i class="fas fa-lightbulb mr-1 text-yellow-500"></i>이미지 관리에서 업로드한 이미지 또는 외부 URL을 사용하세요.</p>
            </div>
            <div class="shrink-0 w-36 h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-white overflow-hidden" id="preview_${s.key}">
              ${s.value && s.value.trim() !== '' ? 
                `<img src="${s.value}" alt="미리보기" class="max-h-full max-w-full object-contain" onerror="this.parentNode.innerHTML='<span class=\\'text-xs text-red-400 text-center\\'><i class=\\'fas fa-exclamation-triangle text-2xl text-red-300 block mb-1\\'></i>오류</span>'">` :
                `<span class="text-xs text-gray-400 text-center"><i class="fas fa-image text-2xl text-gray-300 block mb-1"></i>미리보기</span>`}
            </div>
          </div>
        </div>`;
      } else if (isImageUrl) {
        // Background image URL with image picker
        html += `
        <div class="p-4 bg-${meta.color}-50/30 border border-${meta.color}-100 rounded-xl">
          <label class="block text-sm font-bold text-gray-700 mb-2"><i class="fas fa-image mr-1 text-${meta.color}-500"></i> ${s.description || s.key}</label>
          <div class="flex flex-col md:flex-row gap-3 items-start">
            <div class="flex-1 w-full">
              <div class="flex gap-2">
                <input type="text" data-key="${s.key}" value="${(s.value || '').replace(/"/g, '&quot;')}" id="input_${s.key}"
                  placeholder="/api/images/background/..." class="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                <button type="button" onclick="openImagePicker('${s.key}')" class="px-3 py-2 bg-${meta.color}-100 hover:bg-${meta.color}-200 text-${meta.color}-700 rounded-lg text-sm font-medium transition-colors">
                  <i class="fas fa-folder-open mr-1"></i>선택
                </button>
              </div>
            </div>
            <div class="shrink-0 w-32 h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-white overflow-hidden" id="preview_${s.key}">
              ${s.value && s.value.trim() !== '' ? 
                `<img src="${s.value}" alt="미리보기" class="w-full h-full object-cover" onerror="this.parentNode.innerHTML='<span class=\\'text-xs text-gray-400\\'>미리보기</span>'">` :
                `<span class="text-xs text-gray-400 text-center"><i class="fas fa-image text-xl text-gray-300 block mb-1"></i>없음</span>`}
            </div>
          </div>
        </div>`;
      } else if (isOpacity) {
        // Opacity slider
        html += `
        <div class="flex flex-col md:flex-row md:items-center gap-2">
          <label class="md:w-48 text-sm font-medium text-gray-600 shrink-0">${s.description || s.key}</label>
          <div class="flex-1 flex items-center gap-3">
            <input type="range" min="0" max="1" step="0.05" data-key="${s.key}" value="${s.value || '0.85'}" id="input_${s.key}"
              class="flex-1" oninput="document.getElementById('opacity_val_${s.key}').textContent=this.value">
            <span id="opacity_val_${s.key}" class="text-sm font-mono text-gray-500 w-10 text-center">${s.value || '0.85'}</span>
          </div>
        </div>`;
      } else {
        // Standard text input
        html += `
        <div class="flex flex-col md:flex-row md:items-center gap-2">
          <label class="md:w-48 text-sm font-medium text-gray-600 shrink-0">${s.description || s.key}</label>
          <input type="text" data-key="${s.key}" value="${(s.value || '').replace(/"/g, '&quot;')}" id="input_${s.key}"
            class="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500">
        </div>`;
      }
    });

    html += '</div></div>';
  }

  html += `
    <div class="sticky bottom-0 bg-white/90 backdrop-blur py-4 border-t -mx-6 px-6 flex items-center gap-3">
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
        <i class="fas fa-save mr-1"></i>전체 저장
      </button>
      <span id="saveMsg" class="text-sm hidden"></span>
    </div>
  </form>`;

  container.innerHTML = html;

  // ========= Image Picker Logic =========
  let pickerTargetKey = '';
  let allPickerImages = images;

  window.openImagePicker = function(settingKey) {
    pickerTargetKey = settingKey;
    document.getElementById('imagePickerModal').classList.remove('hidden');
    renderPickerGrid(allPickerImages);
  };

  window.closeImagePicker = function() {
    document.getElementById('imagePickerModal').classList.add('hidden');
    pickerTargetKey = '';
  };

  window.filterPickerImages = function(cat) {
    document.querySelectorAll('.picker-filter').forEach(b => {
      b.className = b.className.replace('bg-blue-500 text-white', 'bg-gray-100 text-gray-600');
    });
    event.target.className = event.target.className.replace('bg-gray-100 text-gray-600', 'bg-blue-500 text-white');
    const filtered = cat ? allPickerImages.filter(i => i.category === cat) : allPickerImages;
    renderPickerGrid(filtered);
  };

  function renderPickerGrid(imgs) {
    const grid = document.getElementById('pickerGrid');
    const empty = document.getElementById('pickerEmpty');
    if (imgs.length === 0) {
      grid.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');
    grid.innerHTML = imgs.map(img => `
      <div class="cursor-pointer group border-2 border-transparent hover:border-blue-500 rounded-xl overflow-hidden transition-all" onclick="selectPickerImage('/api/images/${img.r2_key}')">
        <div class="aspect-square bg-gray-100 overflow-hidden">
          <img src="/api/images/${img.r2_key}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy">
        </div>
        <p class="text-[10px] text-gray-500 p-1 truncate">${img.original_name}</p>
      </div>
    `).join('');
  }

  window.selectPickerImage = function(url) {
    if (!pickerTargetKey) return;
    const input = document.getElementById('input_' + pickerTargetKey);
    if (input) {
      input.value = url;
      updatePreview(pickerTargetKey, url);
    }
    closeImagePicker();
  };

  window.selectPickerUrl = function() {
    const url = document.getElementById('pickerUrlInput').value.trim();
    if (!url || !pickerTargetKey) return;
    const input = document.getElementById('input_' + pickerTargetKey);
    if (input) {
      input.value = url;
      updatePreview(pickerTargetKey, url);
    }
    closeImagePicker();
  };

  window.clearPickerValue = function() {
    if (!pickerTargetKey) return;
    const input = document.getElementById('input_' + pickerTargetKey);
    if (input) {
      input.value = '';
      updatePreview(pickerTargetKey, '');
    }
    closeImagePicker();
  };

  function updatePreview(key, url) {
    const preview = document.getElementById('preview_' + key);
    if (!preview) return;
    if (url && url.trim() !== '') {
      const isCover = key.includes('bg_url');
      preview.innerHTML = `<img src="${url}" alt="미리보기" class="${isCover ? 'w-full h-full object-cover' : 'max-h-full max-w-full object-contain'}" onerror="this.parentNode.innerHTML='<span class=\\'text-xs text-red-400\\'>오류</span>'">`;
    } else {
      preview.innerHTML = '<span class="text-xs text-gray-400 text-center"><i class="fas fa-image text-xl text-gray-300 block mb-1"></i>없음</span>';
    }
  }

  // Listen for input changes on image URL fields to update preview
  document.querySelectorAll('input[data-key]').forEach(input => {
    if (input.dataset.key.includes('bg_url') || input.dataset.key === 'logo_url') {
      input.addEventListener('input', function() {
        updatePreview(this.dataset.key, this.value);
      });
    }
  });

  // ========= Form Submit =========
  document.getElementById('settingsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('saveMsg');
    msg.textContent = '저장 중...';
    msg.className = 'text-sm text-gray-500';
    
    const inputs = document.querySelectorAll('[data-key]');
    let count = 0;
    for (const input of inputs) {
      await apiCall('/api/admin/settings/' + input.dataset.key, 'PUT', { value: input.value });
      count++;
    }
    msg.textContent = `${count}개 항목이 저장되었습니다. 홈페이지에 바로 반영됩니다!`;
    msg.className = 'text-sm text-green-600 font-medium';
    setTimeout(() => msg.className = 'text-sm hidden', 5000);
  });

  // ========= Simulator Preview (admin) =========
  window.updateAdminPreview = function() {
    const ealSel = document.getElementById('previewEalSelect');
    const prepSlider = document.getElementById('previewPrepSlider');
    if (!ealSel || !prepSlider) return;

    const ealKey = ealSel.value;
    const prepVal = parseInt(prepSlider.value);
    document.getElementById('previewPrepVal').textContent = prepVal + '%';

    // Read current input values
    function getVal(key) {
      const el = document.getElementById('input_' + key);
      return el ? parseFloat(el.value) || 0 : 0;
    }

    const gPrep = getVal('eval_' + ealKey + '_general_prep');
    const gEval = getVal('eval_' + ealKey + '_general_eval');
    const kPrepMin = getVal('eval_' + ealKey + '_koist_prep_high');
    const kPrepMax = getVal('eval_' + ealKey + '_koist_prep_low');
    const kEvalMin = getVal('eval_' + ealKey + '_koist_eval_high');
    const kEvalMax = getVal('eval_' + ealKey + '_koist_eval_low');

    const gTotal = gPrep + gEval;

    // t=0 at prepVal=100 (best), t=1 at prepVal=1 (worst)
    const t = 1 - (prepVal - 1) / 99;
    const kPrep = Math.round((kPrepMin + (kPrepMax - kPrepMin) * t) * 10) / 10;
    const kEval = Math.round((kEvalMin + (kEvalMax - kEvalMin) * t) * 10) / 10;
    const kTotal = Math.round((kPrep + kEval) * 10) / 10;
    const reduction = gTotal > 0 ? Math.round((1 - kTotal / gTotal) * 100) : 0;
    const saving = Math.round((gTotal - kTotal) * 10) / 10;

    function fmt(v) { return v === Math.floor(v) ? v.toString() : v.toFixed(1); }

    document.getElementById('previewCcraTotal').textContent = fmt(gTotal);
    document.getElementById('previewCcraPrep').textContent = fmt(gPrep);
    document.getElementById('previewCcraEval').textContent = fmt(gEval);
    document.getElementById('previewKoistTotal').textContent = fmt(kTotal);
    document.getElementById('previewKoistPrep').textContent = fmt(kPrep);
    document.getElementById('previewKoistEval').textContent = fmt(kEval);
    document.getElementById('previewReduction').innerHTML = '<i class="fas fa-arrow-down" style="font-size:8px"></i> ' + reduction + '% 단축';
    document.getElementById('previewSaving').textContent = '약 ' + fmt(saving) + '개월 절감';
  };

  // Initialize preview
  setTimeout(function() {
    if (document.getElementById('previewEalSelect')) {
      window.updateAdminPreview();
    }
  }, 100);
})();
