// KOIST Admin - Home Content Management Page
// v38.3 - Complete 1F/2F/3F text, image, video management

export function homeContentPage() {
  return `
  <h1 class="text-2xl font-bold text-gray-800 mb-2"><i class="fas fa-home text-blue-500 mr-2"></i>홈 콘텐츠 관리</h1>
  <p class="text-gray-500 text-sm mb-6">홈페이지 1층(탑바)~3층(히어로) 모든 텍스트, 이미지, 링크를 편집합니다.</p>

  <div id="loadingSpinner" class="text-center py-12"><i class="fas fa-spinner fa-spin text-blue-500 text-3xl"></i><p class="text-gray-500 mt-3">로딩 중...</p></div>
  <div id="contentArea" class="hidden space-y-6">

    <!-- ═══ 1F: Top Bar ═══ -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white flex items-center gap-2">
        <i class="fas fa-layer-group"></i>
        <span class="font-bold">1층: 탑바 (Top Bar)</span>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">KOLAS 마크 이미지 URL</label>
          <div class="flex gap-2">
            <input type="text" data-key="kolas_image_url" class="setting-input flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="/static/images/kolas.png">
            <img id="preview_kolas" src="" class="h-10 w-auto object-contain rounded border bg-gray-50" style="min-width:40px;">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">사이트 로고 URL</label>
          <div class="flex gap-2">
            <input type="text" data-key="logo_url" class="setting-input flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="빈값=텍스트 로고">
            <img id="preview_logo" src="" class="h-10 w-auto object-contain rounded border bg-gray-50" style="min-width:40px;">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">사이트 명칭</label>
          <input type="text" data-key="site_name" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="한국정보보안기술원">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">사이트 슬로건</label>
          <input type="text" data-key="site_slogan" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="KOIST">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
          <input type="text" data-key="phone" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="02-586-1230">
        </div>
      </div>
    </div>

    <!-- ═══ 2F: GNB ═══ -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-6 py-4 bg-gradient-to-r from-indigo-700 to-indigo-600 text-white flex items-center gap-2">
        <i class="fas fa-bars"></i>
        <span class="font-bold">2층: GNB 네비게이션</span>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">글자 크기 배율</label>
          <input type="text" data-key="gnb_font_scale" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="1.4">
          <p class="text-xs text-gray-400 mt-1">기본 1.4배</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">간격 비율</label>
          <input type="text" data-key="gnb_gap_scale" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="0.5">
          <p class="text-xs text-gray-400 mt-1">0.5 = 50% 축소</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">글자 두께</label>
          <input type="text" data-key="gnb_font_weight" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="600">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">글자 색상</label>
          <div class="flex gap-2 items-center">
            <input type="text" data-key="gnb_text_color" class="setting-input flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="rgba(220,228,240,0.92)">
            <input type="color" data-color-for="gnb_text_color" class="w-10 h-10 rounded cursor-pointer border" value="#DCE4F0">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">hover 색상</label>
          <div class="flex gap-2 items-center">
            <input type="text" data-key="gnb_hover_color" class="setting-input flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="#FFFFFF">
            <input type="color" data-color-for="gnb_hover_color" class="w-10 h-10 rounded cursor-pointer border" value="#FFFFFF">
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ 3F: Hero Section ═══ -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-6 py-4 bg-gradient-to-r from-blue-700 to-cyan-600 text-white flex items-center gap-2">
        <i class="fas fa-star"></i>
        <span class="font-bold">3층: 히어로 섹션</span>
      </div>
      <div class="p-6 space-y-6">

        <!-- Badge -->
        <div class="border-b pb-5">
          <h3 class="text-sm font-bold text-gray-600 mb-3 flex items-center gap-1"><i class="fas fa-certificate text-blue-400"></i> 배지 영역</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">배지 로고 URL</label>
              <div class="flex gap-2">
                <input type="text" data-key="hero_badge_logo_url" class="setting-input flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="/static/images/koist-circle-logo.png">
                <img id="preview_badge_logo" src="" class="h-10 w-10 object-contain rounded-full border bg-gray-50">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">배지 텍스트</label>
              <input type="text" data-key="hero_badge_text" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Korean Information Security Technology">
            </div>
          </div>
        </div>

        <!-- H1 Title -->
        <div class="border-b pb-5">
          <h3 class="text-sm font-bold text-gray-600 mb-3 flex items-center gap-1"><i class="fas fa-heading text-blue-400"></i> 메인 타이틀 (H1)</h3>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">H1 타이틀 (HTML 허용)</label>
            <textarea data-key="hero_line2" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows="2" placeholder="IT제품 보안성 평가·인증의 원스톱 서비스"></textarea>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="border-b pb-5">
          <h3 class="text-sm font-bold text-gray-600 mb-3 flex items-center gap-1"><i class="fas fa-mouse-pointer text-blue-400"></i> CTA 버튼</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
              <p class="font-semibold text-blue-700 text-xs uppercase tracking-wider">Primary 버튼</p>
              <div>
                <label class="block text-xs text-gray-600 mb-1">텍스트</label>
                <input type="text" data-key="hero_btn_primary" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="온라인 상담">
              </div>
              <div>
                <label class="block text-xs text-gray-600 mb-1">링크 URL</label>
                <input type="text" data-key="hero_btn_primary_url" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="/support/inquiry">
              </div>
              <div>
                <label class="block text-xs text-gray-600 mb-1">아이콘 (FontAwesome)</label>
                <input type="text" data-key="hero_btn_primary_icon" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="fa-paper-plane">
              </div>
            </div>
            <div class="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p class="font-semibold text-gray-600 text-xs uppercase tracking-wider">Secondary 버튼</p>
              <div>
                <label class="block text-xs text-gray-600 mb-1">텍스트</label>
                <input type="text" data-key="hero_btn_secondary" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="사업분야 보기">
              </div>
              <div>
                <label class="block text-xs text-gray-600 mb-1">링크 URL</label>
                <input type="text" data-key="hero_btn_secondary_url" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="#services">
              </div>
              <div>
                <label class="block text-xs text-gray-600 mb-1">아이콘 (FontAwesome)</label>
                <input type="text" data-key="hero_btn_secondary_icon" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="fa-th-large">
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Card -->
        <div class="border-b pb-5">
          <h3 class="text-sm font-bold text-gray-600 mb-3 flex items-center gap-1"><i class="fas fa-address-card text-blue-400"></i> 연락처 카드</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">카드 상단 라벨</label>
              <input type="text" data-key="hero_contact_label" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="국가 시험·인증 전문기관 정보보안 기술을 완성">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
              <input type="text" data-key="phone" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="02-586-1230">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">팩스</label>
              <input type="text" data-key="fax" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="02-586-1238">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input type="text" data-key="email" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="koist@koist.kr">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">주소</label>
              <input type="text" data-key="address" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="서울특별시 서초구...">
            </div>
          </div>
        </div>

        <!-- Simulator Panel -->
        <div>
          <h3 class="text-sm font-bold text-gray-600 mb-3 flex items-center gap-1"><i class="fas fa-sliders-h text-blue-400"></i> 시뮬레이터 패널</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">패널 타이틀 (HTML 허용)</label>
              <textarea data-key="unified_panel_title" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows="2"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">패널 부제</label>
              <input type="text" data-key="unified_panel_subtitle" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">기본 단축률(%)</label>
              <input type="text" data-key="unified_reduction_default" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="35">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">단축률 라벨</label>
              <input type="text" data-key="unified_reduction_label" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="평균 단축">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">탭 라벨 (전체평균)</label>
              <input type="text" data-key="sim_tab_overall" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="전체평균">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">탭 라벨 (EAL2/3/4)</label>
              <div class="grid grid-cols-3 gap-2">
                <input type="text" data-key="sim_tab_eal2" class="setting-input px-2 py-2 border border-gray-300 rounded-lg text-sm" placeholder="EAL2">
                <input type="text" data-key="sim_tab_eal3" class="setting-input px-2 py-2 border border-gray-300 rounded-lg text-sm" placeholder="EAL3">
                <input type="text" data-key="sim_tab_eal4" class="setting-input px-2 py-2 border border-gray-300 rounded-lg text-sm" placeholder="EAL4">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">사전준비 라벨</label>
              <input type="text" data-key="sim_label_prep" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="사전준비">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">슬라이더 레벨 (미흡/보통/양호/우수)</label>
              <div class="grid grid-cols-4 gap-2">
                <input type="text" data-key="sim_slider_level1" class="setting-input px-2 py-2 border border-gray-300 rounded-lg text-sm" placeholder="미흡">
                <input type="text" data-key="sim_slider_level2" class="setting-input px-2 py-2 border border-gray-300 rounded-lg text-sm" placeholder="보통">
                <input type="text" data-key="sim_slider_level3" class="setting-input px-2 py-2 border border-gray-300 rounded-lg text-sm" placeholder="양호">
                <input type="text" data-key="sim_slider_level4" class="setting-input px-2 py-2 border border-gray-300 rounded-lg text-sm" placeholder="우수">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">전통 평가 라벨</label>
              <input type="text" data-key="sim_label_traditional" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="CCRA평가일수">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">KOIST 프로세스 라벨</label>
              <input type="text" data-key="sim_label_koist" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="KOIST 평가 프로세스">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ Services / CTA Section ═══ -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-6 py-4 bg-gradient-to-r from-emerald-700 to-teal-600 text-white flex items-center gap-2">
        <i class="fas fa-briefcase"></i>
        <span class="font-bold">사업분야 & CTA 섹션</span>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">사업분야 섹션 제목</label>
          <input type="text" data-key="services_title" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="사업분야">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">사업분야 섹션 부제</label>
          <input type="text" data-key="services_subtitle" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="다양한 보안 서비스를 제공합니다">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">CTA 제목</label>
          <input type="text" data-key="cta_title" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="지금 바로 상담하세요">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">CTA 부제</label>
          <input type="text" data-key="cta_subtitle" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="전문 컨설팅">
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">CTA 설명</label>
          <textarea data-key="cta_description" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows="2" placeholder="국가 공인 시험·평가 기관의 전문 상담 서비스를 이용하세요."></textarea>
        </div>
      </div>
    </div>

    <!-- ═══ SEO / Analytics ═══ -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-6 py-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white flex items-center gap-2">
        <i class="fas fa-search"></i>
        <span class="font-bold">SEO & 분석</span>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">메타 설명</label>
          <textarea data-key="meta_description" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows="2"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">메타 키워드</label>
          <input type="text" data-key="meta_keywords" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">네이버 사이트 인증코드</label>
          <input type="text" data-key="naver_verification" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Google Analytics ID</label>
          <input type="text" data-key="google_analytics_id" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="G-XXXXXXXXXX">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Google Conversion ID</label>
          <input type="text" data-key="google_conversion_id" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="sticky bottom-4 flex justify-end">
      <button onclick="saveAllSettings()" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
        <i class="fas fa-save"></i> 전체 저장
      </button>
    </div>
  </div>

  <div id="toast" class="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl hidden z-50 flex items-center gap-2 transition-all">
    <i class="fas fa-check-circle"></i><span id="toastMsg"></span>
  </div>

  <script>
    let allSettings = {};

    async function loadSettings() {
      const res = await apiCall('/api/admin/settings');
      if (!res || !res.success) return;
      allSettings = {};
      res.data.forEach(s => { allSettings[s.key] = s.value; });

      document.querySelectorAll('.setting-input').forEach(el => {
        const key = el.dataset.key;
        if (key && allSettings[key] !== undefined) {
          el.value = allSettings[key];
        }
      });

      // Preview images
      const kolasUrl = allSettings['kolas_image_url'];
      if (kolasUrl) document.getElementById('preview_kolas').src = kolasUrl;
      const logoUrl = allSettings['logo_url'];
      if (logoUrl) document.getElementById('preview_logo').src = logoUrl;
      const badgeUrl = allSettings['hero_badge_logo_url'];
      if (badgeUrl) document.getElementById('preview_badge_logo').src = badgeUrl;

      // Sync color pickers
      document.querySelectorAll('[data-color-for]').forEach(picker => {
        const key = picker.dataset.colorFor;
        const val = allSettings[key];
        if (val && val.startsWith('#')) picker.value = val;
      });

      document.getElementById('loadingSpinner').classList.add('hidden');
      document.getElementById('contentArea').classList.remove('hidden');
    }

    // Color picker sync
    document.querySelectorAll('[data-color-for]').forEach(picker => {
      picker.addEventListener('input', (e) => {
        const key = e.target.dataset.colorFor;
        const input = document.querySelector('[data-key="' + key + '"]');
        if (input) input.value = e.target.value;
      });
    });

    // Image preview on URL change
    document.querySelectorAll('.setting-input').forEach(el => {
      el.addEventListener('change', () => {
        const key = el.dataset.key;
        if (key === 'kolas_image_url') document.getElementById('preview_kolas').src = el.value;
        if (key === 'logo_url') document.getElementById('preview_logo').src = el.value;
        if (key === 'hero_badge_logo_url') document.getElementById('preview_badge_logo').src = el.value;
      });
    });

    async function saveAllSettings() {
      const inputs = document.querySelectorAll('.setting-input');
      let saved = 0, errors = 0;
      for (const el of inputs) {
        const key = el.dataset.key;
        if (!key) continue;
        const newVal = el.value;
        if (allSettings[key] === newVal) continue; // Skip unchanged
        const res = await apiCall('/api/admin/settings/' + key, 'PUT', { value: newVal });
        if (res && res.success) { saved++; allSettings[key] = newVal; }
        else errors++;
      }
      showToast(errors === 0 ? saved + '개 항목 저장 완료!' : saved + '개 저장, ' + errors + '개 오류');
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      document.getElementById('toastMsg').textContent = msg;
      t.classList.remove('hidden');
      setTimeout(() => t.classList.add('hidden'), 3000);
    }

    loadSettings();
  </script>
  `;
}
