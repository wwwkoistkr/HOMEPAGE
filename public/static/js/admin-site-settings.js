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
      html += `<div class="flex flex-col md:flex-row md:items-center gap-2">
        <label class="md:w-48 text-sm font-medium text-gray-600 shrink-0">${s.description || s.key}</label>
        <input type="text" data-key="${s.key}" value="${(s.value || '').replace(/"/g, '&quot;')}" 
          class="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500">
      </div>`;
    });
    html += '</div></div>';
  }
  html += '<button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"><i class="fas fa-save mr-1"></i>저장</button>';
  html += '<span id="saveMsg" class="ml-3 text-sm hidden"></span></form>';
  container.innerHTML = html;

  document.getElementById('settingsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('saveMsg');
    const inputs = document.querySelectorAll('[data-key]');
    let count = 0;
    for (const input of inputs) {
      await apiCall('/api/admin/settings/' + input.dataset.key, 'PUT', { value: input.value });
      count++;
    }
    msg.textContent = `${count}개 항목이 저장되었습니다.`;
    msg.className = 'ml-3 text-sm text-green-600';
    setTimeout(() => msg.className = 'ml-3 text-sm hidden', 3000);
  });
})();
