// Admin - Image Management (R2 Storage)
(async function() {
  const container = document.getElementById('admin-content');
  const categories = [
    { value: 'background', label: '배경 이미지' },
    { value: 'logo', label: '로고' },
    { value: 'popup', label: '팝업' },
    { value: 'content', label: '콘텐츠' },
    { value: 'general', label: '일반' },
  ];

  let currentFilter = '';

  async function loadImages() {
    const url = currentFilter ? `/api/admin/images?category=${currentFilter}` : '/api/admin/images';
    const data = await apiCall(url);
    if (!data || !data.data) { container.innerHTML = '<p class="text-red-500">데이터 로딩 실패</p>'; return; }
    render(data.data);
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function render(images) {
    let html = `
      <!-- Upload Area -->
      <div class="mb-6">
        <div id="uploadArea" class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer relative">
          <input type="file" id="fileInput" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" multiple>
          <i class="fas fa-cloud-upload-alt text-4xl text-gray-300 mb-3 block"></i>
          <p class="text-gray-600 font-medium">클릭하거나 파일을 여기에 드래그하세요</p>
          <p class="text-gray-400 text-sm mt-1">JPG, PNG, GIF, WebP, SVG (최대 5MB)</p>
        </div>
        <div id="uploadForm" class="hidden mt-4 bg-gray-50 rounded-xl p-4 border">
          <div class="flex flex-wrap items-end gap-3">
            <div class="flex-1 min-w-[200px]">
              <label class="block text-sm font-medium text-gray-600 mb-1">카테고리</label>
              <select id="uploadCategory" class="w-full px-3 py-2 border rounded-lg text-sm">
                ${categories.map(c => `<option value="${c.value}">${c.label}</option>`).join('')}
              </select>
            </div>
            <div class="flex-1 min-w-[200px]">
              <label class="block text-sm font-medium text-gray-600 mb-1">설명 (alt text)</label>
              <input type="text" id="uploadAlt" placeholder="이미지 설명..." class="w-full px-3 py-2 border rounded-lg text-sm">
            </div>
            <button id="uploadBtn" onclick="doUpload()" class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors">
              <i class="fas fa-upload mr-1"></i> 업로드
            </button>
          </div>
          <div id="uploadPreview" class="flex flex-wrap gap-2 mt-3"></div>
          <div id="uploadProgress" class="hidden mt-3">
            <div class="bg-gray-200 rounded-full h-2">
              <div id="progressBar" class="bg-blue-500 h-2 rounded-full transition-all" style="width: 0%"></div>
            </div>
            <p id="progressText" class="text-sm text-gray-500 mt-1"></p>
          </div>
        </div>
      </div>

      <!-- Filter -->
      <div class="flex items-center gap-2 mb-4">
        <span class="text-sm text-gray-500">필터:</span>
        <button onclick="filterImages('')" class="px-3 py-1 rounded-full text-xs font-medium transition-colors ${!currentFilter ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">전체</button>
        ${categories.map(c => `<button onclick="filterImages('${c.value}')" class="px-3 py-1 rounded-full text-xs font-medium transition-colors ${currentFilter === c.value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">${c.label}</button>`).join('')}
        <span class="ml-auto text-sm text-gray-400">${images.length}개 이미지</span>
      </div>

      <!-- Image Grid -->
      ${images.length > 0 ? `
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        ${images.map(img => `
        <div class="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
          <div class="aspect-square bg-gray-100 overflow-hidden">
            <img src="/api/images/${img.r2_key}" alt="${img.alt_text || img.original_name}" 
                 class="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                 loading="lazy" onerror="this.parentNode.innerHTML='<div class=\\'flex items-center justify-center h-full text-gray-300\\'><i class=\\'fas fa-image text-3xl\\'></i></div>'">
          </div>
          <div class="p-3">
            <p class="text-xs font-medium text-gray-700 truncate" title="${img.original_name}">${img.original_name}</p>
            <div class="flex items-center justify-between mt-1">
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">${img.category}</span>
              <span class="text-[10px] text-gray-400">${formatSize(img.file_size)}</span>
            </div>
          </div>
          <!-- Actions overlay -->
          <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <button onclick="copyImageUrl('${img.r2_key}')" title="URL 복사" class="w-7 h-7 bg-white/90 rounded-lg shadow text-gray-600 hover:text-blue-500 flex items-center justify-center text-xs">
              <i class="fas fa-copy"></i>
            </button>
            <button onclick="deleteImage(${img.id}, '${img.original_name}')" title="삭제" class="w-7 h-7 bg-white/90 rounded-lg shadow text-gray-600 hover:text-red-500 flex items-center justify-center text-xs">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        `).join('')}
      </div>
      ` : `
      <div class="text-center py-16">
        <i class="fas fa-images text-4xl text-gray-300 mb-3 block"></i>
        <p class="text-gray-500">등록된 이미지가 없습니다.</p>
        <p class="text-gray-400 text-sm mt-1">위의 업로드 영역을 이용해 이미지를 추가하세요.</p>
      </div>
      `}
    `;
    container.innerHTML = html;
    initUpload();
  }

  let selectedFiles = [];

  function initUpload() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');

    fileInput.addEventListener('change', (e) => {
      selectedFiles = Array.from(e.target.files);
      showUploadForm();
    });

    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('border-blue-400', 'bg-blue-50/50');
    });
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('border-blue-400', 'bg-blue-50/50');
    });
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('border-blue-400', 'bg-blue-50/50');
      selectedFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      if (selectedFiles.length > 0) showUploadForm();
    });
  }

  function showUploadForm() {
    document.getElementById('uploadForm').classList.remove('hidden');
    const preview = document.getElementById('uploadPreview');
    preview.innerHTML = selectedFiles.map((f, i) => `
      <div class="relative w-20 h-20 rounded-lg overflow-hidden border bg-gray-100">
        <img src="${URL.createObjectURL(f)}" class="w-full h-full object-cover">
        <span class="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] text-center py-0.5 truncate px-1">${f.name}</span>
      </div>
    `).join('');
  }

  window.doUpload = async function() {
    if (selectedFiles.length === 0) return;
    const btn = document.getElementById('uploadBtn');
    const progress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const category = document.getElementById('uploadCategory').value;
    const altText = document.getElementById('uploadAlt').value;

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> 업로드 중...';
    progress.classList.remove('hidden');

    let success = 0;
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      progressText.textContent = `${i + 1}/${selectedFiles.length} - ${file.name}`;
      progressBar.style.width = `${((i) / selectedFiles.length) * 100}%`;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);
      formData.append('alt_text', altText);

      try {
        const res = await fetch('/api/admin/images', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + getToken() },
          body: formData,
        });
        const data = await res.json();
        if (data.success) success++;
      } catch (err) {
        console.error('Upload error:', err);
      }

      progressBar.style.width = `${((i + 1) / selectedFiles.length) * 100}%`;
    }

    progressText.textContent = `완료! ${success}/${selectedFiles.length}개 업로드됨`;
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-upload mr-1"></i> 업로드';
    selectedFiles = [];

    setTimeout(() => {
      loadImages();
    }, 1000);
  };

  window.copyImageUrl = function(r2Key) {
    const url = `/api/images/${r2Key}`;
    navigator.clipboard.writeText(url).then(() => {
      // Show a brief toast
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50';
      toast.innerHTML = '<i class="fas fa-check mr-1"></i> URL이 복사되었습니다';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    });
  };

  window.deleteImage = async function(id, name) {
    if (!confirm(`"${name}" 이미지를 삭제하시겠습니까?\n이 이미지를 배경으로 사용 중인 곳이 있으면 해당 부분에 영향이 있습니다.`)) return;
    const res = await apiCall(`/api/admin/images/${id}`, 'DELETE');
    if (res && res.success) loadImages();
  };

  window.filterImages = function(cat) {
    currentFilter = cat;
    loadImages();
  };

  loadImages();
})();
