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
    evaluation: { label: '평가기간 바 그래프', icon: 'fa-chart-bar', color: 'cyan' },
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

    items.forEach(s => {
      const isImageUrl = s.key.includes('bg_url') || s.key === 'logo_url';
      const isOpacity = s.key.includes('opacity');

      if (s.key === 'logo_url') {
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
})();
