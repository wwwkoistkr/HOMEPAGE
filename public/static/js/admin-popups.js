// Admin - Popups Management (v28.0 - Full CRUD + Image Upload Integration + 8K)
(async function() {
  const container = document.getElementById('admin-content');
  let popupList = [];
  let imageList = [];
  await loadPopups();

  async function loadPopups() {
    const data = await apiCall('/api/admin/popups');
    if (!data) return;
    popupList = data.data || [];
    // Also try to load image list from R2
    try {
      const imgData = await apiCall('/api/admin/images?category=popup');
      imageList = (imgData && imgData.data) ? imgData.data : [];
    } catch(e) { imageList = []; }

    let html = '<div class="flex justify-between items-center mb-4">';
    html += '<div><span class="text-gray-500 text-sm">총 ' + popupList.length + '개</span>';
    html += '<span class="text-gray-400 text-xs ml-2">( 활성: ' + popupList.filter(p=>p.is_active).length + '개 )</span></div>';
    html += '<button onclick="showPopupForm()" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"><i class="fas fa-plus mr-1"></i>팝업 추가</button>';
    html += '</div><div id="popupFormArea" class="hidden mb-4"></div>';

    // Helper guide box
    html += '<div id="popupGuide" class="mb-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">';
    html += '<div class="flex items-start gap-3"><i class="fas fa-lightbulb text-amber-500 mt-0.5"></i><div>';
    html += '<div class="font-medium text-amber-800 text-sm">팝업 이미지 사용 안내</div>';
    html += '<div class="text-xs text-amber-600 mt-1 space-y-1">';
    html += '<p>1. <strong>이미지 관리</strong> 페이지에서 카테고리 "팝업"으로 이미지를 먼저 업로드하세요.</p>';
    html += '<p>2. 팝업 추가/수정 시 <strong>"이미지 선택"</strong> 버튼으로 업로드된 이미지를 바로 선택할 수 있습니다.</p>';
    html += '<p>3. 또는 <strong>외부 이미지 URL</strong>을 직접 입력할 수도 있습니다.</p>';
    html += '</div></div></div></div>';

    html += '<div class="space-y-3">';
    popupList.forEach(p => {
      html += '<div class="border rounded-xl p-4 flex items-start justify-between gap-4 hover:shadow-md transition-shadow bg-white">';
      if (p.popup_type === 'image' && p.image_url) {
        html += '<div class="shrink-0 rounded-lg overflow-hidden border border-gray-200" style="width:80px; height:80px;">';
        html += '<img src="' + p.image_url + '" alt="' + p.title + '" class="w-full h-full object-cover" onerror="this.parentNode.innerHTML=\'<div class=\\\'flex items-center justify-center w-full h-full bg-gray-100 text-gray-300\\\'><i class=\\\'fas fa-image text-xl\\\'></i></div>\'">';
        html += '</div>';
      } else {
        html += '<div class="shrink-0 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50" style="width:80px; height:80px;">';
        html += '<i class="fas ' + (p.popup_type === 'image' ? 'fa-image text-gray-300' : 'fa-code text-blue-300') + ' text-2xl"></i>';
        html += '</div>';
      }
      html += '<div class="min-w-0 flex-1">';
      html += '<div class="flex items-center gap-2 flex-wrap"><span class="font-medium text-gray-800">' + p.title + '</span>';
      html += '<span class="px-2 py-0.5 rounded-full text-xs font-medium ' + (p.is_active ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-gray-100 text-gray-500 border border-gray-200') + '">' + (p.is_active ? '✅ 활성' : '⏸️ 비활성') + '</span>';
      html += '<span class="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">' + (p.popup_type === 'image' ? '🖼️ 이미지' : '📝 HTML') + '</span></div>';
      html += '<div class="text-xs text-gray-400 mt-1 space-y-0.5">';
      html += '<div><i class="fas fa-expand-arrows-alt mr-1"></i>' + p.width + ' × ' + p.height + 'px</div>';
      if (p.popup_type === 'image' && p.image_url) html += '<div class="truncate"><i class="fas fa-link mr-1"></i>' + p.image_url + '</div>';
      if(p.start_date || p.end_date) html += '<div><i class="fas fa-calendar-alt mr-1"></i>' + (p.start_date||'없음') + ' ~ ' + (p.end_date||'없음') + '</div>';
      html += '</div></div>';
      html += '<div class="flex flex-col gap-1.5 shrink-0">';
      html += '<button onclick="previewPopup(' + p.id + ')" class="text-xs px-3 py-1.5 rounded-lg border hover:bg-blue-50 text-blue-600 transition-colors"><i class="fas fa-eye mr-1"></i>미리보기</button>';
      html += '<button onclick="editPopup(' + p.id + ')" class="text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition-colors"><i class="fas fa-edit mr-1"></i>수정</button>';
      html += '<button onclick="togglePopup(' + p.id + ', ' + (p.is_active ? 0 : 1) + ')" class="text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition-colors">' + (p.is_active ? '⏸️ 비활성화' : '▶️ 활성화') + '</button>';
      html += '<button onclick="deletePopup(' + p.id + ')" class="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"><i class="fas fa-trash mr-1"></i>삭제</button>';
      html += '</div></div>';
    });
    if (popupList.length === 0) {
      html += '<div class="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">';
      html += '<i class="fas fa-window-restore text-4xl text-gray-300 mb-3 block"></i>';
      html += '<p class="text-gray-500 font-medium">등록된 팝업이 없습니다.</p>';
      html += '<p class="text-gray-400 text-sm mt-1">위의 "팝업 추가" 버튼으로 새 팝업을 만들어 보세요.</p>';
      html += '</div>';
    }
    html += '</div>';
    container.innerHTML = html;
  }

  function popupFormHtml(popup) {
    const isEdit = !!popup;
    const isImage = popup?.popup_type === 'image' || !popup;
    
    // Build image picker gallery from uploaded images
    var imgGalleryHtml = '';
    if (imageList.length > 0) {
      imgGalleryHtml = '<div id="imgGallery" class="mt-2 mb-2"><label class="block text-xs text-gray-500 mb-1.5"><i class="fas fa-images mr-1"></i>업로드된 팝업 이미지에서 선택:</label>';
      imgGalleryHtml += '<div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-40 overflow-y-auto p-1 bg-white rounded-lg border">';
      imageList.forEach(function(img) {
        var url = '/api/images/' + img.r2_key;
        imgGalleryHtml += '<div onclick="selectGalleryImage(\'' + url + '\')" class="cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all aspect-square bg-gray-100" title="' + (img.original_name || '') + '">';
        imgGalleryHtml += '<img src="' + url + '" class="w-full h-full object-cover" loading="lazy">';
        imgGalleryHtml += '</div>';
      });
      imgGalleryHtml += '</div></div>';
    }

    return '<div class="border rounded-xl p-5 bg-gradient-to-b from-gray-50 to-white shadow-sm">'
      + '<h4 class="font-semibold text-gray-800 mb-4 flex items-center gap-2"><i class="fas fa-' + (isEdit ? 'edit text-blue-500' : 'plus-circle text-green-500') + '"></i>' + (isEdit ? '팝업 수정' : '새 팝업 추가') + '</h4>'
      + '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">'
      + '<div><label class="block text-xs font-medium text-gray-500 mb-1">제목</label><input id="pTitle" value="' + (popup?.title || '').replace(/"/g,'&quot;') + '" placeholder="팝업 제목" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400"></div>'
      + '<div><label class="block text-xs font-medium text-gray-500 mb-1">타입</label><select id="pType" class="w-full px-3 py-2 border rounded-lg text-sm" onchange="toggleContentField()"><option value="image"' + (isImage ? ' selected' : '') + '>🖼️ 이미지</option><option value="html"' + (popup?.popup_type === 'html' ? ' selected' : '') + '>📝 HTML</option></select></div>'
      + '<div><label class="block text-xs font-medium text-gray-500 mb-1">너비(px)</label><input id="pWidth" type="number" value="' + (popup?.width || 420) + '" class="w-full px-3 py-2 border rounded-lg text-sm"></div>'
      + '<div><label class="block text-xs font-medium text-gray-500 mb-1">높이(px)</label><input id="pHeight" type="number" value="' + (popup?.height || 300) + '" class="w-full px-3 py-2 border rounded-lg text-sm"></div>'
      + '<div><label class="block text-xs font-medium text-gray-500 mb-1">시작일</label><input id="pStart" type="date" value="' + (popup?.start_date ? popup.start_date.split('T')[0] : '') + '" class="w-full px-3 py-2 border rounded-lg text-sm"></div>'
      + '<div><label class="block text-xs font-medium text-gray-500 mb-1">종료일</label><input id="pEnd" type="date" value="' + (popup?.end_date ? popup.end_date.split('T')[0] : '') + '" class="w-full px-3 py-2 border rounded-lg text-sm"></div>'
      + '</div>'
      // === IMAGE TYPE FIELDS ===
      + '<div id="imageUrlField" style="' + (isImage || !popup ? '' : 'display:none') + '">'
      + '<label class="block text-xs font-medium text-gray-500 mb-1"><i class="fas fa-image mr-1"></i>이미지 설정</label>'
      // Direct URL input
      + '<div class="flex gap-2 mb-2">'
      + '<input id="pImageUrl" value="' + (popup?.image_url || '').replace(/"/g,'&quot;') + '" placeholder="이미지 URL (예: /static/images/popups/event.png 또는 https://...)" class="flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300" oninput="updatePreview()">'
      + '<button onclick="openImageUploader()" class="shrink-0 bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg text-sm transition-colors" title="이미지 업로드"><i class="fas fa-cloud-upload-alt mr-1"></i>업로드</button>'
      + '</div>'
      // Gallery from existing images
      + imgGalleryHtml
      // Upload inline area
      + '<div id="inlineUploadArea" class="hidden mb-2">'
      + '<div class="border-2 border-dashed border-purple-300 rounded-xl p-4 bg-purple-50/30 text-center relative">'
      + '<input type="file" id="popupFileInput" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer">'
      + '<i class="fas fa-cloud-upload-alt text-2xl text-purple-300 mb-2 block"></i>'
      + '<p class="text-sm text-purple-600 font-medium">클릭하거나 드래그하여 이미지 업로드</p>'
      + '<p class="text-xs text-purple-400 mt-1">JPG, PNG, GIF, WebP (최대 5MB)</p>'
      + '</div>'
      + '<div id="uploadStatus" class="hidden mt-2 text-sm text-center"></div>'
      + '</div>'
      // Image preview
      + '<div id="imagePreview" class="rounded-xl border overflow-hidden bg-gray-50" style="max-width:400px;' + (popup?.image_url ? '' : 'display:none') + '">'
      + (popup?.image_url ? '<img src="' + popup.image_url + '" class="w-full h-auto" onerror="this.parentNode.innerHTML=\'<div class=\\\'p-6 text-center text-red-400\\\'><i class=\\\'fas fa-exclamation-triangle text-2xl mb-2 block\\\'></i>이미지를 불러올 수 없습니다</div>\'">' : '')
      + '</div>'
      + '</div>'
      // === HTML TYPE FIELDS ===
      + '<div id="htmlContentField" style="' + (popup?.popup_type === 'html' ? '' : 'display:none') + '">'
      + '<label class="block text-xs font-medium text-gray-500 mb-1"><i class="fas fa-code mr-1"></i>HTML 콘텐츠</label>'
      + '<textarea id="pContent" rows="8" placeholder="HTML 콘텐츠를 입력하세요" class="w-full px-3 py-2 border rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-300">' + (popup?.popup_type === 'html' ? (popup?.content || '') : '') + '</textarea>'
      + '</div>'
      + '<div class="flex gap-2 mt-4">'
      + '<button onclick="savePopup(' + (popup?.id || 'null') + ')" class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"><i class="fas fa-save mr-1"></i>저장</button>'
      + '<button onclick="document.getElementById(\'popupFormArea\').classList.add(\'hidden\')" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm transition-colors">취소</button>'
      + '</div></div>';
  }

  window.showPopupForm = function() {
    const area = document.getElementById('popupFormArea');
    area.classList.remove('hidden');
    area.innerHTML = popupFormHtml(null);
    initFileUpload();
    area.scrollIntoView({behavior:'smooth'});
  };

  window.editPopup = function(id) {
    const popup = popupList.find(p => p.id === id);
    if (!popup) return;
    const area = document.getElementById('popupFormArea');
    area.classList.remove('hidden');
    area.innerHTML = popupFormHtml(popup);
    initFileUpload();
    area.scrollIntoView({behavior:'smooth'});
  };

  window.selectGalleryImage = function(url) {
    var input = document.getElementById('pImageUrl');
    if (input) { input.value = url; updatePreview(); }
    // Highlight selected
    document.querySelectorAll('#imgGallery .border-blue-500').forEach(function(el) { el.classList.remove('border-blue-500'); el.classList.add('border-transparent'); });
    event.currentTarget.classList.remove('border-transparent');
    event.currentTarget.classList.add('border-blue-500');
  };

  window.openImageUploader = function() {
    var area = document.getElementById('inlineUploadArea');
    if (area) area.classList.toggle('hidden');
  };

  function initFileUpload() {
    var fileInput = document.getElementById('popupFileInput');
    if (!fileInput) return;
    fileInput.addEventListener('change', function(e) {
      var file = e.target.files[0];
      if (!file) return;
      uploadPopupImage(file);
    });
  }

  async function uploadPopupImage(file) {
    var statusEl = document.getElementById('uploadStatus');
    statusEl.classList.remove('hidden');
    statusEl.innerHTML = '<span class="text-blue-600"><i class="fas fa-spinner fa-spin mr-1"></i>업로드 중...</span>';

    var formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'popup');
    formData.append('alt_text', '팝업 이미지');

    try {
      var res = await fetch('/api/admin/images', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + getToken() },
        body: formData,
      });
      var data = await res.json();
      if (data.success && data.url) {
        statusEl.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>업로드 완료!</span>';
        // Set the URL in the popup form
        var input = document.getElementById('pImageUrl');
        if (input) { input.value = data.url; updatePreview(); }
        // Refresh image list
        try {
          var imgData = await apiCall('/api/admin/images?category=popup');
          imageList = (imgData && imgData.data) ? imgData.data : [];
        } catch(e) {}
        // Hide upload area after success
        setTimeout(function() {
          var area = document.getElementById('inlineUploadArea');
          if (area) area.classList.add('hidden');
        }, 1500);
      } else {
        statusEl.innerHTML = '<span class="text-red-600"><i class="fas fa-exclamation-circle mr-1"></i>' + (data.error || '업로드 실패') + '</span>';
      }
    } catch(err) {
      statusEl.innerHTML = '<span class="text-red-600"><i class="fas fa-exclamation-circle mr-1"></i>업로드 실패: R2 스토리지가 비활성 상태일 수 있습니다. 외부 이미지 URL을 사용해 주세요.</span>';
    }
  }

  window.savePopup = async function(id) {
    const type = document.getElementById('pType').value;
    const body = {
      title: document.getElementById('pTitle').value,
      popup_type: type,
      content: type === 'html' ? (document.getElementById('pContent')?.value || '') : '',
      image_url: type === 'image' ? (document.getElementById('pImageUrl')?.value || '') : '',
      width: parseInt(document.getElementById('pWidth').value) || 420,
      height: parseInt(document.getElementById('pHeight').value) || 300,
      position_top: 100,
      position_left: 0,
      start_date: document.getElementById('pStart').value || null,
      end_date: document.getElementById('pEnd').value || null,
    };
    if (!body.title) { alert('제목을 입력해 주세요.'); return; }
    if (type === 'image' && !body.image_url) { alert('이미지 URL을 입력하거나 이미지를 업로드해 주세요.'); return; }
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
      preview.innerHTML = '<img src="' + url + '" class="w-full h-auto" onerror="this.parentNode.innerHTML=\'<div class=\\\'p-6 text-center text-red-400\\\'><i class=\\\'fas fa-exclamation-triangle text-2xl mb-2 block\\\'></i>이미지를 불러올 수 없습니다</div>\'">';
    } else {
      preview.style.display = 'none';
    }
  };

  window.previewPopup = function(id) {
    var popup = popupList.find(function(p) { return p.id === id; });
    if (!popup) return;
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);backdrop-filter:blur(6px);';
    var content = '<div style="background:#fff;border-radius:16px;overflow:hidden;max-width:' + Math.min(popup.width || 420, 600) + 'px;width:92vw;max-height:85vh;box-shadow:0 24px 64px rgba(0,0,0,0.3);">';
    content += '<div style="padding:12px 16px;background:linear-gradient(135deg,#f8fafc,#f1f5f9);border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">';
    content += '<span style="font-weight:600;font-size:14px;">' + popup.title + '</span>';
    content += '<button onclick="this.closest(\'div[style*=fixed]\').remove()" style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;border:none;cursor:pointer;background:transparent;font-size:16px;color:#6b7280;">✕</button></div>';
    content += '<div style="overflow-y:auto;max-height:calc(85vh - 100px);">';
    if (popup.popup_type === 'image' && popup.image_url) {
      content += '<img src="' + popup.image_url + '" style="width:100%;height:auto;display:block;">';
    } else {
      content += '<div style="padding:20px;font-size:14px;line-height:1.8;color:#374151;">' + (popup.content || '내용 없음') + '</div>';
    }
    content += '</div>';
    content += '<div style="padding:10px 16px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;background:rgba(248,250,252,0.8);">';
    content += '<span style="font-size:12px;color:#9ca3af;">📏 ' + popup.width + ' × ' + popup.height + 'px | ' + (popup.is_active ? '✅ 활성' : '⏸️ 비활성') + '</span>';
    content += '<button onclick="this.closest(\'div[style*=fixed]\').remove()" style="padding:6px 16px;font-size:13px;border-radius:8px;border:1px solid #e2e8f0;cursor:pointer;background:#fff;color:#374151;">닫기</button>';
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
