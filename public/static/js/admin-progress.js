// Admin - Progress Management (Full CRUD with Edit)
(async function() {
  const c = document.getElementById('admin-content');
  let progList = [];
  await load();

  async function load() {
    const d = await apiCall('/api/admin/progress');
    if (!d) return;
    progList = d.data || [];
    let h = '<div class="flex justify-between items-center mb-4">';
    h += '<span class="text-gray-500 text-sm">총 ' + progList.length + '개</span>';
    h += '<button onclick="showProgForm()" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"><i class="fas fa-plus mr-1"></i>추가</button>';
    h += '</div><div id="progFormArea" class="hidden mb-4"></div>';
    h += '<table class="w-full text-sm"><thead><tr class="bg-gray-50">';
    h += '<th class="py-2 px-3 text-left">구분</th>';
    h += '<th class="py-2 px-3 text-left">제품명</th>';
    h += '<th class="py-2 px-3 text-left">업체</th>';
    h += '<th class="py-2 px-3 text-center">상태</th>';
    h += '<th class="py-2 px-3 text-center">시작일</th>';
    h += '<th class="py-2 px-3 text-center">작업</th>';
    h += '</tr></thead><tbody>';
    progList.forEach(function(p) {
      h += '<tr class="border-t">';
      h += '<td class="py-2 px-3">' + p.category + '</td>';
      h += '<td class="py-2 px-3 font-medium">' + p.product_name + '</td>';
      h += '<td class="py-2 px-3">' + (p.company || '-') + '</td>';
      h += '<td class="py-2 px-3 text-center"><span class="px-2 py-0.5 rounded text-xs ' + (p.status === '완료' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600') + '">' + p.status + '</span></td>';
      h += '<td class="py-2 px-3 text-center text-gray-400">' + (p.start_date || '-') + '</td>';
      h += '<td class="py-2 px-3 text-center">';
      h += '<button onclick="editProg(' + p.id + ')" class="text-blue-500 text-xs hover:underline mr-2">수정</button>';
      h += '<button onclick="deleteProg(' + p.id + ')" class="text-red-500 text-xs hover:underline">삭제</button>';
      h += '</td></tr>';
    });
    h += '</tbody></table>';
    c.innerHTML = h;
  }

  function progFormHtml(prog) {
    var isEdit = !!prog;
    return '<div class="border rounded-lg p-4 bg-gray-50">'
      + '<h4 class="font-medium mb-3">' + (isEdit ? '평가현황 수정' : '평가현황 추가') + '</h4>'
      + '<div class="grid grid-cols-2 gap-3 mb-3">'
      + '<select id="prCat" class="px-3 py-2 border rounded-lg text-sm">'
      + '<option' + (prog && prog.category === 'CC평가' ? ' selected' : '') + '>CC평가</option>'
      + '<option' + (prog && prog.category === '보안기능시험' ? ' selected' : '') + '>보안기능시험</option>'
      + '<option' + (prog && prog.category === 'KCMVP' ? ' selected' : '') + '>KCMVP</option>'
      + '<option' + (prog && prog.category === '성능평가' ? ' selected' : '') + '>성능평가</option>'
      + '</select>'
      + '<input id="prName" value="' + (prog ? prog.product_name.replace(/"/g, '&quot;') : '') + '" placeholder="제품명" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="prComp" value="' + (prog ? (prog.company || '').replace(/"/g, '&quot;') : '') + '" placeholder="업체" class="px-3 py-2 border rounded-lg text-sm">'
      + '<select id="prStatus" class="px-3 py-2 border rounded-lg text-sm">'
      + '<option' + (prog && prog.status === '진행중' ? ' selected' : '') + '>진행중</option>'
      + '<option' + (prog && prog.status === '완료' ? ' selected' : '') + '>완료</option>'
      + '</select>'
      + '<input id="prDate" type="date" value="' + (prog ? (prog.start_date || '') : '') + '" class="px-3 py-2 border rounded-lg text-sm" placeholder="시작일">'
      + '<input id="prEndDate" type="date" value="' + (prog ? (prog.end_date || '') : '') + '" class="px-3 py-2 border rounded-lg text-sm" placeholder="종료일">'
      + '</div>'
      + '<textarea id="prNote" rows="2" placeholder="비고" class="w-full px-3 py-2 border rounded-lg text-sm mb-3">' + (prog ? (prog.note || '') : '') + '</textarea>'
      + '<div class="flex gap-2">'
      + '<button onclick="saveProg(' + (prog ? prog.id : 'null') + ')" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">저장</button>'
      + '<button onclick="document.getElementById(\'progFormArea\').classList.add(\'hidden\')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">취소</button>'
      + '</div></div>';
  }

  window.showProgForm = function() {
    var a = document.getElementById('progFormArea');
    a.classList.remove('hidden');
    a.innerHTML = progFormHtml(null);
  };

  window.editProg = function(id) {
    var prog = progList.find(function(p) { return p.id === id; });
    if (!prog) return;
    var a = document.getElementById('progFormArea');
    a.classList.remove('hidden');
    a.innerHTML = progFormHtml(prog);
    a.scrollIntoView({ behavior: 'smooth' });
  };

  window.saveProg = async function(id) {
    var body = {
      category: document.getElementById('prCat').value,
      product_name: document.getElementById('prName').value,
      company: document.getElementById('prComp').value,
      status: document.getElementById('prStatus').value,
      start_date: document.getElementById('prDate').value || null,
      end_date: document.getElementById('prEndDate').value || null,
      note: document.getElementById('prNote').value
    };
    if (id) await apiCall('/api/admin/progress/' + id, 'PUT', body);
    else await apiCall('/api/admin/progress', 'POST', body);
    document.getElementById('progFormArea').classList.add('hidden');
    await load();
  };

  window.deleteProg = async function(id) {
    if (!confirm('이 항목을 삭제하시겠습니까?')) return;
    await apiCall('/api/admin/progress/' + id, 'DELETE');
    await load();
  };
})();
