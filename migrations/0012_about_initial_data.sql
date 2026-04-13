-- KOIST About 페이지 초기 데이터 마이그레이션 (v27.1)
-- 인사말, 연혁, 사업소개, 오시는길 4개 페이지 DB 초기화
-- 관리자 모드에서 편집 가능

-- 1. 인사말
INSERT OR IGNORE INTO about_pages (title, slug, content, sort_order) VALUES (
  '인사말',
  'greeting',
  '<div class="about-greeting">
    <div class="flex flex-col md:flex-row gap-8 items-start mb-8">
      <div class="flex-1">
        <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
          <i class="fas fa-handshake"></i> CEO 인사말
        </div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6" style="line-height:1.4;">
          정보보안의 <span class="text-blue-600">신뢰할 수 있는 파트너</span>,<br>
          한국정보보안기술원입니다.
        </h2>
        <div class="space-y-4 text-gray-600 leading-relaxed">
          <p>한국정보보안기술원(KOIST)을 방문해 주셔서 진심으로 감사드립니다.</p>
          <p>저희 KOIST는 <strong class="text-gray-800">정보보호 제품의 시험·평가·인증 전문기관</strong>으로서, 국내 최고 수준의 평가 인력과 시험 환경을 갖추고 국가 정보보호 역량 강화에 기여하고 있습니다.</p>
          <p>IT 보안제품의 보안성과 성능을 <strong class="text-gray-800">객관적이고 공정하게</strong> 평가하여 국내 정보보호 산업 발전에 기여하고 있으며, CC평가, 보안기능 시험, 암호모듈 검증(KCMVP), 성능평가 등 다양한 분야에서 전문 서비스를 제공합니다.</p>
          <p>앞으로도 <strong class="text-gray-800">최상의 시험·인증 서비스</strong>를 제공하여 고객 여러분의 성공적인 인증 획득을 지원하겠습니다.</p>
          <p>감사합니다.</p>
        </div>
        <div class="mt-8 pt-6 border-t border-gray-200">
          <p class="text-lg font-bold text-gray-900">(주)한국정보보안기술원</p>
          <p class="text-gray-500 text-sm mt-1">임직원 일동</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
      <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
        <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
          <i class="fas fa-shield-halved text-blue-600"></i>
        </div>
        <h4 class="font-bold text-gray-800 mb-1">공정한 평가</h4>
        <p class="text-sm text-gray-500">국제 표준에 부합하는 객관적이고 공정한 시험·평가 서비스</p>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
        <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
          <i class="fas fa-users text-purple-600"></i>
        </div>
        <h4 class="font-bold text-gray-800 mb-1">전문 인력</h4>
        <p class="text-sm text-gray-500">최고 수준의 보안 평가 전문 인력과 시험 인프라 보유</p>
      </div>
      <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
        <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
          <i class="fas fa-rocket text-emerald-600"></i>
        </div>
        <h4 class="font-bold text-gray-800 mb-1">원스톱 서비스</h4>
        <p class="text-sm text-gray-500">사전 컨설팅부터 인증 취득까지 원스톱 지원 체계</p>
      </div>
    </div>
  </div>',
  1
);

