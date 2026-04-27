-- v39.24: 깨진 p37/p33 이미지 31개 → p48/kolas 일괄 교체
-- 처리 전략:
--   1. p37_kolas.png → kolas.png (R2: legacy-icons/kolas.png)
--   2. p37_step1~4.png → p48_step1~4.png (R2: legacy-icons/p48_step1~4.png)
--   3. p33_img.png (page 11) → 단순 제거 (p50_img.png가 v39.22에서 이미 추가됨)
-- 멱등 마커: <!-- KOIST-P3X-FIX-v39.24 -->
-- 모든 이미지는 이미 R2에 업로드되어 있어 추가 업로드 불필요

-- Page 11 (overview): 0 replaced, 1 removed
UPDATE dep_pages SET content = '<!-- KOIST-P3X-FIX-v39.24 -->
<p class="hero-intro" data-aos="fade-up" style="text-align: center;">정보보호제품이 운영환경에서 정상 및 유해트래픽에 적절히 대응하는지 정도를 기준 및 절차에 따라 성능평가를 실시하여 결과를 제공하는 제도</p>
<figure class="service-image" data-aos="fade-up">
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
          <td class="subcat">정보보호제품<br>(네트워크/시스템 보안)</td>
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
<p class="ps" data-aos="fade-up">※ 모듈형 안티바이러스 제품은 국가·공공기관에 도입되는 망간자료전송제품 및 스팸메일차단시스템의 악성코드 검사 시 연동이 요구되는 제품군임</p>

<!-- KOIST-LEGACY-IMAGES-v39.22 -->
<section class="service-section" data-aos="fade-up">
  <h3 class="service-section-title">성능평가 대상 분야</h3>
  <div class="service-section-body legacy-image-block">
    <img src="/api/images/legacy-icons/p50_img.png" alt="정보보안 제품 성능평가 대상 분야" loading="lazy" style="max-width:100%;height:auto;display:block;margin:0 auto;">
  </div>
</section>
', updated_at = CURRENT_TIMESTAMP WHERE id = 11 AND content NOT LIKE '%KOIST-P3X-FIX-v39.24%';

-- Page 14 (overview): 5 replaced, 0 removed
UPDATE dep_pages SET content = '<!-- KOIST-P3X-FIX-v39.24 -->
<figure class="service-image" data-aos="fade-up">
  <img src="/api/images/legacy-icons/kolas.png" alt="KOLAS" loading="lazy" decoding="async">
</figure>
<p class="hero-intro" data-aos="fade-up"></p><div style="text-align: center;"><span style="font-size: 0.875rem;"><b>한국정보보안기술원은 국제 표준(ISO/IEC 17025)에 따라 한국인정기구(KOLAS)로부터 국제공인시험기관으로 인정</b></span></div><div style="text-align: center;"><span style="font-size: 0.875rem;"><b>KOLAS 공인시험기관으로서 ISO/IEC 25023, 25051 및 성능지표 기반 시험 서비스를 제공</b></span></div><div style="text-align: center;"><span style="font-size: 0.875rem;"><b>객관적인 신뢰성 확보 및 소프트웨어 품질 검증 서비스</b></span></div><div style="text-align: center;"><span style="font-size: 0.875rem;"><b><br></b></span></div><p></p>
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
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="시험 준비" loading="lazy"><span>step 01</span><p>시험 준비</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" loading="lazy"><span>step 02</span><p>신청 및 계약</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" loading="lazy"><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="성적서 발행" loading="lazy"><span>step 04</span><p>성적서 발행</p></li>
    </ul>
  </div>
</section>

<!-- KOIST-LEGACY-IMAGES-v39.22 -->
<section class="service-section" data-aos="fade-up">
  <h3 class="service-section-title">KOLAS 국제공인시험기관</h3>
  <div class="service-section-body legacy-image-block">
    <img src="/api/images/legacy-icons/kolas.png" alt="KOLAS 국제공인시험기관 인정마크" loading="lazy" style="max-width:402px;width:100%;height:auto;display:block;margin:0 auto;">
    <p class="legacy-caption" style="text-align:center;margin-top:12px;color:#475569;">한국정보보안기술원은 KOLAS 국제공인시험기관 인정을 보유하고 있습니다.</p>
  </div>
