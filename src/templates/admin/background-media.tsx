// KOIST Admin - Background & Media Management Page
// v38.3 - Gradient color picker, video URL, poster images

export function backgroundMediaPage() {
  return `
  <h1 class="text-2xl font-bold text-gray-800 mb-2"><i class="fas fa-palette text-purple-500 mr-2"></i>배경 & 미디어 관리</h1>
  <p class="text-gray-500 text-sm mb-6">히어로 그라디언트 색상, 배경 이미지, 비디오, 포스터를 관리합니다.</p>

  <div id="loadingSpinner" class="text-center py-12"><i class="fas fa-spinner fa-spin text-purple-500 text-3xl"></i><p class="text-gray-500 mt-3">로딩 중...</p></div>
  <div id="contentArea" class="hidden space-y-6">

    <!-- ═══ Hero Gradient Colors ═══ -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-6 py-4 bg-gradient-to-r from-violet-700 to-purple-600 text-white flex items-center gap-2">
        <i class="fas fa-fill-drip"></i>
        <span class="font-bold">히어로 그라디언트 배경 색상</span>
      </div>
      <div class="p-6">
        <div class="mb-4">
          <div id="gradientPreview" class="w-full h-24 rounded-xl border shadow-inner" style="background: linear-gradient(135deg, #070B14 0%, #0A1128 25%, #0F1E3D 45%, #162D5A 70%, #1A3A6E 100%);"></div>
          <p class="text-xs text-gray-400 mt-2 text-center">실시간 미리보기 (135deg, 5단계 그라디언트)</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div class="text-center">
            <label class="block text-xs font-medium text-gray-600 mb-2">색상 1 (0%)</label>
            <input type="color" data-gradient="1" class="gradient-picker w-full h-14 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-purple-400 transition-colors" value="#070B14">
            <input type="text" data-key="hero_gradient_color1" class="setting-input w-full mt-2 px-2 py-1 border border-gray-300 rounded-lg text-xs text-center font-mono" value="#070B14">
          </div>
          <div class="text-center">
            <label class="block text-xs font-medium text-gray-600 mb-2">색상 2 (25%)</label>
            <input type="color" data-gradient="2" class="gradient-picker w-full h-14 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-purple-400 transition-colors" value="#0A1128">
            <input type="text" data-key="hero_gradient_color2" class="setting-input w-full mt-2 px-2 py-1 border border-gray-300 rounded-lg text-xs text-center font-mono" value="#0A1128">
          </div>
          <div class="text-center">
            <label class="block text-xs font-medium text-gray-600 mb-2">색상 3 (45%)</label>
            <input type="color" data-gradient="3" class="gradient-picker w-full h-14 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-purple-400 transition-colors" value="#0F1E3D">
            <input type="text" data-key="hero_gradient_color3" class="setting-input w-full mt-2 px-2 py-1 border border-gray-300 rounded-lg text-xs text-center font-mono" value="#0F1E3D">
          </div>
          <div class="text-center">
            <label class="block text-xs font-medium text-gray-600 mb-2">색상 4 (70%)</label>
            <input type="color" data-gradient="4" class="gradient-picker w-full h-14 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-purple-400 transition-colors" value="#162D5A">
            <input type="text" data-key="hero_gradient_color4" class="setting-input w-full mt-2 px-2 py-1 border border-gray-300 rounded-lg text-xs text-center font-mono" value="#162D5A">
          </div>
          <div class="text-center">
            <label class="block text-xs font-medium text-gray-600 mb-2">색상 5 (100%)</label>
            <input type="color" data-gradient="5" class="gradient-picker w-full h-14 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-purple-400 transition-colors" value="#1A3A6E">
            <input type="text" data-key="hero_gradient_color5" class="setting-input w-full mt-2 px-2 py-1 border border-gray-300 rounded-lg text-xs text-center font-mono" value="#1A3A6E">
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ Hero Background Image ═══ -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-6 py-4 bg-gradient-to-r from-sky-700 to-blue-600 text-white flex items-center gap-2">
        <i class="fas fa-image"></i>
        <span class="font-bold">배경 이미지</span>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">히어로 배경 이미지 URL</label>
          <input type="text" data-key="hero_bg_url" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="비어있으면 그라디언트 사용">
          <p class="text-xs text-gray-400 mt-1">이미지 관리에서 업로드한 URL 붙여넣기</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">히어로 오버레이 투명도</label>
          <div class="flex gap-3 items-center">
            <input type="range" data-key="hero_overlay_opacity" class="setting-input flex-1" min="0" max="1" step="0.05" value="0.85">
            <span id="opacityValue" class="text-sm font-mono bg-gray-100 px-2 py-1 rounded">0.85</span>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">CTA 섹션 배경 이미지</label>
          <input type="text" data-key="cta_bg_url" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="비어있으면 기본 그라디언트">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">푸터 배경 이미지</label>
          <input type="text" data-key="footer_bg_url" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="비어있으면 기본 배경">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">GNB 배경 이미지</label>
          <input type="text" data-key="gnb_bg_url" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="비어있으면 기본 배경">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">서브페이지 헤더 배경</label>
          <input type="text" data-key="page_header_bg_url" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="비어있으면 기본 배경">
        </div>
      </div>
    </div>

    <!-- ═══ Hero Video ═══ -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-6 py-4 bg-gradient-to-r from-rose-700 to-pink-600 text-white flex items-center gap-2">
        <i class="fas fa-video"></i>
        <span class="font-bold">히어로 비디오</span>
      </div>
      <div class="p-6 space-y-5">
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800 text-sm">
          <i class="fas fa-info-circle mr-1"></i>
          비디오 URL을 설정하면 배경 이미지/그라디언트 대신 비디오가 표시됩니다. 비우면 이미지/그라디언트로 돌아갑니다.
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">비디오 URL #1 (MP4)</label>
            <input type="text" data-key="hero_video_url" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="이미지 관리에서 업로드한 MP4 URL">
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">비디오 URL #2 (MP4) <span class="text-xs text-blue-600">— 입력 시 #1과 번갈아 재생</span></label>
            <input type="text" data-key="hero_video_url_2" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="비어있으면 #1만 반복 재생 (원본 koist.kr 스타일: 2개 영상 교대 재생)">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">비디오 오버레이 투명도</label>
            <div class="flex gap-3 items-center">
              <input type="range" data-key="hero_video_opacity" class="setting-input flex-1" min="0" max="1" step="0.05" value="0.65">
              <span id="videoOpacityValue" class="text-sm font-mono bg-gray-100 px-2 py-1 rounded">0.65</span>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">비디오 포스터 (기본)</label>
            <input type="text" data-key="hero_video_poster" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="비디오 로딩 전 표시 이미지">
          </div>
        </div>

        <div class="border-t pt-5">
          <h3 class="text-sm font-bold text-gray-600 mb-3"><i class="fas fa-mobile-alt text-pink-400 mr-1"></i> 반응형 포스터 (해상도별)</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">4K 포스터 (3840px+)</label>
              <input type="text" data-key="hero_video_poster_4k" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="3840x2160 WebP 권장">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">FHD 포스터 (1920px)</label>
              <input type="text" data-key="hero_video_poster_fhd" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="1920x1080 WebP 권장">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">모바일 포스터 (768px-)</label>
              <input type="text" data-key="hero_video_poster_mobile" class="setting-input w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="1080p WebP 권장">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ Theme Colors ═══ -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-600 text-white flex items-center gap-2">
        <i class="fas fa-brush"></i>
        <span class="font-bold">테마 색상</span>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">탑바 배경 색상</label>
          <div class="flex gap-2 items-center">
            <input type="text" data-key="topbar_bg_color" class="setting-input flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="빈값=기본 그라디언트">
            <input type="color" data-color-for="topbar_bg_color" class="w-10 h-10 rounded cursor-pointer border" value="#0F172A">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">GNB 바 배경 색상</label>
          <div class="flex gap-2 items-center">
            <input type="text" data-key="gnb_bar_bg_color" class="setting-input flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="빈값=기본 그라디언트">
            <input type="color" data-color-for="gnb_bar_bg_color" class="w-10 h-10 rounded cursor-pointer border" value="#1E293B">
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="sticky bottom-4 flex justify-end">
      <button onclick="saveAllSettings()" class="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
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
        if (key && allSettings[key] !== undefined && allSettings[key] !== '') {
          el.value = allSettings[key];
        }
      });

      // Sync gradient color pickers
      for (let i = 1; i <= 5; i++) {
        const key = 'hero_gradient_color' + i;
        const val = allSettings[key];
        if (val) {
          const picker = document.querySelector('[data-gradient="' + i + '"]');
          if (picker) picker.value = val;
        }
      }

      // Sync theme color pickers
      document.querySelectorAll('[data-color-for]').forEach(picker => {
        const key = picker.dataset.colorFor;
        const val = allSettings[key];
        if (val && val.startsWith('#')) picker.value = val;
      });

      // Opacity display
      updateOpacityDisplay();
      updateVideoOpacityDisplay();
      updateGradientPreview();

      document.getElementById('loadingSpinner').classList.add('hidden');
      document.getElementById('contentArea').classList.remove('hidden');
    }

    // Gradient color picker sync
    document.querySelectorAll('.gradient-picker').forEach(picker => {
      picker.addEventListener('input', (e) => {
        const idx = e.target.dataset.gradient;
        const key = 'hero_gradient_color' + idx;
        const input = document.querySelector('[data-key="' + key + '"]');
        if (input) input.value = e.target.value;
        updateGradientPreview();
      });
    });

    // Text input -> color picker sync
    document.querySelectorAll('[data-key^="hero_gradient_color"]').forEach(input => {
      input.addEventListener('input', () => {
        const idx = input.dataset.key.replace('hero_gradient_color', '');
        const picker = document.querySelector('[data-gradient="' + idx + '"]');
        if (picker && input.value.match(/^#[0-9a-fA-F]{6}$/)) {
          picker.value = input.value;
        }
        updateGradientPreview();
      });
    });

    // Theme color picker sync
    document.querySelectorAll('[data-color-for]').forEach(picker => {
      picker.addEventListener('input', (e) => {
        const key = e.target.dataset.colorFor;
        const input = document.querySelector('[data-key="' + key + '"]');
        if (input) input.value = e.target.value;
      });
    });

    function updateGradientPreview() {
      const colors = [];
      const stops = [0, 25, 45, 70, 100];
      for (let i = 1; i <= 5; i++) {
        const input = document.querySelector('[data-key="hero_gradient_color' + i + '"]');
        colors.push((input ? input.value : '#000') + ' ' + stops[i - 1] + '%');
      }
      document.getElementById('gradientPreview').style.background =
        'linear-gradient(135deg, ' + colors.join(', ') + ')';
    }

    function updateOpacityDisplay() {
      const el = document.querySelector('[data-key="hero_overlay_opacity"]');
      if (el) document.getElementById('opacityValue').textContent = parseFloat(el.value).toFixed(2);
    }

    function updateVideoOpacityDisplay() {
      const el = document.querySelector('[data-key="hero_video_opacity"]');
      if (el) document.getElementById('videoOpacityValue').textContent = parseFloat(el.value).toFixed(2);
    }

    // Opacity slider events
    document.querySelector('[data-key="hero_overlay_opacity"]')?.addEventListener('input', updateOpacityDisplay);
    document.querySelector('[data-key="hero_video_opacity"]')?.addEventListener('input', updateVideoOpacityDisplay);

    async function saveAllSettings() {
      const inputs = document.querySelectorAll('.setting-input');
      let saved = 0, errors = 0;
      for (const el of inputs) {
        const key = el.dataset.key;
        if (!key) continue;
        const newVal = el.value;
        if (allSettings[key] === newVal) continue;
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
