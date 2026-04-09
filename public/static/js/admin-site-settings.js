// Admin - Site Settings Management
(async function() {
  const container = document.getElementById('admin-content');
  const data = await apiCall('/api/admin/settings');
  if (!data || !data.data) { container.innerHTML = '<p class="text-red-500">데이터 로딩 실패</p>'; return; }

  const categories = { general: '일반', contact: '연락처', theme: '디자인', seo: 'SEO' };
  const grouped = {};
  data.data.forEach(s => {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  });

  let html = '<form id="settingsForm">';
  for (const [cat, label] of Object.entries(categories)) {
    const items = grouped[cat] || [];
    if (items.length === 0) continue;
    html += `<div class="mb-8"><h3 class="text-lg font-bold text-gray-700 mb-4 pb-2 border-b"><i class="fas fa-tag text-blue-500 mr-1"></i>${label}</h3><div class="space-y-4">`;
    items.forEach(s => {
      if (s.key === 'logo_url') {
        // 로고 URL 전용 UI - 미리보기 포함
        html += `<div class="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
          <label class="block text-sm font-bold text-blue-700 mb-3"><i class="fas fa-image mr-1"></i> 로고 이미지 설정</label>
          <div class="flex flex-col md:flex-row gap-4 items-start">
            <div class="flex-1 w-full">
              <input type="text" data-key="${s.key}" value="${(s.value || '').replace(/"/g, '&quot;')}" id="logo_url_input"
                placeholder="https://example.com/my-logo.png"
                class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500">
              <p class="text-xs text-gray-500 mt-1.5"><i class="fas fa-info-circle mr-1"></i>외부 이미지 URL을 입력하세요. 비워두면 기본 아이콘이 표시됩니다.</p>
              <p class="text-xs text-gray-400 mt-1"><i class="fas fa-lightbulb mr-1 text-yellow-500"></i>Tip: 이미지를 <a href="https://imgur.com" target="_blank" class="text-blue-500 underline">Imgur</a>에 업로드 후 URL을 복사하세요.</p>
            </div>
            <div class="shrink-0 w-36 h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-white overflow-hidden" id="logo_preview_box">
              ${s.value && s.value.trim() !== '' && s.value !== '/static/images/logo.png'
                ? `<img src="${s.value}" alt="로고 미리보기" class="max-h-full max-w-full object-contain" id="logo_preview_img">`
                : `<span class="text-xs text-gray-400 text-center"><i class="fas fa-image text-2xl text-gray-300 block mb-1"></i>미리보기</span>`}
            </div>
          </div>
        </div>`;
      } else {
        html += `<div class="flex flex-col md:flex-row md:items-center gap-2">
          <label class="md:w-48 text-sm font-medium text-gray-600 shrink-0">${s.description || s.key}</label>
          <input type="text" data-key="${s.key}" value="${(s.value || '').replace(/"/g, '&quot;')}" 
            class="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500">
        </div>`;
      }
    });
    html += '</div></div>';
  }
  html += '<button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"><i class="fas fa-save mr-1"></i>저장</button>';
  html += '<span id="saveMsg" class="ml-3 text-sm hidden"></span></form>';
  container.innerHTML = html;

  // 로고 URL 실시간 미리보기
  const logoInput = document.getElementById('logo_url_input');
  if (logoInput) {
    logoInput.addEventListener('input', function() {
      const box = document.getElementById('logo_preview_box');
      const url = this.value.trim();
      if (url && url !== '/static/images/logo.png') {
        box.innerHTML = `<img src="${url}" alt="로고 미리보기" class="max-h-full max-w-full object-contain" id="logo_preview_img" onerror="this.parentNode.innerHTML='<span class=\\'text-xs text-red-400 text-center\\'><i class=\\'fas fa-exclamation-triangle text-2xl text-red-300 block mb-1\\'></i>이미지 오류</span>'">`;
      } else {
        box.innerHTML = `<span class="text-xs text-gray-400 text-center"><i class="fas fa-image text-2xl text-gray-300 block mb-1"></i>미리보기</span>`;
      }
    });
  }

  document.getElementById('settingsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('saveMsg');
    const inputs = document.querySelectorAll('[data-key]');
    let count = 0;
    for (const input of inputs) {
      await apiCall('/api/admin/settings/' + input.dataset.key, 'PUT', { value: input.value });
      count++;
    }
    msg.textContent = `${count}개 항목이 저장되었습니다. 홈페이지에 바로 반영됩니다!`;
    msg.className = 'ml-3 text-sm text-green-600 font-medium';
    setTimeout(() => msg.className = 'ml-3 text-sm hidden', 4000);
  });
})();