</section>
', updated_at = CURRENT_TIMESTAMP WHERE id = 14 AND content NOT LIKE '%KOIST-P3X-FIX-v39.24%';

-- Page 15 (rnd): 4 replaced, 0 removed
UPDATE dep_pages SET content = '<!-- KOIST-P3X-FIX-v39.24 -->
<p class="hero-intro" data-aos="fade-up"></p><div style="text-align: center;"><span style="font-size: 0.875rem;">국가·공공기관 지원 R&amp;D과제 결과물에 대한 제 3자 검증시험 서비스 제공</span></div><div style="text-align: center;"><span style="font-size: 0.875rem;">정량적 지표(성능지표) 수립을 위한 서비스 제공</span></div><div style="text-align: center;"><span style="font-size: 0.875rem;"><br></span></div><p></p>
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
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="시험 준비" loading="lazy"><span>step 01</span><p>시험 준비</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" loading="lazy"><span>step 02</span><p>신청 및 계약</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" loading="lazy"><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="성적서 발행" loading="lazy"><span>step 04</span><p>성적서 발행</p></li>
    </ul>
    <ul class="service-bullets">
      <li>출장 서비스 제공</li>
      <li>R&amp;D 과제 일정에 맞춰 시험 성적서 발행</li>
    </ul>
  </div>
</section>
<!-- KOIST-LEGACY-IMAGES-v39.22 -->
<section class="service-section" data-aos="fade-up">
  <h3 class="service-section-title">시험 절차</h3>
  <div class="service-section-body">
    <ul class="process legacy-step-icons" data-aos="fade-up">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="시험신청" loading="lazy"><span>step 01</span><p>시험신청</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="시험계획" loading="lazy"><span>step 02</span><p>시험계획</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" loading="lazy"><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="성적서 발행" loading="lazy"><span>step 04</span><p>성적서 발행</p></li>
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
</section>', updated_at = CURRENT_TIMESTAMP WHERE id = 15 AND content NOT LIKE '%KOIST-P3X-FIX-v39.24%';

-- Page 16 (ai): 4 replaced, 0 removed
UPDATE dep_pages SET content = '<!-- KOIST-P3X-FIX-v39.24 -->
<p class="hero-intro" data-aos="fade-up"><div style="text-align: center;"><span style="font-size: 0.875rem;">인공지능(AI) 기술이 포함된 제품 및 알고리즘에 대한 시험 서비스 제공</span></div><div style="text-align: center;"><span style="font-size: 0.875rem;">AI바우처 지원사업에 대한 시험 서비스 제공</span></div><div style="text-align: center;"><span style="font-size: 0.875rem;"><br></span></div></p>
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
      <li><strong>인공지능 알고리즘이 포함된 모든 제품</strong><br>AI솔루션 (제품, 라이브러리, 알고리즘)<br>AI기반 정보보호 / 시스템 관리 / 기업 관리 / 콘텐츠 개발도구</li>
    </ul>
  </div>
</section>
<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 절차</h3>
  <div class="service-section-body">
    <ul class="process" data-aos="fade-up">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="시험 준비" loading="lazy"><span>step 01</span><p>시험 준비</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" loading="lazy"><span>step 02</span><p>신청 및 계약</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" loading="lazy"><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="성적서 발행" loading="lazy"><span>step 04</span><p>성적서 발행</p></li>
    </ul>
    <ul class="service-bullets">
      <li>출장 서비스 제공</li>
      <li>개발사 사업 일정에 맞춰 시험 성적서 발행</li>
    </ul>
  </div>
