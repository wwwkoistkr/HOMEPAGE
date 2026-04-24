-- v39.8: 10개 서비스 페이지 원본 koist.kr 완전 복제
-- 사용자 승인: A-2(리다이렉트), 1회 업데이트, #6=#13 동일, Bold 적용, 배포 URL 확정
-- 대상 dep_pages IDs: 11, 14, 15, 16, 17, 18, 19, 23, 24, 25, 26, 27

-- ============================================================
-- #1,#7 id=11 performance/overview — 원본: koist.kr/test2/summary
-- ============================================================
UPDATE dep_pages SET content = '<p class="hero-intro" data-aos="fade-up">정보보호제품이 운영환경에서 정상 및 유해트래픽에 적절히 대응하는지 정도를 기준 및 절차에 따라 성능평가를 실시하여 결과를 제공하는 제도</p>
<figure class="service-image" data-aos="fade-up">
  <img src="/api/images/legacy/sh_page/img/p33_img.png" alt="정보보호제품 성능평가" loading="lazy" decoding="async" />
  <figcaption>정보보호제품 성능평가</figcaption>
</figure>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">목적</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li>정보보호 기업의 기술력 향상 지원</li>
      <li>정보보호 제품 도입 시 성능이 우수한 제품을 선택할 수 있도록 지원</li>
      <li>검증된 성능평가를 통한 객관성 확보를 통해 성능중심으로 정보보호산업 체질 개선 추진</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">법적근거</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li>정보보호산업의 진흥에 관한 법률 제17조(성능평가 지원)</li>
      <li>정보보호산업의 진흥에 관한 법률 시행령 제10조(성능평가의 방법 및 성능평가기관의 지정)</li>
      <li>정보통신망 이용촉진 및 정보보호 등에 관한 법률 제52조(한국인터넷진흥원)</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">정보보호제품 성능평가 가능제품</h3>
  <div class="service-section-body">
    <table class="koist-data-table" summary="정보보호제품 성능평가 가능제품">
      <thead><tr><th scope="col">분류</th><th scope="col">목록</th></tr></thead>
      <tbody>
        <tr>
          <td class="cat" rowspan="2">정보보안</td>
          <td class="subcat">정보보호제품<br />(네트워크/시스템 보안)</td>
        </tr>
        <tr>
          <td>
            <ul>
              <li>소스코드 보안약점 분석도구 ★</li>
              <li>DDoS 대응장비 ★</li>
              <li>안티바이러스 제품(Windows) ★</li>
              <li>안티바이러스 제품(Linux) ★</li>
              <li>안티바이러스 제품(Mobile)</li>
              <li>안티바이러스 제품(모듈형)</li>
              <li>단말 이상행위 탐지 및 대응(EDR)</li>
              <li>네트워크 방화벽</li>
              <li>APT 대응장비</li>
              <li>침입방지시스템(IPS)</li>
              <li>웹방화벽(WAF)</li>
              <li>차세대방화벽(NGFW)</li>
              <li>가상사설망(IPSec VPN, SSL VPN)</li>
              <li>네트워크 자료유출방지 제품(NDLP)</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
<p class="ps" data-aos="fade-up">※ 4종(DDoS 대응장비, 안티바이러스 제품(Windows, Linux), 소스코드 보안약점 분석도구)의 경우 ‘보안적합성 검증체계’에서 분류하는 검증 대상(국가·공공기관)의 가,나,다 그룹 모두 도입 가능 / 이 외 10종 제품도 ‘보안적합성 검증체계’ 분류의 검증 대상 나, 다 그룹에 도입 가능</p>
<p class="ps" data-aos="fade-up">※ 모듈형 안티바이러스 제품은 국가·공공기관에 도입되는 망간자료전송제품 및 스팸메일차단시스템의 악성코드 검사 시 연동이 요구되는 제품군임</p>',
updated_at = CURRENT_TIMESTAMP WHERE id = 11;

-- ============================================================
-- #2 id=14 certificate/overview — 원본: koist.kr/test3/page01
-- ============================================================
UPDATE dep_pages SET content = '<figure class="service-image" data-aos="fade-up">
  <img src="/api/images/legacy/sh_page/img/p37_kolas.png" alt="KOLAS" loading="lazy" decoding="async" />
