// Admin - Progress Management (Full CRUD with Edit - v5.1 with new fields)
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
    h += '<div class="overflow-x-auto">';
    h += '<table class="w-full text-sm"><thead><tr class="bg-gray-50">';
    h += '<th class="py-2 px-3 text-left">번호</th>';
    h += '<th class="py-2 px-3 text-left">제품명</th>';
    h += '<th class="py-2 px-3 text-center">보증등급</th>';
    h += '<th class="py-2 px-3 text-center">인증구분</th>';
    h += '<th class="py-2 px-3 text-center">신청구분</th>';
    h += '<th class="py-2 px-3 text-center">진행상태</th>';
    h += '<th class="py-2 px-3 text-center">작업</th>';
    h += '</tr></thead><tbody>';
    progList.forEach(function(p, i) {
      var statusCls = p.status === '평가완료' ? 'bg-green-50 text-green-600' : p.status === '평가진행' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600';
      h += '<tr class="border-t">';
      h += '<td class="py-2 px-3 text-gray-400">' + (i + 1) + '</td>';
      h += '<td class="py-2 px-3 font-medium">' + p.product_name + '</td>';
      h += '<td class="py-2 px-3 text-center"><span class="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">' + (p.assurance_level || '-') + '</span></td>';
      h += '<td class="py-2 px-3 text-center text-xs">' + (p.cert_type || '-') + '</td>';
      h += '<td class="py-2 px-3 text-center text-xs">' + (p.eval_type || '-') + '</td>';
      h += '<td class="py-2 px-3 text-center"><span class="px-2 py-0.5 rounded text-xs ' + statusCls + '">' + p.status + '</span></td>';
      h += '<td class="py-2 px-3 text-center">';
      h += '<button onclick="editProg(' + p.id + ')" class="text-blue-500 text-xs hover:underline mr-2">수정</button>';
      h += '<button onclick="deleteProg(' + p.id + ')" class="text-red-500 text-xs hover:underline">삭제</button>';
      h += '</td></tr>';
    });
    h += '</tbody></table></div>';
    c.innerHTML = h;
  }

  function esc(s) { return (s || '').replace(/"/g, '&quot;'); }

  function progFormHtml(prog) {
    var isEdit = !!prog;
    return '<div class="border rounded-lg p-4 bg-gray-50">'
      + '<h4 class="font-medium mb-3">' + (isEdit ? '평가현황 수정' : '평가현황 추가') + '</h4>'
      + '<div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">'
      + '<div><label class="block text-xs font-medium text-gray-600 mb-1">구분</label>'
      + '<select id="prCat" class="w-full px-3 py-2 border rounded-lg text-sm">'
      + '<option' + (prog && prog.category === 'CC평가' ? ' selected' : '') + '>CC평가</option>'
      + '<option' + (prog && prog.category === '보안기능시험' ? ' selected' : '') + '>보안기능시험</option>'
      + '<option' + (prog && prog.category === 'KCMVP' ? ' selected' : '') + '>KCMVP</option>'
      + '<option' + (prog && prog.category === '성능평가' ? ' selected' : '') + '>성능평가</option>'
      + '</select></div>'
      + '<div><label class="block text-xs font-medium text-gray-600 mb-1">제품명 *</label>'
      + '<input id="prName" value="' + esc(prog && prog.product_name) + '" placeholder="제품명" class="w-full px-3 py-2 border rounded-lg text-sm"></div>'
      + '<div><label class="block text-xs font-medium text-gray-600 mb-1">보증등급</label>'
      + '<select id="prLevel" class="w-full px-3 py-2 border rounded-lg text-sm">'
      + ['EAL1', 'EAL1+', 'EAL2', 'EAL3', 'EAL4', 'EAL5', 'EAL6', 'EAL7'].map(function(v) {
          return '<option' + (prog && prog.assurance_level === v ? ' selected' : '') + '>' + v + '</option>';
        }).join('')
      + '</select></div>'
      + '<div><label class="block text-xs font-medium text-gray-600 mb-1">인증구분</label>'
      + '<select id="prCert" class="w-full px-3 py-2 border rounded-lg text-sm">'
      + '<option' + (prog && prog.cert_type === '최초평가' ? ' selected' : '') + '>최초평가</option>'
      + '<option' + (prog && prog.cert_type === '재평가' ? ' selected' : '') + '>재평가</option>'
      + '</select></div>'
      + '<div><label class="block text-xs font-medium text-gray-600 mb-1">신청구분</label>'
      + '<select id="prEval" class="w-full px-3 py-2 border rounded-lg text-sm">'
      + '<option' + (prog && prog.eval_type === '국내평가' ? ' selected' : '') + '>국내평가</option>'
      + '<option' + (prog && prog.eval_type === '국제평가' ? ' selected' : '') + '>국제평가</option>'
      + '</select></div>'
      + '<div><label class="block text-xs font-medium text-gray-600 mb-1">진행상태</label>'
      + '<select id="prStatus" class="w-full px-3 py-2 border rounded-lg text-sm">'
      + '<option' + (prog && prog.status === '평가접수' ? ' selected' : '') + '>평가접수</option>'
      + '<option' + (prog && prog.status === '평가진행' ? ' selected' : '') + '>평가진행</option>'
      + '<option' + (prog && prog.status === '평가완료' ? ' selected' : '') + '>평가완료</option>'
      + '</select></div>'
      + '<div><label class="block text-xs font-medium text-gray-600 mb-1">업체</label>'
      + '<input id="prComp" value="' + esc(prog && prog.company) + '" placeholder="업체명" class="w-full px-3 py-2 border rounded-lg text-sm"></div>'
      + '<div><label class="block text-xs font-medium text-gray-600 mb-1">시작일</label>'
      + '<input id="prDate" type="date" value="' + (prog ? (prog.start_date || '') : '') + '" class="w-full px-3 py-2 border rounded-lg text-sm"></div>'
      + '<div><label class="block text-xs font-medium text-gray-600 mb-1">종료일</label>'
      + '<input id="prEndDate" type="date" value="' + (prog ? (prog.end_date || '') : '') + '" class="w-full px-3 py-2 border rounded-lg text-sm"></div>'
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
      assurance_level: document.getElementById('prLevel').value,
      cert_type: document.getElementById('prCert').value,
      eval_type: document.getElementById('prEval').value,
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
