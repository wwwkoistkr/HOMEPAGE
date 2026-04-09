// Admin - Notices Management
(async function() {
  const container = document.getElementById('admin-content');
  await loadNotices();
  async function loadNotices() {
    const data = await apiCall('/api/admin/notices');
    if (!data) return;
    let html = '<div class="flex justify-between items-center mb-4"><span class="text-gray-500 text-sm">총 '+(data.data?.length||0)+'개</span><button onclick="showNoticeForm()" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"><i class="fas fa-plus mr-1"></i>공지 추가</button></div>';
    html += '<div id="noticeFormArea" class="hidden mb-4"></div><div class="space-y-2">';
    (data.data||[]).forEach(n => {
      html += `<div class="border rounded-lg p-4 flex items-center justify-between gap-4"><div class="min-w-0"><div class="flex items-center gap-2">${n.is_pinned?'<span class="bg-red-50 text-red-500 text-xs px-2 py-0.5 rounded">고정</span>':''}<span class="font-medium text-gray-800">${n.title}</span></div><div class="text-xs text-gray-400 mt-1">${(n.created_at||'').split('T')[0]} | 조회 ${n.views}</div></div><div class="flex gap-2 shrink-0"><button onclick='editNotice(${JSON.stringify(n).replace(/'/g,"&#39;")})' class="text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50">수정</button><button onclick="deleteNotice(${n.id})" class="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">삭제</button></div></div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  }
  window.showNoticeForm = function(notice) {
    const area = document.getElementById('noticeFormArea');
    area.classList.remove('hidden');
    area.innerHTML = `<div class="border rounded-lg p-4 bg-gray-50"><h4 class="font-medium mb-3">${notice?'공지 수정':'새 공지 추가'}</h4><input id="nTitle" value="${(notice?.title||'').replace(/"/g,'&quot;')}" placeholder="제목" class="w-full px-3 py-2 border rounded-lg text-sm mb-3"><textarea id="nContent" rows="6" placeholder="내용 (HTML 가능)" class="w-full px-3 py-2 border rounded-lg text-sm mb-3">${notice?.content||''}</textarea><label class="flex items-center gap-2 mb-3 text-sm"><input type="checkbox" id="nPinned" ${notice?.is_pinned?'checked':''}> 상단 고정</label><div class="flex gap-2"><button onclick="saveNotice(${notice?.id||'null'})" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">저장</button><button onclick="document.getElementById('noticeFormArea').classList.add('hidden')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">취소</button></div></div>`;
  };
  window.editNotice = function(n) { window.showNoticeForm(n); };
  window.saveNotice = async function(id) {
    const body = { title: document.getElementById('nTitle').value, content: document.getElementById('nContent').value, is_pinned: document.getElementById('nPinned').checked?1:0 };
    if (id) await apiCall('/api/admin/notices/'+id, 'PUT', body);
    else await apiCall('/api/admin/notices', 'POST', body);
    await loadNotices();
  };
  window.deleteNotice = async function(id) { if(!confirm('삭제?')) return; await apiCall('/api/admin/notices/'+id,'DELETE'); await loadNotices(); };
})();