-- 2. 연혁
INSERT OR IGNORE INTO about_pages (title, slug, content, sort_order) VALUES (
  '연혁',
  'history',
  '<div class="about-history">
    <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
      <i class="fas fa-clock-rotate-left"></i> KOIST 연혁
    </div>
    <h2 class="text-2xl font-bold text-gray-900 mb-8">한국정보보안기술원의 <span class="text-blue-600">발자취</span></h2>

    <div class="relative pl-8 border-l-2 border-blue-200 space-y-8">
      <div class="relative">
        <div class="absolute -left-[2.55rem] w-5 h-5 rounded-full bg-blue-600 border-4 border-blue-100"></div>
        <div class="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <span class="text-blue-600 font-black text-lg">2025</span>
          <ul class="mt-2 space-y-1 text-gray-600 text-sm">
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-blue-500 text-xs"></i> 암호모듈 검증시험(KCMVP) 민간 시험기관 지정</li>
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-blue-500 text-xs"></i> 정보보호 컨설팅 사업 확대</li>
          </ul>
        </div>
      </div>
      <div class="relative">
        <div class="absolute -left-[2.55rem] w-5 h-5 rounded-full bg-cyan-500 border-4 border-cyan-100"></div>
        <div class="bg-cyan-50 rounded-xl p-5 border border-cyan-100">
          <span class="text-cyan-600 font-black text-lg">2020</span>
          <ul class="mt-2 space-y-1 text-gray-600 text-sm">
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-cyan-500 text-xs"></i> 보안기능 시험 업무 개시</li>
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-cyan-500 text-xs"></i> 성능평가 시험 업무 확대</li>
          </ul>
        </div>
      </div>
      <div class="relative">
        <div class="absolute -left-[2.55rem] w-5 h-5 rounded-full bg-purple-500 border-4 border-purple-100"></div>
        <div class="bg-purple-50 rounded-xl p-5 border border-purple-100">
          <span class="text-purple-600 font-black text-lg">2015</span>
          <ul class="mt-2 space-y-1 text-gray-600 text-sm">
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-purple-500 text-xs"></i> CC평가기관 지정 (과학기술정보통신부)</li>
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-purple-500 text-xs"></i> 국제공통평가기준(CC) 평가 업무 개시</li>
          </ul>
        </div>
      </div>
      <div class="relative">
        <div class="absolute -left-[2.55rem] w-5 h-5 rounded-full bg-emerald-500 border-4 border-emerald-100"></div>
        <div class="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
          <span class="text-emerald-600 font-black text-lg">2010</span>
          <ul class="mt-2 space-y-1 text-gray-600 text-sm">
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-emerald-500 text-xs"></i> <strong>(주)한국정보보안기술원 설립</strong></li>
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-emerald-500 text-xs"></i> 정보보호 시험·평가 사업 시작</li>
          </ul>
        </div>
      </div>
    </div>
  </div>',
  2
);

