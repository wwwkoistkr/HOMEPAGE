-- v39.23: page 18, 27 (/services/diagnosis/readiness, /services/readiness/overview)
-- p40 깨진 이미지 6개 처리 (각 페이지)
-- 처리 전략:
--   1. p40_img.png (figure) - 단순 제거
--   2. p40_select1~5.png (icon cards) - FontAwesome 아이콘으로 대체
-- 멱등 마커: <!-- KOIST-P40-FIX-v39.23 -->
-- koist.kr 원본도 모두 404 (R2 업로드 불가능)

-- Page 18
UPDATE dep_pages SET content = '<!-- KOIST-P40-FIX-v39.23 -->
<p class="hero-intro" data-aos="fade-up">안전한 정보통신 이용환경 조성을 위해, 정보통신망 이용자의 정보보호 준비 수준을 평가하여 등급을 부여하는 제도로, 과학기술정보통신부가 평가기관을 지정(2016년 4월)</p>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">도입 배경</h3>
  <div class="service-section-body">
    <ul class="service-bullets"><li>국가·공공기관·중소기업에 특화된 종합적인 정보보호 수준 제고 및 정보보호 사각지대 최소화 지원</li></ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">관련 근거</h3>
  <div class="service-section-body">
    <ul class="service-bullets"><li>정보보호산업의 진흥에 관한 법률 제12조(정보보호 준비도 평가 지원)</li></ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">평가 대상</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li><strong>조직의 정보보호 수준에 대한 공인된 평가를 희망하는 기관</strong>
        <br />- 국가 공공기관, 대기업, 비영리법인(협회, 재단 등)
        <br />- 공공기관 산하기관, 대기업 협력업체 등 중소 영세업체
        <br />- 기업 및 금융·병원·학교·물류업체 등 개인정보 처리 기관</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">평가 등급</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li><strong>평가대상의 정보보호 인프라 수준 및 활동에 따라 5단계 평가등급</strong>
        <br />- 신청기관은 획득점수 순서에 따라 ‘AAA &gt; AA &gt; A &gt; BB &gt; B’ 부여
        <br />- 신청기관 선택에 따라 개인정보보호지표 만족 시, 인증마크에 ‘P’ 부여</li>
    </ul>
    <ul class="koist-grade-cards">
      <li><span class="grade-badge">AAA</span><span class="grade-score">100~90점</span><span class="grade-desc">최적의 보안관리 활동 수행</span></li>
      <li><span class="grade-badge">AA</span><span class="grade-score">89~80점</span><span class="grade-desc">체계적인 보안관리 활동 수행</span></li>
      <li><span class="grade-badge">A</span><span class="grade-score">79~60점</span><span class="grade-desc">(기업 및 기관 상황에) 요구되는 보안관리 활동 수행</span></li>
      <li><span class="grade-badge">BB</span><span class="grade-score">59~40점</span><span class="grade-desc">(기업 및 기관 상황에) 적정한 보안관리 활동 수행</span></li>
      <li><span class="grade-badge">B</span><span class="grade-score">39~23점</span><span class="grade-desc">기본적인 보안관리 활동 수행</span></li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">맞춤형 가이드</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li><strong>사전점검 활동을 통한 신청기관 맞춤형 보안가이드 제공</strong>
        <br />- 신청기관 IT 환경에 따른 보안 요구사항 도출·분석
        <br />- 정보보호활동에 대한 심층 진단 (관계기관 점검가이드)
        <br />- 다양한 공공기관에 대한 평가 경험 활용</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">평가 기준</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li><strong>필수항목 및 선택항목 등 총 118개 항목으로 평가기준 구성</strong>
        <br />- 필수 항목 : 기반지표, 활동지표
        <br />- 선택 항목 : 개인정보보호지표</li>
    </ul>
    <h4 style="margin:18px 0 10px 0;font-size:17px;font-weight:800;color:#111;">필수항목</h4>
    <ul class="koist-indicator-grid">
      <li><strong>기반지표</strong><ul><li>정보보호 리더십</li><li>정보보호 자원관리</li></ul></li>
      <li><strong>활동지표</strong><ul><li>관리적 정보보호 활동</li><li>물리적 정보보호 활동</li><li>기술적 정보보호 활동</li></ul></li>
    </ul>
    <h4 style="margin:18px 0 10px 0;font-size:17px;font-weight:800;color:#111;">선택항목</h4>
    <ul class="koist-icon-cards">
      <li><i class="fas fa-user-shield" aria-hidden="true" style="font-size:42px;color:#10B981;display:inline-block;width:60px;height:60px;line-height:60px;text-align:center;background:rgba(255,255,255,0.6);border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.06);"></i><span>개인정보 보호</span></li>
      <li><i class="fas fa-coins" aria-hidden="true" style="font-size:42px;color:#F59E0B;display:inline-block;width:60px;height:60px;line-height:60px;text-align:center;background:rgba(255,255,255,0.6);border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.06);"></i><span>금융분야</span></li>
      <li><i class="fas fa-heart-pulse" aria-hidden="true" style="font-size:42px;color:#EF4444;display:inline-block;width:60px;height:60px;line-height:60px;text-align:center;background:rgba(255,255,255,0.6);border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.06);"></i><span>의료분야</span></li>
      <li><i class="fas fa-graduation-cap" aria-hidden="true" style="font-size:42px;color:#3B82F6;display:inline-block;width:60px;height:60px;line-height:60px;text-align:center;background:rgba(255,255,255,0.6);border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.06);"></i><span>교육분야</span></li>
      <li><i class="fas fa-industry" aria-hidden="true" style="font-size:42px;color:#6366F1;display:inline-block;width:60px;height:60px;line-height:60px;text-align:center;background:rgba(255,255,255,0.6);border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.06);"></i><span>기타 산업별 요구사항</span></li>
    </ul>
    <table class="koist-data-table" summary="평가 기준 주요 내용">
      <thead><tr><th scope="col">구분</th><th scope="col">주요 내용</th></tr></thead>
      <tbody>
        <tr><td class="cat">기반지표</td><td>정보보호 정책·경영·의사결정 구조(리더십)와 보안투자 및 인력·조직 등 필수적인 보안 인프라(자원관리)를 평가</td></tr>
        <tr><td class="cat">활동지표</td><td>관리적·물리적·기술적 정보보호조치 현황 및 체계적인 보안활동 수행 여부를 평가</td></tr>
        <tr><td class="cat">선택지표<br />(개인정보보호)</td><td>「개인정보보호법」 및 「정보통신망법」에서 규정하는 개인정보보호 필수항목에 대한 준수 여부를 평가</td></tr>
      </tbody>
    </table>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">세부 평가지표</h3>
  <div class="service-section-body">
    <ul class="service-bullets"><li><strong>기반지표 (30점), 활동지표 (70점), 개인정보보호지표 (118개 항목)</strong></li></ul>
    <table class="koist-data-table" summary="세부 평가지표">
      <thead><tr><th scope="col">지표</th><th scope="col">구분</th><th scope="col">평가지표(점수)</th></tr></thead>
      <tbody>
        <tr><td class="cat" rowspan="2">기반지표</td><td class="subcat">1. 정보보호 리더십</td><td>정보보호 최고책임자(CISO) 지정(5), 정보보호 의사소통 및 정보제공(5), 정보보호 운영방침(4)</td></tr>
        <tr><td class="subcat">2. 정보보호 자원관리</td><td>정보보호 추진계획(4), 정보보호 인력 및 조직(4), 정보보호 예산 수립 및 집행(4), 정보보호 이행점검(4)</td></tr>
        <tr><td class="cat" rowspan="3">활동지표</td><td class="subcat">1. 관리적 보호활동</td><td>정보보호 교육 수행(5), 자산관리(4), 인적보안(4), 외부자 보안(5)</td></tr>
        <tr><td class="subcat">2. 물리적 보호활동</td><td>정보통신시설의 환경 보안(4), 정보통신시설의 출입 관리(4), 사무실 보안(4)</td></tr>
        <tr><td class="subcat">3. 기술적 보호활동</td><td>취약점 점검(5), 정보보호 사고탐지 및 대응(5), 시스템 개발 보안(4), 네트워크 보안(4), 정보시스템 및 응용프로그램 인증(5), 자료유출 방지(4), 시스템 및 서비스 운영 보안(5), 백업 및 IT재해복구(4), PC 및 모바일기기 보안(4)</td></tr>
        <tr><td class="cat">선택지표</td><td class="subcat">개인정보보호</td><td>개인정보 최소수집, 개인정보 수집 고지 및 동의획득, 개인정보취급방침, 이용자 권리 보호, 개인정보의 관리적 보호조치, 개인정보의 기술적 보호조치, 개인정보 파기(P)</td></tr>
      </tbody>
    </table>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">문의 및 상담</h3>
  <div class="service-section-body">
    <div class="contact-card">
      <span class="contact-name">정보보호 준비도평가 담당</span>
      <span class="contact-tel">070-4236-9200</span>
      <span class="contact-mail">secu-star@koist.kr</span>
    </div>
  </div>
