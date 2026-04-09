// Admin - FAQ Management (Full CRUD with Edit)
(async function() {
  const c = document.getElementById('admin-content');
  let faqList = [];
  await load();

  async function load() {
    const d = await apiCall('/api/admin/faqs');
    if (!d) return;
    faqList = d.data || [];
    let h = '<div class="flex justify-between items-center mb-4">';
    h += '<span class="text-gray-500 text-sm">총 ' + faqList.length + '개</span>';
    h += '<button onclick="showFaqForm()" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"><i class="fas fa-plus mr-1"></i>추가</button>';
    h += '</div><div id="faqFormArea" class="hidden mb-4"></div><div class="space-y-2">';
    faqList.forEach(function(f) {
      h += '<div class="border rounded-lg p-4">';
      h += '<div class="flex justify-between items-start gap-4">';
      h += '<div class="min-w-0">';
      h += '<div class="flex items-center gap-2">';
      h += '<span class="font-medium text-gray-800">Q. ' + f.question + '</span>';
      h += '<span class="px-2 py-0.5 rounded text-xs ' + (f.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500') + '">' + (f.is_active ? '활성' : '비활성') + '</span>';
      h += '</div>';
      h += '<div class="text-sm text-gray-500 mt-1 line-clamp-2">' + f.answer.replace(/<[^>]*>/g, '').substring(0, 100) + '...</div>';
      h += '<div class="text-xs text-gray-400 mt-1">순서: ' + f.sort_order + ' | 카테고리: ' + (f.category || 'general') + '</div>';
      h += '</div>';
      h += '<div class="flex gap-2 shrink-0">';
      h += '<button onclick="editFaq(' + f.id + ')" class="text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50">수정</button>';
      h += '<button onclick="toggleFaq(' + f.id + ',' + (f.is_active ? 0 : 1) + ')" class="text-xs px-3 py-1.5 rounded-lg border">' + (f.is_active ? '비활성화' : '활성화') + '</button>';
      h += '<button onclick="deleteFaq(' + f.id + ')" class="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">삭제</button>';
      h += '</div></div></div>';
    });
    h += '</div>';
    c.innerHTML = h;
  }

  function faqFormHtml(faq) {
    var isEdit = !!faq;
    return '<div class="border rounded-lg p-4 bg-gray-50">'
      + '<h4 class="font-medium mb-3">' + (isEdit ? 'FAQ 수정' : '새 FAQ 추가') + '</h4>'
      + '<input id="fQ" value="' + (faq ? faq.question.replace(/"/g, '&quot;') : '') + '" placeholder="질문" class="w-full px-3 py-2 border rounded-lg text-sm mb-3">'
      + '<textarea id="fA" rows="4" placeholder="답변 (HTML 가능)" class="w-full px-3 py-2 border rounded-lg text-sm mb-3">' + (faq ? faq.answer : '') + '</textarea>'
      + '<div class="grid grid-cols-2 gap-3 mb-3">'
      + '<input id="fCat" value="' + (faq ? (faq.category || 'general') : 'general') + '" placeholder="카테고리" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="fOrder" type="number" value="' + (faq ? faq.sort_order : 0) + '" placeholder="순서" class="px-3 py-2 border rounded-lg text-sm">'
      + '</div>'
      + '<div class="flex gap-2">'
      + '<button onclick="saveFaq(' + (faq ? faq.id : 'null') + ')" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">저장</button>'
      + '<button onclick="document.getElementById(\'faqFormArea\').classList.add(\'hidden\')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">취소</button>'
      + '</div></div>';
  }

  window.showFaqForm = function() {
    var a = document.getElementById('faqFormArea');
    a.classList.remove('hidden');
    a.innerHTML = faqFormHtml(null);
  };

  window.editFaq = function(id) {
    var faq = faqList.find(function(f) { return f.id === id; });
    if (!faq) return;
    var a = document.getElementById('faqFormArea');
    a.classList.remove('hidden');
    a.innerHTML = faqFormHtml(faq);
    a.scrollIntoView({ behavior: 'smooth' });
  };

  window.saveFaq = async function(id) {
    var body = {
      question: document.getElementById('fQ').value,
      answer: document.getElementById('fA').value,
      category: document.getElementById('fCat').value || 'general',
      sort_order: parseInt(document.getElementById('fOrder').value) || 0
    };
    if (id) await apiCall('/api/admin/faqs/' + id, 'PUT', body);
    else await apiCall('/api/admin/faqs', 'POST', body);
    document.getElementById('faqFormArea').classList.add('hidden');
    await load();
  };

  window.toggleFaq = async function(id, v) {
    await apiCall('/api/admin/faqs/' + id, 'PUT', { is_active: v });
    await load();
  };

  window.deleteFaq = async function(id) {
    if (!confirm('이 FAQ를 삭제하시겠습니까?')) return;
    await apiCall('/api/admin/faqs/' + id, 'DELETE');
    await load();
  };
})();
