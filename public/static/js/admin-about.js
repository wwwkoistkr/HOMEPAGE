// Admin - About Pages Management (KOIST 소개 페이지)
(async function() {
  const c = document.getElementById('admin-content');
  let pageList = [];
  await load();

  async function load() {
    const d = await apiCall('/api/admin/about-pages');
    if (!d) return;
    pageList = d.data || [];
    let h = '<div class="flex justify-between items-center mb-4">';
    h += '<span class="text-gray-500 text-sm">총 ' + pageList.length + '개 소개 페이지</span>';
    h += '<button onclick="showAboutForm()" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"><i class="fas fa-plus mr-1"></i>추가</button>';
    h += '</div>';
    h += '<div id="aboutFormArea" class="hidden mb-4"></div>';
    h += '<div class="space-y-2">';
    
    var defaultPages = [
      { slug: 'greeting', title: '인사말', icon: 'fa-handshake' },
      { slug: 'history', title: '연혁', icon: 'fa-clock-rotate-left' },
      { slug: 'business', title: '사업소개', icon: 'fa-briefcase' },
      { slug: 'location', title: '오시는길', icon: 'fa-location-dot' }
    ];
    
    // Show existing DB pages
    pageList.forEach(function(p) {
      var def = defaultPages.find(function(d) { return d.slug === p.slug; });
      var icon = def ? def.icon : 'fa-file-lines';
      h += '<div class="border rounded-lg p-4 flex items-center justify-between gap-4">';
      h += '<div class="flex items-center gap-3 min-w-0">';
      h += '<div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas ' + icon + ' text-blue-500"></i></div>';
      h += '<div class="min-w-0"><div class="font-medium">' + p.title + '</div>';
      h += '<div class="text-xs text-gray-400">/about/' + p.slug + ' | 순서: ' + p.sort_order + '</div></div></div>';
      h += '<div class="flex gap-2 shrink-0">';
      h += '<button onclick="editAbout(' + p.id + ')" class="text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50">수정</button>';
      h += '<button onclick="deleteAbout(' + p.id + ')" class="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">삭제</button>';
      h += '</div></div>';
    });
    
    // Show missing default pages that can be added
    var existingSlugs = pageList.map(function(p) { return p.slug; });
    defaultPages.forEach(function(dp) {
      if (existingSlugs.indexOf(dp.slug) === -1) {
        h += '<div class="border border-dashed rounded-lg p-4 flex items-center justify-between gap-4 bg-gray-50">';
        h += '<div class="flex items-center gap-3">';
        h += '<div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><i class="fas ' + dp.icon + ' text-gray-400"></i></div>';
        h += '<div><div class="text-gray-400">' + dp.title + '</div>';
        h += '<div class="text-xs text-gray-300">/about/' + dp.slug + ' (미등록)</div></div></div>';
        h += '<button onclick="createDefaultAbout(\'' + dp.slug + '\',\'' + dp.title + '\')" class="text-xs px-3 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600">생성</button>';
        h += '</div>';
      }
    });
    
    h += '</div>';
    c.innerHTML = h;
  }

  function aboutFormHtml(page) {
    var isEdit = !!page;
    return '<div class="border rounded-lg p-4 bg-gray-50">'
      + '<h4 class="font-medium mb-3">' + (isEdit ? '소개 페이지 수정' : '새 소개 페이지') + '</h4>'
      + '<div class="grid grid-cols-3 gap-3 mb-3">'
      + '<input id="abTitle" value="' + (page ? page.title.replace(/"/g, '&quot;') : '') + '" placeholder="제목 (예: 인사말)" class="px-3 py-2 border rounded-lg text-sm">'
      + '<input id="abSlug" value="' + (page ? page.slug : '') + '" placeholder="슬러그 (예: greeting)" class="px-3 py-2 border rounded-lg text-sm"' + (isEdit ? ' readonly style="background:#f3f4f6"' : '') + '>'
      + '<input id="abOrder" type="number" value="' + (page ? page.sort_order : 0) + '" placeholder="순서" class="px-3 py-2 border rounded-lg text-sm">'
      + '</div>'
      + '<textarea id="abContent" rows="12" placeholder="HTML 내용" class="w-full px-3 py-2 border rounded-lg text-sm mb-3 font-mono">' + (page ? page.content : '') + '</textarea>'
      + '<div class="flex gap-2">'
      + '<button onclick="saveAbout(' + (page ? page.id : 'null') + ')" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">저장</button>'
      + '<button onclick="document.getElementById(\'aboutFormArea\').classList.add(\'hidden\')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">취소</button>'
      + '</div></div>';
  }

  window.showAboutForm = function() {
    var a = document.getElementById('aboutFormArea');
    a.classList.remove('hidden');
    a.innerHTML = aboutFormHtml(null);
  };

  window.editAbout = function(id) {
    var page = pageList.find(function(p) { return p.id === id; });
    if (!page) return;
    var a = document.getElementById('aboutFormArea');
    a.classList.remove('hidden');
    a.innerHTML = aboutFormHtml(page);
    a.scrollIntoView({ behavior: 'smooth' });
  };

  window.saveAbout = async function(id) {
    var body = {
      title: document.getElementById('abTitle').value,
      slug: document.getElementById('abSlug').value,
      content: document.getElementById('abContent').value,
      sort_order: parseInt(document.getElementById('abOrder').value) || 0
    };
    if (id) await apiCall('/api/admin/about-pages/' + id, 'PUT', body);
    else await apiCall('/api/admin/about-pages', 'POST', body);
    document.getElementById('aboutFormArea').classList.add('hidden');
    await load();
  };

  window.deleteAbout = async function(id) {
    if (!confirm('이 소개 페이지를 삭제하시겠습니까?')) return;
    await apiCall('/api/admin/about-pages/' + id, 'DELETE');
    await load();
  };

  window.createDefaultAbout = async function(slug, title) {
    var defaultContent = {
      greeting: '<h2>인사말</h2><p>한국정보보안기술원(KOIST)을 방문해 주셔서 감사합니다.</p><p>저희 KOIST는 정보보호 제품의 시험·평가·인증 전문기관으로서, 국내 최고 수준의 평가 인력과 시험 환경을 갖추고 있습니다.</p><p>IT 보안제품의 보안성과 성능을 객관적이고 공정하게 평가하여 국내 정보보호 산업 발전에 기여하고 있으며, 앞으로도 최상의 시험·인증 서비스를 제공하기 위해 최선을 다하겠습니다.</p><p>감사합니다.</p><p class="mt-4 font-bold">(주)한국정보보안기술원 임직원 일동</p>',
      history: '<h2>KOIST 연혁</h2><div class="space-y-4"><div class="flex gap-4"><span class="font-bold text-accent w-20 shrink-0">2025</span><div>암호모듈 검증시험(KCMVP) 민간시험 기관 지정</div></div><div class="flex gap-4"><span class="font-bold text-accent w-20 shrink-0">2020</span><div>성능평가 시험 업무 확대</div></div><div class="flex gap-4"><span class="font-bold text-accent w-20 shrink-0">2015</span><div>CC평가기관 지정 (과학기술정보통신부)</div></div><div class="flex gap-4"><span class="font-bold text-accent w-20 shrink-0">2010</span><div>(주)한국정보보안기술원 설립</div></div></div>',
      business: '<h2>사업소개</h2><p>KOIST는 정보보호 분야의 종합 시험·평가·인증 서비스를 제공합니다.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"><div class="bg-blue-50 p-4 rounded-lg"><h3 class="font-bold text-blue-700">CC평가</h3><p class="text-sm text-blue-600 mt-1">국제 표준 기반 IT 보안제품 평가</p></div><div class="bg-purple-50 p-4 rounded-lg"><h3 class="font-bold text-purple-700">보안기능 시험</h3><p class="text-sm text-purple-600 mt-1">보안제품 기능 시험 및 인증</p></div><div class="bg-pink-50 p-4 rounded-lg"><h3 class="font-bold text-pink-700">KCMVP</h3><p class="text-sm text-pink-600 mt-1">암호모듈 검증시험</p></div><div class="bg-green-50 p-4 rounded-lg"><h3 class="font-bold text-green-700">성능평가</h3><p class="text-sm text-green-600 mt-1">보안제품 성능 객관적 평가</p></div></div>',
      location: '<h2>오시는길</h2><div class="bg-gray-50 p-6 rounded-xl mb-6"><div class="flex items-start gap-3 mb-3"><i class="fas fa-location-dot text-accent mt-1"></i><div><strong>주소</strong><br>서울특별시 서초구 효령로 336 윤일빌딩 4층 한국정보보안기술원</div></div><div class="flex items-start gap-3 mb-3"><i class="fas fa-phone text-accent mt-1"></i><div><strong>전화</strong><br>02-586-1230</div></div><div class="flex items-start gap-3"><i class="fas fa-envelope text-accent mt-1"></i><div><strong>이메일</strong><br>koist@koist.kr</div></div></div>'
    };
    var content = defaultContent[slug] || '<h2>' + title + '</h2><p>내용을 입력해주세요.</p>';
    var order = { greeting: 1, history: 2, business: 3, location: 4 };
    await apiCall('/api/admin/about-pages', 'POST', {
      title: title,
      slug: slug,
      content: content,
      sort_order: order[slug] || 0
    });
    await load();
  };
})();
