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
    simulator: { label: '시뮬레이터 UI 라벨', icon: 'fa-sliders', color: 'indigo' },
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

    // Custom evaluation UI → redirect to AI Simulator page
    if (cat === 'evaluation' && meta.custom) {
      html += `
      <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-6 mb-4">
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style="background: linear-gradient(135deg, #2563EB, #06B6D4);">
            <i class="fas fa-robot text-white text-lg"></i>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-gray-800 text-base mb-2">홈페이지 슬라이더 데이터 관리</h3>
            <p class="text-sm text-gray-600 mb-3">
              홈페이지 상단의 AI 시뮬레이터 슬라이더 바에 표시되는 평가기간 데이터는
              <strong>"AI 시뮬레이터 인증유형 관리"</strong> 페이지에서 관리합니다.
            </p>
            <div class="bg-white rounded-lg p-3 border border-blue-100 mb-3">
              <p class="text-xs text-gray-500 mb-1"><i class="fas fa-info-circle text-blue-400 mr-1"></i>데이터 흐름:</p>
              <p class="text-xs text-gray-600">AI 시뮬레이터에서 <strong>주(weeks)</strong> 단위로 입력 → 서버가 자동으로 <strong>월(months)</strong>로 변환 → 홈페이지 슬라이더에 반영</p>
            </div>
            <a href="/admin/sim-cert-types" class="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
              <i class="fas fa-robot"></i> AI 시뮬레이터 인증유형 관리로 이동
              <i class="fas fa-arrow-right text-xs"></i>
            </a>
          </div>
        </div>
      </div>`;

      html += '</div></div>';
      continue;
    }

    items.forEach(s => {
      const isImageUrl = s.key.includes('bg_url') || s.key === 'logo_url';
      const isOpacity = s.key.includes('opacity');
      const isGradientColor = s.key.startsWith('hero_gradient_color');

      // Hero gradient color picker
      if (isGradientColor) {
        const colorNum = s.key.replace('hero_gradient_color', '');
        const stops = {1:'0%', 2:'25%', 3:'45%', 4:'70%', 5:'100%'};
        html += `
        <div class="flex items-center gap-3 p-3 rounded-lg border border-pink-100 bg-pink-50/30">
          <input type="color" data-key="${s.key}" value="${s.value || '#070B14'}" id="input_${s.key}"
            class="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer" style="padding:1px;"
            oninput="updateGradientPreview()">
          <div class="flex-1 min-w-0">
            <label class="text-sm font-medium text-gray-700">${s.description || '색상 '+colorNum}</label>
            <div class="text-xs text-gray-400">위치: ${stops[colorNum] || ''} | <span id="colorVal_${s.key}" class="font-mono">${s.value || '#070B14'}</span></div>
          </div>
        </div>`;
      // Hero compact 2-line text fields (HTML allowed)
      } else if (s.key === 'hero_line1' || s.key === 'hero_line2') {
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
      // GNB Menu Layout Controls
      } else if (s.key === 'gnb_font_scale') {
        html += `
        <div class="p-4 bg-sky-50/40 border border-sky-100 rounded-xl">
          <label class="block text-sm font-bold text-sky-700 mb-2"><i class="fas fa-text-height mr-1"></i> ${s.description || 'GNB 메뉴 글자 크기 배율'}</label>
          <div class="flex items-center gap-3">
            <input type="range" min="0.5" max="4" step="0.1" data-key="${s.key}" value="${s.value || '2'}" id="input_${s.key}"
              class="flex-1" oninput="document.getElementById('val_${s.key}').textContent=this.value+'배'">
            <span id="val_${s.key}" class="text-sm font-bold text-sky-600 w-12 text-center">${s.value || '2'}배</span>
          </div>
          <p class="text-xs text-gray-400 mt-1"><i class="fas fa-info-circle mr-1"></i>1 = 기본(~12px), 2 = 2배(~24px). 상단 내비게이션 바의 사업분야 메뉴 글자 크기</p>
        </div>`;
      } else if (s.key === 'gnb_gap_scale') {
        html += `
        <div class="p-4 bg-sky-50/40 border border-sky-100 rounded-xl">
          <label class="block text-sm font-bold text-sky-700 mb-2"><i class="fas fa-arrows-alt-h mr-1"></i> ${s.description || 'GNB 메뉴 간격 비율'}</label>
          <div class="flex items-center gap-3">
            <input type="range" min="0.1" max="2" step="0.1" data-key="${s.key}" value="${s.value || '0.5'}" id="input_${s.key}"
              class="flex-1" oninput="document.getElementById('val_${s.key}').textContent=(this.value*100).toFixed(0)+'%'">
            <span id="val_${s.key}" class="text-sm font-bold text-sky-600 w-12 text-center">${Math.round((parseFloat(s.value) || 0.5) * 100)}%</span>
          </div>
          <p class="text-xs text-gray-400 mt-1"><i class="fas fa-info-circle mr-1"></i>1.0 = 기본 간격, 0.5 = 50% 축소. 메뉴 항목 사이 여백</p>
        </div>`;
      } else if (s.key === 'gnb_font_weight') {
        html += `
        <div class="p-4 bg-sky-50/40 border border-sky-100 rounded-xl">
          <label class="block text-sm font-bold text-sky-700 mb-2"><i class="fas fa-bold mr-1"></i> ${s.description || 'GNB 글자 두께'}</label>
          <select data-key="${s.key}" id="input_${s.key}" class="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30">
            ${[{v:'300',l:'Light'},{v:'400',l:'Regular'},{v:'500',l:'Medium'},{v:'600',l:'SemiBold'},{v:'700',l:'Bold'},{v:'800',l:'ExtraBold'},{v:'900',l:'Black'}].map(w => 
              '<option value="'+w.v+'" '+((s.value||'600')==w.v?'selected':'')+'>'+w.v+' ('+w.l+')</option>'
            ).join('')}
          </select>
        </div>`;
      } else if (s.key === 'gnb_text_color' || s.key === 'gnb_hover_color') {
        const label = s.key === 'gnb_text_color' ? 'GNB 기본 글자 색상' : 'GNB hover 글자 색상';
        html += `
        <div class="flex flex-col md:flex-row md:items-center gap-2">
          <label class="md:w-48 text-sm font-medium text-gray-600 shrink-0"><i class="fas fa-palette mr-1 text-sky-500"></i>${s.description || label}</label>
          <input type="text" data-key="${s.key}" value="${(s.value || '').replace(/"/g, '&quot;')}" id="input_${s.key}"
            class="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
            placeholder="rgba(220,228,240,0.92) 또는 #FFFFFF">
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
    const kPrep = Math.round(kPrepMin + (kPrepMax - kPrepMin) * t);
    const kEval = Math.round(kEvalMin + (kEvalMax - kEvalMin) * t);
    const kTotal = kPrep + kEval;
    const reduction = gTotal > 0 ? Math.round((1 - kTotal / gTotal) * 100) : 0;
    const saving = Math.round(gTotal - kTotal);

    function fmt(v) { return Math.round(v).toString(); }

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

  // ========= Gradient Preview =========
  window.updateGradientPreview = function() {
    var colors = [];
    for (var i = 1; i <= 5; i++) {
      var el = document.getElementById('input_hero_gradient_color' + i);
      if (el) {
        colors.push(el.value);
        var valEl = document.getElementById('colorVal_hero_gradient_color' + i);
        if (valEl) valEl.textContent = el.value;
      }
    }
    var previewEl = document.getElementById('gradientPreviewBar');
    if (previewEl && colors.length === 5) {
      previewEl.style.background = 'linear-gradient(135deg, '+colors[0]+' 0%, '+colors[1]+' 25%, '+colors[2]+' 45%, '+colors[3]+' 70%, '+colors[4]+' 100%)';
    }
  };

  // Add gradient preview bar after color inputs
  setTimeout(function() {
    var c1 = document.getElementById('input_hero_gradient_color1');
    if (c1) {
      var parentDiv = c1.closest('.space-y-4');
      if (parentDiv) {
        // find the last gradient color input wrapper
        var allGradInputs = parentDiv.querySelectorAll('[id^="input_hero_gradient_color"]');
        var lastInput = allGradInputs[allGradInputs.length - 1];
        if (lastInput) {
          var wrapper = lastInput.closest('.flex.items-center');
          if (wrapper) {
            var previewDiv = document.createElement('div');
            previewDiv.className = 'rounded-xl overflow-hidden border border-pink-200';
            previewDiv.style.cssText = 'margin-top:8px;';
            var c = [];
            for (var i = 1; i <= 5; i++) {
              var el = document.getElementById('input_hero_gradient_color' + i);
              c.push(el ? el.value : '#070B14');
            }
            previewDiv.innerHTML = '<div class="px-3 py-1.5 bg-pink-50 flex items-center justify-between"><span class="text-xs font-medium text-pink-600"><i class="fas fa-eye mr-1"></i>히어로 배경 미리보기</span><span class="text-xs text-gray-400">저장하면 홈페이지에 반영됩니다</span></div>'
              + '<div id="gradientPreviewBar" style="height:60px;background:linear-gradient(135deg,'+c[0]+' 0%,'+c[1]+' 25%,'+c[2]+' 45%,'+c[3]+' 70%,'+c[4]+' 100%);"></div>';
            wrapper.parentNode.insertBefore(previewDiv, wrapper.nextSibling);
          }
        }
      }
    }
  }, 150);
})();
