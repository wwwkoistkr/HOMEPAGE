// Admin - Progress Management v9.0 (원본 koist.kr 기반 카테고리 + 확장)
// CC평가, 보안기능시험, 암호모듈검증, 성능평가 (원본 4개) + 확장 6개 카테고리
(async function() {
  const c = document.getElementById('admin-content');
  let progList = [];
  let currentCategory = '';

  // ── 10개 사업 카테고리 정의 (원본 koist.kr 반영) ──
  // 원본 사이트 4개 핵심 카테고리의 컬럼 구조를 정확히 반영
  // + 6개 확장 카테고리 (관리자 모드에서 자유롭게 추가 가능)
  const CATEGORIES = {
    'CC평가':       { icon: 'fa-shield-halved', color: '#3B82F6', col2: '보증등급', col3: '인증구분', col4: '신청구분',
                      col2Opts: ['EAL1','EAL1+','EAL2','EAL3','EAL4','EAL5','EAL6','EAL7','EAL 1+'],
                      col3Opts: ['최초평가','재평가'],
                      col4Opts: ['국내평가','국제평가'],
                      statusOpts: ['평가접수','평가진행','평가완료'] },
    '보안기능시험':   { icon: 'fa-file-shield', color: '#8B5CF6', col2: '제품유형', col3: '발급유형', col4: '신청구분',
                      col2Opts: ['정보보호시스템','네트워크장비'],
                      col3Opts: ['기본시험','간소화 발급'],
                      col4Opts: ['최초신청','변경·재승인','갱신신청'],
                      statusOpts: ['시험접수','시험진행','발급완료'] },
    '암호모듈검증':   { icon: 'fa-lock', color: '#EC4899', col2: '보안수준', col3: '모듈형태', col4: '-',
                      col2Opts: ['1','2','3'],
                      col3Opts: ['소프트웨어','하드웨어','펌웨어'],
                      col4Opts: ['-'],
                      statusOpts: ['시험접수','시험진행','발급완료'] },
    '성능평가':      { icon: 'fa-gauge-high', color: '#F59E0B', col2: '제품유형', col3: '운영체제', col4: '개발사',
                      col2Opts: ['안티바이러스 제품','안티바이러스제품(Linux)','안티바이러스 제품 (Mobile)','모듈형 안티바이러스 제품','SSL VPN','소스코드 보안약점 분석도구','방화벽','IPS','WAF','DLP'],
                      col3Opts: ['-','Windows','Linux','Android','iOS','U3000S'],
                      col4Opts: [],
                      freeText: { col4: true },
                      statusOpts: ['평가접수','평가진행','발급완료'] },
    '보안적합성검증':  { icon: 'fa-clipboard-check', color: '#10B981', col2: '적합등급', col3: '검증구분', col4: '검증기준',
                      col2Opts: ['적합','조건부적합','부적합'],
                      col3Opts: ['신규검증','정기검증','수시검증'],
                      col4Opts: ['전자정부기준','국방기준','행정기관기준','교육기관기준','의료기관기준','금융기관기준','기반시설기준','지자체기준','연구기관기준'],
                      statusOpts: ['평가접수','평가진행','평가완료'] },
    '취약점분석평가':  { icon: 'fa-bug', color: '#EF4444', col2: '위험등급', col3: '분석유형', col4: '평가범위',
                      col2Opts: ['상','중','하'],
                      col3Opts: ['웹취약점','앱취약점','시스템취약점','인프라취약점','모바일취약점','펌웨어취약점','클라우드취약점','AI취약점'],
                      col4Opts: ['모의침투','소스코드분석','동적분석','네트워크스캔','리버싱분석','설정점검','침투테스트','적대적공격','통합분석'],
                      statusOpts: ['평가접수','평가진행','평가완료'] },
    '정보보호제품평가': { icon: 'fa-box-archive', color: '#06B6D4', col2: '평가등급', col3: '제품유형', col4: '평가기준',
                      col2Opts: ['A등급','B등급','C등급'],
                      col3Opts: ['OS보안','네트워크보안','앱보안','출력보안','모바일보안','데이터보안','인증보안','접근제어','포렌식','보안관제'],
                      col4Opts: ['TCSEC기준','ITSEC기준','PP기준','국정원기준','MDM기준','백업기준','IAM기준','ZTA기준','디지털포렌식기준','SOAR기준'],
                      statusOpts: ['평가접수','평가진행','평가완료'] },
    '클라우드보안인증': { icon: 'fa-cloud-arrow-up', color: '#6366F1', col2: '인증등급', col3: '서비스유형', col4: '인증기준',
                      col2Opts: ['상','중','하'],
                      col3Opts: ['IaaS','PaaS','SaaS','MSP'],
                      col4Opts: ['CSAP기준','ISO27017','ISO27018','CSA STAR'],
                      statusOpts: ['평가접수','평가진행','평가완료'] },
    'IoT보안인증':   { icon: 'fa-microchip', color: '#14B8A6', col2: '인증등급', col3: '기기유형', col4: '인증기준',
                      col2Opts: ['Lite','Standard','High'],
                      col3Opts: ['홈IoT','산업IoT','공장IoT','차량IoT','의료IoT','에너지IoT','보안IoT','도시IoT','드론IoT','헬스IoT'],
                      col4Opts: ['경량인증','표준인증','고급인증'],
                      statusOpts: ['평가접수','평가진행','평가완료'] },
    '기타시험평가':   { icon: 'fa-flask', color: '#78716C', col2: '등급', col3: '유형', col4: '기준',
                      col2Opts: ['A','B','C'],
                      col3Opts: ['블록체인','AI보안','양자암호','자율주행','디지털트윈','5G보안','메타버스','ZTA'],
                      col4Opts: ['스마트컨트랙트','모델검증','QKD시험','V2X보안','시뮬레이션','프로토콜시험','플랫폼시험','아키텍처검증'],
                      statusOpts: ['평가접수','평가진행','평가완료'] }
  };

  const catKeys = Object.keys(CATEGORIES);
  await load();

  async function load() {
    const d = await apiCall('/api/admin/progress');
    if (!d) return;
    progList = d.data || [];

    // 카테고리별 건수 집계 (정의되지 않은 카테고리도 표시)
    var catCounts = {};
    catKeys.forEach(function(k) { catCounts[k] = 0; });
    progList.forEach(function(p) { 
      if (catCounts[p.category] !== undefined) catCounts[p.category]++; 
      else catCounts[p.category] = (catCounts[p.category]||0)+1; 
    });

    var filtered = currentCategory ? progList.filter(function(p) { return p.category === currentCategory; }) : progList;
    var meta = currentCategory ? CATEGORIES[currentCategory] : null;

    var h = '';
    // ── 상단 요약 카드 ──
    h += '<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">';
    h += '<button onclick="filterCat(\'\')" class="p-3 rounded-lg border text-left transition-all hover:shadow ' + (!currentCategory ? 'border-blue-400 bg-blue-50 ring-1 ring-blue-300' : 'border-gray-200 hover:border-gray-300') + '">';
    h += '<div class="text-xs text-gray-500 mb-1"><i class="fas fa-layer-group mr-1"></i>전체</div>';
    h += '<div class="text-xl font-bold text-gray-800">' + progList.length + '</div></button>';
    catKeys.forEach(function(k) {
      var m = CATEGORIES[k];
      var cnt = catCounts[k] || 0;
      var active = currentCategory === k;
      h += '<button onclick="filterCat(\'' + k + '\')" class="p-3 rounded-lg border text-left transition-all hover:shadow ' + (active ? 'ring-1' : 'border-gray-200 hover:border-gray-300') + '" style="' + (active ? 'border-color:' + m.color + '; background:' + m.color + '08; --tw-ring-color:' + m.color + '40;' : '') + '">';
      h += '<div class="text-xs text-gray-500 mb-1 truncate"><i class="fas ' + m.icon + ' mr-1" style="color:' + m.color + '"></i>' + k + '</div>';
      h += '<div class="text-xl font-bold" style="color:' + (cnt > 0 ? m.color : '#ccc') + '">' + cnt + '</div></button>';
    });
    h += '</div>';

    // ── 데이터 소스 안내 ──
    if (!currentCategory) {
      h += '<div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-700">';
      h += '<i class="fas fa-info-circle mr-1"></i>';
      h += '<strong>원본 데이터 기준:</strong> CC평가 142건, 보안기능시험 69건, 암호모듈검증 1건, 성능평가 6건이 원본 koist.kr에서 추출되었습니다. ';
      h += '확장 카테고리(보안적합성검증, 취약점분석평가 등)는 관리자 모드에서 직접 데이터를 추가할 수 있습니다.';
      h += '</div>';
    }

    // ── 액션 바 ──
    h += '<div class="flex flex-wrap justify-between items-center mb-4 gap-2">';
    h += '<span class="text-gray-500 text-sm">' + (currentCategory ? '<span class="font-semibold" style="color:' + meta.color + '"><i class="fas ' + meta.icon + ' mr-1"></i>' + currentCategory + '</span> · ' : '') + '총 <b>' + filtered.length + '</b>건</span>';
    h += '<button onclick="showProgForm()" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 shadow-sm"><i class="fas fa-plus mr-1"></i>추가</button>';
    h += '</div>';
    h += '<div id="progFormArea" class="hidden mb-4"></div>';

    // ── 테이블 ──
    h += '<div class="overflow-x-auto border rounded-lg">';
    h += '<table class="w-full text-sm"><thead><tr class="bg-gray-50 border-b">';
    h += '<th class="py-2.5 px-3 text-left text-xs font-semibold text-gray-500 w-12">No</th>';
    if (!currentCategory) h += '<th class="py-2.5 px-3 text-left text-xs font-semibold text-gray-500">사업분류</th>';
    h += '<th class="py-2.5 px-3 text-left text-xs font-semibold text-gray-500">제품명/업체</th>';
    h += '<th class="py-2.5 px-3 text-center text-xs font-semibold text-gray-500">' + (meta ? meta.col2 : '등급') + '</th>';
    h += '<th class="py-2.5 px-3 text-center text-xs font-semibold text-gray-500 hidden md:table-cell">' + (meta ? meta.col3 : '구분') + '</th>';
    h += '<th class="py-2.5 px-3 text-center text-xs font-semibold text-gray-500 hidden lg:table-cell">' + (meta ? meta.col4 : '유형') + '</th>';
    h += '<th class="py-2.5 px-3 text-center text-xs font-semibold text-gray-500">상태</th>';
    h += '<th class="py-2.5 px-3 text-center text-xs font-semibold text-gray-500 w-24">작업</th>';
    h += '</tr></thead><tbody>';

    filtered.forEach(function(p, i) {
      var isComplete = p.status === '평가완료' || p.status === '발급완료';
      var isProgress = p.status === '평가진행' || p.status === '시험진행';
      var statusCls = isComplete ? 'bg-green-50 text-green-600 border-green-200' : isProgress ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200';
      var cm = CATEGORIES[p.category] || { icon: 'fa-circle', color: '#999' };
      h += '<tr class="border-t hover:bg-gray-50/50">';
      h += '<td class="py-2 px-3 text-gray-400 text-xs">' + (i + 1) + '</td>';
      if (!currentCategory) {
        h += '<td class="py-2 px-3"><span class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium" style="background:' + cm.color + '10; color:' + cm.color + '"><i class="fas ' + cm.icon + '" style="font-size:9px"></i>' + p.category + '</span></td>';
      }
      h += '<td class="py-2 px-3"><div class="font-medium text-gray-800">' + esc(p.product_name) + '</div>' + (p.company ? '<div class="text-xs text-gray-400">' + esc(p.company) + '</div>' : '') + '</td>';
      h += '<td class="py-2 px-3 text-center"><span class="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">' + (p.assurance_level || '-') + '</span></td>';
      h += '<td class="py-2 px-3 text-center text-xs text-gray-600 hidden md:table-cell">' + (p.cert_type || '-') + '</td>';
      h += '<td class="py-2 px-3 text-center text-xs text-gray-600 hidden lg:table-cell">' + (p.eval_type || '-') + '</td>';
      h += '<td class="py-2 px-3 text-center"><span class="px-2 py-0.5 rounded text-xs border ' + statusCls + '">' + p.status + '</span></td>';
      h += '<td class="py-2 px-3 text-center whitespace-nowrap">';
      h += '<button onclick="editProg(' + p.id + ')" class="text-blue-500 text-xs hover:underline mr-2"><i class="fas fa-edit"></i> 수정</button>';
      h += '<button onclick="deleteProg(' + p.id + ')" class="text-red-500 text-xs hover:underline"><i class="fas fa-trash"></i></button>';
      h += '</td></tr>';
    });

    if (filtered.length === 0) {
      h += '<tr><td colspan="' + (currentCategory ? 7 : 8) + '" class="py-8 text-center text-gray-400"><i class="fas fa-inbox text-gray-300 text-2xl block mb-2"></i>등록된 현황이 없습니다.<br><span class="text-xs">위의 [추가] 버튼으로 새 항목을 등록할 수 있습니다.</span></td></tr>';
    }
    h += '</tbody></table></div>';
    c.innerHTML = h;
  }

  function esc(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g, '&quot;'); }

  function optionsHtml(opts, selected) {
    return opts.map(function(v) {
      return '<option' + (selected === v ? ' selected' : '') + '>' + v + '</option>';
    }).join('');
  }

  function progFormHtml(prog) {
    var isEdit = !!prog;
    var selCat = (prog && prog.category) || currentCategory || 'CC평가';
    var meta = CATEGORIES[selCat] || CATEGORIES['CC평가'];

    var h = '<div class="border rounded-xl p-5 bg-gradient-to-b from-gray-50 to-white shadow-sm">';
    h += '<h4 class="font-semibold mb-4 flex items-center gap-2"><i class="fas fa-' + (isEdit ? 'edit text-blue-500' : 'plus text-green-500') + '"></i>' + (isEdit ? '평가현황 수정' : '평가현황 추가') + '</h4>';
    h += '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">';

    // 카테고리 선택
    h += '<div><label class="block text-xs font-semibold text-gray-600 mb-1">사업 분류 *</label>';
    h += '<select id="prCat" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400" onchange="onCatChange()">';
    catKeys.forEach(function(k) {
      h += '<option value="' + k + '"' + (selCat === k ? ' selected' : '') + '>' + k + '</option>';
    });
    h += '</select></div>';

    // 제품명
    h += '<div class="col-span-2 md:col-span-1"><label class="block text-xs font-semibold text-gray-600 mb-1">제품명 *</label>';
    h += '<input id="prName" value="' + esc(prog && prog.product_name) + '" placeholder="제품/서비스명" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400"></div>';

    // 업체
    h += '<div><label class="block text-xs font-semibold text-gray-600 mb-1">업체/개발사</label>';
    h += '<input id="prComp" value="' + esc(prog && prog.company) + '" placeholder="업체명 (선택)" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400"></div>';

    // 동적 필드 (카테고리에 따라 변경)
    h += '<div id="dynFields">' + dynFieldsHtml(selCat, prog) + '</div>';

    // 진행상태 (카테고리별 상태 옵션)
    h += '<div><label class="block text-xs font-semibold text-gray-600 mb-1">진행상태</label>';
    h += '<select id="prStatus" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400">';
    var statusOpts = meta.statusOpts || ['평가접수','평가진행','평가완료'];
    statusOpts.forEach(function(s) {
      h += '<option' + (prog && prog.status === s ? ' selected' : '') + '>' + s + '</option>';
    });
    h += '</select></div>';

    // 날짜
    h += '<div><label class="block text-xs font-semibold text-gray-600 mb-1">시작일/발급일</label>';
    h += '<input id="prDate" type="date" value="' + (prog ? (prog.start_date || '') : '') + '" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400"></div>';
    h += '<div><label class="block text-xs font-semibold text-gray-600 mb-1">종료일</label>';
    h += '<input id="prEndDate" type="date" value="' + (prog ? (prog.end_date || '') : '') + '" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400"></div>';

    h += '</div>';  // grid end

    // 비고
    h += '<textarea id="prNote" rows="2" placeholder="비고 / 메모" class="w-full px-3 py-2 border rounded-lg text-sm mb-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-400">' + (prog ? (prog.note || '') : '') + '</textarea>';

    h += '<div class="flex gap-2">';
    h += '<button onclick="saveProg(' + (prog ? prog.id : 'null') + ')" class="bg-blue-500 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-600 shadow-sm"><i class="fas fa-save mr-1"></i>저장</button>';
    h += '<button onclick="document.getElementById(\'progFormArea\').classList.add(\'hidden\')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">취소</button>';
    h += '</div></div>';
    return h;
  }

  function dynFieldsHtml(cat, prog) {
    var meta = CATEGORIES[cat] || CATEGORIES['CC평가'];
    var h = '';
    // Col2 - 등급/유형
    h += '<label class="block text-xs font-semibold text-gray-600 mb-1">' + meta.col2 + '</label>';
    if (meta.col2Opts && meta.col2Opts.length > 0) {
      h += '<select id="prLevel" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400 mb-3">';
      h += optionsHtml(meta.col2Opts, prog && prog.assurance_level);
      h += '</select>';
    } else {
      h += '<input id="prLevel" value="' + esc(prog && prog.assurance_level) + '" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400 mb-3">';
    }
    // Col3 - 구분
    h += '<label class="block text-xs font-semibold text-gray-600 mb-1">' + meta.col3 + '</label>';
    if (meta.col3Opts && meta.col3Opts.length > 0) {
      h += '<select id="prCert" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400 mb-3">';
      h += optionsHtml(meta.col3Opts, prog && prog.cert_type);
      h += '</select>';
    } else {
      h += '<input id="prCert" value="' + esc(prog && prog.cert_type) + '" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400 mb-3">';
    }
    // Col4 - 유형
    if (meta.col4 !== '-') {
      h += '<label class="block text-xs font-semibold text-gray-600 mb-1">' + meta.col4 + '</label>';
      if (meta.freeText && meta.freeText.col4) {
        h += '<input id="prEval" value="' + esc(prog && prog.eval_type) + '" placeholder="직접 입력" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400">';
      } else if (meta.col4Opts && meta.col4Opts.length > 0) {
        h += '<select id="prEval" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400">';
        h += optionsHtml(meta.col4Opts, prog && prog.eval_type);
        h += '</select>';
      } else {
        h += '<input id="prEval" value="' + esc(prog && prog.eval_type) + '" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400">';
      }
    } else {
      h += '<input type="hidden" id="prEval" value="-">';
    }
    return h;
  }

  // ── 글로벌 함수 ──
  window.filterCat = function(cat) {
    currentCategory = cat;
    load();
  };

  window.onCatChange = function() {
    var cat = document.getElementById('prCat').value;
    var dynEl = document.getElementById('dynFields');
    if (dynEl) dynEl.innerHTML = dynFieldsHtml(cat, null);
    // 상태 옵션도 카테고리에 맞게 업데이트
    var meta = CATEGORIES[cat];
    if (meta && meta.statusOpts) {
      var statusEl = document.getElementById('prStatus');
      if (statusEl) {
        statusEl.innerHTML = meta.statusOpts.map(function(s) {
          return '<option>' + s + '</option>';
        }).join('');
      }
    }
  };

  window.showProgForm = function() {
    var a = document.getElementById('progFormArea');
    a.classList.remove('hidden');
    a.innerHTML = progFormHtml(null);
    a.scrollIntoView({ behavior: 'smooth' });
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
    var name = document.getElementById('prName').value.trim();
    if (!name) { alert('제품명을 입력해주세요.'); return; }
    var body = {
      category: document.getElementById('prCat').value,
      product_name: name,
      company: document.getElementById('prComp').value,
      status: document.getElementById('prStatus').value,
      assurance_level: document.getElementById('prLevel').value,
      cert_type: document.getElementById('prCert').value,
      eval_type: document.getElementById('prEval') ? document.getElementById('prEval').value : '',
      start_date: document.getElementById('prDate').value || null,
      end_date: document.getElementById('prEndDate').value || null,
      note: document.getElementById('prNote').value
    };
    var res;
    if (id) res = await apiCall('/api/admin/progress/' + id, 'PUT', body);
    else res = await apiCall('/api/admin/progress', 'POST', body);
    if (res && res.success) {
      document.getElementById('progFormArea').classList.add('hidden');
      await load();
    } else {
      alert('저장에 실패했습니다.');
    }
  };

  window.deleteProg = async function(id) {
    if (!confirm('이 항목을 삭제하시겠습니까?')) return;
    await apiCall('/api/admin/progress/' + id, 'DELETE');
    await load();
  };
})();