</section>', updated_at = CURRENT_TIMESTAMP WHERE id = 18 AND content NOT LIKE '%KOIST-P40-FIX-v39.23%';

-- Page 27
UPDATE dep_pages SET content = '<!-- KOIST-P40-FIX-v39.23 -->
<p class="hero-intro" data-aos="fade-up" style="text-align: center;">안전한 정보통신 이용환경 조성을 위해, 정보통신망 이용자의 정보보호 준비 수준을 평가하여 등급을 부여하는 제도로, 과학기술정보통신부가 평가기관을 지정(2016년 4월)</p><p class="hero-intro" data-aos="fade-up" style="text-align: center;"><br></p>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">도입 배경</h3>
  <div class="service-section-body">
    <ul class="service-bullets"><li>국가·공공기관·중소기업에 특화된 종합적인 정보보호 수준 제고 및 정보보호 사각지대 최소화 지원</li></ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">관련 근거</h3>
  <div class="service-section-body">
    <ul class="service-bullets"><li>정보보호산업의 진흥에 관한 법률 제12조(정보보호 준비도 평가 지원)</li></ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">평가 대상</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li><strong>조직의 정보보호 수준에 대한 공인된 평가를 희망하는 기관</strong>
        <br>- 국가 공공기관, 대기업, 비영리법인(협회, 재단 등)
        <br>- 공공기관 산하기관, 대기업 협력업체 등 중소 영세업체
        <br>- 기업 및 금융·병원·학교·물류업체 등 개인정보 처리 기관</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">평가 등급</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li><strong>평가대상의 정보보호 인프라 수준 및 활동에 따라 5단계 평가등급</strong>
        <br>- 신청기관은 획득점수 순서에 따라 ‘AAA &gt; AA &gt; A &gt; BB &gt; B’ 부여
        <br>- 신청기관 선택에 따라 개인정보보호지표 만족 시, 인증마크에 ‘P’ 부여</li>
    </ul>
    <ul class="koist-grade-cards">
      <li><span class="grade-badge">AAA</span><span class="grade-score">100~90점</span><span class="grade-desc">최적의 보안관리 활동 수행</span></li>
      <li><span class="grade-badge">AA</span><span class="grade-score">89~80점</span><span class="grade-desc">체계적인 보안관리 활동 수행</span></li>
      <li><span class="grade-badge">A</span><span class="grade-score">79~60점</span><span class="grade-desc">(기업 및 기관 상황에) 요구되는 보안관리 활동 수행</span></li>
      <li><span class="grade-badge">BB</span><span class="grade-score">59~40점</span><span class="grade-desc">(기업 및 기관 상황에) 적정한 보안관리 활동 수행</span></li>
      <li><span class="grade-badge">B</span><span class="grade-score">39~23점</span><span class="grade-desc">기본적인 보안관리 활동 수행</span></li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">맞춤형 가이드</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li><strong>사전점검 활동을 통한 신청기관 맞춤형 보안가이드 제공</strong>
        <br>- 신청기관 IT 환경에 따른 보안 요구사항 도출·분석
        <br>- 정보보호활동에 대한 심층 진단 (관계기관 점검가이드)
        <br>- 다양한 공공기관에 대한 평가 경험 활용</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">평가 기준</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li><strong>필수항목 및 선택항목 등 총 118개 항목으로 평가기준 구성</strong>
        <br>- 필수 항목 : 기반지표, 활동지표
        <br>- 선택 항목 : 개인정보보호지표</li>
    </ul>
    <h4 style="margin:18px 0 10px 0;font-size:17px;font-weight:800;color:#111;">필수항목</h4>
    <ul class="koist-indicator-grid">
      <li><strong>기반지표</strong><ul><li>정보보호 리더십</li><li>정보보호 자원관리</li></ul></li>
      <li><strong>활동지표</strong><ul><li>관리적 정보보호 활동</li><li>물리적 정보보호 활동</li><li>기술적 정보보호 활동</li></ul></li>
    </ul>
    <h4 style="margin:18px 0 10px 0;font-size:17px;font-weight:800;color:#111;">선택항목</h4>
    <ul class="koist-icon-cards">
      <li><i class="fas fa-user-shield" aria-hidden="true" style="font-size:42px;color:#10B981;display:inline-block;width:60px;height:60px;line-height:60px;text-align:center;background:rgba(255,255,255,0.6);border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.06);"></i><span>개인정보 보호</span></li>
      <li><i class="fas fa-coins" aria-hidden="true" style="font-size:42px;color:#F59E0B;display:inline-block;width:60px;height:60px;line-height:60px;text-align:center;background:rgba(255,255,255,0.6);border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.06);"></i><span>금융분야</span></li>
      <li><i class="fas fa-heart-pulse" aria-hidden="true" style="font-size:42px;color:#EF4444;display:inline-block;width:60px;height:60px;line-height:60px;text-align:center;background:rgba(255,255,255,0.6);border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.06);"></i><span>의료분야</span></li>
      <li><i class="fas fa-graduation-cap" aria-hidden="true" style="font-size:42px;color:#3B82F6;display:inline-block;width:60px;height:60px;line-height:60px;text-align:center;background:rgba(255,255,255,0.6);border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.06);"></i><span>교육분야</span></li>
      <li><i class="fas fa-industry" aria-hidden="true" style="font-size:42px;color:#6366F1;display:inline-block;width:60px;height:60px;line-height:60px;text-align:center;background:rgba(255,255,255,0.6);border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.06);"></i><span>기타 산업별 요구사항</span></li>
    </ul>
    <table class="koist-data-table" summary="평가 기준 주요 내용">
      <thead><tr><th scope="col">구분</th><th scope="col">주요 내용</th></tr></thead>
      <tbody>
        <tr><td class="cat">기반지표</td><td>정보보호 정책·경영·의사결정 구조(리더십)와 보안투자 및 인력·조직 등 필수적인 보안 인프라(자원관리)를 평가</td></tr>
        <tr><td class="cat">활동지표</td><td>관리적·물리적·기술적 정보보호조치 현황 및 체계적인 보안활동 수행 여부를 평가</td></tr>
        <tr><td class="cat">선택지표<br>(개인정보보호)</td><td>「개인정보보호법」 및 「정보통신망법」에서 규정하는 개인정보보호 필수항목에 대한 준수 여부를 평가</td></tr>
      </tbody>
    </table>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">세부 평가지표</h3>
  <div class="service-section-body">
    <ul class="service-bullets"><li><strong>기반지표 (30점), 활동지표 (70점), 개인정보보호지표 (118개 항목)</strong></li></ul>
    <table class="koist-data-table" summary="세부 평가지표">
      <thead><tr><th scope="col">지표</th><th scope="col">구분</th><th scope="col">평가지표(점수)</th></tr></thead>
      <tbody>
        <tr><td class="cat" rowspan="2">기반지표</td><td class="subcat">1. 정보보호 리더십</td><td>정보보호 최고책임자(CISO) 지정(5), 정보보호 의사소통 및 정보제공(5), 정보보호 운영방침(4)</td></tr>
        <tr><td class="subcat">2. 정보보호 자원관리</td><td>정보보호 추진계획(4), 정보보호 인력 및 조직(4), 정보보호 예산 수립 및 집행(4), 정보보호 이행점검(4)</td></tr>
        <tr><td class="cat" rowspan="3">활동지표</td><td class="subcat">1. 관리적 보호활동</td><td>정보보호 교육 수행(5), 자산관리(4), 인적보안(4), 외부자 보안(5)</td></tr>
        <tr><td class="subcat">2. 물리적 보호활동</td><td>정보통신시설의 환경 보안(4), 정보통신시설의 출입 관리(4), 사무실 보안(4)</td></tr>
        <tr><td class="subcat">3. 기술적 보호활동</td><td>취약점 점검(5), 정보보호 사고탐지 및 대응(5), 시스템 개발 보안(4), 네트워크 보안(4), 정보시스템 및 응용프로그램 인증(5), 자료유출 방지(4), 시스템 및 서비스 운영 보안(5), 백업 및 IT재해복구(4), PC 및 모바일기기 보안(4)</td></tr>
        <tr><td class="cat">선택지표</td><td class="subcat">개인정보보호</td><td>개인정보 최소수집, 개인정보 수집 고지 및 동의획득, 개인정보취급방침, 이용자 권리 보호, 개인정보의 관리적 보호조치, 개인정보의 기술적 보호조치, 개인정보 파기(P)</td></tr>
      </tbody>
    </table>
  </div>