</figure>
<p class="hero-intro" data-aos="fade-up">한국정보보안기술원은 국제 표준(ISO/IEC 17025)에 따라 한국인정기구(KOLAS)로부터 국제공인시험기관으로 인정<br />KOLAS 공인시험기관으로서 ISO/IEC 25023, 25051 및 성능지표 기반 시험 서비스를 제공<br />객관적인 신뢰성 확보 및 소프트웨어 품질 검증 서비스</p>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">목적</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li>기능 구현에 대한 완전성·정확성 시험</li>
      <li>보안성에 대한 보안기능 시험, 침투 시험</li>
      <li>제품 성능수준에 대한 성능 측정 시험</li>
      <li>신뢰성에 대한 가용성 측정 시험</li>
      <li>결함 예방을 위한 안전성 시험</li>
      <li>R&amp;D 과제 결과물에 대한 제 3자 검증</li>
      <li>R&amp;D 과제 검증지표 수립을 위한 자문 서비스 제공</li>
      <li>AI 솔루션 테스트 결과 제공</li>
      <li>제품 품질에 대한 객관적인 검증 결과 제공</li>
      <li>NEP인증을 위한 공인시험기관 시험성적서 발급 (신청시, 24개월 이내 발급된 시험성적서 제출 필요)</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">소프트웨어 품질특성</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li><strong>ISO/IEC 25023</strong> — 소프트웨어제품 품질 측정에 관한 국제 표준</li>
      <li><strong>ISO/IEC 25051</strong> — 소프트웨어제품 품질 요구사항과 시험에 관한 국제표준</li>
    </ul>
    <ul class="koist-quality-grid">
      <li><h4>기능적합성</h4><div class="q-tags"><span>기능완전성</span><span>기능정확성</span><span>기능적절성</span></div></li>
      <li><h4>성능효율성</h4><div class="q-tags"><span>시간반응성</span><span>자원사용률</span><span>용량 측정</span></div></li>
      <li><h4>호환성</h4><div class="q-tags"><span>공존성</span><span>상호운용성</span></div></li>
      <li><h4>사용성</h4><div class="q-tags"><span>적절인지성</span><span>학습성</span><span>운영성</span><span>사용자오류 방지</span><span>UI 심미성</span><span>접근성</span></div></li>
      <li><h4>신뢰성</h4><div class="q-tags"><span>가용성</span><span>결함허용성</span><span>복구성</span></div></li>
      <li><h4>보안성</h4><div class="q-tags"><span>접근통제</span><span>암호화</span><span>무결성</span><span>부인방지</span><span>책임추적성</span><span>신원인증성</span></div></li>
      <li><h4>유지보수성</h4><div class="q-tags"><span>분석성</span><span>변경성</span><span>시험성</span></div></li>
      <li><h4>이식성</h4><div class="q-tags"><span>적응성</span><span>설치성</span><span>대치성</span></div></li>
      <li><h4>일반적 요구사항</h4><div class="q-tags"><span>제품설명서</span><span>사용자 취급설명서</span></div></li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">소프트웨어 시험대상</h3>
  <div class="service-section-body">
    <table class="koist-data-table" summary="소프트웨어 시험대상">
      <thead><tr><th scope="col">분류</th><th scope="col">목록</th></tr></thead>
      <tbody>
        <tr><td class="cat" rowspan="6">소프트웨어</td><td class="subcat">정보보호</td></tr>
        <tr><td>네트워크 제품군 / 엔드포인트 제품군</td></tr>
        <tr><td class="subcat">시스템 관리</td></tr>
        <tr><td>컴퓨터·응용소프트웨어·네트워크 등 관리 소프트웨어</td></tr>
        <tr><td class="subcat">기업 관리</td></tr>
        <tr><td>ERP, CRM, SCM 및 기업/업무 지원 소프트웨어</td></tr>
        <tr><td class="subcat">콘텐츠 개발도구</td><td>디지털 콘텐츠, AR/VR/XR 콘텐츠 개발 소프트웨어</td></tr>
        <tr><td class="subcat">프로그램 개발용 언어/도구</td><td>프로그램 개발도구, 소스코드 진단도구, 시험/점검 도구</td></tr>
        <tr><td class="subcat">인공지능</td><td>AI 솔루션(제품, 라이브러리, 알고리즘)</td></tr>
      </tbody>
    </table>
    <p class="ps">※ 산업 모든 분야에 적용될 수 있는 소프트웨어를 대상으로 시험 서비스 제공</p>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 절차</h3>
  <div class="service-section-body">
    <ul class="process" data-aos="fade-up">
      <li><img src="/api/images/legacy/sh_page/img/p37_step1.png" alt="시험 준비" loading="lazy" /><span>step 01</span><p>시험 준비</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step2.png" alt="신청 및 계약" loading="lazy" /><span>step 02</span><p>신청 및 계약</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step3.png" alt="시험 수행" loading="lazy" /><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step4.png" alt="성적서 발행" loading="lazy" /><span>step 04</span><p>성적서 발행</p></li>
    </ul>
  </div>
