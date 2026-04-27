-- v39.22: 10개 서비스 페이지에 koist.kr 원본 이미지 섹션 추가
-- 안전 원칙: 기존 content 보존 + 새 섹션 append (||  연산자)
-- 중복 실행 방지: data-koist-block-v3922 마커 체크

-- Page ID 11
UPDATE dep_pages
SET content = content || '\n<!-- KOIST-LEGACY-IMAGES-v39.22 -->\n<section class="service-section koist-legacy-block" data-koist-block="section" data-aos="fade-up" style="margin-top: 2rem;">
  <h3 class="service-section-title">정보보호제품 성능평가 (KOIST 원본 이미지)</h3>
  <div class="service-section-body" style="text-align:center;">
    <img src="/api/images/legacy-icons/p50_img.png" alt="정보보호제품 성능평가" loading="lazy" style="max-width:100%;height:auto;">
  </div>
</section>'
WHERE id = 11 AND content NOT LIKE '%KOIST-LEGACY-IMAGES-v39.22%';

-- Page ID 14
UPDATE dep_pages
SET content = content || '\n<!-- KOIST-LEGACY-IMAGES-v39.22 -->\n<section class="service-section koist-legacy-block" data-koist-block="section" data-aos="fade-up" style="margin-top: 2rem;">
  <h3 class="service-section-title">KOLAS 공인시험기관</h3>
  <div class="service-section-body" style="text-align:center;">
    <img src="/api/images/legacy-icons/kolas.png" alt="KOLAS 공인시험기관" loading="lazy" style="max-width:402px;height:auto;">
    <p style="margin-top:0.8rem;color:#475569;font-size:0.95rem;">한국정보보안기술원은 국제 표준(ISO/IEC 17025)에 따라 한국인정기구(KOLAS)로부터 국제공인시험기관으로 인정</p>
  </div>
</section>
<section class="service-section koist-legacy-block" data-koist-block="section" data-aos="fade-up" style="margin-top: 2rem;">
  <h3 class="service-section-title">시험 절차 (KOIST 표준)</h3>
  <div class="service-section-body">
    <ul class="process">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="시험 준비" loading="lazy" style="width:auto;height:60px;"><span>step 01</span><p>시험 준비</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" loading="lazy" style="width:auto;height:60px;"><span>step 02</span><p>신청 및 계약</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" loading="lazy" style="width:auto;height:60px;"><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="성적서 발행" loading="lazy" style="width:auto;height:60px;"><span>step 04</span><p>성적서 발행</p></li>
    </ul>
  </div>
</section>'
WHERE id = 14 AND content NOT LIKE '%KOIST-LEGACY-IMAGES-v39.22%';

-- Page ID 15
UPDATE dep_pages
SET content = content || '\n<!-- KOIST-LEGACY-IMAGES-v39.22 -->\n<section class="service-section koist-legacy-block" data-koist-block="section" data-aos="fade-up" style="margin-top: 2rem;">
  <h3 class="service-section-title">시험 절차 (KOIST 표준)</h3>
  <div class="service-section-body">
    <ul class="process">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="시험 준비" loading="lazy" style="width:auto;height:60px;"><span>step 01</span><p>시험 준비</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" loading="lazy" style="width:auto;height:60px;"><span>step 02</span><p>신청 및 계약</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" loading="lazy" style="width:auto;height:60px;"><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="성적서 발행" loading="lazy" style="width:auto;height:60px;"><span>step 04</span><p>성적서 발행</p></li>
    </ul>
  </div>
</section>'
WHERE id = 15 AND content NOT LIKE '%KOIST-LEGACY-IMAGES-v39.22%';

-- Page ID 16
UPDATE dep_pages
SET content = content || '\n<!-- KOIST-LEGACY-IMAGES-v39.22 -->\n<section class="service-section koist-legacy-block" data-koist-block="section" data-aos="fade-up" style="margin-top: 2rem;">
  <h3 class="service-section-title">시험 절차 (KOIST 표준)</h3>
  <div class="service-section-body">
    <ul class="process">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="시험 준비" loading="lazy" style="width:auto;height:60px;"><span>step 01</span><p>시험 준비</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" loading="lazy" style="width:auto;height:60px;"><span>step 02</span><p>신청 및 계약</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" loading="lazy" style="width:auto;height:60px;"><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="성적서 발행" loading="lazy" style="width:auto;height:60px;"><span>step 04</span><p>성적서 발행</p></li>
    </ul>
  </div>
</section>'
WHERE id = 16 AND content NOT LIKE '%KOIST-LEGACY-IMAGES-v39.22%';

-- Page ID 17
UPDATE dep_pages
SET content = content || '\n<!-- KOIST-LEGACY-IMAGES-v39.22 -->\n<section class="service-section koist-legacy-block" data-koist-block="section" data-aos="fade-up" style="margin-top: 2rem;">
  <h3 class="service-section-title">시험 절차 (KOIST 표준)</h3>
  <div class="service-section-body">
    <ul class="process">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="시험 준비" loading="lazy" style="width:auto;height:60px;"><span>step 01</span><p>시험 준비</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" loading="lazy" style="width:auto;height:60px;"><span>step 02</span><p>신청 및 계약</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" loading="lazy" style="width:auto;height:60px;"><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="시험 결과서" loading="lazy" style="width:auto;height:60px;"><span>step 04</span><p>시험 결과서</p></li>
    </ul>
  </div>
</section>'
WHERE id = 17 AND content NOT LIKE '%KOIST-LEGACY-IMAGES-v39.22%';

