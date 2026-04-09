// Admin - Popups Management
(async function() {
  const container = document.getElementById('admin-content');
  await loadPopups();

  async function loadPopups() {
    const data = await apiCall('/api/admin/popups');
    if (!data) return;
    let html = '<div class="flex justify-between items-center mb-4"><span class="text-gray-500 text-sm">총 ' + (data.data?.length || 0) + '개</span><button onclick="showPopupForm()" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"><i class="fas fa-plus mr-1"></i>팝업 추가</button></div>';
    html += '<div id="popupFormArea" class="hidden mb-4"></div>';
    html += '<div class="space-y-3">';
    (data.data || []).forEach(p => {
      html += `<div class="border rounded-lg p-4 flex items-center justify-between gap-4">
        <div class="min-w-0">
          <div class="flex items-center gap-2"><span class="font-medium text-gray-800">${p.title}</span>
          <span class="px-2 py-0.5 rounded text-xs ${p.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}">${p.is_active ? '활성' : '비활성'}</span></div>
          <div class="text-xs text-gray-400 mt-1">${p.width}x${p.height}px | 위치: top:${p.position_top} left:${p.position_left} | 타입: ${p.popup_type}</div>
        </div>
        <div class="flex gap-2 shrink-0">
          <button onclick="togglePopup(${p.id}, ${p.is_active ? 0 : 1})" class="text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50">${p.is_active ? '비활성화' : '활성화'}</button>
          <button onclick="deletePopup(${p.id})" class="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">삭제</button>
        </div>
      </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  }

  window.showPopupForm = function() {
    const area = document.getElementById('popupFormArea');
    area.classList.remove('hidden');
    area.innerHTML = `<div class="border rounded-lg p-4 bg-gray-50">
      <h4 class="font-medium mb-3">새 팝업 추가</h4>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <input id="pTitle" placeholder="제목" class="px-3 py-2 border rounded-lg text-sm">
        <select id="pType" class="px-3 py-2 border rounded-lg text-sm"><option value="html">HTML</option><option value="image">이미지</option></select>
        <input id="pWidth" type="number" value="420" placeholder="너비" class="px-3 py-2 border rounded-lg text-sm">
        <input id="pHeight" type="number" value="300" placeholder="높이" class="px-3 py-2 border rounded-lg text-sm">
        <input id="pTop" type="number" value="100" placeholder="Top(px)" class="px-3 py-2 border rounded-lg text-sm">
        <input id="pLeft" type="number" value="0" placeholder="Left(px)" class="px-3 py-2 border rounded-lg text-sm">
      </div>
      <textarea id="pContent" rows="4" placeholder="HTML 콘텐츠 (또는 이미지 URL)" class="w-full px-3 py-2 border rounded-lg text-sm mb-3"></textarea>
      <div class="flex gap-2">
        <button onclick="savePopup()" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">저장</button>
        <button onclick="document.getElementById('popupFormArea').classList.add('hidden')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">취소</button>
      </div>
    </div>`;
  };

  window.savePopup = async function() {
    const type = document.getElementById('pType').value;
    const body = {
      title: document.getElementById('pTitle').value,
      popup_type: type,
      content: type === 'html' ? document.getElementById('pContent').value : '',
      image_url: type === 'image' ? document.getElementById('pContent').value : '',
      width: parseInt(document.getElementById('pWidth').value),
      height: parseInt(document.getElementById('pHeight').value),
      position_top: parseInt(document.getElementById('pTop').value),
      position_left: parseInt(document.getElementById('pLeft').value),
    };
    await apiCall('/api/admin/popups', 'POST', body);
    await loadPopups();
  };

  window.togglePopup = async function(id, active) {
    await apiCall('/api/admin/popups/' + id, 'PUT', { is_active: active });
    await loadPopups();
  };

  window.deletePopup = async function(id) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await apiCall('/api/admin/popups/' + id, 'DELETE');
    await loadPopups();
  };
})();
