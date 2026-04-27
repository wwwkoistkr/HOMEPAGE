-- v39.22: koist.kr 의 시험절차 아이콘 등 이미지를 10개 서비스 페이지에 복사
-- 이미지는 R2(secure-icons-X.png 가 아닌 legacy-icons/ prefix)에 이미 업로드됨
-- 각 페이지 콘텐츠 끝에 새 섹션을 append (기존 콘텐츠 보존)
-- 작업 기준 ID:
--   11=performance/overview, 14=certificate/overview, 15=certificate/rnd,
--   16=certificate/ai, 17=certificate/network, 19=diagnosis/ddos (mock-test 리다이렉트 대상),
--   23=consulting/cc, 24=consulting/kcmvp, 25=consulting/isms-p, 27=readiness/overview

-- ============================================================
-- 작업 1: /services/performance/overview - 성능평가 가능제품 이미지 (p50_img.png)
-- ============================================================
UPDATE dep_pages 
SET content = content || '
<section class="legacy-image-section" data-aos="fade-up" style="margin-top:3rem; padding:2rem; background:#f8fafc; border-radius:1rem; text-align:center;">
  <h3 class="legacy-image-title" style="font-size:1.25rem; font-weight:700; color:#1e293b; margin-bottom:1.5rem;">정보보호제품 성능평가</h3>
  <img src="/api/images/legacy-icons/p50_img.png" alt="정보보호제품 성능평가" style="max-width:100%; height:auto; display:inline-block;">
</section>'
WHERE id = 11;

-- ============================================================
-- 작업 2: /services/certificate/overview - KOLAS + 시험절차 4단계
-- ============================================================
UPDATE dep_pages 
SET content = content || '
<section class="legacy-image-section" data-aos="fade-up" style="margin-top:3rem; padding:2rem; background:#f8fafc; border-radius:1rem;">
  <div style="text-align:center; margin-bottom:2rem;">
    <img src="/api/images/legacy-icons/kolas.png" alt="KOLAS 국제공인시험기관" style="max-width:402px; width:100%; height:auto; display:inline-block;">
    <p style="margin-top:1rem; color:#475569; font-size:0.95rem;">한국정보보안기술원은 국제 표준(ISO/IEC 17025)에 따라 한국인정기구(KOLAS)로부터 국제공인시험기관으로 인정</p>
  </div>
  <h3 style="font-size:1.25rem; font-weight:700; color:#1e293b; margin:2rem 0 1.5rem; text-align:center;">시험 절차</h3>
  <div class="legacy-steps" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1.5rem; max-width:900px; margin:0 auto;">
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step1.png" alt="시험 준비" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 01</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">시험 준비</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 02</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">신청 및 계약</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 03</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">시험 수행</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step4.png" alt="성적서 발행" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 04</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">성적서 발행</div>
    </div>
  </div>
</section>'
WHERE id = 14;

-- ============================================================
-- 작업 3: /services/certificate/rnd - 시험절차 4단계 아이콘
-- ============================================================
UPDATE dep_pages 
SET content = content || '
<section class="legacy-image-section" data-aos="fade-up" style="margin-top:3rem; padding:2rem; background:#f8fafc; border-radius:1rem;">
  <h3 style="font-size:1.25rem; font-weight:700; color:#1e293b; margin-bottom:1.5rem; text-align:center;">시험 절차</h3>
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1.5rem; max-width:900px; margin:0 auto;">
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step1.png" alt="시험 준비" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 01</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">시험 준비</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 02</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">신청 및 계약</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 03</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">시험 수행</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step4.png" alt="성적서 발행" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 04</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">성적서 발행</div>
    </div>
  </div>
</section>'
WHERE id = 15;

-- ============================================================
-- 작업 4: /services/certificate/ai - 시험절차 4단계 아이콘
-- ============================================================
UPDATE dep_pages 
SET content = content || '
<section class="legacy-image-section" data-aos="fade-up" style="margin-top:3rem; padding:2rem; background:#f8fafc; border-radius:1rem;">
  <h3 style="font-size:1.25rem; font-weight:700; color:#1e293b; margin-bottom:1.5rem; text-align:center;">시험 절차</h3>
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1.5rem; max-width:900px; margin:0 auto;">
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step1.png" alt="시험 준비" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 01</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">시험 준비</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 02</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">신청 및 계약</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 03</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">시험 수행</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step4.png" alt="성적서 발행" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 04</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">성적서 발행</div>
    </div>
  </div>
</section>'
WHERE id = 16;

-- ============================================================
-- 작업 5: /services/certificate/network - 시험절차 4단계 (마지막은 시험 결과서)
-- ============================================================
UPDATE dep_pages 
SET content = content || '
<section class="legacy-image-section" data-aos="fade-up" style="margin-top:3rem; padding:2rem; background:#f8fafc; border-radius:1rem;">
  <h3 style="font-size:1.25rem; font-weight:700; color:#1e293b; margin-bottom:1.5rem; text-align:center;">시험 절차</h3>
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1.5rem; max-width:900px; margin:0 auto;">
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step1.png" alt="시험 준비" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 01</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">시험 준비</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 02</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">신청 및 계약</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 03</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">시험 수행</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step4.png" alt="시험 결과서" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 04</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">시험 결과서</div>
    </div>
  </div>
</section>'
WHERE id = 17;