-- Page ID 19
UPDATE dep_pages
SET content = content || '\n<!-- KOIST-LEGACY-IMAGES-v39.22 -->\n<section class="service-section koist-legacy-block" data-koist-block="section" data-aos="fade-up" style="margin-top: 2rem;">
  <h3 class="service-section-title">훈련 절차 (KOIST 표준)</h3>
  <div class="service-section-body">
    <ul class="process">
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="모의훈련 신청" loading="lazy" style="width:auto;height:60px;"><span>step 01</span><p>모의훈련 신청</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="모의훈련 수행" loading="lazy" style="width:auto;height:60px;"><span>step 02</span><p>모의훈련 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="훈련 결과보고서" loading="lazy" style="width:auto;height:60px;"><span>step 03</span><p>훈련 결과보고서</p></li>
    </ul>
  </div>
</section>'
WHERE id = 19 AND content NOT LIKE '%KOIST-LEGACY-IMAGES-v39.22%';

-- Page ID 23
UPDATE dep_pages
SET content = content || '\n<!-- KOIST-LEGACY-IMAGES-v39.22 -->\n<section class="service-section koist-legacy-block" data-koist-block="section" data-aos="fade-up" style="margin-top: 2rem;">
  <h3 class="service-section-title">수행 절차 (KOIST 표준)</h3>
  <div class="service-section-body">
    <ul class="process">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="착수" loading="lazy" style="width:auto;height:60px;"><span>step 01</span><p>착수</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="분석" loading="lazy" style="width:auto;height:60px;"><span>step 02</span><p>분석</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="수행" loading="lazy" style="width:auto;height:60px;"><span>step 03</span><p>수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="완료" loading="lazy" style="width:auto;height:60px;"><span>step 04</span><p>완료</p></li>
    </ul>
  </div>
</section>'
WHERE id = 23 AND content NOT LIKE '%KOIST-LEGACY-IMAGES-v39.22%';

-- Page ID 24
UPDATE dep_pages
SET content = content || '\n<!-- KOIST-LEGACY-IMAGES-v39.22 -->\n<section class="service-section koist-legacy-block" data-koist-block="section" data-aos="fade-up" style="margin-top: 2rem;">
  <h3 class="service-section-title">시험 절차 (KOIST 표준)</h3>
  <div class="service-section-body">
    <ul class="process">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="시험 준비" loading="lazy" style="width:auto;height:60px;"><span>step 01</span><p>시험 준비</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" loading="lazy" style="width:auto;height:60px;"><span>step 02</span><p>신청 및 계약</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" loading="lazy" style="width:auto;height:60px;"><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="성적서 발행" loading="lazy" style="width:auto;height:60px;"><span>step 04</span><p>성적서 발행</p></li>
    </ul>
  </div>
</section>'
WHERE id = 24 AND content NOT LIKE '%KOIST-LEGACY-IMAGES-v39.22%';

-- Page ID 25
UPDATE dep_pages
SET content = content || '\n<!-- KOIST-LEGACY-IMAGES-v39.22 -->\n<section class="service-section koist-legacy-block" data-koist-block="section" data-aos="fade-up" style="margin-top: 2rem;">
  <h3 class="service-section-title">컨설팅 단계별 진행 내용 (KOIST 표준)</h3>
  <div class="service-section-body">
    <ul class="process">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="착수 및 진단" loading="lazy" style="width:auto;height:60px;"><span>step 01</span><p>착수 및 진단</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="분석 및 설계" loading="lazy" style="width:auto;height:60px;"><span>step 02</span><p>분석 및 설계</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="구현 및 운영" loading="lazy" style="width:auto;height:60px;"><span>step 03</span><p>구현 및 운영</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="심사 대응" loading="lazy" style="width:auto;height:60px;"><span>step 04</span><p>심사 대응</p></li>
    </ul>
  </div>
</section>'
WHERE id = 25 AND content NOT LIKE '%KOIST-LEGACY-IMAGES-v39.22%';

-- Page ID 27
UPDATE dep_pages
SET content = content || '\n<!-- KOIST-LEGACY-IMAGES-v39.22 -->\n<section class="service-section koist-legacy-block" data-koist-block="section" data-aos="fade-up" style="margin-top: 2rem;">
  <h3 class="service-section-title">평가 등급 (KOIST 원본)</h3>
  <div class="service-section-body" style="text-align:center;">
    <img src="/api/images/legacy-icons/p54_ctf.png" alt="평가 등급" loading="lazy" style="max-width:200px;height:auto;">
  </div>
</section>
<section class="service-section koist-legacy-block" data-koist-block="section" data-aos="fade-up" style="margin-top: 2rem;">
  <h3 class="service-section-title">평가 기준 선택 항목</h3>
  <div class="service-section-body">
    <ul class="process" style="display:flex;flex-wrap:wrap;justify-content:center;gap:2rem;">
      <li style="text-align:center;list-style:none;"><img src="/api/images/legacy-icons/p55_icon1.png" alt="기준1" loading="lazy" style="width:auto;height:90px;"></li>
      <li style="text-align:center;list-style:none;"><img src="/api/images/legacy-icons/p55_icon2.png" alt="기준2" loading="lazy" style="width:auto;height:90px;"></li>
      <li style="text-align:center;list-style:none;"><img src="/api/images/legacy-icons/p55_icon3.png" alt="기준3" loading="lazy" style="width:auto;height:90px;"></li>
      <li style="text-align:center;list-style:none;"><img src="/api/images/legacy-icons/p55_icon4.png" alt="기준4" loading="lazy" style="width:auto;height:90px;"></li>
      <li style="text-align:center;list-style:none;"><img src="/api/images/legacy-icons/p55_icon5.png" alt="기준5" loading="lazy" style="width:auto;height:90px;"></li>
    </ul>
  </div>
</section>'
WHERE id = 27 AND content NOT LIKE '%KOIST-LEGACY-IMAGES-v39.22%';