</section>
<!-- KOIST-LEGACY-IMAGES-v39.22 -->
<section class="service-section" data-aos="fade-up">
  <h3 class="service-section-title">AI 성능시험 절차</h3>
  <div class="service-section-body">
    <ul class="process legacy-step-icons" data-aos="fade-up">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="시험신청" loading="lazy"><span>step 01</span><p>시험신청</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="시험계획" loading="lazy"><span>step 02</span><p>시험계획</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" loading="lazy"><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="성적서 발행" loading="lazy"><span>step 04</span><p>성적서 발행</p></li>
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
</section>', updated_at = CURRENT_TIMESTAMP WHERE id = 16 AND content NOT LIKE '%KOIST-P3X-FIX-v39.24%';

-- Page 17 (network): 4 replaced, 0 removed
UPDATE dep_pages SET content = '<!-- KOIST-P3X-FIX-v39.24 -->
<p class="hero-intro" data-aos="fade-up"><div style="text-align: center;"><span style="font-size: 0.875rem;">ICT 제품 및 서비스에 대한 네트워크 성능측정</span></div><div style="text-align: center;"><span style="font-size: 0.875rem;">가용성·보안성 측면의 모의훈련 서비스</span></div><div style="text-align: center;"><span style="font-size: 0.875rem;"><br></span></div></p>
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
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="시험 준비" loading="lazy"><span>step 01</span><p>시험 준비</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="신청 및 계약" loading="lazy"><span>step 02</span><p>신청 및 계약</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" loading="lazy"><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="시험 결과서" loading="lazy"><span>step 04</span><p>시험 결과서</p></li>
    </ul>
    <ul class="service-bullets">
      <li>개발사 사업 일정에 맞춰 시험 결과서 제공</li>
      <li>개발사 요청 시, 시험 성적서 발행</li>
    </ul>
  </div>
</section>
<!-- KOIST-LEGACY-IMAGES-v39.22 -->
<section class="service-section" data-aos="fade-up">
  <h3 class="service-section-title">네트워크 성능시험 절차</h3>
  <div class="service-section-body">
    <ul class="process legacy-step-icons" data-aos="fade-up">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="시험신청" loading="lazy"><span>step 01</span><p>시험신청</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="시험계획" loading="lazy"><span>step 02</span><p>시험계획</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="시험 수행" loading="lazy"><span>step 03</span><p>시험 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="성적서 발행" loading="lazy"><span>step 04</span><p>성적서 발행</p></li>
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
</section>', updated_at = CURRENT_TIMESTAMP WHERE id = 17 AND content NOT LIKE '%KOIST-P3X-FIX-v39.24%';

-- Page 19 (ddos): 3 replaced, 0 removed
UPDATE dep_pages SET content = '<!-- KOIST-P3X-FIX-v39.24 -->
<p class="hero-intro" data-aos="fade-up"><div style="text-align: center;"><span style="font-size: 0.875rem;">실제 공격상황을 대비한 DDoS 대응 모의훈련 서비스</span></div><div style="text-align: center;"><span style="font-size: 0.875rem;">고객사 네트워크 및 보안시스템에 대한 다양한 DDoS 공격을 시도하여 보안 수준 진단</span></div><div style="text-align: center;"><span style="font-size: 0.875rem;"><br></span></div></p>
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
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="모의훈련 신청" loading="lazy"><span>step 01</span><p>모의훈련 신청</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="모의훈련 수행" loading="lazy"><span>step 02</span><p>모의훈련 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="훈련 결과보고서" loading="lazy"><span>step 03</span><p>훈련 결과보고서</p></li>
    </ul>
    <ul class="service-bullets">
      <li>고객사 일정에 맞춰 모의훈련 서비스 제공</li>
      <li>요청 시, 시험성적서 발행</li>
    </ul>
  </div>