-- 3. 사업소개
INSERT OR IGNORE INTO about_pages (title, slug, content, sort_order) VALUES (
  '사업소개',
  'business',
  '<div class="about-business">
    <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
      <i class="fas fa-briefcase"></i> 사업소개
    </div>
    <h2 class="text-2xl font-bold text-gray-900 mb-4">정보보호 분야의 <span class="text-blue-600">종합 시험·평가·인증</span> 서비스</h2>
    <p class="text-gray-500 mb-8 max-w-2xl">KOIST는 정보보안 시험·인증의 모든 분야를 전문적으로 수행하는 종합 평가기관입니다.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div class="bg-gradient-to-br from-blue-50 to-blue-100/30 p-6 rounded-xl border border-blue-200/50 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><i class="fas fa-shield-halved text-blue-600"></i></div>
          <h3 class="font-bold text-gray-800 text-lg">CC평가</h3>
        </div>
        <p class="text-sm text-gray-600">국제공통평가기준(CC)에 따른 IT 보안제품의 보안성을 평가하여 국제적으로 인정받는 인증을 취득하는 서비스입니다. EAL2~EAL4 등급의 평가를 수행합니다.</p>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-purple-100/30 p-6 rounded-xl border border-purple-200/50 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center"><i class="fas fa-file-shield text-purple-600"></i></div>
          <h3 class="font-bold text-gray-800 text-lg">보안기능 시험</h3>
        </div>
        <p class="text-sm text-gray-600">정보보호제품의 보안기능을 시험하여 공공기관 도입을 위한 객관적인 제품 검증을 제공합니다. 국가정보원 보안적합성 검증 지원 시험을 수행합니다.</p>
      </div>
      <div class="bg-gradient-to-br from-pink-50 to-pink-100/30 p-6 rounded-xl border border-pink-200/50 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center"><i class="fas fa-lock text-pink-600"></i></div>
          <h3 class="font-bold text-gray-800 text-lg">암호모듈 검증(KCMVP)</h3>
        </div>
        <p class="text-sm text-gray-600">국가정보원이 시행하는 암호모듈 검증제도(KCMVP)에 따라 암호모듈의 안전성과 구현 적합성을 시험하는 민간 시험기관 서비스입니다.</p>
      </div>
      <div class="bg-gradient-to-br from-amber-50 to-amber-100/30 p-6 rounded-xl border border-amber-200/50 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><i class="fas fa-gauge-high text-amber-600"></i></div>
          <h3 class="font-bold text-gray-800 text-lg">성능평가</h3>
        </div>
        <p class="text-sm text-gray-600">기준에 따른 정보보호제품의 성능을 객관적으로 검증하는 평가 서비스입니다. R&D 지원시험, AI 성능시험, 대외 성능시험 등을 수행합니다.</p>
      </div>
    </div>

    <div class="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
      <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2"><i class="fas fa-list-check text-blue-500"></i> 추가 서비스</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div class="flex items-center gap-2 text-sm text-gray-600"><i class="fas fa-file-signature text-teal-500"></i> 시험성적서 발급</div>
        <div class="flex items-center gap-2 text-sm text-gray-600"><i class="fas fa-search text-red-500"></i> 정보보안진단</div>
        <div class="flex items-center gap-2 text-sm text-gray-600"><i class="fas fa-comments text-indigo-500"></i> 보안 컨설팅</div>
        <div class="flex items-center gap-2 text-sm text-gray-600"><i class="fas fa-building text-emerald-500"></i> 산업(기업)보안 컨설팅</div>
        <div class="flex items-center gap-2 text-sm text-gray-600"><i class="fas fa-clipboard-check text-cyan-500"></i> 정보보호준비도 평가</div>
        <div class="flex items-center gap-2 text-sm text-gray-600"><i class="fas fa-bullseye text-orange-500"></i> 모의평가</div>
      </div>
    </div>
  </div>',
  3
);

-- 4. 오시는길 (Google Maps iframe 포함)
INSERT OR IGNORE INTO about_pages (title, slug, content, sort_order) VALUES (
  '오시는길',
  'location',
  '<div class="about-location">
    <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
      <i class="fas fa-location-dot"></i> 오시는길
    </div>
    <h2 class="text-2xl font-bold text-gray-900 mb-8">한국정보보안기술원 <span class="text-blue-600">찾아오시는길</span></h2>

    <!-- 지도 영역 -->
    <div class="rounded-xl overflow-hidden border border-gray-200 mb-8" style="box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5!2d127.0155!3d37.4835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1589ce76f03%3A0x18820a42b0c1506!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCDtmKjroLnroZwgMzM2!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
        width="100%"
        height="400"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
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
              <div class="text-sm text-gray-500">서울특별시 서초구 효령로 336 윤일빌딩 4층<br>한국정보보안기술원</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <i class="fas fa-phone text-emerald-500 mt-1 w-4 text-center"></i>
            <div>
              <div class="text-sm font-medium text-gray-800">전화</div>
              <div class="text-sm text-gray-500">02-586-1230</div>
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
              <div class="text-sm text-gray-500">koist@koist.kr</div>
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
            <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">M</div>
            <div>
              <div class="text-sm font-medium text-gray-800">지하철</div>
              <div class="text-sm text-gray-500">서울 2호선·3호선 <strong>교대역</strong> 14번 출구<br>도보 약 10분</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"><i class="fas fa-bus text-xs"></i></div>
            <div>
              <div class="text-sm font-medium text-gray-800">버스</div>
              <div class="text-sm text-gray-500">서초구청·효령로 방면 하차<br>간선·지선 다수 운행</div>
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
  </div>',
  4
);
