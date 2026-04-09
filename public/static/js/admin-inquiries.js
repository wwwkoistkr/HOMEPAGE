// Admin - Inquiries Management (with Delete + Reply)
(async function() {
  const c = document.getElementById('admin-content');
  await load();

  async function load() {
    const d = await apiCall('/api/admin/inquiries');
    if (!d) return;
    const list = d.data || [];
    let h = '<div class="flex justify-between items-center mb-4">';
    h += '<span class="text-gray-500 text-sm">총 ' + list.length + '건</span>';
    h += '<div class="flex gap-2">';
    h += '<span class="text-xs px-2 py-1 rounded bg-yellow-50 text-yellow-600">';
    h += '대기: ' + list.filter(function(i) { return i.status === 'pending'; }).length + '건';
    h += '</span>';
    h += '<span class="text-xs px-2 py-1 rounded bg-green-50 text-green-600">';
    h += '답변완료: ' + list.filter(function(i) { return i.status !== 'pending'; }).length + '건';
    h += '</span>';
    h += '</div></div>';
    h += '<div class="space-y-3">';
    list.forEach(function(inq) {
      h += '<div class="border rounded-lg p-4">';
      h += '<div class="flex justify-between items-start mb-2">';
      h += '<div class="flex items-center gap-2">';
      h += '<span class="font-medium text-gray-800">' + inq.subject + '</span>';
      h += '<span class="px-2 py-0.5 rounded text-xs ' + (inq.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600') + '">' + (inq.status === 'pending' ? '대기' : '답변완료') + '</span>';
      h += '</div>';
      h += '<div class="flex items-center gap-2">';
      h += '<span class="text-xs text-gray-400">' + (inq.created_at || '').split('T')[0] + '</span>';
      h += '<button onclick="deleteInq(' + inq.id + ')" class="text-xs px-2 py-1 rounded border border-red-200 text-red-500 hover:bg-red-50">삭제</button>';
      h += '</div></div>';
      h += '<div class="text-sm text-gray-600 mb-2">' + inq.message.substring(0, 300) + (inq.message.length > 300 ? '...' : '') + '</div>';
      h += '<div class="text-xs text-gray-400 mb-3">';
      h += '<i class="fas fa-user mr-1"></i>' + inq.name;
      if (inq.company) h += ' | <i class="fas fa-building mr-1"></i>' + inq.company;
      if (inq.email) h += ' | <i class="fas fa-envelope mr-1"></i>' + inq.email;
      if (inq.phone) h += ' | <i class="fas fa-phone mr-1"></i>' + inq.phone;
      h += '</div>';
      if (inq.admin_reply) {
        h += '<div class="mt-3 p-3 bg-blue-50 rounded-lg">';
        h += '<div class="flex justify-between items-center mb-1">';
        h += '<span class="text-xs font-medium text-blue-700"><i class="fas fa-reply mr-1"></i>관리자 답변</span>';
        h += '<button onclick="editReply(' + inq.id + ')" class="text-xs text-blue-500 hover:underline">수정</button>';
        h += '</div>';
        h += '<div id="reply-view-' + inq.id + '" class="text-sm text-blue-700">' + inq.admin_reply + '</div>';
        h += '<div id="reply-edit-' + inq.id + '" class="hidden">';
        h += '<textarea id="reply-text-' + inq.id + '" rows="3" class="w-full px-3 py-2 border rounded-lg text-sm mb-2">' + inq.admin_reply + '</textarea>';
        h += '<div class="flex gap-2">';
        h += '<button onclick="replyInq(' + inq.id + ')" class="bg-blue-500 text-white px-3 py-1.5 rounded text-xs">저장</button>';
        h += '<button onclick="cancelEditReply(' + inq.id + ')" class="bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs">취소</button>';
        h += '</div></div>';
        h += '</div>';
      } else {
        h += '<div class="mt-3 border-t pt-3">';
        h += '<textarea id="reply-text-' + inq.id + '" rows="2" placeholder="답변을 입력하세요..." class="w-full px-3 py-2 border rounded-lg text-sm mb-2"></textarea>';
        h += '<button onclick="replyInq(' + inq.id + ')" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"><i class="fas fa-reply mr-1"></i>답변</button>';
        h += '</div>';
      }
      h += '</div>';
    });
    h += '</div>';
    if (list.length === 0) h = '<p class="text-gray-400 text-center py-12">접수된 문의가 없습니다.</p>';
    c.innerHTML = h;
  }

  window.replyInq = async function(id) {
    var reply = document.getElementById('reply-text-' + id).value;
    if (!reply) { alert('답변 내용을 입력해주세요.'); return; }
    await apiCall('/api/admin/inquiries/' + id, 'PUT', { admin_reply: reply, status: 'replied' });
    await load();
  };

  window.editReply = function(id) {
    document.getElementById('reply-view-' + id).classList.add('hidden');
    document.getElementById('reply-edit-' + id).classList.remove('hidden');
  };

  window.cancelEditReply = function(id) {
    document.getElementById('reply-view-' + id).classList.remove('hidden');
    document.getElementById('reply-edit-' + id).classList.add('hidden');
  };

  window.deleteInq = async function(id) {
    if (!confirm('이 문의를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;
    await apiCall('/api/admin/inquiries/' + id, 'DELETE');
    await load();
  };
})();
