-- Migration 0013: 오시는길 지도 API 업그레이드
-- Google Maps Embed (무료, API 키 불필요) + 카카오/네이버 네비게이션 링크
-- 주소: 서울특별시 서초구 효령로 336 윤일빌딩 4층 한국정보보안기술원
-- 가까운 역: 남부터미널역 3번 출구 도보 5분

UPDATE about_pages SET content = '<div class="about-location">
    <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
      <i class="fas fa-location-dot"></i> 오시는길
    </div>
    <h2 class="text-2xl font-bold text-gray-900 mb-8">한국정보보안기술원 <span class="text-blue-600">찾아오시는길</span></h2>

    <!-- 지도 영역 (Google Maps Embed - 무료, API 키 불필요) -->
    <div class="rounded-xl overflow-hidden border border-gray-200 mb-4" style="box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1583.0!2d127.0163!3d37.4844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca159a78efb13%3A0x0!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCDtmKjroLnroZwgMzM2!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
        width="100%"
        height="420"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

    <!-- 네비게이션 버튼 -->
    <div class="flex flex-wrap gap-2 mb-8">
      <a href="https://map.kakao.com/link/to/한국정보보안기술원,37.4844,127.0163" target="_blank" rel="noopener" class="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors shadow-sm">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.5 3 2 6.58 2 11c0 2.83 1.82 5.32 4.56 6.73l-.96 3.57c-.05.19.02.4.18.51.09.07.2.11.31.11.08 0 .17-.02.24-.07L10.44 19c.51.06 1.03.1 1.56.1 5.5 0 10-3.58 10-8S17.5 3 12 3z"/></svg>
        카카오맵 길찾기
      </a>
      <a href="https://map.naver.com/v5/search/서울특별시 서초구 효령로 336" target="_blank" rel="noopener" class="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors shadow-sm">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/></svg>
        네이버지도
      </a>
      <a href="https://www.google.com/maps/search/서울특별시+서초구+효령로+336" target="_blank" rel="noopener" class="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors shadow-sm border border-gray-200">
        <i class="fab fa-google text-blue-500"></i>
        Google Maps
      </a>
    </div>

    <!-- 연락처 정보 카드 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 주소 정보 -->
      <div class="bg-white rounded-xl p-6 border border-gray-100" style="box-shadow: 0 2px 12px rgba(0,0,0,0.04);">
        <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><i class="fas fa-building text-blue-600 text-sm"></i></div>
          회사 정보
        </h3>
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <i class="fas fa-location-dot text-blue-500 mt-1 w-4 text-center"></i>
            <div>
              <div class="text-sm font-medium text-gray-800">주소</div>
              <div class="text-sm text-gray-500">서울특별시 서초구 효령로 336 윤일빌딩 4층<br>한국정보보안기술원(KOIST)</div>
              <div class="text-xs text-gray-400 mt-1">(우) 06720</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <i class="fas fa-phone text-emerald-500 mt-1 w-4 text-center"></i>
            <div>
              <div class="text-sm font-medium text-gray-800">대표전화</div>
              <a href="tel:02-586-1230" class="text-sm text-blue-600 hover:underline">02-586-1230</a>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <i class="fas fa-fax text-purple-500 mt-1 w-4 text-center"></i>
            <div>
              <div class="text-sm font-medium text-gray-800">팩스</div>
              <div class="text-sm text-gray-500">02-586-1238</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <i class="fas fa-envelope text-cyan-500 mt-1 w-4 text-center"></i>
            <div>
              <div class="text-sm font-medium text-gray-800">이메일</div>
              <a href="mailto:koist@koist.kr" class="text-sm text-blue-600 hover:underline">koist@koist.kr</a>
            </div>
          </div>
        </div>
      </div>

      <!-- 교통편 안내 -->
      <div class="bg-white rounded-xl p-6 border border-gray-100" style="box-shadow: 0 2px 12px rgba(0,0,0,0.04);">
        <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><i class="fas fa-route text-emerald-600 text-sm"></i></div>
          교통편 안내
        </h3>
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
            <div>
              <div class="text-sm font-medium text-gray-800">지하철 3호선</div>
              <div class="text-sm text-gray-500"><strong>남부터미널역</strong> 3번 출구<br>도보 약 5분</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
            <div>
              <div class="text-sm font-medium text-gray-800">지하철 2호선·3호선</div>
              <div class="text-sm text-gray-500"><strong>교대역</strong> 14번 출구<br>도보 약 10분</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"><i class="fas fa-bus text-xs"></i></div>
            <div>
              <div class="text-sm font-medium text-gray-800">버스</div>
              <div class="text-sm text-gray-500">남부터미널역 3번 출구에서 버스로 2분<br>정류장: 국제전자센터 ↔ 서일초등학교<br><span class="text-xs text-blue-500">지선 4319, 지선 서초08 외</span></div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-gray-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"><i class="fas fa-car text-xs"></i></div>
            <div>
              <div class="text-sm font-medium text-gray-800">자가용</div>
              <div class="text-sm text-gray-500">윤일빌딩 지하 주차장 이용 가능<br>방문 시 사전 연락 부탁드립니다</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 운영시간 안내 -->
    <div class="mt-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-5 border border-slate-200">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><i class="fas fa-clock text-blue-600 text-sm"></i></div>
          <div>
            <div class="text-sm font-bold text-gray-800">업무시간</div>
            <div class="text-sm text-gray-500">평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)</div>
          </div>
        </div>
        <div class="flex items-center gap-2 text-sm text-red-500 font-medium">
          <i class="fas fa-calendar-xmark"></i> 주말·공휴일 휴무
        </div>
      </div>
    </div>
  </div>'
WHERE slug = 'location';
