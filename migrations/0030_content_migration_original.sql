-- KOIST v39.6 — 원본 koist.kr 콘텐츠 마이그레이션
-- Generated: 2026-04-22T02:15:08.575Z
-- Source: http://www.koist.kr/* (1회 크롤링, 자사 자산)
-- Safe to re-run (UPDATE only, no INSERT)
-- Transformation: dl.dl_cm/dt/dd → section/h3/ul, img src → /api/images/legacy/* proxy
-- Total pages: 25

-- [1] cc/overview (2010 bytes, 6 sections, 1 images)
-- Source: http://www.koist.kr/cc/summary
UPDATE dep_pages
   SET content = '<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">개요</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>신청기관이 개발한 정보보호제품에 구현된 보안기능의 안전성과 신뢰성을 보증하여 사용자들이 안심하고 제품을 사용할 수 있도록 지원하는 제도</li>
                <li>정보보호시스템 공통평가기준</li>
                <li>정보보호시스템 평가 · 인증 지침</li>
                <li>정보보호제품 평가 · 인증 수행규정</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">법적근거</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>지능정보화 기본법 제58조 및 시행령 제51조에 근거</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">CC평가</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>평가 보증등급(EAL)에 따라 평가제출물(보안목표명세서, 설명서 등)검증</li>
                <li>정보보호제품이 제공하는 보안기능에 대한 분석 및 기능시험</li>
                <li>정보보호제품에 대한 취약점 분석 및 침투시험</li>
                <li>정보보호제품 개발환경에 대한 보안대책 점검</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">인증효력유지</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>인증서 보유기관이 새로운 취약점 보완 및 운영환경 변경 등의 사유로 인해 인증 제품의 형상을 변경한 경우 검증</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">인증서효력연장</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>인증서 보유기관의 인증서 효력 연장을 위한 인증 제품 검증</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">평가인증체계</h3>
  <div class="service-section-body"><figure class="service-image"><img src="/api/images/legacy/sh_page/img/p38_img.png" alt="평가인증체계" loading="lazy" decoding="async"></figure></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'cc')
   AND slug = 'overview';

-- [2] cc/apply (5201 bytes, 1 sections, 6 images)
-- Source: http://www.koist.kr/cc/application
UPDATE dep_pages
   SET content = '<ul class="process" data-aos="fade-up">
     <li>
         <img src="/api/images/legacy/sh_page/img/p39_step1.png" alt="평가 문의" loading="lazy" decoding="async">
         <span>step 01</span>
            <p>평가 문의</p>
        </li>
     <li>
         <img src="/api/images/legacy/sh_page/img/p39_step2.png" alt="평가 신청" loading="lazy" decoding="async">
         <span>step 02</span>
            <p>평가 신청</p>
        </li>
     <li>
         <img src="/api/images/legacy/sh_page/img/p39_step3.png" alt="평가 계약 체결" loading="lazy" decoding="async">
         <span>step 03</span>
            <p>평가 계약 체결</p>
        </li>
     <li>
         <img src="/api/images/legacy/sh_page/img/p39_step4.png" alt="제출물 설명회 개최" loading="lazy" decoding="async">
         <span>step 04</span>
            <p>제출물 설명회 개최</p>
        </li>
     <li>
         <img src="/api/images/legacy/sh_page/img/p39_step5.png" alt="평가 진행" loading="lazy" decoding="async">
         <span>step 05</span>
            <p>평가 진행</p>
        </li>
     <li>
         <img src="/api/images/legacy/sh_page/img/p39_step6.png" alt="인증서 발급" loading="lazy" decoding="async">
         <span>step 06</span>
            <p>인증서 발급</p>
        </li>
    </ul>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">평가 신청시 준비사항</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>제출물 1부</li>
                <li>평가신청서</li>
                <li>개인정보 수집·이용 및 제3자 제공 동의서</li>
                <li>정보 공개 동의서</li>
            </ul></div>
</section>
    <p class="ps" data-aos="fade-up">※국내용, 국제용의 평가제출물이 일부 상이함</p>
 <div class="flex" data-aos="fade-up">
   <div>
            <dl>
                <dt>국내용</dt>
                <dd>제출물 검토 및 평가<br />제품 사전 점검 수행</dd>
            </dl>
            <table cellpadding="0" cellspacing="0" summary="CC평가 신청방법">
            <caption class="sound_only">CC평가 신청방법</caption>
              <tr>
                <th colspan="2" scope="col">평가제출물</th>
              </tr>
              <tr>
                <td>EAL1</td>
                <td>
                    <ul>
                        <li>TOE(평가 제품)</li>
                        <li>보안목표명세서(ST)</li>
                        <li>사용자 운용 설명서</li>
                        <li>준비절차서</li>
                        <li>형상관리문서</li>
                    </ul>
                </td>
              </tr>
              <tr>
                <td>EAL2</td>
                <td>
                 <ul>
                        <li>EAL1 제출물</li>
                        <li>TOE설계서</li>
                        <li>배포문서</li>
                        <li>시험서</li>
                        <li>취약성 분석서</li>
     <ul>
                </td>
              </tr>
              <tr>
                <td>EAL3</td>
                <td>
                 <ul>
                        <li>EAL2 제출물</li>
                        <li>생명주기모델정의문서</li>
                        <li>개발보안문서</li>
     </ul>
                </td>
              </tr>
              <tr>
                <td>EAL4</td>
                <td>
                 <ul>
                        <li>EAL3 제출물</li>
                        <li>구현검증명세서</li>
                        <li>개발도구 문서</li>
     </ul>
                </td>
              </tr>
            </table>
        </div>
   <div>
            <dl>
                <dt>국제용</dt>
                <dd>제출물 검토</dd>
            </dl>
            <table cellpadding="0" cellspacing="0" summary="CC평가 신청방법">
            <caption class="sound_only">CC평가 신청방법</caption>
              <tr>
                <th colspan="2" scope="col">평가제출물</th>
              </tr>
              <tr>
                <td>EAL1</td>
                <td>
                    <ul>
                        <li>TOE(평가 제품)</li>
                        <li>보안목표명세서(ST)</li>
                        <li>기능명세서</li>
                        <li>사용자 운용 설명서</li>
                        <li>준비절차서</li>
                        <li>형상관리문서</li>
                    </ul>
                </td>
              </tr>
              <tr>
                <td>EAL2</td>
                <td>
                 <ul>
                        <li>EAL1 제출물</li>
                        <li>보안 아키텍쳐 설명서</li>
                        <li>TOE설계서</li>
                        <li>배포문서</li>
                        <li>시험서</li>
     <ul>
                </td>
              </tr>
              <tr>
                <td>EAL3</td>
                <td>
                 <ul>
                        <li>EAL2 제출물</li>
                        <li>개발보안문서</li>
                        <li>생명주기모델정의문서</li>
     </ul>
                </td>
              </tr>
              <tr>
                <td>EAL4</td>
                <td>
                 <ul>
                        <li>EAL3 제출물</li>
                        <li>구현검증명세서</li>
                        <li>개발도구 문서</li>
     </ul>
                </td>
              </tr>
              <tr>
                <td>EAL5 ~</td>
                <td>
                 <ul>
                        <li>EAL4 제출물</li>
                        <li>TSF 내부설계서</li>
     </ul>
                </td>
              </tr>
            </table>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'cc')
   AND slug = 'apply';

-- [3] cc/consulting (897 bytes, 1 sections, 0 images)
-- Source: http://www.koist.kr/cc/consulting
UPDATE dep_pages
   SET content = '<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">주요서비스</h3>
  <div class="service-section-body"><ul class="service-bullets">
             <li>
                 평가제출물 작성 방법 교육
                 <p>업무 담당자를 대상으로 평가제출물 작성 교육 진행</p>
                </li>
             <li>
                 평가제출물 작성 가이드
                 <p>평가제출물 작성은 신청기관이 직접 수행하며, 작성된 평가 제출물에 대한 검토 의견 제공</p>
                </li>
             <li>
                 개발환경 보안점검 가이드
                 <p>개발환경 보안점검을 위한 내부 절차, 보안 대책 수립, 기타 보완 사항에 대한 의견 제공</p>
                </li>
             <li>
                 보안요구사항 해석 및 인증제도 가이드
                 <p>제품유형 별 정의된 국가용 보안요구사항에 대한 상세해석 및 인증 제도 가이드</p>
                </li>
             <li>
                 제품 주요 이슈 점검
                 <p>평가과정에서 발생할 수 있는 주요 결함에 대한 점검 및 보완사항 가이드</p>
                </li>
            </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'cc')
   AND slug = 'consulting';

-- [4] cc/progress (21584 bytes, 0 sections, 0 images)
-- Source: http://www.koist.kr/cc_progress
UPDATE dep_pages
   SET content = '<div class="tbl_tit">CC평가 현황</div>

<div id="sh_bo_list">


    <div class="list_top">
          <fieldset id="sh_bo_sch">
            <legend>게시물 검색</legend>
            <form name="fsearch" method="get">
            <input type="hidden" name="bo_table" value="cc_progress">
            <input type="hidden" name="sca" value="">
            <input type="hidden" name="sop" value="and">
            <label for="sfl" class="sound_only">검색대상</label>
            <select name="sfl" id="sfl">
                <option value="wr_subject">제품명</option>
                <option value="wr_3">보증등급</option>
                <option value="wr_9">인증구분</option>
                <option value="wr_10">신청구분</option>
                <option value="wr_8">진행상태</option>
                            </select>
            <label for="stx" class="sound_only">검색어<strong class="sound_only"> 필수</strong></label>
            <input type="text" name="stx" value="" required id="stx" class="sch_input" size="25" maxlength="20">
            <input type="image" src="/img/sh_search.png" alt="검색" name="submit" value="submit" />
            </form>
        </fieldset>
    </div>

    <form name="fboardlist" id="fboardlist" action="./board_list_update.php" onsubmit="return fboardlist_submit(this);" method="post">
        <input type="hidden" name="bo_table" value="cc_progress">
        <input type="hidden" name="sfl" value="">
        <input type="hidden" name="stx" value="">
        <input type="hidden" name="spt" value="">
        <input type="hidden" name="sca" value="">
        <input type="hidden" name="sst" value="wr_num, wr_reply">
        <input type="hidden" name="sod" value="">
        <input type="hidden" name="page" value="1">
        <input type="hidden" name="sw" value="">

        <div id="sh_list_tbl" class="sh_tbl_common">
            <table cellpadding="0" cellspacing="0">
                <caption class="sound_only">평가현황 목록</caption>
                <thead>
                    <tr>
                                                                            <th width="203" scope="col">제품명</th>

                            <th width="41" scope="col">보증등급</th>
                            <th width="46" scope="col">인증구분</th>
                            <th width="46" scope="col">신청구분</th>
                            <th width="52" scope="col">진행상태</th>
                                            </tr>
                </thead>
                <tbody>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                NetSpliter V4.0                                                                    </div>
                                                    </td>
                                                    <td  >EAL2</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                <span style="color:#69C; font-weight:bold">평가진행</span>                                                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                Chakra Max SAC v4.5                                                                    </div>
                                                    </td>
                                                    <td  >EAL3</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                TESS TMS Plus V1.0                                                                    </div>
                                                    </td>
                                                    <td  >EAL4</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                Alpha DBGuard V2.1                                                                    </div>
                                                    </td>
                                                    <td  >EAL1+</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                                                <span style="color:#333; font-weight:bold">국제평가</span>                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                Chakra Max v4.5                                                                    </div>
                                                    </td>
                                                    <td  >EAL4</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                TESS AIRTMS V5.0                                                                    </div>
                                                    </td>
                                                    <td  >EAL4</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                TA-PRS(Top Aegis Patch and Remediation System) V6.1                                                                    </div>
                                                    </td>
                                                    <td  >EAL2</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                AxioVPN V2.0                                                                    </div>
                                                    </td>
                                                    <td  >EAL4</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                LANKeeper V4.0                                                                    </div>
                                                    </td>
                                                    <td  >EAL2</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                DBSAFER AM V7.0                                                                    </div>
                                                    </td>
                                                    <td  >EAL3</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                ACRA Point V3                                                                    </div>
                                                    </td>
                                                    <td  >EAL2</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                SpamSniper V6.2                                                                    </div>
                                                    </td>
                                                    <td  >EAL2</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                DBSAFER Enterprise V5.0 R2                                                                    </div>
                                                    </td>
                                                    <td  >EAL4</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                DBSAFER AM V5.0                                                                    </div>
                                                    </td>
                                                    <td  >EAL2</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                WeGuardia™ ITM V1.0                                                                    </div>
                                                    </td>
                                                    <td  >EAL4</span></td>
                            <td  >
                                <span style="color:#999; font-weight:bold">최초평가</span>                                                            </td>
                            <td  >
                                <span style="color:#999; font-weight:bold">국내평가</span>                                                            </td>
                            <td  >
                                                                                                                                                                <span style="color:#69C; font-weight:bold">평가완료</span>                            </td>
                                        </tr>
                                                        </tbody>
            </table>
        </div>
        <nav class="pg_wrap"><span class="pg"><span class="sound_only">열린</span><strong class="pg_current">1</strong><span class="sound_only">페이지</span>
<a href="http://www.koist.kr/cc_progress?page=2" class="pg_page">2<span class="sound_only">페이지</span></a>
<a href="http://www.koist.kr/cc_progress?page=3" class="pg_page">3<span class="sound_only">페이지</span></a>
<a href="http://www.koist.kr/cc_progress?page=4" class="pg_page">4<span class="sound_only">페이지</span></a>
<a href="http://www.koist.kr/cc_progress?page=5" class="pg_page">5<span class="sound_only">페이지</span></a>
<a href="http://www.koist.kr/cc_progress?page=6" class="pg_page">6<span class="sound_only">페이지</span></a>
<a href="http://www.koist.kr/cc_progress?page=7" class="pg_page">7<span class="sound_only">페이지</span></a>
<a href="http://www.koist.kr/cc_progress?page=8" class="pg_page">8<span class="sound_only">페이지</span></a>
<a href="http://www.koist.kr/cc_progress?page=9" class="pg_page">9<span class="sound_only">페이지</span></a>
<a href="http://www.koist.kr/cc_progress?page=10" class="pg_page">10<span class="sound_only">페이지</span></a>
<a href="http://www.koist.kr/cc_progress?page=10" class="pg_page pg_end">맨끝</a>
</span></nav>
        <div class="btn_area">
            <ul class="adm_btns">
                                                            </ul>
                    </div>

    </form>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'cc')
   AND slug = 'progress';

-- [5] security-test/overview (7842 bytes, 5 sections, 1 images)
-- Source: http://www.koist.kr/test1/summary
UPDATE dep_pages
   SET content = '<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">개요</h3>
  <div class="service-section-body"><ul class="service-bullets">
             <li>보안적합성 검증은 국가정보통신망의 보안수준 제고를 위해 국가·공공기관이 도입하는 정보보보시스템·네트워크 장비 등 보안기능이 탑재된 IT 제품의 안전성을 검증하는 제도</li>
                <li>보안기능 확인서 제도는 공인된 시험기관으로부터 ‘국가용 보안요구사항’ 만족 여부를 검증 후 보안적합성 검증절차를 생략하기 위한 제도</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">보안기능 확인서 법적근거</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>「국가정보원법」 제4조 / 「전자정부법」 제56조 / 「사이버안보업무규정」 제9조 / 「전자정부법 시행령」 제69조</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">보안기능 확인서 발급체계</h3>
  <div class="service-section-body"><figure class="service-image"><img src="/api/images/legacy/sh_page/img/p43_img.png" alt="발급체계" loading="lazy" decoding="async"></figure></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">보안기능 확인서 발급대상 제품</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>네트워크 장비(L3 이상 스위치, 라우터, SDN 포함)</li>
                <li>정보보호 시스템(국내용 CC인증 및 국가용 PP 인증을 보유한 제품 포함)</li>
                <li>‘모바일 보안제품’ 등의 일부 제품은 발급 대상에서 제외됩니다.</li>
            </ul>
            <table cellspacing="0" cellpadding="0" data-aos="fade-up">
                <thead>
                    <tr>
                        <th rowspan="2">제품군</th>
                        <th colspan="2">국가용 보안요구사항</th>
                    </tr>
                    <tr>
                        <th>제품단위 보안요구사항</th>
                        <th>적용되는 공통보안요구사항</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th rowspan="5">침입차단제품군</th>
                    </tr>
                    <tr>
                        <td>침입차단시스템 보안요구사항</td>
                        <td>서버 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <td>웹 방화벽 보안요구사항</td>
                        <td>서버 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <td>DDoS 대응장비 보안요구사항</td>
                        <td>서버 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <td>인터넷전화 보안제품 보안요구사항</td>
                        <td>서버 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <th rowspan="3">침입방지 제품군</th>
                    </tr>
                    <tr>
                        <td>침입방지시스템 보안요구사항</td>
                        <td>서버 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <td>무선 침입방지시스템 보안요구사항</td>
                        <td>서버 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <th rowspan="5">구간보안 제품군</th>
                    </tr>
                    <tr>
                        <td>가상사설망제품 보안요구사항</td>
                        <td>서버+<span>엔드포인트(해당시)</span> 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <td>네트워크 접근통제제품 보안요구사항</td>
                        <td>서버+엔드포인트 보안요구사항</td>
                    </tr>
                    <tr>
                        <td>망간 자료전송제품 보안요구사항</td>
                        <td>서버+<span>엔드포인트(해당시)</span> 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <td>무선랜 인증제품 보안요구사항</td>
                        <td>서버+엔드포인트 보안요구사항</td>
                    </tr>
                    <tr>
                        <th rowspan="5">전송자료보안 제품군</th>
                    </tr>
                    <tr>
                        <td>스팸메일차단시스템 보안요구사항</td>
                        <td>서버 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <td>소프트웨어 기반 보안USB제품 보안요구사항</td>
                        <td>서버+엔드포인트 보안요구사항</td>
                    </tr>
                    <tr>
                        <td>호스트 자료유출방지제품 보안요구사항</td>
                        <td>서버+엔드포인트 보안요구사항</td>
                    </tr>
                    <tr>
                        <td>네트워크 자료유출 방지제품  보안요구사항</td>
                        <td>서버 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <th rowspan="7">보안관리 제품군</th>
                    </tr>
                    <tr>
                        <td>통합보안관리제품 보안요구사항</td>
                        <td>서버+<span>엔드포인트(해당시)</span> 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <td>소스코드 보안약점 분석도구 보안요구사항</td>
                        <td>적용하지 않음</td>
                    </tr>
                    <tr>
                        <td>패치관리시스템 보안요구사항</td>
                        <td>서버+엔드포인트 보안요구사항</td>
                    </tr>
                    <tr>
                        <td>DB접근통제제품 보안요구사항</td>
                        <td>서버+<span>엔드포인트(해당시)</span> 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <td>시스템접근관리제품 보안요구사항</td>
                        <td>서버+<span>엔드포인트(해당시)</span> 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <td>패스워드관리제품 보안요구사항</td>
                        <td>적용하지 않음</td>
                    </tr>
                    <tr>
                        <th>가상화 제품군</th>
                        <td>가상화관리제품 보안요구사항</td>
                        <td>서버+엔드포인트 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <th rowspan="4">엔드포인트보안 제품군</th>
                    </tr>
                    <tr>
                        <td>안티바이러스제품 보안요구사항</td>
                        <td><span>서버(해당시)</span>+엔드포인트 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <td>스마트폰 보안관리제품 보안요구사항</td>
                        <td>서버 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <td>운영체제(서버) 접근통제제품 보안요구사항</td>
                        <td>서버+엔드포인트 공통보안요구사항</td>
                    </tr>
                    <tr>
                        <th rowspan="4">네트워크 장비</th>
                    </tr>
                    <tr>
                        <td>스위치·라우터 보안요구사항</td>
                        <td>적용하지 않음</td>
                    </tr>
                    <tr>
                        <td>SDN 컨트롤러 보안요구사항</td>
                        <td>적용하지 않음</td>
                    </tr>
                    <tr>
                        <td>SDN 스위치 보안요구사항</td>
                        <td>적용하지 않음</td>
                    </tr>
                </tbody>
            </table></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">보안기능 확인서 유효기간</h3>
  <div class="service-section-body"><table class="tbl2" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th>제품 단위 보안요구사항</th>
                        <th>공통 보안요구사항</th>
                        <th>유효기간</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>국가용 보안요구사항</td>
                        <td>공통보안요구사항 V3.0</td>
                        <td>5년</td>
                    </tr>
                    <tr>
                        <td>일반 보안요구사항</td>
                        <td>공통보안요구사항 V3.0</td>
                        <td>5년</td>
                    </tr>
                     <tr>
                        <td colspan="2">구현 명세서 적용</td>
                        <td>2년</td>
                    </tr>
                </tbody>
            </table></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'security-test')
   AND slug = 'overview';

-- [6] security-test/apply (3011 bytes, 2 sections, 1 images)
-- Source: http://www.koist.kr/test1/application
UPDATE dep_pages
   SET content = '<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">신청 절차</h3>
  <div class="service-section-body"><p class="ps">※ 국내용 CC인증을 획득한 제품의 경우 보안기능 시험의 생략이 가능함</p>
         <img src="/api/images/legacy/sh_page/img/p44_img.jpg" class="prcs_img" alt="신청 절차" loading="lazy" decoding="async"></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 신청
        제출물</h3>
  <div class="service-section-body"><table cellpadding="0" cellspacing="0">
             <colgroup><col width="" /><col width="40%" /><col width="40%" /></colgroup>
                <tbody>
                    <tr>
                        <th rowspan="4">신청서식</th>
                    </tr>
                    <tr>
                        <td>보안기능 시험 신청서</td>
                        <td>신청 제품의 보안기능 시험을 위해 신청 업체가 작성, 시험기관에 제출하는 문서입니다.</td>
                    </tr>
                    <tr>
                        <td>신청기관 준수사항 확인서</td>
                        <td>보안기능 확인서 발급 절차 준수, 발급 제품의 사후 관리 등의 역할을 수행할 것을 확인하는 문서입니다.</td>
                    </tr>
                    <tr>
                        <td>취약점 개선 보증 서약서</td>
                        <td>발급 신청 제품의 보안기능 및 취약점 개선결과를 보증하는 문서입니다.</td>
                    </tr>
                    <tr>
                        <th rowspan="7">제출문서</th>
                    </tr>
                    <tr>
                        <td>제품설명서<br>(‘사용자운영설명서’ 및 ‘준비절차서‘ 대체 가능)</td>
                        <td>관리자·사용자가 신청 제품을 목적에 맞게 활용할 수 있도록 운용방법을 기술한 문서입니다.
                         ex) 제품 구성요소 정의, 하드웨어 사양, 운용 환경 등 </td>
                    </tr>
                    <tr>
                        <td>보안기능 구현명세서<br>(TOE 설계서 대체 가능)</td>
                        <td>시험기관이 신청 제품에 구현된 보안기능을 최대한 이해할 수 있도록 구현ㆍ동작 등의 상세한 사항이 기재된 문서입니다.
                         - 시험원이 제품에 구현된 보안기능 및 동작방식이 충분하게 이해될 수 있는 수준으로 작성 필요</td>
                    </tr>
                    <tr>
                        <td>보안기능 운용 설명서<br>(‘사용자운영설명서’ 및 ‘준비절차서‘ 대체 가능)</td>
                        <td>제품의 모든 보안기능의 설정, 운용 절차 및 방법 등을 기재한 문서입니다. </td>
                    </tr>
                    <tr>
                        <td>자체 시험결과 보고서<br>(‘시험서’ 대체 가능)</td>
                        <td>신청 업체가 사전에 ‘국가용 보안요구사항’ 또는 ‘일반 보안요구사항’에 따라 제품의 보안기능을 시험하고, 그 결과를 기재한 문서입니다.</td>
                    </tr>
                    <tr>
                        <td>취약점 개선 내역서<br>(‘취약점 분석서’ 대체 가능)</td>
                        <td>사전에 제품의 보안성을 제고하고 시험중 발견된 취약점 보완으로 인한 시험·발급 지체를 방지하기 위해 신청 제품의 취약점 개선을 기술한 문서입니다.
                         ex) 제품 또는 제품에 포함된 소프트웨어의 CVE 취약점, KISA 홈페이지에 공개된 취약점 중 신청 제품에 해당하는 취약점 등 </td>
                    </tr>
                    <tr>
                        <td>설치 패키지 및 해시값</td>
                        <td>신청 제품의 펌웨어/소프트웨어 및 해시값을 시험기관에 제출합니다.</td>
                    </tr>
                </tbody>
            </table>
          <p class="ps">※ 각 문서에 대한 세부 내용은 시험기관 문의 또는 보안기능 확인서 발급절차 안내 참조</p></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'security-test')
   AND slug = 'apply';

-- [7] security-test/progress (17426 bytes, 0 sections, 0 images)
-- Source: http://www.koist.kr/test1_progress
UPDATE dep_pages
   SET content = '<div class="tbl_tit">보안기능 시험 현황</div>

<div id="sh_bo_list">


    <div class="list_top">
          <fieldset id="sh_bo_sch">
            <legend>게시물 검색</legend>
            <form name="fsearch" method="get">
            <input type="hidden" name="bo_table" value="test1_progress">
            <input type="hidden" name="sca" value="">
            <input type="hidden" name="sop" value="and">
            <label for="sfl" class="sound_only">검색대상</label>
            <select name="sfl" id="sfl">
                <option value="wr_subject">제품명</option>
                <option value="wr_3">제품 유형</option>
                <option value="wr_10">발급 유형</option>
                <option value="wr_9">신청구분</option>
                <option value="wr_8">진행상태</option>
            </select>
            <label for="stx" class="sound_only">검색어<strong class="sound_only"> 필수</strong></label>
            <input type="text" name="stx" value="" required id="stx" class="sch_input" size="25" maxlength="20">
            <input type="image" src="/img/sh_search.png" alt="검색" name="submit" value="submit" />
            </form>
        </fieldset>
    </div>

    <form name="fboardlist" id="fboardlist" action="./board_list_update.php" onsubmit="return fboardlist_submit(this);" method="post">
        <input type="hidden" name="bo_table" value="test1_progress">
        <input type="hidden" name="sfl" value="">
        <input type="hidden" name="stx" value="">
        <input type="hidden" name="spt" value="">
        <input type="hidden" name="sca" value="">
        <input type="hidden" name="sst" value="wr_num, wr_reply">
        <input type="hidden" name="sod" value="">
        <input type="hidden" name="page" value="1">
        <input type="hidden" name="sw" value="">

        <div id="sh_list_tbl" class="sh_tbl_common">
            <table cellpadding="0" cellspacing="0">
                <caption class="sound_only">시험현황 목록</caption>
                <thead>
                    <tr>
                                                                            <th scope="col">제품명</th>

                            <th scope="col" width="15%">제품 유형</th>
                            <th scope="col">발급 유형</th>
                            <th scope="col">신청구분</th>
                            <th scope="col">진행상태</th>
                                            </tr>
                </thead>
                <tbody>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                sDetector v1.0                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#46afdb;">정보보호시스템</td>

                                                            <td>기본시험</td>
                                <td>최초신청</td>
                                <td>
                                                                        <span style="color:#333; font-weight:bold">시험진행</span>                                                                    </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                SubGATE V5.2                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#e8180c;">네트워크장비</td>

                                                            <td>기본시험</td>
                                <td>최초신청</td>
                                <td>
                                                                        <span style="color:#333; font-weight:bold">시험진행</span>                                                                    </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                MESIM mHUB V3.0                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#46afdb;">정보보호시스템</td>

                                                            <td>기본시험</td>
                                <td>최초신청</td>
                                <td>
                                                                        <span style="color:#333; font-weight:bold">시험진행</span>                                                                    </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                S-Work V3.1                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#46afdb;">정보보호시스템</td>

                                                            <td>기본시험</td>
                                <td>최초신청</td>
                                <td>
                                                                        <span style="color:#333; font-weight:bold">시험진행</span>                                                                    </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                OS6870 Series_8.10.112.R02                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#e8180c;">네트워크장비</td>

                                                            <td>기본시험</td>
                                <td>최초신청</td>
                                <td>
                                                                                                            <span style="color:#69C; font-weight:bold">발급완료</span>                                </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                OS6560/6560E Series_8.10.105.R02                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#e8180c;">네트워크장비</td>

                                                            <td>기본시험</td>
                                <td>최초신청</td>
                                <td>
                                                                                                            <span style="color:#69C; font-weight:bold">발급완료</span>                                </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                OS9900 Series_8.10.106.R02                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#e8180c;">네트워크장비</td>

                                                            <td>기본시험</td>
                                <td>최초신청</td>
                                <td>
                                                                                                            <span style="color:#69C; font-weight:bold">발급완료</span>                                </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                OS6900 Series_8.10.105.R02                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#e8180c;">네트워크장비</td>

                                                            <td>기본시험</td>
                                <td>최초신청</td>
                                <td>
                                                                                                            <span style="color:#69C; font-weight:bold">발급완료</span>                                </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                SecureDesk v3.5                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#46afdb;">정보보호시스템</td>

                                                            <td>간소화 발급</td>
                                <td>최초신청</td>
                                <td>
                                                                                                            <span style="color:#69C; font-weight:bold">발급완료</span>                                </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                Privacy-i V8.0                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#46afdb;">정보보호시스템</td>

                                                            <td>간소화 발급</td>
                                <td>최초신청</td>
                                <td>
                                                                                                            <span style="color:#69C; font-weight:bold">발급완료</span>                                </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                TA-FDM V2.2                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#46afdb;">정보보호시스템</td>

                                                            <td>간소화 발급</td>
                                <td>최초신청</td>
                                <td>
                                                                                                            <span style="color:#69C; font-weight:bold">발급완료</span>                                </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                지오티_보안스위치_시리즈_V7.0.3                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#e8180c;">네트워크장비</td>

                                                            <td>간소화 발급</td>
                                <td>최초신청</td>
                                <td>
                                                                                                            <span style="color:#69C; font-weight:bold">발급완료</span>                                </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                ETK-5000 Series (v2.dev-250928.23.2257)                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#e8180c;">네트워크장비</td>

                                                            <td>간소화 발급</td>
                                <td>최초신청</td>
                                <td>
                                                                                                            <span style="color:#69C; font-weight:bold">발급완료</span>                                </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                NUC92B_Series_V100R006B07D002-r111                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#e8180c;">네트워크장비</td>

                                                            <td>간소화 발급</td>
                                <td>최초신청</td>
                                <td>
                                                                                                            <span style="color:#69C; font-weight:bold">발급완료</span>                                </td>
                                            </tr>
                                        <tr class="">

                        <td class="subject">
                                                            <div>

                                                                                UBI SAFER-PSM V3.0                                                                    </div>
                                                    </td>
                                                    <td class="td_date" style="text-align: center; color:#46afdb;">정보보호시스템</td>

                                                            <td>간소화 발급</td>
                                <td>최초신청</td>
                                <td>
                                                                                                            <span style="color:#69C; font-weight:bold">발급완료</span>                                </td>
                                            </tr>
                                                        </tbody>
            </table>
        </div>
        <nav class="pg_wrap"><span class="pg"><span class="sound_only">열린</span><strong class="pg_current">1</strong><span class="sound_only">페이지</span>
<a href="http://www.koist.kr/test1_progress?page=2" class="pg_page">2<span class="sound_only">페이지</span></a>
<a href="http://www.koist.kr/test1_progress?page=3" class="pg_page">3<span class="sound_only">페이지</span></a>
<a href="http://www.koist.kr/test1_progress?page=4" class="pg_page">4<span class="sound_only">페이지</span></a>
<a href="http://www.koist.kr/test1_progress?page=5" class="pg_page">5<span class="sound_only">페이지</span></a>
<a href="http://www.koist.kr/test1_progress?page=5" class="pg_page pg_end">맨끝</a>
</span></nav>
        <div class="btn_area">
            <ul class="adm_btns">
                                                            </ul>
                    </div>

    </form>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'security-test')
   AND slug = 'progress';

-- [8] kcmvp/overview (2468 bytes, 5 sections, 1 images)
-- Source: http://www.koist.kr/cryptomodtest/overview
UPDATE dep_pages
   SET content = '<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">개요</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>국가ㆍ공공기관에서 도입하는 암호모듈의 안전성과 구현적합성을 시험ㆍ검증</li>
                <li>암호모듈이란 암호알고리즘을 소프트웨어, 하드웨어, 펌웨어 또는 이를 조합한 형태로 구현한 것으로 정보보호시스템, 암호장치, 보안기능이 있는 정보통신기기에 적용되는 장치나 수단</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">법적근거</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>전자정부법 제56조(정보통신망 등의 보안대책 수립ㆍ시행) 제3항</li>
                <li>전자정부법 시행령 제69조(전자문서의 보관ㆍ유통 관련 보안조치)</li>
                <li>사이버안보 업무규정 제9조(사이버보안 예방 조치 등)</li>
                <li>암호모듈 시험 및 검증지침(국가정보원)</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">암호모듈 시험ㆍ검증기준</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>KS X ISO/IEC 19790 암호모듈 보안 요구사항</li>
                <li>KS X ISO/IEC 24759 암호모듈 시험 요구사항</li>
                <li>암호모듈 구현안내서 Part 1 시험 및 구현 사례별 해설서(GVI Part 1)</li>
                <li>암호모듈 구현안내서 Part 2 검증대상 암호알고리즘 구현안내서(GVI Part 2)</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">암호모듈 시험ㆍ검증체계</h3>
  <div class="service-section-body"><figure class="service-image"><img src="/api/images/legacy/sh_page/img/p70_img.png" alt="시험ㆍ검증 체계" loading="lazy" decoding="async"></figure>
            <section class="service-section" data-koist-block="section-numbered">

  <ol class="service-steps">
    <li class="service-step"><strong class="service-step-num">1.</strong> 신청기관은 암호모듈 등 제출물을 준비하여 한국정보보안기술원(KOIST)에 시험 신청</li>
    <li class="service-step"><strong class="service-step-num">2.</strong> 한국정보보안기술원(KOIST)은 신청서 및 제출물 검토 후 시험 계약 체결</li>
    <li class="service-step"><strong class="service-step-num">3.</strong> 한국정보보안기술원은 시험 수행을 완료한 후 검증기관에 시험 결과 보고</li>
    <li class="service-step"><strong class="service-step-num">4.</strong> 검증기관은 암호모듈 시험결과를 검토하고 검증위원회를 통해 결과 심의 의결</li>
    <li class="service-step"><strong class="service-step-num">5.</strong> 검증기관은 암호모듈 시험ㆍ검증 결과를 한국정보보안기술원(KOIST)에 통보</li>
    <li class="service-step"><strong class="service-step-num">6.</strong> 검증기관은 검증이 완료된 암호모듈을 검증필 암호모듈 목록에 등재</li>
  </ol>
</section></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'kcmvp')
   AND slug = 'overview';

-- [9] kcmvp/apply (3342 bytes, 3 sections, 9 images)
-- Source: http://www.koist.kr/cryptomodtest/howto
UPDATE dep_pages
   SET content = '<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">암호모듈 시험ㆍ검증절차</h3>
  <div class="service-section-body"><ul class="process">
                <li>
                    <img src="/api/images/legacy/sh_page/img/p71_step1.png" alt="시험 문의" loading="lazy" decoding="async">
                    <span>step 01</span>
                    <p>시험 문의</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p71_step2.png" alt="시험 신청" loading="lazy" decoding="async">
                    <span>step 02</span>
                    <p>시험 신청</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p71_step3.png" alt="제출물 검토" loading="lazy" decoding="async">
                    <span>step 03</span>
                    <p>제출물 검토</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p71_step4.png" alt="시험 계약" loading="lazy" decoding="async">
                    <span>step 04</span>
                    <p>시험 계약</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p71_step5.png" alt="시험 수행" loading="lazy" decoding="async">
                    <span>step 05</span>
                    <p>시험 수행</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p71_step6.png" alt="시험결과 보고" loading="lazy" decoding="async">
                    <span>step 06</span>
                    <p>시험결과 보고</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p71_step7.png" alt="검증위원회 심의" loading="lazy" decoding="async">
                    <span>step 07</span>
                    <p>검증위원회 심의</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p71_step8.png" alt="심의결과 통보" loading="lazy" decoding="async">
                    <span>step 08</span>
                    <p>심의결과 통보</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p71_step9.png" alt="검증필 암호모듈 등재" loading="lazy" decoding="async">
                    <span>step 09</span>
                    <p>검증필 암호모듈 등재</p>
                </li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 신청</h3>
  <div class="service-section-body"><section class="service-section" data-koist-block="section-numbered">
  <h3 class="service-section-title">암호모듈 시험신청서 / 암호모듈 시험 제출물</h3>
  <ol class="service-steps">
    <li class="service-step"><strong class="service-step-num">1.</strong> 기본 및 상세설계서</li>
    <li class="service-step"><strong class="service-step-num">2.</strong> 형상관리문서</li>
    <li class="service-step"><strong class="service-step-num">3.</strong> 시험서</li>
    <li class="service-step"><strong class="service-step-num">4.</strong> 암호모듈</li>
    <li class="service-step"><strong class="service-step-num">5.</strong> 소스코드</li>
    <li class="service-step"><strong class="service-step-num">6.</strong> 테스트 프로그램</li>
    <li class="service-step"><strong class="service-step-num">7.</strong> 암호알고리즘 구현적합성 자동화 시험 결과</li>
  </ol>
</section></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'kcmvp')
   AND slug = 'apply';

-- [10] performance/overview (2515 bytes, 4 sections, 1 images)
-- Source: http://www.koist.kr/test2/summary
UPDATE dep_pages
   SET content = '</div>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">정보보호제품 성능평가</h3>
  <div class="service-section-body"><figure class="service-image"><img src="/api/images/legacy/sh_page/img/p50_img.png" alt="" loading="lazy" decoding="async"></figure></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">목적</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>정보보호 기업의 기술력 향상 지원</li>
                <li>정보보호 제품 도입 시 성능이 우수한 제품을 선택할 수 있도록 지원</li>
                <li>검증된 성능평가를 통한 객관성 확보를 통해 성능중심으로 정보보호산업 체질 개선 추진</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">법적근거</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>정보보호산업의 진흥에 관한 법률 제17조(성능평가 지원)</li>
                <li>정보보호산업의 진흥에 관한 법률 시행령 제10조(성능평가의 방법 및 성능평가기관의 지정)</li>
                <li>정보통신망 이용촉진 및 정보보호 등에 관한 법률 제 52조(한국인터넷진흥원)</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">정보보호제품
        성능평가
        가능제품</h3>
  <div class="service-section-body"><table cellpadding="0" cellspacing="0">
              <tr>
                <th>분류</th>
                <th colspan="2">목록</th>
              </tr>
              <tr>
                <td>정보보안</td>
                <td>정보보호제품<br />
                  (네트워크/시스템 보안)</td>
                <td>- 소스코드 보안약점 분석도구 ★ <br />
                  - DDoS 대응장비 ★<br />
                  - 안티바이러스 제품(Windows) ★ <br />
                  - 안티바이러스 제품(Linux) ★<br />
                  - 안티바이러스 제품(Mobile)<br />
                  - 안티바이러스 제품(모듈형) <br />
                  - 단말 이상행위 탐지 및 대응(EDR)<br />
                  - 네트워크 방화벽 <br />
                  - APT 대응장비<br />
                  - 침입방지시스템(IPS) <br />
                  - 웹방화벽(WAF) <br />
                  - 차세대방화벽(NGFW) <br />
                  - 가상사설망(IPSec VPN, SSL VPN)<br />
                  - 네트워크 자료유출방지 제품(NDLP)</td>
              </tr>
            </table>
            <div class="ps">
                ※ 4종(DDoS 대응장비, 안티바이러스 제품(Windows, Linux), 소스코드 보안약점 분석도구)의 경우 ''보안적합성 검증체계''에서 분류하는 검증 대상(국가·공공기관)의 가,나,다 그룹 모두 도입 가능이 외 10종 제품도 ''보안적합성 검증체계'' 분류의 검증 대상 나, 다 그룹에 도입 가능<br />
                ※ 모듈형 안티바이러스 제품은 국가∙공공기관에 도입되는 망간자료전송제품 및 스팸메일차단시스템의 악성코드 검사 시 연동이 요구되는 제품군임
            </div></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'performance')
   AND slug = 'overview';

-- [11] performance/procedure (4535 bytes, 7 sections, 4 images)
-- Source: http://www.koist.kr/test2/application
UPDATE dep_pages
   SET content = '<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">성능평가 절차</h3>
  <div class="service-section-body"><ul class="process">
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step1.png" alt="시험 준비" loading="lazy" decoding="async">
                    <span>step 01</span>
                    <p>평가 준비</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step2.png" alt="신청 및 계약" loading="lazy" decoding="async">
                    <span>step 02</span>
                    <p>신청 및 계약</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step3.png" alt="시험 수행" loading="lazy" decoding="async">
                    <span>step 03</span>
                    <p>성능평가 수행</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step4.png" alt="성적서 발행" loading="lazy" decoding="async">
                    <span>step 04</span>
                    <p>평가 결과서 발행</p>
                </li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">평가 준비</h3>
  <div class="service-section-body"><ul class="service-bullets">
          <li>
                    제품정보 확인
                    <p>제품 유형, 개발 및 준비 현황</p>
             </li>
                <li>
                     평가 범위 확인
                    <p class="pd">
                        <span>소프트웨어 </span> 소프트웨어 형태 제품의 경우, 평가대상 운영체제 선정<br />
                        <span>제품모델 </span> 하드웨어 일체형 제품의 경우, 평가대상 모델 선정<br />
                        <span>평가항목 </span> 평가항목 중, 선택(옵션) 항목에 대한 포함 여부 확인
                    </p>
             </li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">신청 및 계약</h3>
  <div class="service-section-body"><section class="service-section" data-koist-block="section-numbered">
  <h3 class="service-section-title">성능평가 신청</h3>
  <ol class="service-steps">
    <li class="service-step"><strong class="service-step-num">1.</strong> 정보보호제품 성능평가 신청서</li>
    <li class="service-step"><strong class="service-step-num">2.</strong> 평가 제출물(신청제품(설치파일), 제품 설명서, 사용자 취급 설명서)</li>
    <li class="service-step"><strong class="service-step-num">3.</strong> 보안 취약점 보증 서약서</li>
    <li class="service-step"><strong class="service-step-num">4.</strong> 자체시험서(신청기관 자체적으로 국가용 보안요구사항 준수 여부 확인)</li>
  </ol>
</section>
         <section class="service-section" data-koist-block="section-numbered">
  <h3 class="service-section-title">성능평가 계약</h3>
  <ol class="service-steps">
    <li class="service-step"><strong class="service-step-num">1.</strong> 평가 제출물 검토</li>
    <li class="service-step"><strong class="service-step-num">2.</strong> 평가범위 및 평가항목 협의 및 결정</li>
    <li class="service-step"><strong class="service-step-num">3.</strong> 협의된 평가 범위에 근거하여 평가 견적서 발행 및 계약 진행</li>
  </ol>
</section></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">성능평가 수행</h3>
  <div class="service-section-body"><ul class="service-bullets">
          <li>
                    제출물 설명회
                    <p class="pd"><span>신청기관 </span> 회사/제품 소개 및 제품 시연 준비</p>
             </li>
                <li>
                    평가활동 수행
                    <p class="pd">
                        <span>평가기관 </span> 성능평가 기준에 따른 객관적인 평가활동 수행<br />
                        <span>신청기관 </span> 평가활동을 위한 기술적, 환경적인 부분에 대한 지원 필요제출물의 미비점 및 보완 사항이 발견되는 경우, 제출물 개선활동 수행
                    </p>
             </li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">평가 결과서 발행</h3>
  <div class="service-section-body"><ul class="service-bullets">
          <li>
                    성능평가 결과 확인서
                    <p class="pd">
                        <span>한국인터넷진흥원 </span> 평가 완료된 제품에 대한 기술심의위원회 개최<br />
                     : 기술심의위원회 심의 통과된 정보보호제품에 대해 성능평가 결과 확인서 발급
                    </p>
             </li>
                <li>
                    성능평가 결과 요약서
                    <p class="pd"><span>평가기관 </span> 평가결과에 대한 성능평가 결과 요약서 발급</p>
             </li>
                <li>
                    해쉬값 생성
                    <p class="pd"><span평가기관 </span> 심의 통과된 정보보호제품(형상)에 대한 해쉬값 생성</p>
             </li>
            </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'performance')
   AND slug = 'procedure';

-- [12] performance/progress (7312 bytes, 0 sections, 0 images)
-- Source: http://www.koist.kr/test2_progress
UPDATE dep_pages
   SET content = '<div class="tbl_tit">성능평가 현황</div>

<div id="sh_bo_list">


    <div class="list_top">
          <fieldset id="sh_bo_sch">
            <legend>게시물 검색</legend>
            <form name="fsearch" method="get">
            <input type="hidden" name="bo_table" value="test2_progress">
            <input type="hidden" name="sca" value="">
            <input type="hidden" name="sop" value="and">
            <label for="sfl" class="sound_only">검색대상</label>
            <select name="sfl" id="sfl">
                <option value="wr_subject||wr_8">제품명</option>
                <option value="wr_1">제품유형</option>
                <option value="wr_2">운영체제</option>
                <option value="wr_3">개발사</option>
                <option value="wr_5">발급일</option>
            </select>
            <label for="stx" class="sound_only">검색어<strong class="sound_only"> 필수</strong></label>
            <input type="text" name="stx" value="" required id="stx" class="sch_input" size="25" maxlength="20">
            <input type="image" src="/img/sh_search.png" alt="검색" name="submit" value="submit" />
            </form>
        </fieldset>
    </div>

    <form name="fboardlist" id="fboardlist" action="./board_list_update.php" onsubmit="return fboardlist_submit(this);" method="post">
        <input type="hidden" name="bo_table" value="test2_progress">
        <input type="hidden" name="sfl" value="">
        <input type="hidden" name="stx" value="">
        <input type="hidden" name="spt" value="">
        <input type="hidden" name="sca" value="">
        <input type="hidden" name="sst" value="wr_num, wr_reply">
        <input type="hidden" name="sod" value="">
        <input type="hidden" name="page" value="1">
        <input type="hidden" name="sw" value="">

        <div id="sh_list_tbl" class="sh_tbl_common">
            <table cellpadding="0" cellspacing="0">
                <caption class="sound_only">평가현황 목록</caption>
                <thead>
                    <tr>
                                                                            <th width="133" scope="col" >제품유형</th>
                            <th width="" scope="col" >제품명(모델명)</th>
                            <th width="60" scope="col">운영체제</th>
                            <th width="52" scope="col">개발사</th>
                            <th width="52" scope="col">발급일</th>
                                            </tr>
                </thead>
                <tbody>
                                        <tr class="">
                                                                        <td>소스코드 보안약점 분석도구</td>

                        <td class="subject">
                            <div>

                                <a href="http://www.koist.kr/test2_progress/8">
                                                                        Fortify Enterprise v3.1 (Linux)[]                                </a>
                                                            </div>
                        </td>
                                                        <td>-</td>
                                <td>(주)하로스</td>
                                <td>2022-12-22</td>
                                            </tr>
                                        <tr class="">
                                                                        <td>소스코드 보안약점 분석도구</td>

                        <td class="subject">
                            <div>

                                <a href="http://www.koist.kr/test2_progress/7">
                                                                        Fortify Enterprise v3.1 (Windows)[]                                </a>
                                                            </div>
                        </td>
                                                        <td>-</td>
                                <td>(주)하로스</td>
                                <td>2022-12-22</td>
                                            </tr>
                                        <tr class="">
                                                                        <td>안티바이러스제품(Linux)</td>

                        <td class="subject">
                            <div>

                                <a href="http://www.koist.kr/test2_progress/6">
                                                                        AhnLab V3 Net for Linux Server 3.6 (Linux)[]                                </a>
                                                            </div>
                        </td>
                                                        <td>-</td>
                                <td>(주)안랩</td>
                                <td>2022-12-16</td>
                                            </tr>
                                        <tr class="">
                                                                        <td>안티바이러스 제품  (Mobile)</td>

                        <td class="subject">
                            <div>

                                <a href="http://www.koist.kr/test2_progress/5">
                                                                        OnAV v1.0 (Andriod)[]                                </a>
                                                            </div>
                        </td>
                                                        <td>-</td>
                                <td>(주)시큐리온</td>
                                <td>2022-12-12</td>
                                            </tr>
                                        <tr class="">
                                                                        <td>SSL VPN</td>

                        <td class="subject">
                            <div>

                                <a href="http://www.koist.kr/test2_progress/3">
                                                                        SecuwaySSL U V2.0[]                                </a>
                                                            </div>
                        </td>
                                                        <td>U3000S</td>
                                <td>(주)시큐위즈</td>
                                <td>2021-05-26</td>
                                            </tr>
                                        <tr class="">
                                                                        <td>모듈형 안티바이러스 제품</td>

                        <td class="subject">
                            <div>

                                <a href="http://www.koist.kr/test2_progress/2">
                                                                        ViRobot SDK 1.5 (Windows)[]                                </a>
                                                            </div>
                        </td>
                                                        <td>-</td>
                                <td>(주)하우리</td>
                                <td>2021-08-25</td>
                                            </tr>
                                                        </tbody>
            </table>
        </div>

        <div class="btn_area">
            <ul class="adm_btns">
                                                            </ul>
                    </div>

    </form>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'performance')
   AND slug = 'progress';

-- [13] certificate/overview (5563 bytes, 4 sections, 4 images)
-- Source: http://www.koist.kr/test3/page01
UPDATE dep_pages
   SET content = '</div>
        KOLAS 공인시험기관으로서 ISO/IEC 25023, 25051 및 성능지표 기반 시험 서비스를 제공<br />
  객관적인 신뢰성 확보 및 소프트웨어 품질 검증 서비스
    </div>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">목적</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>기능 구현에 대한 완전성·정확성 시험</li>
                <li>보안성에 대한 보안기능 시험, 침투 시험</li>
                <li>제품 성능수준에 대한 성능 측정 시험</li>
                <li>신뢰성에 대한 가용성 측정 시험</li>
                <li>결함 예방을 위한 안전성 시험</li>
                <li>R&amp;D 과제 결과물에 대한 제 3자 검증</li>
                <li>R&amp;D 과제 검증지표 수립을 위한 자문 서비스 제공</li>
                <li>AI 솔루션 테스트 결과 제공</li>
                <li>제품 품질에 대한 객관적인 검증 결과 제공</li>
                <li>NEP인증을 위한 공인시험기관 시험성적서 발급<br />
                (신청시, 24개월 이내 발급된 시험성적서 제출 필요)</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">소프트웨어
        품질특성</h3>
  <div class="service-section-body"><ul class="service-bullets">
          <li>
                    ISO/IEC 25023
                    <p>소프트웨어제품 품질 측정에 관한 국제 표준</p>
             </li>
                <li>
                    ISO/IEC 25051
                    <p>소프트웨어제품 품질 요구사항과 시험에 관한 국제표준</p>
             </li>
            </ul>
            <div class="kwd_wrap" data-aos="fade-up">
                <dl class="kwd">
                    <dt>기능적합성</dt>
                    <dd><span>기능완전성</span><span>기능정확성</span><span>기능적절성</span></div>
</section>
                <dl class="kwd">
                    <dt>성능효율성</dt>
                    <dd><span>시간반응성</span><span>자원사용률</span><span>용량 측정</span></dd>
                </dl>
                <dl class="kwd">
                    <dt>호완성</dt>
                    <dd><span>공존성</span><span>상호운용성</span></dd>
                </dl>
                <dl class="kwd">
                    <dt>사용성</dt>
                    <dd><span>적절인지성</span><span>학습성</span><span>운영성</span><span>사용자오류 방지</span><span>사용자 인터페이스 심미성</span><span>접근성</span></dd>
                </dl>
                <dl class="kwd">
                    <dt>신뢰성</dt>
                    <dd><span>가용성</span><span>결함허용성</span><span>복구성</span></dd>
                </dl>
                <dl class="kwd">
                    <dt>보안성</dt>
                    <dd><span>접근통제</span><span>암호화</span><span>무결성</span><span>부인방지</span><span>책임주적성</span><span>신원인증성</span></dd>
                </dl>
                <dl class="kwd">
                    <dt>유지보수성</dt>
                    <dd><span>분석성</span><span>변경성</span><span>시험성</span></dd>
                </dl>
                <dl class="kwd">
                    <dt>이식성</dt>
                    <dd><span>적응성</span><span>설치성</span><span>대치성</span></dd>
                </dl>
                <dl class="kwd">
                    <dt>일반적 요구사항</dt>
                    <dd><span>제품설명서</span><span>사용자 취급설명서</span></dd>
                </dl>
            </div>
  </dd>
 </dl>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">소프트웨어
        시험대상</h3>
  <div class="service-section-body"><div class="tbl_scroll">
            <table cellpadding="0" cellspacing="0">
              <thead>
              <tr>
                <th>분류</th>
                <th colspan="2">목록</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th rowspan="6">소프트웨어</th>
                <td>정보보호</td>
                <td>- 네트워크 제품군<br />
                  - 엔드포인트 제품군</td>
              </tr>
              <tr>
                <td>시스템 관리</td>
                <td>- 컴퓨터·응용소프트웨어·네트워크 등 관리 소프트웨어</td>
              </tr>
              <tr>
                <td>기업 관리</td>
                <td>- ERP, CRM, SCM 및 기업/업무 지원 소프트웨어</td>
              </tr>
              <tr>
                <td>콘텐츠 개발도구</td>
                <td>- 디지털 콘텐츠, AR/VR/XR 콘텐츠 개발 소프트웨어</td>
              </tr>
              <tr>
                <td>프로그램 개발용 언어/도구</td>
                <td>- 프로그램 개발도구, 소스코드 진단도구, 시험/점검 도구</td>
              </tr>
              <tr>
                <td>인공지능</td>
                <td>- AI 솔루션(제품, 라이브러리, 알고리즘)</td>
              </tr>
              </tbody>
            </table>
            </div>
            <p class="ps">※ 산업 모든 분야에 적용될 수 있는 소프트웨어를 대상으로 시험 서비스 제공<p></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 절차</h3>
  <div class="service-section-body"><ul class="process">
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step1.png" alt="시험 준비" loading="lazy" decoding="async">
                    <span>step 01</span>
                    <p>시험 준비</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step2.png" alt="신청 및 계약" loading="lazy" decoding="async">
                    <span>step 02</span>
                    <p>신청 및 계약</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step3.png" alt="시험 수행" loading="lazy" decoding="async">
                    <span>step 03</span>
                    <p>시험 수행</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step4.png" alt="성적서 발행" loading="lazy" decoding="async">
                    <span>step 04</span>
                    <p>성적서 발행</p>
                </li>
            </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'certificate')
   AND slug = 'overview';

-- [14] certificate/rnd (2069 bytes, 3 sections, 4 images)
-- Source: http://www.koist.kr/test3/page02
UPDATE dep_pages
   SET content = '</div>

    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">목적</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>제품 성능수준에 대한 성능 측정 시험</li>
                <li>제품 품질에 대한 객관적인 검증 결과 제공</li>
                <li>R&amp;D 과제 성능지표 수립을 위한 자문 서비스 제공</li>
                <li>R&amp;D 과제 결과물에 대한 제 3자 검증* 기획·개발 단계에서부터 함께하는 서비스 제공</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">소프트웨어
        시험대상</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>신기술 적용 소프트웨어</li>
                <li>산업 모든 분야에 적용될 수 있는 소프트웨어</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 절차</h3>
  <div class="service-section-body"><ul class="process">
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step1.png" alt="시험 준비" loading="lazy" decoding="async">
                    <span>step 01</span>
                    <p>시험 준비</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step2.png" alt="신청 및 계약" loading="lazy" decoding="async">
                    <span>step 02</span>
                    <p>신청 및 계약</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step3.png" alt="시험 수행" loading="lazy" decoding="async">
                    <span>step 03</span>
                    <p>시험 수행</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step4.png" alt="성적서 발행" loading="lazy" decoding="async">
                    <span>step 04</span>
                    <p>성적서 발행</p>
                </li>
            </ul>
            <ul class="service-bullets">
                <li>출장 서비스 제공</li>
                <li>R&amp;D 과제 일정에 맞춰 시험 성적서 발행</li>
            </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'certificate')
   AND slug = 'rnd';

-- [15] certificate/ai (2156 bytes, 3 sections, 4 images)
-- Source: http://www.koist.kr/test3/page03
UPDATE dep_pages
   SET content = '</div>

    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">목적</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>AI솔루션에 대한 테스트 결과 제공(시험 성적서 발행)</li>
                <li>제품 성능수준에 대한 성능 측정</li>
                <li>제품 품질에 대한 객관적인 검증 결과 제공</li>
                <li>인공지능 알고리즘 유형별 시험 서비스 제공</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">소프트웨어
        시험대상</h3>
  <div class="service-section-body"><ul class="service-bullets">
          <li>
                    인공지능 알고리즘이 포함된 모든 제품
                    <p>
                     AI솔루션 (제품, 라이브러리, 알고리즘)<br />
      AI기반 정보보호/시스템 관리/기업 관리/콘텐츠 개발도구
                    </p>
             </li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 절차</h3>
  <div class="service-section-body"><ul class="process">
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step1.png" alt="시험 준비" loading="lazy" decoding="async">
                    <span>step 01</span>
                    <p>시험 준비</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step2.png" alt="신청 및 계약" loading="lazy" decoding="async">
                    <span>step 02</span>
                    <p>신청 및 계약</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step3.png" alt="시험 수행" loading="lazy" decoding="async">
                    <span>step 03</span>
                    <p>시험 수행</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step4.png" alt="성적서 발행" loading="lazy" decoding="async">
                    <span>step 04</span>
                    <p>성적서 발행</p>
                </li>
            </ul>
            <ul class="service-bullets">
                <li>출장 서비스 제공</li>
                <li>개발사 사업 일정에 맞춰 시험 성적서 발행</li>
            </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'certificate')
   AND slug = 'ai';

-- [16] certificate/network (2470 bytes, 4 sections, 4 images)
-- Source: http://www.koist.kr/test3/page04
UPDATE dep_pages
   SET content = '</div>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">목적</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>네트워크 성능수준에 대한 성능측정 결과서 제공(시험성적서 발행)</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 대상</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>정보보호제품 : DDoS 대응장비, 네트워크 방화벽(F/W), 웹방화벽(WAF), 차세대방화벽(NGFW)침입방지시스템(IPS), 가상사설명(IPSec VPN, SSL VPN)</li>
                <li>네트워크 장비 : L2 이상 스위치, 라우터</li>
                <li>신기술, 융·복합 제품 및 서비스</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 범위</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>RFC3511 / RFC2544 시험</li>
                <li>처리율(Throughput) 및 지연시간(Latency)</li>
                <li>CPS (초당 최대 연결 생성률)</li>
                <li>TPS (초당 최대 트랜잭션 생성률)</li>
                <li>CC (최대 동시 세션수)</li>
                <li>신청기관에서 제시한 시험항목</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 절차</h3>
  <div class="service-section-body"><ul class="process">
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step1.png" alt="시험 준비" loading="lazy" decoding="async">
                    <span>step 01</span>
                    <p>시험 준비</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step2.png" alt="신청 및 계약" loading="lazy" decoding="async">
                    <span>step 02</span>
                    <p>신청 및 계약</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step3.png" alt="시험 수행" loading="lazy" decoding="async">
                    <span>step 03</span>
                    <p>시험 수행</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step4.png" alt="시험 결과서" loading="lazy" decoding="async">
                    <span>step 04</span>
                    <p>시험 결과서</p>
                </li>
            </ul>
            <ul class="service-bullets">
                <li>개발사 사업 일정에 맞춰 시험 결과서 제공</li>
                <li>개발사 요청 시, 시험 성적서 발행</li>
   </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'certificate')
   AND slug = 'network';

-- [17] diagnosis/readiness (7654 bytes, 7 sections, 6 images)
-- Source: http://www.koist.kr/test4/page01
UPDATE dep_pages
   SET content = '</div>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">도입 배경</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>국가ㆍ공공기관ㆍ중소기업에 특화된 종합적인 정보보호 수준 제고 및 정보보호 사각지대 최소화 지원</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">관련 근거</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>정보보호산업의 진흥에 관한 법률 제12조(정보보호 준비도 평가 지원)</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">평가 대상</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>
                 조직의 정보보호 수준에 대한 공인된 평가를 희망하는 기관
                 <p>
                        - 국가 공공기관, 대기업, 비영리법인(협회, 재단 등)<br />
                        - 공공기관 산하기관, 대기업 협력업체 등 중소 영세업체<br />
                        - 기업 및 금융ㆍ병원ㆍ학교ㆍ물류업체 등 개인정보 처리 기관<br />
                    </p>
                </li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">평가 등급</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>
                 평가대상의 정보보호 인프라 수준 및 활동에 따라 5단계 평가등급
                 <p>
                        - 신청기관은 획득점수 순서에 따라 ‘AAA > AA > A > BB > B’ 부여<br />
                        - 신청기관 선택에 따라 개인정보보호지표 만족 시, 인증마크에 ‘P’ 부여<br />
                    </p>
                </li>
   </ul>
            <div class="grade">
             <ul>
                 <li><span>AAA</span><p>100~90 : 최적의 보안관리 활동 수행</p></li>
                    <li class="g_aa"><span>AA</span><p>89~80 : 체계적인 보안관리 활동 수행</p></li>
                    <li class="g_a"><span>A</span><p>79~60 : (기업 및 기관 상황에)요구되는 보안관리 활동 수행</p></li>
                    <li class="g_bb"><span>BB</span><p>59~40 : (기업 및 기관 상황에)적정한 보안관리 활동 수행</p></li>
                    <li class="g_b"><span>B</span><p>39~23 : 기본적인 보안관리 활동 수행</p></li>
                </ul>
                <img src="/api/images/legacy/sh_page/img/p54_ctf.png" alt="정보보호 준비도 등급 평가서" loading="lazy" decoding="async">
            </div></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">맞춤형 가이드</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>
                 사전점검 활동을 통한 신청기관 맞춤형 보안가이드 제공
                 <p>
                        - 신청기관 IT 환경에 따른 보안 요구사항 도출·분석<br />
      - 정보보호활동에 대한 심층 진단 (관계기관 점검가이드)<br />
      - 다양한 공공기관에 대한 평가 경험 활용
                    </p>
                </li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">평가 기준</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>
                 필수항목 및 선택항목 등 총 118개 항목으로 평가기준 구성
                 <p>
                        - 필수 항목 : 기반지표, 활동지표<br />
      - 선택 항목 : 개인정보보호지표
     </p>
                </li>
   </ul>
            <ul class="flex">
             <li class="left">
                 <p class="tit">필수항목</p>
                    <div>
                        <p>기반지표</p>
                        <ul>
                            <li>정보보호 리더쉽</li>
                            <li>정보보호 자원관리</li>
                        </ul>
     </div>
     <div>
                        <p>활동지표</p>
                        <ul>
                            <li>관리적 정보보호 활동</li>
                            <li>물리적 정보보호 활동</li>
                            <li>기술적 정보보호 활동</li>
      </ul>
                    </div>
                </li>
             <li class="right">
                 <p class="tit">선택항목</p>
                    <ul>
                     <li><img src="/api/images/legacy/sh_page/img/p55_icon1.png" alt="개인정보 보호" loading="lazy" decoding="async">개인정보 보호</li>
                     <li><img src="/api/images/legacy/sh_page/img/p55_icon2.png" alt="금융분야" loading="lazy" decoding="async">금융분야</li>
                        <li><img src="/api/images/legacy/sh_page/img/p55_icon3.png" alt="의료분야" loading="lazy" decoding="async">의료분야</li>
                        <li><img src="/api/images/legacy/sh_page/img/p55_icon4.png" alt="교육분야" loading="lazy" decoding="async">교육분야</li>
                        <li><img src="/api/images/legacy/sh_page/img/p55_icon5.png" alt="기타 산업별 요구사항" loading="lazy" decoding="async">기타 산업별 요구사항</li>
                    </ul>
                </li>
            </ul>
            <div class="tbl_scroll">
            <table cellpadding="0" cellspacing="0">
                <tbody>
                    <tr>
                        <th>구분</th>
                        <th>주요 내용</th>
                    </tr>
                    <tr>
                        <td class="bg">기반지표</td>
                        <td>정보보호 정책 · 경영 · 의사결정 구조(리더십)와 보안투자 및 인력 · 조직 등 필수적인 보안 인프라(자원관리)를 평가</td>
                    </tr>
                    <tr>
                        <td class="bg">활동지표</td>
                        <td>관리적 · 물리적 · 기술적 정보보호조치 현황 및 체계적인 보안활동 수행 여부를 평가</td>
                    </tr>
                    <tr>
                        <td class="bg">선택지표<br>(개인정보보호)</td>
                        <td>「개인정보보호법」및「정보통신망법」에서 규정하는 개인정보보호 필수항목에 대한 준수 여부를 평가</td>
                    </tr>
                </tbody>
            </table>
            </div></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">세부 평가지표</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>기반지표 (30점), 활동지표 (70점), 개인정보보호지표(118개 항목)</li>
   </ul>
            <div class="tbl_scroll">
            <table cellpadding="0" cellspacing="0" class="tbl2">
                <tbody>
                    <tr>
                        <th>지표</th>
                        <th>구분</th>
                        <th>평가지표(점수)</th>
                    </tr>
                    <tr>
                        <td class="bg" rowspan="2">기반지표</td>
                        <td>1. 정보보호 리더십</td>
                        <td>정보보호 최고책임자(CISO) 지정(5),정보보호 의사소통 및 정보제공(5), 정보보호 운영방침(4)</td>
                    </tr>
                    <tr>
                        <td>2. 정보보호 자원관리</td>
                        <td>정보보호 추진계획(4), 정보보호 인력 및 조직(4), 정보보호 예산 수립 및 집행(4), 정보보호 이행점검(4)</td>
                    </tr>
                    <tr>
                        <td class="bg" rowspan="3">활동지표</td>
                        <td>1. 관리적 보호활동</td>
                        <td>정보보호 교육 수행(5), 자산관리(4), 인적보안(4), 외부자 보안(5)</td>
                    </tr>
                    <tr>
                        <td>2. 물리적 보호활동</td>
                        <td>정보통신시설의 환경 보안(4),정보통신시설의 출입 관리(4), 사무실 보안(4)</td>
                    </tr>
                    <tr>
                        <td>3. 기술적 보호활동</td>
                        <td>
                            취약점 점검(5), 정보보호 사고탐지 및 대응(5), 시스템 개발 보안(4), 네트워크 보안(4),
                            정보시스템 및 응용프로그램 인증(5),자료유출 방지(4), 시스템 및 서비스 운영 보안(5), 백업 및 IT재해복구(4), PC 및 모바일기기 보안(4)
                        </td>
                    </tr>
                    <tr>
                        <td class="bg">선택지표</td>
                        <td>개인정보보호</td>
                        <td>
                            개인정보 최소수집, 개인정보 수집 고지 및 동의획득,개인정보취급방침, 이용자 권리 보호,
                            개인정보의 관리적 보호조치, 개인정보의 기술적 보호조치, 개인정보 파기(P)
                        </td>
                    </tr>
                </tbody>
            </table>
            </div></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'diagnosis')
   AND slug = 'readiness';

-- [18] diagnosis/ddos (1810 bytes, 3 sections, 3 images)
-- Source: http://www.koist.kr/test4/page02
UPDATE dep_pages
   SET content = '<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">훈련 대상</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>홈페이지, 서버, 네트워크 및 보안시스템</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">훈련 내용</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>DDoS 대량 트래픽 차단 및 서비스 가용성 점검</li>
                <li>DDoS공격에 대한 실시간 모니터링 및 대응체계 점검</li>
                <li>TCP/UDP/ICMP Flooding, HTTP Attack 등 다양한 유해트래픽에 대한 대응결과 진단</li>
                <li>대응체계, 예방활동을 위한 모의훈련 및 지침 제공</li>
                <li>신청기관에서 제시한 시험항목</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">훈련 절차</h3>
  <div class="service-section-body"><ul class="process">
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step2.png" alt="신청 및 계약" loading="lazy" decoding="async">
                    <span>step 01</span>
                    <p>모의훈련 신청</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step3.png" alt="시험 수행" loading="lazy" decoding="async">
                    <span>step 02</span>
                    <p>모의훈련 수행</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step4.png" alt="성적서 발행" loading="lazy" decoding="async">
                    <span>step 03</span>
                    <p>훈련 결과보고서</p>
                </li>
            </ul>
            <ul class="service-bullets">
                <li>고객사 일정에 맞춰 모의훈련 서비스 제공</li>
                <li>요청 시, 시험성적서 발행</li>
            </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'diagnosis')
   AND slug = 'ddos';

-- [19] diagnosis/security-perf (2074 bytes, 3 sections, 4 images)
-- Source: http://www.koist.kr/test4/page03
UPDATE dep_pages
   SET content = '<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">목적</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>보안기능 구현 정확성에 대한 기능 시험 확인서 제공(시험 성적서 발행)</li>
                <li>보안기능 성능수준에 대한 성능 측정</li>
                <li>제품 및 서비스의 취약점 진단 서비스</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 대상</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>정보보호제품 : DDoS 대응장비, 네트워크 방화벽(F/W), 웹방화벽(WAF), 차세대방화벽(NGFW)침입방지시스템(IPS), 가상사설명(IPSec VPN, SSL VPN)</li>
                <li>AI보안제품, AI보안서비스</li>
                <li>신기술, 융·복합 제품 및 서비스</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 절차</h3>
  <div class="service-section-body"><ul class="process">
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step1.png" alt="시험 준비" loading="lazy" decoding="async">
                    <span>step 01</span>
                    <p>시험 준비</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step2.png" alt="신청 및 계약" loading="lazy" decoding="async">
                    <span>step 02</span>
                    <p>신청 및 계약</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step3.png" alt="시험 수행" loading="lazy" decoding="async">
                    <span>step 03</span>
                    <p>시험 수행</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step4.png" alt="기능시험 확인서" loading="lazy" decoding="async">
                    <span>step 04</span>
                    <p>기능시험 확인서</p>
                </li>
            </ul>
            <ul class="service-bullets">
                <li>개발사 사업 일정에 맞춰 기능시험 확인서 제공</li>
                <li>개발사 요청 시, 시험 성적서 발행</li>
   </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'diagnosis')
   AND slug = 'security-perf';

-- [20] diagnosis/vulnerability (2010 bytes, 3 sections, 4 images)
-- Source: http://www.koist.kr/test4/page04
UPDATE dep_pages
   SET content = '<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">목적</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>제품 및 서비스의 보안성 측정</li>
                <li>취약점 분석 결과서 제공(시험 성적서 발행)</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 대상</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>정보보호제품 : DDoS 대응장비, 네트워크 방화벽(F/W), 웹방화벽(WAF), 차세대방화벽(NGFW)침입방지시스템(IPS), 가상사설명(IPSec VPN, SSL VPN)</li>
                <li>AI보안제품, AI보안서비스</li>
                <li>신기술, 융·복합 제품 및 서비스</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 절차</h3>
  <div class="service-section-body"><ul class="process">
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step1.png" alt="시험 준비" loading="lazy" decoding="async">
                    <span>step 01</span>
                    <p>시험 준비</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step2.png" alt="신청 및 계약" loading="lazy" decoding="async">
                    <span>step 02</span>
                    <p>신청 및 계약</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step3.png" alt="시험 수행" loading="lazy" decoding="async">
                    <span>step 03</span>
                    <p>시험 수행</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step4.png" alt="취약점분석결과서" loading="lazy" decoding="async">
                    <span>step 04</span>
                    <p>취약점분석결과서</p>
                </li>
            </ul>
            <ul class="service-bullets">
                <li>개발사 사업 일정에 맞춰 취약점분석결과서 제공</li>
                <li>개발사 요청 시, 시험 성적서 발행</li>
   </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'diagnosis')
   AND slug = 'vulnerability';

-- [21] diagnosis/weakness (1963 bytes, 3 sections, 4 images)
-- Source: http://www.koist.kr/test4/page05
UPDATE dep_pages
   SET content = '<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">목적</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>정적분석 도구를 이용한 보안약점 진단 결과 제공(시험 성적서 발행)</li>
                <li>신규개발, 일부 소스코드 변경 시 시큐어코딩 적용 여부 점검</li>
                <li>소스코드 분석⦁설계단계, 구현단계에서의 보안약점 진단</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 대상</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>AI보안제품, AI보안서비스</li>
                <li>신기술, 융·복합 제품 및 서비스</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">시험 절차</h3>
  <div class="service-section-body"><ul class="process">
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step1.png" alt="시험 준비" loading="lazy" decoding="async">
                    <span>step 01</span>
                    <p>시험 준비</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step2.png" alt="신청 및 계약" loading="lazy" decoding="async">
                    <span>step 02</span>
                    <p>신청 및 계약</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step3.png" alt="시험 수행" loading="lazy" decoding="async">
                    <span>step 03</span>
                    <p>시험 수행</p>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step4.png" alt="진단확인서" loading="lazy" decoding="async">
                    <span>step 04</span>
                    <p>진단확인서</p>
                </li>
            </ul>
            <ul class="service-bullets">
                <li>개발사 사업 일정에 맞춰 진단확인서 제공</li>
                <li>개발사 요청 시, 시험 성적서 발행</li>
   </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'diagnosis')
   AND slug = 'weakness';

-- [22] consulting/cc (1904 bytes, 2 sections, 3 images)
-- Source: http://www.koist.kr/consulting/cc
UPDATE dep_pages
   SET content = '</div>

    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">주요 서비스</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>CC 평가제도, 절차, 기준 등 CC제도 전반에 대한 교육</li>
                <li>평가보증등급별 평가제출물 작성 가이드</li>
                <li>정보보호제품별 안전한 보안기능 구현을 위한 보안기능 가이드(보안규격 자문)</li>
                <li>개발환경 보안점검 가이드 : 인적, 물리적 보안대책 수립 등에 대한 가이드 제공</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">수행절차</h3>
  <div class="service-section-body"><ul class="process">
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step1.png" alt="시험 준비" loading="lazy" decoding="async">
                    <span>준비단계</span>
                    <p>자문 및 컨설팅신청</p>
                    <div>
                        <b>· 대상제품 유형 확인</b>
                        <b>· 보증 등급 결정</b>
                        <b>· 평가 구분(국제용/국내용)</b>
                    </div>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step2.png" alt="컨설팅 수행" loading="lazy" decoding="async">
                    <span>컨설팅 수행</span>
                    <p>컨설팅 접수 및 계약</p>
                    <div>
                        <b>· 컨설팅 계획 수립</b>
                        <b>· 보증등급별 제출물 작성가이드</b>
                        <b>· 보안규격 해석 등</b>
                        <b>· 제출물 검토</b>
                    </div>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step3.png" alt="평가계약 지원" loading="lazy" decoding="async">
                    <span>종료단계</span>
                    <p>평가계약 지원</p>
                    <div>
                        <b>· 원활한 평가계약 진행 지원</b>
                    </div>
                </li>

            </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'consulting')
   AND slug = 'cc';

-- [23] consulting/kcmvp (1760 bytes, 2 sections, 3 images)
-- Source: http://www.koist.kr/consulting/vcm
UPDATE dep_pages
   SET content = '</div>

    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">주요 서비스</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>검증필 암호모듈 검증 제도, 절차, 기준 등 검증필</li>
                <li>암호모듈 검증제도 전반에 대한 교육암호모듈 설계 및 제출물 작성 가이드</li>
                <li>검증필 암호모듈의 안전성과 구현 적합성을 위한 검증기준 가이드</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">수행절차</h3>
  <div class="service-section-body"><ul class="process">
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step1.png" alt="시험 준비" loading="lazy" decoding="async">
                    <span>준비단계</span>
                    <p>자문 및 컨설팅신청</p>
                    <div>
                        <b>· 대상제품 유형 확인</b>
                        <b>· 보안수준 결정</b>
                    </div>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step2.png" alt="컨설팅 수행" loading="lazy" decoding="async">
                    <span>컨설팅 수행</span>
                    <p>컨설팅 접수 및 계약</p>
                    <div>
                        <b>· 컨설팅 계획 수립</b>
                        <b>· 암호모듈 설계 및 제출물 작성 가이드</b>
                        <b>· 검증필 암호모듈 검증기준 가이드</b>
                    </div>
                </li>

                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step4.png" alt="최종 검토" loading="lazy" decoding="async">
                    <span>종료단계</span>
                    <p>최종 검토</p>
                    <div>
                        <b>· 구현물 및 제출물 검토</b>
                    </div>
                </li>
            </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'consulting')
   AND slug = 'kcmvp';

-- [24] consulting/isms-p (2750 bytes, 2 sections, 5 images)
-- Source: http://www.koist.kr/consulting/isms_p
UPDATE dep_pages
   SET content = '</div>

    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">컨설팅 제공</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>컨설팅 진행 단계별 교육 및 실습을 통한 관리체계의 내재화 지원</li>
            </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">컨설팅 단계별
        진행 내용</h3>
  <div class="service-section-body"><ul class="process">
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step1.png" alt="시험 준비" loading="lazy" decoding="async">
                    <span>STEP 01 </span>
                    <p>현황 분석</p>
                    <div>
                        <b>· 운영환경 분석</b>
                        <b>· 요구사항 정의</b>
                        <b>· 컨설팅 범위 정의</b>
                        <b>· 수행 계획 수립</b>
                    </div>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step2.png" alt="컨설팅 수행" loading="lazy" decoding="async">
                    <span>STEP 02</span>
                    <p>위험 분석</p>
                    <div>
                        <b>· 자산 조사</b>
                        <b>· 자산관리 현황분석</b>
                        <b>· 기술적 취약점 분석</b>
                        <b>· 위험분석 및 평가</b>
                    </div>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step3.png" alt="평가계약 지원" loading="lazy" decoding="async">
                    <span>STEP 03</span>
                    <p>보안대책 수립 및 문서작성</p>
                    <div>
                        <b>· 보안대책 도출</b>
                        <b>· 이행 계획 수립</b>
                        <b>· 중장기 계획 수립</b>
                        <b>· 정책수립 및 작성</b>
                        <b>· 운영 문서 작성</b>
                    </div>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step4.png" alt="최종 검토" loading="lazy" decoding="async">
                    <span>STEP 04</span>
                    <p>최종점검</p>
                    <div>
                        <b>· 모의심사 수행</b>
                    </div>
                </li>
                <li>
                    <img src="/api/images/legacy/sh_page/img/p48_step4.png" alt="사후관리" loading="lazy" decoding="async">
                    <span>STEP 05 </span>
                    <p>사후관리</p>
                    <div>
                        <b>· 예비점검 보완조치</b>
                    </div>
                </li>
            </ul>
            <ul class="service-bullets">
                <li>기존 운영문서를 활용하여 일정 조정 가능</li>
                <li>예비점검 결과에 대한 보완조치 수행</li>
            </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'consulting')
   AND slug = 'isms-p';

-- [25] enterprise-security/info (1852 bytes, 2 sections, 0 images)
-- Source: http://www.koist.kr/indsecconsult/info
UPDATE dep_pages
   SET content = '</div>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">강점</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>산업보안관리사, 정보보호준비도평가사, 사이버포렌식전문가 등의 공인 자격을 구비한 전문가들이 현장 방문</li>
                <li>물리, 인원, 정보 등 보안 분야별 취약점을 종합 진단 평가</li>
                <li>전사적 측면의 융합보안 방안을 제시하여 기업의 실질적 보안역량과 기술(영업비밀 포함) 유출사고 예방 및 임직원의 보안 의식 강화</li>
                <li>단계별 보안 발전방안 및 보안대책 제공</li>
   </ul></div>
</section>
    <section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">업무 범위</h3>
  <div class="service-section-body"><ul class="service-bullets">
                <li>
                 기업 보안역량 진단
                 <p>
                        - 기업보안 현황 분석<br>
                        - 보안취약점 도출 및 대응방안 마련<br>
                        - 관리적 보안, 물리적 보안, 기술적 보안(정보보호) 분야별 심층 진단<br>
                        - 정보보호에 치우치지 않는 융합보안 차원의 실질적 보안 방안 제시
                    </p>
                </li>
                <li>
                 기업 보안유출 사고 대응
                 <p>
                        - 보안사고 발생시 대응 조치<br>
                        - 사고 원인 조사<br>
                        - 사고 조사 보고서 작성 및 후속 조치
                    </p>
                </li>
                <li>
                 기업 영업비밀 및 기술보호 교육
                 <p>
                        - 사내 보안내규 작성 등 관리적 보안 방안<br>
                        - 임직원의 보안 의식(awareness) 강화 방안<br>
                        - 임직원 보안활동 관제 방안
                    </p>
                </li>
                <li>
                 기업 기술보호 상담
                 <p>
                        - 기술보안 기업정책 수립 및 기술보호 관련 법률 상담<br>
                        - 국가핵심기술, 산업기술, 영업비밀 등 보호대상 기술별 관리 방안<br>
                        - 중장기 보안역량 강화 위한 마스터 플랜 수립
                    </p>
                </li>
   </ul></div>
</section>',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = 'enterprise-security')
   AND slug = 'info';


-- Verification:
--   SELECT d.slug AS dept, p.slug AS page, LENGTH(p.content) AS sz, p.updated_at
--     FROM dep_pages p JOIN departments d ON d.id = p.dept_id
--    ORDER BY d.sort_order, p.sort_order;
