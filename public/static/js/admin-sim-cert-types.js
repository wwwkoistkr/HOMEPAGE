// Admin - AI Simulator Cert Types Management
(async function() {
  const container = document.getElementById('admin-content');
  
  let items = [];
  
  async function loadData() {
    const data = await apiCall('/api/admin/sim-cert-types');
    if (!data || !data.data) {
      container.innerHTML = '<p class="text-red-500">데이터 로딩 실패</p>';
      return;
    }
    items = data.data;
    render();
  }

  function render() {
    let html = `
    <div class="bg-cyan-50/50 border border-cyan-100 rounded-xl p-4 mb-6">
      <div class="flex items-start gap-2 text-sm text-cyan-700">
        <i class="fas fa-robot mt-0.5"></i>
        <div>
          <p class="font-medium mb-1">AI 인증 소요시간 시뮬레이터 데이터 <span class="text-[10px] bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 font-bold ml-1">v39.1 감도 개선</span></p>
          <p class="text-xs text-cyan-600">홈페이지 상단 AI 시뮬레이터 히어로 배너에 표시되는 인증유형별 기간 데이터를 관리합니다.</p>
          <p class="text-xs text-cyan-600 mt-1"><strong>CCRA평가일수</strong>: 일반 프로세스의 최소~최대 기간(주) / <strong>KOIST</strong>: KOIST 프로세스의 최소~최대 기간(주)</p>
          <p class="text-[11px] text-amber-700 mt-2 bg-amber-50 border border-amber-200 rounded-lg p-2">
            <i class="fas fa-circle-info mr-1"></i>
            <strong>입력 가이드</strong>:
            <br>• <strong>최소(사전준비 100%)</strong>: 고객이 사전준비를 완벽히 했을 때의 예상 기간(가장 짧음)
            <br>• <strong>최대(사전준비 1%)</strong>: 사전준비가 전혀 없을 때의 예상 기간(가장 김)
            <br>• 홈 슬라이더(사전준비 1~100%)가 이 최소~최대 사이를 <strong>실시간 보간</strong>합니다.
            <br>• 홈 시뮬레이터에 <strong>실제 반영되는 항목은 CC평가 (EAL2), EAL3, EAL4 3개</strong>이며, KCMVP/보안기능확인서/성능평가는 참고용 데이터입니다.
          </p>
          <p class="text-[11px] text-emerald-700 mt-1 bg-emerald-50 border border-emerald-200 rounded-lg p-2">
            <i class="fas fa-check-circle mr-1"></i>
            <strong>v39.1 개선 사항</strong>: 입력값을 1~2주만 변경해도 홈 시뮬레이터에 즉시 반영됩니다(기존 반올림 손실 제거). CCRA 평가일수 "최소" 필드도 이제 슬라이더에 정상 반영됩니다.
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mb-4">
      <span class="text-sm text-gray-500"><i class="fas fa-database mr-1"></i>총 ${items.length}개 인증유형</span>
      <button onclick="openForm()" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        <i class="fas fa-plus mr-1"></i>인증유형 추가
      </button>
    </div>`;

    if (items.length === 0) {
      html += '<p class="text-gray-400 text-center py-8"><i class="fas fa-inbox text-3xl text-gray-300 block mb-2"></i>등록된 인증유형이 없습니다.</p>';
    } else {
      html += '<div class="space-y-3">';
      items.forEach(item => {
        const tradAvg = Math.round((item.traditional_min_weeks + item.traditional_max_weeks) / 2);
        const koistAvg = Math.round((item.koist_min_weeks + item.koist_max_weeks) / 2);
        const pct = tradAvg > 0 ? Math.round((1 - koistAvg / tradAvg) * 100) : 0;
        
        html += `
        <div class="border rounded-xl overflow-hidden ${item.is_active ? 'border-gray-200' : 'border-red-200 opacity-60'}">
          <div class="flex items-center justify-between p-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background: ${item.color}15;">
                <i class="fas ${item.icon}" style="color:${item.color}; font-size:16px;"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-gray-800">${item.name}</span>
                  ${!item.is_active ? '<span class="text-[10px] bg-red-100 text-red-600 rounded-full px-2 py-0.5 font-medium">비활성</span>' : ''}
                </div>
                <div class="flex items-center gap-3 mt-0.5">
                  <span class="text-xs text-gray-400">CCRA평가일수 ${item.traditional_min_weeks}~${item.traditional_max_weeks}주</span>
                  <span class="text-xs font-bold" style="color:${item.color}">KOIST ${item.koist_min_weeks}~${item.koist_max_weeks}주</span>
                  <span class="text-xs bg-blue-50 text-blue-600 rounded-full px-2 py-0.5 font-bold">-${pct}%</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="openForm(${JSON.stringify(item).replace(/"/g, '&quot;')})" class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-medium transition-colors">
                <i class="fas fa-edit mr-1"></i>수정
              </button>
              <button onclick="deleteItem(${item.id})" class="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-medium transition-colors">
                <i class="fas fa-trash mr-1"></i>삭제
              </button>
            </div>
          </div>
          ${item.description ? `<div class="px-4 pb-3 -mt-1"><p class="text-xs text-gray-400">${item.description}</p></div>` : ''}
        </div>`;
      });
      html += '</div>';
    }

    // Form modal
    html += `
    <div id="formModal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4" onclick="if(event.target===this)closeForm()">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div class="flex items-center justify-between p-4 border-b">
          <h3 id="formTitle" class="font-bold text-gray-800"><i class="fas fa-robot mr-2 text-cyan-500"></i>인증유형 추가</h3>
          <button onclick="closeForm()" class="p-1 text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
        </div>
        <form id="certForm" class="p-4 space-y-4" onsubmit="saveItem(event)">
          <input type="hidden" id="editId">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-medium text-gray-500 mb-1 block">인증유형명 *</label>
              <input type="text" id="f_name" required class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="CC평가 (EAL2)">
            </div>
            <div>
              <label class="text-xs font-medium text-gray-500 mb-1 block">슬러그 *</label>
              <input type="text" id="f_slug" required class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="cc-eal2">
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="text-xs font-medium text-gray-500 mb-1 block">아이콘</label>
              <input type="text" id="f_icon" class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="fa-shield-halved" value="fa-shield-halved">
            </div>
            <div>
              <label class="text-xs font-medium text-gray-500 mb-1 block">색상</label>
              <input type="color" id="f_color" class="w-full h-10 border rounded-lg cursor-pointer" value="#3B82F6">
            </div>
            <div>
              <label class="text-xs font-medium text-gray-500 mb-1 block">정렬순서</label>
              <input type="number" id="f_sort" class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" value="0">
            </div>
          </div>
          <div class="border rounded-xl p-3 bg-gray-50/50">
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              <i class="fas fa-building text-gray-400 mr-1"></i>CCRA평가일수 기간 (주)
            </label>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-[11px] text-gray-400 mb-0.5 block">최소 (사전준비 100%)</label>
                <input type="number" id="f_trad_min" class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" value="12" min="0">
              </div>
              <div>
                <label class="text-[11px] text-gray-400 mb-0.5 block">최대 (사전준비 1%)</label>
                <input type="number" id="f_trad_max" class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" value="28" min="0">
              </div>
            </div>
          </div>
          <div class="border rounded-xl p-3" style="background:rgba(37,99,235,0.02); border-color:rgba(37,99,235,0.1);">
            <label class="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2 block">
              <i class="fas fa-bolt text-yellow-500 mr-1"></i>KOIST 기간 (주)
            </label>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-[11px] text-blue-400 mb-0.5 block">최소 (사전준비 100%)</label>
                <input type="number" id="f_koist_min" class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" value="7" min="0">
              </div>
              <div>
                <label class="text-[11px] text-blue-400 mb-0.5 block">최대 (사전준비 1%)</label>
                <input type="number" id="f_koist_max" class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" value="20" min="0">
              </div>
            </div>
          </div>
          <div>
            <label class="text-xs font-medium text-gray-500 mb-1 block">설명</label>
            <input type="text" id="f_desc" class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="인증 유형에 대한 간단한 설명">
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="f_active" checked class="rounded">
            <label for="f_active" class="text-sm text-gray-600">활성</label>
          </div>
          <div class="flex gap-2 pt-2">
            <button type="submit" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
              <i class="fas fa-save mr-1"></i>저장
            </button>
            <button type="button" onclick="closeForm()" class="px-6 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-medium transition-colors">취소</button>
          </div>
        </form>
      </div>
    </div>`;

    container.innerHTML = html;
  }

  window.openForm = function(item) {
    document.getElementById('formModal').classList.remove('hidden');
    if (item) {
      document.getElementById('formTitle').innerHTML = '<i class="fas fa-robot mr-2 text-cyan-500"></i>인증유형 수정';
      document.getElementById('editId').value = item.id;
      document.getElementById('f_name').value = item.name;
      document.getElementById('f_slug').value = item.slug;
      document.getElementById('f_icon').value = item.icon;
      document.getElementById('f_color').value = item.color;
      document.getElementById('f_sort').value = item.sort_order;
      document.getElementById('f_trad_min').value = item.traditional_min_weeks;
      document.getElementById('f_trad_max').value = item.traditional_max_weeks;
      document.getElementById('f_koist_min').value = item.koist_min_weeks;
      document.getElementById('f_koist_max').value = item.koist_max_weeks;
      document.getElementById('f_desc').value = item.description || '';
      document.getElementById('f_active').checked = !!item.is_active;
    } else {
      document.getElementById('formTitle').innerHTML = '<i class="fas fa-robot mr-2 text-cyan-500"></i>인증유형 추가';
      document.getElementById('editId').value = '';
      document.getElementById('certForm').reset();
      document.getElementById('f_icon').value = 'fa-shield-halved';
      document.getElementById('f_color').value = '#3B82F6';
      document.getElementById('f_active').checked = true;
    }
  };

  window.closeForm = function() {
    document.getElementById('formModal').classList.add('hidden');
  };

  window.saveItem = async function(e) {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const body = {
      name: document.getElementById('f_name').value,
      slug: document.getElementById('f_slug').value,
      icon: document.getElementById('f_icon').value,
      color: document.getElementById('f_color').value,
      sort_order: parseInt(document.getElementById('f_sort').value) || 0,
      traditional_min_weeks: parseInt(document.getElementById('f_trad_min').value) || 0,
      traditional_max_weeks: parseInt(document.getElementById('f_trad_max').value) || 0,
      koist_min_weeks: parseInt(document.getElementById('f_koist_min').value) || 0,
      koist_max_weeks: parseInt(document.getElementById('f_koist_max').value) || 0,
      description: document.getElementById('f_desc').value,
      is_active: document.getElementById('f_active').checked ? 1 : 0,
    };
    
    if (id) {
      await apiCall('/api/admin/sim-cert-types/' + id, 'PUT', body);
    } else {
      await apiCall('/api/admin/sim-cert-types', 'POST', body);
    }
    closeForm();
    loadData();
  };

  window.deleteItem = async function(id) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await apiCall('/api/admin/sim-cert-types/' + id, 'DELETE');
    loadData();
  };

  loadData();
})();