</section>',
updated_at = CURRENT_TIMESTAMP WHERE id = 14;

-- ============================================================
-- #3 id=15 certificate/rnd — 원본: koist.kr/test3/page02
-- ============================================================
UPDATE dep_pages SET content = '<p class="hero-intro" data-aos="fade-up">국가·공공기관 지원 R&amp;D과제 결과물에 대한 제 3자 검증시험 서비스 제공<br />정량적 지표(성능지표) 수립을 위한 서비스 제공</p>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">목적</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li>제품 성능수준에 대한 성능 측정 시험</li>
      <li>제품 품질에 대한 객관적인 검증 결과 제공</li>
      <li>R&amp;D 과제 성능지표 수립을 위한 자문 서비스 제공</li>
      <li>R&amp;D 과제 결과물에 대한 제 3자 검증 — 기획·개발 단계에서부터 함께하는 서비스 제공</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">소프트웨어 시험대상</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li>신기술 적용 소프트웨어</li>
      <li>산업 모든 분야에 적용될 수 있는 소프트웨어</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 절차</h3>
  <div class="service-section-body">
    <ul class="process" data-aos="fade-up">
      <li><img src="/api/images/legacy/sh_page/img/p37_step1.png" alt="시험 준비" loading="lazy" /><span>step 01</span><p>시험 준비</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step2.png" alt="신청 및 계약" loading="lazy" /><span>step 02</span><p>신청 및 계약</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step3.png" alt="시험 수행" loading="lazy" /><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step4.png" alt="성적서 발행" loading="lazy" /><span>step 04</span><p>성적서 발행</p></li>
    </ul>
    <ul class="service-bullets">
      <li>출장 서비스 제공</li>
      <li>R&amp;D 과제 일정에 맞춰 시험 성적서 발행</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">문의 및 상담</h3>
  <div class="service-section-body">
    <div class="contact-card">
      <span class="contact-name">시험성적서 담당</span>
      <span class="contact-tel">070-4120-7452</span>
      <span class="contact-mail">swt@koist.kr</span>
    </div>
  </div>
</section>',
updated_at = CURRENT_TIMESTAMP WHERE id = 15;

-- ============================================================
-- #4 id=16 certificate/ai — 원본: koist.kr/test3/page03
-- ============================================================
UPDATE dep_pages SET content = '<p class="hero-intro" data-aos="fade-up">인공지능(AI) 기술이 포함된 제품 및 알고리즘에 대한 시험 서비스 제공<br />AI바우처 지원사업에 대한 시험 서비스 제공</p>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">목적</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li>AI솔루션에 대한 테스트 결과 제공(시험 성적서 발행)</li>
      <li>제품 성능수준에 대한 성능 측정</li>
      <li>제품 품질에 대한 객관적인 검증 결과 제공</li>
      <li>인공지능 알고리즘 유형별 시험 서비스 제공</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">소프트웨어 시험대상</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li><strong>인공지능 알고리즘이 포함된 모든 제품</strong><br />AI솔루션 (제품, 라이브러리, 알고리즘)<br />AI기반 정보보호 / 시스템 관리 / 기업 관리 / 콘텐츠 개발도구</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 절차</h3>
  <div class="service-section-body">
    <ul class="process" data-aos="fade-up">
      <li><img src="/api/images/legacy/sh_page/img/p37_step1.png" alt="시험 준비" loading="lazy" /><span>step 01</span><p>시험 준비</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step2.png" alt="신청 및 계약" loading="lazy" /><span>step 02</span><p>신청 및 계약</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step3.png" alt="시험 수행" loading="lazy" /><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step4.png" alt="성적서 발행" loading="lazy" /><span>step 04</span><p>성적서 발행</p></li>
    </ul>
    <ul class="service-bullets">
      <li>출장 서비스 제공</li>
      <li>개발사 사업 일정에 맞춰 시험 성적서 발행</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">문의 및 상담</h3>
  <div class="service-section-body">
    <div class="contact-card">
      <span class="contact-name">AI 성능시험 담당</span>
      <span class="contact-tel">070-4120-7452</span>
      <span class="contact-mail">swt@koist.kr</span>
    </div>
  </div>