</section>
<!-- KOIST-LEGACY-IMAGES-v39.22 -->
<section class="service-section" data-aos="fade-up">
  <h3 class="service-section-title">평가 등급</h3>
  <div class="service-section-body legacy-image-block">
    <img src="/api/images/legacy-icons/p54_ctf.png" alt="정보보호 준비도 평가 등급" loading="lazy" style="max-width:100%;height:auto;display:block;margin:0 auto;">
  </div>
</section>
<section class="service-section" data-aos="fade-up">
  <h3 class="service-section-title">평가 항목</h3>
  <div class="service-section-body">
    <ul class="process legacy-step-icons" data-aos="fade-up">
      <li><img src="/api/images/legacy-icons/p55_icon1.png" alt="정보보호 정책" loading="lazy"><p>정보보호 정책</p></li>
      <li><img src="/api/images/legacy-icons/p55_icon2.png" alt="자산 식별 및 관리" loading="lazy"><p>자산 식별 및 관리</p></li>
      <li><img src="/api/images/legacy-icons/p55_icon3.png" alt="정보보호 활동" loading="lazy"><p>정보보호 활동</p></li>
      <li><img src="/api/images/legacy-icons/p55_icon4.png" alt="정보보호 대응" loading="lazy"><p>정보보호 대응</p></li>
      <li><img src="/api/images/legacy-icons/p55_icon5.png" alt="정보보호 개선" loading="lazy"><p>정보보호 개선</p></li>
    </ul>
  </div>
</section>

<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">문의 및 상담</h3>
  <div class="service-section-body">
    <div class="contact-card">
      <span class="contact-name">정보보호 준비도평가 담당</span>
      <span class="contact-tel">070-4236-9200</span>
      <span class="contact-mail">secu-star@koist.kr</span>
    </div>
  </div>
</section>', updated_at = CURRENT_TIMESTAMP WHERE id = 27 AND content NOT LIKE '%KOIST-P40-FIX-v39.23%';
