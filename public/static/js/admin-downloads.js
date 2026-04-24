// Admin - Downloads Management (Full CRUD with Edit)
(async function() {
  const c = document.getElementById('admin-content');
  let dlList = [];
  await load();

  async function load() {
    const d = await apiCall('/api/admin/downloads');
    if (!d) return;
    dlList = d.data || [];
    let h = '<div class="flex justify-between items-center mb-4">';
    h += '<span class="text-gray-500 text-sm">총 ' + dlList.length + '개</span>';
    h += '<button onclick="showDlForm()" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"><i class="fas fa-plus mr-1"></i>추가</button>';
    h += '</div><div id="dlFormArea" class="hidden mb-4"></div><div class="space-y-2">';
    dlList.forEach(function(dl) {
      h += '<div class="border rounded-lg p-4 flex items-center justify-between gap-4">';
      h += '<div class="flex items-center gap-3 min-w-0">';
      h += '<div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-file-lines text-blue-500"></i></div>';
      h += '<div class="min-w-0"><div class="font-medium truncate">' + dl.title + '</div>';
      h += '<div class="text-xs text-gray-400 mt-0.5">' + (dl.file_name || '') + ' | ' + (dl.category || 'general') + ' | 다운로드 ' + dl.download_count + '회 | ' + (dl.created_at || '').split('T')[0] + '</div>';
      if (dl.file_url) h += '<div class="text-xs text-blue-400 truncate mt-0.5">URL: ' + dl.file_url + '</div>';
      h += '</div></div>';
      h += '<div class="flex gap-2 shrink-0">';
      h += '<button onclick="editDl(' + dl.id + ')" class="text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50">수정</button>';
      h += '<button onclick="deleteDl(' + dl.id + ')" class="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">삭제</button>';
      h += '</div></div>';
    });
    h += '</div>';
    c.innerHTML = h;
  }

  function dlFormHtml(dl) {
    var isEdit = !!dl;
    return '<div class="border rounded-lg p-4 bg-gray-50">'
      + '<h4 class="font-medium mb-3">' + (isEdit ? '자료 수정' : '새 자료 추가') + '</h4>'
      + '<div class="grid grid-cols-2 gap-3 mb-3">'
      + '<input id="dlTitle" value="' + (dl ? dl.title.replace(/"/g, '&quot;') : '') + '" placeholder="제목" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="dlUrl" value="' + (dl ? (dl.file_url || '').replace(/"/g, '&quot;') : '') + '" placeholder="파일 URL" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="dlName" value="' + (dl ? (dl.file_name || '').replace(/"/g, '&quot;') : '') + '" placeholder="파일명 (예: document.pdf)" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="dlCat" value="' + (dl ? (dl.category || 'general') : 'general') + '" placeholder="카테고리" class="px-3 py-2 border rounded-lg text-sm">'
      + '</div>'
      + '<textarea id="dlDesc" rows="2" placeholder="설명" class="w-full px-3 py-2 border rounded-lg text-sm mb-3">' + (dl ? (dl.description || '') : '') + '</textarea>'
      + '<div class="flex gap-2">'
      + '<button onclick="saveDl(' + (dl ? dl.id : 'null') + ')" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">저장</button>'
      + '<button onclick="document.getElementById(\'dlFormArea\').classList.add(\'hidden\')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">취소</button>'
      + '</div></div>';
  }

  window.showDlForm = function() {
    var a = document.getElementById('dlFormArea');
    a.classList.remove('hidden');
    a.innerHTML = dlFormHtml(null);
  };

  window.editDl = function(id) {
    var dl = dlList.find(function(d) { return d.id === id; });
    if (!dl) return;
    var a = document.getElementById('dlFormArea');
    a.classList.remove('hidden');
    a.innerHTML = dlFormHtml(dl);
    a.scrollIntoView({ behavior: 'smooth' });
  };

  window.saveDl = async function(id) {
    var body = {
      title: document.getElementById('dlTitle').value,
      file_url: document.getElementById('dlUrl').value,
      file_name: document.getElementById('dlName').value,
      description: document.getElementById('dlDesc').value,
      category: document.getElementById('dlCat').value
    };
    if (id) await apiCall('/api/admin/downloads/' + id, 'PUT', body);
    else await apiCall('/api/admin/downloads', 'POST', body);
    document.getElementById('dlFormArea').classList.add('hidden');
    await load();
  };

  window.deleteDl = async function(id) {
    if (!confirm('이 자료를 삭제하시겠습니까?')) return;
    await apiCall('/api/admin/downloads/' + id, 'DELETE');
    await load();
  };
})();