</section>',
updated_at = CURRENT_TIMESTAMP WHERE id = 16;

-- ============================================================
-- #5 id=17 certificate/network — 원본: koist.kr/test3/page04
-- ============================================================
UPDATE dep_pages SET content = '<p class="hero-intro" data-aos="fade-up">ICT 제품 및 서비스에 대한 네트워크 성능측정<br />가용성·보안성 측면의 모의훈련 서비스</p>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">목적</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li>네트워크 성능수준에 대한 성능측정 결과서 제공(시험성적서 발행)</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 대상</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li><strong>정보보호제품</strong> : DDoS 대응장비, 네트워크 방화벽(F/W), 웹방화벽(WAF), 차세대방화벽(NGFW), 침입방지시스템(IPS), 가상사설망(IPSec VPN, SSL VPN)</li>
      <li><strong>네트워크 장비</strong> : L2 이상 스위치, 라우터</li>
      <li>신기술, 융·복합 제품 및 서비스</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 범위</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li>RFC3511 / RFC2544 시험</li>
      <li>처리율(Throughput) 및 지연시간(Latency)</li>
      <li>CPS (초당 최대 연결 생성률)</li>
      <li>TPS (초당 최대 트랜잭션 생성률)</li>
      <li>CC (최대 동시 세션수)</li>
      <li>신청기관에서 제시한 시험항목</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 절차</h3>
  <div class="service-section-body">
    <ul class="process" data-aos="fade-up">
      <li><img src="/api/images/legacy/sh_page/img/p37_step1.png" alt="시험 준비" loading="lazy" /><span>step 01</span><p>시험 준비</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step2.png" alt="신청 및 계약" loading="lazy" /><span>step 02</span><p>신청 및 계약</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step3.png" alt="시험 수행" loading="lazy" /><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step4.png" alt="시험 결과서" loading="lazy" /><span>step 04</span><p>시험 결과서</p></li>
    </ul>
    <ul class="service-bullets">
      <li>개발사 사업 일정에 맞춰 시험 결과서 제공</li>
      <li>개발사 요청 시, 시험 성적서 발행</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">문의 및 상담</h3>
  <div class="service-section-body">
    <div class="contact-card">
      <span class="contact-name">NW 성능시험 담당</span>
      <span class="contact-tel">070-4120-7452</span>
      <span class="contact-mail">swt@koist.kr</span>
    </div>
  </div>
</section>',
updated_at = CURRENT_TIMESTAMP WHERE id = 17;

-- ============================================================
-- #6,#13 id=18 diagnosis/readiness, id=27 readiness/overview
-- 원본: koist.kr/test4/page01 (정보보호 준비도평가 — 가장 복잡)
-- 두 레코드 모두 동일 콘텐츠 적용
-- ============================================================
UPDATE dep_pages SET content = '<p class="hero-intro" data-aos="fade-up">안전한 정보통신 이용환경 조성을 위해, 정보통신망 이용자의 정보보호 준비 수준을 평가하여 등급을 부여하는 제도로, 과학기술정보통신부가 평가기관을 지정(2016년 4월)</p>
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
    <figure class="service-image">
      <img src="/api/images/legacy/sh_page/img/p40_img.png" alt="정보보호 준비도 등급 평가서" loading="lazy" decoding="async" />
    </figure>
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
      <li><img src="/api/images/legacy/sh_page/img/p40_select1.png" alt="개인정보 보호" /><span>개인정보 보호</span></li>
      <li><img src="/api/images/legacy/sh_page/img/p40_select2.png" alt="금융분야" /><span>금융분야</span></li>
      <li><img src="/api/images/legacy/sh_page/img/p40_select3.png" alt="의료분야" /><span>의료분야</span></li>
      <li><img src="/api/images/legacy/sh_page/img/p40_select4.png" alt="교육분야" /><span>교육분야</span></li>
      <li><img src="/api/images/legacy/sh_page/img/p40_select5.png" alt="기타 산업별 요구사항" /><span>기타 산업별 요구사항</span></li>
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
</section>',
updated_at = CURRENT_TIMESTAMP WHERE id IN (18, 27);