-- ============================================================
-- 작업 6: /services/readiness/overview - 평가 등급(p54_ctf) + 평가 기준 5개 아이콘
-- ============================================================
UPDATE dep_pages 
SET content = content || '
<section class="legacy-image-section" data-aos="fade-up" style="margin-top:3rem; padding:2rem; background:#f8fafc; border-radius:1rem;">
  <div style="text-align:center; margin-bottom:2.5rem;">
    <h3 style="font-size:1.25rem; font-weight:700; color:#1e293b; margin-bottom:1rem;">평가 등급</h3>
    <img src="/api/images/legacy-icons/p54_ctf.png" alt="평가 등급" style="max-width:191px; width:100%; height:auto; display:inline-block;">
  </div>
  <h3 style="font-size:1.25rem; font-weight:700; color:#1e293b; margin-bottom:1.5rem; text-align:center;">평가 기준</h3>
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:1.25rem; max-width:1000px; margin:0 auto;">
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p55_icon1.png" alt="기준1" style="height:80px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="font-weight:600; color:#1e293b;">관리적 보호조치</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p55_icon2.png" alt="기준2" style="height:80px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="font-weight:600; color:#1e293b;">기술적 보호조치</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p55_icon3.png" alt="기준3" style="height:80px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="font-weight:600; color:#1e293b;">물리적 보호조치</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p55_icon4.png" alt="기준4" style="height:80px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="font-weight:600; color:#1e293b;">개인정보보호</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p55_icon5.png" alt="기준5" style="height:80px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="font-weight:600; color:#1e293b;">정보보호 대응</div>
    </div>
  </div>
</section>'
WHERE id = 27;

-- ============================================================
-- 작업 7: /services/diagnosis/ddos (= /services/mock-test/overview 리다이렉트 대상) - 훈련절차 3단계
-- 원본 koist.kr/test4/page02 에서 p48_step2~4 만 사용 (step1 없음)
-- ============================================================
UPDATE dep_pages 
SET content = content || '
<section class="legacy-image-section" data-aos="fade-up" style="margin-top:3rem; padding:2rem; background:#f8fafc; border-radius:1rem;">
  <h3 style="font-size:1.25rem; font-weight:700; color:#1e293b; margin-bottom:1.5rem; text-align:center;">훈련 절차</h3>
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1.5rem; max-width:800px; margin:0 auto;">
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step2.png" alt="훈련 준비" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 01</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">신청 및 계약</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step3.png" alt="훈련 수행" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 02</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">훈련 수행</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step4.png" alt="결과 보고" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 03</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">결과 보고</div>
    </div>
  </div>
</section>'
WHERE id = 19;

-- ============================================================
-- 작업 8: /services/consulting/cc - 수행절차 4단계 아이콘
-- ============================================================
UPDATE dep_pages 
SET content = content || '
<section class="legacy-image-section" data-aos="fade-up" style="margin-top:3rem; padding:2rem; background:#f8fafc; border-radius:1rem;">
  <h3 style="font-size:1.25rem; font-weight:700; color:#1e293b; margin-bottom:1.5rem; text-align:center;">수행 절차</h3>
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1.5rem; max-width:900px; margin:0 auto;">
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step1.png" alt="사전 검토" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 01</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">사전 검토</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step2.png" alt="계약 체결" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 02</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">계약 체결</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step3.png" alt="컨설팅 수행" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 03</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">컨설팅 수행</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step4.png" alt="결과 보고" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 04</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">결과 보고</div>
    </div>
  </div>
</section>'
WHERE id = 23;

-- ============================================================
-- 작업 9: /services/consulting/kcmvp - 시험절차 4단계 아이콘
-- ============================================================
UPDATE dep_pages 
SET content = content || '
<section class="legacy-image-section" data-aos="fade-up" style="margin-top:3rem; padding:2rem; background:#f8fafc; border-radius:1rem;">
  <h3 style="font-size:1.25rem; font-weight:700; color:#1e293b; margin-bottom:1.5rem; text-align:center;">시험 절차</h3>
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1.5rem; max-width:900px; margin:0 auto;">
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step1.png" alt="사전 검토" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 01</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">사전 검토</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 02</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">신청 및 계약</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 03</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">시험 수행</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step4.png" alt="결과 보고" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 04</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">결과 보고</div>
    </div>
  </div>
</section>'
WHERE id = 24;

-- ============================================================
-- 작업 10: /services/consulting/isms-p - 컨설팅 단계별 진행 4단계
-- ============================================================
UPDATE dep_pages 
SET content = content || '
<section class="legacy-image-section" data-aos="fade-up" style="margin-top:3rem; padding:2rem; background:#f8fafc; border-radius:1rem;">
  <h3 style="font-size:1.25rem; font-weight:700; color:#1e293b; margin-bottom:1.5rem; text-align:center;">컨설팅 단계별 진행</h3>
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1.5rem; max-width:900px; margin:0 auto;">
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step1.png" alt="현황 분석" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 01</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">현황 분석</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step2.png" alt="개선 계획" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 02</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">개선 계획</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step3.png" alt="이행 점검" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 03</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">이행 점검</div>
    </div>
    <div style="text-align:center; padding:1.5rem 1rem; background:#fff; border-radius:0.75rem; border:1px solid #e2e8f0;">
      <img src="/api/images/legacy-icons/p48_step4.png" alt="인증 지원" style="height:60px; width:auto; margin:0 auto 0.75rem; display:block;">
      <div style="color:#64748b; font-size:0.85rem;">step 04</div>
      <div style="font-weight:600; color:#1e293b; margin-top:0.25rem;">인증 지원</div>
    </div>
  </div>
</section>'
WHERE id = 25;
