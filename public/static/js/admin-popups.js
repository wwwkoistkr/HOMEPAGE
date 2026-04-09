// Admin - Popups Management (Full CRUD with Edit)
(async function() {
  const container = document.getElementById('admin-content');
  let popupList = [];
  await loadPopups();

  async function loadPopups() {
    const data = await apiCall('/api/admin/popups');
    if (!data) return;
    popupList = data.data || [];
    let html = '<div class="flex justify-between items-center mb-4">';
    html += '<span class="text-gray-500 text-sm">총 ' + popupList.length + '개</span>';
    html += '<button onclick="showPopupForm()" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"><i class="fas fa-plus mr-1"></i>팝업 추가</button>';
    html += '</div><div id="popupFormArea" class="hidden mb-4"></div><div class="space-y-3">';

    popupList.forEach(p => {
      html += '<div class="border rounded-lg p-4 flex items-center justify-between gap-4">';
      html += '<div class="min-w-0">';
      html += '<div class="flex items-center gap-2"><span class="font-medium text-gray-800">' + p.title + '</span>';
      html += '<span class="px-2 py-0.5 rounded text-xs ' + (p.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500') + '">' + (p.is_active ? '활성' : '비활성') + '</span></div>';
      html += '<div class="text-xs text-gray-400 mt-1">' + p.width + 'x' + p.height + 'px | 위치: top:' + p.position_top + ' left:' + p.position_left + ' | 타입: ' + p.popup_type + '</div>';
      if(p.start_date || p.end_date) html += '<div class="text-xs text-gray-400">기간: '+(p.start_date||'없음')+' ~ '+(p.end_date||'없음')+'</div>';
      html += '</div>';
      html += '<div class="flex gap-2 shrink-0">';
      html += '<button onclick="editPopup(' + p.id + ')" class="text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50">수정</button>';
      html += '<button onclick="togglePopup(' + p.id + ', ' + (p.is_active ? 0 : 1) + ')" class="text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50">' + (p.is_active ? '비활성화' : '활성화') + '</button>';
      html += '<button onclick="deletePopup(' + p.id + ')" class="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">삭제</button>';
      html += '</div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
  }

  function popupFormHtml(popup) {
    const isEdit = !!popup;
    return '<div class="border rounded-lg p-4 bg-gray-50">'
      + '<h4 class="font-medium mb-3">' + (isEdit ? '팝업 수정' : '새 팝업 추가') + '</h4>'
      + '<div class="grid grid-cols-2 gap-3 mb-3">'
      + '<input id="pTitle" value="' + (popup?.title || '').replace(/"/g,'&quot;') + '" placeholder="제목" class="px-3 py-2 border rounded-lg text-sm">'
      + '<select id="pType" class="px-3 py-2 border rounded-lg text-sm"><option value="html"' + (popup?.popup_type === 'html' || !popup ? ' selected' : '') + '>HTML</option><option value="image"' + (popup?.popup_type === 'image' ? ' selected' : '') + '>이미지</option></select>'
      + '<input id="pWidth" type="number" value="' + (popup?.width || 420) + '" placeholder="너비(px)" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="pHeight" type="number" value="' + (popup?.height || 300) + '" placeholder="높이(px)" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="pTop" type="number" value="' + (popup?.position_top ?? 100) + '" placeholder="Top(px)" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="pLeft" type="number" value="' + (popup?.position_left ?? 0) + '" placeholder="Left(px)" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="pStart" type="date" value="' + (popup?.start_date ? popup.start_date.split('T')[0] : '') + '" class="px-3 py-2 border rounded-lg text-sm" placeholder="시작일">'
      + '<input id="pEnd" type="date" value="' + (popup?.end_date ? popup.end_date.split('T')[0] : '') + '" class="px-3 py-2 border rounded-lg text-sm" placeholder="종료일">'
      + '</div>'
      + '<textarea id="pContent" rows="6" placeholder="HTML 콘텐츠 (또는 이미지 URL)" class="w-full px-3 py-2 border rounded-lg text-sm mb-3 font-mono">' + (popup?.popup_type === 'image' ? (popup?.image_url || '') : (popup?.content || '')) + '</textarea>'
      + '<div class="flex gap-2">'
      + '<button onclick="savePopup(' + (popup?.id || 'null') + ')" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">저장</button>'
      + '<button onclick="document.getElementById(\'popupFormArea\').classList.add(\'hidden\')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">취소</button>'
      + '</div></div>';
  }

  window.showPopupForm = function() {
    const area = document.getElementById('popupFormArea');
    area.classList.remove('hidden');
    area.innerHTML = popupFormHtml(null);
  };

  window.editPopup = function(id) {
    const popup = popupList.find(p => p.id === id);
    if (!popup) return;
    const area = document.getElementById('popupFormArea');
    area.classList.remove('hidden');
    area.innerHTML = popupFormHtml(popup);
    area.scrollIntoView({behavior:'smooth'});
  };

  window.savePopup = async function(id) {
    const type = document.getElementById('pType').value;
    const body = {
      title: document.getElementById('pTitle').value,
      popup_type: type,
      content: type === 'html' ? document.getElementById('pContent').value : '',
      image_url: type === 'image' ? document.getElementById('pContent').value : '',
      width: parseInt(document.getElementById('pWidth').value) || 420,
      height: parseInt(document.getElementById('pHeight').value) || 300,
      position_top: parseInt(document.getElementById('pTop').value) || 0,
      position_left: parseInt(document.getElementById('pLeft').value) || 0,
      start_date: document.getElementById('pStart').value || null,
      end_date: document.getElementById('pEnd').value || null,
    };
    if (id) await apiCall('/api/admin/popups/' + id, 'PUT', body);
    else await apiCall('/api/admin/popups', 'POST', body);
    document.getElementById('popupFormArea').classList.add('hidden');
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