-- ============================================================
-- #9 id=19 diagnosis/ddos — 원본: koist.kr/test4/page02 (DDoS모의훈련)
-- /services/mock-test/overview 301 리다이렉트 대상
-- ============================================================
UPDATE dep_pages SET content = '<p class="hero-intro" data-aos="fade-up">실제 공격상황을 대비한 DDoS 대응 모의훈련 서비스<br />고객사 네트워크 및 보안시스템에 대한 다양한 DDoS 공격을 시도하여 보안 수준 진단</p>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">훈련 대상</h3>
  <div class="service-section-body">
    <ul class="service-bullets"><li>홈페이지, 서버, 네트워크 및 보안시스템</li></ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">훈련 내용</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li>DDoS 대량 트래픽 차단 및 서비스 가용성 점검</li>
      <li>DDoS 공격에 대한 실시간 모니터링 및 대응체계 점검</li>
      <li>TCP/UDP/ICMP Flooding, HTTP Attack 등 다양한 유해트래픽에 대한 대응결과 진단</li>
      <li>대응체계, 예방활동을 위한 모의훈련 및 지침 제공</li>
      <li>신청기관에서 제시한 시험항목</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">훈련 절차</h3>
  <div class="service-section-body">
    <ul class="process" data-aos="fade-up">
      <li><img src="/api/images/legacy/sh_page/img/p37_step2.png" alt="모의훈련 신청" loading="lazy" /><span>step 01</span><p>모의훈련 신청</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step3.png" alt="모의훈련 수행" loading="lazy" /><span>step 02</span><p>모의훈련 수행</p></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step4.png" alt="훈련 결과보고서" loading="lazy" /><span>step 03</span><p>훈련 결과보고서</p></li>
    </ul>
    <ul class="service-bullets">
      <li>고객사 일정에 맞춰 모의훈련 서비스 제공</li>
      <li>요청 시, 시험성적서 발행</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">문의 및 상담</h3>
  <div class="service-section-body">
    <div class="contact-card">
      <span class="contact-name">금봉섭 소장</span>
      <span class="contact-tel">070-4468-2569</span>
      <span class="contact-mail">kbs77@koist.kr</span>
    </div>
  </div>
</section>',
updated_at = CURRENT_TIMESTAMP WHERE id = 19;

-- ============================================================
-- #10 id=23 consulting/cc — 원본: koist.kr/consulting/cc
-- ============================================================
UPDATE dep_pages SET content = '<p class="hero-intro" data-aos="fade-up">CC평가를 원하는 고객의 원활한 평가 진행을 위하여 CC 평가 관련 교육 및 평가제출물 작성에 대한 가이드를 제공</p>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">주요 서비스</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li>CC 평가제도, 절차, 기준 등 CC제도 전반에 대한 교육</li>
      <li>평가보증등급별 평가제출물 작성 가이드</li>
      <li>정보보호제품별 안전한 보안기능 구현을 위한 보안기능 가이드(보안규격 자문)</li>
      <li>개발환경 보안점검 가이드 : 인적·물리적 보안대책 수립 등에 대한 가이드 제공</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">수행절차</h3>
  <div class="service-section-body">
    <ul class="process" data-aos="fade-up">
      <li><img src="/api/images/legacy/sh_page/img/p37_step1.png" alt="준비단계" loading="lazy" /><span>준비단계</span><p>자문 및 컨설팅 신청</p>
        <ul class="process-detail"><li>대상제품 유형 확인</li><li>보증 등급 결정</li><li>평가 구분(국제용/국내용)</li></ul></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step2.png" alt="컨설팅 수행" loading="lazy" /><span>컨설팅 수행</span><p>컨설팅 접수 및 계약</p>
        <ul class="process-detail"><li>컨설팅 계획 수립</li><li>보증등급별 제출물 작성가이드</li><li>보안규격 해석 등</li><li>제출물 검토</li></ul></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step3.png" alt="종료단계" loading="lazy" /><span>종료단계</span><p>평가계약 지원</p>
        <ul class="process-detail"><li>원활한 평가계약 진행 지원</li></ul></li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">문의 및 상담</h3>
  <div class="service-section-body">
    <div class="contact-card">
      <span class="contact-name">최진호 팀장</span>
      <span class="contact-tel">070-4265-0886</span>
      <span class="contact-mail">jhchoi@koist.kr</span>
    </div>
  </div>
