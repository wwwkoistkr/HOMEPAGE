// Admin - Downloads Management (Full CRUD with Edit)
// v39.17: 시스템 문서(system-docs) 카테고리 통합 + 카테고리 드롭다운 UI
(async function() {
  const c = document.getElementById('admin-content');
  let dlList = [];

  // v39.17: 카테고리 목록 정의 (신규 system-docs 포함)
  const CATEGORIES = [
    { value: 'general',     label: '📄 일반 자료',    color: 'bg-gray-100 text-gray-700' },
    { value: 'form',        label: '📋 서식·양식',    color: 'bg-blue-100 text-blue-700' },
    { value: 'education',   label: '🎓 교육 자료',    color: 'bg-green-100 text-green-700' },
    { value: 'cc-standard', label: '🛡️ CC 표준',     color: 'bg-purple-100 text-purple-700' },
    { value: 'system-docs', label: '📘 시스템 문서',  color: 'bg-violet-100 text-violet-700' }
  ];
  function catMeta(val) {
    return CATEGORIES.find(function(x) { return x.value === val; }) ||
      { value: val || 'general', label: val || 'general', color: 'bg-gray-100 text-gray-700' };
  }
  let currentFilter = 'all';

  await load();

  async function load() {
    const d = await apiCall('/api/admin/downloads');
    if (!d) return;
    dlList = d.data || [];

    // 카테고리별 카운트 집계
    var counts = { all: dlList.length };
    CATEGORIES.forEach(function(c) { counts[c.value] = 0; });
    dlList.forEach(function(dl) {
      var cat = dl.category || 'general';
      counts[cat] = (counts[cat] || 0) + 1;
    });

    // 필터 적용
    var filtered = currentFilter === 'all' ? dlList
      : dlList.filter(function(dl) { return (dl.category || 'general') === currentFilter; });

    var h = '';

    // 카테고리 필터 탭
    h += '<div class="flex flex-wrap gap-2 mb-4 pb-4 border-b">';
    h += '<button onclick="filterByCategory(\'all\')" class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ' +
      (currentFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200') + '">전체 <span class="ml-1 opacity-70">' + counts.all + '</span></button>';
    CATEGORIES.forEach(function(c) {
      var active = currentFilter === c.value;
      h += '<button onclick="filterByCategory(\'' + c.value + '\')" class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ' +
        (active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200') +
        '">' + c.label + ' <span class="ml-1 opacity-70">' + (counts[c.value] || 0) + '</span></button>';
    });
    h += '</div>';

    // 헤더 (+ 추가 버튼)
    h += '<div class="flex justify-between items-center mb-4">';
    h += '<span class="text-gray-500 text-sm">' +
      (currentFilter === 'all' ? '전체' : catMeta(currentFilter).label) +
      ' — 총 <b class="text-gray-700">' + filtered.length + '</b>개</span>';
    h += '<button onclick="showDlForm()" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"><i class="fas fa-plus mr-1"></i>추가</button>';
    h += '</div><div id="dlFormArea" class="hidden mb-4"></div><div class="space-y-2">';

    if (filtered.length === 0) {
      h += '<div class="text-center py-8 text-gray-400"><i class="fas fa-folder-open text-3xl mb-2 block"></i>등록된 자료가 없습니다</div>';
    } else {
      filtered.forEach(function(dl) {
        var cat = catMeta(dl.category || 'general');
        var ext = (String(dl.file_url || '').split('.').pop() || '').toLowerCase();
        var extIcon = ext === 'pdf' ? 'fa-file-pdf text-red-500'
          : (ext === 'html' || ext === 'htm') ? 'fa-file-code text-blue-500'
          : ['doc','docx'].indexOf(ext) >= 0 ? 'fa-file-word text-blue-600'
          : ['xls','xlsx'].indexOf(ext) >= 0 ? 'fa-file-excel text-green-600'
          : ['png','jpg','jpeg','gif','webp'].indexOf(ext) >= 0 ? 'fa-file-image text-purple-500'
          : 'fa-file-lines text-gray-500';
        h += '<div class="border rounded-lg p-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">';
        h += '<div class="flex items-center gap-3 min-w-0 flex-1">';
        h += '<div class="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas ' + extIcon + '"></i></div>';
        h += '<div class="min-w-0 flex-1">';
        h += '<div class="font-medium truncate flex items-center gap-2">' + dl.title;
        h += '<span class="text-xs px-2 py-0.5 rounded-full ' + cat.color + ' shrink-0">' + cat.label + '</span>';
        h += '</div>';
        h += '<div class="text-xs text-gray-400 mt-0.5 truncate">' + (dl.file_name || '파일명 없음') + ' | 다운로드 ' + (dl.download_count || 0) + '회 | ' + (dl.created_at || '').split('T')[0] + '</div>';
        if (dl.file_url) h += '<div class="text-xs text-blue-400 truncate mt-0.5" title="' + dl.file_url + '">URL: ' + dl.file_url + '</div>';
        h += '</div></div>';
        h += '<div class="flex gap-2 shrink-0">';
        if (dl.file_url) h += '<a href="' + dl.file_url + '" target="_blank" rel="noopener" class="text-xs px-3 py-1.5 rounded-lg border border-blue-200 text-blue-500 hover:bg-blue-50"><i class="fas fa-eye mr-1"></i>보기</a>';
        h += '<button onclick="editDl(' + dl.id + ')" class="text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50">수정</button>';
        h += '<button onclick="deleteDl(' + dl.id + ')" class="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">삭제</button>';
        h += '</div></div>';
      });
    }
    h += '</div>';
    c.innerHTML = h;
  }

  window.filterByCategory = function(cat) {
    currentFilter = cat;
    load();
  };

  function dlFormHtml(dl) {
    var isEdit = !!dl;
    // 신규 추가 시 현재 필터 카테고리를 기본값으로
    var defaultCat = dl ? (dl.category || 'general') : (currentFilter !== 'all' ? currentFilter : 'general');

    var catOptions = CATEGORIES.map(function(c) {
      return '<option value="' + c.value + '"' + (c.value === defaultCat ? ' selected' : '') + '>' + c.label + '</option>';
    }).join('');

    var isSystemDocs = defaultCat === 'system-docs';

    return '<div class="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white">'
      + '<h4 class="font-medium mb-3 flex items-center gap-2"><i class="fas ' + (isEdit ? 'fa-edit text-blue-500' : 'fa-plus-circle text-green-500') + '"></i>' + (isEdit ? '자료 수정' : '새 자료 추가') + '</h4>'
      + '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">'
      + '<div><label class="block text-xs font-medium text-gray-500 mb-1">제목 <span class="text-red-500">*</span></label>'
      + '<input id="dlTitle" value="' + (dl ? (dl.title || '').replace(/"/g, '&quot;') : '') + '" placeholder="자료 제목" class="w-full px-3 py-2 border rounded-lg text-sm"></div>'
      + '<div><label class="block text-xs font-medium text-gray-500 mb-1">카테고리 <span class="text-red-500">*</span></label>'
      + '<select id="dlCat" class="w-full px-3 py-2 border rounded-lg text-sm">' + catOptions + '</select></div>'
      + '<div><label class="block text-xs font-medium text-gray-500 mb-1">파일 URL <span class="text-red-500">*</span></label>'
      + '<input id="dlUrl" value="' + (dl ? (dl.file_url || '').replace(/"/g, '&quot;') : '') + '" placeholder="/static/docs/file.pdf 또는 https://..." class="w-full px-3 py-2 border rounded-lg text-sm"></div>'
      + '<div><label class="block text-xs font-medium text-gray-500 mb-1">파일명 (표시용)</label>'
      + '<input id="dlName" value="' + (dl ? (dl.file_name || '').replace(/"/g, '&quot;') : '') + '" placeholder="document.pdf" class="w-full px-3 py-2 border rounded-lg text-sm"></div>'
      + '</div>'
      + '<label class="block text-xs font-medium text-gray-500 mb-1">설명</label>'
      + '<textarea id="dlDesc" rows="2" placeholder="자료 설명 (선택 사항)" class="w-full px-3 py-2 border rounded-lg text-sm mb-3">' + (dl ? (dl.description || '') : '') + '</textarea>'
      + (isSystemDocs ? '<div class="bg-violet-50 border border-violet-200 rounded-lg p-3 mb-3 text-xs text-violet-700"><i class="fas fa-info-circle mr-1"></i><strong>시스템 문서</strong>는 <a href="/support/documents" target="_blank" class="underline font-medium">/support/documents</a> 페이지에 자동 게시됩니다.</div>' : '')
      + '<div class="flex gap-2">'
      + '<button onclick="saveDl(' + (dl ? dl.id : 'null') + ')" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"><i class="fas fa-save mr-1"></i>저장</button>'
      + '<button onclick="document.getElementById(\'dlFormArea\').classList.add(\'hidden\')" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm">취소</button>'
      + '</div></div>';
  }

  window.showDlForm = function() {
    var a = document.getElementById('dlFormArea');
    a.classList.remove('hidden');
    a.innerHTML = dlFormHtml(null);
    a.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  window.editDl = function(id) {
    var dl = dlList.find(function(d) { return d.id === id; });
    if (!dl) return;
    var a = document.getElementById('dlFormArea');
    a.classList.remove('hidden');
    a.innerHTML = dlFormHtml(dl);
    a.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  window.saveDl = async function(id) {
    var body = {
      title: document.getElementById('dlTitle').value.trim(),
      file_url: document.getElementById('dlUrl').value.trim(),
      file_name: document.getElementById('dlName').value.trim(),
      description: document.getElementById('dlDesc').value,
      category: document.getElementById('dlCat').value
    };
    if (!body.title) { alert('제목을 입력해 주세요.'); return; }
    if (!body.file_url) { alert('파일 URL을 입력해 주세요.'); return; }
    if (id) await apiCall('/api/admin/downloads/' + id, 'PUT', body);
    else await apiCall('/api/admin/downloads', 'POST', body);
    document.getElementById('dlFormArea').classList.add('hidden');
    await load();
  };

  window.deleteDl = async function(id) {
    if (!confirm('이 자료를 삭제하시겠습니까?\n\n※ 시스템 문서를 삭제하면 /support/documents 페이지에서도 즉시 사라집니다.')) return;
    await apiCall('/api/admin/downloads/' + id, 'DELETE');
    await load();
  };
})();
