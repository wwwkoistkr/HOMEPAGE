-- v39.9: about/history 페이지 - koist.kr/intro/history 원본 복제 + 기존 2020/2025 보존
-- 원본: http://www.koist.kr/intro/history  (2022, 2021, 2018, 2016, 2014, 2013)
-- 기존 유지: 2025, 2020 (현 홈페이지 내용 그대로)
-- 최종 타임라인(내림차순): 2025 → 2022 → 2021 → 2020 → 2018 → 2016 → 2014 → 2013

UPDATE about_pages SET content = '<div class="about-history">
    <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
      <i class="fas fa-clock-rotate-left"></i> KOIST 연혁
    </div>
    <h2 class="text-2xl font-bold text-gray-900 mb-3">한국정보보안기술원의 <span class="text-blue-600">발자취</span></h2>
    <p class="text-gray-500 text-sm mb-8">최고의 서비스를 위한 도전, 한국정보보안기술원이 걸어온 길</p>

    <div class="relative pl-8 border-l-2 border-blue-200 space-y-8">
      <!-- 2025 (기존 유지) -->
      <div class="relative">
        <div class="absolute -left-[2.55rem] w-5 h-5 rounded-full bg-blue-600 border-4 border-blue-100"></div>
        <div class="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <span class="text-blue-600 font-black text-lg">2025</span>
          <ul class="mt-2 space-y-1 text-gray-700 text-sm font-semibold">
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-blue-500 text-xs"></i> 암호모듈 검증시험(KCMVP) 민간 시험기관 지정</li>
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-blue-500 text-xs"></i> 정보보호 컨설팅 사업 확대</li>
          </ul>
        </div>
      </div>

      <!-- 2022 (원본 추가) -->
      <div class="relative">
        <div class="absolute -left-[2.55rem] w-5 h-5 rounded-full bg-indigo-500 border-4 border-indigo-100"></div>
        <div class="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
          <span class="text-indigo-600 font-black text-lg">2022</span>
          <ul class="mt-2 space-y-1 text-gray-700 text-sm font-semibold">
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-indigo-500 text-xs"></i> 벤처기업인증</li>
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-indigo-500 text-xs"></i> 신속확인제 발급 기관 지정</li>
          </ul>
        </div>
      </div>

      <!-- 2021 (원본 추가) -->
      <div class="relative">
        <div class="absolute -left-[2.55rem] w-5 h-5 rounded-full bg-sky-500 border-4 border-sky-100"></div>
        <div class="bg-sky-50 rounded-xl p-5 border border-sky-100">
          <span class="text-sky-600 font-black text-lg">2021</span>
          <ul class="mt-2 space-y-1 text-gray-700 text-sm font-semibold">
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-sky-500 text-xs"></i> 보안기능 시험 간소화 기관 지정</li>
          </ul>
        </div>
      </div>

      <!-- 2020 (기존 유지) -->
      <div class="relative">
        <div class="absolute -left-[2.55rem] w-5 h-5 rounded-full bg-cyan-500 border-4 border-cyan-100"></div>
        <div class="bg-cyan-50 rounded-xl p-5 border border-cyan-100">
          <span class="text-cyan-600 font-black text-lg">2020</span>
          <ul class="mt-2 space-y-1 text-gray-700 text-sm font-semibold">
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-cyan-500 text-xs"></i> 보안기능 시험 업무 개시</li>
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-cyan-500 text-xs"></i> 성능평가 시험 업무 확대</li>
          </ul>
        </div>
      </div>

      <!-- 2018 (원본 추가) -->
      <div class="relative">
        <div class="absolute -left-[2.55rem] w-5 h-5 rounded-full bg-teal-500 border-4 border-teal-100"></div>
        <div class="bg-teal-50 rounded-xl p-5 border border-teal-100">
          <span class="text-teal-600 font-black text-lg">2018</span>
          <ul class="mt-2 space-y-1 text-gray-700 text-sm font-semibold">
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-teal-500 text-xs"></i> 정보보호제품 성능평가기관 승인</li>
          </ul>
        </div>
      </div>

      <!-- 2016 (원본 추가) -->
      <div class="relative">
        <div class="absolute -left-[2.55rem] w-5 h-5 rounded-full bg-purple-500 border-4 border-purple-100"></div>
        <div class="bg-purple-50 rounded-xl p-5 border border-purple-100">
          <span class="text-purple-600 font-black text-lg">2016</span>
          <ul class="mt-2 space-y-1 text-gray-700 text-sm font-semibold">
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-purple-500 text-xs"></i> 정보보호 준비도 평가기관 승인</li>
          </ul>
        </div>
      </div>

      <!-- 2014 (원본 추가) -->
      <div class="relative">
        <div class="absolute -left-[2.55rem] w-5 h-5 rounded-full bg-amber-500 border-4 border-amber-100"></div>
        <div class="bg-amber-50 rounded-xl p-5 border border-amber-100">
          <span class="text-amber-600 font-black text-lg">2014</span>
          <ul class="mt-2 space-y-1 text-gray-700 text-sm font-semibold">
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-amber-500 text-xs"></i> 국제공인시험기관 인정(KOLAS)</li>
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-amber-500 text-xs"></i> 정보보호제품 평가기관 승인</li>
          </ul>
        </div>
      </div>

      <!-- 2013 (원본 추가) -->
      <div class="relative">
        <div class="absolute -left-[2.55rem] w-5 h-5 rounded-full bg-emerald-500 border-4 border-emerald-100"></div>
        <div class="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
          <span class="text-emerald-600 font-black text-lg">2013</span>
          <ul class="mt-2 space-y-1 text-gray-700 text-sm font-semibold">
            <li class="flex items-center gap-2"><i class="fas fa-check-circle text-emerald-500 text-xs"></i> <strong>㈜한국정보보안기술원 설립</strong></li>
          </ul>
        </div>
      </div>
    </div>
  </div>'
WHERE slug = 'history';