</section>',
updated_at = CURRENT_TIMESTAMP WHERE id = 23;

-- ============================================================
-- #11 id=24 consulting/kcmvp — 원본: koist.kr/consulting/vcm
-- ============================================================
UPDATE dep_pages SET content = '<p class="hero-intro" data-aos="fade-up">검증필 암호모듈의 안전성과 구현 적합성 검증을 원하는 고객의 원활한 진행을 위하여, 검증필 암호모듈 검증 관련 교육 및 제출물 작성에 대한 가이드를 제공</p>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">주요 서비스</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li>검증필 암호모듈 검증 제도, 절차, 기준 등 검증필 암호모듈 검증제도 전반에 대한 교육</li>
      <li>암호모듈 설계 및 제출물 작성 가이드</li>
      <li>검증필 암호모듈의 안전성과 구현 적합성을 위한 검증기준 가이드</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">수행절차</h3>
  <div class="service-section-body">
    <ul class="process" data-aos="fade-up">
      <li><img src="/api/images/legacy/sh_page/img/p37_step1.png" alt="준비단계" loading="lazy" /><span>준비단계</span><p>자문 및 컨설팅 신청</p>
        <ul class="process-detail"><li>대상제품 유형 확인</li><li>보안수준 결정</li></ul></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step2.png" alt="컨설팅 수행" loading="lazy" /><span>컨설팅 수행</span><p>컨설팅 접수 및 계약</p>
        <ul class="process-detail"><li>컨설팅 계획 수립</li><li>암호모듈 설계 및 제출물 작성 가이드</li><li>검증필 암호모듈 검증기준 가이드</li></ul></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step4.png" alt="종료단계" loading="lazy" /><span>종료단계</span><p>최종 검토</p>
        <ul class="process-detail"><li>구현물 및 제출물 검토</li></ul></li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">문의 및 상담</h3>
  <div class="service-section-body">
    <div class="contact-card">
      <span class="contact-name">황현동 팀장</span>
      <span class="contact-tel">070-4923-7622</span>
      <span class="contact-mail">hdhwang@koist.kr</span>
    </div>
  </div>
</section>',
updated_at = CURRENT_TIMESTAMP WHERE id = 24;

-- ============================================================
-- #12 id=25 consulting/isms-p — 원본: koist.kr/consulting/isms_p
-- ============================================================
UPDATE dep_pages SET content = '<p class="hero-intro" data-aos="fade-up">한국정보보안기술원은 “정보보호 관리체계(ISMS)” 인증을 위한 컨설팅 및 서비스를 제공하고 있습니다.</p>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">컨설팅 제공</h3>
  <div class="service-section-body">
    <ul class="service-bullets"><li>컨설팅 진행 단계별 교육 및 실습을 통한 관리체계의 내재화 지원</li></ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">컨설팅 단계별 진행 내용</h3>
  <div class="service-section-body">
    <ul class="process" data-aos="fade-up">
      <li><img src="/api/images/legacy/sh_page/img/p37_step1.png" alt="현황 분석" loading="lazy" /><span>STEP 01</span><p>현황 분석</p>
        <ul class="process-detail"><li>운영환경 분석</li><li>요구사항 정의</li><li>컨설팅 범위 정의</li><li>수행 계획 수립</li></ul></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step2.png" alt="위험 분석" loading="lazy" /><span>STEP 02</span><p>위험 분석</p>
        <ul class="process-detail"><li>자산 조사</li><li>자산관리 현황분석</li><li>기술적 취약점 분석</li><li>위험분석 및 평가</li></ul></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step3.png" alt="보안대책 수립" loading="lazy" /><span>STEP 03</span><p>보안대책 수립 및 문서작성</p>
        <ul class="process-detail"><li>보안대책 도출</li><li>이행 계획 수립</li><li>중장기 계획 수립</li><li>정책수립 및 작성</li><li>운영 문서 작성</li></ul></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step4.png" alt="최종점검" loading="lazy" /><span>STEP 04</span><p>최종점검</p>
        <ul class="process-detail"><li>모의심사 수행</li></ul></li>
      <li><img src="/api/images/legacy/sh_page/img/p37_step4.png" alt="사후관리" loading="lazy" /><span>STEP 05</span><p>사후관리</p>
        <ul class="process-detail"><li>예비점검 보완조치</li></ul></li>
    </ul>
    <ul class="service-bullets">
      <li>기존 운영문서를 활용하여 일정 조정 가능</li>
      <li>예비점검 결과에 대한 보완조치 수행</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">문의 및 상담</h3>
  <div class="service-section-body">
    <div class="contact-card">
      <span class="contact-name">금봉섭 소장</span>
      <span class="contact-tel">070-4923-7622</span>
      <span class="contact-mail">kbs77@koist.kr</span>
    </div>
  </div>
