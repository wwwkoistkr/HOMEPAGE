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
      html += '<div class="border rounded-lg p-4 flex items-start justify-between gap-4">';
      // Thumbnail preview for image popups
      if (p.popup_type === 'image' && p.image_url) {
        html += '<div class="shrink-0 rounded-lg overflow-hidden border border-gray-200" style="width:80px; height:80px;">';
        html += '<img src="' + p.image_url + '" alt="' + p.title + '" class="w-full h-full object-cover">';
        html += '</div>';
      }
      html += '<div class="min-w-0 flex-1">';
      html += '<div class="flex items-center gap-2"><span class="font-medium text-gray-800">' + p.title + '</span>';
      html += '<span class="px-2 py-0.5 rounded text-xs ' + (p.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500') + '">' + (p.is_active ? '활성' : '비활성') + '</span>';
      html += '<span class="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-600">' + p.popup_type + '</span></div>';
      html += '<div class="text-xs text-gray-400 mt-1">' + p.width + 'x' + p.height + 'px | 위치: top:' + p.position_top + ' left:' + p.position_left + '</div>';
      if (p.popup_type === 'image' && p.image_url) html += '<div class="text-xs text-gray-400 mt-0.5 truncate">이미지: ' + p.image_url + '</div>';
      if(p.start_date || p.end_date) html += '<div class="text-xs text-gray-400">기간: '+(p.start_date||'없음')+' ~ '+(p.end_date||'없음')+'</div>';
      html += '</div>';
      html += '<div class="flex gap-2 shrink-0">';
      html += '<button onclick="previewPopup(' + p.id + ')" class="text-xs px-3 py-1.5 rounded-lg border hover:bg-blue-50 text-blue-600">미리보기</button>';
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
    const isImage = popup?.popup_type === 'image' || !popup;
    return '<div class="border rounded-lg p-4 bg-gray-50">'
      + '<h4 class="font-medium mb-3">' + (isEdit ? '팝업 수정' : '새 팝업 추가') + '</h4>'
      + '<div class="grid grid-cols-2 gap-3 mb-3">'
      + '<input id="pTitle" value="' + (popup?.title || '').replace(/"/g,'&quot;') + '" placeholder="제목" class="px-3 py-2 border rounded-lg text-sm">'
      + '<select id="pType" class="px-3 py-2 border rounded-lg text-sm" onchange="toggleContentField()"><option value="image"' + (popup?.popup_type === 'image' || !popup ? ' selected' : '') + '>이미지</option><option value="html"' + (popup?.popup_type === 'html' ? ' selected' : '') + '>HTML</option></select>'
      + '<input id="pWidth" type="number" value="' + (popup?.width || 420) + '" placeholder="너비(px)" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="pHeight" type="number" value="' + (popup?.height || 300) + '" placeholder="높이(px)" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="pTop" type="number" value="' + (popup?.position_top ?? 100) + '" placeholder="Top(px)" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="pLeft" type="number" value="' + (popup?.position_left ?? 0) + '" placeholder="Left(px)" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="pStart" type="date" value="' + (popup?.start_date ? popup.start_date.split('T')[0] : '') + '" class="px-3 py-2 border rounded-lg text-sm" placeholder="시작일">'
      + '<input id="pEnd" type="date" value="' + (popup?.end_date ? popup.end_date.split('T')[0] : '') + '" class="px-3 py-2 border rounded-lg text-sm" placeholder="종료일">'
      + '</div>'
      + '<div id="imageUrlField" class="mb-3" style="' + (isImage || !popup ? '' : 'display:none') + '">'
      + '<label class="block text-xs text-gray-500 mb-1">이미지 URL (예: /static/images/popup-image.png)</label>'
      + '<input id="pImageUrl" value="' + (popup?.image_url || '').replace(/"/g,'&quot;') + '" placeholder="이미지 URL" class="w-full px-3 py-2 border rounded-lg text-sm mb-2" oninput="updatePreview()">'
      + '<div id="imagePreview" class="rounded-lg border overflow-hidden" style="max-width:300px;' + (popup?.image_url ? '' : 'display:none') + '">'
      + (popup?.image_url ? '<img src="' + popup.image_url + '" class="w-full h-auto">' : '')
      + '</div>'
      + '</div>'
      + '<div id="htmlContentField" class="mb-3" style="' + (popup?.popup_type === 'html' ? '' : 'display:none') + '">'
      + '<label class="block text-xs text-gray-500 mb-1">HTML 콘텐츠</label>'
      + '<textarea id="pContent" rows="6" placeholder="HTML 콘텐츠" class="w-full px-3 py-2 border rounded-lg text-sm font-mono">' + (popup?.popup_type === 'html' ? (popup?.content || '') : '') + '</textarea>'
      + '</div>'
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
      content: type === 'html' ? (document.getElementById('pContent')?.value || '') : '',
      image_url: type === 'image' ? (document.getElementById('pImageUrl')?.value || '') : '',
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

  window.toggleContentField = function() {
    var type = document.getElementById('pType').value;
    var imgField = document.getElementById('imageUrlField');
    var htmlField = document.getElementById('htmlContentField');
    if (type === 'image') {
      if (imgField) imgField.style.display = '';
      if (htmlField) htmlField.style.display = 'none';
    } else {
      if (imgField) imgField.style.display = 'none';
      if (htmlField) htmlField.style.display = '';
    }
  };

  window.updatePreview = function() {
    var url = document.getElementById('pImageUrl')?.value || '';
    var preview = document.getElementById('imagePreview');
    if (!preview) return;
    if (url) {
      preview.style.display = '';
      preview.innerHTML = '<img src="' + url + '" class="w-full h-auto" onerror="this.parentElement.innerHTML=\'<div class=\\'p-4 text-red-500 text-sm\\'>이미지를 불러올 수 없습니다</div>\'">';
    } else {
      preview.style.display = 'none';
    }
  };

  window.previewPopup = function(id) {
    var popup = popupList.find(function(p) { return p.id === id; });
    if (!popup) return;
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);';
    var content = '<div style="background:#fff;border-radius:16px;overflow:hidden;max-width:500px;width:90vw;max-height:85vh;box-shadow:0 24px 64px rgba(0,0,0,0.2);">';
    content += '<div style="padding:12px 16px;background:linear-gradient(135deg,#f8fafc,#f1f5f9);border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">';
    content += '<span style="font-weight:600;font-size:14px;">' + popup.title + '</span>';
    content += '<button onclick="this.closest(\'div[style*=fixed]\').remove()" style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;border:none;cursor:pointer;background:transparent;font-size:16px;">✕</button></div>';
    content += '<div style="overflow-y:auto;max-height:calc(85vh - 60px);">';
    if (popup.popup_type === 'image' && popup.image_url) {
      content += '<img src="' + popup.image_url + '" style="width:100%;height:auto;display:block;">';
    } else {
      content += '<div style="padding:16px;font-size:14px;line-height:1.7;color:#374151;">' + (popup.content || '내용 없음') + '</div>';
    }
    content += '</div></div>';
    modal.innerHTML = content;
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
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