</section>
<!-- KOIST-LEGACY-IMAGES-v39.22 -->
<section class="service-section" data-aos="fade-up">
  <h3 class="service-section-title">모의훈련 진행 절차</h3>
  <div class="service-section-body">
    <ul class="process legacy-step-icons" data-aos="fade-up">
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="모의훈련 신청" loading="lazy"><span>step 01</span><p>모의훈련 신청</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="모의훈련 수행" loading="lazy"><span>step 02</span><p>모의훈련 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="훈련 결과보고서" loading="lazy"><span>step 03</span><p>훈련 결과보고서</p></li>
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
</section>', updated_at = CURRENT_TIMESTAMP WHERE id = 19 AND content NOT LIKE '%KOIST-P3X-FIX-v39.24%';

-- Page 23 (cc): 3 replaced, 0 removed
UPDATE dep_pages SET content = '<!-- KOIST-P3X-FIX-v39.24 -->
<p class="hero-intro" data-aos="fade-up" style="text-align: center;">CC평가를 원하는 고객의 원활한 평가 진행을 위하여 CC 평가 관련 교육 및 평가제출물 작성에 대한 가이드를 제공</p><p class="hero-intro" data-aos="fade-up" style="text-align: center;"><br></p>
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
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="준비단계" loading="lazy"><span>준비단계</span><p>자문 및 컨설팅 신청</p>
        <ul class="process-detail"><li>대상제품 유형 확인</li><li>보증 등급 결정</li><li>평가 구분(국제용/국내용)</li></ul></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="컨설팅 수행" loading="lazy"><span>컨설팅 수행</span><p>컨설팅 접수 및 계약</p>
        <ul class="process-detail"><li>컨설팅 계획 수립</li><li>보증등급별 제출물 작성가이드</li><li>보안규격 해석 등</li><li>제출물 검토</li></ul></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="종료단계" loading="lazy"><span>종료단계</span><p>평가계약 지원</p>
        <ul class="process-detail"><li>원활한 평가계약 진행 지원</li></ul></li>
    </ul>
  </div>
</section>
<!-- KOIST-LEGACY-IMAGES-v39.22 -->
<section class="service-section" data-aos="fade-up">
  <h3 class="service-section-title">CC 컨설팅 절차</h3>
  <div class="service-section-body">
    <ul class="process legacy-step-icons" data-aos="fade-up">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="컨설팅 신청" loading="lazy"><span>step 01</span><p>컨설팅 신청</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="컨설팅 계획" loading="lazy"><span>step 02</span><p>컨설팅 계획</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="컨설팅 수행" loading="lazy"><span>step 03</span><p>컨설팅 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="결과 보고" loading="lazy"><span>step 04</span><p>결과 보고</p></li>
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
</section>', updated_at = CURRENT_TIMESTAMP WHERE id = 23 AND content NOT LIKE '%KOIST-P3X-FIX-v39.24%';

-- Page 24 (kcmvp): 3 replaced, 0 removed
UPDATE dep_pages SET content = '<!-- KOIST-P3X-FIX-v39.24 -->
<p class="hero-intro" data-aos="fade-up" style="text-align: center;">검증필 암호모듈의 안전성과 구현 적합성 검증을 원하는 고객의 원활한 진행을 위하여, 검증필 암호모듈 검증 관련 교육 및 제출물 작성에 대한 가이드를 제공</p><p class="hero-intro" data-aos="fade-up" style="text-align: center;"><br></p>
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
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="준비단계" loading="lazy"><span>준비단계</span><p>자문 및 컨설팅 신청</p>
        <ul class="process-detail"><li>대상제품 유형 확인</li><li>보안수준 결정</li></ul></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="컨설팅 수행" loading="lazy"><span>컨설팅 수행</span><p>컨설팅 접수 및 계약</p>
        <ul class="process-detail"><li>컨설팅 계획 수립</li><li>암호모듈 설계 및 제출물 작성 가이드</li><li>검증필 암호모듈 검증기준 가이드</li></ul></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="종료단계" loading="lazy"><span>종료단계</span><p>최종 검토</p>
        <ul class="process-detail"><li>구현물 및 제출물 검토</li></ul></li>
    </ul>
  </div>