</section>',
updated_at = CURRENT_TIMESTAMP WHERE id = 25;

-- ============================================================
-- #8 id=26 enterprise-security/info — 원본: koist.kr/indsecconsult/info
-- ============================================================
UPDATE dep_pages SET content = '<p class="hero-intro" data-aos="fade-up">기업의 보안 수준 제고 및 대외 신뢰도 향상을 위한 영역별 취약점 점검 서비스<br />기술 유출 사고 예방 및 산업보안 의식 강화, 중장기 보안대책 마련</p>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">강점</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li>산업보안관리사, 정보보호준비도평가사, 사이버포렌식전문가 등의 공인 자격을 구비한 전문가들이 현장 방문</li>
      <li>물리, 인원, 정보 등 보안 분야별 취약점을 종합 진단 평가</li>
      <li>전사적 측면의 융합보안 방안을 제시하여 기업의 실질적 보안역량과 기술(영업비밀 포함) 유출사고 예방 및 임직원의 보안 의식 강화</li>
      <li>단계별 보안 발전방안 및 보안대책 제공</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">업무 범위</h3>
  <div class="service-section-body">
    <div class="koist-subgroup">
      <h4>기업 보안역량 진단</h4>
      <ul>
        <li>기업보안 현황 분석</li>
        <li>보안취약점 도출 및 대응방안 마련</li>
        <li>관리적 보안, 물리적 보안, 기술적 보안(정보보호) 분야별 심층 진단</li>
        <li>정보보호에 치우치지 않는 융합보안 차원의 실질적 보안 방안 제시</li>
      </ul>
    </div>
    <div class="koist-subgroup">
      <h4>기업 보안유출 사고 대응</h4>
      <ul>
        <li>보안사고 발생시 대응 조치</li>
        <li>사고 원인 조사</li>
        <li>사고 조사 보고서 작성 및 후속 조치</li>
      </ul>
    </div>
    <div class="koist-subgroup">
      <h4>기업 영업비밀 및 기술보호 교육</h4>
      <ul>
        <li>사내 보안내규 작성 등 관리적 보안 방안</li>
        <li>임직원의 보안 의식(awareness) 강화 방안</li>
        <li>임직원 보안활동 관제 방안</li>
      </ul>
    </div>
    <div class="koist-subgroup">
      <h4>기업 기술보호 상담</h4>
      <ul>
        <li>기술보안 기업정책 수립 및 기술보호 관련 법률 상담</li>
        <li>국가핵심기술, 산업기술, 영업비밀 등 보호대상 기술별 관리 방안</li>
        <li>중장기 보안역량 강화 위한 마스터 플랜 수립</li>
      </ul>
    </div>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">문의 및 상담</h3>
  <div class="service-section-body">
    <div class="contact-card">
      <span class="contact-name">산업보안 컨설팅 담당</span>
      <span class="contact-tel">070-4236-9200</span>
      <span class="contact-mail">hjlee12000@koist.kr</span>
    </div>
  </div>
</section>',
updated_at = CURRENT_TIMESTAMP WHERE id = 26;
