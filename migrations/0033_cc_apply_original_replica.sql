-- v39.7.1: cc/apply page - koist.kr 원본 완전 복제
-- 원본: http://www.koist.kr/cc/application
-- 목표: 깨진 HTML 수정 + EAL5 항목 추가 + 원본 레이아웃 정확 반영

UPDATE dep_pages
SET content = '<ul class="process service-steps-legacy" data-aos="fade-up">
    <li>
        <img src="/api/images/legacy/sh_page/img/p39_step1.png" alt="평가 문의" loading="lazy" decoding="async" />
        <span>step 01</span>
        <p>평가 문의</p>
    </li>
    <li>
        <img src="/api/images/legacy/sh_page/img/p39_step2.png" alt="평가 신청" loading="lazy" decoding="async" />
        <span>step 02</span>
        <p>평가 신청</p>
    </li>
    <li>
        <img src="/api/images/legacy/sh_page/img/p39_step3.png" alt="평가 계약 체결" loading="lazy" decoding="async" />
        <span>step 03</span>
        <p>평가 계약 체결</p>
    </li>
    <li>
        <img src="/api/images/legacy/sh_page/img/p39_step4.png" alt="제출물 설명회 개최" loading="lazy" decoding="async" />
        <span>step 04</span>
        <p>제출물 설명회 개최</p>
    </li>
    <li>
        <img src="/api/images/legacy/sh_page/img/p39_step5.png" alt="평가 진행" loading="lazy" decoding="async" />
        <span>step 05</span>
        <p>평가 진행</p>
    </li>
    <li>
        <img src="/api/images/legacy/sh_page/img/p39_step6.png" alt="인증서 발급" loading="lazy" decoding="async" />
        <span>step 06</span>
        <p>인증서 발급</p>
    </li>
</ul>
<section class="service-section" data-koist-block="section">
    <h3 class="service-section-title">평가 신청시 준비사항</h3>
    <div class="service-section-body">
        <ul class="service-bullets">
            <li>제출물 1부</li>
            <li>평가신청서</li>
            <li>개인정보 수집·이용 및 제3자 제공 동의서</li>
            <li>정보 공개 동의서</li>
        </ul>
    </div>
</section>
<p class="ps" data-aos="fade-up">※국내용, 국제용의 평가제출물이 일부 상이함</p>
<div class="cc-apply-flex" data-aos="fade-up">
    <div class="cc-apply-col">
        <dl class="cc-apply-dl">
            <dt>국내용</dt>
            <dd>제출물 검토 및 평가<br />제품 사전 점검 수행</dd>
        </dl>
        <table class="cc-eal-table" summary="CC평가 신청방법">
            <caption class="sound_only">CC평가 신청방법</caption>
            <thead>
                <tr>
                    <th colspan="2" scope="col">평가제출물</th>
                </tr>
            </thead>
            <tbody>
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
                        </ul>
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
            </tbody>
        </table>
    </div>
    <div class="cc-apply-col">
        <dl class="cc-apply-dl">
            <dt>국제용</dt>
            <dd>제출물 검토</dd>
        </dl>
        <table class="cc-eal-table" summary="CC평가 신청방법">
            <caption class="sound_only">CC평가 신청방법</caption>
            <thead>
                <tr>
                    <th colspan="2" scope="col">평가제출물</th>
                </tr>
            </thead>
            <tbody>
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
                        </ul>
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
            </tbody>
        </table>
    </div>
</div>',
updated_at = CURRENT_TIMESTAMP
WHERE id = 2;