</section>
<!-- KOIST-LEGACY-IMAGES-v39.22 -->
<section class="service-section" data-aos="fade-up">
  <h3 class="service-section-title">검증필 암호모듈 컨설팅 절차</h3>
  <div class="service-section-body">
    <ul class="process legacy-step-icons" data-aos="fade-up">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="컨설팅 신청" loading="lazy"><span>step 01</span><p>컨설팅 신청</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="컨설팅 계획" loading="lazy"><span>step 02</span><p>컨설팅 계획</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="컨설팅 수행" loading="lazy"><span>step 03</span><p>컨설팅 수행</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="결과 보고" loading="lazy"><span>step 04</span><p>결과 보고</p></li>
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
</section>', updated_at = CURRENT_TIMESTAMP WHERE id = 24 AND content NOT LIKE '%KOIST-P3X-FIX-v39.24%';

-- Page 25 (isms-p): 5 replaced, 0 removed
UPDATE dep_pages SET content = '<!-- KOIST-P3X-FIX-v39.24 -->
<p class="hero-intro" data-aos="fade-up" style="text-align: center;">한국정보보안기술원은 “정보보호 관리체계(ISMS)” 인증을 위한 컨설팅 및 서비스를 제공하고 있습니다.</p><p class="hero-intro" data-aos="fade-up" style="text-align: center;"><br></p>
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
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="현황 분석" loading="lazy"><span>STEP 01</span><p>현황 분석</p>
        <ul class="process-detail"><li>운영환경 분석</li><li>요구사항 정의</li><li>컨설팅 범위 정의</li><li>수행 계획 수립</li></ul></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="위험 분석" loading="lazy"><span>STEP 02</span><p>위험 분석</p>
        <ul class="process-detail"><li>자산 조사</li><li>자산관리 현황분석</li><li>기술적 취약점 분석</li><li>위험분석 및 평가</li></ul></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="보안대책 수립" loading="lazy"><span>STEP 03</span><p>보안대책 수립 및 문서작성</p>
        <ul class="process-detail"><li>보안대책 도출</li><li>이행 계획 수립</li><li>중장기 계획 수립</li><li>정책수립 및 작성</li><li>운영 문서 작성</li></ul></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="최종점검" loading="lazy"><span>STEP 04</span><p>최종점검</p>
        <ul class="process-detail"><li>모의심사 수행</li></ul></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="사후관리" loading="lazy"><span>STEP 05</span><p>사후관리</p>
        <ul class="process-detail"><li>예비점검 보완조치</li></ul></li>
    </ul>
    <ul class="service-bullets">
      <li>기존 운영문서를 활용하여 일정 조정 가능</li>
      <li>예비점검 결과에 대한 보완조치 수행</li>
    </ul>
  </div>
</section>
<!-- KOIST-LEGACY-IMAGES-v39.22 -->
<section class="service-section" data-aos="fade-up">
  <h3 class="service-section-title">ISMS-P 컨설팅 절차</h3>
  <div class="service-section-body">
    <ul class="process legacy-step-icons" data-aos="fade-up">
      <li><img src="/api/images/legacy-icons/p48_step1.png" alt="현황 분석" loading="lazy"><span>step 01</span><p>현황 분석</p></li>
      <li><img src="/api/images/legacy-icons/p48_step2.png" alt="정책·체계 수립" loading="lazy"><span>step 02</span><p>정책·체계 수립</p></li>
      <li><img src="/api/images/legacy-icons/p48_step3.png" alt="이행 점검" loading="lazy"><span>step 03</span><p>이행 점검</p></li>
      <li><img src="/api/images/legacy-icons/p48_step4.png" alt="인증 심사 지원" loading="lazy"><span>step 04</span><p>인증 심사 지원</p></li>
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
</section>', updated_at = CURRENT_TIMESTAMP WHERE id = 25 AND content NOT LIKE '%KOIST-P3X-FIX-v39.24%';
